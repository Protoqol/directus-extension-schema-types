<template>
  <v-list nav>
    <v-list-item key="main" exact to="/protoqol/schema">
      <v-list-item-icon>
        <v-icon name="data_table"/>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>All collections</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider/>
    <v-list-item v-for="col in collections" :key="col.collection"
                 :to="`/protoqol/schema/${col.collection}`">
      <v-list-item-icon>
        <v-icon name="database"/>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ col.collection }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStores} from "@directus/extensions-sdk";

export default defineComponent({
  props: {
    collection: {
      type   : String,
      default: null,
    },
  },
  setup() {
    const {useCollectionsStore} = useStores();
    const collectionsStore = useCollectionsStore();

    const collections = computed(() => {
      if (!collectionsStore || !collectionsStore.collections) {
        return [];
      }
      return collectionsStore.collections.filter((c: any) => !c.collection.startsWith("directus_"));
    });

    return {
      collections,
    };
  },
});
</script>
