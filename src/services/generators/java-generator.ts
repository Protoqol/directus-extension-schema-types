import {BaseGenerator, FieldInfo} from "./base-generator";

export class JavaGenerator extends BaseGenerator {
    public static override getOptions(): { text: string; value: string }[] {
        return [
            {text: "ArrayList", value: "arraylist"},
            {text: "Vector", value: "vector"},
        ];
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = `public class ${collectionName} {\n`;
        fields.forEach((row) => {
            let javaType = this.getMappedType(row.type) || "Object";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                javaType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                    javaType = `List<${javaType}>`;
                }
            }

            let fieldName = row.field;
            if (this.getReservedKeywords().has(fieldName)) {
                fieldName = `custom_${fieldName}`;
            }

            code += `    private ${javaType} ${fieldName};\n`;
        });
        code += `}\n\n`;
        return code;
    }

    public generateCustomTypes(usedGeometryTypes: Set<string>): string {
        this.usedGeometryTypes = usedGeometryTypes;
        let code = "";
        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `public class Point { public String type = "Point"; public double[] coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `public class LineString { public String type = "LineString"; public double[][] coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `public class Polygon { public String type = "Polygon"; public double[][][] coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `public class MultiPoint { public String type = "MultiPoint"; public double[][] coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `public class MultiLineString { public String type = "MultiLineString"; public double[][][] coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `public class MultiPolygon { public String type = "MultiPolygon"; public double[][][][] coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `public class Geometry { }\n`;
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
