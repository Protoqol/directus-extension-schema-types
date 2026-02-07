<template>
  <div class="collections-container">
    <div v-if="collections && collections.length > 0" class="table-section">
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
        <tr v-for="col in collections" :key="col.collection" @click="$emit('toggle-collection', col.collection)">
          <td class="selection" @click.stop>
            <v-checkbox
                :model-value="selectedCollections.includes(col.collection)"
                @update:model-value="$emit('toggle-collection', col.collection)"
            />
          </td>
          <td class="collection">
            <div class="collection-name">
              <span class="name">{{ col.collection }}</span>
            </div>
          </td>
        </tr>
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
  name : "collections",
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
    const allSelected = computed(() => {
      return props.collections.length > 0 && props.selectedCollections.length === props.collections.length;
    });

    const someSelected = computed(() => {
      return props.selectedCollections.length > 0 && props.selectedCollections.length < props.collections.length;
    });

    return {
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
</style>
