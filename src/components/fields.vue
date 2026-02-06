<template>
  <div class="fields-container">
    <v-notice v-if="error" type="danger">
      Error: {{ error }}
    </v-notice>

    <div v-if="rows && rows.length > 0" class="table-section">
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
          <th class="field">Field</th>
          <th class="type">Type</th>
          <th class="required">Required</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in rows" :key="row.field" @click="$emit('toggle-field', row.field)">
          <td class="selection" @click.stop>
            <v-checkbox
                :model-value="selectedFields.includes(row.field)"
                @update:model-value="$emit('toggle-field', row.field)"
            />
          </td>
          <td class="field">
            <div class="field-name">
              <span class="name">{{ row.field }}</span>
            </div>
          </td>
          <td class="type">
            <span class="type-label">{{ row.type }}</span>
          </td>
          <td class="required">
            <v-icon :class="row.required ? 'text-success' : 'text-muted'"
                    :name="row.required ? 'check_circle' : 'cancel'"
                    size="18"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <v-info v-else-if="collection" icon="info_outline" title="No fields found">
      This collection doesn't seem to have any fields.
    </v-info>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
  name : "fields",
  props: {
    collection    : {
      type   : String,
      default: null,
    },
    rows          : {
      type   : Array,
      default: () => [],
    },
    selectedFields: {
      type   : Array,
      default: () => [],
    },
    error         : {
      type   : String,
      default: null,
    },
  },
  emits: ["toggle-field", "toggle-all"],
  setup(props) {
    const allSelected = computed(() => {
      return props.rows.length > 0 && props.selectedFields.length === props.rows.length;
    });

    const someSelected = computed(() => {
      return props.selectedFields.length > 0 && props.selectedFields.length < props.rows.length;
    });

    return {
      allSelected,
      someSelected,
    };
  },
});
</script>

<style scoped>
.fields-container {
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
  color: var(--foreground-subdued);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.v-table tbody tr {
  cursor: pointer;
  background-color: #f9fafb;
  transition: background-color 0.2s ease;
}

.v-table tbody tr:hover {
  background-color: var(--background-subdued);
}

.v-table td {
  padding: 12px;
  border-top: var(--border-width) solid var(--border-subdued);
  border-bottom: var(--border-width) solid var(--border-subdued);
}

.v-table td:first-child {
  border-left: var(--border-width) solid var(--border-subdued);
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}

.v-table td:last-child {
  border-right: var(--border-width) solid var(--border-subdued);
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.selection {
  width: 48px;
  text-align: center;
}

.field-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  font-weight: 600;
  color: var(--foreground-normal);
}

.type-label {
  font-family: var(--family-monospace);
  color: var(--foreground-subdued);
  font-size: 12px;
}

.required {
  width: 80px;
  text-align: center;
}

.text-success {
  color: var(--success);
}

.text-muted {
  color: var(--foreground-subdued);
}
</style>
