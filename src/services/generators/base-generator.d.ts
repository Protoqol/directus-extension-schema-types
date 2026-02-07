export interface FieldInfo {
    field: string;
    type: string;
    required: boolean;
    special: string[];
    relatedCollection?: string | null;
}
export interface GeneratorOptions {
    language: string;
    tsTypeStyle?: string;
    languageVersion?: string;
}
export declare const toPascalCase: (str: string) => string;
export declare abstract class BaseGenerator {
    protected options: GeneratorOptions;
    protected usedGeometryTypes: Set<string>;
    constructor(options: GeneratorOptions);
    static getOptions(): {
        text: string;
        value: string;
    }[];
    abstract generateForCollection(collection: string, fields: FieldInfo[]): string;
    generateCustomTypes(usedGeometryTypes: Set<string>): string;
    getPrefix(allCollectionNames?: Set<string>): string;
    protected abstract getTypeMap(): Record<string, string>;
    protected abstract getReservedKeywords(): Set<string>;
    protected getMappedType(type: string): string | null;
    protected toPascalCase(str: string): string;
}
