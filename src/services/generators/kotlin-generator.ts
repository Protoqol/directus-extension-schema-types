import {BaseGenerator, FieldInfo} from "./base-generator";

export class KotlinGenerator extends BaseGenerator {
    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = `data class ${collectionName}(\n`;
        fields.forEach((row, index) => {
            let kotlinType = this.getMappedType(row.type) || "Any";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                kotlinType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                    kotlinType = `List<${kotlinType}>`;
                }
            }
            code += `  val ${row.field}: ${kotlinType}${row.required ? "" : "?"}${index === fields.length - 1 ? "" : ","}\n`;
        });
        code += ")\n\n";
        return code;
    }

    public generateCustomTypes(usedGeometryTypes: Set<string>): string {
        this.usedGeometryTypes = usedGeometryTypes;
        let code = "";
        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `data class Point(val type: String = "Point", val coordinates: DoubleArray)\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `data class LineString(val type: String = "LineString", val coordinates: List<DoubleArray>)\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `data class Polygon(val type: String = "Polygon", val coordinates: List<List<DoubleArray>>)\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `data class MultiPoint(val type: String = "MultiPoint", val coordinates: List<DoubleArray>)\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `data class MultiLineString(val type: String = "MultiLineString", val coordinates: List<List<DoubleArray>>)\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `data class MultiPolygon(val type: String = "MultiPolygon", val coordinates: List<List<List<DoubleArray>>>)\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `interface Geometry\n`;
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
            "integer"                 : "Int",
            "json"                    : "String",
            "string"                  : "String",
            "text"                    : "String",
            "time"                    : "String",
            "timestamp"               : "String",
            "binary"                  : "ByteArray",
            "uuid"                    : "String",
            "alias"                   : "Any",
            "hash"                    : "String",
            "csv"                     : "List<String>",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "Any",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set();
    }
}
