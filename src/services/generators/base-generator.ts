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

export const toPascalCase = (str: string) => {
    return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase())
              .replace(/^(.)/, (_, c) => c.toUpperCase());
};

export abstract class BaseGenerator {
    protected usedGeometryTypes: Set<string> = new Set();

    constructor(protected options: GeneratorOptions) {
    }

    public static getOptions(): { text: string; value: string }[] {
        return [];
    }

    public reset(): void {
        this.usedGeometryTypes.clear();
    }

    public abstract generateForCollection(collection: string, fields: FieldInfo[]): string;

    public generateCustomTypes(usedGeometryTypes?: Set<string>): string {
        if (usedGeometryTypes) {
            this.usedGeometryTypes = usedGeometryTypes;
        }
        return "";
    }

    public getPrefix(_allCollectionNames?: Set<string>): string {
        return "";
    }

    protected abstract getTypeMap(): Record<string, string>;

    protected abstract getReservedKeywords(): Set<string>;

    protected getMappedType(type: string): string | null {
        return this.getTypeMap()[type] || null;
    }

    protected toPascalCase(str: string): string {
        return toPascalCase(str);
    }
}
