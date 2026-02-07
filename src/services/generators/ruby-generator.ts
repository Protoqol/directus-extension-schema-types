import {BaseGenerator, FieldInfo} from "./base-generator";

export class RubyGenerator extends BaseGenerator {
    public override getPrefix(__allCollectionNames?: Set<string>): string {
        return "# Minimum supported Ruby version: 2.0+\n\n";
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        const collectionName = this.toPascalCase(collection);

        let code = `class ${collectionName}\n  attr_accessor `;

        code += fields.map((row) => `:${row.field}`).join(", ");
        code += "\n\n  def initialize(params = {})\n";

        fields.forEach((row) => {
            if (row.type.startsWith("geometry")) {
                this.usedGeometryTypes.add(row.type);
            }
            code += `    @${row.field} = params[:${row.field}]\n`;
        });

        code += "  end\nend\n\n";

        return code;
    }

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }

        let code = "# Geometry types\n";

        if (this.usedGeometryTypes.has("geometry.Point")) {
            code += `Point = Struct.new(:type, :coordinates)\n`;
        }

        if (this.usedGeometryTypes.has("geometry.LineString")) {
            code += `LineString = Struct.new(:type, :coordinates)\n`;
        }

        if (this.usedGeometryTypes.has("geometry.Polygon")) {
            code += `Polygon = Struct.new(:type, :coordinates)\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPoint")) {
            code += `MultiPoint = Struct.new(:type, :coordinates)\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiLineString")) {
            code += `MultiLineString = Struct.new(:type, :coordinates)\n`;
        }

        if (this.usedGeometryTypes.has("geometry.MultiPolygon")) {
            code += `MultiPolygon = Struct.new(:type, :coordinates)\n`;
        }

        if (this.usedGeometryTypes.has("geometry")) {
            code += `Geometry = Struct.new(:dummy)\n`;
        }

        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "Integer",
            "boolean"                 : "TrueClass/FalseClass",
            "date"                    : "String",
            "dateTime"                : "String",
            "decimal"                 : "Float",
            "float"                   : "Float",
            "integer"                 : "Integer",
            "json"                    : "Hash",
            "string"                  : "String",
            "text"                    : "String",
            "time"                    : "String",
            "timestamp"               : "String",
            "binary"                  : "String",
            "uuid"                    : "String",
            "alias"                   : "Object",
            "hash"                    : "String",
            "csv"                     : "Array",
            "geometry"                : "Geometry",
            "geometry.Point"          : "Point",
            "geometry.LineString"     : "LineString",
            "geometry.Polygon"        : "Polygon",
            "geometry.MultiPoint"     : "MultiPoint",
            "geometry.MultiLineString": "MultiLineString",
            "geometry.MultiPolygon"   : "MultiPolygon",
            "unknown"                 : "Object",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set();
    }
}
