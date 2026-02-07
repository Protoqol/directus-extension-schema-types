import {BaseGenerator, FieldInfo} from "./base-generator";

export class SQLGenerator extends BaseGenerator {
    public override getPrefix(_allCollectionNames?: Set<string>): string {
        return "";
    }

    public generateForCollection(collection: string, fields: FieldInfo[]): string {
        let code = `CREATE TABLE ${collection.toLowerCase()} (\n`;

        fields.forEach((row, index) => {
            let sqlType = this.getMappedType(row.type) || "TEXT";
            code += `  \`${row.field}\` ${sqlType}${row.required ? " NOT NULL" : ""}${index === fields.length - 1 ? "" : ","}\n`;
        });

        code += ");\n\n";
        return code;
    }

    protected getTypeMap(): Record<string, string> {
        return {
            "bigInteger"              : "BIGINT",
            "boolean"                 : "BOOLEAN",
            "date"                    : "DATE",
            "dateTime"                : "DATETIME",
            "decimal"                 : "DECIMAL",
            "float"                   : "FLOAT",
            "integer"                 : "INTEGER",
            "json"                    : "JSON",
            "string"                  : "VARCHAR(255)",
            "text"                    : "TEXT",
            "time"                    : "TIME",
            "timestamp"               : "TIMESTAMP",
            "binary"                  : "BLOB",
            "uuid"                    : "CHAR(36)",
            "alias"                   : "TEXT",
            "hash"                    : "VARCHAR(255)",
            "csv"                     : "TEXT",
            "geometry"                : "GEOMETRY",
            "geometry.Point"          : "POINT",
            "geometry.LineString"     : "LINESTRING",
            "geometry.Polygon"        : "POLYGON",
            "geometry.MultiPoint"     : "MULTIPOINT",
            "geometry.MultiLineString": "MULTILINESTRING",
            "geometry.MultiPolygon"   : "MULTIPOLYGON",
            "unknown"                 : "TEXT",
        };
    }

    protected getReservedKeywords(): Set<string> {
        return new Set();
    }
}
