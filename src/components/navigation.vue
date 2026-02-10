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

    <template v-for="item in tree" :key="item.collection">
      <v-list-group
          v-if="item.children && item.children.length > 0"
          :active="isWithinGroup(item)"
          :clickable="item.meta && item.meta.type !== 'folder'"
          :value="item.collection"
          @click="item.meta && item.meta.type !== 'folder' ? $router.push(`/protoqol/schema/${item.collection}`) : null"
      >
        <template #activator>
          <v-list-item-icon>
            <v-icon
                :name="item.meta && item.meta.icon ? item.meta.icon : (item.meta && item.meta.type === 'folder' ? 'folder' : 'database')"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
            v-for="child in item.children"
            :key="child.collection"
            :to="`/protoqol/schema/${child.collection}`"
            class="child-item"
        >
          <v-list-item-icon>
            <v-icon :name="child.meta && child.meta.icon ? child.meta.icon : 'database'"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ child.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item
          v-else
          :key="item.collection"
          :to="`/protoqol/schema/${item.collection}`"
      >
        <v-list-item-icon>
          <v-icon
              :name="item.meta && item.meta.icon ? item.meta.icon : (item.meta && item.meta.type === 'folder' ? 'folder' : 'database')"/>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStores} from "@directus/extensions-sdk";
import {useRouter} from "vue-router";

export default defineComponent({
  props: {
    collection: {
      type   : String,
      default: null,
    },
  },
  setup(props) {
    const {useCollectionsStore} = useStores();
    const collectionsStore = useCollectionsStore();
    const router = useRouter();

    const collections = computed(() => {
      if (!collectionsStore || !collectionsStore.collections) {
        return [];
      }
      return collectionsStore.collections.filter((c: any) => !c.collection.startsWith("directus_"));
    });

    const tree = computed(() => {
      const items = collections.value.map((c: any) => ({
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

    const isWithinGroup = (item: any) => {
      if (props.collection === item.collection) {
        return true;
      }
      return item.children.some((child: any) => child.collection === props.collection);
    };

    return {
      tree,
      isWithinGroup,
      $router: router,
    };
  },
});
</script>

<style scoped>
.child-item {
  padding-left: 32px;
}
</style>
