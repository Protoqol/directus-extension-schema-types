import {BaseGenerator, FieldInfo} from "./base-generator";

export class GraphQLGenerator extends BaseGenerator {
    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = `type ${collectionName} {\n`;
        fields.forEach((row) => {
            let gqlType = this.getMappedType(row.type) || "Json";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                gqlType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                    gqlType = `[${gqlType}]`;
                }
            }
            code += `  ${row.field}: ${gqlType}${row.required ? "!" : ""}\n`;
        });
        code += "}\n\n";
        return code;
    }

    public generateCustomTypes(usedGeometryTypes: Set<string>): string {
        this.usedGeometryTypes = usedGeometryTypes;
        let code = "";
        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `type Point { type: String!, coordinates: [Float!]! }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `type LineString { type: String!, coordinates: [[Float!]!]! }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `type Polygon { type: String!, coordinates: [[[Float!]!]!]! }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `type MultiPoint { type: String!, coordinates: [[Float!]!]! }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `type MultiLineString { type: String!, coordinates: [[[Float!]!]!]! }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `type MultiPolygon { type: String!, coordinates: [[[[Float!]!]!]!]! }\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `union Geometry = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon\n`;
        }
        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "Int",
            "boolean"                 : "Boolean",
            "date"                    : "String",
            "dateTime"                : "String",
            "decimal"                 : "Float",
            "float"                   : "Float",
            "integer"                 : "Int",
            "json"                    : "Json",
            "string"                  : "String",
            "text"                    : "String",
            "time"                    : "String",
            "timestamp"               : "String",
            "binary"                  : "String",
            "uuid"                    : "String",
            "alias"                   : "Json",
            "hash"                    : "String",
            "csv"                     : "[String]",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "Json",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set();
    }
}
