import {BaseGenerator, FieldInfo} from "./base-generator";

export class CSharpGenerator extends BaseGenerator {

    public override getPrefix(_allCollectionNames?: Set<string>): string {
        let prefix = "// Minimum supported C# version: 8.0+\n";

        prefix += "using System.Collections.Generic;\n\n";

        return prefix;
    }

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

            code += `    public ${csharpType}${isNullable ? "?" : ""} ${fieldName} { get; set; }\n`;
        });

        code += `}\n\n`;

        return code;
    }

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }

        let code = "// Geometry types\n";

        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `public class Point {\n    public string Type { get; set; } = "Point";\n    public double[] Coordinates { get; set; } \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `public class LineString {\n    public string Type { get; set; } = "LineString";\n    public double[][] Coordinates { get; set; } \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `public class Polygon {\n    public string Type { get; set; } = "Polygon";\n    public double[][][] Coordinates { get; set; } \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `public class MultiPoint {\n    public string Type { get; set; } = "MultiPoint";\n    public double[][] Coordinates { get; set; } \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `public class MultiLineString {\n    public string Type { get; set; } = "MultiLineString";\n    public double[][][] Coordinates { get; set; } \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `public class MultiPolygon {\n    public string Type { get; set; } = "MultiPolygon";\n    public double[][][][] Coordinates { get; set; } \n}\n\n`;
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
