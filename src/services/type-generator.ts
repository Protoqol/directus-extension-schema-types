import {BaseGenerator, FieldInfo, GeneratorOptions, toPascalCase} from "./generators/base-generator";
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

        // Pre-collect all collection names for forward declarations
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

        while (collectionsToProcess.length > 0) {
            const current = collectionsToProcess.shift()!;
            current.fields = current.fields.filter(f => !f.field.startsWith("$"));
            collectionsCode += this.generator.generateForCollection(current.name, current.fields);

            current.fields.forEach((f) => {
                if (f.relatedCollection && !this.generatedCollections.has(f.relatedCollection)) {
                    const mappedFields = getMappedFields(f.relatedCollection);
                    if (mappedFields.length > 0) {
                        collectionsToProcess.push({name: f.relatedCollection, fields: mappedFields});
                    }
                }
            });
        }

        let prefix = this.generator.getPrefix();
        const lang = this.options.language;

        if (lang === "php") {
            if (this.options.languageVersion) {
                prefix += `// Minimum supported PHP version: ${this.options.languageVersion}\n\n`;
            }
        } else if (lang === "python") {
            if (this.options.languageVersion) {
                prefix += `# Minimum supported Python version: ${this.options.languageVersion}+\n`;
            } else {
                prefix += "# Minimum supported Python version: 3.10+\n";
            }
        } else if (lang === "csharp") {
            prefix += "// Minimum supported C# version: 8.0+\n";
            prefix += "using System.Collections.Generic;\n\n";
        } else if (lang === "java") {
            prefix += "// Minimum supported Java version: 8+\n";
            const useVector = this.options.languageVersion === "vector";
            const listImpl = useVector ? "java.util.Vector" : "java.util.ArrayList";
            prefix += "import java.util.List;\n";
            prefix += `import ${listImpl};\n\n`;
        } else if (lang === "cpp") {
            prefix += "// Minimum supported C++ version: C++17 (due to std::variant and std::any)\n";
            // Add forward declarations for C++ only if we have multiple collections
            // or if there are relationships that might be circular
            const collectionNames = Array.from(allCollectionNames);

            if (collectionNames.length > 1) {
                collectionNames.forEach(name => {
                    prefix += `struct ${toPascalCase(name)};\n`;
                });
                prefix += "\n";
            }
        } else if (lang === "rust") {
            prefix += "// Minimum supported Rust version: 1.0+\n\n";
        } else if (lang === "go") {
            prefix += "// Minimum supported Go version: 1.0+\n\n";
        } else if (lang === "kotlin") {
            prefix += "// Minimum supported Kotlin version: 1.0+\n\n";
        } else if (lang === "ruby") {
            prefix += "# Minimum supported Ruby version: 2.0+\n\n";
        } else if (lang === "sql") {
            prefix += "-- Minimum supported SQL version: SQL:99+\n\n";
        } else if (lang === "graphql") {
            prefix += "# Minimum supported GraphQL version: October 2021\n\n";
        }

        let customTypesCode = "";
        if (this.usedGeometryTypes.size > 0 && this.options.language !== "sql") {
            customTypesCode = this.generator.generateCustomTypes(this.usedGeometryTypes);
        }

        // Re-generate collections to ensure they are included AFTER custom types (for C++)
        // and that they have access to the correctly populated usedGeometryTypes
        this.generatedCollections.clear();
        collectionsCode = "";
        while (initialCollections.length > 0) {
            const current = initialCollections.shift()!;
            current.fields = current.fields.filter(f => !f.field.startsWith("$"));
            collectionsCode += this.generator.generateForCollection(current.name, current.fields);

            current.fields.forEach((f) => {
                if (f.relatedCollection && !this.generatedCollections.has(f.relatedCollection)) {
                    const mappedFields = getMappedFields(f.relatedCollection);
                    if (mappedFields.length > 0) {
                        initialCollections.push({name: f.relatedCollection, fields: mappedFields});
                    }
                }
            });
        }

        return (prefix + customTypesCode + collectionsCode).trim() || `// Language ${this.options.language} not supported yet`;
    }

    private getGenerator(options: GeneratorOptions): BaseGenerator {
        const GeneratorClass = TypeGeneratorService.getGenerator(options.language);
        return new (GeneratorClass as any)(options);
    }
}
