import {BaseGenerator, FieldInfo} from "./base-generator";

export class PHPGenerator extends BaseGenerator {
    public static override getOptions(): { text: string; value: string }[] {
        return [
            {text: "PHP 8.2+", value: "8.2"},
            {text: "PHP 8.1+", value: "8.1"},
            {text: "PHP 8.0+", value: "8.0"},
            {text: "PHP 7.4+", value: "7.4"},
            {text: "PHP 5.6+", value: "5.6"},
        ];
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = `class ${collectionName}\n{\n`;
        fields.forEach((row) => {
            let phpType = this.getMappedType(row.type) || "mixed";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                phpType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                    phpType = "array";
                }
            }

            let fieldName = row.field;
            if (this.getReservedKeywords().has(fieldName)) {
                fieldName = `custom_${fieldName}`;
            }

            const phpVersion = this.options.languageVersion ? parseFloat(this.options.languageVersion) : 8.2;
            const isReadonly = phpVersion >= 8.1;
            const hasPropertyTypeHints = phpVersion >= 7.4;

            if (phpType === "mixed") {
                if (phpVersion >= 8.0) {
                    code += `    public ${isReadonly ? "readonly " : ""}mixed $${fieldName};\n`;
                } else {
                    code += `    public $${fieldName};\n`;
                }
            } else if (!hasPropertyTypeHints) {
                code += `    public $${fieldName};\n`;
            } else {
                code += `    public ${isReadonly ? "readonly " : ""}${row.required ? "" : "?"}${phpType} $${fieldName};\n`;
            }
        });
        code += `}\n\n`;
        return code;
    }

    public generateCustomTypes(usedGeometryTypes: Set<string>): string {
        this.usedGeometryTypes = usedGeometryTypes;
        let code = "";
        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `class Point { public string $type = 'Point'; public array $coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `class LineString { public string $type = 'LineString'; public array $coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `class Polygon { public string $type = 'Polygon'; public array $coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `class MultiPoint { public string $type = 'MultiPoint'; public array $coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `class MultiLineString { public string $type = 'MultiLineString'; public array $coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `class MultiPolygon { public string $type = 'MultiPolygon'; public array $coordinates; }\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `class Geometry { }\n`;
        }
        return code;
    }

    public getPrefix(): string {
        let prefix = "<?php\n\n";
        return prefix;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "int",
            "boolean"                 : "bool",
            "date"                    : "string",
            "dateTime"                : "string",
            "decimal"                 : "float",
            "float"                   : "float",
            "integer"                 : "int",
            "json"                    : "array",
            "string"                  : "string",
            "text"                    : "string",
            "time"                    : "string",
            "timestamp"               : "string",
            "binary"                  : "string",
            "uuid"                    : "string",
            "alias"                   : "mixed",
            "hash"                    : "string",
            "csv"                     : "array",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "mixed",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set([
            "__halt_compiler", "abstract", "and", "array", "as", "break", "callable", "case", "catch", "class", "clone",
            "const", "continue", "declare", "default", "die", "do", "echo", "else", "elseif", "empty", "enddeclare",
            "endfor", "endforeach", "endif", "endswitch", "endwhile", "eval", "exit", "extends", "final", "finally",
            "for", "foreach", "function", "global", "goto", "if", "implements", "include", "include_once", "instanceof",
            "insteadof", "interface", "isset", "list", "namespace", "new", "or", "print", "private", "protected",
            "public", "require", "require_once", "return", "static", "switch", "throw", "trait", "try", "unset", "use",
            "var", "while", "xor", "yield",
        ]);
    }
}
