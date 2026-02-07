import { BaseGenerator, FieldInfo } from "./base-generator";
export declare class GoGenerator extends BaseGenerator {
    generateForCollection(collection: string, fields: FieldInfo[]): string;
    generateCustomTypes(usedGeometryTypes: Set<string>): string;
    protected getTypeMap(): Record<string, string>;
    protected getReservedKeywords(): Set<string>;
}
