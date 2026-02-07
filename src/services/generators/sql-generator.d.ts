import { BaseGenerator, FieldInfo } from "./base-generator";
export declare class SQLGenerator extends BaseGenerator {
    generateForCollection(collection: string, fields: FieldInfo[]): string;
    protected getTypeMap(): Record<string, string>;
    protected getReservedKeywords(): Set<string>;
}
