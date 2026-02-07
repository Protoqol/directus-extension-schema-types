import { BaseGenerator, FieldInfo } from "./base-generator";
export declare class PythonGenerator extends BaseGenerator {
    static getOptions(): {
        text: string;
        value: string;
    }[];
    generateForCollection(collection: string, fields: FieldInfo[]): string;
    generateCustomTypes(usedGeometryTypes: Set<string>): string;
    getPrefix(): string;
    protected getTypeMap(): Record<string, string>;
    protected getReservedKeywords(): Set<string>;
}
