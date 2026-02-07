import {BaseGenerator, FieldInfo} from "./base-generator";

export class TypeScriptGenerator extends BaseGenerator {
    public static override getOptions(): { text: string; value: string }[] {
        return [
            {text: "Interface", value: "interface"},
            {text: "Type", value: "type"},
        ];
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = "";

        if (this.options.tsTypeStyle === "interface") {
            code += `export interface ${collectionName} {\n`;
        } else {
            code += `export type ${collectionName} = {\n`;
        }

        fields.forEach((row) => {
            let tsType = this.getMappedType(row.type) || "any";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                tsType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
                    tsType += "[]";
                }
            }
            code += `  ${row.field}${row.required ? "" : "?"}: ${tsType};\n`;
        });
        code += this.options.tsTypeStyle === "interface" ? `}\n\n` : `};\n\n`;
        return code;
    }

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }
        let code = "";

        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `export type Point = { type: 'Point'; coordinates: [number, number] };\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `export type LineString = { type: 'LineString'; coordinates: [number, number][] };\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `export type Polygon = { type: 'Polygon'; coordinates: [number, number][][] };\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `export type MultiPoint = { type: 'MultiPoint'; coordinates: [number, number][] };\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `export type MultiLineString = { type: 'MultiLineString'; coordinates: [number, number][][] };\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `export type MultiPolygon = { type: 'MultiPolygon'; coordinates: [number, number][][][] };\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `export type Geometry = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;\n`;
        }

        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "number",
            "boolean"                 : "boolean",
            "date"                    : "string",
            "dateTime"                : "string",
            "decimal"                 : "number",
            "float"                   : "number",
            "integer"                 : "number",
            "json"                    : "any",
            "string"                  : "string",
            "text"                    : "string",
            "time"                    : "string",
            "timestamp"               : "string",
            "binary"                  : "string",
            "uuid"                    : "string",
            "alias"                   : "any",
            "hash"                    : "string",
            "csv"                     : "string[]",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "any",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set();
    }
}
