import { BaseGenerator, FieldInfo } from "./base-generator";
export declare class CPPGenerator extends BaseGenerator {
    generateForCollection(collection: string, fields: FieldInfo[]): string;
    generateCustomTypes(usedGeometryTypes: Set<string>): string;
    getPrefix(): string;
    protected getTypeMap(): Record<string, string>;
    protected getReservedKeywords(): Set<string>;
}
