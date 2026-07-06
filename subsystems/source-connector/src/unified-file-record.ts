import { SourceType } from "./source-type";

export interface UnifiedFileRecord {

    id: string;

    name: string;

    path: string;

    extension: string;

    size: number;

    lastModified: number;

    source: SourceType;

}
