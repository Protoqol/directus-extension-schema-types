import {BaseGenerator, FieldInfo} from "./base-generator";

export class CPPGenerator extends BaseGenerator {
    public override getPrefix(allCollectionNames?: Set<string>): string {
        let prefix = "// Minimum supported C++ version: C++17\n";
        prefix += "#include <string>\n#include <vector>\n#include <memory>\n#include <optional>\n#include <any>\n#include <array>\n\n";

        if (allCollectionNames && allCollectionNames.size > 1) {
            allCollectionNames.forEach(name => {
                prefix += `struct ${this.toPascalCase(name)};\n`;
            });
            prefix += "\n";
        }

        return prefix;
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);

        let code = `struct ${collectionName} {\n`;

        fields.forEach((row) => {
            let cppType = this.getMappedType(row.type) || "void*";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            let isRelation = false;
            if (row.relatedCollection) {
                isRelation = true;
                cppType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
                    cppType = `std::vector<std::weak_ptr<${cppType}>>`;
                } else {
                    cppType = `std::shared_ptr<${cppType}>`;
                }
            }

            const isVector = cppType.startsWith("std::vector");

            if (!row.required && !isRelation && !isVector) {
                cppType = `std::optional<${cppType}>`;
            }

            let fieldName = row.field;

            if (this.getReservedKeywords().has(fieldName)) {
                fieldName = `custom_${fieldName}`;
            }

            code += `  ${cppType} ${fieldName};\n`;
        });

        code += `};\n\n`;

        return code;
    }

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }
        let code = "// Geometry types\n";

        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `struct Point { std::string type = "Point"; std::array<double, 2> coordinates; };\n`;
        }

        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `struct LineString { std::string type = "LineString"; std::vector<std::array<double, 2>> coordinates; };\n`;
        }

        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `struct Polygon { std::string type = "Polygon"; std::vector<std::vector<std::array<double, 2>>> coordinates; };\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `struct MultiPoint { std::string type = "MultiPoint"; std::vector<std::array<double, 2>> coordinates; };\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `struct MultiLineString { std::string type = "MultiLineString"; std::vector<std::vector<std::array<double, 2>>> coordinates; };\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `struct MultiPolygon { std::string type = "MultiPolygon"; std::vector<std::vector<std::vector<std::array<double, 2>>>> coordinates; };\n`;
        }

        if (this.usedGeometryTypes.has("geometry")) {
            code += `struct Geometry { };\n`;
        }

        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "long long",
            "boolean"                 : "bool",
            "date"                    : "std::string",
            "dateTime"                : "std::string",
            "decimal"                 : "double",
            "float"                   : "float",
            "integer"                 : "int",
            "json"                    : "std::string",
            "string"                  : "std::string",
            "text"                    : "std::string",
            "time"                    : "std::string",
            "timestamp"               : "std::string",
            "binary"                  : "std::vector<unsigned char>",
            "uuid"                    : "std::string",
            "alias"                   : "std::any",
            "hash"                    : "std::string",
            "csv"                     : "std::vector<std::string>",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "std::any",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set([
            "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept", "auto",
            "bitand", "bitor", "bool", "break", "case", "catch", "char", "char8_t", "char16_t", "char32_t", "class",
            "compl", "concept", "const", "consteval", "constexpr", "constinit", "const_cast", "continue", "co_await",
            "co_return", "co_yield", "decltype", "default", "delete", "do", "double", "dynamic_cast", "else", "enum",
            "explicit", "export", "extern", "false", "float", "for", "friend", "goto", "if", "inline", "int", "long",
            "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq", "private",
            "protected", "public", "reflexpr", "register", "reinterpret_cast", "requires", "return", "short", "signed",
            "sizeof", "static", "static_assert", "static_cast", "struct", "switch", "synchronized", "template", "this",
            "thread_local", "throw", "true", "try", "typedef", "typeid", "typename", "union", "unsigned", "using",
            "virtual", "void", "volatile", "wchar_t", "while", "xor", "xor_eq",
        ]);
    }
}
