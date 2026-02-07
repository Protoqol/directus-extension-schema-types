import {BaseGenerator, FieldInfo} from "./base-generator";

export class RustGenerator extends BaseGenerator {
    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = `pub struct ${collectionName} {\n`;
        fields.forEach((row) => {
            let rustType = this.getMappedType(row.type) || "String";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                rustType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                    rustType = `Vec<${rustType}>`;
                } else {
                    // All single relations should use Box to avoid issues with recursive types
                    rustType = `Box<${rustType}>`;
                }
            }

            let fieldName = row.field;
            if (this.getReservedKeywords().has(fieldName)) {
                fieldName = `custom_${fieldName}`;
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

    public generateCustomTypes(usedGeometryTypes: Set<string>): string {
        this.usedGeometryTypes = usedGeometryTypes;
        let code = "";
        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `pub struct Point { pub r#type: String, pub coordinates: [f64; 2] }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `pub struct LineString { pub r#type: String, pub coordinates: Vec<[f64; 2]> }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `pub struct Polygon { pub r#type: String, pub coordinates: Vec<Vec<[f64; 2]>> }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `pub struct MultiPoint { pub r#type: String, pub coordinates: Vec<[f64; 2]> }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `pub struct MultiLineString { pub r#type: String, pub coordinates: Vec<Vec<[f64; 2]>> }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `pub struct MultiPolygon { pub r#type: String, pub coordinates: Vec<Vec<Vec<[f64; 2]>>> }\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `pub enum Geometry { Point(Point), LineString(LineString), Polygon(Polygon), MultiPoint(MultiPoint), MultiLineString(MultiLineString), MultiPolygon(MultiPolygon) }\n`;
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
            "json"                    : "String",
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
        ]);
    }
}
