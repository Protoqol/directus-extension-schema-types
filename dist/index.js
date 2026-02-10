import { useStores, defineModule } from '@directus/extensions-sdk';
import { defineComponent, computed, resolveComponent, createBlock, openBlock, withCtx, createVNode, createElementBlock, createTextVNode, Fragment, renderList, toDisplayString, createCommentVNode, createElementVNode, withModifiers, normalizeClass, h, ref, watch, resolveDirective, withDirectives } from 'vue';
import { useRouter } from 'vue-router';

var _sfc_main$4 = defineComponent({
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { useCollectionsStore } = useStores();
    const collectionsStore = useCollectionsStore();
    const router = useRouter();
    const collections = computed(() => {
      if (!collectionsStore || !collectionsStore.collections) {
        return [];
      }
      return collectionsStore.collections.filter((c) => !c.collection.startsWith("directus_"));
    });
    const tree = computed(() => {
      const items = collections.value.map((c) => ({
        ...c,
        name: c.meta?.display_name || c.collection,
        children: []
      }));
      const root = [];
      const map = {};
      items.forEach((item) => {
        map[item.collection] = item;
      });
      items.forEach((item) => {
        const parentId = item.meta?.group;
        if (parentId && map[parentId]) {
          map[parentId].children.push(item);
        } else {
          root.push(item);
        }
      });
      return root;
    });
    const isWithinGroup = (item) => {
      if (props.collection === item.collection) {
        return true;
      }
      return item.children.some((child) => child.collection === props.collection);
    };
    return {
      tree,
      isWithinGroup,
      $router: router
    };
  }
});

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=true===r.prepend?"prepend":"append",d=true===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$5 = "\n.child-item[data-v-b950b17b] {\r\n  padding-left: 32px;\n}\r\n";
n(css$5,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_list_item_icon = resolveComponent("v-list-item-icon");
  const _component_v_list_item_title = resolveComponent("v-list-item-title");
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  const _component_v_list_item = resolveComponent("v-list-item");
  const _component_v_divider = resolveComponent("v-divider");
  const _component_v_list_group = resolveComponent("v-list-group");
  const _component_v_list = resolveComponent("v-list");
  return openBlock(), createBlock(_component_v_list, { nav: "" }, {
    default: withCtx(() => [
      createVNode(_component_v_list_item, {
        key: "main",
        exact: "",
        to: "/protoqol/schema"
      }, {
        default: withCtx(() => [
          createVNode(_component_v_list_item_icon, null, {
            default: withCtx(() => [
              createVNode(_component_v_icon, { name: "data_table" })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_list_item_content, null, {
            default: withCtx(() => [
              createVNode(_component_v_list_item_title, null, {
                default: withCtx(() => [..._cache[0] || (_cache[0] = [
                  createTextVNode(
                    "All collections",
                    -1
                    /* CACHED */
                  )
                ])]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_v_divider),
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.tree, (item) => {
          return openBlock(), createElementBlock(
            Fragment,
            {
              key: item.collection
            },
            [
              item.children && item.children.length > 0 ? (openBlock(), createBlock(_component_v_list_group, {
                key: 0,
                active: _ctx.isWithinGroup(item),
                clickable: item.meta && item.meta.type !== "folder",
                value: item.collection,
                onClick: ($event) => item.meta && item.meta.type !== "folder" ? _ctx.$router.push(`/protoqol/schema/${item.collection}`) : null
              }, {
                activator: withCtx(() => [
                  createVNode(
                    _component_v_list_item_icon,
                    null,
                    {
                      default: withCtx(() => [
                        createVNode(_component_v_icon, {
                          name: item.meta && item.meta.icon ? item.meta.icon : item.meta && item.meta.type === "folder" ? "folder" : "database"
                        }, null, 8, ["name"])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  createVNode(
                    _component_v_list_item_content,
                    null,
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_v_list_item_title,
                          null,
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(item.name),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ]),
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(item.children, (child) => {
                      return openBlock(), createBlock(_component_v_list_item, {
                        key: child.collection,
                        to: `/protoqol/schema/${child.collection}`,
                        class: "child-item"
                      }, {
                        default: withCtx(() => [
                          createVNode(
                            _component_v_list_item_icon,
                            null,
                            {
                              default: withCtx(() => [
                                createVNode(_component_v_icon, {
                                  name: child.meta && child.meta.icon ? child.meta.icon : "database"
                                }, null, 8, ["name"])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          ),
                          createVNode(
                            _component_v_list_item_content,
                            null,
                            {
                              default: withCtx(() => [
                                createVNode(
                                  _component_v_list_item_title,
                                  null,
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(child.name),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["to"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["active", "clickable", "value", "onClick"])) : (openBlock(), createBlock(_component_v_list_item, {
                key: item.collection,
                to: `/protoqol/schema/${item.collection}`
              }, {
                default: withCtx(() => [
                  createVNode(
                    _component_v_list_item_icon,
                    null,
                    {
                      default: withCtx(() => [
                        createVNode(_component_v_icon, {
                          name: item.meta && item.meta.icon ? item.meta.icon : item.meta && item.meta.type === "folder" ? "folder" : "database"
                        }, null, 8, ["name"])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  createVNode(
                    _component_v_list_item_content,
                    null,
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_v_list_item_title,
                          null,
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(item.name),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["to"]))
            ],
            64
            /* STABLE_FRAGMENT */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]),
    _: 1
    /* STABLE */
  });
}
var Navigation = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-b950b17b"]]);

var _sfc_main$3 = defineComponent({
  name: "fields",
  props: {
    collection: {
      type: String,
      default: null
    },
    rows: {
      type: Array,
      default: () => []
    },
    selectedFields: {
      type: Array,
      default: () => []
    },
    error: {
      type: String,
      default: void 0
    }
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
      someSelected
    };
  }
});

var css$4 = "\n.fields-container[data-v-ac117d45] {\r\n  width: 100%;\r\n  text-align: left;\n}\n.table-section[data-v-ac117d45] {\r\n  width: 100%;\n}\n.v-table[data-v-ac117d45] {\r\n  width: 100%;\r\n  border-collapse: separate;\r\n  border-spacing: 0 8px;\n}\n.v-table thead th[data-v-ac117d45] {\r\n  padding: 8px 12px;\r\n  text-align: left;\r\n  color: var(--theme--foreground-accent);\r\n  font-size: 12px;\r\n  font-weight: var(--theme--form--field--label--font-weight);\r\n  font-family: var(--theme--form--field--label--font-family);\r\n  text-transform: uppercase;\n}\n.v-table tbody tr[data-v-ac117d45] {\r\n  cursor: pointer;\n}\n.v-table tbody tr[data-v-ac117d45]:hover {\r\n  border-color: var(--theme--border-color-accent);\n}\n.v-table td[data-v-ac117d45] {\r\n  padding: 12px;\r\n  border-top: var(--theme--border-width) solid var(--theme--border-color-subdued);\r\n  border-bottom: var(--theme--border-width) solid var(--theme--border-color-subdued);\n}\n.v-table td[data-v-ac117d45]:first-child {\r\n  border-left: var(--theme--border-width) solid var(--theme--border-color-subdued);\r\n  border-top-left-radius: var(--theme--border-radius);\r\n  border-bottom-left-radius: var(--theme--border-radius);\n}\n.v-table td[data-v-ac117d45]:last-child {\r\n  border-right: var(--theme--border-width) solid var(--theme--border-color-subdued);\r\n  border-top-right-radius: var(--theme--border-radius);\r\n  border-bottom-right-radius: var(--theme--border-radius);\n}\n.selection[data-v-ac117d45] {\r\n  width: 48px;\r\n  text-align: center;\n}\n.field-name[data-v-ac117d45] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\n}\n.name[data-v-ac117d45] {\r\n  font-family: var(--theme--fonts--monospace--font-family);\r\n  font-weight: var(--theme--fonts--monospace--font-weight);\r\n  font-size: 14px;\r\n  color: var(--theme--foreground);\n}\n.type-label[data-v-ac117d45] {\r\n  font-family: var(--theme--fonts--monospace--font-family);\r\n  font-weight: var(--theme--fonts--monospace--font-weight);\r\n  font-size: 14px;\r\n  color: var(--theme--foreground);\n}\n.required[data-v-ac117d45] {\r\n  width: 80px;\r\n  text-align: center;\n}\n.text-success[data-v-ac117d45] {\r\n  color: var(--theme--success);\n}\n.text-muted[data-v-ac117d45] {\r\n  color: var(--theme--danger-accent);\n}\r\n\r\n";
n(css$4,{});

const _hoisted_1$2 = { class: "fields-container" };
const _hoisted_2$2 = {
  key: 1,
  class: "table-section"
};
const _hoisted_3$2 = { class: "v-table" };
const _hoisted_4$2 = { class: "selection" };
const _hoisted_5$2 = ["onClick"];
const _hoisted_6$2 = { class: "field" };
const _hoisted_7$1 = { class: "field-name" };
const _hoisted_8$1 = { class: "name" };
const _hoisted_9$1 = { class: "type" };
const _hoisted_10$1 = { class: "type-label" };
const _hoisted_11$1 = { class: "required" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_notice = resolveComponent("v-notice");
  const _component_v_checkbox = resolveComponent("v-checkbox");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_info = resolveComponent("v-info");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    _ctx.error ? (openBlock(), createBlock(_component_v_notice, {
      key: 0,
      type: "danger"
    }, {
      default: withCtx(() => [
        createTextVNode(
          " Error: " + toDisplayString(_ctx.error),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true),
    _ctx.rows && _ctx.rows.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
      createElementVNode("table", _hoisted_3$2, [
        createElementVNode("thead", null, [
          createElementVNode("tr", null, [
            createElementVNode("th", _hoisted_4$2, [
              createVNode(_component_v_checkbox, {
                indeterminate: _ctx.someSelected,
                "model-value": _ctx.allSelected,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle-all"))
              }, null, 8, ["indeterminate", "model-value"])
            ]),
            _cache[2] || (_cache[2] = createElementVNode(
              "th",
              { class: "field" },
              "Field",
              -1
              /* CACHED */
            )),
            _cache[3] || (_cache[3] = createElementVNode(
              "th",
              { class: "type" },
              "Type",
              -1
              /* CACHED */
            )),
            _cache[4] || (_cache[4] = createElementVNode(
              "th",
              { class: "required" },
              "Required",
              -1
              /* CACHED */
            ))
          ])
        ]),
        createElementVNode("tbody", null, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.rows, (row) => {
              return openBlock(), createElementBlock("tr", {
                key: row.field,
                onClick: ($event) => _ctx.$emit("toggle-field", row.field)
              }, [
                createElementVNode("td", {
                  class: "selection",
                  onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  createVNode(_component_v_checkbox, {
                    "model-value": _ctx.selectedFields.includes(row.field),
                    "onUpdate:modelValue": ($event) => _ctx.$emit("toggle-field", row.field)
                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                ]),
                createElementVNode("td", _hoisted_6$2, [
                  createElementVNode("div", _hoisted_7$1, [
                    createElementVNode(
                      "span",
                      _hoisted_8$1,
                      toDisplayString(row.field),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                createElementVNode("td", _hoisted_9$1, [
                  createElementVNode(
                    "span",
                    _hoisted_10$1,
                    toDisplayString(row.type.replace("geometry.", "")),
                    1
                    /* TEXT */
                  )
                ]),
                createElementVNode("td", _hoisted_11$1, [
                  createVNode(_component_v_icon, {
                    class: normalizeClass(row.required ? "text-success" : "text-muted"),
                    name: row.required ? "check" : "close",
                    size: "18"
                  }, null, 8, ["class", "name"])
                ])
              ], 8, _hoisted_5$2);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ])) : _ctx.collection ? (openBlock(), createBlock(_component_v_info, {
      key: 2,
      icon: "info_outline",
      title: "No fields found"
    }, {
      default: withCtx(() => [..._cache[5] || (_cache[5] = [
        createTextVNode(
          " This collection doesn't seem to have any fields. ",
          -1
          /* CACHED */
        )
      ])]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true)
  ]);
}
var Fields = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-ac117d45"]]);

var _sfc_main$2 = defineComponent({
  name: "collections",
  props: {
    collections: {
      type: Array,
      default: () => []
    },
    selectedCollections: {
      type: Array,
      default: () => []
    }
  },
  emits: ["toggle-collection", "toggle-all"],
  setup(props) {
    const tree = computed(() => {
      const items = props.collections.map((c) => ({
        ...c,
        name: c.meta?.display_name || c.collection,
        children: []
      }));
      const root = [];
      const map = {};
      items.forEach((item) => {
        map[item.collection] = item;
      });
      items.forEach((item) => {
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
      const selectableCollections = props.collections.filter((c) => c.meta?.type !== "folder");
      return selectableCollections.length > 0 && props.selectedCollections.length === selectableCollections.length;
    });
    const someSelected = computed(() => {
      const selectableCollections = props.collections.filter((c) => c.meta?.type !== "folder");
      return props.selectedCollections.length > 0 && props.selectedCollections.length < selectableCollections.length;
    });
    return {
      tree,
      allSelected,
      someSelected
    };
  }
});

var css$3 = "\n.collections-container[data-v-69d14472] {\r\n  width: 100%;\r\n  text-align: left;\n}\n.table-section[data-v-69d14472] {\r\n  width: 100%;\n}\n.v-table[data-v-69d14472] {\r\n  width: 100%;\r\n  border-collapse: separate;\r\n  border-spacing: 0 8px;\n}\n.v-table thead th[data-v-69d14472] {\r\n  padding: 8px 12px;\r\n  text-align: left;\r\n\r\n  color: var(--theme--foreground-accent);\r\n  font-size: 16px;\r\n  font-weight: var(--theme--form--field--label--font-weight);\r\n  font-family: var(--theme--form--field--label--font-family);\n}\n.v-table tbody tr[data-v-69d14472] {\r\n  cursor: pointer;\n}\n.v-table tbody tr[data-v-69d14472]:hover {\r\n  border-color: var(--theme--border-color-accent);\n}\n.v-table td[data-v-69d14472] {\r\n  padding: 16px 12px;\r\n  border-top: var(--theme--border-width) solid var(--theme--border-color-subdued);\r\n  border-bottom: var(--theme--border-width) solid var(--theme--border-color-subdued);\n}\n.v-table td[data-v-69d14472]:first-child {\r\n  border-left: var(--theme--border-width) solid var(--theme--border-color-subdued);\r\n  border-top-left-radius: var(--theme--border-radius);\r\n  border-bottom-left-radius: var(--theme--border-radius);\n}\n.v-table td[data-v-69d14472]:last-child {\r\n  border-right: var(--theme--border-width) solid var(--theme--border-color-subdued);\r\n  border-top-right-radius: var(--theme--border-radius);\r\n  border-bottom-right-radius: var(--theme--border-radius);\n}\n.selection[data-v-69d14472] {\r\n  width: 48px;\r\n  text-align: center;\n}\n.collection-name[data-v-69d14472] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\n}\n.name[data-v-69d14472] {\r\n  font-family: var(--theme--fonts--monospace--font-family);\r\n  font-size: 14px;\r\n  color: var(--theme--foreground);\n}\n.child-name[data-v-69d14472] {\r\n  padding-left: 32px;\n}\n.folder-row[data-v-69d14472] {\r\n  background-color: var(--theme--background-subdued);\r\n  cursor: default !important;\n}\r\n";
n(css$3,{});

const _hoisted_1$1 = { class: "collections-container" };
const _hoisted_2$1 = {
  key: 0,
  class: "table-section"
};
const _hoisted_3$1 = { class: "v-table" };
const _hoisted_4$1 = { class: "selection" };
const _hoisted_5$1 = ["onClick"];
const _hoisted_6$1 = { class: "collection" };
const _hoisted_7 = { class: "collection-name" };
const _hoisted_8 = { class: "name" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "collection" };
const _hoisted_11 = { class: "collection-name child-name" };
const _hoisted_12 = { class: "name" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_checkbox = resolveComponent("v-checkbox");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_info = resolveComponent("v-info");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    _ctx.tree && _ctx.tree.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
      createElementVNode("table", _hoisted_3$1, [
        createElementVNode("thead", null, [
          createElementVNode("tr", null, [
            createElementVNode("th", _hoisted_4$1, [
              createVNode(_component_v_checkbox, {
                indeterminate: _ctx.someSelected,
                "model-value": _ctx.allSelected,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle-all"))
              }, null, 8, ["indeterminate", "model-value"])
            ]),
            _cache[3] || (_cache[3] = createElementVNode(
              "th",
              { class: "collection" },
              "Collection",
              -1
              /* CACHED */
            ))
          ])
        ]),
        createElementVNode("tbody", null, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.tree, (item) => {
              return openBlock(), createElementBlock(
                Fragment,
                {
                  key: item.collection
                },
                [
                  createElementVNode("tr", {
                    class: normalizeClass({ "folder-row": item.meta && item.meta.type === "folder" }),
                    onClick: ($event) => item.meta && item.meta.type !== "folder" ? _ctx.$emit("toggle-collection", item.collection) : null
                  }, [
                    createElementVNode("td", {
                      class: "selection",
                      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      item.meta && item.meta.type !== "folder" ? (openBlock(), createBlock(_component_v_checkbox, {
                        key: 0,
                        "model-value": _ctx.selectedCollections.includes(item.collection),
                        "onUpdate:modelValue": ($event) => _ctx.$emit("toggle-collection", item.collection)
                      }, null, 8, ["model-value", "onUpdate:modelValue"])) : createCommentVNode("v-if", true)
                    ]),
                    createElementVNode("td", _hoisted_6$1, [
                      createElementVNode("div", _hoisted_7, [
                        createVNode(_component_v_icon, {
                          name: item.meta && item.meta.icon ? item.meta.icon : item.meta && item.meta.type === "folder" ? "folder" : "database"
                        }, null, 8, ["name"]),
                        createElementVNode(
                          "span",
                          _hoisted_8,
                          toDisplayString(item.name),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ], 10, _hoisted_5$1),
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(item.children, (child) => {
                      return openBlock(), createElementBlock("tr", {
                        key: child.collection,
                        onClick: ($event) => _ctx.$emit("toggle-collection", child.collection)
                      }, [
                        createElementVNode("td", {
                          class: "selection",
                          onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                          }, ["stop"]))
                        }, [
                          createVNode(_component_v_checkbox, {
                            "model-value": _ctx.selectedCollections.includes(child.collection),
                            "onUpdate:modelValue": ($event) => _ctx.$emit("toggle-collection", child.collection)
                          }, null, 8, ["model-value", "onUpdate:modelValue"])
                        ]),
                        createElementVNode("td", _hoisted_10, [
                          createElementVNode("div", _hoisted_11, [
                            createVNode(_component_v_icon, {
                              name: child.meta && child.meta.icon ? child.meta.icon : "database"
                            }, null, 8, ["name"]),
                            createElementVNode(
                              "span",
                              _hoisted_12,
                              toDisplayString(child.name),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ], 8, _hoisted_9);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ])) : (openBlock(), createBlock(_component_v_info, {
      key: 1,
      icon: "info_outline",
      title: "No collections found"
    }, {
      default: withCtx(() => [..._cache[4] || (_cache[4] = [
        createTextVNode(
          " No collections available to display. ",
          -1
          /* CACHED */
        )
      ])]),
      _: 1
      /* STABLE */
    }))
  ]);
}
var Collections = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-69d14472"]]);

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/* eslint-disable no-multi-assign */

var core;
var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core;
	hasRequiredCore = 1;
	function deepFreeze(obj) {
	  if (obj instanceof Map) {
	    obj.clear =
	      obj.delete =
	      obj.set =
	        function () {
	          throw new Error('map is read-only');
	        };
	  } else if (obj instanceof Set) {
	    obj.add =
	      obj.clear =
	      obj.delete =
	        function () {
	          throw new Error('set is read-only');
	        };
	  }

	  // Freeze self
	  Object.freeze(obj);

	  Object.getOwnPropertyNames(obj).forEach((name) => {
	    const prop = obj[name];
	    const type = typeof prop;

	    // Freeze prop if it is an object or function and also not already frozen
	    if ((type === 'object' || type === 'function') && !Object.isFrozen(prop)) {
	      deepFreeze(prop);
	    }
	  });

	  return obj;
	}

	/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */
	/** @typedef {import('highlight.js').CompiledMode} CompiledMode */
	/** @implements CallbackResponse */

	class Response {
	  /**
	   * @param {CompiledMode} mode
	   */
	  constructor(mode) {
	    // eslint-disable-next-line no-undefined
	    if (mode.data === undefined) mode.data = {};

	    this.data = mode.data;
	    this.isMatchIgnored = false;
	  }

	  ignoreMatch() {
	    this.isMatchIgnored = true;
	  }
	}

	/**
	 * @param {string} value
	 * @returns {string}
	 */
	function escapeHTML(value) {
	  return value
	    .replace(/&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#x27;');
	}

	/**
	 * performs a shallow merge of multiple objects into one
	 *
	 * @template T
	 * @param {T} original
	 * @param {Record<string,any>[]} objects
	 * @returns {T} a single new object
	 */
	function inherit$1(original, ...objects) {
	  /** @type Record<string,any> */
	  const result = Object.create(null);

	  for (const key in original) {
	    result[key] = original[key];
	  }
	  objects.forEach(function(obj) {
	    for (const key in obj) {
	      result[key] = obj[key];
	    }
	  });
	  return /** @type {T} */ (result);
	}

	/**
	 * @typedef {object} Renderer
	 * @property {(text: string) => void} addText
	 * @property {(node: Node) => void} openNode
	 * @property {(node: Node) => void} closeNode
	 * @property {() => string} value
	 */

	/** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */
	/** @typedef {{walk: (r: Renderer) => void}} Tree */
	/** */

	const SPAN_CLOSE = '</span>';

	/**
	 * Determines if a node needs to be wrapped in <span>
	 *
	 * @param {Node} node */
	const emitsWrappingTags = (node) => {
	  // rarely we can have a sublanguage where language is undefined
	  // TODO: track down why
	  return !!node.scope;
	};

	/**
	 *
	 * @param {string} name
	 * @param {{prefix:string}} options
	 */
	const scopeToCSSClass = (name, { prefix }) => {
	  // sub-language
	  if (name.startsWith("language:")) {
	    return name.replace("language:", "language-");
	  }
	  // tiered scope: comment.line
	  if (name.includes(".")) {
	    const pieces = name.split(".");
	    return [
	      `${prefix}${pieces.shift()}`,
	      ...(pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`))
	    ].join(" ");
	  }
	  // simple scope
	  return `${prefix}${name}`;
	};

	/** @type {Renderer} */
	class HTMLRenderer {
	  /**
	   * Creates a new HTMLRenderer
	   *
	   * @param {Tree} parseTree - the parse tree (must support `walk` API)
	   * @param {{classPrefix: string}} options
	   */
	  constructor(parseTree, options) {
	    this.buffer = "";
	    this.classPrefix = options.classPrefix;
	    parseTree.walk(this);
	  }

	  /**
	   * Adds texts to the output stream
	   *
	   * @param {string} text */
	  addText(text) {
	    this.buffer += escapeHTML(text);
	  }

	  /**
	   * Adds a node open to the output stream (if needed)
	   *
	   * @param {Node} node */
	  openNode(node) {
	    if (!emitsWrappingTags(node)) return;

	    const className = scopeToCSSClass(node.scope,
	      { prefix: this.classPrefix });
	    this.span(className);
	  }

	  /**
	   * Adds a node close to the output stream (if needed)
	   *
	   * @param {Node} node */
	  closeNode(node) {
	    if (!emitsWrappingTags(node)) return;

	    this.buffer += SPAN_CLOSE;
	  }

	  /**
	   * returns the accumulated buffer
	  */
	  value() {
	    return this.buffer;
	  }

	  // helpers

	  /**
	   * Builds a span element
	   *
	   * @param {string} className */
	  span(className) {
	    this.buffer += `<span class="${className}">`;
	  }
	}

	/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */
	/** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */
	/** @typedef {import('highlight.js').Emitter} Emitter */
	/**  */

	/** @returns {DataNode} */
	const newNode = (opts = {}) => {
	  /** @type DataNode */
	  const result = { children: [] };
	  Object.assign(result, opts);
	  return result;
	};

	class TokenTree {
	  constructor() {
	    /** @type DataNode */
	    this.rootNode = newNode();
	    this.stack = [this.rootNode];
	  }

	  get top() {
	    return this.stack[this.stack.length - 1];
	  }

	  get root() { return this.rootNode; }

	  /** @param {Node} node */
	  add(node) {
	    this.top.children.push(node);
	  }

	  /** @param {string} scope */
	  openNode(scope) {
	    /** @type Node */
	    const node = newNode({ scope });
	    this.add(node);
	    this.stack.push(node);
	  }

	  closeNode() {
	    if (this.stack.length > 1) {
	      return this.stack.pop();
	    }
	    // eslint-disable-next-line no-undefined
	    return undefined;
	  }

	  closeAllNodes() {
	    while (this.closeNode());
	  }

	  toJSON() {
	    return JSON.stringify(this.rootNode, null, 4);
	  }

	  /**
	   * @typedef { import("./html_renderer").Renderer } Renderer
	   * @param {Renderer} builder
	   */
	  walk(builder) {
	    // this does not
	    return this.constructor._walk(builder, this.rootNode);
	    // this works
	    // return TokenTree._walk(builder, this.rootNode);
	  }

	  /**
	   * @param {Renderer} builder
	   * @param {Node} node
	   */
	  static _walk(builder, node) {
	    if (typeof node === "string") {
	      builder.addText(node);
	    } else if (node.children) {
	      builder.openNode(node);
	      node.children.forEach((child) => this._walk(builder, child));
	      builder.closeNode(node);
	    }
	    return builder;
	  }

	  /**
	   * @param {Node} node
	   */
	  static _collapse(node) {
	    if (typeof node === "string") return;
	    if (!node.children) return;

	    if (node.children.every(el => typeof el === "string")) {
	      // node.text = node.children.join("");
	      // delete node.children;
	      node.children = [node.children.join("")];
	    } else {
	      node.children.forEach((child) => {
	        TokenTree._collapse(child);
	      });
	    }
	  }
	}

	/**
	  Currently this is all private API, but this is the minimal API necessary
	  that an Emitter must implement to fully support the parser.

	  Minimal interface:

	  - addText(text)
	  - __addSublanguage(emitter, subLanguageName)
	  - startScope(scope)
	  - endScope()
	  - finalize()
	  - toHTML()

	*/

	/**
	 * @implements {Emitter}
	 */
	class TokenTreeEmitter extends TokenTree {
	  /**
	   * @param {*} options
	   */
	  constructor(options) {
	    super();
	    this.options = options;
	  }

	  /**
	   * @param {string} text
	   */
	  addText(text) {
	    if (text === "") { return; }

	    this.add(text);
	  }

	  /** @param {string} scope */
	  startScope(scope) {
	    this.openNode(scope);
	  }

	  endScope() {
	    this.closeNode();
	  }

	  /**
	   * @param {Emitter & {root: DataNode}} emitter
	   * @param {string} name
	   */
	  __addSublanguage(emitter, name) {
	    /** @type DataNode */
	    const node = emitter.root;
	    if (name) node.scope = `language:${name}`;

	    this.add(node);
	  }

	  toHTML() {
	    const renderer = new HTMLRenderer(this, this.options);
	    return renderer.value();
	  }

	  finalize() {
	    this.closeAllNodes();
	    return true;
	  }
	}

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function lookahead(re) {
	  return concat('(?=', re, ')');
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function anyNumberOfTimes(re) {
	  return concat('(?:', re, ')*');
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function optional(re) {
	  return concat('(?:', re, ')?');
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat(...args) {
	  const joined = args.map((x) => source(x)).join("");
	  return joined;
	}

	/**
	 * @param { Array<string | RegExp | Object> } args
	 * @returns {object}
	 */
	function stripOptionsFromArgs(args) {
	  const opts = args[args.length - 1];

	  if (typeof opts === 'object' && opts.constructor === Object) {
	    args.splice(args.length - 1, 1);
	    return opts;
	  } else {
	    return {};
	  }
	}

	/** @typedef { {capture?: boolean} } RegexEitherOptions */

	/**
	 * Any of the passed expresssions may match
	 *
	 * Creates a huge this | this | that | that match
	 * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
	 * @returns {string}
	 */
	function either(...args) {
	  /** @type { object & {capture?: boolean} }  */
	  const opts = stripOptionsFromArgs(args);
	  const joined = '('
	    + (opts.capture ? "" : "?:")
	    + args.map((x) => source(x)).join("|") + ")";
	  return joined;
	}

	/**
	 * @param {RegExp | string} re
	 * @returns {number}
	 */
	function countMatchGroups(re) {
	  return (new RegExp(re.toString() + '|')).exec('').length - 1;
	}

	/**
	 * Does lexeme start with a regular expression match at the beginning
	 * @param {RegExp} re
	 * @param {string} lexeme
	 */
	function startsWith(re, lexeme) {
	  const match = re && re.exec(lexeme);
	  return match && match.index === 0;
	}

	// BACKREF_RE matches an open parenthesis or backreference. To avoid
	// an incorrect parse, it additionally matches the following:
	// - [...] elements, where the meaning of parentheses and escapes change
	// - other escape sequences, so we do not misparse escape sequences as
	//   interesting elements
	// - non-matching or lookahead parentheses, which do not capture. These
	//   follow the '(' with a '?'.
	const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;

	// **INTERNAL** Not intended for outside usage
	// join logically computes regexps.join(separator), but fixes the
	// backreferences so they continue to match.
	// it also places each individual regular expression into it's own
	// match group, keeping track of the sequencing of those match groups
	// is currently an exercise for the caller. :-)
	/**
	 * @param {(string | RegExp)[]} regexps
	 * @param {{joinWith: string}} opts
	 * @returns {string}
	 */
	function _rewriteBackreferences(regexps, { joinWith }) {
	  let numCaptures = 0;

	  return regexps.map((regex) => {
	    numCaptures += 1;
	    const offset = numCaptures;
	    let re = source(regex);
	    let out = '';

	    while (re.length > 0) {
	      const match = BACKREF_RE.exec(re);
	      if (!match) {
	        out += re;
	        break;
	      }
	      out += re.substring(0, match.index);
	      re = re.substring(match.index + match[0].length);
	      if (match[0][0] === '\\' && match[1]) {
	        // Adjust the backreference.
	        out += '\\' + String(Number(match[1]) + offset);
	      } else {
	        out += match[0];
	        if (match[0] === '(') {
	          numCaptures++;
	        }
	      }
	    }
	    return out;
	  }).map(re => `(${re})`).join(joinWith);
	}

	/** @typedef {import('highlight.js').Mode} Mode */
	/** @typedef {import('highlight.js').ModeCallback} ModeCallback */

	// Common regexps
	const MATCH_NOTHING_RE = /\b\B/;
	const IDENT_RE = '[a-zA-Z]\\w*';
	const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
	const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
	const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
	const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
	const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

	/**
	* @param { Partial<Mode> & {binary?: string | RegExp} } opts
	*/
	const SHEBANG = (opts = {}) => {
	  const beginShebang = /^#![ ]*\//;
	  if (opts.binary) {
	    opts.begin = concat(
	      beginShebang,
	      /.*\b/,
	      opts.binary,
	      /\b.*/);
	  }
	  return inherit$1({
	    scope: 'meta',
	    begin: beginShebang,
	    end: /$/,
	    relevance: 0,
	    /** @type {ModeCallback} */
	    "on:begin": (m, resp) => {
	      if (m.index !== 0) resp.ignoreMatch();
	    }
	  }, opts);
	};

	// Common modes
	const BACKSLASH_ESCAPE = {
	  begin: '\\\\[\\s\\S]', relevance: 0
	};
	const APOS_STRING_MODE = {
	  scope: 'string',
	  begin: '\'',
	  end: '\'',
	  illegal: '\\n',
	  contains: [BACKSLASH_ESCAPE]
	};
	const QUOTE_STRING_MODE = {
	  scope: 'string',
	  begin: '"',
	  end: '"',
	  illegal: '\\n',
	  contains: [BACKSLASH_ESCAPE]
	};
	const PHRASAL_WORDS_MODE = {
	  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
	};
	/**
	 * Creates a comment mode
	 *
	 * @param {string | RegExp} begin
	 * @param {string | RegExp} end
	 * @param {Mode | {}} [modeOptions]
	 * @returns {Partial<Mode>}
	 */
	const COMMENT = function(begin, end, modeOptions = {}) {
	  const mode = inherit$1(
	    {
	      scope: 'comment',
	      begin,
	      end,
	      contains: []
	    },
	    modeOptions
	  );
	  mode.contains.push({
	    scope: 'doctag',
	    // hack to avoid the space from being included. the space is necessary to
	    // match here to prevent the plain text rule below from gobbling up doctags
	    begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',
	    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
	    excludeBegin: true,
	    relevance: 0
	  });
	  const ENGLISH_WORD = either(
	    // list of common 1 and 2 letter words in English
	    "I",
	    "a",
	    "is",
	    "so",
	    "us",
	    "to",
	    "at",
	    "if",
	    "in",
	    "it",
	    "on",
	    // note: this is not an exhaustive list of contractions, just popular ones
	    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, // contractions - can't we'd they're let's, etc
	    /[A-Za-z]+[-][a-z]+/, // `no-way`, etc.
	    /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences
	  );
	  // looking like plain text, more likely to be a comment
	  mode.contains.push(
	    {
	      // TODO: how to include ", (, ) without breaking grammars that use these for
	      // comment delimiters?
	      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
	      // ---

	      // this tries to find sequences of 3 english words in a row (without any
	      // "programming" type syntax) this gives us a strong signal that we've
	      // TRULY found a comment - vs perhaps scanning with the wrong language.
	      // It's possible to find something that LOOKS like the start of the
	      // comment - but then if there is no readable text - good chance it is a
	      // false match and not a comment.
	      //
	      // for a visual example please see:
	      // https://github.com/highlightjs/highlight.js/issues/2827

	      begin: concat(
	        /[ ]+/, // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
	        '(',
	        ENGLISH_WORD,
	        /[.]?[:]?([.][ ]|[ ])/,
	        '){3}') // look for 3 words in a row
	    }
	  );
	  return mode;
	};
	const C_LINE_COMMENT_MODE = COMMENT('//', '$');
	const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
	const HASH_COMMENT_MODE = COMMENT('#', '$');
	const NUMBER_MODE = {
	  scope: 'number',
	  begin: NUMBER_RE,
	  relevance: 0
	};
	const C_NUMBER_MODE = {
	  scope: 'number',
	  begin: C_NUMBER_RE,
	  relevance: 0
	};
	const BINARY_NUMBER_MODE = {
	  scope: 'number',
	  begin: BINARY_NUMBER_RE,
	  relevance: 0
	};
	const REGEXP_MODE = {
	  scope: "regexp",
	  begin: /\/(?=[^/\n]*\/)/,
	  end: /\/[gimuy]*/,
	  contains: [
	    BACKSLASH_ESCAPE,
	    {
	      begin: /\[/,
	      end: /\]/,
	      relevance: 0,
	      contains: [BACKSLASH_ESCAPE]
	    }
	  ]
	};
	const TITLE_MODE = {
	  scope: 'title',
	  begin: IDENT_RE,
	  relevance: 0
	};
	const UNDERSCORE_TITLE_MODE = {
	  scope: 'title',
	  begin: UNDERSCORE_IDENT_RE,
	  relevance: 0
	};
	const METHOD_GUARD = {
	  // excludes method names from keyword processing
	  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
	  relevance: 0
	};

	/**
	 * Adds end same as begin mechanics to a mode
	 *
	 * Your mode must include at least a single () match group as that first match
	 * group is what is used for comparison
	 * @param {Partial<Mode>} mode
	 */
	const END_SAME_AS_BEGIN = function(mode) {
	  return Object.assign(mode,
	    {
	      /** @type {ModeCallback} */
	      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
	      /** @type {ModeCallback} */
	      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
	    });
	};

	var MODES = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  APOS_STRING_MODE: APOS_STRING_MODE,
	  BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
	  BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
	  BINARY_NUMBER_RE: BINARY_NUMBER_RE,
	  COMMENT: COMMENT,
	  C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
	  C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
	  C_NUMBER_MODE: C_NUMBER_MODE,
	  C_NUMBER_RE: C_NUMBER_RE,
	  END_SAME_AS_BEGIN: END_SAME_AS_BEGIN,
	  HASH_COMMENT_MODE: HASH_COMMENT_MODE,
	  IDENT_RE: IDENT_RE,
	  MATCH_NOTHING_RE: MATCH_NOTHING_RE,
	  METHOD_GUARD: METHOD_GUARD,
	  NUMBER_MODE: NUMBER_MODE,
	  NUMBER_RE: NUMBER_RE,
	  PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
	  QUOTE_STRING_MODE: QUOTE_STRING_MODE,
	  REGEXP_MODE: REGEXP_MODE,
	  RE_STARTERS_RE: RE_STARTERS_RE,
	  SHEBANG: SHEBANG,
	  TITLE_MODE: TITLE_MODE,
	  UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
	  UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE
	});

	/**
	@typedef {import('highlight.js').CallbackResponse} CallbackResponse
	@typedef {import('highlight.js').CompilerExt} CompilerExt
	*/

	// Grammar extensions / plugins
	// See: https://github.com/highlightjs/highlight.js/issues/2833

	// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
	// without requiring any underlying changes to the compiler internals.

	// `compileMatch` being the perfect small example of now allowing a grammar
	// author to write `match` when they desire to match a single expression rather
	// than being forced to use `begin`.  The extension then just moves `match` into
	// `begin` when it runs.  Ie, no features have been added, but we've just made
	// the experience of writing (and reading grammars) a little bit nicer.

	// ------

	// TODO: We need negative look-behind support to do this properly
	/**
	 * Skip a match if it has a preceding dot
	 *
	 * This is used for `beginKeywords` to prevent matching expressions such as
	 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
	 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
	 * @param {RegExpMatchArray} match
	 * @param {CallbackResponse} response
	 */
	function skipIfHasPrecedingDot(match, response) {
	  const before = match.input[match.index - 1];
	  if (before === ".") {
	    response.ignoreMatch();
	  }
	}

	/**
	 *
	 * @type {CompilerExt}
	 */
	function scopeClassName(mode, _parent) {
	  // eslint-disable-next-line no-undefined
	  if (mode.className !== undefined) {
	    mode.scope = mode.className;
	    delete mode.className;
	  }
	}

	/**
	 * `beginKeywords` syntactic sugar
	 * @type {CompilerExt}
	 */
	function beginKeywords(mode, parent) {
	  if (!parent) return;
	  if (!mode.beginKeywords) return;

	  // for languages with keywords that include non-word characters checking for
	  // a word boundary is not sufficient, so instead we check for a word boundary
	  // or whitespace - this does no harm in any case since our keyword engine
	  // doesn't allow spaces in keywords anyways and we still check for the boundary
	  // first
	  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
	  mode.__beforeBegin = skipIfHasPrecedingDot;
	  mode.keywords = mode.keywords || mode.beginKeywords;
	  delete mode.beginKeywords;

	  // prevents double relevance, the keywords themselves provide
	  // relevance, the mode doesn't need to double it
	  // eslint-disable-next-line no-undefined
	  if (mode.relevance === undefined) mode.relevance = 0;
	}

	/**
	 * Allow `illegal` to contain an array of illegal values
	 * @type {CompilerExt}
	 */
	function compileIllegal(mode, _parent) {
	  if (!Array.isArray(mode.illegal)) return;

	  mode.illegal = either(...mode.illegal);
	}

	/**
	 * `match` to match a single expression for readability
	 * @type {CompilerExt}
	 */
	function compileMatch(mode, _parent) {
	  if (!mode.match) return;
	  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

	  mode.begin = mode.match;
	  delete mode.match;
	}

	/**
	 * provides the default 1 relevance to all modes
	 * @type {CompilerExt}
	 */
	function compileRelevance(mode, _parent) {
	  // eslint-disable-next-line no-undefined
	  if (mode.relevance === undefined) mode.relevance = 1;
	}

	// allow beforeMatch to act as a "qualifier" for the match
	// the full match begin must be [beforeMatch][begin]
	const beforeMatchExt = (mode, parent) => {
	  if (!mode.beforeMatch) return;
	  // starts conflicts with endsParent which we need to make sure the child
	  // rule is not matched multiple times
	  if (mode.starts) throw new Error("beforeMatch cannot be used with starts");

	  const originalMode = Object.assign({}, mode);
	  Object.keys(mode).forEach((key) => { delete mode[key]; });

	  mode.keywords = originalMode.keywords;
	  mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
	  mode.starts = {
	    relevance: 0,
	    contains: [
	      Object.assign(originalMode, { endsParent: true })
	    ]
	  };
	  mode.relevance = 0;

	  delete originalMode.beforeMatch;
	};

	// keywords that should have no default relevance value
	const COMMON_KEYWORDS = [
	  'of',
	  'and',
	  'for',
	  'in',
	  'not',
	  'or',
	  'if',
	  'then',
	  'parent', // common variable name
	  'list', // common variable name
	  'value' // common variable name
	];

	const DEFAULT_KEYWORD_SCOPE = "keyword";

	/**
	 * Given raw keywords from a language definition, compile them.
	 *
	 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
	 * @param {boolean} caseInsensitive
	 */
	function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
	  /** @type {import("highlight.js/private").KeywordDict} */
	  const compiledKeywords = Object.create(null);

	  // input can be a string of keywords, an array of keywords, or a object with
	  // named keys representing scopeName (which can then point to a string or array)
	  if (typeof rawKeywords === 'string') {
	    compileList(scopeName, rawKeywords.split(" "));
	  } else if (Array.isArray(rawKeywords)) {
	    compileList(scopeName, rawKeywords);
	  } else {
	    Object.keys(rawKeywords).forEach(function(scopeName) {
	      // collapse all our objects back into the parent object
	      Object.assign(
	        compiledKeywords,
	        compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName)
	      );
	    });
	  }
	  return compiledKeywords;

	  // ---

	  /**
	   * Compiles an individual list of keywords
	   *
	   * Ex: "for if when while|5"
	   *
	   * @param {string} scopeName
	   * @param {Array<string>} keywordList
	   */
	  function compileList(scopeName, keywordList) {
	    if (caseInsensitive) {
	      keywordList = keywordList.map(x => x.toLowerCase());
	    }
	    keywordList.forEach(function(keyword) {
	      const pair = keyword.split('|');
	      compiledKeywords[pair[0]] = [scopeName, scoreForKeyword(pair[0], pair[1])];
	    });
	  }
	}

	/**
	 * Returns the proper score for a given keyword
	 *
	 * Also takes into account comment keywords, which will be scored 0 UNLESS
	 * another score has been manually assigned.
	 * @param {string} keyword
	 * @param {string} [providedScore]
	 */
	function scoreForKeyword(keyword, providedScore) {
	  // manual scores always win over common keywords
	  // so you can force a score of 1 if you really insist
	  if (providedScore) {
	    return Number(providedScore);
	  }

	  return commonKeyword(keyword) ? 0 : 1;
	}

	/**
	 * Determines if a given keyword is common or not
	 *
	 * @param {string} keyword */
	function commonKeyword(keyword) {
	  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
	}

	/*

	For the reasoning behind this please see:
	https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

	*/

	/**
	 * @type {Record<string, boolean>}
	 */
	const seenDeprecations = {};

	/**
	 * @param {string} message
	 */
	const error = (message) => {
	  console.error(message);
	};

	/**
	 * @param {string} message
	 * @param {any} args
	 */
	const warn = (message, ...args) => {
	  console.log(`WARN: ${message}`, ...args);
	};

	/**
	 * @param {string} version
	 * @param {string} message
	 */
	const deprecated = (version, message) => {
	  if (seenDeprecations[`${version}/${message}`]) return;

	  console.log(`Deprecated as of ${version}. ${message}`);
	  seenDeprecations[`${version}/${message}`] = true;
	};

	/* eslint-disable no-throw-literal */

	/**
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	*/

	const MultiClassError = new Error();

	/**
	 * Renumbers labeled scope names to account for additional inner match
	 * groups that otherwise would break everything.
	 *
	 * Lets say we 3 match scopes:
	 *
	 *   { 1 => ..., 2 => ..., 3 => ... }
	 *
	 * So what we need is a clean match like this:
	 *
	 *   (a)(b)(c) => [ "a", "b", "c" ]
	 *
	 * But this falls apart with inner match groups:
	 *
	 * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
	 *
	 * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
	 * What needs to happen is the numbers are remapped:
	 *
	 *   { 1 => ..., 2 => ..., 5 => ... }
	 *
	 * We also need to know that the ONLY groups that should be output
	 * are 1, 2, and 5.  This function handles this behavior.
	 *
	 * @param {CompiledMode} mode
	 * @param {Array<RegExp | string>} regexes
	 * @param {{key: "beginScope"|"endScope"}} opts
	 */
	function remapScopeNames(mode, regexes, { key }) {
	  let offset = 0;
	  const scopeNames = mode[key];
	  /** @type Record<number,boolean> */
	  const emit = {};
	  /** @type Record<number,string> */
	  const positions = {};

	  for (let i = 1; i <= regexes.length; i++) {
	    positions[i + offset] = scopeNames[i];
	    emit[i + offset] = true;
	    offset += countMatchGroups(regexes[i - 1]);
	  }
	  // we use _emit to keep track of which match groups are "top-level" to avoid double
	  // output from inside match groups
	  mode[key] = positions;
	  mode[key]._emit = emit;
	  mode[key]._multi = true;
	}

	/**
	 * @param {CompiledMode} mode
	 */
	function beginMultiClass(mode) {
	  if (!Array.isArray(mode.begin)) return;

	  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
	    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
	    throw MultiClassError;
	  }

	  if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
	    error("beginScope must be object");
	    throw MultiClassError;
	  }

	  remapScopeNames(mode, mode.begin, { key: "beginScope" });
	  mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
	}

	/**
	 * @param {CompiledMode} mode
	 */
	function endMultiClass(mode) {
	  if (!Array.isArray(mode.end)) return;

	  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
	    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
	    throw MultiClassError;
	  }

	  if (typeof mode.endScope !== "object" || mode.endScope === null) {
	    error("endScope must be object");
	    throw MultiClassError;
	  }

	  remapScopeNames(mode, mode.end, { key: "endScope" });
	  mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
	}

	/**
	 * this exists only to allow `scope: {}` to be used beside `match:`
	 * Otherwise `beginScope` would necessary and that would look weird

	  {
	    match: [ /def/, /\w+/ ]
	    scope: { 1: "keyword" , 2: "title" }
	  }

	 * @param {CompiledMode} mode
	 */
	function scopeSugar(mode) {
	  if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
	    mode.beginScope = mode.scope;
	    delete mode.scope;
	  }
	}

	/**
	 * @param {CompiledMode} mode
	 */
	function MultiClass(mode) {
	  scopeSugar(mode);

	  if (typeof mode.beginScope === "string") {
	    mode.beginScope = { _wrap: mode.beginScope };
	  }
	  if (typeof mode.endScope === "string") {
	    mode.endScope = { _wrap: mode.endScope };
	  }

	  beginMultiClass(mode);
	  endMultiClass(mode);
	}

	/**
	@typedef {import('highlight.js').Mode} Mode
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	@typedef {import('highlight.js').Language} Language
	@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
	@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
	*/

	// compilation

	/**
	 * Compiles a language definition result
	 *
	 * Given the raw result of a language definition (Language), compiles this so
	 * that it is ready for highlighting code.
	 * @param {Language} language
	 * @returns {CompiledLanguage}
	 */
	function compileLanguage(language) {
	  /**
	   * Builds a regex with the case sensitivity of the current language
	   *
	   * @param {RegExp | string} value
	   * @param {boolean} [global]
	   */
	  function langRe(value, global) {
	    return new RegExp(
	      source(value),
	      'm'
	      + (language.case_insensitive ? 'i' : '')
	      + (language.unicodeRegex ? 'u' : '')
	      + (global ? 'g' : '')
	    );
	  }

	  /**
	    Stores multiple regular expressions and allows you to quickly search for
	    them all in a string simultaneously - returning the first match.  It does
	    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
	    and joined by `|` - using match groups to track position.  When a match is
	    found checking which position in the array has content allows us to figure
	    out which of the original regexes / match groups triggered the match.

	    The match object itself (the result of `Regex.exec`) is returned but also
	    enhanced by merging in any meta-data that was registered with the regex.
	    This is how we keep track of which mode matched, and what type of rule
	    (`illegal`, `begin`, end, etc).
	  */
	  class MultiRegex {
	    constructor() {
	      this.matchIndexes = {};
	      // @ts-ignore
	      this.regexes = [];
	      this.matchAt = 1;
	      this.position = 0;
	    }

	    // @ts-ignore
	    addRule(re, opts) {
	      opts.position = this.position++;
	      // @ts-ignore
	      this.matchIndexes[this.matchAt] = opts;
	      this.regexes.push([opts, re]);
	      this.matchAt += countMatchGroups(re) + 1;
	    }

	    compile() {
	      if (this.regexes.length === 0) {
	        // avoids the need to check length every time exec is called
	        // @ts-ignore
	        this.exec = () => null;
	      }
	      const terminators = this.regexes.map(el => el[1]);
	      this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: '|' }), true);
	      this.lastIndex = 0;
	    }

	    /** @param {string} s */
	    exec(s) {
	      this.matcherRe.lastIndex = this.lastIndex;
	      const match = this.matcherRe.exec(s);
	      if (!match) { return null; }

	      // eslint-disable-next-line no-undefined
	      const i = match.findIndex((el, i) => i > 0 && el !== undefined);
	      // @ts-ignore
	      const matchData = this.matchIndexes[i];
	      // trim off any earlier non-relevant match groups (ie, the other regex
	      // match groups that make up the multi-matcher)
	      match.splice(0, i);

	      return Object.assign(match, matchData);
	    }
	  }

	  /*
	    Created to solve the key deficiently with MultiRegex - there is no way to
	    test for multiple matches at a single location.  Why would we need to do
	    that?  In the future a more dynamic engine will allow certain matches to be
	    ignored.  An example: if we matched say the 3rd regex in a large group but
	    decided to ignore it - we'd need to started testing again at the 4th
	    regex... but MultiRegex itself gives us no real way to do that.

	    So what this class creates MultiRegexs on the fly for whatever search
	    position they are needed.

	    NOTE: These additional MultiRegex objects are created dynamically.  For most
	    grammars most of the time we will never actually need anything more than the
	    first MultiRegex - so this shouldn't have too much overhead.

	    Say this is our search group, and we match regex3, but wish to ignore it.

	      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

	    What we need is a new MultiRegex that only includes the remaining
	    possibilities:

	      regex4 | regex5                               ' ie, startAt = 3

	    This class wraps all that complexity up in a simple API... `startAt` decides
	    where in the array of expressions to start doing the matching. It
	    auto-increments, so if a match is found at position 2, then startAt will be
	    set to 3.  If the end is reached startAt will return to 0.

	    MOST of the time the parser will be setting startAt manually to 0.
	  */
	  class ResumableMultiRegex {
	    constructor() {
	      // @ts-ignore
	      this.rules = [];
	      // @ts-ignore
	      this.multiRegexes = [];
	      this.count = 0;

	      this.lastIndex = 0;
	      this.regexIndex = 0;
	    }

	    // @ts-ignore
	    getMatcher(index) {
	      if (this.multiRegexes[index]) return this.multiRegexes[index];

	      const matcher = new MultiRegex();
	      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
	      matcher.compile();
	      this.multiRegexes[index] = matcher;
	      return matcher;
	    }

	    resumingScanAtSamePosition() {
	      return this.regexIndex !== 0;
	    }

	    considerAll() {
	      this.regexIndex = 0;
	    }

	    // @ts-ignore
	    addRule(re, opts) {
	      this.rules.push([re, opts]);
	      if (opts.type === "begin") this.count++;
	    }

	    /** @param {string} s */
	    exec(s) {
	      const m = this.getMatcher(this.regexIndex);
	      m.lastIndex = this.lastIndex;
	      let result = m.exec(s);

	      // The following is because we have no easy way to say "resume scanning at the
	      // existing position but also skip the current rule ONLY". What happens is
	      // all prior rules are also skipped which can result in matching the wrong
	      // thing. Example of matching "booger":

	      // our matcher is [string, "booger", number]
	      //
	      // ....booger....

	      // if "booger" is ignored then we'd really need a regex to scan from the
	      // SAME position for only: [string, number] but ignoring "booger" (if it
	      // was the first match), a simple resume would scan ahead who knows how
	      // far looking only for "number", ignoring potential string matches (or
	      // future "booger" matches that might be valid.)

	      // So what we do: We execute two matchers, one resuming at the same
	      // position, but the second full matcher starting at the position after:

	      //     /--- resume first regex match here (for [number])
	      //     |/---- full match here for [string, "booger", number]
	      //     vv
	      // ....booger....

	      // Which ever results in a match first is then used. So this 3-4 step
	      // process essentially allows us to say "match at this position, excluding
	      // a prior rule that was ignored".
	      //
	      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
	      // 2. Resume matching for [number]
	      // 3. Match at index + 1 for [string, "booger", number]
	      // 4. If #2 and #3 result in matches, which came first?
	      if (this.resumingScanAtSamePosition()) {
	        if (result && result.index === this.lastIndex) ; else { // use the second matcher result
	          const m2 = this.getMatcher(0);
	          m2.lastIndex = this.lastIndex + 1;
	          result = m2.exec(s);
	        }
	      }

	      if (result) {
	        this.regexIndex += result.position + 1;
	        if (this.regexIndex === this.count) {
	          // wrap-around to considering all matches again
	          this.considerAll();
	        }
	      }

	      return result;
	    }
	  }

	  /**
	   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
	   * the content and find matches.
	   *
	   * @param {CompiledMode} mode
	   * @returns {ResumableMultiRegex}
	   */
	  function buildModeRegex(mode) {
	    const mm = new ResumableMultiRegex();

	    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

	    if (mode.terminatorEnd) {
	      mm.addRule(mode.terminatorEnd, { type: "end" });
	    }
	    if (mode.illegal) {
	      mm.addRule(mode.illegal, { type: "illegal" });
	    }

	    return mm;
	  }

	  /** skip vs abort vs ignore
	   *
	   * @skip   - The mode is still entered and exited normally (and contains rules apply),
	   *           but all content is held and added to the parent buffer rather than being
	   *           output when the mode ends.  Mostly used with `sublanguage` to build up
	   *           a single large buffer than can be parsed by sublanguage.
	   *
	   *             - The mode begin ands ends normally.
	   *             - Content matched is added to the parent mode buffer.
	   *             - The parser cursor is moved forward normally.
	   *
	   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
	   *           never matched) but DOES NOT continue to match subsequent `contains`
	   *           modes.  Abort is bad/suboptimal because it can result in modes
	   *           farther down not getting applied because an earlier rule eats the
	   *           content but then aborts.
	   *
	   *             - The mode does not begin.
	   *             - Content matched by `begin` is added to the mode buffer.
	   *             - The parser cursor is moved forward accordingly.
	   *
	   * @ignore - Ignores the mode (as if it never matched) and continues to match any
	   *           subsequent `contains` modes.  Ignore isn't technically possible with
	   *           the current parser implementation.
	   *
	   *             - The mode does not begin.
	   *             - Content matched by `begin` is ignored.
	   *             - The parser cursor is not moved forward.
	   */

	  /**
	   * Compiles an individual mode
	   *
	   * This can raise an error if the mode contains certain detectable known logic
	   * issues.
	   * @param {Mode} mode
	   * @param {CompiledMode | null} [parent]
	   * @returns {CompiledMode | never}
	   */
	  function compileMode(mode, parent) {
	    const cmode = /** @type CompiledMode */ (mode);
	    if (mode.isCompiled) return cmode;

	    [
	      scopeClassName,
	      // do this early so compiler extensions generally don't have to worry about
	      // the distinction between match/begin
	      compileMatch,
	      MultiClass,
	      beforeMatchExt
	    ].forEach(ext => ext(mode, parent));

	    language.compilerExtensions.forEach(ext => ext(mode, parent));

	    // __beforeBegin is considered private API, internal use only
	    mode.__beforeBegin = null;

	    [
	      beginKeywords,
	      // do this later so compiler extensions that come earlier have access to the
	      // raw array if they wanted to perhaps manipulate it, etc.
	      compileIllegal,
	      // default to 1 relevance if not specified
	      compileRelevance
	    ].forEach(ext => ext(mode, parent));

	    mode.isCompiled = true;

	    let keywordPattern = null;
	    if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
	      // we need a copy because keywords might be compiled multiple times
	      // so we can't go deleting $pattern from the original on the first
	      // pass
	      mode.keywords = Object.assign({}, mode.keywords);
	      keywordPattern = mode.keywords.$pattern;
	      delete mode.keywords.$pattern;
	    }
	    keywordPattern = keywordPattern || /\w+/;

	    if (mode.keywords) {
	      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
	    }

	    cmode.keywordPatternRe = langRe(keywordPattern, true);

	    if (parent) {
	      if (!mode.begin) mode.begin = /\B|\b/;
	      cmode.beginRe = langRe(cmode.begin);
	      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
	      if (mode.end) cmode.endRe = langRe(cmode.end);
	      cmode.terminatorEnd = source(cmode.end) || '';
	      if (mode.endsWithParent && parent.terminatorEnd) {
	        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
	      }
	    }
	    if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));
	    if (!mode.contains) mode.contains = [];

	    mode.contains = [].concat(...mode.contains.map(function(c) {
	      return expandOrCloneMode(c === 'self' ? mode : c);
	    }));
	    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

	    if (mode.starts) {
	      compileMode(mode.starts, parent);
	    }

	    cmode.matcher = buildModeRegex(cmode);
	    return cmode;
	  }

	  if (!language.compilerExtensions) language.compilerExtensions = [];

	  // self is not valid at the top-level
	  if (language.contains && language.contains.includes('self')) {
	    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
	  }

	  // we need a null object, which inherit will guarantee
	  language.classNameAliases = inherit$1(language.classNameAliases || {});

	  return compileMode(/** @type Mode */ (language));
	}

	/**
	 * Determines if a mode has a dependency on it's parent or not
	 *
	 * If a mode does have a parent dependency then often we need to clone it if
	 * it's used in multiple places so that each copy points to the correct parent,
	 * where-as modes without a parent can often safely be re-used at the bottom of
	 * a mode chain.
	 *
	 * @param {Mode | null} mode
	 * @returns {boolean} - is there a dependency on the parent?
	 * */
	function dependencyOnParent(mode) {
	  if (!mode) return false;

	  return mode.endsWithParent || dependencyOnParent(mode.starts);
	}

	/**
	 * Expands a mode or clones it if necessary
	 *
	 * This is necessary for modes with parental dependenceis (see notes on
	 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
	 * exploded into their own individual modes at compile time.
	 *
	 * @param {Mode} mode
	 * @returns {Mode | Mode[]}
	 * */
	function expandOrCloneMode(mode) {
	  if (mode.variants && !mode.cachedVariants) {
	    mode.cachedVariants = mode.variants.map(function(variant) {
	      return inherit$1(mode, { variants: null }, variant);
	    });
	  }

	  // EXPAND
	  // if we have variants then essentially "replace" the mode with the variants
	  // this happens in compileMode, where this function is called from
	  if (mode.cachedVariants) {
	    return mode.cachedVariants;
	  }

	  // CLONE
	  // if we have dependencies on parents then we need a unique
	  // instance of ourselves, so we can be reused with many
	  // different parents without issue
	  if (dependencyOnParent(mode)) {
	    return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
	  }

	  if (Object.isFrozen(mode)) {
	    return inherit$1(mode);
	  }

	  // no special dependency issues, just return ourselves
	  return mode;
	}

	var version = "11.11.1";

	class HTMLInjectionError extends Error {
	  constructor(reason, html) {
	    super(reason);
	    this.name = "HTMLInjectionError";
	    this.html = html;
	  }
	}

	/*
	Syntax highlighting with language autodetection.
	https://highlightjs.org/
	*/



	/**
	@typedef {import('highlight.js').Mode} Mode
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	@typedef {import('highlight.js').CompiledScope} CompiledScope
	@typedef {import('highlight.js').Language} Language
	@typedef {import('highlight.js').HLJSApi} HLJSApi
	@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
	@typedef {import('highlight.js').PluginEvent} PluginEvent
	@typedef {import('highlight.js').HLJSOptions} HLJSOptions
	@typedef {import('highlight.js').LanguageFn} LanguageFn
	@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
	@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
	@typedef {import('highlight.js/private').MatchType} MatchType
	@typedef {import('highlight.js/private').KeywordData} KeywordData
	@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
	@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
	@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
	@typedef {import('highlight.js').HighlightOptions} HighlightOptions
	@typedef {import('highlight.js').HighlightResult} HighlightResult
	*/


	const escape = escapeHTML;
	const inherit = inherit$1;
	const NO_MATCH = Symbol("nomatch");
	const MAX_KEYWORD_HITS = 7;

	/**
	 * @param {any} hljs - object that is extended (legacy)
	 * @returns {HLJSApi}
	 */
	const HLJS = function(hljs) {
	  // Global internal variables used within the highlight.js library.
	  /** @type {Record<string, Language>} */
	  const languages = Object.create(null);
	  /** @type {Record<string, string>} */
	  const aliases = Object.create(null);
	  /** @type {HLJSPlugin[]} */
	  const plugins = [];

	  // safe/production mode - swallows more errors, tries to keep running
	  // even if a single syntax or parse hits a fatal error
	  let SAFE_MODE = true;
	  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
	  /** @type {Language} */
	  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

	  // Global options used when within external APIs. This is modified when
	  // calling the `hljs.configure` function.
	  /** @type HLJSOptions */
	  let options = {
	    ignoreUnescapedHTML: false,
	    throwUnescapedHTML: false,
	    noHighlightRe: /^(no-?highlight)$/i,
	    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
	    classPrefix: 'hljs-',
	    cssSelector: 'pre code',
	    languages: null,
	    // beta configuration options, subject to change, welcome to discuss
	    // https://github.com/highlightjs/highlight.js/issues/1086
	    __emitter: TokenTreeEmitter
	  };

	  /* Utility functions */

	  /**
	   * Tests a language name to see if highlighting should be skipped
	   * @param {string} languageName
	   */
	  function shouldNotHighlight(languageName) {
	    return options.noHighlightRe.test(languageName);
	  }

	  /**
	   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
	   */
	  function blockLanguage(block) {
	    let classes = block.className + ' ';

	    classes += block.parentNode ? block.parentNode.className : '';

	    // language-* takes precedence over non-prefixed class names.
	    const match = options.languageDetectRe.exec(classes);
	    if (match) {
	      const language = getLanguage(match[1]);
	      if (!language) {
	        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
	        warn("Falling back to no-highlight mode for this block.", block);
	      }
	      return language ? match[1] : 'no-highlight';
	    }

	    return classes
	      .split(/\s+/)
	      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
	  }

	  /**
	   * Core highlighting function.
	   *
	   * OLD API
	   * highlight(lang, code, ignoreIllegals, continuation)
	   *
	   * NEW API
	   * highlight(code, {lang, ignoreIllegals})
	   *
	   * @param {string} codeOrLanguageName - the language to use for highlighting
	   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
	   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
	   *
	   * @returns {HighlightResult} Result - an object that represents the result
	   * @property {string} language - the language name
	   * @property {number} relevance - the relevance score
	   * @property {string} value - the highlighted HTML code
	   * @property {string} code - the original raw code
	   * @property {CompiledMode} top - top of the current mode stack
	   * @property {boolean} illegal - indicates whether any illegal matches were found
	  */
	  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
	    let code = "";
	    let languageName = "";
	    if (typeof optionsOrCode === "object") {
	      code = codeOrLanguageName;
	      ignoreIllegals = optionsOrCode.ignoreIllegals;
	      languageName = optionsOrCode.language;
	    } else {
	      // old API
	      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
	      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
	      languageName = codeOrLanguageName;
	      code = optionsOrCode;
	    }

	    // https://github.com/highlightjs/highlight.js/issues/3149
	    // eslint-disable-next-line no-undefined
	    if (ignoreIllegals === undefined) { ignoreIllegals = true; }

	    /** @type {BeforeHighlightContext} */
	    const context = {
	      code,
	      language: languageName
	    };
	    // the plugin can change the desired language or the code to be highlighted
	    // just be changing the object it was passed
	    fire("before:highlight", context);

	    // a before plugin can usurp the result completely by providing it's own
	    // in which case we don't even need to call highlight
	    const result = context.result
	      ? context.result
	      : _highlight(context.language, context.code, ignoreIllegals);

	    result.code = context.code;
	    // the plugin can change anything in result to suite it
	    fire("after:highlight", result);

	    return result;
	  }

	  /**
	   * private highlight that's used internally and does not fire callbacks
	   *
	   * @param {string} languageName - the language to use for highlighting
	   * @param {string} codeToHighlight - the code to highlight
	   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
	   * @param {CompiledMode?} [continuation] - current continuation mode, if any
	   * @returns {HighlightResult} - result of the highlight operation
	  */
	  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
	    const keywordHits = Object.create(null);

	    /**
	     * Return keyword data if a match is a keyword
	     * @param {CompiledMode} mode - current mode
	     * @param {string} matchText - the textual match
	     * @returns {KeywordData | false}
	     */
	    function keywordData(mode, matchText) {
	      return mode.keywords[matchText];
	    }

	    function processKeywords() {
	      if (!top.keywords) {
	        emitter.addText(modeBuffer);
	        return;
	      }

	      let lastIndex = 0;
	      top.keywordPatternRe.lastIndex = 0;
	      let match = top.keywordPatternRe.exec(modeBuffer);
	      let buf = "";

	      while (match) {
	        buf += modeBuffer.substring(lastIndex, match.index);
	        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
	        const data = keywordData(top, word);
	        if (data) {
	          const [kind, keywordRelevance] = data;
	          emitter.addText(buf);
	          buf = "";

	          keywordHits[word] = (keywordHits[word] || 0) + 1;
	          if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
	          if (kind.startsWith("_")) {
	            // _ implied for relevance only, do not highlight
	            // by applying a class name
	            buf += match[0];
	          } else {
	            const cssClass = language.classNameAliases[kind] || kind;
	            emitKeyword(match[0], cssClass);
	          }
	        } else {
	          buf += match[0];
	        }
	        lastIndex = top.keywordPatternRe.lastIndex;
	        match = top.keywordPatternRe.exec(modeBuffer);
	      }
	      buf += modeBuffer.substring(lastIndex);
	      emitter.addText(buf);
	    }

	    function processSubLanguage() {
	      if (modeBuffer === "") return;
	      /** @type HighlightResult */
	      let result = null;

	      if (typeof top.subLanguage === 'string') {
	        if (!languages[top.subLanguage]) {
	          emitter.addText(modeBuffer);
	          return;
	        }
	        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
	        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result._top);
	      } else {
	        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
	      }

	      // Counting embedded language score towards the host language may be disabled
	      // with zeroing the containing mode relevance. Use case in point is Markdown that
	      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
	      // score.
	      if (top.relevance > 0) {
	        relevance += result.relevance;
	      }
	      emitter.__addSublanguage(result._emitter, result.language);
	    }

	    function processBuffer() {
	      if (top.subLanguage != null) {
	        processSubLanguage();
	      } else {
	        processKeywords();
	      }
	      modeBuffer = '';
	    }

	    /**
	     * @param {string} text
	     * @param {string} scope
	     */
	    function emitKeyword(keyword, scope) {
	      if (keyword === "") return;

	      emitter.startScope(scope);
	      emitter.addText(keyword);
	      emitter.endScope();
	    }

	    /**
	     * @param {CompiledScope} scope
	     * @param {RegExpMatchArray} match
	     */
	    function emitMultiClass(scope, match) {
	      let i = 1;
	      const max = match.length - 1;
	      while (i <= max) {
	        if (!scope._emit[i]) { i++; continue; }
	        const klass = language.classNameAliases[scope[i]] || scope[i];
	        const text = match[i];
	        if (klass) {
	          emitKeyword(text, klass);
	        } else {
	          modeBuffer = text;
	          processKeywords();
	          modeBuffer = "";
	        }
	        i++;
	      }
	    }

	    /**
	     * @param {CompiledMode} mode - new mode to start
	     * @param {RegExpMatchArray} match
	     */
	    function startNewMode(mode, match) {
	      if (mode.scope && typeof mode.scope === "string") {
	        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
	      }
	      if (mode.beginScope) {
	        // beginScope just wraps the begin match itself in a scope
	        if (mode.beginScope._wrap) {
	          emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
	          modeBuffer = "";
	        } else if (mode.beginScope._multi) {
	          // at this point modeBuffer should just be the match
	          emitMultiClass(mode.beginScope, match);
	          modeBuffer = "";
	        }
	      }

	      top = Object.create(mode, { parent: { value: top } });
	      return top;
	    }

	    /**
	     * @param {CompiledMode } mode - the mode to potentially end
	     * @param {RegExpMatchArray} match - the latest match
	     * @param {string} matchPlusRemainder - match plus remainder of content
	     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
	     */
	    function endOfMode(mode, match, matchPlusRemainder) {
	      let matched = startsWith(mode.endRe, matchPlusRemainder);

	      if (matched) {
	        if (mode["on:end"]) {
	          const resp = new Response(mode);
	          mode["on:end"](match, resp);
	          if (resp.isMatchIgnored) matched = false;
	        }

	        if (matched) {
	          while (mode.endsParent && mode.parent) {
	            mode = mode.parent;
	          }
	          return mode;
	        }
	      }
	      // even if on:end fires an `ignore` it's still possible
	      // that we might trigger the end node because of a parent mode
	      if (mode.endsWithParent) {
	        return endOfMode(mode.parent, match, matchPlusRemainder);
	      }
	    }

	    /**
	     * Handle matching but then ignoring a sequence of text
	     *
	     * @param {string} lexeme - string containing full match text
	     */
	    function doIgnore(lexeme) {
	      if (top.matcher.regexIndex === 0) {
	        // no more regexes to potentially match here, so we move the cursor forward one
	        // space
	        modeBuffer += lexeme[0];
	        return 1;
	      } else {
	        // no need to move the cursor, we still have additional regexes to try and
	        // match at this very spot
	        resumeScanAtSamePosition = true;
	        return 0;
	      }
	    }

	    /**
	     * Handle the start of a new potential mode match
	     *
	     * @param {EnhancedMatch} match - the current match
	     * @returns {number} how far to advance the parse cursor
	     */
	    function doBeginMatch(match) {
	      const lexeme = match[0];
	      const newMode = match.rule;

	      const resp = new Response(newMode);
	      // first internal before callbacks, then the public ones
	      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
	      for (const cb of beforeCallbacks) {
	        if (!cb) continue;
	        cb(match, resp);
	        if (resp.isMatchIgnored) return doIgnore(lexeme);
	      }

	      if (newMode.skip) {
	        modeBuffer += lexeme;
	      } else {
	        if (newMode.excludeBegin) {
	          modeBuffer += lexeme;
	        }
	        processBuffer();
	        if (!newMode.returnBegin && !newMode.excludeBegin) {
	          modeBuffer = lexeme;
	        }
	      }
	      startNewMode(newMode, match);
	      return newMode.returnBegin ? 0 : lexeme.length;
	    }

	    /**
	     * Handle the potential end of mode
	     *
	     * @param {RegExpMatchArray} match - the current match
	     */
	    function doEndMatch(match) {
	      const lexeme = match[0];
	      const matchPlusRemainder = codeToHighlight.substring(match.index);

	      const endMode = endOfMode(top, match, matchPlusRemainder);
	      if (!endMode) { return NO_MATCH; }

	      const origin = top;
	      if (top.endScope && top.endScope._wrap) {
	        processBuffer();
	        emitKeyword(lexeme, top.endScope._wrap);
	      } else if (top.endScope && top.endScope._multi) {
	        processBuffer();
	        emitMultiClass(top.endScope, match);
	      } else if (origin.skip) {
	        modeBuffer += lexeme;
	      } else {
	        if (!(origin.returnEnd || origin.excludeEnd)) {
	          modeBuffer += lexeme;
	        }
	        processBuffer();
	        if (origin.excludeEnd) {
	          modeBuffer = lexeme;
	        }
	      }
	      do {
	        if (top.scope) {
	          emitter.closeNode();
	        }
	        if (!top.skip && !top.subLanguage) {
	          relevance += top.relevance;
	        }
	        top = top.parent;
	      } while (top !== endMode.parent);
	      if (endMode.starts) {
	        startNewMode(endMode.starts, match);
	      }
	      return origin.returnEnd ? 0 : lexeme.length;
	    }

	    function processContinuations() {
	      const list = [];
	      for (let current = top; current !== language; current = current.parent) {
	        if (current.scope) {
	          list.unshift(current.scope);
	        }
	      }
	      list.forEach(item => emitter.openNode(item));
	    }

	    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
	    let lastMatch = {};

	    /**
	     *  Process an individual match
	     *
	     * @param {string} textBeforeMatch - text preceding the match (since the last match)
	     * @param {EnhancedMatch} [match] - the match itself
	     */
	    function processLexeme(textBeforeMatch, match) {
	      const lexeme = match && match[0];

	      // add non-matched text to the current mode buffer
	      modeBuffer += textBeforeMatch;

	      if (lexeme == null) {
	        processBuffer();
	        return 0;
	      }

	      // we've found a 0 width match and we're stuck, so we need to advance
	      // this happens when we have badly behaved rules that have optional matchers to the degree that
	      // sometimes they can end up matching nothing at all
	      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
	      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
	        // spit the "skipped" character that our regex choked on back into the output sequence
	        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
	        if (!SAFE_MODE) {
	          /** @type {AnnotatedError} */
	          const err = new Error(`0 width match regex (${languageName})`);
	          err.languageName = languageName;
	          err.badRule = lastMatch.rule;
	          throw err;
	        }
	        return 1;
	      }
	      lastMatch = match;

	      if (match.type === "begin") {
	        return doBeginMatch(match);
	      } else if (match.type === "illegal" && !ignoreIllegals) {
	        // illegal match, we do not continue processing
	        /** @type {AnnotatedError} */
	        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || '<unnamed>') + '"');
	        err.mode = top;
	        throw err;
	      } else if (match.type === "end") {
	        const processed = doEndMatch(match);
	        if (processed !== NO_MATCH) {
	          return processed;
	        }
	      }

	      // edge case for when illegal matches $ (end of line) which is technically
	      // a 0 width match but not a begin/end match so it's not caught by the
	      // first handler (when ignoreIllegals is true)
	      if (match.type === "illegal" && lexeme === "") {
	        // advance so we aren't stuck in an infinite loop
	        modeBuffer += "\n";
	        return 1;
	      }

	      // infinite loops are BAD, this is a last ditch catch all. if we have a
	      // decent number of iterations yet our index (cursor position in our
	      // parsing) still 3x behind our index then something is very wrong
	      // so we bail
	      if (iterations > 100000 && iterations > match.index * 3) {
	        const err = new Error('potential infinite loop, way more iterations than matches');
	        throw err;
	      }

	      /*
	      Why might be find ourselves here?  An potential end match that was
	      triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
	      (this could be because a callback requests the match be ignored, etc)

	      This causes no real harm other than stopping a few times too many.
	      */

	      modeBuffer += lexeme;
	      return lexeme.length;
	    }

	    const language = getLanguage(languageName);
	    if (!language) {
	      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
	      throw new Error('Unknown language: "' + languageName + '"');
	    }

	    const md = compileLanguage(language);
	    let result = '';
	    /** @type {CompiledMode} */
	    let top = continuation || md;
	    /** @type Record<string,CompiledMode> */
	    const continuations = {}; // keep continuations for sub-languages
	    const emitter = new options.__emitter(options);
	    processContinuations();
	    let modeBuffer = '';
	    let relevance = 0;
	    let index = 0;
	    let iterations = 0;
	    let resumeScanAtSamePosition = false;

	    try {
	      if (!language.__emitTokens) {
	        top.matcher.considerAll();

	        for (;;) {
	          iterations++;
	          if (resumeScanAtSamePosition) {
	            // only regexes not matched previously will now be
	            // considered for a potential match
	            resumeScanAtSamePosition = false;
	          } else {
	            top.matcher.considerAll();
	          }
	          top.matcher.lastIndex = index;

	          const match = top.matcher.exec(codeToHighlight);
	          // console.log("match", match[0], match.rule && match.rule.begin)

	          if (!match) break;

	          const beforeMatch = codeToHighlight.substring(index, match.index);
	          const processedCount = processLexeme(beforeMatch, match);
	          index = match.index + processedCount;
	        }
	        processLexeme(codeToHighlight.substring(index));
	      } else {
	        language.__emitTokens(codeToHighlight, emitter);
	      }

	      emitter.finalize();
	      result = emitter.toHTML();

	      return {
	        language: languageName,
	        value: result,
	        relevance,
	        illegal: false,
	        _emitter: emitter,
	        _top: top
	      };
	    } catch (err) {
	      if (err.message && err.message.includes('Illegal')) {
	        return {
	          language: languageName,
	          value: escape(codeToHighlight),
	          illegal: true,
	          relevance: 0,
	          _illegalBy: {
	            message: err.message,
	            index,
	            context: codeToHighlight.slice(index - 100, index + 100),
	            mode: err.mode,
	            resultSoFar: result
	          },
	          _emitter: emitter
	        };
	      } else if (SAFE_MODE) {
	        return {
	          language: languageName,
	          value: escape(codeToHighlight),
	          illegal: false,
	          relevance: 0,
	          errorRaised: err,
	          _emitter: emitter,
	          _top: top
	        };
	      } else {
	        throw err;
	      }
	    }
	  }

	  /**
	   * returns a valid highlight result, without actually doing any actual work,
	   * auto highlight starts with this and it's possible for small snippets that
	   * auto-detection may not find a better match
	   * @param {string} code
	   * @returns {HighlightResult}
	   */
	  function justTextHighlightResult(code) {
	    const result = {
	      value: escape(code),
	      illegal: false,
	      relevance: 0,
	      _top: PLAINTEXT_LANGUAGE,
	      _emitter: new options.__emitter(options)
	    };
	    result._emitter.addText(code);
	    return result;
	  }

	  /**
	  Highlighting with language detection. Accepts a string with the code to
	  highlight. Returns an object with the following properties:

	  - language (detected language)
	  - relevance (int)
	  - value (an HTML string with highlighting markup)
	  - secondBest (object with the same structure for second-best heuristically
	    detected language, may be absent)

	    @param {string} code
	    @param {Array<string>} [languageSubset]
	    @returns {AutoHighlightResult}
	  */
	  function highlightAuto(code, languageSubset) {
	    languageSubset = languageSubset || options.languages || Object.keys(languages);
	    const plaintext = justTextHighlightResult(code);

	    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
	      _highlight(name, code, false)
	    );
	    results.unshift(plaintext); // plaintext is always an option

	    const sorted = results.sort((a, b) => {
	      // sort base on relevance
	      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

	      // always award the tie to the base language
	      // ie if C++ and Arduino are tied, it's more likely to be C++
	      if (a.language && b.language) {
	        if (getLanguage(a.language).supersetOf === b.language) {
	          return 1;
	        } else if (getLanguage(b.language).supersetOf === a.language) {
	          return -1;
	        }
	      }

	      // otherwise say they are equal, which has the effect of sorting on
	      // relevance while preserving the original ordering - which is how ties
	      // have historically been settled, ie the language that comes first always
	      // wins in the case of a tie
	      return 0;
	    });

	    const [best, secondBest] = sorted;

	    /** @type {AutoHighlightResult} */
	    const result = best;
	    result.secondBest = secondBest;

	    return result;
	  }

	  /**
	   * Builds new class name for block given the language name
	   *
	   * @param {HTMLElement} element
	   * @param {string} [currentLang]
	   * @param {string} [resultLang]
	   */
	  function updateClassName(element, currentLang, resultLang) {
	    const language = (currentLang && aliases[currentLang]) || resultLang;

	    element.classList.add("hljs");
	    element.classList.add(`language-${language}`);
	  }

	  /**
	   * Applies highlighting to a DOM node containing code.
	   *
	   * @param {HighlightedHTMLElement} element - the HTML element to highlight
	  */
	  function highlightElement(element) {
	    /** @type HTMLElement */
	    let node = null;
	    const language = blockLanguage(element);

	    if (shouldNotHighlight(language)) return;

	    fire("before:highlightElement",
	      { el: element, language });

	    if (element.dataset.highlighted) {
	      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
	      return;
	    }

	    // we should be all text, no child nodes (unescaped HTML) - this is possibly
	    // an HTML injection attack - it's likely too late if this is already in
	    // production (the code has likely already done its damage by the time
	    // we're seeing it)... but we yell loudly about this so that hopefully it's
	    // more likely to be caught in development before making it to production
	    if (element.children.length > 0) {
	      if (!options.ignoreUnescapedHTML) {
	        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
	        console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
	        console.warn("The element with unescaped HTML:");
	        console.warn(element);
	      }
	      if (options.throwUnescapedHTML) {
	        const err = new HTMLInjectionError(
	          "One of your code blocks includes unescaped HTML.",
	          element.innerHTML
	        );
	        throw err;
	      }
	    }

	    node = element;
	    const text = node.textContent;
	    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);

	    element.innerHTML = result.value;
	    element.dataset.highlighted = "yes";
	    updateClassName(element, language, result.language);
	    element.result = {
	      language: result.language,
	      // TODO: remove with version 11.0
	      re: result.relevance,
	      relevance: result.relevance
	    };
	    if (result.secondBest) {
	      element.secondBest = {
	        language: result.secondBest.language,
	        relevance: result.secondBest.relevance
	      };
	    }

	    fire("after:highlightElement", { el: element, result, text });
	  }

	  /**
	   * Updates highlight.js global options with the passed options
	   *
	   * @param {Partial<HLJSOptions>} userOptions
	   */
	  function configure(userOptions) {
	    options = inherit(options, userOptions);
	  }

	  // TODO: remove v12, deprecated
	  const initHighlighting = () => {
	    highlightAll();
	    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
	  };

	  // TODO: remove v12, deprecated
	  function initHighlightingOnLoad() {
	    highlightAll();
	    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
	  }

	  let wantsHighlight = false;

	  /**
	   * auto-highlights all pre>code elements on the page
	   */
	  function highlightAll() {
	    function boot() {
	      // if a highlight was requested before DOM was loaded, do now
	      highlightAll();
	    }

	    // if we are called too early in the loading process
	    if (document.readyState === "loading") {
	      // make sure the event listener is only added once
	      if (!wantsHighlight) {
	        window.addEventListener('DOMContentLoaded', boot, false);
	      }
	      wantsHighlight = true;
	      return;
	    }

	    const blocks = document.querySelectorAll(options.cssSelector);
	    blocks.forEach(highlightElement);
	  }

	  /**
	   * Register a language grammar module
	   *
	   * @param {string} languageName
	   * @param {LanguageFn} languageDefinition
	   */
	  function registerLanguage(languageName, languageDefinition) {
	    let lang = null;
	    try {
	      lang = languageDefinition(hljs);
	    } catch (error$1) {
	      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
	      // hard or soft error
	      if (!SAFE_MODE) { throw error$1; } else { error(error$1); }
	      // languages that have serious errors are replaced with essentially a
	      // "plaintext" stand-in so that the code blocks will still get normal
	      // css classes applied to them - and one bad language won't break the
	      // entire highlighter
	      lang = PLAINTEXT_LANGUAGE;
	    }
	    // give it a temporary name if it doesn't have one in the meta-data
	    if (!lang.name) lang.name = languageName;
	    languages[languageName] = lang;
	    lang.rawDefinition = languageDefinition.bind(null, hljs);

	    if (lang.aliases) {
	      registerAliases(lang.aliases, { languageName });
	    }
	  }

	  /**
	   * Remove a language grammar module
	   *
	   * @param {string} languageName
	   */
	  function unregisterLanguage(languageName) {
	    delete languages[languageName];
	    for (const alias of Object.keys(aliases)) {
	      if (aliases[alias] === languageName) {
	        delete aliases[alias];
	      }
	    }
	  }

	  /**
	   * @returns {string[]} List of language internal names
	   */
	  function listLanguages() {
	    return Object.keys(languages);
	  }

	  /**
	   * @param {string} name - name of the language to retrieve
	   * @returns {Language | undefined}
	   */
	  function getLanguage(name) {
	    name = (name || '').toLowerCase();
	    return languages[name] || languages[aliases[name]];
	  }

	  /**
	   *
	   * @param {string|string[]} aliasList - single alias or list of aliases
	   * @param {{languageName: string}} opts
	   */
	  function registerAliases(aliasList, { languageName }) {
	    if (typeof aliasList === 'string') {
	      aliasList = [aliasList];
	    }
	    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });
	  }

	  /**
	   * Determines if a given language has auto-detection enabled
	   * @param {string} name - name of the language
	   */
	  function autoDetection(name) {
	    const lang = getLanguage(name);
	    return lang && !lang.disableAutodetect;
	  }

	  /**
	   * Upgrades the old highlightBlock plugins to the new
	   * highlightElement API
	   * @param {HLJSPlugin} plugin
	   */
	  function upgradePluginAPI(plugin) {
	    // TODO: remove with v12
	    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
	      plugin["before:highlightElement"] = (data) => {
	        plugin["before:highlightBlock"](
	          Object.assign({ block: data.el }, data)
	        );
	      };
	    }
	    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
	      plugin["after:highlightElement"] = (data) => {
	        plugin["after:highlightBlock"](
	          Object.assign({ block: data.el }, data)
	        );
	      };
	    }
	  }

	  /**
	   * @param {HLJSPlugin} plugin
	   */
	  function addPlugin(plugin) {
	    upgradePluginAPI(plugin);
	    plugins.push(plugin);
	  }

	  /**
	   * @param {HLJSPlugin} plugin
	   */
	  function removePlugin(plugin) {
	    const index = plugins.indexOf(plugin);
	    if (index !== -1) {
	      plugins.splice(index, 1);
	    }
	  }

	  /**
	   *
	   * @param {PluginEvent} event
	   * @param {any} args
	   */
	  function fire(event, args) {
	    const cb = event;
	    plugins.forEach(function(plugin) {
	      if (plugin[cb]) {
	        plugin[cb](args);
	      }
	    });
	  }

	  /**
	   * DEPRECATED
	   * @param {HighlightedHTMLElement} el
	   */
	  function deprecateHighlightBlock(el) {
	    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
	    deprecated("10.7.0", "Please use highlightElement now.");

	    return highlightElement(el);
	  }

	  /* Interface definition */
	  Object.assign(hljs, {
	    highlight,
	    highlightAuto,
	    highlightAll,
	    highlightElement,
	    // TODO: Remove with v12 API
	    highlightBlock: deprecateHighlightBlock,
	    configure,
	    initHighlighting,
	    initHighlightingOnLoad,
	    registerLanguage,
	    unregisterLanguage,
	    listLanguages,
	    getLanguage,
	    registerAliases,
	    autoDetection,
	    inherit,
	    addPlugin,
	    removePlugin
	  });

	  hljs.debugMode = function() { SAFE_MODE = false; };
	  hljs.safeMode = function() { SAFE_MODE = true; };
	  hljs.versionString = version;

	  hljs.regex = {
	    concat: concat,
	    lookahead: lookahead,
	    either: either,
	    optional: optional,
	    anyNumberOfTimes: anyNumberOfTimes
	  };

	  for (const key in MODES) {
	    // @ts-ignore
	    if (typeof MODES[key] === "object") {
	      // @ts-ignore
	      deepFreeze(MODES[key]);
	    }
	  }

	  // merge all the modes/regexes into our main object
	  Object.assign(hljs, MODES);

	  return hljs;
	};

	// Other names for the variable may break build script
	const highlight = HLJS({});

	// returns a new instance of the highlighter to be used for extensions
	// check https://github.com/wooorm/lowlight/issues/47
	highlight.newInstance = () => HLJS({});

	core = highlight;
	highlight.HighlightJS = highlight;
	highlight.default = highlight;
	return core;
}

var coreExports = requireCore();
var HighlightJS = /*@__PURE__*/getDefaultExportFromCjs(coreExports);

// https://nodejs.org/api/packages.html#packages_writing_dual_packages_while_avoiding_or_minimizing_hazards

var css$2 = "pre code.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 1em\n}\ncode.hljs {\n  padding: 3px 5px\n}\n/*!\n  Theme: GitHub\n  Description: Light theme as seen on github.com\n  Author: github.com\n  Maintainer: @Hirse\n  Updated: 2021-05-15\n\n  Outdated base version: https://github.com/primer/github-syntax-light\n  Current colors taken from GitHub's CSS\n*/\n.hljs {\n  color: #24292e;\n  background: #ffffff\n}\n.hljs-doctag,\n.hljs-keyword,\n.hljs-meta .hljs-keyword,\n.hljs-template-tag,\n.hljs-template-variable,\n.hljs-type,\n.hljs-variable.language_ {\n  /* prettylights-syntax-keyword */\n  color: #d73a49\n}\n.hljs-title,\n.hljs-title.class_,\n.hljs-title.class_.inherited__,\n.hljs-title.function_ {\n  /* prettylights-syntax-entity */\n  color: #6f42c1\n}\n.hljs-attr,\n.hljs-attribute,\n.hljs-literal,\n.hljs-meta,\n.hljs-number,\n.hljs-operator,\n.hljs-variable,\n.hljs-selector-attr,\n.hljs-selector-class,\n.hljs-selector-id {\n  /* prettylights-syntax-constant */\n  color: #005cc5\n}\n.hljs-regexp,\n.hljs-string,\n.hljs-meta .hljs-string {\n  /* prettylights-syntax-string */\n  color: #032f62\n}\n.hljs-built_in,\n.hljs-symbol {\n  /* prettylights-syntax-variable */\n  color: #e36209\n}\n.hljs-comment,\n.hljs-code,\n.hljs-formula {\n  /* prettylights-syntax-comment */\n  color: #6a737d\n}\n.hljs-name,\n.hljs-quote,\n.hljs-selector-tag,\n.hljs-selector-pseudo {\n  /* prettylights-syntax-entity-tag */\n  color: #22863a\n}\n.hljs-subst {\n  /* prettylights-syntax-storage-modifier-import */\n  color: #24292e\n}\n.hljs-section {\n  /* prettylights-syntax-markup-heading */\n  color: #005cc5;\n  font-weight: bold\n}\n.hljs-bullet {\n  /* prettylights-syntax-markup-list */\n  color: #735c0f\n}\n.hljs-emphasis {\n  /* prettylights-syntax-markup-italic */\n  color: #24292e;\n  font-style: italic\n}\n.hljs-strong {\n  /* prettylights-syntax-markup-bold */\n  color: #24292e;\n  font-weight: bold\n}\n.hljs-addition {\n  /* prettylights-syntax-markup-inserted */\n  color: #22863a;\n  background-color: #f0fff4\n}\n.hljs-deletion {\n  /* prettylights-syntax-markup-deleted */\n  color: #b31d28;\n  background-color: #ffeef0\n}\n.hljs-char.escape_,\n.hljs-link,\n.hljs-params,\n.hljs-property,\n.hljs-punctuation,\n.hljs-tag {\n  /* purposely ignored */\n  \n}";
n(css$2,{});

const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
const KEYWORDS = [
  "as", // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
const TYPES = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];

const ERROR_TYPES = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];

const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",

  "require",
  "exports",

  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];

const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global" // Node.js
];

const BUILT_INS = [].concat(
  BUILT_IN_GLOBALS,
  TYPES,
  ERROR_TYPES
);

/*
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting, web
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/


/** @type LanguageFn */
function javascript(hljs) {
  const regex = hljs.regex;
  /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };

  const IDENT_RE$1 = IDENT_RE;
  const FRAGMENT = {
    begin: '<>',
    end: '</>'
  };
  // to avoid some special cases inside isTrulyOpeningTag
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" ||
        // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
        ) {
        response.ignoreMatch();
        return;
      }

      // `<something>`
      // Quite possibly a tag, lets look for a matching closing tag...
      if (nextChar === ">") {
        // if we cannot find a matching closing tag, then we
        // will ignore it
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }

      // `<blah />` (self-closing)
      // handled by simpleSelfClosing rule

      let m;
      const afterMatch = match.input.substring(afterMatchIndex);

      // some more template typing stuff
      //  <T = any>(key?: string) => Modify<
      if ((m = afterMatch.match(/^\s*=/))) {
        response.ignoreMatch();
        return;
      }

      // `<From extends string>`
      // technically this could be HTML, but it smells like a type
      // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276
      if ((m = afterMatch.match(/^\s+extends\s+/))) {
        if (m.index === 0) {
          response.ignoreMatch();
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };

  // https://tc39.es/ecma262/#sec-literals-numeric-literals
  const decimalDigits = '[0-9](_?[0-9])*';
  const frac = `\\.(${decimalDigits})`;
  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: 'number',
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
        `[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" },
    ],
    relevance: 0
  };

  const SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS$1,
    contains: [] // defined later
  };
  const HTML_TEMPLATE = {
    begin: '\.?html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'xml'
    }
  };
  const CSS_TEMPLATE = {
    begin: '\.?css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'css'
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: '\.?gql`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'graphql'
    }
  };
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    '\\*/',
    {
      relevance: 0,
      contains: [
        {
          begin: '(?=@[A-Za-z]+)',
          relevance: 0,
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            },
            {
              className: 'type',
              begin: '\\{',
              end: '\\}',
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: 'variable',
              begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER,
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS
    .concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS$1,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: 'params',
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/, // to match the parms with
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };

  // ES6 classes
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      },

    ]
  };

  const CLASS_REFERENCE = {
    relevance: 0,
    match:
    regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/,
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };

  const USE_STRICT = {
    label: "use_strict",
    className: 'meta',
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };

  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [ PARAMS ],
    illegal: /%/
  };

  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };

  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }

  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS,
        "super",
        "import"
      ].map(x => `${x}\\s*\\(`)),
      IDENT_RE$1, regex.lookahead(/\s*\(/)),
    className: "title.function",
    relevance: 0
  };

  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };

  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      { // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };

  const FUNC_LEAD_IN_RE = '(\\(' +
    '[^()]*(\\(' +
    '[^()]*(\\(' +
    '[^()]*' +
    '\\)[^()]*)*' +
    '\\)[^()]*)*' +
    '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';

  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/, /\s+/,
      IDENT_RE$1, /\s*/,
      /=\s*/,
      /(async\s*)?/, // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };

  return {
    name: 'JavaScript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        scope: 'attr',
        match: IDENT_RE$1 + regex.lookahead(':'),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: 'function',
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: '\\s*=>',
            contains: [
              {
                className: 'params',
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          { // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          { // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                'on:begin': XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: 'xml',
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ['self']
              }
            ]
          }
        ],
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +
          '\\(' + // first parens
          '[^()]*(\\(' +
            '[^()]*(\\(' +
              '[^()]*' +
            '\\)[^()]*)*' +
          '\\)[^()]*)*' +
          '\\)\\s*\\{', // end parens
        returnBegin:true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: '\\$' + IDENT_RE$1,
        relevance: 0
      },
      {
        match: [ /\bconstructor(?=\s*\()/ ],
        className: { 1: "title.function" },
        contains: [ PARAMS ]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}

/*
Language: TypeScript
Author: Panu Horsmalahti <panu.horsmalahti@iki.fi>
Contributors: Ike Ku <dempfi@yahoo.com>
Description: TypeScript is a strict superset of JavaScript
Website: https://www.typescriptlang.org
Category: common, scripting
*/


/** @type LanguageFn */
function typescript(hljs) {
  const regex = hljs.regex;
  const tsLanguage = javascript(hljs);

  const IDENT_RE$1 = IDENT_RE;
  const TYPES = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ];
  const NAMESPACE = {
    begin: [
      /namespace/,
      /\s+/,
      hljs.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  };
  const INTERFACE = {
    beginKeywords: 'interface',
    end: /\{/,
    excludeEnd: true,
    keywords: {
      keyword: 'interface extends',
      built_in: TYPES
    },
    contains: [ tsLanguage.exports.CLASS_REFERENCE ]
  };
  const USE_STRICT = {
    className: 'meta',
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };
  const TS_SPECIFIC_KEYWORDS = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ];
  /*
    namespace is a TS keyword but it's fine to use it as a variable name too.
    const message = 'foo';
    const namespace = 'bar';
  */
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
    literal: LITERALS,
    built_in: BUILT_INS.concat(TYPES),
    "variable.language": BUILT_IN_VARIABLES
  };

  const DECORATOR = {
    className: 'meta',
    begin: '@' + IDENT_RE$1,
  };

  const swapMode = (mode, label, replacement) => {
    const indx = mode.contains.findIndex(m => m.label === label);
    if (indx === -1) { throw new Error("can not find mode to replace"); }

    mode.contains.splice(indx, 1, replacement);
  };


  // this should update anywhere keywords is used since
  // it will be the same actual JS object
  Object.assign(tsLanguage.keywords, KEYWORDS$1);

  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);

  // highlight the function params
  const ATTRIBUTE_HIGHLIGHT = tsLanguage.contains.find(c => c.scope === "attr");

  // take default attr rule and extend it to support optionals
  const OPTIONAL_KEY_OR_ARGUMENT = Object.assign({},
    ATTRIBUTE_HIGHLIGHT,
    { match: regex.concat(IDENT_RE$1, regex.lookahead(/\s*\?:/)) }
  );
  tsLanguage.exports.PARAMS_CONTAINS.push([
    tsLanguage.exports.CLASS_REFERENCE, // class reference for highlighting the params types
    ATTRIBUTE_HIGHLIGHT, // highlight the params key
    OPTIONAL_KEY_OR_ARGUMENT, // Added for optional property assignment highlighting
  ]);

  // Add the optional property assignment highlighting for objects or classes
  tsLanguage.contains = tsLanguage.contains.concat([
    DECORATOR,
    NAMESPACE,
    INTERFACE,
    OPTIONAL_KEY_OR_ARGUMENT, // Added for optional property assignment highlighting
  ]);

  // TS gets a simpler shebang rule than JS
  swapMode(tsLanguage, "shebang", hljs.SHEBANG());
  // JS use strict rule purposely excludes `asm` which makes no sense
  swapMode(tsLanguage, "use_strict", USE_STRICT);

  const functionDeclaration = tsLanguage.contains.find(m => m.label === "func.def");
  functionDeclaration.relevance = 0; // () => {} is more typical in TypeScript

  Object.assign(tsLanguage, {
    name: 'TypeScript',
    aliases: [
      'ts',
      'tsx',
      'mts',
      'cts'
    ]
  });

  return tsLanguage;
}

/*
Language: Rust
Author: Andrey Vlasovskikh <andrey.vlasovskikh@gmail.com>
Contributors: Roman Shmatov <romanshmatov@gmail.com>, Kasper Andersen <kma_untrusted@protonmail.com>
Website: https://www.rust-lang.org
Category: common, system
*/

/** @type LanguageFn */

function rust(hljs) {
  const regex = hljs.regex;
  // ============================================
  // Added to support the r# keyword, which is a raw identifier in Rust.
  const RAW_IDENTIFIER = /(r#)?/;
  const UNDERSCORE_IDENT_RE = regex.concat(RAW_IDENTIFIER, hljs.UNDERSCORE_IDENT_RE);
  const IDENT_RE = regex.concat(RAW_IDENTIFIER, hljs.IDENT_RE);
  // ============================================
  const FUNCTION_INVOKE = {
    className: "title.function.invoke",
    relevance: 0,
    begin: regex.concat(
      /\b/,
      /(?!let|for|while|if|else|match\b)/,
      IDENT_RE,
      regex.lookahead(/\s*\(/))
  };
  const NUMBER_SUFFIX = '([ui](8|16|32|64|128|size)|f(32|64))\?';
  const KEYWORDS = [
    "abstract",
    "as",
    "async",
    "await",
    "become",
    "box",
    "break",
    "const",
    "continue",
    "crate",
    "do",
    "dyn",
    "else",
    "enum",
    "extern",
    "false",
    "final",
    "fn",
    "for",
    "if",
    "impl",
    "in",
    "let",
    "loop",
    "macro",
    "match",
    "mod",
    "move",
    "mut",
    "override",
    "priv",
    "pub",
    "ref",
    "return",
    "self",
    "Self",
    "static",
    "struct",
    "super",
    "trait",
    "true",
    "try",
    "type",
    "typeof",
    "union",
    "unsafe",
    "unsized",
    "use",
    "virtual",
    "where",
    "while",
    "yield"
  ];
  const LITERALS = [
    "true",
    "false",
    "Some",
    "None",
    "Ok",
    "Err"
  ];
  const BUILTINS = [
    // functions
    'drop ',
    // traits
    "Copy",
    "Send",
    "Sized",
    "Sync",
    "Drop",
    "Fn",
    "FnMut",
    "FnOnce",
    "ToOwned",
    "Clone",
    "Debug",
    "PartialEq",
    "PartialOrd",
    "Eq",
    "Ord",
    "AsRef",
    "AsMut",
    "Into",
    "From",
    "Default",
    "Iterator",
    "Extend",
    "IntoIterator",
    "DoubleEndedIterator",
    "ExactSizeIterator",
    "SliceConcatExt",
    "ToString",
    // macros
    "assert!",
    "assert_eq!",
    "bitflags!",
    "bytes!",
    "cfg!",
    "col!",
    "concat!",
    "concat_idents!",
    "debug_assert!",
    "debug_assert_eq!",
    "env!",
    "eprintln!",
    "panic!",
    "file!",
    "format!",
    "format_args!",
    "include_bytes!",
    "include_str!",
    "line!",
    "local_data_key!",
    "module_path!",
    "option_env!",
    "print!",
    "println!",
    "select!",
    "stringify!",
    "try!",
    "unimplemented!",
    "unreachable!",
    "vec!",
    "write!",
    "writeln!",
    "macro_rules!",
    "assert_ne!",
    "debug_assert_ne!"
  ];
  const TYPES = [
    "i8",
    "i16",
    "i32",
    "i64",
    "i128",
    "isize",
    "u8",
    "u16",
    "u32",
    "u64",
    "u128",
    "usize",
    "f32",
    "f64",
    "str",
    "char",
    "bool",
    "Box",
    "Option",
    "Result",
    "String",
    "Vec"
  ];
  return {
    name: 'Rust',
    aliases: [ 'rs' ],
    keywords: {
      $pattern: hljs.IDENT_RE + '!?',
      type: TYPES,
      keyword: KEYWORDS,
      literal: LITERALS,
      built_in: BUILTINS
    },
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT('/\\*', '\\*/', { contains: [ 'self' ] }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        begin: /b?"/,
        illegal: null
      }),
      {
        className: 'symbol',
        // negative lookahead to avoid matching `'`
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*(?!')/
      },
      {
        scope: 'string',
        variants: [
          { begin: /b?r(#*)"(.|\n)*?"\1(?!#)/ },
          {
            begin: /b?'/,
            end: /'/,
            contains: [
              {
                scope: "char.escape",
                match: /\\('|\w|x\w{2}|u\w{4}|U\w{8})/
              }
            ]
          }
        ]
      },
      {
        className: 'number',
        variants: [
          { begin: '\\b0b([01_]+)' + NUMBER_SUFFIX },
          { begin: '\\b0o([0-7_]+)' + NUMBER_SUFFIX },
          { begin: '\\b0x([A-Fa-f0-9_]+)' + NUMBER_SUFFIX },
          { begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)'
                   + NUMBER_SUFFIX }
        ],
        relevance: 0
      },
      {
        begin: [
          /fn/,
          /\s+/,
          UNDERSCORE_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.function"
        }
      },
      {
        className: 'meta',
        begin: '#!?\\[',
        end: '\\]',
        contains: [
          {
            className: 'string',
            begin: /"/,
            end: /"/,
            contains: [
              hljs.BACKSLASH_ESCAPE
            ]
          }
        ]
      },
      {
        begin: [
          /let/,
          /\s+/,
          /(?:mut\s+)?/,
          UNDERSCORE_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "keyword",
          4: "variable"
        }
      },
      // must come before impl/for rule later
      {
        begin: [
          /for/,
          /\s+/,
          UNDERSCORE_IDENT_RE,
          /\s+/,
          /in/
        ],
        className: {
          1: "keyword",
          3: "variable",
          5: "keyword"
        }
      },
      {
        begin: [
          /type/,
          /\s+/,
          UNDERSCORE_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        begin: [
          /(?:trait|enum|struct|union|impl|for)/,
          /\s+/,
          UNDERSCORE_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        begin: hljs.IDENT_RE + '::',
        keywords: {
          keyword: "Self",
          built_in: BUILTINS,
          type: TYPES
        }
      },
      {
        className: "punctuation",
        begin: '->'
      },
      FUNCTION_INVOKE
    ]
  };
}

/*
Language: PHP
Author: Victor Karamzin <Victor.Karamzin@enterra-inc.com>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: https://www.php.net
Category: common
*/

/**
 * @param {HLJSApi} hljs
 * @returns {LanguageDetail}
 * */
function php(hljs) {
  const regex = hljs.regex;
  // negative look-ahead tries to avoid matching patterns that are not
  // Perl at all like $ident$, @ident@, etc.
  const NOT_PERL_ETC = /(?![A-Za-z0-9])(?![$])/;
  const IDENT_RE = regex.concat(
    /[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,
    NOT_PERL_ETC);
  // Will not detect camelCase classes
  const PASCAL_CASE_CLASS_NAME_RE = regex.concat(
    /(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,
    NOT_PERL_ETC);
  const UPCASE_NAME_RE = regex.concat(
    /[A-Z]+/,
    NOT_PERL_ETC);
  const VARIABLE = {
    scope: 'variable',
    match: '\\$+' + IDENT_RE,
  };
  const PREPROCESSOR = {
    scope: "meta",
    variants: [
      { begin: /<\?php/, relevance: 10 }, // boost for obvious PHP
      { begin: /<\?=/ },
      // less relevant per PSR-1 which says not to use short-tags
      { begin: /<\?/, relevance: 0.1 },
      { begin: /\?>/ } // end php tag
    ]
  };
  const SUBST = {
    scope: 'subst',
    variants: [
      { begin: /\$\w+/ },
      {
        begin: /\{\$/,
        end: /\}/
      }
    ]
  };
  const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, { illegal: null, });
  const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
  });

  const HEREDOC = {
    begin: /<<<[ \t]*(?:(\w+)|"(\w+)")\n/,
    end: /[ \t]*(\w+)\b/,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
    'on:begin': (m, resp) => { resp.data._beginMatch = m[1] || m[2]; },
    'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); },
  };

  const NOWDOC = hljs.END_SAME_AS_BEGIN({
    begin: /<<<[ \t]*'(\w+)'\n/,
    end: /[ \t]*(\w+)\b/,
  });
  // list of valid whitespaces because non-breaking space might be part of a IDENT_RE
  const WHITESPACE = '[ \t\n]';
  const STRING = {
    scope: 'string',
    variants: [
      DOUBLE_QUOTED,
      SINGLE_QUOTED,
      HEREDOC,
      NOWDOC
    ]
  };
  const NUMBER = {
    scope: 'number',
    variants: [
      { begin: `\\b0[bB][01]+(?:_[01]+)*\\b` }, // Binary w/ underscore support
      { begin: `\\b0[oO][0-7]+(?:_[0-7]+)*\\b` }, // Octals w/ underscore support
      { begin: `\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b` }, // Hex w/ underscore support
      // Decimals w/ underscore support, with optional fragments and scientific exponent (e) suffix.
      { begin: `(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?` }
    ],
    relevance: 0
  };
  const LITERALS = [
    "false",
    "null",
    "true"
  ];
  const KWS = [
    // Magic constants:
    // <https://www.php.net/manual/en/language.constants.predefined.php>
    "__CLASS__",
    "__DIR__",
    "__FILE__",
    "__FUNCTION__",
    "__COMPILER_HALT_OFFSET__",
    "__LINE__",
    "__METHOD__",
    "__NAMESPACE__",
    "__TRAIT__",
    // Function that look like language construct or language construct that look like function:
    // List of keywords that may not require parenthesis
    "die",
    "echo",
    "exit",
    "include",
    "include_once",
    "print",
    "require",
    "require_once",
    // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
    // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
    // Other keywords:
    // <https://www.php.net/manual/en/reserved.php>
    // <https://www.php.net/manual/en/language.types.type-juggling.php>
    "array",
    "abstract",
    "and",
    "as",
    "binary",
    "bool",
    "boolean",
    "break",
    "callable",
    "case",
    "catch",
    "class",
    "clone",
    "const",
    "continue",
    "declare",
    "default",
    "do",
    "double",
    "else",
    "elseif",
    "empty",
    "enddeclare",
    "endfor",
    "endforeach",
    "endif",
    "endswitch",
    "endwhile",
    "enum",
    "eval",
    "extends",
    "final",
    "finally",
    "float",
    "for",
    "foreach",
    "from",
    "global",
    "goto",
    "if",
    "implements",
    "instanceof",
    "insteadof",
    "int",
    "integer",
    "interface",
    "isset",
    "iterable",
    "list",
    "match|0",
    "mixed",
    "new",
    "never",
    "object",
    "or",
    "private",
    "protected",
    "public",
    "readonly",
    "real",
    "return",
    "string",
    "switch",
    "throw",
    "trait",
    "try",
    "unset",
    "use",
    "var",
    "void",
    "while",
    "xor",
    "yield"
  ];

  const BUILT_INS = [
    // Standard PHP library:
    // <https://www.php.net/manual/en/book.spl.php>
    "Error|0",
    "AppendIterator",
    "ArgumentCountError",
    "ArithmeticError",
    "ArrayIterator",
    "ArrayObject",
    "AssertionError",
    "BadFunctionCallException",
    "BadMethodCallException",
    "CachingIterator",
    "CallbackFilterIterator",
    "CompileError",
    "Countable",
    "DirectoryIterator",
    "DivisionByZeroError",
    "DomainException",
    "EmptyIterator",
    "ErrorException",
    "Exception",
    "FilesystemIterator",
    "FilterIterator",
    "GlobIterator",
    "InfiniteIterator",
    "InvalidArgumentException",
    "IteratorIterator",
    "LengthException",
    "LimitIterator",
    "LogicException",
    "MultipleIterator",
    "NoRewindIterator",
    "OutOfBoundsException",
    "OutOfRangeException",
    "OuterIterator",
    "OverflowException",
    "ParentIterator",
    "ParseError",
    "RangeException",
    "RecursiveArrayIterator",
    "RecursiveCachingIterator",
    "RecursiveCallbackFilterIterator",
    "RecursiveDirectoryIterator",
    "RecursiveFilterIterator",
    "RecursiveIterator",
    "RecursiveIteratorIterator",
    "RecursiveRegexIterator",
    "RecursiveTreeIterator",
    "RegexIterator",
    "RuntimeException",
    "SeekableIterator",
    "SplDoublyLinkedList",
    "SplFileInfo",
    "SplFileObject",
    "SplFixedArray",
    "SplHeap",
    "SplMaxHeap",
    "SplMinHeap",
    "SplObjectStorage",
    "SplObserver",
    "SplPriorityQueue",
    "SplQueue",
    "SplStack",
    "SplSubject",
    "SplTempFileObject",
    "TypeError",
    "UnderflowException",
    "UnexpectedValueException",
    "UnhandledMatchError",
    // Reserved interfaces:
    // <https://www.php.net/manual/en/reserved.interfaces.php>
    "ArrayAccess",
    "BackedEnum",
    "Closure",
    "Fiber",
    "Generator",
    "Iterator",
    "IteratorAggregate",
    "Serializable",
    "Stringable",
    "Throwable",
    "Traversable",
    "UnitEnum",
    "WeakReference",
    "WeakMap",
    // Reserved classes:
    // <https://www.php.net/manual/en/reserved.classes.php>
    "Directory",
    "__PHP_Incomplete_Class",
    "parent",
    "php_user_filter",
    "self",
    "static",
    "stdClass"
  ];

  /** Dual-case keywords
   *
   * ["then","FILE"] =>
   *     ["then", "THEN", "FILE", "file"]
   *
   * @param {string[]} items */
  const dualCase = (items) => {
    /** @type string[] */
    const result = [];
    items.forEach(item => {
      result.push(item);
      if (item.toLowerCase() === item) {
        result.push(item.toUpperCase());
      } else {
        result.push(item.toLowerCase());
      }
    });
    return result;
  };

  const KEYWORDS = {
    keyword: KWS,
    literal: dualCase(LITERALS),
    built_in: BUILT_INS,
  };

  /**
   * @param {string[]} items */
  const normalizeKeywords = (items) => {
    return items.map(item => {
      return item.replace(/\|\d+$/, "");
    });
  };

  const CONSTRUCTOR_CALL = { variants: [
    {
      match: [
        /new/,
        regex.concat(WHITESPACE, "+"),
        // to prevent built ins from being confused as the class constructor call
        regex.concat("(?!", normalizeKeywords(BUILT_INS).join("\\b|"), "\\b)"),
        PASCAL_CASE_CLASS_NAME_RE,
      ],
      scope: {
        1: "keyword",
        4: "title.class",
      },
    }
  ] };

  const CONSTANT_REFERENCE = regex.concat(IDENT_RE, "\\b(?!\\()");

  const LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON = { variants: [
    {
      match: [
        regex.concat(
          /::/,
          regex.lookahead(/(?!class\b)/)
        ),
        CONSTANT_REFERENCE,
      ],
      scope: { 2: "variable.constant", },
    },
    {
      match: [
        /::/,
        /class/,
      ],
      scope: { 2: "variable.language", },
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        regex.concat(
          /::/,
          regex.lookahead(/(?!class\b)/)
        ),
        CONSTANT_REFERENCE,
      ],
      scope: {
        1: "title.class",
        3: "variable.constant",
      },
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        regex.concat(
          "::",
          regex.lookahead(/(?!class\b)/)
        ),
      ],
      scope: { 1: "title.class", },
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        /::/,
        /class/,
      ],
      scope: {
        1: "title.class",
        3: "variable.language",
      },
    }
  ] };

  const NAMED_ARGUMENT = {
    scope: 'attr',
    match: regex.concat(IDENT_RE, regex.lookahead(':'), regex.lookahead(/(?!::)/)),
  };
  const PARAMS_MODE = {
    relevance: 0,
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS,
    contains: [
      NAMED_ARGUMENT,
      VARIABLE,
      LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
      hljs.C_BLOCK_COMMENT_MODE,
      STRING,
      NUMBER,
      CONSTRUCTOR_CALL,
    ],
  };
  const FUNCTION_INVOKE = {
    relevance: 0,
    match: [
      /\b/,
      // to prevent keywords from being confused as the function title
      regex.concat("(?!fn\\b|function\\b|", normalizeKeywords(KWS).join("\\b|"), "|", normalizeKeywords(BUILT_INS).join("\\b|"), "\\b)"),
      IDENT_RE,
      regex.concat(WHITESPACE, "*"),
      regex.lookahead(/(?=\()/)
    ],
    scope: { 3: "title.function.invoke", },
    contains: [ PARAMS_MODE ]
  };
  PARAMS_MODE.contains.push(FUNCTION_INVOKE);

  const ATTRIBUTE_CONTAINS = [
    NAMED_ARGUMENT,
    LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING,
    NUMBER,
    CONSTRUCTOR_CALL,
  ];

  const ATTRIBUTES = {
    begin: regex.concat(/#\[\s*\\?/,
      regex.either(
        PASCAL_CASE_CLASS_NAME_RE,
        UPCASE_NAME_RE
      )
    ),
    beginScope: "meta",
    end: /]/,
    endScope: "meta",
    keywords: {
      literal: LITERALS,
      keyword: [
        'new',
        'array',
      ]
    },
    contains: [
      {
        begin: /\[/,
        end: /]/,
        keywords: {
          literal: LITERALS,
          keyword: [
            'new',
            'array',
          ]
        },
        contains: [
          'self',
          ...ATTRIBUTE_CONTAINS,
        ]
      },
      ...ATTRIBUTE_CONTAINS,
      {
        scope: 'meta',
        variants: [
          { match: PASCAL_CASE_CLASS_NAME_RE },
          { match: UPCASE_NAME_RE }
        ]
      }
    ]
  };

  return {
    case_insensitive: false,
    keywords: KEYWORDS,
    contains: [
      ATTRIBUTES,
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT('//', '$'),
      hljs.COMMENT(
        '/\\*',
        '\\*/',
        { contains: [
          {
            scope: 'doctag',
            match: '@[A-Za-z]+'
          }
        ] }
      ),
      {
        match: /__halt_compiler\(\);/,
        keywords: '__halt_compiler',
        starts: {
          scope: "comment",
          end: hljs.MATCH_NOTHING_RE,
          contains: [
            {
              match: /\?>/,
              scope: "meta",
              endsParent: true
            }
          ]
        }
      },
      PREPROCESSOR,
      {
        scope: 'variable.language',
        match: /\$this\b/
      },
      VARIABLE,
      FUNCTION_INVOKE,
      LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
      {
        match: [
          /const/,
          /\s/,
          IDENT_RE,
        ],
        scope: {
          1: "keyword",
          3: "variable.constant",
        },
      },
      CONSTRUCTOR_CALL,
      {
        scope: 'function',
        relevance: 0,
        beginKeywords: 'fn function',
        end: /[;{]/,
        excludeEnd: true,
        illegal: '[$%\\[]',
        contains: [
          { beginKeywords: 'use', },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            begin: '=>', // No markup, just a relevance booster
            endsParent: true
          },
          {
            scope: 'params',
            begin: '\\(',
            end: '\\)',
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            contains: [
              'self',
              ATTRIBUTES,
              VARIABLE,
              LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          },
        ]
      },
      {
        scope: 'class',
        variants: [
          {
            beginKeywords: "enum",
            illegal: /[($"]/
          },
          {
            beginKeywords: "class interface trait",
            illegal: /[:($"]/
          }
        ],
        relevance: 0,
        end: /\{/,
        excludeEnd: true,
        contains: [
          { beginKeywords: 'extends implements' },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // both use and namespace still use "old style" rules (vs multi-match)
      // because the namespace name can include `\` and we still want each
      // element to be treated as its own *individual* title
      {
        beginKeywords: 'namespace',
        relevance: 0,
        end: ';',
        illegal: /[.']/,
        contains: [ hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, { scope: "title.class" }) ]
      },
      {
        beginKeywords: 'use',
        relevance: 0,
        end: ';',
        contains: [
          // TODO: title.function vs title.class
          {
            match: /\b(as|const|function)\b/,
            scope: "keyword"
          },
          // TODO: could be title.class or title.function
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      STRING,
      NUMBER,
    ]
  };
}

/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
Contributor: Nicolas LLOBERA <nllobera@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, David Pine <david.pine@microsoft.com>
Website: https://docs.microsoft.com/dotnet/csharp/
Category: common
*/

/** @type LanguageFn */
function csharp(hljs) {
  const BUILT_IN_KEYWORDS = [
    'bool',
    'byte',
    'char',
    'decimal',
    'delegate',
    'double',
    'dynamic',
    'enum',
    'float',
    'int',
    'long',
    'nint',
    'nuint',
    'object',
    'sbyte',
    'short',
    'string',
    'ulong',
    'uint',
    'ushort'
  ];
  const FUNCTION_MODIFIERS = [
    'public',
    'private',
    'protected',
    'static',
    'internal',
    'protected',
    'abstract',
    'async',
    'extern',
    'override',
    'unsafe',
    'virtual',
    'new',
    'sealed',
    'partial'
  ];
  const LITERAL_KEYWORDS = [
    'default',
    'false',
    'null',
    'true'
  ];
  const NORMAL_KEYWORDS = [
    'abstract',
    'as',
    'base',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'do',
    'else',
    'event',
    'explicit',
    'extern',
    'finally',
    'fixed',
    'for',
    'foreach',
    'goto',
    'if',
    'implicit',
    'in',
    'interface',
    'internal',
    'is',
    'lock',
    'namespace',
    'new',
    'operator',
    'out',
    'override',
    'params',
    'private',
    'protected',
    'public',
    'readonly',
    'record',
    'ref',
    'return',
    'scoped',
    'sealed',
    'sizeof',
    'stackalloc',
    'static',
    'struct',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'unchecked',
    'unsafe',
    'using',
    'virtual',
    'void',
    'volatile',
    'while'
  ];
  const CONTEXTUAL_KEYWORDS = [
    'add',
    'alias',
    'and',
    'ascending',
    'args',
    'async',
    'await',
    'by',
    'descending',
    'dynamic',
    'equals',
    'file',
    'from',
    'get',
    'global',
    'group',
    'init',
    'into',
    'join',
    'let',
    'nameof',
    'not',
    'notnull',
    'on',
    'or',
    'orderby',
    'partial',
    'record',
    'remove',
    'required',
    'scoped',
    'select',
    'set',
    'unmanaged',
    'value|0',
    'var',
    'when',
    'where',
    'with',
    'yield'
  ];

  const KEYWORDS = {
    keyword: NORMAL_KEYWORDS.concat(CONTEXTUAL_KEYWORDS),
    built_in: BUILT_IN_KEYWORDS,
    literal: LITERAL_KEYWORDS
  };
  const TITLE_MODE = hljs.inherit(hljs.TITLE_MODE, { begin: '[a-zA-Z](\\.?\\w)*' });
  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(0b[01\']+)' },
      { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };
  const RAW_STRING = {
    className: 'string',
    begin: /"""("*)(?!")(.|\n)*?"""\1/,
    relevance: 1
  };
  const VERBATIM_STRING = {
    className: 'string',
    begin: '@"',
    end: '"',
    contains: [ { begin: '""' } ]
  };
  const VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, { illegal: /\n/ });
  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS
  };
  const SUBST_NO_LF = hljs.inherit(SUBST, { illegal: /\n/ });
  const INTERPOLATED_STRING = {
    className: 'string',
    begin: /\$"/,
    end: '"',
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      hljs.BACKSLASH_ESCAPE,
      SUBST_NO_LF
    ]
  };
  const INTERPOLATED_VERBATIM_STRING = {
    className: 'string',
    begin: /\$@"/,
    end: '"',
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      SUBST
    ]
  };
  const INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      SUBST_NO_LF
    ]
  });
  SUBST.contains = [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  SUBST_NO_LF.contains = [
    INTERPOLATED_VERBATIM_STRING_NO_LF,
    INTERPOLATED_STRING,
    VERBATIM_STRING_NO_LF,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, { illegal: /\n/ })
  ];
  const STRING = { variants: [
    RAW_STRING,
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ] };

  const GENERIC_MODIFIER = {
    begin: "<",
    end: ">",
    contains: [
      { beginKeywords: "in out" },
      TITLE_MODE
    ]
  };
  const TYPE_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '(\\s*,\\s*' + hljs.IDENT_RE + ')*>)?(\\[\\])?';
  const AT_IDENTIFIER = {
    // prevents expressions like `@class` from incorrect flagging
    // `class` as a keyword
    begin: "@" + hljs.IDENT_RE,
    relevance: 0
  };

  return {
    name: 'C#',
    aliases: [
      'cs',
      'c#'
    ],
    keywords: KEYWORDS,
    illegal: /::/,
    contains: [
      hljs.COMMENT(
        '///',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              variants: [
                {
                  begin: '///',
                  relevance: 0
                },
                { begin: '<!--|-->' },
                {
                  begin: '</?',
                  end: '>'
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta',
        begin: '#',
        end: '$',
        keywords: { keyword: 'if else elif endif define undef warning error line region endregion pragma checksum' }
      },
      STRING,
      NUMBERS,
      {
        beginKeywords: 'class interface',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          { beginKeywords: "where class" },
          TITLE_MODE,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'namespace',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'record',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // [Attributes("")]
        className: 'meta',
        begin: '^\\s*\\[(?=[\\w])',
        excludeBegin: true,
        end: '\\]',
        excludeEnd: true,
        contains: [
          {
            className: 'string',
            begin: /"/,
            end: /"/
          }
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new return throw await else',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + TYPE_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*(<[^=]+>\\s*)?\\(',
        returnBegin: true,
        end: /\s*[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          // prevents these from being highlighted `title`
          {
            beginKeywords: FUNCTION_MODIFIERS.join(" "),
            relevance: 0
          },
          {
            begin: hljs.IDENT_RE + '\\s*(<[^=]+>\\s*)?\\(',
            returnBegin: true,
            contains: [
              hljs.TITLE_MODE,
              GENERIC_MODIFIER
            ],
            relevance: 0
          },
          { match: /\(\)/ },
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              NUMBERS,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      AT_IDENTIFIER
    ]
  };
}

// https://docs.oracle.com/javase/specs/jls/se15/html/jls-3.html#jls-3.10
var decimalDigits$1 = '[0-9](_*[0-9])*';
var frac$1 = `\\.(${decimalDigits$1})`;
var hexDigits$1 = '[0-9a-fA-F](_*[0-9a-fA-F])*';
var NUMERIC$1 = {
  className: 'number',
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${decimalDigits$1})((${frac$1})|\\.)?|(${frac$1}))` +
      `[eE][+-]?(${decimalDigits$1})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${decimalDigits$1})((${frac$1})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${frac$1})[fFdD]?\\b` },
    { begin: `\\b(${decimalDigits$1})[fFdD]\\b` },

    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${hexDigits$1})\\.?|(${hexDigits$1})?\\.(${hexDigits$1}))` +
      `[pP][+-]?(${decimalDigits$1})[fFdD]?\\b` },

    // DecimalIntegerLiteral
    { begin: '\\b(0|[1-9](_*[0-9])*)[lL]?\\b' },

    // HexIntegerLiteral
    { begin: `\\b0[xX](${hexDigits$1})[lL]?\\b` },

    // OctalIntegerLiteral
    { begin: '\\b0(_*[0-7])*[lL]?\\b' },

    // BinaryIntegerLiteral
    { begin: '\\b0[bB][01](_*[01])*[lL]?\\b' },
  ],
  relevance: 0
};

/*
Language: Java
Author: Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
Category: common, enterprise
Website: https://www.java.com/
*/


/**
 * Allows recursive regex expressions to a given depth
 *
 * ie: recurRegex("(abc~~~)", /~~~/g, 2) becomes:
 * (abc(abc(abc)))
 *
 * @param {string} re
 * @param {RegExp} substitution (should be a g mode regex)
 * @param {number} depth
 * @returns {string}``
 */
function recurRegex(re, substitution, depth) {
  if (depth === -1) return "";

  return re.replace(substitution, _ => {
    return recurRegex(re, substitution, depth - 1);
  });
}

/** @type LanguageFn */
function java(hljs) {
  const regex = hljs.regex;
  const JAVA_IDENT_RE = '[\u00C0-\u02B8a-zA-Z_$][\u00C0-\u02B8a-zA-Z_$0-9]*';
  const GENERIC_IDENT_RE = JAVA_IDENT_RE
    + recurRegex('(?:<' + JAVA_IDENT_RE + '~~~(?:\\s*,\\s*' + JAVA_IDENT_RE + '~~~)*>)?', /~~~/g, 2);
  const MAIN_KEYWORDS = [
    'synchronized',
    'abstract',
    'private',
    'var',
    'static',
    'if',
    'const ',
    'for',
    'while',
    'strictfp',
    'finally',
    'protected',
    'import',
    'native',
    'final',
    'void',
    'enum',
    'else',
    'break',
    'transient',
    'catch',
    'instanceof',
    'volatile',
    'case',
    'assert',
    'package',
    'default',
    'public',
    'try',
    'switch',
    'continue',
    'throws',
    'protected',
    'public',
    'private',
    'module',
    'requires',
    'exports',
    'do',
    'sealed',
    'yield',
    'permits',
    'goto',
    'when'
  ];

  const BUILT_INS = [
    'super',
    'this'
  ];

  const LITERALS = [
    'false',
    'true',
    'null'
  ];

  const TYPES = [
    'char',
    'boolean',
    'long',
    'float',
    'int',
    'byte',
    'short',
    'double'
  ];

  const KEYWORDS = {
    keyword: MAIN_KEYWORDS,
    literal: LITERALS,
    type: TYPES,
    built_in: BUILT_INS
  };

  const ANNOTATION = {
    className: 'meta',
    begin: '@' + JAVA_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: [ "self" ] // allow nested () inside our annotation
      }
    ]
  };
  const PARAMS = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS,
    relevance: 0,
    contains: [ hljs.C_BLOCK_COMMENT_MODE ],
    endsParent: true
  };

  return {
    name: 'Java',
    aliases: [ 'jsp' ],
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      // relevance boost
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        match: [
          /\b(?:class|interface|enum|extends|implements|new)/,
          /\s+/,
          JAVA_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        // Exceptions for hyphenated keywords
        match: /non-sealed/,
        scope: "keyword"
      },
      {
        begin: [
          regex.concat(/(?!else)/, JAVA_IDENT_RE),
          /\s+/,
          JAVA_IDENT_RE,
          /\s+/,
          /=(?!=)/
        ],
        className: {
          1: "type",
          3: "variable",
          5: "operator"
        }
      },
      {
        begin: [
          /record/,
          /\s+/,
          JAVA_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        },
        contains: [
          PARAMS,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new throw return else',
        relevance: 0
      },
      {
        begin: [
          '(?:' + GENERIC_IDENT_RE + '\\s+)',
          hljs.UNDERSCORE_IDENT_RE,
          /\s*(?=\()/
        ],
        className: { 2: "title.function" },
        keywords: KEYWORDS,
        contains: [
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              ANNOTATION,
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              NUMERIC$1,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      NUMERIC$1,
      ANNOTATION
    ]
  };
}

/*
Language: Python
Description: Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
Website: https://www.python.org
Category: common
*/

function python(hljs) {
  const regex = hljs.regex;
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;
  const RESERVED_WORDS = [
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'case',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'match',
    'nonlocal|10',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield'
  ];

  const BUILT_INS = [
    '__import__',
    'abs',
    'all',
    'any',
    'ascii',
    'bin',
    'bool',
    'breakpoint',
    'bytearray',
    'bytes',
    'callable',
    'chr',
    'classmethod',
    'compile',
    'complex',
    'delattr',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'exec',
    'filter',
    'float',
    'format',
    'frozenset',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'hex',
    'id',
    'input',
    'int',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'list',
    'locals',
    'map',
    'max',
    'memoryview',
    'min',
    'next',
    'object',
    'oct',
    'open',
    'ord',
    'pow',
    'print',
    'property',
    'range',
    'repr',
    'reversed',
    'round',
    'set',
    'setattr',
    'slice',
    'sorted',
    'staticmethod',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'vars',
    'zip'
  ];

  const LITERALS = [
    '__debug__',
    'Ellipsis',
    'False',
    'None',
    'NotImplemented',
    'True'
  ];

  // https://docs.python.org/3/library/typing.html
  // TODO: Could these be supplemented by a CamelCase matcher in certain
  // contexts, leaving these remaining only for relevance hinting?
  const TYPES = [
    "Any",
    "Callable",
    "Coroutine",
    "Dict",
    "List",
    "Literal",
    "Generic",
    "Optional",
    "Sequence",
    "Set",
    "Tuple",
    "Type",
    "Union"
  ];

  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES
  };

  const PROMPT = {
    className: 'meta',
    begin: /^(>>>|\.\.\.) /
  };

  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/
  };

  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };

  const STRING = {
    className: 'string',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // https://docs.python.org/3.9/reference/lexical_analysis.html#numeric-literals
  const digitpart = '[0-9](_?[0-9])*';
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  // Whitespace after a number (or any lexical token) is needed only if its absence
  // would change the tokenization
  // https://docs.python.org/3.9/reference/lexical_analysis.html#whitespace-between-tokens
  // We deviate slightly, requiring a word boundary or a keyword
  // to avoid accidentally recognizing *prefixes* (e.g., `0` in `0x41` or `08` or `0__1`)
  const lookahead = `\\b|${RESERVED_WORDS.join('|')}`;
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead})`
      },
      {
        begin: `(${pointfloat})[jJ]?`
      },

      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead})`
      },

      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead})`
      }
    ]
  };
  const COMMENT_TYPE = {
    className: "comment",
    begin: regex.lookahead(/# type:/),
    end: /$/,
    keywords: KEYWORDS,
    contains: [
      { // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true
      }
    ]
  };
  const PARAMS = {
    className: 'params',
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          PROMPT,
          NUMBER,
          STRING,
          hljs.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  SUBST.contains = [
    STRING,
    NUMBER,
    PROMPT
  ];

  return {
    name: 'Python',
    aliases: [
      'py',
      'gyp',
      'ipython'
    ],
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /(<\/|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      {
        // very common convention
        scope: 'variable.language',
        match: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      { match: /\bor\b/, scope: "keyword" },
      STRING,
      COMMENT_TYPE,
      hljs.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/, /\s+/,
          IDENT_RE,
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [ PARAMS ]
      },
      {
        variants: [
          {
            match: [
              /\bclass/, /\s+/,
              IDENT_RE, /\s*/,
              /\(\s*/, IDENT_RE,/\s*\)/
            ],
          },
          {
            match: [
              /\bclass/, /\s+/,
              IDENT_RE
            ],
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited",
        }
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          NUMBER,
          PARAMS,
          STRING
        ]
      }
    ]
  };
}

/*
Language: Go
Author: Stephan Kountso aka StepLg <steplg@gmail.com>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>
Description: Google go language (golang). For info about language
Website: http://golang.org/
Category: common, system
*/

function go(hljs) {
  const LITERALS = [
    "true",
    "false",
    "iota",
    "nil"
  ];
  const BUILT_INS = [
    "append",
    "cap",
    "close",
    "complex",
    "copy",
    "imag",
    "len",
    "make",
    "new",
    "panic",
    "print",
    "println",
    "real",
    "recover",
    "delete"
  ];
  const TYPES = [
    "bool",
    "byte",
    "complex64",
    "complex128",
    "error",
    "float32",
    "float64",
    "int8",
    "int16",
    "int32",
    "int64",
    "string",
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "int",
    "uint",
    "uintptr",
    "rune"
  ];
  const KWS = [
    "break",
    "case",
    "chan",
    "const",
    "continue",
    "default",
    "defer",
    "else",
    "fallthrough",
    "for",
    "func",
    "go",
    "goto",
    "if",
    "import",
    "interface",
    "map",
    "package",
    "range",
    "return",
    "select",
    "struct",
    "switch",
    "type",
    "var",
  ];
  const KEYWORDS = {
    keyword: KWS,
    type: TYPES,
    literal: LITERALS,
    built_in: BUILT_INS
  };
  return {
    name: 'Go',
    aliases: [ 'golang' ],
    keywords: KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        variants: [
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            begin: '`',
            end: '`'
          }
        ]
      },
      {
        className: 'number',
        variants: [
          {
            match: /-?\b0[xX]\.[a-fA-F0-9](_?[a-fA-F0-9])*[pP][+-]?\d(_?\d)*i?/, // hex without a present digit before . (making a digit afterwards required)
            relevance: 0
          },
          {
            match: /-?\b0[xX](_?[a-fA-F0-9])+((\.([a-fA-F0-9](_?[a-fA-F0-9])*)?)?[pP][+-]?\d(_?\d)*)?i?/, // hex with a present digit before . (making a digit afterwards optional)
            relevance: 0
          },
          {
            match: /-?\b0[oO](_?[0-7])*i?/, // leading 0o octal
            relevance: 0
          },
          {
            match: /-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?i?/, // decimal without a present digit before . (making a digit afterwards required)
            relevance: 0
          },
          {
            match: /-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?i?/, // decimal with a present digit before . (making a digit afterwards optional)
            relevance: 0
          }
        ]
      },
      { begin: /:=/ // relevance booster
      },
      {
        className: 'function',
        beginKeywords: 'func',
        end: '\\s*(\\{|$)',
        excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: KEYWORDS,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}

/*
Language: C++
Category: common, system
Website: https://isocpp.org
*/

/** @type LanguageFn */
function cpp(hljs) {
  const regex = hljs.regex;
  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
  // not include such support nor can we be sure all the grammars depending
  // on it would desire this behavior
  const C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', { contains: [ { begin: /\\\n/ } ] });
  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
  const FUNCTION_TYPE_RE = '(?!struct)('
    + DECLTYPE_AUTO_RE + '|'
    + regex.optional(NAMESPACE_RE)
    + '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE)
  + ')';

  const CPP_PRIMITIVE_TYPES = {
    className: 'type',
    begin: '\\b[a-z\\d_]*_t\\b'
  };

  // https://en.cppreference.com/w/cpp/language/escape
  // \\ \x \xFF \u2837 \u00323747 \374
  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + '|.)',
        end: '\'',
        illegal: '.'
      },
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      // Floating-point literal.
      { begin:
        "[+-]?(?:" // Leading sign.
          // Decimal.
          + "(?:"
            +"[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?"
            + "|\\.[0-9](?:'?[0-9])*"
          + ")(?:[Ee][+-]?[0-9](?:'?[0-9])*)?"
          + "|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*"
          // Hexadecimal.
          + "|0[Xx](?:"
            +"[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?"
            + "|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*"
          + ")[Pp][+-]?[0-9](?:'?[0-9])*"
        + ")(?:" // Literal suffixes.
          + "[Ff](?:16|32|64|128)?"
          + "|(BF|bf)16"
          + "|[Ll]"
          + "|" // Literal suffix is optional.
        + ")"
      },
      // Integer literal.
      { begin:
        "[+-]?\\b(?:" // Leading sign.
          + "0[Bb][01](?:'?[01])*" // Binary.
          + "|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*" // Hexadecimal.
          + "|0(?:'?[0-7])*" // Octal or just a lone zero.
          + "|[1-9](?:'?[0-9])*" // Decimal.
        + ")(?:" // Literal suffixes.
          + "[Uu](?:LL?|ll?)"
          + "|[Uu][Zz]?"
          + "|(?:LL?|ll?)[Uu]?"
          + "|[Zz][Uu]"
          + "|" // Literal suffix is optional.
        + ")"
        // Note: there are user-defined literal suffixes too, but perhaps having the custom suffix not part of the
        // literal highlight actually makes it stand out more.
      }
    ],
    relevance: 0
  };

  const PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword:
        'if else elif endif define undef warning error line '
        + 'pragma _Pragma ifdef ifndef include' },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      hljs.inherit(STRINGS, { className: 'string' }),
      {
        className: 'string',
        begin: /<.*?>/
      },
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const TITLE_MODE = {
    className: 'title',
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };

  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

  // https://en.cppreference.com/w/cpp/keyword
  const RESERVED_KEYWORDS = [
    'alignas',
    'alignof',
    'and',
    'and_eq',
    'asm',
    'atomic_cancel',
    'atomic_commit',
    'atomic_noexcept',
    'auto',
    'bitand',
    'bitor',
    'break',
    'case',
    'catch',
    'class',
    'co_await',
    'co_return',
    'co_yield',
    'compl',
    'concept',
    'const_cast|10',
    'consteval',
    'constexpr',
    'constinit',
    'continue',
    'decltype',
    'default',
    'delete',
    'do',
    'dynamic_cast|10',
    'else',
    'enum',
    'explicit',
    'export',
    'extern',
    'false',
    'final',
    'for',
    'friend',
    'goto',
    'if',
    'import',
    'inline',
    'module',
    'mutable',
    'namespace',
    'new',
    'noexcept',
    'not',
    'not_eq',
    'nullptr',
    'operator',
    'or',
    'or_eq',
    'override',
    'private',
    'protected',
    'public',
    'reflexpr',
    'register',
    'reinterpret_cast|10',
    'requires',
    'return',
    'sizeof',
    'static_assert',
    'static_cast|10',
    'struct',
    'switch',
    'synchronized',
    'template',
    'this',
    'thread_local',
    'throw',
    'transaction_safe',
    'transaction_safe_dynamic',
    'true',
    'try',
    'typedef',
    'typeid',
    'typename',
    'union',
    'using',
    'virtual',
    'volatile',
    'while',
    'xor',
    'xor_eq'
  ];

  // https://en.cppreference.com/w/cpp/keyword
  const RESERVED_TYPES = [
    'bool',
    'char',
    'char16_t',
    'char32_t',
    'char8_t',
    'double',
    'float',
    'int',
    'long',
    'short',
    'void',
    'wchar_t',
    'unsigned',
    'signed',
    'const',
    'static'
  ];

  const TYPE_HINTS = [
    'any',
    'auto_ptr',
    'barrier',
    'binary_semaphore',
    'bitset',
    'complex',
    'condition_variable',
    'condition_variable_any',
    'counting_semaphore',
    'deque',
    'false_type',
    'flat_map',
    'flat_set',
    'future',
    'imaginary',
    'initializer_list',
    'istringstream',
    'jthread',
    'latch',
    'lock_guard',
    'multimap',
    'multiset',
    'mutex',
    'optional',
    'ostringstream',
    'packaged_task',
    'pair',
    'promise',
    'priority_queue',
    'queue',
    'recursive_mutex',
    'recursive_timed_mutex',
    'scoped_lock',
    'set',
    'shared_future',
    'shared_lock',
    'shared_mutex',
    'shared_timed_mutex',
    'shared_ptr',
    'stack',
    'string_view',
    'stringstream',
    'timed_mutex',
    'thread',
    'true_type',
    'tuple',
    'unique_lock',
    'unique_ptr',
    'unordered_map',
    'unordered_multimap',
    'unordered_multiset',
    'unordered_set',
    'variant',
    'vector',
    'weak_ptr',
    'wstring',
    'wstring_view'
  ];

  const FUNCTION_HINTS = [
    'abort',
    'abs',
    'acos',
    'apply',
    'as_const',
    'asin',
    'atan',
    'atan2',
    'calloc',
    'ceil',
    'cerr',
    'cin',
    'clog',
    'cos',
    'cosh',
    'cout',
    'declval',
    'endl',
    'exchange',
    'exit',
    'exp',
    'fabs',
    'floor',
    'fmod',
    'forward',
    'fprintf',
    'fputs',
    'free',
    'frexp',
    'fscanf',
    'future',
    'invoke',
    'isalnum',
    'isalpha',
    'iscntrl',
    'isdigit',
    'isgraph',
    'islower',
    'isprint',
    'ispunct',
    'isspace',
    'isupper',
    'isxdigit',
    'labs',
    'launder',
    'ldexp',
    'log',
    'log10',
    'make_pair',
    'make_shared',
    'make_shared_for_overwrite',
    'make_tuple',
    'make_unique',
    'malloc',
    'memchr',
    'memcmp',
    'memcpy',
    'memset',
    'modf',
    'move',
    'pow',
    'printf',
    'putchar',
    'puts',
    'realloc',
    'scanf',
    'sin',
    'sinh',
    'snprintf',
    'sprintf',
    'sqrt',
    'sscanf',
    'std',
    'stderr',
    'stdin',
    'stdout',
    'strcat',
    'strchr',
    'strcmp',
    'strcpy',
    'strcspn',
    'strlen',
    'strncat',
    'strncmp',
    'strncpy',
    'strpbrk',
    'strrchr',
    'strspn',
    'strstr',
    'swap',
    'tan',
    'tanh',
    'terminate',
    'to_underlying',
    'tolower',
    'toupper',
    'vfprintf',
    'visit',
    'vprintf',
    'vsprintf'
  ];

  const LITERALS = [
    'NULL',
    'false',
    'nullopt',
    'nullptr',
    'true'
  ];

  // https://en.cppreference.com/w/cpp/keyword
  const BUILT_IN = [ '_Pragma' ];

  const CPP_KEYWORDS = {
    type: RESERVED_TYPES,
    keyword: RESERVED_KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_IN,
    _type_hints: TYPE_HINTS
  };

  const FUNCTION_DISPATCH = {
    className: 'function.dispatch',
    relevance: 0,
    keywords: {
      // Only for relevance, not highlighting.
      _hint: FUNCTION_HINTS },
    begin: regex.concat(
      /\b/,
      /(?!decltype)/,
      /(?!if)/,
      /(?!for)/,
      /(?!switch)/,
      /(?!while)/,
      hljs.IDENT_RE,
      regex.lookahead(/(<[^<>]+>|)\s*\(/))
  };

  const EXPRESSION_CONTAINS = [
    FUNCTION_DISPATCH,
    PREPROCESSOR,
    CPP_PRIMITIVE_TYPES,
    C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];

  const EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: 'new throw return else',
        end: /;/
      }
    ],
    keywords: CPP_KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        contains: EXPRESSION_CONTAINS.concat([ 'self' ]),
        relevance: 0
      }
    ]),
    relevance: 0
  };

  const FUNCTION_DECLARATION = {
    className: 'function',
    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: CPP_KEYWORDS,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      { // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: CPP_KEYWORDS,
        relevance: 0
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [ TITLE_MODE ],
        relevance: 0
      },
      // needed because we do not have look-behind on the below rule
      // to prevent it from grabbing the final : in a :: pair
      {
        begin: /::/,
        relevance: 0
      },
      // initializers
      {
        begin: /:/,
        endsWithParent: true,
        contains: [
          STRINGS,
          NUMBERS
        ]
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        relevance: 0,
        contains: [
          C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          STRINGS,
          NUMBERS,
          CPP_PRIMITIVE_TYPES,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: CPP_KEYWORDS,
            relevance: 0,
            contains: [
              'self',
              C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS,
              CPP_PRIMITIVE_TYPES
            ]
          }
        ]
      },
      CPP_PRIMITIVE_TYPES,
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      PREPROCESSOR
    ]
  };

  return {
    name: 'C++',
    aliases: [
      'cc',
      'c++',
      'h++',
      'hpp',
      'hh',
      'hxx',
      'cxx'
    ],
    keywords: CPP_KEYWORDS,
    illegal: '</',
    classNameAliases: { 'function.dispatch': 'built_in' },
    contains: [].concat(
      EXPRESSION_CONTEXT,
      FUNCTION_DECLARATION,
      FUNCTION_DISPATCH,
      EXPRESSION_CONTAINS,
      [
        PREPROCESSOR,
        { // containers: ie, `vector <int> rooms (9);`
          begin: '\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)',
          end: '>',
          keywords: CPP_KEYWORDS,
          contains: [
            'self',
            CPP_PRIMITIVE_TYPES
          ]
        },
        {
          begin: hljs.IDENT_RE + '::',
          keywords: CPP_KEYWORDS
        },
        {
          match: [
            // extra complexity to deal with `enum class` and `enum struct`
            /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
            /\s+/,
            /\w+/
          ],
          className: {
            1: 'keyword',
            3: 'title.class'
          }
        }
      ])
  };
}

/*
Language: Ruby
Description: Ruby is a dynamic, open source programming language with a focus on simplicity and productivity.
Website: https://www.ruby-lang.org/
Author: Anton Kovalyov <anton@kovalyov.net>
Contributors: Peter Leonov <gojpeg@yandex.ru>, Vasily Polovnyov <vast@whiteants.net>, Loren Segal <lsegal@soen.ca>, Pascal Hurni <phi@ruby-reactive.org>, Cedric Sohrauer <sohrauer@googlemail.com>
Category: common, scripting
*/

function ruby(hljs) {
  const regex = hljs.regex;
  const RUBY_METHOD_RE = '([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)';
  // TODO: move concepts like CAMEL_CASE into `modes.js`
  const CLASS_NAME_RE = regex.either(
    /\b([A-Z]+[a-z0-9]+)+/,
    // ends in caps
    /\b([A-Z]+[a-z0-9]+)+[A-Z]+/,
  )
  ;
  const CLASS_NAME_WITH_NAMESPACE_RE = regex.concat(CLASS_NAME_RE, /(::\w+)*/);
  // very popular ruby built-ins that one might even assume
  // are actual keywords (despite that not being the case)
  const PSEUDO_KWS = [
    "include",
    "extend",
    "prepend",
    "public",
    "private",
    "protected",
    "raise",
    "throw"
  ];
  const RUBY_KEYWORDS = {
    "variable.constant": [
      "__FILE__",
      "__LINE__",
      "__ENCODING__"
    ],
    "variable.language": [
      "self",
      "super",
    ],
    keyword: [
      "alias",
      "and",
      "begin",
      "BEGIN",
      "break",
      "case",
      "class",
      "defined",
      "do",
      "else",
      "elsif",
      "end",
      "END",
      "ensure",
      "for",
      "if",
      "in",
      "module",
      "next",
      "not",
      "or",
      "redo",
      "require",
      "rescue",
      "retry",
      "return",
      "then",
      "undef",
      "unless",
      "until",
      "when",
      "while",
      "yield",
      ...PSEUDO_KWS
    ],
    built_in: [
      "proc",
      "lambda",
      "attr_accessor",
      "attr_reader",
      "attr_writer",
      "define_method",
      "private_constant",
      "module_function"
    ],
    literal: [
      "true",
      "false",
      "nil"
    ]
  };
  const YARDOCTAG = {
    className: 'doctag',
    begin: '@[A-Za-z]+'
  };
  const IRB_OBJECT = {
    begin: '#<',
    end: '>'
  };
  const COMMENT_MODES = [
    hljs.COMMENT(
      '#',
      '$',
      { contains: [ YARDOCTAG ] }
    ),
    hljs.COMMENT(
      '^=begin',
      '^=end',
      {
        contains: [ YARDOCTAG ],
        relevance: 10
      }
    ),
    hljs.COMMENT('^__END__', hljs.MATCH_NOTHING_RE)
  ];
  const SUBST = {
    className: 'subst',
    begin: /#\{/,
    end: /\}/,
    keywords: RUBY_KEYWORDS
  };
  const STRING = {
    className: 'string',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ],
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /`/,
        end: /`/
      },
      {
        begin: /%[qQwWx]?\(/,
        end: /\)/
      },
      {
        begin: /%[qQwWx]?\[/,
        end: /\]/
      },
      {
        begin: /%[qQwWx]?\{/,
        end: /\}/
      },
      {
        begin: /%[qQwWx]?</,
        end: />/
      },
      {
        begin: /%[qQwWx]?\//,
        end: /\//
      },
      {
        begin: /%[qQwWx]?%/,
        end: /%/
      },
      {
        begin: /%[qQwWx]?-/,
        end: /-/
      },
      {
        begin: /%[qQwWx]?\|/,
        end: /\|/
      },
      // in the following expressions, \B in the beginning suppresses recognition of ?-sequences
      // where ? is the last character of a preceding identifier, as in: `func?4`
      { begin: /\B\?(\\\d{1,3})/ },
      { begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/ },
      { begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/ },
      { begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/ },
      { begin: /\B\?\\(c|C-)[\x20-\x7e]/ },
      { begin: /\B\?\\?\S/ },
      // heredocs
      {
        // this guard makes sure that we have an entire heredoc and not a false
        // positive (auto-detect, etc.)
        begin: regex.concat(
          /<<[-~]?'?/,
          regex.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)
        ),
        contains: [
          hljs.END_SAME_AS_BEGIN({
            begin: /(\w+)/,
            end: /(\w+)/,
            contains: [
              hljs.BACKSLASH_ESCAPE,
              SUBST
            ]
          })
        ]
      }
    ]
  };

  // Ruby syntax is underdocumented, but this grammar seems to be accurate
  // as of version 2.7.2 (confirmed with (irb and `Ripper.sexp(...)`)
  // https://docs.ruby-lang.org/en/2.7.0/doc/syntax/literals_rdoc.html#label-Numbers
  const decimal = '[1-9](_?[0-9])*|0';
  const digits = '[0-9](_?[0-9])*';
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      // decimal integer/float, optionally exponential or rational, optionally imaginary
      { begin: `\\b(${decimal})(\\.(${digits}))?([eE][+-]?(${digits})|r)?i?\\b` },

      // explicit decimal/binary/octal/hexadecimal integer,
      // optionally rational and/or imaginary
      { begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b" },

      // 0-prefixed implicit octal integer, optionally rational and/or imaginary
      { begin: "\\b0(_?[0-7])+r?i?\\b" }
    ]
  };

  const PARAMS = {
    variants: [
      {
        match: /\(\)/,
      },
      {
        className: 'params',
        begin: /\(/,
        end: /(?=\))/,
        excludeBegin: true,
        endsParent: true,
        keywords: RUBY_KEYWORDS,
      }
    ]
  };

  const INCLUDE_EXTEND = {
    match: [
      /(include|extend)\s+/,
      CLASS_NAME_WITH_NAMESPACE_RE
    ],
    scope: {
      2: "title.class"
    },
    keywords: RUBY_KEYWORDS
  };

  const CLASS_DEFINITION = {
    variants: [
      {
        match: [
          /class\s+/,
          CLASS_NAME_WITH_NAMESPACE_RE,
          /\s+<\s+/,
          CLASS_NAME_WITH_NAMESPACE_RE
        ]
      },
      {
        match: [
          /\b(class|module)\s+/,
          CLASS_NAME_WITH_NAMESPACE_RE
        ]
      }
    ],
    scope: {
      2: "title.class",
      4: "title.class.inherited"
    },
    keywords: RUBY_KEYWORDS
  };

  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };

  const METHOD_DEFINITION = {
    match: [
      /def/, /\s+/,
      RUBY_METHOD_RE
    ],
    scope: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };

  const OBJECT_CREATION = {
    relevance: 0,
    match: [
      CLASS_NAME_WITH_NAMESPACE_RE,
      /\.new[. (]/
    ],
    scope: {
      1: "title.class"
    }
  };

  // CamelCase
  const CLASS_REFERENCE = {
    relevance: 0,
    match: CLASS_NAME_RE,
    scope: "title.class"
  };

  const RUBY_DEFAULT_CONTAINS = [
    STRING,
    CLASS_DEFINITION,
    INCLUDE_EXTEND,
    OBJECT_CREATION,
    UPPER_CASE_CONSTANT,
    CLASS_REFERENCE,
    METHOD_DEFINITION,
    {
      // swallow namespace qualifiers before symbols
      begin: hljs.IDENT_RE + '::' },
    {
      className: 'symbol',
      begin: hljs.UNDERSCORE_IDENT_RE + '(!|\\?)?:',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':(?!\\s)',
      contains: [
        STRING,
        { begin: RUBY_METHOD_RE }
      ],
      relevance: 0
    },
    NUMBER,
    {
      // negative-look forward attempts to prevent false matches like:
      // @ident@ or $ident$ that might indicate this is not ruby at all
      className: "variable",
      begin: '(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])' + `(?![A-Za-z])(?![@$?'])`
    },
    {
      className: 'params',
      begin: /\|(?!=)/,
      end: /\|/,
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0, // this could be a lot of things (in other languages) other than params
      keywords: RUBY_KEYWORDS
    },
    { // regexp container
      begin: '(' + hljs.RE_STARTERS_RE + '|unless)\\s*',
      keywords: 'unless',
      contains: [
        {
          className: 'regexp',
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ],
          illegal: /\n/,
          variants: [
            {
              begin: '/',
              end: '/[a-z]*'
            },
            {
              begin: /%r\{/,
              end: /\}[a-z]*/
            },
            {
              begin: '%r\\(',
              end: '\\)[a-z]*'
            },
            {
              begin: '%r!',
              end: '![a-z]*'
            },
            {
              begin: '%r\\[',
              end: '\\][a-z]*'
            }
          ]
        }
      ].concat(IRB_OBJECT, COMMENT_MODES),
      relevance: 0
    }
  ].concat(IRB_OBJECT, COMMENT_MODES);

  SUBST.contains = RUBY_DEFAULT_CONTAINS;
  PARAMS.contains = RUBY_DEFAULT_CONTAINS;

  // >>
  // ?>
  const SIMPLE_PROMPT = "[>?]>";
  // irb(main):001:0>
  const DEFAULT_PROMPT = "[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]";
  const RVM_PROMPT = "(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>";

  const IRB_DEFAULT = [
    {
      begin: /^\s*=>/,
      starts: {
        end: '$',
        contains: RUBY_DEFAULT_CONTAINS
      }
    },
    {
      className: 'meta.prompt',
      begin: '^(' + SIMPLE_PROMPT + "|" + DEFAULT_PROMPT + '|' + RVM_PROMPT + ')(?=[ ])',
      starts: {
        end: '$',
        keywords: RUBY_KEYWORDS,
        contains: RUBY_DEFAULT_CONTAINS
      }
    }
  ];

  COMMENT_MODES.unshift(IRB_OBJECT);

  return {
    name: 'Ruby',
    aliases: [
      'rb',
      'gemspec',
      'podspec',
      'thor',
      'irb'
    ],
    keywords: RUBY_KEYWORDS,
    illegal: /\/\*/,
    contains: [ hljs.SHEBANG({ binary: "ruby" }) ]
      .concat(IRB_DEFAULT)
      .concat(COMMENT_MODES)
      .concat(RUBY_DEFAULT_CONTAINS)
  };
}

/*
 Language: SQL
 Website: https://en.wikipedia.org/wiki/SQL
 Category: common, database
 */

/*

Goals:

SQL is intended to highlight basic/common SQL keywords and expressions

- If pretty much every single SQL server includes supports, then it's a canidate.
- It is NOT intended to include tons of vendor specific keywords (Oracle, MySQL,
  PostgreSQL) although the list of data types is purposely a bit more expansive.
- For more specific SQL grammars please see:
  - PostgreSQL and PL/pgSQL - core
  - T-SQL - https://github.com/highlightjs/highlightjs-tsql
  - sql_more (core)

 */

function sql(hljs) {
  const regex = hljs.regex;
  const COMMENT_MODE = hljs.COMMENT('--', '$');
  const STRING = {
    scope: 'string',
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [ { match: /''/ } ]
      }
    ]
  };
  const QUOTED_IDENTIFIER = {
    begin: /"/,
    end: /"/,
    contains: [ { match: /""/ } ]
  };

  const LITERALS = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ];

  const MULTI_WORD_TYPES = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ];

  const TYPES = [
    'bigint',
    'binary',
    'blob',
    'boolean',
    'char',
    'character',
    'clob',
    'date',
    'dec',
    'decfloat',
    'decimal',
    'float',
    'int',
    'integer',
    'interval',
    'nchar',
    'nclob',
    'national',
    'numeric',
    'real',
    'row',
    'smallint',
    'time',
    'timestamp',
    'varchar',
    'varying', // modifier (character varying)
    'varbinary'
  ];

  const NON_RESERVED_WORDS = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ];

  // https://jakewheat.github.io/sql-overview/sql-2016-foundation-grammar.html#reserved-word
  const RESERVED_WORDS = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year",
  ];

  // these are reserved words we have identified to be functions
  // and should only be highlighted in a dispatch-like context
  // ie, array_agg(...), etc.
  const RESERVED_FUNCTIONS = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket",
  ];

  // these functions can
  const POSSIBLE_WITHOUT_PARENS = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ];

  // those exist to boost relevance making these very
  // "SQL like" keyword combos worth +1 extra relevance
  const COMBOS = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ];

  const FUNCTIONS = RESERVED_FUNCTIONS;

  const KEYWORDS = [
    ...RESERVED_WORDS,
    ...NON_RESERVED_WORDS
  ].filter((keyword) => {
    return !RESERVED_FUNCTIONS.includes(keyword);
  });

  const VARIABLE = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/,
  };

  const OPERATOR = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0,
  };

  const FUNCTION_CALL = {
    match: regex.concat(/\b/, regex.either(...FUNCTIONS), /\s*\(/),
    relevance: 0,
    keywords: { built_in: FUNCTIONS }
  };

  // turns a multi-word keyword combo into a regex that doesn't
  // care about extra whitespace etc.
  // input: "START QUERY"
  // output: /\bSTART\s+QUERY\b/
  function kws_to_regex(list) {
    return regex.concat(
      /\b/,
      regex.either(...list.map((kw) => {
        return kw.replace(/\s+/, "\\s+")
      })),
      /\b/
    )
  }

  const MULTI_WORD_KEYWORDS = {
    scope: "keyword",
    match: kws_to_regex(COMBOS),
    relevance: 0,
  };

  // keywords with less than 3 letters are reduced in relevancy
  function reduceRelevancy(list, {
    exceptions, when
  } = {}) {
    const qualifyFn = when;
    exceptions = exceptions || [];
    return list.map((item) => {
      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
        return item;
      } else if (qualifyFn(item)) {
        return `${item}|0`;
      } else {
        return item;
      }
    });
  }

  return {
    name: 'SQL',
    case_insensitive: true,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword:
        reduceRelevancy(KEYWORDS, { when: (x) => x.length < 3 }),
      literal: LITERALS,
      type: TYPES,
      built_in: POSSIBLE_WITHOUT_PARENS
    },
    contains: [
      {
        scope: "type",
        match: kws_to_regex(MULTI_WORD_TYPES)
      },
      MULTI_WORD_KEYWORDS,
      FUNCTION_CALL,
      VARIABLE,
      STRING,
      QUOTED_IDENTIFIER,
      hljs.C_NUMBER_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE,
      OPERATOR
    ]
  };
}

/*
 Language: GraphQL
 Author: John Foster (GH jf990), and others
 Description: GraphQL is a query language for APIs
 Category: web, common
*/

/** @type LanguageFn */
function graphql(hljs) {
  const regex = hljs.regex;
  const GQL_NAME = /[_A-Za-z][_0-9A-Za-z]*/;
  return {
    name: "GraphQL",
    aliases: [ "gql" ],
    case_insensitive: true,
    disableAutodetect: false,
    keywords: {
      keyword: [
        "query",
        "mutation",
        "subscription",
        "type",
        "input",
        "schema",
        "directive",
        "interface",
        "union",
        "scalar",
        "fragment",
        "enum",
        "on"
      ],
      literal: [
        "true",
        "false",
        "null"
      ]
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      {
        scope: "punctuation",
        match: /[.]{3}/,
        relevance: 0
      },
      {
        scope: "punctuation",
        begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/,
        relevance: 0
      },
      {
        scope: "variable",
        begin: /\$/,
        end: /\W/,
        excludeEnd: true,
        relevance: 0
      },
      {
        scope: "meta",
        match: /@\w+/,
        excludeEnd: true
      },
      {
        scope: "symbol",
        begin: regex.concat(GQL_NAME, regex.lookahead(/\s*:/)),
        relevance: 0
      }
    ],
    illegal: [
      /[;<']/,
      /BEGIN/
    ]
  };
}

// https://docs.oracle.com/javase/specs/jls/se15/html/jls-3.html#jls-3.10
var decimalDigits = '[0-9](_*[0-9])*';
var frac = `\\.(${decimalDigits})`;
var hexDigits = '[0-9a-fA-F](_*[0-9a-fA-F])*';
var NUMERIC = {
  className: 'number',
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${decimalDigits})((${frac})|\\.)?|(${frac}))` +
      `[eE][+-]?(${decimalDigits})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${decimalDigits})((${frac})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${frac})[fFdD]?\\b` },
    { begin: `\\b(${decimalDigits})[fFdD]\\b` },

    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${hexDigits})\\.?|(${hexDigits})?\\.(${hexDigits}))` +
      `[pP][+-]?(${decimalDigits})[fFdD]?\\b` },

    // DecimalIntegerLiteral
    { begin: '\\b(0|[1-9](_*[0-9])*)[lL]?\\b' },

    // HexIntegerLiteral
    { begin: `\\b0[xX](${hexDigits})[lL]?\\b` },

    // OctalIntegerLiteral
    { begin: '\\b0(_*[0-7])*[lL]?\\b' },

    // BinaryIntegerLiteral
    { begin: '\\b0[bB][01](_*[01])*[lL]?\\b' },
  ],
  relevance: 0
};

/*
 Language: Kotlin
 Description: Kotlin is an OSS statically typed programming language that targets the JVM, Android, JavaScript and Native.
 Author: Sergey Mashkov <cy6erGn0m@gmail.com>
 Website: https://kotlinlang.org
 Category: common
 */


function kotlin(hljs) {
  const KEYWORDS = {
    keyword:
      'abstract as val var vararg get set class object open private protected public noinline '
      + 'crossinline dynamic final enum if else do while for when throw try catch finally '
      + 'import package is in fun override companion reified inline lateinit init '
      + 'interface annotation data sealed internal infix operator out by constructor super '
      + 'tailrec where const inner suspend typealias external expect actual',
    built_in:
      'Byte Short Char Int Long Boolean Float Double Void Unit Nothing',
    literal:
      'true false null'
  };
  const KEYWORDS_WITH_LABEL = {
    className: 'keyword',
    begin: /\b(break|continue|return|this)\b/,
    starts: { contains: [
      {
        className: 'symbol',
        begin: /@\w+/
      }
    ] }
  };
  const LABEL = {
    className: 'symbol',
    begin: hljs.UNDERSCORE_IDENT_RE + '@'
  };

  // for string templates
  const SUBST = {
    className: 'subst',
    begin: /\$\{/,
    end: /\}/,
    contains: [ hljs.C_NUMBER_MODE ]
  };
  const VARIABLE = {
    className: 'variable',
    begin: '\\$' + hljs.UNDERSCORE_IDENT_RE
  };
  const STRING = {
    className: 'string',
    variants: [
      {
        begin: '"""',
        end: '"""(?=[^"])',
        contains: [
          VARIABLE,
          SUBST
        ]
      },
      // Can't use built-in modes easily, as we want to use STRING in the meta
      // context as 'meta-string' and there's no syntax to remove explicitly set
      // classNames in built-in modes.
      {
        begin: '\'',
        end: '\'',
        illegal: /\n/,
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '"',
        end: '"',
        illegal: /\n/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          VARIABLE,
          SUBST
        ]
      }
    ]
  };
  SUBST.contains.push(STRING);

  const ANNOTATION_USE_SITE = {
    className: 'meta',
    begin: '@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*' + hljs.UNDERSCORE_IDENT_RE + ')?'
  };
  const ANNOTATION = {
    className: 'meta',
    begin: '@' + hljs.UNDERSCORE_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          hljs.inherit(STRING, { className: 'string' }),
          "self"
        ]
      }
    ]
  };

  // https://kotlinlang.org/docs/reference/whatsnew11.html#underscores-in-numeric-literals
  // According to the doc above, the number mode of kotlin is the same as java 8,
  // so the code below is copied from java.js
  const KOTLIN_NUMBER_MODE = NUMERIC;
  const KOTLIN_NESTED_COMMENT = hljs.COMMENT(
    '/\\*', '\\*/',
    { contains: [ hljs.C_BLOCK_COMMENT_MODE ] }
  );
  const KOTLIN_PAREN_TYPE = { variants: [
    {
      className: 'type',
      begin: hljs.UNDERSCORE_IDENT_RE
    },
    {
      begin: /\(/,
      end: /\)/,
      contains: [] // defined later
    }
  ] };
  const KOTLIN_PAREN_TYPE2 = KOTLIN_PAREN_TYPE;
  KOTLIN_PAREN_TYPE2.variants[1].contains = [ KOTLIN_PAREN_TYPE ];
  KOTLIN_PAREN_TYPE.variants[1].contains = [ KOTLIN_PAREN_TYPE2 ];

  return {
    name: 'Kotlin',
    aliases: [
      'kt',
      'kts'
    ],
    keywords: KEYWORDS,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance: 0,
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      KOTLIN_NESTED_COMMENT,
      KEYWORDS_WITH_LABEL,
      LABEL,
      ANNOTATION_USE_SITE,
      ANNOTATION,
      {
        className: 'function',
        beginKeywords: 'fun',
        end: '[(]|$',
        returnBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        relevance: 5,
        contains: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
            returnBegin: true,
            relevance: 0,
            contains: [ hljs.UNDERSCORE_TITLE_MODE ]
          },
          {
            className: 'type',
            begin: /</,
            end: />/,
            keywords: 'reified',
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              {
                begin: /:/,
                end: /[=,\/]/,
                endsWithParent: true,
                contains: [
                  KOTLIN_PAREN_TYPE,
                  hljs.C_LINE_COMMENT_MODE,
                  KOTLIN_NESTED_COMMENT
                ],
                relevance: 0
              },
              hljs.C_LINE_COMMENT_MODE,
              KOTLIN_NESTED_COMMENT,
              ANNOTATION_USE_SITE,
              ANNOTATION,
              STRING,
              hljs.C_NUMBER_MODE
            ]
          },
          KOTLIN_NESTED_COMMENT
        ]
      },
      {
        begin: [
          /class|interface|trait/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE
        ],
        beginScope: {
          3: "title.class"
        },
        keywords: 'class interface trait',
        end: /[:\{(]|$/,
        excludeEnd: true,
        illegal: 'extends implements',
        contains: [
          { beginKeywords: 'public protected internal private constructor' },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'type',
            begin: /</,
            end: />/,
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          },
          {
            className: 'type',
            begin: /[,:]\s*/,
            end: /[<\(,){\s]|$/,
            excludeBegin: true,
            returnEnd: true
          },
          ANNOTATION_USE_SITE,
          ANNOTATION
        ]
      },
      STRING,
      {
        className: 'meta',
        begin: "^#!/usr/bin/env",
        end: '$',
        illegal: '\n'
      },
      KOTLIN_NUMBER_MODE
    ]
  };
}

var r=defineComponent({props:{code:{type:String,required:true},language:{type:String,default:""},autodetect:{type:Boolean,default:true},ignoreIllegals:{type:Boolean,default:true}},setup:function(e){var n=ref(e.language);watch((function(){return e.language}),(function(e){n.value=e;}));var r=computed((function(){return e.autodetect||!n.value})),o=computed((function(){return !r.value&&!HighlightJS.getLanguage(n.value)}));return {className:computed((function(){return o.value?"":"hljs "+n.value})),highlightedCode:computed((function(){var l;if(o.value)return console.warn('The language "'+n.value+'" you specified could not be found.'),e.code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");if(r.value){var a=HighlightJS.highlightAuto(e.code);return n.value=null!==(l=a.language)&&void 0!==l?l:"",a.value}return (a=HighlightJS.highlight(e.code,{language:n.value,ignoreIllegals:e.ignoreIllegals})).value}))}},render:function(){return h("pre",{},[h("code",{class:this.className,innerHTML:this.highlightedCode})])}}),o={component:r};

const toPascalCase = (str) => {
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (_, c) => c.toUpperCase());
};
class BaseGenerator {
  constructor(options) {
    this.options = options;
    this.usedGeometryTypes = /* @__PURE__ */ new Set();
  }
  static getOptions() {
    return [];
  }
  reset() {
    this.usedGeometryTypes.clear();
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    return "";
  }
  getPrefix(_allCollectionNames) {
    return "";
  }
  getMappedType(type) {
    return this.getTypeMap()[type] || null;
  }
  toPascalCase(str) {
    return toPascalCase(str);
  }
}

class TypeScriptGenerator extends BaseGenerator {
  static getOptions() {
    return [
      { text: "Interface", value: "interface" },
      { text: "Type", value: "type" }
    ];
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = "";
    if (this.options.tsTypeStyle === "interface") {
      code += `export interface ${collectionName} {
`;
    } else {
      code += `export type ${collectionName} = {
`;
    }
    fields.forEach((row) => {
      let tsType = this.getMappedType(row.type) || "any";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      if (row.relatedCollection) {
        tsType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          tsType += "[]";
        }
      }
      code += `  ${row.field}${row.required ? "" : "?"}: ${tsType};
`;
    });
    code += this.options.tsTypeStyle === "interface" ? `}

` : `};

`;
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `export type Point = { type: 'Point'; coordinates: [number, number] };
`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `export type LineString = { type: 'LineString'; coordinates: [number, number][] };
`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `export type Polygon = { type: 'Polygon'; coordinates: [number, number][][] };
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `export type MultiPoint = { type: 'MultiPoint'; coordinates: [number, number][] };
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `export type MultiLineString = { type: 'MultiLineString'; coordinates: [number, number][][] };
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `export type MultiPolygon = { type: 'MultiPolygon'; coordinates: [number, number][][][] };
`;
    }
    if (this.usedGeometryTypes.has("geometry")) {
      code += `export type Geometry = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;
`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "number",
      "boolean": "boolean",
      "date": "string",
      "dateTime": "string",
      "decimal": "number",
      "float": "number",
      "integer": "number",
      "json": "any",
      "string": "string",
      "text": "string",
      "time": "string",
      "timestamp": "string",
      "binary": "string",
      "uuid": "string",
      "alias": "any",
      "hash": "string",
      "csv": "string[]",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "any"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set();
  }
}

class RustGenerator extends BaseGenerator {
  static getOptions() {
    return [
      { text: "Serde", value: "serde" },
      { text: "Native", value: "native" }
    ];
  }
  getPrefix(_allCollectionNames) {
    let prefix = "// Minimum supported Rust version: 1.0+\n";
    if (this.options.languageVersion === "serde") {
      prefix += " #![warn(clippy::pedantic)]\nuse serde::{Serialize, Deserialize, Value};\n\n";
    }
    return prefix;
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = "";
    if (this.options.languageVersion === "serde") {
      code = `#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ${collectionName} {
`;
    } else {
      code = `pub struct ${collectionName} {
`;
    }
    fields.forEach((row) => {
      let rustType = this.getMappedType(row.type) || "String";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      if (row.relatedCollection) {
        rustType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          rustType = `Vec<${rustType}>`;
        } else {
          rustType = `Box<${rustType}>`;
        }
      }
      let fieldName = row.field;
      if (this.getReservedKeywords().has(fieldName)) {
        let originalFieldname = fieldName;
        fieldName = `r#${fieldName}`;
        if (this.options.languageVersion === "serde") {
          code += `  #[serde(rename = "${originalFieldname}")]
`;
        }
      }
      if (!row.required && !rustType.startsWith("Vec<")) {
        code += `  pub ${fieldName}: Option<${rustType}>,
`;
      } else {
        code += `  pub ${fieldName}: ${rustType},
`;
      }
    });
    code += `}

`;
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    const serdeIncludes = this.options.languageVersion === "serde" ? "#[derive(Debug, Clone, Serialize, Deserialize)]\n" : "";
    let code = "// Geometry types\n";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `${serdeIncludes}pub struct Point {
 pub r#type: String,
 pub coordinates: [f64; 2] 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `${serdeIncludes}pub struct LineString {
 pub r#type: String,
 pub coordinates: Vec<[f64; 2]> 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `${serdeIncludes}pub struct Polygon {
 pub r#type: String,
 pub coordinates: Vec<Vec<[f64; 2]>> 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `${serdeIncludes}pub struct MultiPoint {
 pub r#type: String,
 pub coordinates: Vec<[f64; 2]> 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `${serdeIncludes}pub struct MultiLineString {
 pub r#type: String,
 pub coordinates: Vec<Vec<[f64; 2]>> 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `${serdeIncludes}pub struct MultiPolygon {
 pub r#type: String,
 pub coordinates: Vec<Vec<Vec<[f64; 2]>>> 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry")) {
      code += `${serdeIncludes}pub enum Geometry {
 Point(Point), 
LineString(LineString), 
Polygon(Polygon),
 MultiPoint(MultiPoint),
 MultiLineString(MultiLineString),
 MultiPolygon(MultiPolygon) 
}
`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "i64",
      "boolean": "bool",
      "date": "String",
      "dateTime": "String",
      "decimal": "f64",
      "float": "f32",
      "integer": "i32",
      "json": this.options.languageVersion === "serde" ? "Value" : "String",
      "string": "String",
      "text": "String",
      "time": "String",
      "timestamp": "String",
      "binary": "Vec<u8>",
      "uuid": "String",
      "alias": "String",
      "hash": "String",
      "csv": "Vec<String>",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "String"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set([
      "as",
      "break",
      "const",
      "continue",
      "crate",
      "else",
      "enum",
      "extern",
      "false",
      "fn",
      "for",
      "if",
      "impl",
      "in",
      "let",
      "loop",
      "match",
      "mod",
      "move",
      "mut",
      "pub",
      "ref",
      "return",
      "self",
      "Self",
      "static",
      "struct",
      "super",
      "trait",
      "true",
      "type",
      "unsafe",
      "use",
      "where",
      "while",
      "async",
      "await",
      "dyn",
      "abstract",
      "become",
      "box",
      "do",
      "final",
      "macro",
      "override",
      "priv",
      "typeof",
      "unsized",
      "virtual",
      "yield",
      "try",
      "as",
      "break",
      "const",
      "continue",
      "crate",
      "else",
      "enum",
      "extern",
      "false",
      "fn",
      "for",
      "if",
      "impl",
      "in",
      "let",
      "loop",
      "match",
      "mod",
      "move",
      "mut",
      "pub",
      "ref",
      "return",
      "self",
      "Self",
      "static",
      "struct",
      "super",
      "trait",
      "true",
      "type",
      "unsafe",
      "use",
      "where",
      "while",
      "async",
      "await",
      "dyn"
    ]);
  }
}

class PHPGenerator extends BaseGenerator {
  static getOptions() {
    return [
      { text: "PHP 8.2+", value: "8.2" },
      { text: "PHP 8.1+", value: "8.1" },
      { text: "PHP 8.0+", value: "8.0" },
      { text: "PHP 7.4+", value: "7.4" },
      { text: "PHP 5.6+", value: "5.6" }
    ];
  }
  getPrefix(_allCollectionNames) {
    let prefix = "<?php\n\n";
    if (this.options.languageVersion) {
      prefix += `// Minimum supported PHP version: ${this.options.languageVersion}

`;
    }
    return prefix;
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = `class ${collectionName}
{
`;
    fields.forEach((row) => {
      let phpType = this.getMappedType(row.type) || "mixed";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      if (row.relatedCollection) {
        phpType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          phpType = "array";
        }
      }
      let fieldName = row.field;
      if (this.getReservedKeywords().has(fieldName)) {
        fieldName = `custom_${fieldName}`;
      }
      const phpVersion = this.options.languageVersion ? parseFloat(this.options.languageVersion) : 8.2;
      const isReadonly = phpVersion >= 8.1;
      const hasPropertyTypeHints = phpVersion >= 7.4;
      if (phpType === "mixed") {
        if (phpVersion >= 8) {
          code += `    public ${isReadonly ? "readonly " : ""}mixed $${fieldName};
`;
        } else {
          code += `    public $${fieldName};
`;
        }
      } else if (!hasPropertyTypeHints) {
        code += `    public $${fieldName};
`;
      } else {
        code += `    public ${isReadonly ? "readonly " : ""}${row.required ? "" : "?"}${phpType} $${fieldName};
`;
      }
    });
    code += `}

`;
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "// Geometry types\n";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `class Point {
    public string $type = 'Point';
    public array $coordinates; 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `class LineString {
    public string $type = 'LineString';
    public array $coordinates; 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `class Polygon {
    public string $type = 'Polygon';
    public array $coordinates; 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `class MultiPoint {
    public string $type = 'MultiPoint';
    public array $coordinates; 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `class MultiLineString {
    public string $type = 'MultiLineString';
    public array $coordinates; 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `class MultiPolygon {
    public string $type = 'MultiPolygon';
    public array $coordinates; 
}

`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "int",
      "boolean": "bool",
      "date": "string",
      "dateTime": "string",
      "decimal": "float",
      "float": "float",
      "integer": "int",
      "json": "array",
      "string": "string",
      "text": "string",
      "time": "string",
      "timestamp": "string",
      "binary": "string",
      "uuid": "string",
      "alias": "mixed",
      "hash": "string",
      "csv": "array",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "mixed"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set([
      "__halt_compiler",
      "abstract",
      "and",
      "array",
      "as",
      "break",
      "callable",
      "case",
      "catch",
      "class",
      "clone",
      "const",
      "continue",
      "declare",
      "default",
      "die",
      "do",
      "echo",
      "else",
      "elseif",
      "empty",
      "enddeclare",
      "endfor",
      "endforeach",
      "endif",
      "endswitch",
      "endwhile",
      "eval",
      "exit",
      "extends",
      "final",
      "finally",
      "for",
      "foreach",
      "function",
      "global",
      "goto",
      "if",
      "implements",
      "include",
      "include_once",
      "instanceof",
      "insteadof",
      "interface",
      "isset",
      "list",
      "namespace",
      "new",
      "or",
      "print",
      "private",
      "protected",
      "public",
      "require",
      "require_once",
      "return",
      "static",
      "switch",
      "throw",
      "trait",
      "try",
      "unset",
      "use",
      "var",
      "while",
      "xor",
      "yield"
    ]);
  }
}

class CSharpGenerator extends BaseGenerator {
  getPrefix(_allCollectionNames) {
    let prefix = "// Minimum supported C# version: 8.0+\n";
    prefix += "using System.Collections.Generic;\n\n";
    return prefix;
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = `public class ${collectionName}
{
`;
    fields.forEach((row) => {
      let csharpType = this.getMappedType(row.type) || "object";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      if (row.relatedCollection) {
        csharpType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          csharpType = `List<${csharpType}>`;
        }
      }
      let fieldName = this.toPascalCase(row.field);
      const reserved = this.getReservedKeywords();
      if (reserved.has(row.field) || reserved.has(fieldName.toLowerCase())) {
        fieldName = `@${fieldName}`;
      }
      const isNullable = !row.required && ["int", "long", "decimal", "double", "float", "bool", "Guid", "DateTime", "TimeSpan"].includes(csharpType);
      code += `    public ${csharpType}${isNullable ? "?" : ""} ${fieldName} { get; set; }
`;
    });
    code += `}

`;
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "// Geometry types\n";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `public class Point {
    public string Type { get; set; } = "Point";
    public double[] Coordinates { get; set; } 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `public class LineString {
    public string Type { get; set; } = "LineString";
    public double[][] Coordinates { get; set; } 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `public class Polygon {
    public string Type { get; set; } = "Polygon";
    public double[][][] Coordinates { get; set; } 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `public class MultiPoint {
    public string Type { get; set; } = "MultiPoint";
    public double[][] Coordinates { get; set; } 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `public class MultiLineString {
    public string Type { get; set; } = "MultiLineString";
    public double[][][] Coordinates { get; set; } 
}

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `public class MultiPolygon {
    public string Type { get; set; } = "MultiPolygon";
    public double[][][][] Coordinates { get; set; } 
}

`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "long",
      "boolean": "bool",
      "date": "string",
      "dateTime": "string",
      "decimal": "decimal",
      "float": "float",
      "integer": "int",
      "json": "string",
      "string": "string",
      "text": "string",
      "time": "string",
      "timestamp": "string",
      "binary": "byte[]",
      "uuid": "string",
      "alias": "object",
      "hash": "string",
      "csv": "string[]",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "object"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set([
      "abstract",
      "as",
      "base",
      "bool",
      "break",
      "byte",
      "case",
      "catch",
      "char",
      "checked",
      "class",
      "const",
      "continue",
      "decimal",
      "default",
      "delegate",
      "do",
      "double",
      "else",
      "enum",
      "event",
      "explicit",
      "extern",
      "false",
      "finally",
      "fixed",
      "float",
      "for",
      "foreach",
      "goto",
      "if",
      "implicit",
      "in",
      "int",
      "interface",
      "internal",
      "is",
      "lock",
      "long",
      "namespace",
      "new",
      "null",
      "object",
      "operator",
      "out",
      "override",
      "params",
      "private",
      "protected",
      "public",
      "readonly",
      "ref",
      "return",
      "sbyte",
      "sealed",
      "short",
      "sizeof",
      "stackalloc",
      "static",
      "string",
      "struct",
      "switch",
      "this",
      "throw",
      "true",
      "try",
      "typeof",
      "uint",
      "ulong",
      "unchecked",
      "unsafe",
      "ushort",
      "using",
      "virtual",
      "void",
      "volatile",
      "while"
    ]);
  }
}

class JavaGenerator extends BaseGenerator {
  static getOptions() {
    return [
      { text: "Java 14+", value: "14" },
      { text: "Java 8+", value: "8" },
      { text: "Java 8+ (Lombok)", value: "8_lombok" }
    ];
  }
  getPrefix(_allCollectionNames) {
    let prefix = `// Minimum supported Java version: ${this.options.languageVersion}`;
    if (this.options.languageVersion === "14") {
      prefix += "\n// Assumes --enable-preview";
    }
    prefix += "\nimport java.util.List;\n\n";
    return prefix;
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = "";
    if (this.options.languageVersion === "8_lombok" || this.options.languageVersion === "8") {
      code = `public class ${collectionName} {
`;
      const fieldDeclarations = [];
      const accessors = [];
      fields.forEach((row) => {
        let javaType = this.getMappedType(row.type) || "Object";
        if (row.type.startsWith("geometry")) {
          this.usedGeometryTypes.add(row.type);
        }
        if (row.relatedCollection) {
          javaType = this.toPascalCase(row.relatedCollection);
          if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
            javaType = `List<${javaType}>`;
          }
        }
        let fieldName = row.field;
        if (this.getReservedKeywords().has(fieldName)) {
          fieldName = `custom_${fieldName}`;
        }
        if (this.options.languageVersion === "8_lombok") {
          fieldDeclarations.push(`    @Getter @Setter private ${javaType} ${fieldName};`);
        } else if (this.options.languageVersion === "8") {
          fieldDeclarations.push(`    private ${javaType} ${fieldName};`);
          accessors.push(`    /**
     * Getter for the field '${fieldName}'.
     * @return value of the field '${fieldName}'.
     */`);
          accessors.push(`    public ${javaType} get${this.toPascalCase(fieldName)}() { return ${fieldName}; }`);
          accessors.push(``);
          accessors.push(`    /**
     * Setter for the field '${fieldName}'.
     * @param ${fieldName} - new value of the field '${fieldName}'.
     */`);
          accessors.push(`    public void set${this.toPascalCase(fieldName)}(${javaType} ${fieldName}) { this.${fieldName} = ${fieldName}; }`);
          accessors.push(``);
        }
      });
      code += fieldDeclarations.join("\n") + "\n";
      if (accessors.length > 0) {
        code += "\n" + accessors.join("\n");
      }
      code += `}

`;
    } else {
      const components = [];
      fields.forEach((row) => {
        let javaType = this.getMappedType(row.type) || "Object";
        if (row.type.startsWith("geometry")) {
          this.usedGeometryTypes.add(row.type);
        }
        if (row.relatedCollection) {
          javaType = this.toPascalCase(row.relatedCollection);
          if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
            javaType = `List<${javaType}>`;
          }
        }
        let fieldName = row.field;
        if (this.getReservedKeywords().has(fieldName)) {
          fieldName = `custom_${fieldName}`;
        }
        components.push(`${javaType} ${fieldName}`);
      });
      code = `public record ${collectionName}(
    ${components.join(",\n    ")}
) {}

`;
    }
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "";
    if (this.options.languageVersion === "8_lombok") {
      if (this.usedGeometryTypes.has("geometry.Point")) {
        code += `@Getter @Setter
public class Point {
    private String type = "Point";
    private double[] coordinates; 
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.LineString")) {
        code += `@Getter @Setter
public class LineString {
    private String type = "LineString";
    private double[][] coordinates; 
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.Polygon")) {
        code += `@Getter @Setter
public class Polygon {
    private String type = "Polygon";
    private double[][][] coordinates; 
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
        code += `@Getter @Setter
public class MultiPoint {
    private String type = "MultiPoint";
    private double[][] coordinates; 
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
        code += `@Getter @Setter
public class MultiLineString {
    private String type = "MultiLineString";
    private double[][][] coordinates; 
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
        code += `@Getter @Setter
public class MultiPolygon {
    private String type = "MultiPolygon";
    private double[][][][] coordinates; 
}

`;
      }
    } else if (this.options.languageVersion === "14" || this.options.languageVersion === "17" || this.options.languageVersion === "21") {
      if (this.usedGeometryTypes.has("geometry.Point")) {
        code += `public record Point(double[] coordinates) {
    public String type() {
        return "Point";
    }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.LineString")) {
        code += `public record LineString(double[][] coordinates) {
    public String type() {
        return "LineString";
    }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.Polygon")) {
        code += `public record Polygon(double[][][] coordinates) {
    public String type() {
        return "Polygon";
    }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
        code += `public record MultiPoint(double[][] coordinates) {
    public String type() {
        return "MultiPoint";
    }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
        code += `public record MultiLineString(double[][][] coordinates) {
    public String type() {
        return "MultiLineString";
    }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
        code += `public record MultiPolygon(double[][][][] coordinates) {
    public String type() {
        return "MultiPolygon";
    }
}

`;
      }
    } else {
      if (this.usedGeometryTypes.has("geometry.Point")) {
        code += `public class Point {
    private String type = "Point";
    private double[] coordinates;

    public String getType() { return type; }
    public double[] getCoordinates() { return coordinates; }

    public void setType(String type) { this.type = type; }
    public void setCoordinates(double[] coordinates) { this.coordinates = coordinates; }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.LineString")) {
        code += `public class LineString {
    private String type = "LineString";
    private double[][] coordinates;

    public String getType() { return type; }
    public double[][] getCoordinates() { return coordinates; }

    public void setType(String type) { this.type = type; }
    public void setCoordinates(double[][] coordinates) { this.coordinates = coordinates; }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.Polygon")) {
        code += `public class Polygon {
    private String type = "Polygon";
    private double[][][] coordinates;

    public String getType() { return type; }
    public double[][][] getCoordinates() { return coordinates; }

    public void setType(String type) { this.type = type; }
    public void setCoordinates(double[][][] coordinates) { this.coordinates = coordinates; }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
        code += `public class MultiPoint {
    private String type = "MultiPoint";
    private double[][] coordinates;

    public String getType() { return type; }
    public double[][] getCoordinates() { return coordinates; }

    public void setType(String type) { this.type = type; }
    public void setCoordinates(double[][] coordinates) { this.coordinates = coordinates; }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
        code += `public class MultiLineString {
    private String type = "MultiLineString";
    private double[][][] coordinates;

    public String getType() { return type; }
    public double[][][] getCoordinates() { return coordinates; }

    public void setType(String type) { this.type = type; }
    public void setCoordinates(double[][][] coordinates) { this.coordinates = coordinates; }
}

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
        code += `public class MultiPolygon {
    private String type = "MultiPolygon";
    private double[][][][] coordinates;

    public String getType() { return type; }
    public double[][][][] getCoordinates() { return coordinates; }

    public void setType(String type) { this.type = type; }
    public void setCoordinates(double[][][][] coordinates) { this.coordinates = coordinates; }
}

`;
      }
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "Long",
      "boolean": "Boolean",
      "date": "String",
      "dateTime": "String",
      "decimal": "Double",
      "float": "Float",
      "integer": "Integer",
      "json": "String",
      "string": "String",
      "text": "String",
      "time": "String",
      "timestamp": "String",
      "binary": "byte[]",
      "uuid": "String",
      "alias": "Object",
      "hash": "String",
      "csv": "List<String>",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "Object"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set([
      "abstract",
      "assert",
      "boolean",
      "break",
      "byte",
      "case",
      "catch",
      "char",
      "class",
      "const",
      "continue",
      "default",
      "do",
      "double",
      "else",
      "enum",
      "extends",
      "final",
      "finally",
      "float",
      "for",
      "goto",
      "if",
      "implements",
      "import",
      "instanceof",
      "int",
      "interface",
      "long",
      "native",
      "new",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "short",
      "static",
      "strictfp",
      "super",
      "switch",
      "synchronized",
      "this",
      "throw",
      "throws",
      "transient",
      "try",
      "void",
      "volatile",
      "while"
    ]);
  }
}

class PythonGenerator extends BaseGenerator {
  static getOptions() {
    return [
      { text: "Python 3.10+", value: "3.10" },
      { text: "Python 3.9+", value: "3.9" },
      { text: "Python 3.6+", value: "3.6" }
    ];
  }
  getPrefix(_allCollectionNames) {
    let prefix = "";
    if (this.options.languageVersion) {
      prefix += `# Minimum supported Python version: ${this.options.languageVersion}+
`;
    } else {
      prefix += "# Minimum supported Python version: 3.10+\n";
    }
    if (this.options.languageVersion === "3.6") {
      prefix += "from typing import Any, List, Optional, Union, Tuple\n\n";
    } else if (this.options.languageVersion === "3.9") {
      prefix += "from __future__ import annotations\n";
      prefix += "from typing import Any, Optional, Tuple, Literal, TypedDict\n\n";
    } else {
      prefix += "from typing import Any, Literal, TypedDict\n\n";
    }
    return prefix;
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = "";
    if (this.options.languageVersion === "3.6") {
      code = `class ${collectionName}:
`;
    } else {
      code = `class ${collectionName}(TypedDict, total=False):
`;
    }
    fields.forEach((row) => {
      let pythonType = this.getMappedType(row.type) || "Any";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      if (row.relatedCollection) {
        pythonType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          if (this.options.languageVersion === "3.9" || this.options.languageVersion === "3.10") {
            pythonType = `list['${pythonType}']`;
          } else {
            pythonType = `List['${pythonType}']`;
          }
        } else {
          pythonType = `'${pythonType}'`;
        }
      } else if (row.type === "csv") {
        if (this.options.languageVersion === "3.9" || this.options.languageVersion === "3.10") {
          pythonType = "list[str]";
        } else {
          pythonType = "List[str]";
        }
      } else if (row.type === "json") {
        pythonType = "Any";
      }
      let fieldName = row.field;
      if (this.options.languageVersion === "3.6") {
        if (this.getReservedKeywords().has(fieldName)) {
          fieldName = `${fieldName}_`;
        }
      }
      if (!row.required) {
        if (this.options.languageVersion === "3.10") {
          if (row.type.startsWith("geometry")) {
            code += `    ${fieldName}: '${pythonType}' | None
`;
          } else {
            code += `    ${fieldName}: ${pythonType} | None
`;
          }
        } else {
          if (row.type.startsWith("geometry")) {
            code += `    ${fieldName}: Optional['${pythonType}']
`;
          } else {
            if (pythonType === "Any") {
              code += `    ${fieldName}: ${pythonType}
`;
            } else {
              code += `    ${fieldName}: Optional[${pythonType}]
`;
            }
          }
        }
      } else {
        code += `    ${fieldName}: ${pythonType}
`;
      }
    });
    code += "\n";
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "# Geometry types\n";
    if (this.options.languageVersion === "3.6") {
      if (this.usedGeometryTypes.has("geometry.Point")) {
        code += `class Point:
    type: str
    coordinates: Tuple[float, float]

`;
      }
      if (this.usedGeometryTypes.has("geometry.LineString")) {
        code += `class LineString:
    type: str
    coordinates: List[Tuple[float, float]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.Polygon")) {
        code += `class Polygon:
     type: str
     coordinates: List[List[Tuple[float, float]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
        code += `class MultiPoint:
     type: str
    coordinates:
     List[Tuple[float, float]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
        code += `class MultiLineString:
     type: str
     coordinates: List[List[Tuple[float, float]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
        code += `class MultiPolygon:
     type: str
     coordinates: List[List[List[Tuple[float, float]]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry")) {
        code += `Geometry = Union[Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon]

`;
      }
    } else if (this.options.languageVersion === "3.9") {
      if (this.usedGeometryTypes.has("geometry.Point")) {
        code += `class Point(TypedDict, total=False):
    type: Literal['Point']
    coordinates: Tuple[float, float]

`;
      }
      if (this.usedGeometryTypes.has("geometry.LineString")) {
        code += `class LineString(TypedDict, total=False):
    type: Literal['LineString']
    coordinates: List[Tuple[float, float]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.Polygon")) {
        code += `class Polygon(TypedDict, total=False):
    type: Literal['Polygon']
    coordinates: List[List[Tuple[float, float]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
        code += `class MultiPoint(TypedDict, total=False):
    type: Literal['MultiPoint']
    coordinates: List[Tuple[float, float]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
        code += `class MultiLineString(TypedDict, total=False):
    type: Literal['MultiLineString']
    coordinates: List[List[Tuple[float, float]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
        code += `class MultiPolygon(TypedDict, total=False):
    type: Literal['MultiPolygon']
    coordinates: List[List[List[Tuple[float, float]]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry")) {
        code += `Geometry = Union[Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon]

`;
      }
    } else {
      if (this.usedGeometryTypes.has("geometry.Point")) {
        code += `class Point(TypedDict, total=False):
    type: Literal['Point']
    coordinates: tuple[float, float]

`;
      }
      if (this.usedGeometryTypes.has("geometry.LineString")) {
        code += `class LineString(TypedDict, total=False):
    type: Literal['LineString']
    coordinates: list[tuple[float, float]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.Polygon")) {
        code += `class Polygon(TypedDict, total=False):
    type: Literal['Polygon']
    coordinates: list[list[tuple[float, float]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
        code += `class MultiPoint(TypedDict, total=False):
    type: Literal['MultiPoint']
    coordinates: list[tuple[float, float]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
        code += `class MultiLineString(TypedDict, total=False):
    type: Literal['MultiLineString']
    coordinates: list[list[tuple[float, float]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
        code += `class MultiPolygon(TypedDict, total=False):
    type: Literal['MultiPolygon']
    coordinates: list[list[list[tuple[float, float]]]]

`;
      }
      if (this.usedGeometryTypes.has("geometry")) {
        code += `Geometry = Union[Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon]

`;
      }
    }
    return code;
  }
  getTypeMap() {
    if (this.options.languageVersion === "3.9" || this.options.languageVersion === "3.10") {
      return {
        "bigInteger": "int",
        "boolean": "bool",
        "date": "str",
        "dateTime": "str",
        "decimal": "float",
        "float": "float",
        "integer": "int",
        "json": "dict",
        "string": "str",
        "text": "str",
        "time": "str",
        "timestamp": "str",
        "binary": "bytes",
        "uuid": "str",
        "alias": "Any",
        "hash": "str",
        "csv": "list[str]",
        "geometry": "Geometry",
        "geometry.Point": "Point",
        "geometry.LineString": "LineString",
        "geometry.Polygon": "Polygon",
        "geometry.MultiPoint": "MultiPoint",
        "geometry.MultiLineString": "MultiLineString",
        "geometry.MultiPolygon": "MultiPolygon",
        "unknown": "Any"
      };
    }
    return {
      "bigInteger": "int",
      "boolean": "bool",
      "date": "str",
      "dateTime": "str",
      "decimal": "float",
      "float": "float",
      "integer": "int",
      "json": "dict",
      "string": "str",
      "text": "str",
      "time": "str",
      "timestamp": "str",
      "binary": "bytes",
      "uuid": "str",
      "alias": "Any",
      "hash": "str",
      "csv": "List[str]",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "Any"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set([
      "False",
      "None",
      "True",
      "and",
      "as",
      "assert",
      "async",
      "await",
      "break",
      "class",
      "continue",
      "def",
      "del",
      "elif",
      "else",
      "except",
      "finally",
      "for",
      "from",
      "global",
      "if",
      "import",
      "in",
      "is",
      "lambda",
      "nonlocal",
      "not",
      "or",
      "pass",
      "raise",
      "return",
      "try",
      "while",
      "with",
      "yield",
      "id",
      "float",
      "int",
      "str",
      "bool"
    ]);
  }
}

class GoGenerator extends BaseGenerator {
  getPrefix(_allCollectionNames) {
    return "// Minimum supported Go version: 1.18+\n\n";
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = `type ${collectionName} struct {
`;
    fields.forEach((row) => {
      let goType = this.getMappedType(row.type) || "interface{}";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      if (row.relatedCollection) {
        goType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          goType = `[]${goType}`;
        }
      }
      let fieldName = this.toPascalCase(row.field);
      const reserved = this.getReservedKeywords();
      if (reserved.has(row.field) || reserved.has(fieldName)) {
        fieldName = `Custom${fieldName}`;
      }
      if (!row.required && !goType.startsWith("[]") && !goType.startsWith("map") && !goType.startsWith("interface")) {
        code += `  ${fieldName} *${goType} \`json:"${row.field}"\`
`;
      } else {
        code += `  ${fieldName} ${goType} \`json:"${row.field}"\`
`;
      }
    });
    code += `}

`;
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "// Geometry types\n";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `type Point struct { Type string \`json:"type"\`; Coordinates [2]float64 \`json:"coordinates"\` }
`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `type LineString struct { Type string \`json:"type"\`; Coordinates [][2]float64 \`json:"coordinates"\` }
`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `type Polygon struct { Type string \`json:"type"\`; Coordinates [][][2]float64 \`json:"coordinates"\` }
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `type MultiPoint struct { Type string \`json:"type"\`; Coordinates [][2]float64 \`json:"coordinates"\` }
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `type MultiLineString struct { Type string \`json:"type"\`; Coordinates [][][2]float64 \`json:"coordinates"\` }
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `type MultiPolygon struct { Type string \`json:"type"\`; Coordinates [][][][2]float64 \`json:"coordinates"\` }
`;
    }
    if (this.usedGeometryTypes.has("geometry")) {
      code += `type Geometry interface{} 
`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "int64",
      "boolean": "bool",
      "date": "string",
      "dateTime": "string",
      "decimal": "float64",
      "float": "float32",
      "integer": "int32",
      "json": "map[string]interface{}",
      "string": "string",
      "text": "string",
      "time": "string",
      "timestamp": "string",
      "binary": "[]byte",
      "uuid": "string",
      "alias": "interface{}",
      "hash": "string",
      "csv": "[]string",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "interface{}"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set([
      "break",
      "default",
      "func",
      "interface",
      "select",
      "case",
      "defer",
      "go",
      "map",
      "struct",
      "chan",
      "else",
      "goto",
      "package",
      "switch",
      "const",
      "fallthrough",
      "if",
      "range",
      "type",
      "continue",
      "for",
      "import",
      "return",
      "var"
    ]);
  }
}

class CPPGenerator extends BaseGenerator {
  getPrefix(allCollectionNames) {
    let prefix = "// Minimum supported C++ version: C++17\n";
    prefix += "#include <string>\n#include <vector>\n#include <memory>\n#include <optional>\n#include <any>\n#include <array>\n\n";
    if (allCollectionNames && allCollectionNames.size > 1) {
      allCollectionNames.forEach((name) => {
        prefix += `struct ${this.toPascalCase(name)};
`;
      });
      prefix += "\n";
    }
    return prefix;
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = `struct ${collectionName} {
`;
    fields.forEach((row) => {
      let cppType = this.getMappedType(row.type) || "void*";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      let isRelation = false;
      if (row.relatedCollection) {
        isRelation = true;
        cppType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          cppType = `std::vector<std::weak_ptr<${cppType}>>`;
        } else {
          cppType = `std::shared_ptr<${cppType}>`;
        }
      }
      const isVector = cppType.startsWith("std::vector");
      if (!row.required && !isRelation && !isVector) {
        cppType = `std::optional<${cppType}>`;
      }
      let fieldName = row.field;
      if (this.getReservedKeywords().has(fieldName)) {
        fieldName = `custom_${fieldName}`;
      }
      code += `  ${cppType} ${fieldName};
`;
    });
    code += `};

`;
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "// Geometry types\n";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `struct Point { std::string type = "Point"; std::array<double, 2> coordinates; };
`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `struct LineString { std::string type = "LineString"; std::vector<std::array<double, 2>> coordinates; };
`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `struct Polygon { std::string type = "Polygon"; std::vector<std::vector<std::array<double, 2>>> coordinates; };
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `struct MultiPoint { std::string type = "MultiPoint"; std::vector<std::array<double, 2>> coordinates; };
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `struct MultiLineString { std::string type = "MultiLineString"; std::vector<std::vector<std::array<double, 2>>> coordinates; };
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `struct MultiPolygon { std::string type = "MultiPolygon"; std::vector<std::vector<std::vector<std::array<double, 2>>>> coordinates; };
`;
    }
    if (this.usedGeometryTypes.has("geometry")) {
      code += `struct Geometry { };
`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "long long",
      "boolean": "bool",
      "date": "std::string",
      "dateTime": "std::string",
      "decimal": "double",
      "float": "float",
      "integer": "int",
      "json": "std::string",
      "string": "std::string",
      "text": "std::string",
      "time": "std::string",
      "timestamp": "std::string",
      "binary": "std::vector<unsigned char>",
      "uuid": "std::string",
      "alias": "std::any",
      "hash": "std::string",
      "csv": "std::vector<std::string>",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "std::any"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set([
      "alignas",
      "alignof",
      "and",
      "and_eq",
      "asm",
      "atomic_cancel",
      "atomic_commit",
      "atomic_noexcept",
      "auto",
      "bitand",
      "bitor",
      "bool",
      "break",
      "case",
      "catch",
      "char",
      "char8_t",
      "char16_t",
      "char32_t",
      "class",
      "compl",
      "concept",
      "const",
      "consteval",
      "constexpr",
      "constinit",
      "const_cast",
      "continue",
      "co_await",
      "co_return",
      "co_yield",
      "decltype",
      "default",
      "delete",
      "do",
      "double",
      "dynamic_cast",
      "else",
      "enum",
      "explicit",
      "export",
      "extern",
      "false",
      "float",
      "for",
      "friend",
      "goto",
      "if",
      "inline",
      "int",
      "long",
      "mutable",
      "namespace",
      "new",
      "noexcept",
      "not",
      "not_eq",
      "nullptr",
      "operator",
      "or",
      "or_eq",
      "private",
      "protected",
      "public",
      "reflexpr",
      "register",
      "reinterpret_cast",
      "requires",
      "return",
      "short",
      "signed",
      "sizeof",
      "static",
      "static_assert",
      "static_cast",
      "struct",
      "switch",
      "synchronized",
      "template",
      "this",
      "thread_local",
      "throw",
      "true",
      "try",
      "typedef",
      "typeid",
      "typename",
      "union",
      "unsigned",
      "using",
      "virtual",
      "void",
      "volatile",
      "wchar_t",
      "while",
      "xor",
      "xor_eq"
    ]);
  }
}

class RubyGenerator extends BaseGenerator {
  getPrefix(__allCollectionNames) {
    return "# Minimum supported Ruby version: 2.0+\n\n";
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = `class ${collectionName}
  attr_accessor `;
    code += fields.map((row) => `:${row.field}`).join(", ");
    code += "\n\n  def initialize(params = {})\n";
    fields.forEach((row) => {
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      code += `    @${row.field} = params[:${row.field}]
`;
    });
    code += "  end\nend\n\n";
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "# Geometry types\n";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `Point = Struct.new(:type, :coordinates)
`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `LineString = Struct.new(:type, :coordinates)
`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `Polygon = Struct.new(:type, :coordinates)
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `MultiPoint = Struct.new(:type, :coordinates)
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `MultiLineString = Struct.new(:type, :coordinates)
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `MultiPolygon = Struct.new(:type, :coordinates)
`;
    }
    if (this.usedGeometryTypes.has("geometry")) {
      code += `Geometry = Struct.new(:dummy)
`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "Integer",
      "boolean": "TrueClass/FalseClass",
      "date": "String",
      "dateTime": "String",
      "decimal": "Float",
      "float": "Float",
      "integer": "Integer",
      "json": "Hash",
      "string": "String",
      "text": "String",
      "time": "String",
      "timestamp": "String",
      "binary": "String",
      "uuid": "String",
      "alias": "Object",
      "hash": "String",
      "csv": "Array",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "Object"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set();
  }
}

class SQLGenerator extends BaseGenerator {
  getPrefix(_allCollectionNames) {
    return "";
  }
  generateForCollection(collection, fields) {
    let code = `CREATE TABLE ${collection.toLowerCase()} (
`;
    fields.forEach((row, index) => {
      let sqlType = this.getMappedType(row.type) || "TEXT";
      code += `  \`${row.field}\` ${sqlType}${row.required ? " NOT NULL" : ""}${index === fields.length - 1 ? "" : ","}
`;
    });
    code += ");\n\n";
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "BIGINT",
      "boolean": "BOOLEAN",
      "date": "DATE",
      "dateTime": "DATETIME",
      "decimal": "DECIMAL",
      "float": "FLOAT",
      "integer": "INTEGER",
      "json": "JSON",
      "string": "VARCHAR(255)",
      "text": "TEXT",
      "time": "TIME",
      "timestamp": "TIMESTAMP",
      "binary": "BLOB",
      "uuid": "CHAR(36)",
      "alias": "TEXT",
      "hash": "VARCHAR(255)",
      "csv": "TEXT",
      "geometry": "GEOMETRY",
      "geometry.Point": "POINT",
      "geometry.LineString": "LINESTRING",
      "geometry.Polygon": "POLYGON",
      "geometry.MultiPoint": "MULTIPOINT",
      "geometry.MultiLineString": "MULTILINESTRING",
      "geometry.MultiPolygon": "MULTIPOLYGON",
      "unknown": "TEXT"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set();
  }
}

class KotlinGenerator extends BaseGenerator {
  static getOptions() {
    return [
      { text: "Standard", value: "standard" },
      { text: "kotlinx.serialization", value: "kotlinx_serialization" }
    ];
  }
  getPrefix(_allCollectionNames) {
    let prefix = "// Minimum supported Kotlin version: 1.0+\n";
    if (this.options.languageVersion === "kotlinx_serialization") {
      prefix += "import kotlinx.serialization.Serializable\n";
    }
    prefix += "\n";
    return prefix;
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = "";
    if (this.options.languageVersion === "kotlinx_serialization") {
      code += "@Serializable\n";
    }
    code += `data class ${collectionName}(
`;
    fields.forEach((row, index) => {
      let kotlinType = this.getMappedType(row.type) || "Any";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      if (row.relatedCollection) {
        kotlinType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          kotlinType = `List<${kotlinType}>`;
        }
      }
      code += `  val ${row.field}: ${kotlinType}${row.required ? "" : "?"}${index === fields.length - 1 ? "" : ","}
`;
    });
    code += ")\n\n";
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "";
    const serializable = this.options.languageVersion === "kotlinx_serialization" ? "@Serializable\n" : "";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `${serializable}data class Point(val type: String = "Point", val coordinates: DoubleArray)

`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `${serializable}data class LineString(val type: String = "LineString", val coordinates: List<DoubleArray>)

`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `${serializable}data class Polygon(val type: String = "Polygon", val coordinates: List<List<DoubleArray>>)

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `${serializable}data class MultiPoint(val type: String = "MultiPoint", val coordinates: List<DoubleArray>)

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `${serializable}data class MultiLineString(val type: String = "MultiLineString", val coordinates: List<List<DoubleArray>>)

`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `${serializable}data class MultiPolygon(val type: String = "MultiPolygon", val coordinates: List<List<List<DoubleArray>>>)

`;
    }
    if (this.usedGeometryTypes.has("geometry")) {
      code += `interface Geometry
`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "Long",
      "boolean": "Boolean",
      "date": "String",
      "dateTime": "String",
      "decimal": "Double",
      "float": "Float",
      "integer": "Int",
      "json": "String",
      "string": "String",
      "text": "String",
      "time": "String",
      "timestamp": "String",
      "binary": "ByteArray",
      "uuid": "String",
      "alias": "Any",
      "hash": "String",
      "csv": "List<String>",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "Any"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set();
  }
}

class GraphQLGenerator extends BaseGenerator {
  getPrefix(_allCollectionNames) {
    return "# Minimum supported GraphQL version: October 2021\n\n";
  }
  generateForCollection(collection, fields) {
    const collectionName = this.toPascalCase(collection);
    let code = `type ${collectionName} {
`;
    fields.forEach((row) => {
      let gqlType = this.getMappedType(row.type) || "Json";
      if (row.type.startsWith("geometry")) {
        this.usedGeometryTypes.add(row.type);
      }
      if (row.relatedCollection) {
        gqlType = this.toPascalCase(row.relatedCollection);
        if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
          gqlType = `[${gqlType}]`;
        }
      }
      code += `  ${row.field}: ${gqlType}${row.required ? "!" : ""}
`;
    });
    code += "}\n\n";
    return code;
  }
  generateCustomTypes(usedGeometryTypes) {
    if (usedGeometryTypes) {
      this.usedGeometryTypes = usedGeometryTypes;
    }
    let code = "";
    if (this.usedGeometryTypes.has("geometry.Point")) {
      code += `type Point { type: String!, coordinates: [Float!]! }
`;
    }
    if (this.usedGeometryTypes.has("geometry.LineString")) {
      code += `type LineString { type: String!, coordinates: [[Float!]!]! }
`;
    }
    if (this.usedGeometryTypes.has("geometry.Polygon")) {
      code += `type Polygon { type: String!, coordinates: [[[Float!]!]!]! }
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
      code += `type MultiPoint { type: String!, coordinates: [[Float!]!]! }
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
      code += `type MultiLineString { type: String!, coordinates: [[[Float!]!]!]! }
`;
    }
    if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
      code += `type MultiPolygon { type: String!, coordinates: [[[[Float!]!]!]!]! }
`;
    }
    if (this.usedGeometryTypes.has("geometry")) {
      code += `union Geometry = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon
`;
    }
    return code;
  }
  getTypeMap() {
    return {
      "bigInteger": "Int",
      "boolean": "Boolean",
      "date": "String",
      "dateTime": "String",
      "decimal": "Float",
      "float": "Float",
      "integer": "Int",
      "json": "Json",
      "string": "String",
      "text": "String",
      "time": "String",
      "timestamp": "String",
      "binary": "String",
      "uuid": "String",
      "alias": "Json",
      "hash": "String",
      "csv": "[String]",
      "geometry": "Geometry",
      "geometry.Point": "Point",
      "geometry.LineString": "LineString",
      "geometry.Polygon": "Polygon",
      "geometry.MultiPoint": "MultiPoint",
      "geometry.MultiLineString": "MultiLineString",
      "geometry.MultiPolygon": "MultiPolygon",
      "unknown": "Json"
    };
  }
  getReservedKeywords() {
    return /* @__PURE__ */ new Set();
  }
}

class TypeGeneratorService {
  constructor(options) {
    this.options = options;
    this.generatedCollections = /* @__PURE__ */ new Set();
    this.usedGeometryTypes = /* @__PURE__ */ new Set();
    this.generator = this.getGenerator(options);
  }
  static getGenerator(language) {
    switch (language) {
      case "typescript":
        return TypeScriptGenerator;
      case "rust":
        return RustGenerator;
      case "php":
        return PHPGenerator;
      case "csharp":
        return CSharpGenerator;
      case "java":
        return JavaGenerator;
      case "python":
        return PythonGenerator;
      case "go":
        return GoGenerator;
      case "cpp":
        return CPPGenerator;
      case "ruby":
        return RubyGenerator;
      case "sql":
        return SQLGenerator;
      case "kotlin":
        return KotlinGenerator;
      case "graphql":
        return GraphQLGenerator;
      default:
        throw new Error(`Language ${language} not supported`);
    }
  }
  async generate(mainCollection, mainFields, selectedCollections, getMappedFields) {
    this.generatedCollections.clear();
    this.usedGeometryTypes.clear();
    this.generator.reset();
    const collectionsToProcess = [];
    const allCollectionNames = /* @__PURE__ */ new Set();
    if (mainCollection) {
      collectionsToProcess.push({ name: mainCollection, fields: mainFields });
      allCollectionNames.add(mainCollection);
    } else if (selectedCollections.length > 0) {
      selectedCollections.forEach((collName) => {
        const fields = getMappedFields(collName);
        collectionsToProcess.push({ name: collName, fields });
        allCollectionNames.add(collName);
      });
    }
    let tempProcess = [...collectionsToProcess];
    let visited = new Set(allCollectionNames);
    while (tempProcess.length > 0) {
      const current = tempProcess.shift();
      current.fields.forEach((f) => {
        if (f.relatedCollection && !visited.has(f.relatedCollection)) {
          const mappedFields = getMappedFields(f.relatedCollection);
          if (mappedFields.length > 0) {
            visited.add(f.relatedCollection);
            allCollectionNames.add(f.relatedCollection);
            tempProcess.push({ name: f.relatedCollection, fields: mappedFields });
          }
        }
      });
    }
    let collectionsCode = "";
    const initialCollections = [...collectionsToProcess];
    const processedInFirstPass = /* @__PURE__ */ new Set();
    while (collectionsToProcess.length > 0) {
      const current = collectionsToProcess.shift();
      if (processedInFirstPass.has(current.name)) {
        continue;
      }
      processedInFirstPass.add(current.name);
      current.fields = current.fields.filter((f) => !f.field.startsWith("$"));
      collectionsCode += this.generator.generateForCollection(current.name, current.fields);
      current.fields.forEach((f) => {
        if (f.relatedCollection && !processedInFirstPass.has(f.relatedCollection)) {
          const mappedFields = getMappedFields(f.relatedCollection);
          if (mappedFields.length > 0) {
            collectionsToProcess.push({ name: f.relatedCollection, fields: mappedFields });
          }
        }
      });
    }
    let prefix = this.generator.getPrefix(allCollectionNames);
    let customTypesCode = "";
    if (this.options.language !== "sql") {
      customTypesCode = this.generator.generateCustomTypes();
    }
    this.generatedCollections.clear();
    collectionsCode = "";
    const processedInSecondPass = /* @__PURE__ */ new Set();
    while (initialCollections.length > 0) {
      const current = initialCollections.shift();
      if (processedInSecondPass.has(current.name)) {
        continue;
      }
      processedInSecondPass.add(current.name);
      current.fields = current.fields.filter((f) => !f.field.startsWith("$"));
      collectionsCode += this.generator.generateForCollection(current.name, current.fields);
      current.fields.forEach((f) => {
        if (f.relatedCollection && !processedInSecondPass.has(f.relatedCollection)) {
          const mappedFields = getMappedFields(f.relatedCollection);
          if (mappedFields.length > 0) {
            initialCollections.push({ name: f.relatedCollection, fields: mappedFields });
          }
        }
      });
    }
    return (prefix + collectionsCode + customTypesCode).trim() || `// Language ${this.options.language} not supported yet`;
  }
  getGenerator(options) {
    const GeneratorClass = TypeGeneratorService.getGenerator(options.language);
    return new GeneratorClass(options);
  }
}

HighlightJS.registerLanguage("typescript", typescript);
HighlightJS.registerLanguage("rust", rust);
HighlightJS.registerLanguage("php", php);
HighlightJS.registerLanguage("csharp", csharp);
HighlightJS.registerLanguage("java", java);
HighlightJS.registerLanguage("python", python);
HighlightJS.registerLanguage("go", go);
HighlightJS.registerLanguage("cpp", cpp);
HighlightJS.registerLanguage("ruby", ruby);
HighlightJS.registerLanguage("sql", sql);
HighlightJS.registerLanguage("graphql", graphql);
HighlightJS.registerLanguage("kotlin", kotlin);
var _sfc_main$1 = defineComponent({
  name: "generated-type",
  components: {
    highlightjs: o.component
  },
  props: {
    collection: {
      type: String,
      required: false,
      default: null
    },
    fields: {
      type: Array,
      required: true
    },
    selectedCollections: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { useFieldsStore, useRelationsStore } = useStores();
    const fieldsStore = useFieldsStore();
    const relationsStore = useRelationsStore();
    const currentLanguageOptions = ref([]);
    const updateOptions = (lang) => {
      try {
        const GeneratorClass = TypeGeneratorService.getGenerator(lang);
        currentLanguageOptions.value = GeneratorClass.getOptions();
      } catch (e) {
        console.error(e);
        currentLanguageOptions.value = [];
      }
    };
    const selectedLanguage = ref(localStorage.getItem("schema-types-language") || "typescript");
    updateOptions(selectedLanguage.value);
    const tsTypeStyle = ref(localStorage.getItem("schema-types-ts-style") || "interface");
    const languageVersion = ref(localStorage.getItem("schema-types-language-version") || "");
    const generatedCode = ref("");
    const getRelatedCollection = (field) => {
      if (!field || !relationsStore.relations) {
        return null;
      }
      const relation = relationsStore.relations.find(
        (r) => r.collection === field.collection && r.field === field.field || r.related_collection === field.collection && r.meta?.one_field === field.field
      );
      if (relation) {
        return relation.collection === field.collection ? relation.related_collection : relation.collection;
      }
      return null;
    };
    const getMappedFields = (collection) => {
      if (!fieldsStore.fields) {
        return [];
      }
      const relatedFields = fieldsStore.fields.filter((field) => field.collection === collection);
      return relatedFields.map((field) => ({
        field: field.field || "unknown",
        type: field.type || "unknown",
        required: field.schema ? field.schema.is_nullable === false : field.meta?.required === true,
        special: Array.isArray(field.special) ? field.special : field.meta?.special ? Array.isArray(field.meta.special) ? field.meta.special : [field.meta.special] : [],
        relatedCollection: getRelatedCollection(field)
      }));
    };
    const languages = [
      {
        text: "Typescript",
        value: "typescript"
      },
      {
        text: "Rust",
        value: "rust"
      },
      {
        text: "PHP",
        value: "php"
      },
      {
        text: "C#",
        value: "csharp"
      },
      {
        text: "Java",
        value: "java"
      },
      {
        text: "Python",
        value: "python"
      },
      {
        text: "Golang",
        value: "go"
      },
      {
        text: "Kotlin",
        value: "kotlin"
      },
      {
        text: "C++",
        value: "cpp"
      },
      {
        text: "Ruby",
        value: "ruby"
      },
      {
        text: "SQL",
        value: "sql"
      },
      {
        text: "GraphQL",
        value: "graphql"
      }
    ];
    const copyToClipboard = async () => {
      if (!generatedCode.value) {
        return;
      }
      try {
        await navigator.clipboard.writeText(generatedCode.value);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };
    watch(selectedLanguage, (newLang) => {
      localStorage.setItem("schema-types-language", newLang);
      updateOptions(newLang);
      if (currentLanguageOptions.value.length > 0) {
        languageVersion.value = currentLanguageOptions.value[0]?.value || "";
      }
    });
    watch(tsTypeStyle, (newStyle) => {
      localStorage.setItem("schema-types-ts-style", newStyle);
    });
    watch(languageVersion, (newVersion) => {
      localStorage.setItem("schema-types-language-version", newVersion);
    });
    watch([selectedLanguage, tsTypeStyle, languageVersion, () => props.fields, () => props.selectedCollections, () => props.collection], async () => {
      if (!props.fields || (!props.collection || props.fields.length === 0) && (!props.selectedCollections || props.selectedCollections.length === 0)) {
        generatedCode.value = "// No fields found";
        return;
      }
      const generator = new TypeGeneratorService({
        language: selectedLanguage.value,
        tsTypeStyle: tsTypeStyle.value,
        languageVersion: languageVersion.value
      });
      const mainFields = props.fields.map((f) => {
        const fieldData = fieldsStore.fields ? fieldsStore.fields.find((field) => field.collection === props.collection && field.field === f.field) : null;
        return {
          ...f,
          relatedCollection: getRelatedCollection(fieldData)
        };
      });
      try {
        generatedCode.value = await generator.generate(
          props.collection,
          mainFields,
          props.selectedCollections,
          getMappedFields
        );
      } catch (err) {
        console.error("Error during generation:", err);
        generatedCode.value = "// Error during generation: " + err.message;
      }
    }, { immediate: true });
    return {
      selectedLanguage,
      tsTypeStyle,
      languageVersion,
      languages,
      currentLanguageOptions,
      generatedCode,
      copyToClipboard
    };
  }
});

var css$1 = "\n.generated-type[data-v-18f237df] {\r\n  background-color: var(--background-page);\r\n  border: var(--theme--border-width) solid var(--border-subdued);\r\n  border-radius: var(--theme--border-radius);\r\n  padding: 16px;\r\n  min-height: 400px;\r\n  display: flex;\r\n  flex-direction: column;\n}\n.header[data-v-18f237df] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 12px;\r\n  border-bottom: var(--theme--border-width) solid var(--border-subdued);\r\n  padding-bottom: 10px;\r\n  flex: 0 0 auto;\n}\n.title[data-v-18f237df] {\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  color: var(--foreground-normal);\n}\n.options[data-v-18f237df] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\n}\n.options[data-v-18f237df] .v-checkbox {\r\n  margin-top: 0;\n}\n.actions[data-v-18f237df] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\n}\n.lang-icon[data-v-18f237df] {\r\n  width: 18px;\r\n  height: 18px;\r\n  margin-right: 8px;\r\n  object-fit: contain;\n}\n.content[data-v-18f237df] {\r\n  border-radius: var(--theme--border-radius);\r\n  flex: 1 1 auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n  background-color: var(--background-subdued);\r\n  border: var(--theme--border-width) solid var(--border-subdued);\n}\n.code-container[data-v-18f237df] {\r\n  height: 100%;\r\n  position: relative;\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\n}\n.copy-button[data-v-18f237df] {\r\n  position: absolute;\r\n  top: 12px;\r\n  right: 12px;\r\n  z-index: 10;\r\n  background-color: var(--background-page, #ffffff) !important;\n}\n.copy-button[data-v-18f237df]:hover {\r\n  background-color: var(--background-subdued, #f9fafb) !important;\n}\n.generated-code[data-v-18f237df] {\r\n  height: 100%;\r\n  font-family: var(--family-monospace);\r\n  font-weight: 400;\r\n  font-size: 13px;\r\n  line-height: 1.5;\r\n  background-color: #f9fafb !important;\r\n  color: var(--foreground-normal);\r\n  white-space: pre;\r\n  overflow: auto;\r\n  tab-size: 2;\r\n  border-radius: 8px;\n}\n.generated-code[data-v-18f237df] code {\r\n  background-color: transparent !important;\n}\r\n";
n(css$1,{});

const _hoisted_1 = { class: "generated-type" };
const _hoisted_2 = { class: "header" };
const _hoisted_3 = { class: "title" };
const _hoisted_4 = { class: "options" };
const _hoisted_5 = { class: "content" };
const _hoisted_6 = {
  key: 0,
  class: "code-container"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_select = resolveComponent("v-select");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_button = resolveComponent("v-button");
  const _component_highlightjs = resolveComponent("highlightjs");
  const _component_v_info = resolveComponent("v-info");
  const _directive_tooltip = resolveDirective("tooltip");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createVNode(_component_v_select, {
          modelValue: _ctx.selectedLanguage,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectedLanguage = $event),
          items: _ctx.languages,
          "show-deselect": false,
          inline: "",
          placeholder: "Select Language"
        }, {
          selection: withCtx(({ item }) => [
            createElementVNode(
              "span",
              null,
              toDisplayString(item.text),
              1
              /* TEXT */
            )
          ]),
          item: withCtx(({ item }) => [
            createElementVNode(
              "span",
              null,
              toDisplayString(item.text),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue", "items"])
      ]),
      createElementVNode("div", _hoisted_4, [
        _ctx.selectedLanguage === "typescript" ? (openBlock(), createBlock(_component_v_select, {
          key: 0,
          modelValue: _ctx.tsTypeStyle,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.tsTypeStyle = $event),
          items: _ctx.currentLanguageOptions,
          "show-deselect": false,
          inline: "",
          placeholder: "Type Style"
        }, null, 8, ["modelValue", "items"])) : createCommentVNode("v-if", true),
        _ctx.currentLanguageOptions.length > 1 && _ctx.selectedLanguage !== "typescript" ? (openBlock(), createBlock(_component_v_select, {
          key: 1,
          modelValue: _ctx.languageVersion,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.languageVersion = $event),
          items: _ctx.currentLanguageOptions,
          placeholder: _ctx.selectedLanguage === "java" ? "List Implementation" : _ctx.selectedLanguage === "php" ? "PHP Version" : "Python Version",
          "show-deselect": false,
          inline: ""
        }, null, 8, ["modelValue", "items", "placeholder"])) : createCommentVNode("v-if", true)
      ])
    ]),
    createElementVNode("div", _hoisted_5, [
      _ctx.generatedCode ? (openBlock(), createElementBlock("div", _hoisted_6, [
        withDirectives((openBlock(), createBlock(_component_v_button, {
          class: "copy-button",
          icon: "",
          secondary: "",
          onClick: _ctx.copyToClipboard
        }, {
          default: withCtx(() => [
            createVNode(_component_v_icon, { name: "content_copy" })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["onClick"])), [
          [_directive_tooltip, "Copy to Clipboard"]
        ]),
        createVNode(_component_highlightjs, {
          autodetect: false,
          code: _ctx.generatedCode,
          language: _ctx.selectedLanguage,
          class: "generated-code"
        }, null, 8, ["code", "language"])
      ])) : (openBlock(), createBlock(_component_v_info, {
        key: 1,
        type: "info"
      }, {
        default: withCtx(() => [..._cache[3] || (_cache[3] = [
          createTextVNode(
            "No generated code available",
            -1
            /* CACHED */
          )
        ])]),
        _: 1
        /* STABLE */
      }))
    ])
  ]);
}
var GeneratedType = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-18f237df"]]);

var _sfc_main = defineComponent({
  components: { Fields, Collections, GeneratedType, Navigation },
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const error = ref(void 0);
    const selectedFields = ref([]);
    const selectedCollections = ref([]);
    let fieldsStore = null;
    let relationsStore = null;
    let collectionsStore = null;
    const stores = useStores();
    try {
      fieldsStore = stores.useFieldsStore();
      relationsStore = stores.useRelationsStore();
      collectionsStore = stores.useCollectionsStore();
    } catch (e) {
      console.error("Error initializing stores:", e);
    }
    const collections = computed(() => {
      if (!collectionsStore || !collectionsStore.collections) {
        return [];
      }
      return collectionsStore.collections.filter((c) => !c.collection.startsWith("directus_"));
    });
    watch(collections, (newCols) => {
      if (newCols && newCols.length > 0 && selectedCollections.value && selectedCollections.value.length === 0) {
        selectedCollections.value = newCols.filter((c) => c.meta?.type !== "folder").map((c) => c.collection);
      }
    }, { immediate: true });
    const rows = computed(() => {
      try {
        if (!props.collection || !fieldsStore || !relationsStore || !fieldsStore.fields || !relationsStore.relations) {
          return [];
        }
        const allFields = fieldsStore.fields;
        const allRelations = relationsStore.relations;
        if (!allFields || !Array.isArray(allFields)) {
          return [];
        }
        const filtered = allFields.filter((f) => f.collection === props.collection);
        return filtered.map((f) => {
          const relation = allRelations.find(
            (r) => r.collection === props.collection && r.field === f.field || r.related_collection === props.collection && r.meta?.one_field === f.field
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
            field: f.field || "unknown",
            type: displayType,
            interface: f.meta?.interface || "",
            required: f.schema ? f.schema.is_nullable === false : f.meta?.required === true,
            unique: f.schema?.is_unique === true,
            default: f.schema?.default_value ?? f.meta?.defaultValue ?? null,
            special: Array.isArray(f.special) ? f.special : f.meta?.special ? Array.isArray(f.meta.special) ? f.meta.special : [f.meta.special] : [],
            note: f.meta?.note || "",
            relation,
            relatedCollection
          };
        });
      } catch (e) {
        console.error("Error in rows computed:", e);
        return [];
      }
    });
    watch(() => props.collection, () => {
      selectedFields.value = [];
    });
    watch(rows, (newRows) => {
      if (newRows && newRows.length > 0 && selectedFields.value && selectedFields.value.length === 0) {
        selectedFields.value = newRows.map((r) => r.field);
      }
    }, { immediate: true });
    const selectedRows = computed(() => {
      if (!rows.value || !selectedFields.value) {
        return [];
      }
      return rows.value.filter((r) => selectedFields.value.includes(r.field));
    });
    const toggleField = (field) => {
      if (!selectedFields.value) {
        return;
      }
      if (selectedFields.value.includes(field)) {
        selectedFields.value = selectedFields.value.filter((f) => f !== field);
      } else {
        selectedFields.value.push(field);
      }
    };
    const toggleAllFields = () => {
      if (rows.value && selectedFields.value && selectedFields.value.length === rows.value.length) {
        selectedFields.value = [];
      } else if (rows.value) {
        selectedFields.value = rows.value.map((r) => r.field);
      }
    };
    const toggleCollection = (collection) => {
      if (!selectedCollections.value) {
        return;
      }
      if (selectedCollections.value.includes(collection)) {
        selectedCollections.value = selectedCollections.value.filter((c) => c !== collection);
      } else {
        selectedCollections.value.push(collection);
      }
    };
    const toggleAllCollections = () => {
      if (!selectedCollections.value || !collections.value) {
        return;
      }
      const selectableCollections = collections.value.filter((c) => c.meta?.type !== "folder");
      if (selectedCollections.value.length === selectableCollections.length) {
        selectedCollections.value = [];
      } else {
        selectedCollections.value = selectableCollections.map((c) => c.collection);
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
      page_description: "Generate types for your schemas"
    };
  }
});

var css = "\n.headline[data-v-10759c3a] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  column-gap: 12px;\n}\n.headline .feedback[data-v-10759c3a] {\n  font-weight: 400;\n  color: var(--theme--foreground-subdued);\n}\n.headline .feedback a[data-v-10759c3a] {\n  color: inherit;\n}\nmain[data-v-10759c3a] {\n  display: flex;\n  gap: var(--content-padding);\n  padding: var(--content-padding);\n  align-items: flex-start;\n}\nmain[data-v-10759c3a] > * {\n  flex: 1;\n  min-width: 0;\n}\n";
n(css,{});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_button = resolveComponent("v-button");
  const _component_navigation = resolveComponent("navigation");
  const _component_collections = resolveComponent("collections");
  const _component_fields = resolveComponent("fields");
  const _component_generated_type = resolveComponent("generated-type");
  const _component_private_view = resolveComponent("private-view");
  return openBlock(), createBlock(_component_private_view, {
    title: _ctx.collection ? `Schema for ${_ctx.collection}` : "Schemas"
  }, {
    headline: withCtx(() => [..._cache[0] || (_cache[0] = [
      createElementVNode(
        "div",
        { class: "headline" },
        [
          createElementVNode("p", null, [
            createElementVNode("a", {
              href: "https://protoqol.nl",
              target: "_blank"
            }, "protoqol/schema-types")
          ]),
          createElementVNode("p", { class: "feedback" }, [
            createElementVNode("a", {
              href: "https://github.com/Protoqol/directus-extension-schema-types/issues/new",
              target: "_blank"
            }, "Feedback or issues? ")
          ])
        ],
        -1
        /* CACHED */
      )
    ])]),
    "title-outer:prepend": withCtx(() => [
      createVNode(_component_v_button, {
        class: "header-icon",
        disabled: "",
        icon: "",
        rounded: "",
        secondary: ""
      }, {
        default: withCtx(() => [
          createVNode(_component_v_icon, { name: "code" })
        ]),
        _: 1
        /* STABLE */
      })
    ]),
    navigation: withCtx(() => [
      createVNode(_component_navigation, { collection: _ctx.collection }, null, 8, ["collection"])
    ]),
    default: withCtx(() => [
      createElementVNode("main", null, [
        !_ctx.collection ? (openBlock(), createBlock(_component_collections, {
          key: 0,
          collections: _ctx.collections,
          "selected-collections": _ctx.selectedCollections,
          onToggleCollection: _ctx.toggleCollection,
          onToggleAll: _ctx.toggleAllCollections
        }, null, 8, ["collections", "selected-collections", "onToggleCollection", "onToggleAll"])) : (openBlock(), createBlock(_component_fields, {
          key: 1,
          collection: _ctx.collection,
          error: _ctx.error,
          rows: _ctx.rows,
          "selected-fields": _ctx.selectedFields,
          onToggleField: _ctx.toggleField,
          onToggleAll: _ctx.toggleAllFields
        }, null, 8, ["collection", "error", "rows", "selected-fields", "onToggleField", "onToggleAll"])),
        createVNode(_component_generated_type, {
          collection: _ctx.collection,
          fields: _ctx.selectedRows,
          "selected-collections": _ctx.selectedCollections
        }, null, 8, ["collection", "fields", "selected-collections"])
      ])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["title"]);
}
var ModuleComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-10759c3a"]]);

var index = defineModule({
  id: "protoqol/schema",
  name: "Schema Types",
  description: "Generate schemas/types for TypeScript, Rust, PHP, C#, Java, Python, Go, Kotlin, C++, Ruby, SQL, and GraphQL.",
  icon: "data_array",
  color: "#af31cb",
  hidden: false,
  routes: [
    {
      path: "",
      component: ModuleComponent
    },
    {
      path: ":collection",
      component: ModuleComponent,
      props: true
    }
  ]
});

export { index as default };
