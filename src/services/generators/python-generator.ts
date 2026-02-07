import {BaseGenerator, FieldInfo} from "./base-generator";

export class PythonGenerator extends BaseGenerator {
    public static override getOptions(): { text: string; value: string }[] {
        return [
            {text: "Python 3.10+", value: "3.10"},
            {text: "Python 3.9+", value: "3.9"},
            {text: "Python 3.6+", value: "3.6"},
        ];
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);
        let code = `class ${collectionName}:\n`;
        const pythonVersion = this.options.languageVersion ? parseFloat(this.options.languageVersion) : 3.10;
        fields.forEach((row) => {
            let pythonType = this.getMappedType(row.type) || "Any";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                pythonType = this.toPascalCase(row.relatedCollection);
                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m")) {
                    if (pythonVersion >= 3.9) {
                        pythonType = `list['${pythonType}']`;
                    } else {
                        pythonType = `List['${pythonType}']`;
                    }
                } else {
                    pythonType = `'${pythonType}'`;
                }
            } else if (row.type === "csv") {
                if (pythonVersion >= 3.9) {
                    pythonType = "list[str]";
                } else {
                    pythonType = "List[str]";
                }
            } else if (row.type === "json") {
                pythonType = "Any";
            }

            let fieldName = row.field;
            if (this.getReservedKeywords().has(fieldName)) {
                fieldName = `custom_${fieldName}`;
            }

            if (!row.required) {
                if (pythonVersion >= 3.10) {
                    code += `    ${fieldName}: ${pythonType} | None = None\n`;
                } else {
                    code += `    ${fieldName}: Optional[${pythonType}] = None\n`;
                }
            } else {
                code += `    ${fieldName}: ${pythonType}\n`;
            }
        });
        code += "\n";
        return code;
    }

    public generateCustomTypes(usedGeometryTypes: Set<string>): string {
        this.usedGeometryTypes = usedGeometryTypes;
        let code = "";
        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `class Point(TypedDict): type: Literal['Point']; coordinates: tuple[float, float]\n`;
        }
        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `class LineString(TypedDict): type: Literal['LineString']; coordinates: list[tuple[float, float]]\n`;
        }
        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `class Polygon(TypedDict): type: Literal['Polygon']; coordinates: list[list[tuple[float, float]]]\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `class MultiPoint(TypedDict): type: Literal['MultiPoint']; coordinates: list[tuple[float, float]]\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `class MultiLineString(TypedDict): type: Literal['MultiLineString']; coordinates: list[list[tuple[float, float]]]\n`;
        }
        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `class MultiPolygon(TypedDict): type: Literal['MultiPolygon']; coordinates: list[list[list[tuple[float, float]]]]\n`;
        }
        if (this.usedGeometryTypes.has("geometry")) {
            code += `Geometry = Union[Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon]\n`;
        }
        return code;
    }

    public getPrefix(): string {
        const pythonVersion = this.options.languageVersion ? parseFloat(this.options.languageVersion) : 3.10;
        let prefix = "from typing import Any, List, Optional, Union, Literal, TypedDict\n\n";
        if (pythonVersion >= 3.10) {
            prefix = "from typing import Any, Literal, TypedDict\n\n";
        }
        return prefix;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "int",
            "boolean"                 : "bool",
            "date"                    : "str",
            "dateTime"                : "str",
            "decimal"                 : "float",
            "float"                   : "float",
            "integer"                 : "int",
            "json"                    : "dict",
            "string"                  : "str",
            "text"                    : "str",
            "time"                    : "str",
            "timestamp"               : "str",
            "binary"                  : "bytes",
            "uuid"                    : "str",
            "alias"                   : "Any",
            "hash"                    : "str",
            "csv"                     : "List[str]",
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
        return new Set([
            "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del",
            "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal",
            "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
        ]);
    }
}
