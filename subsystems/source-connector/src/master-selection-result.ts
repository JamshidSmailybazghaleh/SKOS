import { UnifiedFileRecord } from "./unified-file-record";

export interface MasterSelectionResult {

    master: UnifiedFileRecord;

    duplicates: UnifiedFileRecord[];

}
