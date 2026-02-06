import {
    cppTypeMap,
    csharpTypeMap,
    goTypeMap,
    graphqlTypeMap,
    javaTypeMap,
    kotlinTypeMap,
    LanguageMapping,
    phpTypeMap,
    pythonTypeMap,
    rustTypeMap,
    sqlTypeMap,
    typescriptTypeMap,
} from "../mappings";

export interface FieldInfo {
    field: string;

    type: string;

    required: boolean;

    special: string[];

    relatedCollection?: string | null;
}

export interface GeneratorOptions {
    language: string;

    tsTypeStyle?: string;
}

export const toPascalCase = (str: string) => {
    return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase())
              .replace(/^(.)/, (_, c) => c.toUpperCase());
};

const getMappedType = (langMap: LanguageMapping, type: string) => {
    return langMap[type] || null;
};

export class TypeGeneratorService {
    private generatedCollections = new Set<string>();

    private usedGeometryTypes = new Set<string>();

    constructor(private options: GeneratorOptions) {
    }

    public async generate(
        mainCollection: string | null,
        mainFields: FieldInfo[],
        selectedCollections: string[],
        getMappedFields: (collection: string) => FieldInfo[],
    ): Promise<string> {
        this.generatedCollections.clear();
        this.usedGeometryTypes.clear();
        let fullCode = "";

        const collectionsToProcess: { name: string; fields: FieldInfo[] }[] = [];
        if (mainCollection) {
            collectionsToProcess.push({name: mainCollection, fields: mainFields});
        } else if (selectedCollections.length > 0) {
            selectedCollections.forEach((collName) => {
                collectionsToProcess.push({name: collName, fields: getMappedFields(collName)});
            });
        }

        while (collectionsToProcess.length > 0) {
            const current = collectionsToProcess.shift()!;
            fullCode += this.generateForCollection(current.name, current.fields);

            current.fields.forEach((f) => {
                if (f.relatedCollection && !this.generatedCollections.has(f.relatedCollection)) {
                    const mappedFields = getMappedFields(f.relatedCollection);
                    if (mappedFields.length > 0) {
                        collectionsToProcess.push({name: f.relatedCollection, fields: mappedFields});
                    }
                }
            });
        }

        if (this.usedGeometryTypes.size > 0 && this.options.language !== "sql") {
            fullCode += this.generateCustomTypes();
        }

        return fullCode.trim() || `// Language ${this.options.language} not supported yet`;
    }

    private generateForCollection(collection: string, fields: FieldInfo[]): string {
        if (this.generatedCollections.has(collection)) {
            return "";
        }
        this.generatedCollections.add(collection);

        const collectionName = toPascalCase(collection);
        const lang = this.options.language;
        let code = "";

        if (lang === "php") {
            code += "<?php\n\n";
        }

        if (lang === "typescript") {
            if (this.options.tsTypeStyle === "interface") {
                code += `export interface ${collectionName} {\n`;
            } else {
                code += `export type ${collectionName} = {\n`;
            }

            fields.forEach((row) => {
                let tsType = getMappedType(typescriptTypeMap, row.type) || "any";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    tsType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        tsType += "[]";
                    }
                }
                code += `  ${row.field}${row.required ? "" : "?"}: ${tsType};\n`;
            });
            code += this.options.tsTypeStyle === "interface" ? `}\n\n` : `};\n\n`;
        } else if (lang === "rust") {
            code += `pub struct ${collectionName} {\n`;
            fields.forEach((row) => {
                let rustType = getMappedType(rustTypeMap, row.type) || "String";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    rustType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        rustType = `Vec<${rustType}>`;
                    }
                }
                if (!row.required && !rustType.startsWith("Vec<")) {
                    code += `  pub ${row.field}: Option<${rustType}>,\n`;
                } else {
                    code += `  pub ${row.field}: ${rustType},\n`;
                }
            });
            code += `}\n\n`;
        } else if (lang === "php") {
            code += `class ${collectionName}\n{\n`;
            fields.forEach((row) => {
                let phpType = getMappedType(phpTypeMap, row.type) || "mixed";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    phpType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        phpType = "array";
                    }
                }
                code += `    public ${row.required ? "" : "?"}${phpType} $${row.field};\n`;
            });
            code += `}\n\n`;
        } else if (lang === "csharp") {
            code += `public class ${collectionName}\n{\n`;
            fields.forEach((row) => {
                let csharpType = getMappedType(csharpTypeMap, row.type) || "object";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    csharpType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        csharpType = `List<${csharpType}>`;
                    }
                }
                const isNullable = !row.required && ["int", "long", "decimal", "double", "float", "bool", "Guid", "DateTime", "TimeSpan"].includes(csharpType);
                code += `    public ${csharpType}${isNullable ? "?" : ""} ${toPascalCase(row.field)} { get; set; }\n`;
            });
            code += `}\n\n`;
        } else if (lang === "java") {
            code += `public class ${collectionName} {\n`;
            fields.forEach((row) => {
                let javaType = getMappedType(javaTypeMap, row.type) || "Object";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    javaType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        javaType = `List<${javaType}>`;
                    }
                }
                code += `    private ${javaType} ${row.field};\n`;
            });
            code += `}\n\n`;
        } else if (lang === "python") {
            code += `class ${collectionName}:\n`;
            fields.forEach((row) => {
                let pythonType = getMappedType(pythonTypeMap, row.type) || "Any";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    pythonType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        pythonType = `List['${pythonType}']`;
                    }
                }
                if (!row.required) {
                    code += `    ${row.field}: ${pythonType} = None\n`;
                } else {
                    code += `    ${row.field}: ${pythonType}\n`;
                }
            });
            code += "\n";
        } else if (lang === "go") {
            code += `type ${collectionName} struct {\n`;
            fields.forEach((row) => {
                let goType = getMappedType(goTypeMap, row.type) || "interface{}";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    goType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        goType = `[]${goType}`;
                    }
                }
                const fieldName = toPascalCase(row.field);
                if (!row.required && !goType.startsWith("[]")) {
                    code += `  ${fieldName} *${goType} \`json:"${row.field}"\`\n`;
                } else {
                    code += `  ${fieldName} ${goType} \`json:"${row.field}"\`\n`;
                }
            });
            code += `}\n\n`;
        } else if (lang === "cpp") {
            code += `struct ${collectionName} {\n`;
            fields.forEach((row) => {
                let cppType = getMappedType(cppTypeMap, row.type) || "void*";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    cppType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        cppType = `std::vector<${cppType}>`;
                    }
                }
                code += `  ${cppType} ${row.field};\n`;
            });
            code += `};\n\n`;
        } else if (lang === "ruby") {
            code += `class ${collectionName}\n  attr_accessor `;
            code += fields.map((row) => `:${row.field}`).join(", ");
            code += "\n\n  def initialize(params = {})\n";
            fields.forEach((row) => {
                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }
                code += `    @${row.field} = params[:${row.field}]\n`;
            });
            code += "  end\nend\n\n";
        } else if (lang === "sql") {
            code += `CREATE TABLE ${collection.toLowerCase()}
                     (  `;
            fields.forEach((row, index) => {
                let sqlType = getMappedType(sqlTypeMap, row.type) || "TEXT";
                code += `  ${row.field} ${sqlType}${row.required ? " NOT NULL" : ""}${index === fields.length - 1 ? "" : ","}\n`;
            });
            code += ");\n\n";
        } else if (lang === "kotlin") {
            code += `data class ${collectionName}(\n`;
            fields.forEach((row, index) => {
                let kotlinType = getMappedType(kotlinTypeMap, row.type) || "Any";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    kotlinType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        kotlinType = `List<${kotlinType}>`;
                    }
                }
                code += `  val ${row.field}: ${kotlinType}${row.required ? "" : "?"}${index === fields.length - 1 ? "" : ","}\n`;
            });
            code += ")\n\n";
        } else if (lang === "graphql") {
            code += `type ${collectionName} {\n`;
            fields.forEach((row) => {
                let gqlType = getMappedType(graphqlTypeMap, row.type) || "JSON";

                if (row.type.startsWith("geometry")) {
                    this.usedGeometryTypes.add(row.type);
                }

                if (row.relatedCollection) {
                    gqlType = toPascalCase(row.relatedCollection);
                    if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                        gqlType = `[${gqlType}]`;
                    }
                }
                code += `  ${row.field}: ${gqlType}${row.required ? "!" : ""}\n`;
            });
            code += "}\n\n";
        }

        return code;
    }

    private generateCustomTypes(): string {
        const lang = this.options.language;
        let code = "\n";

        const hasPoint = this.usedGeometryTypes.has("geometry.Point");
        const hasLineString = this.usedGeometryTypes.has("geometry.LineString");
        const hasPolygon = this.usedGeometryTypes.has("geometry.Polygon");
        const hasMultiPoint = this.usedGeometryTypes.has("geometry.MultiPoint");
        const hasMultiLineString = this.usedGeometryTypes.has("geometry.MultiLineString");
        const hasMultiPolygon = this.usedGeometryTypes.has("geometry.MultiPolygon");
        const hasGeometry = this.usedGeometryTypes.has("geometry");

        if (lang === "typescript") {
            if (hasPoint) {
                code += `export type Point = { type: 'Point'; coordinates: [number, number] };\n`;
            }
            if (hasLineString) {
                code += `export type LineString = { type: 'LineString'; coordinates: [number, number][] };\n`;
            }
            if (hasPolygon) {
                code += `export type Polygon = { type: 'Polygon'; coordinates: [number, number][][] };\n`;
            }
            if (hasMultiPoint) {
                code += `export type MultiPoint = { type: 'MultiPoint'; coordinates: [number, number][] };\n`;
            }
            if (hasMultiLineString) {
                code += `export type MultiLineString = { type: 'MultiLineString'; coordinates: [number, number][][] };\n`;
            }
            if (hasMultiPolygon) {
                code += `export type MultiPolygon = { type: 'MultiPolygon'; coordinates: [number, number][][][] };\n`;
            }
            if (hasGeometry) {
                code += `export type Geometry = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;\n`;
            }
        } else if (lang === "rust") {
            if (hasPoint) {
                code += `pub struct Point { pub r#type: String, pub coordinates: Vec<f64> }\n`;
            }
            if (hasLineString) {
                code += `pub struct LineString { pub r#type: String, pub coordinates: Vec<Vec<f64>> }\n`;
            }
            if (hasPolygon) {
                code += `pub struct Polygon { pub r#type: String, pub coordinates: Vec<Vec<Vec<f64>>> }\n`;
            }
            if (hasMultiPoint) {
                code += `pub struct MultiPoint { pub r#type: String, pub coordinates: Vec<Vec<f64>> }\n`;
            }
            if (hasMultiLineString) {
                code += `pub struct MultiLineString { pub r#type: String, pub coordinates: Vec<Vec<Vec<f64>>> }\n`;
            }
            if (hasMultiPolygon) {
                code += `pub struct MultiPolygon { pub r#type: String, pub coordinates: Vec<Vec<Vec<Vec<f64>>>> }\n`;
            }
            if (hasGeometry) {
                code += `pub enum Geometry { Point(Point), LineString(LineString), Polygon(Polygon), MultiPoint(MultiPoint), MultiLineString(MultiLineString), MultiPolygon(MultiPolygon) }\n`;
            }
        } else if (lang === "php") {
            if (hasPoint) {
                code += `class Point { public string $type = 'Point'; public array $coordinates; }\n`;
            }
            if (hasLineString) {
                code += `class LineString { public string $type = 'LineString'; public array $coordinates; }\n`;
            }
            if (hasPolygon) {
                code += `class Polygon { public string $type = 'Polygon'; public array $coordinates; }\n`;
            }
            if (hasMultiPoint) {
                code += `class MultiPoint { public string $type = 'MultiPoint'; public array $coordinates; }\n`;
            }
            if (hasMultiLineString) {
                code += `class MultiLineString { public string $type = 'MultiLineString'; public array $coordinates; }\n`;
            }
            if (hasMultiPolygon) {
                code += `class MultiPolygon { public string $type = 'MultiPolygon'; public array $coordinates; }\n`;
            }
            if (hasGeometry) {
                code += `type Geometry = Point|LineString|Polygon|MultiPoint|MultiLineString|MultiPolygon;\n`;
            }
        } else if (lang === "csharp") {
            if (hasPoint) {
                code += `public class Point { public string Type { get; set; } = "Point"; public double[] Coordinates { get; set; } }\n`;
            }
            if (hasLineString) {
                code += `public class LineString { public string Type { get; set; } = "LineString"; public double[][] Coordinates { get; set; } }\n`;
            }
            if (hasPolygon) {
                code += `public class Polygon { public string Type { get; set; } = "Polygon"; public double[][][] Coordinates { get; set; } }\n`;
            }
            if (hasMultiPoint) {
                code += `public class MultiPoint { public string Type { get; set; } = "MultiPoint"; public double[][] Coordinates { get; set; } }\n`;
            }
            if (hasMultiLineString) {
                code += `public class MultiLineString { public string Type { get; set; } = "MultiLineString"; public double[][][] Coordinates { get; set; } }\n`;
            }
            if (hasMultiPolygon) {
                code += `public class MultiPolygon { public string Type { get; set; } = "MultiPolygon"; public double[][][][] Coordinates { get; set; } }\n`;
            }
            if (hasGeometry) {
                code += `public class Geometry { /* Union of above types */ }\n`;
            }
        } else if (lang === "java") {
            if (hasPoint) {
                code += `public class Point { public String type = "Point"; public double[] coordinates; }\n`;
            }
            if (hasLineString) {
                code += `public class LineString { public String type = "LineString"; public double[][] coordinates; }\n`;
            }
            if (hasPolygon) {
                code += `public class Polygon { public String type = "Polygon"; public double[][][] coordinates; }\n`;
            }
            if (hasMultiPoint) {
                code += `public class MultiPoint { public String type = "MultiPoint"; public double[][] coordinates; }\n`;
            }
            if (hasMultiLineString) {
                code += `public class MultiLineString { public String type = "MultiLineString"; public double[][][] coordinates; }\n`;
            }
            if (hasMultiPolygon) {
                code += `public class MultiPolygon { public String type = "MultiPolygon"; public double[][][][] coordinates; }\n`;
            }
            if (hasGeometry) {
                code += `public class Geometry { /* Union of above types */ }\n`;
            }
        } else if (lang === "python") {
            if (hasPoint) {
                code += `class Point: type: str = "Point"; coordinates: list[float]\n`;
            }
            if (hasLineString) {
                code += `class LineString: type: str = "LineString"; coordinates: list[list[float]]\n`;
            }
            if (hasPolygon) {
                code += `class Polygon: type: str = "Polygon"; coordinates: list[list[list[float]]]\n`;
            }
            if (hasMultiPoint) {
                code += `class MultiPoint: type: str = "MultiPoint"; coordinates: list[list[float]]\n`;
            }
            if (hasMultiLineString) {
                code += `class MultiLineString: type: str = "MultiLineString"; coordinates: list[list[list[float]]]\n`;
            }
            if (hasMultiPolygon) {
                code += `class MultiPolygon: type: str = "MultiPolygon"; coordinates: list[list[list[list[float]]]]\n`;
            }
            if (hasGeometry) {
                code += `Geometry = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon\n`;
            }
        } else if (lang === "go") {
            if (hasPoint) {
                code += `type Point struct { Type string \`json:"type"\`; Coordinates []float64 \`json:"coordinates"\` }\n`;
            }
            if (hasLineString) {
                code += `type LineString struct { Type string \`json:"type"\`; Coordinates [][]float64 \`json:"coordinates"\` }\n`;
            }
            if (hasPolygon) {
                code += `type Polygon struct { Type string \`json:"type"\`; Coordinates [][][]float64 \`json:"coordinates"\` }\n`;
            }
            if (hasMultiPoint) {
                code += `type MultiPoint struct { Type string \`json:"type"\`; Coordinates [][]float64 \`json:"coordinates"\` }\n`;
            }
            if (hasMultiLineString) {
                code += `type MultiLineString struct { Type string \`json:"type"\`; Coordinates [][][]float64 \`json:"coordinates"\` }\n`;
            }
            if (hasMultiPolygon) {
                code += `type MultiPolygon struct { Type string \`json:"type"\`; Coordinates [][][][]float64 \`json:"coordinates"\` }\n`;
            }
            if (hasGeometry) {
                code += `type Geometry interface{}\n`;
            }
        } else if (lang === "cpp") {
            if (hasPoint) {
                code += `struct Point { std::string type = "Point"; std::vector<double> coordinates; };\n`;
            }
            if (hasLineString) {
                code += `struct LineString { std::string type = "LineString"; std::vector<std::vector<double>> coordinates; };\n`;
            }
            if (hasPolygon) {
                code += `struct Polygon { std::string type = "Polygon"; std::vector<std::vector<std::vector<double>>> coordinates; };\n`;
            }
            if (hasMultiPoint) {
                code += `struct MultiPoint { std::string type = "MultiPoint"; std::vector<std::vector<double>> coordinates; };\n`;
            }
            if (hasMultiLineString) {
                code += `struct MultiLineString { std::string type = "MultiLineString"; std::vector<std::vector<std::vector<double>>> coordinates; };\n`;
            }
            if (hasMultiPolygon) {
                code += `struct MultiPolygon { std::string type = "MultiPolygon"; std::vector<std::vector<std::vector<std::vector<double>>>> coordinates; };\n`;
            }
            if (hasGeometry) {
                code += `using Geometry = std::variant<Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon>;\n`;
            }
        } else if (lang === "ruby") {
            if (hasPoint) {
                code += `class Point; attr_accessor :type, :coordinates; end\n`;
            }
            if (hasLineString) {
                code += `class LineString; attr_accessor :type, :coordinates; end\n`;
            }
            if (hasPolygon) {
                code += `class Polygon; attr_accessor :type, :coordinates; end\n`;
            }
            if (hasMultiPoint) {
                code += `class MultiPoint; attr_accessor :type, :coordinates; end\n`;
            }
            if (hasMultiLineString) {
                code += `class MultiLineString; attr_accessor :type, :coordinates; end\n`;
            }
            if (hasMultiPolygon) {
                code += `class MultiPolygon; attr_accessor :type, :coordinates; end\n`;
            }
            if (hasGeometry) {
                code += `Geometry = Object # Representing the union\n`;
            }
        } else if (lang === "kotlin") {
            if (hasPoint) {
                code += `data class Point(val type: String = "Point", val coordinates: List<Double>)\n`;
            }
            if (hasLineString) {
                code += `data class LineString(val type: String = "LineString", val coordinates: List<List<Double>>)\n`;
            }
            if (hasPolygon) {
                code += `data class Polygon(val type: String = "Polygon", val coordinates: List<List<List<Double>>>)\n`;
            }
            if (hasMultiPoint) {
                code += `data class MultiPoint(val type: String = "MultiPoint", val coordinates: List<List<Double>>)\n`;
            }
            if (hasMultiLineString) {
                code += `data class MultiLineString(val type: String = "MultiLineString", val coordinates: List<List<List<Double>>>)\n`;
            }
            if (hasMultiPolygon) {
                code += `data class MultiPolygon(val type: String = "MultiPolygon", val coordinates: List<List<List<List<Double>>>>)\n`;
            }
            if (hasGeometry) {
                code += `typealias Geometry = Any\n`;
            }
        } else if (lang === "graphql") {
            code += `scalar JSON\n\n`;
            if (hasPoint) {
                code += `type Point { type: String!, coordinates: [Float!]! }\n`;
            }
            if (hasLineString) {
                code += `type LineString { type: String!, coordinates: [[Float!]!]! }\n`;
            }
            if (hasPolygon) {
                code += `type Polygon { type: String!, coordinates: [[[Float!]!]!]! }\n`;
            }
            if (hasMultiPoint) {
                code += `type MultiPoint { type: String!, coordinates: [[Float!]!]! }\n`;
            }
            if (hasMultiLineString) {
                code += `type MultiLineString { type: String!, coordinates: [[[Float!]!]!]! }\n`;
            }
            if (hasMultiPolygon) {
                code += `type MultiPolygon { type: String!, coordinates: [[[[Float!]!]!]!]! }\n`;
            }
            if (hasGeometry) {
                code += `union Geometry = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon\n`;
            }
        }

        return code;
    }
}
