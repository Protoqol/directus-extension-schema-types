import {BaseGenerator, FieldInfo} from "./base-generator";

export class KotlinGenerator extends BaseGenerator {
    public static override getOptions(): { text: string; value: string }[] {
        return [
            {text: "Standard", value: "standard"},
            {text: "kotlinx.serialization", value: "kotlinx_serialization"},
        ];
    }

    public override getPrefix(_allCollectionNames?: Set<string>): string {
        let prefix = "// Minimum supported Kotlin version: 1.0+\n";

        if (this.options.languageVersion === "kotlinx_serialization") {
            prefix += "import kotlinx.serialization.Serializable\n";
        }

        prefix += "\n";

        return prefix;
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);

        let code = "";

        if (this.options.languageVersion === "kotlinx_serialization") {
            code += "@Serializable\n";
        }

        code += `data class ${collectionName}(\n`;

        fields.forEach((row, index) => {
            let kotlinType = this.getMappedType(row.type) || "Any";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                kotlinType = this.toPascalCase(row.relatedCollection);

                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
                    kotlinType = `List<${kotlinType}>`;
                }
            }

            code += `  val ${row.field}: ${kotlinType}${row.required ? "" : "?"}${index === fields.length - 1 ? "" : ","}\n`;
        });

        code += ")\n\n";

        return code;
    }

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }

        let code = "";
        const serializable = this.options.languageVersion === "kotlinx_serialization" ? "@Serializable\n" : "";

        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `${serializable}data class Point(val type: String = "Point", val coordinates: DoubleArray)\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `${serializable}data class LineString(val type: String = "LineString", val coordinates: List<DoubleArray>)\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `${serializable}data class Polygon(val type: String = "Polygon", val coordinates: List<List<DoubleArray>>)\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `${serializable}data class MultiPoint(val type: String = "MultiPoint", val coordinates: List<DoubleArray>)\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `${serializable}data class MultiLineString(val type: String = "MultiLineString", val coordinates: List<List<DoubleArray>>)\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `${serializable}data class MultiPolygon(val type: String = "MultiPolygon", val coordinates: List<List<List<DoubleArray>>>)\n\n`;
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
