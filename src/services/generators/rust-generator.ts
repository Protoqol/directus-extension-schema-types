import {BaseGenerator, FieldInfo} from "./base-generator";

export class RustGenerator extends BaseGenerator {

    public static override getOptions(): { text: string; value: string }[] {
        return [
            {text: "Serde", value: "serde"},
            {text: "Native", value: "native"},
        ];
    }

    public override getPrefix(_allCollectionNames?: Set<string>): string {
        let prefix = "// Minimum supported Rust version: 1.0+\n";

        if (this.options.languageVersion === "serde") {
            prefix += " #![warn(clippy::pedantic)]\nuse serde::{Serialize, Deserialize, Value};\n\n";
        }

        return prefix;
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = "";

        if (this.options.languageVersion === "serde") {
            code = `#[derive(Debug, Clone, Serialize, Deserialize)]\npub struct ${collectionName} {\n`;
        } else {
            code = `pub struct ${collectionName} {\n`;
        }

        fields.forEach((row) => {
            let rustType = this.getMappedType(row.type) || "String";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                rustType = this.toPascalCase(row.relatedCollection);

                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
                    rustType = `Vec<${rustType}>`;
                } else {
                    rustType = `Box<${rustType}>`;
                }
            }

            let fieldName = row.field;

            if (this.getReservedKeywords().has(fieldName)) {
                let originalFieldname = fieldName;
                fieldName = `r#${fieldName}`;

                if (this.options.languageVersion === "serde") {
                    code += `  #[serde(rename = "${originalFieldname}")]\n`;
                }
            }

            if (!row.required && !rustType.startsWith("Vec<")) {
                code += `  pub ${fieldName}: Option<${rustType}>,\n`;
            } else {
                code += `  pub ${fieldName}: ${rustType},\n`;
            }
        });

        code += `}\n\n`;

        return code;
    }

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }

        const serdeIncludes = this.options.languageVersion === "serde" ? "#[derive(Debug, Clone, Serialize, Deserialize)]\n" : "";

        let code = "// Geometry types\n";

        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `${serdeIncludes}pub struct Point {\n pub r#type: String,\n pub coordinates: [f64; 2] \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `${serdeIncludes}pub struct LineString {\n pub r#type: String,\n pub coordinates: Vec<[f64; 2]> \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `${serdeIncludes}pub struct Polygon {\n pub r#type: String,\n pub coordinates: Vec<Vec<[f64; 2]>> \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `${serdeIncludes}pub struct MultiPoint {\n pub r#type: String,\n pub coordinates: Vec<[f64; 2]> \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `${serdeIncludes}pub struct MultiLineString {\n pub r#type: String,\n pub coordinates: Vec<Vec<[f64; 2]>> \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `${serdeIncludes}pub struct MultiPolygon {\n pub r#type: String,\n pub coordinates: Vec<Vec<Vec<[f64; 2]>>> \n}\n\n`;
        }

        if (this.usedGeometryTypes.has("geometry")) {
            code += `${serdeIncludes}pub enum Geometry {\n Point(Point), \nLineString(LineString), \nPolygon(Polygon),\n MultiPoint(MultiPoint),\n MultiLineString(MultiLineString),\n MultiPolygon(MultiPolygon) \n}\n`;
        }

        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "i64",
            "boolean"                 : "bool",
            "date"                    : "String",
            "dateTime"                : "String",
            "decimal"                 : "f64",
            "float"                   : "f32",
            "integer"                 : "i32",
            "json"                    : this.options.languageVersion === "serde" ? "Value" : "String",
            "string"                  : "String",
            "text"                    : "String",
            "time"                    : "String",
            "timestamp"               : "String",
            "binary"                  : "Vec<u8>",
            "uuid"                    : "String",
            "alias"                   : "String",
            "hash"                    : "String",
            "csv"                     : "Vec<String>",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "String",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set([
            "as", "break", "const", "continue", "crate", "else", "enum", "extern", "false", "fn", "for", "if", "impl", "in",
            "let", "loop", "match", "mod", "move", "mut", "pub", "ref", "return", "self", "Self", "static", "struct",
            "super", "trait", "true", "type", "unsafe", "use", "where", "while", "async", "await", "dyn", "abstract",
            "become", "box", "do", "final", "macro", "override", "priv", "typeof", "unsized", "virtual", "yield", "try",
            "as", "break", "const", "continue", "crate", "else", "enum", "extern", "false", "fn", "for", "if", "impl", "in",
            "let", "loop", "match", "mod", "move", "mut", "pub", "ref", "return", "self", "Self", "static", "struct", "super", "trait",
            "true", "type", "unsafe", "use", "where", "while", "async", "await", "dyn",
        ]);
    }
}
