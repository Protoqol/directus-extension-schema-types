import {BaseGenerator, FieldInfo} from "./base-generator";

export class PythonGenerator extends BaseGenerator {
    public static override getOptions(): { text: string; value: string }[] {
        return [
            {text: "Python 3.10+", value: "3.10"},
            {text: "Python 3.9+", value: "3.9"},
            {text: "Python 3.6+", value: "3.6"},
        ];
    }

    public override getPrefix(_allCollectionNames?: Set<string>): string {
        let prefix = "";

        if (this.options.languageVersion) {
            prefix += `# Minimum supported Python version: ${this.options.languageVersion}+\n`;
        } else {
            prefix += "# Minimum supported Python version: 3.10+\n";
        }

        if (this.options.languageVersion === "3.6") {
            prefix += "from typing import Any, List, Optional, Union, Tuple\n\n";
        } else if (this.options.languageVersion === "3.9") {
            prefix += "from __future__ import annotations\n";
            prefix += "from typing import Any, Optional, Tuple, Literal, TypedDict\n\n";
        } else {
            prefix += "from typing import Any, Literal, TypedDict\n\n";
        }

        return prefix;
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);

        let code = "";

        if (this.options.languageVersion === "3.6") {
            code = `class ${collectionName}:\n`;
        } else {
            code = `class ${collectionName}(TypedDict, total=False):\n`;
        }

        fields.forEach((row: FieldInfo) => {
            let pythonType = this.getMappedType(row.type) || "Any";

            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }

            if (row.relatedCollection) {
                pythonType = this.toPascalCase(row.relatedCollection);

                if (row.type === "o2m" || row.type === "m2m" || row.special.includes("m2m") || row.special.includes("o2m")) {
                    if (this.options.languageVersion === "3.9" || this.options.languageVersion === "3.10") {
                        pythonType = `list['${pythonType}']`;
                    } else {
                        pythonType = `List['${pythonType}']`;
                    }
                } else {
                    pythonType = `'${pythonType}'`;
                }
            } else if (row.type === "csv") {
                if (this.options.languageVersion === "3.9" || this.options.languageVersion === "3.10") {
                    pythonType = "list[str]";
                } else {
                    pythonType = "List[str]";
                }
            } else if (row.type === "json") {
                pythonType = "Any";
            }

            let fieldName = row.field;

            if (this.options.languageVersion === "3.6") {
                if (this.getReservedKeywords().has(fieldName)) {
                    fieldName = `${fieldName}_`;
                }
            }

            if (!row.required) {
                if (this.options.languageVersion === "3.10") {
                    if (row.type.startsWith("geometry")) {
                        code += `    ${fieldName}: '${pythonType}' | None\n`;
                    } else {
                        code += `    ${fieldName}: ${pythonType} | None\n`;
                    }
                } else {
                    if (row.type.startsWith("geometry")) {
                        code += `    ${fieldName}: Optional['${pythonType}']\n`;
                    } else {
                        if (pythonType === "Any") {
                            code += `    ${fieldName}: ${pythonType}\n`;
                        } else {
                            code += `    ${fieldName}: Optional[${pythonType}]\n`;
                        }
                    }
                }
            } else {
                code += `    ${fieldName}: ${pythonType}\n`;
            }
        });

        code += "\n";

        return code;
    }

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }

        let code = "# Geometry types\n";

        if (this.options.languageVersion === "3.6") {
            if (this.usedGeometryTypes.has("geometry.Point")) {
                code += `class Point:\n    type: str\n    coordinates: Tuple[float, float]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.LineString")) {
                code += `class LineString:\n    type: str\n    coordinates: List[Tuple[float, float]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.Polygon")) {
                code += `class Polygon:\n     type: str\n     coordinates: List[List[Tuple[float, float]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
                code += `class MultiPoint:\n     type: str\n    coordinates:\n     List[Tuple[float, float]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
                code += `class MultiLineString:\n     type: str\n     coordinates: List[List[Tuple[float, float]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
                code += `class MultiPolygon:\n     type: str\n     coordinates: List[List[List[Tuple[float, float]]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry")) {
                code += `Geometry = Union[Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon]\n\n`;
            }
        } else if (this.options.languageVersion === "3.9") {
            if (this.usedGeometryTypes.has("geometry.Point")) {
                code += `class Point(TypedDict, total=False):\n    type: Literal['Point']\n    coordinates: Tuple[float, float]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.LineString")) {
                code += `class LineString(TypedDict, total=False):\n    type: Literal['LineString']\n    coordinates: List[Tuple[float, float]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.Polygon")) {
                code += `class Polygon(TypedDict, total=False):\n    type: Literal['Polygon']\n    coordinates: List[List[Tuple[float, float]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
                code += `class MultiPoint(TypedDict, total=False):\n    type: Literal['MultiPoint']\n    coordinates: List[Tuple[float, float]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
                code += `class MultiLineString(TypedDict, total=False):\n    type: Literal['MultiLineString']\n    coordinates: List[List[Tuple[float, float]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
                code += `class MultiPolygon(TypedDict, total=False):\n    type: Literal['MultiPolygon']\n    coordinates: List[List[List[Tuple[float, float]]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry")) {
                code += `Geometry = Union[Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon]\n\n`;
            }
        } else {
            if (this.usedGeometryTypes.has("geometry.Point")) {
                code += `class Point(TypedDict, total=False):\n    type: Literal['Point']\n    coordinates: tuple[float, float]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.LineString")) {
                code += `class LineString(TypedDict, total=False):\n    type: Literal['LineString']\n    coordinates: list[tuple[float, float]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.Polygon")) {
                code += `class Polygon(TypedDict, total=False):\n    type: Literal['Polygon']\n    coordinates: list[list[tuple[float, float]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
                code += `class MultiPoint(TypedDict, total=False):\n    type: Literal['MultiPoint']\n    coordinates: list[tuple[float, float]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
                code += `class MultiLineString(TypedDict, total=False):\n    type: Literal['MultiLineString']\n    coordinates: list[list[tuple[float, float]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
                code += `class MultiPolygon(TypedDict, total=False):\n    type: Literal['MultiPolygon']\n    coordinates: list[list[list[tuple[float, float]]]]\n\n`;
            }

            if (this.usedGeometryTypes.has("geometry")) {
                code += `Geometry = Union[Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon]\n\n`;
            }
        }

        return code;
    }

    protected getTypeMap(): Record<string, string> {
        if (this.options.languageVersion === "3.9" || this.options.languageVersion === "3.10") {
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
                "csv"                     : "list[str]",
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
            "not", "or", "pass", "raise", "return", "try", "while", "with", "yield", "id", "float", "int", "str", "bool",
        ]);
    }
}
