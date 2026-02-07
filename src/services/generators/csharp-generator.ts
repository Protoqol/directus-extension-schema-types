import {BaseGenerator, FieldInfo} from "./base-generator";

export class CSharpGenerator extends BaseGenerator {
    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = `public class ${collectionName}\n{\n`;
        fields.forEach((row) => {
            let csharpType = this.getMappedType(row.type) || "object";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                csharpType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                    csharpType = `List<${csharpType}>`;
                }
            }

            let fieldName = this.toPascalCase(row.field);
            const reserved = this.getReservedKeywords();
            if (reserved.has(row.field) || reserved.has(fieldName.toLowerCase())) {
                fieldName = `@${fieldName}`;
            }

            const isNullable = !row.required && ["int", "long", "decimal", "double", "float", "bool", "Guid", "DateTime", "TimeSpan"].includes(csharpType);
            code += `    public ${csharpType}${isNullable ? "?" : ""} ${fieldName} { get; set; }\n`;
        });
        code += `}\n\n`;
        return code;
    }

    public generateCustomTypes(usedGeometryTypes: Set<string>): string {
        this.usedGeometryTypes = usedGeometryTypes;
        let code = "";
        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `public class Point { public string Type { get; set; } = "Point"; public double[] Coordinates { get; set; } }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `public class LineString { public string Type { get; set; } = "LineString"; public double[][] Coordinates { get; set; } }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `public class Polygon { public string Type { get; set; } = "Polygon"; public double[][][] Coordinates { get; set; } }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `public class MultiPoint { public string Type { get; set; } = "MultiPoint"; public double[][] Coordinates { get; set; } }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `public class MultiLineString { public string Type { get; set; } = "MultiLineString"; public double[][][] Coordinates { get; set; } }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `public class MultiPolygon { public string Type { get; set; } = "MultiPolygon"; public double[][][][] Coordinates { get; set; } }\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `public class Geometry { }\n`;
        }
        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "long",
            "boolean"                 : "bool",
            "date"                    : "string",
            "dateTime"                : "string",
            "decimal"                 : "decimal",
            "float"                   : "float",
            "integer"                 : "int",
            "json"                    : "string",
            "string"                  : "string",
            "text"                    : "string",
            "time"                    : "string",
            "timestamp"               : "string",
            "binary"                  : "byte[]",
            "uuid"                    : "string",
            "alias"                   : "object",
            "hash"                    : "string",
            "csv"                     : "string[]",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "object",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set([
            "abstract", "as", "base", "bool", "break", "byte", "case", "catch", "char", "checked", "class", "const",
            "continue", "decimal", "default", "delegate", "do", "double", "else", "enum", "event", "explicit", "extern",
            "false", "finally", "fixed", "float", "for", "foreach", "goto", "if", "implicit", "in", "int", "interface",
            "internal", "is", "lock", "long", "namespace", "new", "null", "object", "operator", "out", "override",
            "params", "private", "protected", "public", "readonly", "ref", "return", "sbyte", "sealed", "short",
            "sizeof", "stackalloc", "static", "string", "struct", "switch", "this", "throw", "true", "try", "typeof",
            "uint", "ulong", "unchecked", "unsafe", "ushort", "using", "virtual", "void", "volatile", "while",
        ]);
    }
}
