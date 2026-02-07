import {defineModule} from "@directus/extensions-sdk";
import ModuleComponent from "./module.vue";

export default defineModule({
    id         : "protoqol/schema",
    name       : "Schema Types",
    description: "Generate schemas/types for TypeScript, Rust, PHP, C#, Java, Python, Go, Kotlin, C++, Ruby, SQL, and GraphQL.",
    icon       : "data_array",
    color      : "#af31cb",
    hidden     : false,
    routes     : [
        {
            path     : "",
            component: ModuleComponent,
        },
        {
            path     : ":collection",
            component: ModuleComponent,
            props    : true,
        },
    ],
});

