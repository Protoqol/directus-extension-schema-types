<template>
  <div class="collections-container">
    <div v-if="tree && tree.length > 0" class="table-section">
      <table class="v-table">
        <thead>
        <tr>
          <th class="selection">
            <v-checkbox
                :indeterminate="someSelected"
                :model-value="allSelected"
                @update:model-value="$emit('toggle-all')"
            />
          </th>
          <th class="collection">Collection</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in tree" :key="item.collection">
          <tr :class="{ 'folder-row': item.type === 'alias' }"
              @click="item.meta && item.type !== 'alias' ? $emit('toggle-collection', item.collection) : null">
            <td class="selection" @click.stop>
              <v-checkbox
                  v-if="item.type !== 'alias'"
                  :model-value="selectedCollections.includes(item.collection)"
                  @update:model-value="$emit('toggle-collection', item.collection)"
              />
            </td>
            <td class="collection">
              <div class="collection-name">
                <v-icon
                    :name="item.meta.icon ? item.meta.icon : (item.type === 'alias' ? 'folder' : 'database')"/>
                <span class="name">{{ item.name }}</span>
              </div>
            </td>
          </tr>
          <tr v-for="child in item.children" :key="child.collection"
              class="child-row"
              @click="$emit('toggle-collection', child.collection)">
            <td class="selection" @click.stop>
              <v-checkbox
                  :model-value="selectedCollections.includes(child.collection)"
                  @update:model-value="$emit('toggle-collection', child.collection)"
              />
            </td>
            <td class="collection">
              <div class="collection-name child-name">
                <v-icon :name="child.meta && child.meta.icon ? child.meta.icon : 'database'"/>
                <span class="name">{{ child.name }}</span>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>

    <v-info v-else icon="info_outline" title="No collections found">
      No collections available to display.
    </v-info>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "collections",

  props: {
    collections        : {
      type   : Array<{ collection: string }>,
      default: () => [],
    },
    selectedCollections: {
      type   : Array,
      default: () => [],
    },
  },

  emits: ["toggle-collection", "toggle-all"],

  setup(props) {
    const tree = computed(() => {
      const items = props.collections.map((c: any) => ({
        ...c,
        name    : c.meta?.display_name || c.collection,
        children: [] as any[],
      }));

      const root: any[] = [];
      const map: Record<string, any> = {};

      items.forEach((item: any) => {
        map[item.collection] = item;
      });

      items.forEach((item: any) => {
        const parentId = item.meta?.group;

        if (parentId && map[parentId]) {
          map[parentId].children.push(item);
        } else {
          root.push(item);
        }
      });

      return root;
    });

    const allSelected = computed(() => {
      const selectableCollections = props.collections.filter((c: any) => c.type !== "alias");
      return selectableCollections.length > 0 && props.selectedCollections.length === selectableCollections.length;
    });

    const someSelected = computed(() => {
      const selectableCollections = props.collections.filter((c: any) => c.type !== "alias");
      return props.selectedCollections.length > 0 && props.selectedCollections.length < selectableCollections.length;
    });

    return {
      tree,
      allSelected,
      someSelected,
    };
  },
});
</script>

<style scoped>
.collections-container {
  width: 100%;
  text-align: left;
}

.table-section {
  width: 100%;
}

.v-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}

.folder-row, .child-row {
  cursor: pointer;
}

.folder-row:hover, .child-row:hover {
  background-color: var(--theme--background-subdued);
}

.v-table thead th {
  padding: 8px 12px;
  text-align: left;

  color: var(--theme--foreground-accent);
  font-size: 16px;
  font-weight: var(--theme--form--field--label--font-weight);
  font-family: var(--theme--form--field--label--font-family);
}

.v-table tbody tr {
  cursor: pointer;
}

.v-table tbody tr:hover {
  border-color: var(--theme--border-color-accent);
}

.v-table td {
  padding: 16px 12px;
  border-top: var(--theme--border-width) solid var(--theme--border-color-subdued);
  border-bottom: var(--theme--border-width) solid var(--theme--border-color-subdued);
}

.v-table td:first-child {
  border-left: var(--theme--border-width) solid var(--theme--border-color-subdued);
  border-top-left-radius: var(--theme--border-radius);
  border-bottom-left-radius: var(--theme--border-radius);
}

.v-table td:last-child {
  border-right: var(--theme--border-width) solid var(--theme--border-color-subdued);
  border-top-right-radius: var(--theme--border-radius);
  border-bottom-right-radius: var(--theme--border-radius);
}

.selection {
  width: 48px;
  text-align: center;
}

.collection-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  font-family: var(--theme--fonts--monospace--font-family);
  font-size: 14px;
  color: var(--theme--foreground);
}

.child-name {
  padding-left: 32px;
}

.folder-row {
  background-color: var(--theme--background-subdued);
  cursor: default !important;
}
</style>
