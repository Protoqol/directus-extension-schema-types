import {BaseGenerator, FieldInfo} from "./base-generator";

export class GoGenerator extends BaseGenerator {
    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);

        let code = `type ${collectionName} struct {\n`;

        fields.forEach((row) => {
            let goType = this.getMappedType(row.type) || "interface{}";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                goType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                    goType = `[]${goType}`;
                }
            }

            let fieldName = this.toPascalCase(row.field);

            const reserved = this.getReservedKeywords();
            if (reserved.has(row.field) || reserved.has(fieldName)) {
                fieldName = `Custom${fieldName}`;
            }

            if (!row.required && !goType.startsWith("[]")) {
                code += `  ${fieldName} *${goType} \`json:"${row.field}"\`\n`;
            } else {
                code += `  ${fieldName} ${goType} \`json:"${row.field}"\`\n`;
            }
        });

        code += `}\n\n`;

        return code;
    }

    public generateCustomTypes(usedGeometryTypes: Set<string>): string {
        this.usedGeometryTypes = usedGeometryTypes;
        let code = "";

        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `type Point struct { Type string \`json:"type"\`; Coordinates [2]float64 \`json:"coordinates"\` }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `type LineString struct { Type string \`json:"type"\`; Coordinates [][2]float64 \`json:"coordinates"\` }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `type Polygon struct { Type string \`json:"type"\`; Coordinates [][][2]float64 \`json:"coordinates"\` }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `type MultiPoint struct { Type string \`json:"type"\`; Coordinates [][2]float64 \`json:"coordinates"\` }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `type MultiLineString struct { Type string \`json:"type"\`; Coordinates [][][2]float64 \`json:"coordinates"\` }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `type MultiPolygon struct { Type string \`json:"type"\`; Coordinates [][][][2]float64 \`json:"coordinates"\` }\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `type Geometry interface{} \n`;
        }

        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "int64",
            "boolean"                 : "bool",
            "date"                    : "string",
            "dateTime"                : "string",
            "decimal"                 : "float64",
            "float"                   : "float32",
            "integer"                 : "int32",
            "json"                    : "map[string]interface{}",
            "string"                  : "string",
            "text"                    : "string",
            "time"                    : "string",
            "timestamp"               : "string",
            "binary"                  : "[]byte",
            "uuid"                    : "string",
            "alias"                   : "interface{}",
            "hash"                    : "string",
            "csv"                     : "[]string",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "interface{}",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set([
            "break", "default", "func", "interface", "select", "case", "defer", "go", "map", "struct", "chan", "else",
            "goto", "package", "switch", "const", "fallthrough", "if", "range", "type", "continue", "for", "import",
            "return", "var",
        ]);
    }
}
