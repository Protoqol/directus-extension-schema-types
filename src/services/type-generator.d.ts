import { BaseGenerator, FieldInfo, GeneratorOptions } from "./generators/base-generator";
export declare class TypeGeneratorService {
    private options;
    private generatedCollections;
    private usedGeometryTypes;
    private generator;
    constructor(options: GeneratorOptions);
    static getGenerator(language: string): typeof BaseGenerator;
    generate(mainCollection: string | null, mainFields: FieldInfo[], selectedCollections: string[], getMappedFields: (collection: string) => FieldInfo[]): Promise<string>;
    private getGenerator;
}
