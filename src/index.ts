import {defineModule} from "@directus/extensions-sdk";
import ModuleComponent from "./module.vue";

export default defineModule({
    id    : "protoqol/schema",
    name  : "Typescript Schema",
    icon  : "data_array",
    color : "#007bff",
    hidden: false,
    routes: [
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

