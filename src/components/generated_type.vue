<template>
  <div class="generated-type">
    <div class="header">
      <div class="title">
        <v-select
            v-model="selectedLanguage"
            :items="languages"
            :show-deselect="false"
            inline
            placeholder="Select Language"
        >
          <template #selection="{ item }">
            <span>{{ item.text }}</span>
          </template>
          <template #item="{ item }">
            <span>{{ item.text }}</span>
          </template>
        </v-select>
      </div>

      <div class="options">
        <v-select
            v-if="selectedLanguage === 'typescript'"
            v-model="tsTypeStyle"
            :items="tsTypeStyles"
            :show-deselect="false"
            inline
            placeholder="Type Style"
        />
      </div>
    </div>
    <div class="content">
      <div v-if="generatedCode" class="code-container">
        <v-button v-tooltip="'Copy to Clipboard'" class="copy-button" icon secondary @click="copyToClipboard">
          <v-icon name="content_copy"/>
        </v-button>
        <highlightjs
            :code="generatedCode"
            :language="selectedLanguage"
            class="generated-code"
        />
      </div>
      <v-info v-else type="info">No generated code available</v-info>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import {useStores} from "@directus/extensions-sdk";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";
import typescript from "highlight.js/lib/languages/typescript";
import rust from "highlight.js/lib/languages/rust";
import php from "highlight.js/lib/languages/php";
import csharp from "highlight.js/lib/languages/csharp";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import go from "highlight.js/lib/languages/go";
import cpp from "highlight.js/lib/languages/cpp";
import ruby from "highlight.js/lib/languages/ruby";
import sql from "highlight.js/lib/languages/sql";
import graphql from "highlight.js/lib/languages/graphql";
import kotlin from "highlight.js/lib/languages/kotlin";
import highlightjs from "@highlightjs/vue-plugin";
import {TypeGeneratorService} from "../services/type-generator";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("php", php);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);
hljs.registerLanguage("go", go);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("graphql", graphql);
hljs.registerLanguage("kotlin", kotlin);

export default defineComponent({
  name      : "generated-type",
  components: {
    highlightjs: highlightjs.component,
  },
  props     : {
    collection         : {
      type    : String,
      required: false,
      default : null,
    },
    fields             : {
      type    : Array,
      required: true,
    },
    selectedCollections: {
      type   : Array,
      default: () => [],
    },
  },

  setup(props) {
    const selectedLanguage = ref("typescript");
    const tsTypeStyle = ref("interface");
    const generatedCode = ref("");

    const {useFieldsStore, useRelationsStore} = useStores();
    const fieldsStore = useFieldsStore();
    const relationsStore = useRelationsStore();

    const languages = [
      {
        text : "Typescript",
        value: "typescript",
      },
      {
        text : "Rust",
        value: "rust",
      },
      {
        text : "PHP",
        value: "php",
      },
      {
        text : "C#",
        value: "csharp",
      },
      {
        text : "Java",
        value: "java",
      },
      {
        text : "Python",
        value: "python",
      },
      {
        text : "Golang",
        value: "go",
      },
      {
        text : "Kotlin",
        value: "kotlin",
      },
      {
        text : "C++",
        value: "cpp",
      },
      {
        text : "Ruby",
        value: "ruby",
      },
      {
        text : "SQL",
        value: "sql",
      },
      {
        text : "GraphQL",
        value: "graphql",
      },
    ];

    const tsTypeStyles = [
      {text: "Interface", value: "interface"},
      {text: "Type", value: "type"},
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

    watch([selectedLanguage, tsTypeStyle, () => props.fields, () => props.selectedCollections, () => props.collection], async () => {
      if ((!props.collection || props.fields.length === 0) && props.selectedCollections.length === 0) {
        generatedCode.value = "// No fields found";
        return;
      }

      const getMappedFields = (collection: string) => {
        const relatedFields = fieldsStore.fields.filter((field: any) => field.collection === collection);
        return relatedFields.map((field: any) => ({
          field            : field.field || "unknown",
          type             : field.type || "unknown",
          required         : field.schema ? field.schema.is_nullable === false : field.meta?.required === true,
          special          : Array.isArray(field.special) ? field.special : (field.meta?.special ? (Array.isArray(field.meta.special) ? field.meta.special : [field.meta.special]) : []),
          relatedCollection: getRelatedCollection(field),
        }));
      };

      const getRelatedCollection = (field: any) => {
        const relation = relationsStore.relations.find(
            (r: any) =>
                (r.collection === field.collection && r.field === field.field) ||
                (r.related_collection === field.collection && r.meta?.one_field === field.field),
        );

        if (relation) {
          return relation.collection === field.collection ? relation.related_collection : relation.collection;
        }
        return null;
      };

      const generator = new TypeGeneratorService({
        language   : selectedLanguage.value,
        tsTypeStyle: tsTypeStyle.value,
      });

      const mainFields = props.fields.map((f: any) => ({
        ...f,
        relatedCollection: getRelatedCollection(fieldsStore.fields.find((field: any) => field.collection === props.collection && field.field === f.field)),
      }));

      generatedCode.value = await generator.generate(
          props.collection,
          mainFields,
          props.selectedCollections as string[],
          getMappedFields,
      );
    }, {immediate: true});

    return {
      selectedLanguage,
      tsTypeStyle,
      languages,
      tsTypeStyles,
      generatedCode,
      copyToClipboard,
    };
  },
});
</script>

<style scoped>
.generated-type {
  background-color: var(--background-page);
  border: var(--border-width) solid var(--border-subdued);
  border-radius: var(--border-radius);
  padding: 16px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: var(--border-width) solid var(--border-subdued);
  padding-bottom: 10px;
  flex: 0 0 auto;
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground-normal);
}

.options {
  display: flex;
  align-items: center;
  gap: 16px;
}

.options :deep(.v-checkbox) {
  margin-top: 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  object-fit: contain;
}

.content {
  border-radius: var(--border-radius);
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--background-subdued);
  border: var(--border-width) solid var(--border-subdued);
}

.code-container {
  height: 100%;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.copy-button {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background-color: var(--background-page, #ffffff) !important;
}

.copy-button:hover {
  background-color: var(--background-subdued, #f9fafb) !important;
}

.generated-code {
  height: 100%;
  font-family: var(--family-monospace);
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  background-color: var(--background-subdued) !important;
  color: var(--foreground-normal);
  white-space: pre;
  overflow: auto;
  tab-size: 2;
}

.generated-code :deep(code) {
  background-color: transparent !important;
}
</style>
