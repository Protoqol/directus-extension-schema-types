import {BaseGenerator, FieldInfo, GeneratorOptions} from "./generators/base-generator";
import {TypeScriptGenerator} from "./generators/typescript-generator";
import {RustGenerator} from "./generators/rust-generator";
import {PHPGenerator} from "./generators/php-generator";
import {CSharpGenerator} from "./generators/csharp-generator";
import {JavaGenerator} from "./generators/java-generator";
import {PythonGenerator} from "./generators/python-generator";
import {GoGenerator} from "./generators/go-generator";
import {CPPGenerator} from "./generators/cpp-generator";
import {RubyGenerator} from "./generators/ruby-generator";
import {SQLGenerator} from "./generators/sql-generator";
import {KotlinGenerator} from "./generators/kotlin-generator";
import {GraphQLGenerator} from "./generators/graphql-generator";

export class TypeGeneratorService {
    private generatedCollections = new Set<string>();

    private usedGeometryTypes = new Set<string>();

    private generator: BaseGenerator;

    constructor(private options: GeneratorOptions) {
        this.generator = this.getGenerator(options);
    }

    public static getGenerator(language: string): typeof BaseGenerator {
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

    public async generate(mainCollection: string | null, mainFields: FieldInfo[], selectedCollections: string[], getMappedFields: (collection: string) => FieldInfo[]): Promise<string> {
        this.generatedCollections.clear();
        this.usedGeometryTypes.clear();
        this.generator.reset();

        const collectionsToProcess: { name: string; fields: FieldInfo[] }[] = [];
        const allCollectionNames = new Set<string>();

        if (mainCollection) {
            collectionsToProcess.push({name: mainCollection, fields: mainFields});
            allCollectionNames.add(mainCollection);
        } else if (selectedCollections.length > 0) {
            selectedCollections.forEach((collName) => {
                const fields = getMappedFields(collName);
                collectionsToProcess.push({name: collName, fields: fields});
                allCollectionNames.add(collName);
            });
        }

        let tempProcess = [...collectionsToProcess];
        let visited = new Set<string>(allCollectionNames);

        while (tempProcess.length > 0) {
            const current = tempProcess.shift()!;

            current.fields.forEach((f) => {
                if (f.relatedCollection && !visited.has(f.relatedCollection)) {
                    const mappedFields = getMappedFields(f.relatedCollection);

                    if (mappedFields.length > 0) {
                        visited.add(f.relatedCollection);
                        allCollectionNames.add(f.relatedCollection);
                        tempProcess.push({name: f.relatedCollection, fields: mappedFields});
                    }
                }
            });
        }

        let collectionsCode = "";

        const initialCollections = [...collectionsToProcess];
        const processedInFirstPass = new Set<string>();

        while (collectionsToProcess.length > 0) {
            const current = collectionsToProcess.shift()!;

            if (processedInFirstPass.has(current.name)) {
                continue;
            }

            processedInFirstPass.add(current.name);

            current.fields = current.fields.filter(f => !f.field.startsWith("$"));
            collectionsCode += this.generator.generateForCollection(current.name, current.fields);

            current.fields.forEach((f) => {

                if (f.relatedCollection && !processedInFirstPass.has(f.relatedCollection)) {
                    const mappedFields = getMappedFields(f.relatedCollection);

                    if (mappedFields.length > 0) {
                        collectionsToProcess.push({name: f.relatedCollection, fields: mappedFields});
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

        const processedInSecondPass = new Set<string>();

        while (initialCollections.length > 0) {
            const current = initialCollections.shift()!;

            if (processedInSecondPass.has(current.name)) {
                continue;
            }

            processedInSecondPass.add(current.name);

            current.fields = current.fields.filter(f => !f.field.startsWith("$"));
            collectionsCode += this.generator.generateForCollection(current.name, current.fields);

            current.fields.forEach((f) => {
                if (f.relatedCollection && !processedInSecondPass.has(f.relatedCollection)) {
                    const mappedFields = getMappedFields(f.relatedCollection);

                    if (mappedFields.length > 0) {
                        initialCollections.push({name: f.relatedCollection, fields: mappedFields});
                    }
                }
            });
        }

        return (prefix + collectionsCode + customTypesCode).trim() || `// Language ${this.options.language} not supported yet`;
    }

    private getGenerator(options: GeneratorOptions): BaseGenerator {
        const GeneratorClass = TypeGeneratorService.getGenerator(options.language);
        return new (GeneratorClass as any)(options);
    }
}
