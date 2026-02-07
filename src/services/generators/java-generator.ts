import {BaseGenerator, FieldInfo} from "./base-generator";

export class JavaGenerator extends BaseGenerator {

    public static override getOptions(): { text: string; value: string }[] {
        return [
            {text: "Java 14+", value: "14"},
            {text: "Java 8+", value: "8"},
            {text: "Java 8+ (Lombok)", value: "8_lombok"},
        ];
    }

    public override getPrefix(_allCollectionNames?: Set<string>): string {
        let prefix = `// Minimum supported Java version: ${this.options.languageVersion}`;

        if (this.options.languageVersion === "14") {
            prefix += "\n// Assumes --enable-preview";
        }

        prefix += "\nimport java.util.List;\n\n";

        return prefix;
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);

        let code = "";

        if (this.options.languageVersion === "8_lombok" || this.options.languageVersion === "8") {
            code = `public class ${collectionName} {\n`;

            const fieldDeclarations: string[] = [];
            const accessors: string[] = [];

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
                    accessors.push(`    /**\n     * Getter for the field '${fieldName}'.\n     * @return value of the field '${fieldName}'.\n     */`);
                    accessors.push(`    public ${javaType} get${this.toPascalCase(fieldName)}() { return ${fieldName}; }`);
                    accessors.push(``);
                    accessors.push(`    /**\n     * Setter for the field '${fieldName}'.\n     * @param ${fieldName} - new value of the field '${fieldName}'.\n     */`);
                    accessors.push(`    public void set${this.toPascalCase(fieldName)}(${javaType} ${fieldName}) { this.${fieldName} = ${fieldName}; }`);
                    accessors.push(``);
                }
            });

            code += fieldDeclarations.join("\n") + "\n";
            if (accessors.length > 0) {
                code += "\n" + accessors.join("\n");
            }

            code += `}\n\n`;
        } else {
            const components: string[] = [];

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

            code = `public record ${collectionName}(\n    ${components.join(",\n    ")}\n) {}\n\n`;
        }

        return code;
    }

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }

        let code = "";

        if (this.options.languageVersion === "8_lombok") {
            if (this.usedGeometryTypes.has("geometry.Point")) {
                code += `@Getter @Setter\npublic class Point {\n    private String type = "Point";\n    private double[] coordinates; \n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.LineString")) {
                code += `@Getter @Setter\npublic class LineString {\n    private String type = "LineString";\n    private double[][] coordinates; \n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.Polygon")) {
                code += `@Getter @Setter\npublic class Polygon {\n    private String type = "Polygon";\n    private double[][][] coordinates; \n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
                code += `@Getter @Setter\npublic class MultiPoint {\n    private String type = "MultiPoint";\n    private double[][] coordinates; \n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
                code += `@Getter @Setter\npublic class MultiLineString {\n    private String type = "MultiLineString";\n    private double[][][] coordinates; \n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
                code += `@Getter @Setter\npublic class MultiPolygon {\n    private String type = "MultiPolygon";\n    private double[][][][] coordinates; \n}\n\n`;
            }
        } else if (this.options.languageVersion === "14" || this.options.languageVersion === "17" || this.options.languageVersion === "21") {
            if (this.usedGeometryTypes.has("geometry.Point")) {
                code += `public record Point(double[] coordinates) {\n    public String type() {\n        return "Point";\n    }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.LineString")) {
                code += `public record LineString(double[][] coordinates) {\n    public String type() {\n        return "LineString";\n    }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.Polygon")) {
                code += `public record Polygon(double[][][] coordinates) {\n    public String type() {\n        return "Polygon";\n    }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
                code += `public record MultiPoint(double[][] coordinates) {\n    public String type() {\n        return "MultiPoint";\n    }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
                code += `public record MultiLineString(double[][][] coordinates) {\n    public String type() {\n        return "MultiLineString";\n    }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
                code += `public record MultiPolygon(double[][][][] coordinates) {\n    public String type() {\n        return "MultiPolygon";\n    }\n}\n\n`;
            }
        } else {
            if (this.usedGeometryTypes.has("geometry.Point")) {
                code += `public class Point {\n    private String type = "Point";\n    private double[] coordinates;\n\n    public String getType() { return type; }\n    public double[] getCoordinates() { return coordinates; }\n\n    public void setType(String type) { this.type = type; }\n    public void setCoordinates(double[] coordinates) { this.coordinates = coordinates; }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.LineString")) {
                code += `public class LineString {\n    private String type = "LineString";\n    private double[][] coordinates;\n\n    public String getType() { return type; }\n    public double[][] getCoordinates() { return coordinates; }\n\n    public void setType(String type) { this.type = type; }\n    public void setCoordinates(double[][] coordinates) { this.coordinates = coordinates; }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.Polygon")) {
                code += `public class Polygon {\n    private String type = "Polygon";\n    private double[][][] coordinates;\n\n    public String getType() { return type; }\n    public double[][][] getCoordinates() { return coordinates; }\n\n    public void setType(String type) { this.type = type; }\n    public void setCoordinates(double[][][] coordinates) { this.coordinates = coordinates; }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
                code += `public class MultiPoint {\n    private String type = "MultiPoint";\n    private double[][] coordinates;\n\n    public String getType() { return type; }\n    public double[][] getCoordinates() { return coordinates; }\n\n    public void setType(String type) { this.type = type; }\n    public void setCoordinates(double[][] coordinates) { this.coordinates = coordinates; }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
                code += `public class MultiLineString {\n    private String type = "MultiLineString";\n    private double[][][] coordinates;\n\n    public String getType() { return type; }\n    public double[][][] getCoordinates() { return coordinates; }\n\n    public void setType(String type) { this.type = type; }\n    public void setCoordinates(double[][][] coordinates) { this.coordinates = coordinates; }\n}\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
                code += `public class MultiPolygon {\n    private String type = "MultiPolygon";\n    private double[][][][] coordinates;\n\n    public String getType() { return type; }\n    public double[][][][] getCoordinates() { return coordinates; }\n\n    public void setType(String type) { this.type = type; }\n    public void setCoordinates(double[][][][] coordinates) { this.coordinates = coordinates; }\n}\n\n`;
            }
        }

        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "Long",
            "boolean"                 : "Boolean",
            "date"                    : "String",
            "dateTime"                : "String",
            "decimal"                 : "Double",
            "float"                   : "Float",
            "integer"                 : "Integer",
            "json"                    : "String",
            "string"                  : "String",
            "text"                    : "String",
            "time"                    : "String",
            "timestamp"               : "String",
            "binary"                  : "byte[]",
            "uuid"                    : "String",
            "alias"                   : "Object",
            "hash"                    : "String",
            "csv"                     : "List<String>",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "Object",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set([
            "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue",
            "default", "do", "double", "else", "enum", "extends", "final", "finally", "float", "for", "goto", "if",
            "implements", "import", "instanceof", "int", "interface", "long", "native", "new", "package", "private",
            "protected", "public", "return", "short", "static", "strictfp", "super", "switch", "synchronized", "this",
            "throw", "throws", "transient", "try", "void", "volatile", "while",
        ]);
    }
}
