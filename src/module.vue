<template>
  <private-view :title="collection ? `Schema for ${collection}` : 'Schemas'">
    <template #headline>
      <p>protoqol/schema-types</p>
    </template>

    <template #title-outer:prepend>
      <v-button class="header-icon" disabled icon rounded secondary>
        <v-icon name="table"/>
      </v-button>
    </template>

    <template #navigation>
      <navigation #navigation :collection="collection"/>
    </template>

    <main>
      <collections
          v-if="!collection"
          :collections="collections"
          :selected-collections="selectedCollections"
          @toggle-collection="toggleCollection"
          @toggle-all="toggleAllCollections"
      />
      <fields
          v-else
          :collection="collection"
          :error="error"
          :rows="rows"
          :selected-fields="selectedFields"
          @toggle-field="toggleField"
          @toggle-all="toggleAllFields"
      />
      <generated-type :collection="collection" :fields="selectedRows" :selected-collections="selectedCollections"/>
    </main>
  </private-view>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import {useStores} from "@directus/extensions-sdk";
import Navigation from "./components/navigation.vue";
import Fields from "./components/fields.vue";
import Collections from "./components/collections.vue";
import GeneratedType from "./components/generated_type.vue";

export default defineComponent({
  components: {Fields, Collections, GeneratedType, Navigation},
  props     : {
    collection: {
      type   : String,
      default: null,
    },
  },
  setup(props) {
    const error = ref<string | null>(null);
    const selectedFields = ref<string[]>([]);
    const selectedCollections = ref<string[]>([]);

    let fieldsStore: any = null;
    let relationsStore: any = null;
    let collectionsStore: any = null;
    try {
      const stores = useStores();
      fieldsStore = stores.useFieldsStore();
      relationsStore = stores.useRelationsStore();
      collectionsStore = stores.useCollectionsStore();
    } catch (e: any) {
      error.value = "Failed to load Stores: " + e.message;
    }

    const collections = computed(() => {
      if (!collectionsStore) {
        return [];
      }
      return collectionsStore.collections.filter((c: any) => !c.collection.startsWith("directus_"));
    });

    watch(collections, (newCols) => {
      if (newCols.length > 0 && selectedCollections.value.length === 0) {
        selectedCollections.value = newCols.map((c: any) => c.collection);
      }
    }, {immediate: true});

    const rows = computed(() => {
      try {
        if (!props.collection || !fieldsStore || !relationsStore) {
          return [];
        }

        const allFields = fieldsStore.fields;
        const allRelations = relationsStore.relations;

        if (!allFields || !Array.isArray(allFields)) {
          return [];
        }

        const filtered = allFields.filter((f: any) => f.collection === props.collection);

        const mappedRows = filtered.map((f: any) => {
          const relation = allRelations.find(
              (r: any) =>
                  (r.collection === props.collection && r.field === f.field) ||
                  (r.related_collection === props.collection && r.meta?.one_field === f.field),
          );

          let relatedCollection = null;
          if (relation) {
            if (relation.collection === props.collection) {
              relatedCollection = relation.related_collection;
            } else {
              relatedCollection = relation.collection;
            }
          }

          let displayType = f.type || "unknown";
          if (relatedCollection) {
            displayType = `${f.field} (${relatedCollection})`;
          }

          return {
            field            : f.field || "unknown",
            type             : displayType,
            interface        : f.meta?.interface || "",
            required         : f.schema ? f.schema.is_nullable === false : f.meta?.required === true,
            unique           : f.schema?.is_unique === true,
            default          : f.schema?.default_value ?? f.meta?.defaultValue ?? null,
            special          : Array.isArray(f.special) ? f.special : (f.meta?.special ? (Array.isArray(f.meta.special) ? f.meta.special : [f.meta.special]) : []),
            note             : f.meta?.note || "",
            relation         : relation,
            relatedCollection: relatedCollection,
          };
        });

        return mappedRows;
      } catch (e: any) {
        console.error("Error in rows computed:", e);
        return [];
      }
    });

    // Initialize selectedFields when rows change and it's the first time for this collection
    watch(() => props.collection, () => {
      selectedFields.value = [];
    });

    watch(rows, (newRows) => {
      if (newRows.length > 0 && selectedFields.value.length === 0) {
        selectedFields.value = newRows.map((r: any) => r.field);
      }
    }, {immediate: true});

    const selectedRows = computed(() => {
      return rows.value.filter((r: any) => selectedFields.value.includes(r.field));
    });

    const toggleField = (field: string) => {
      if (selectedFields.value.includes(field)) {
        selectedFields.value = selectedFields.value.filter((f) => f !== field);
      } else {
        selectedFields.value.push(field);
      }
    };

    const toggleAllFields = () => {
      if (selectedFields.value.length === rows.value.length) {
        selectedFields.value = [];
      } else {
        selectedFields.value = rows.value.map((r: any) => r.field);
      }
    };

    const toggleCollection = (collection: string) => {
      if (selectedCollections.value.includes(collection)) {
        selectedCollections.value = selectedCollections.value.filter((c) => c !== collection);
      } else {
        selectedCollections.value.push(collection);
      }
    };

    const toggleAllCollections = () => {
      if (selectedCollections.value.length === collections.value.length) {
        selectedCollections.value = [];
      } else {
        selectedCollections.value = collections.value.map((c: any) => c.collection);
      }
    };

    return {
      rows,
      collections,
      selectedFields,
      selectedCollections,
      selectedRows,
      toggleField,
      toggleAllFields,
      toggleCollection,
      toggleAllCollections,
      error,
      page_description: "Generate types for your schemas",
    };
  },
});
</script>

<style scoped>
main {
  display: flex;
  gap: var(--content-padding);
  padding: var(--content-padding);
  align-items: flex-start;
}

main > * {
  flex: 1;
  min-width: 0;
}
</style>
