import { BatchImportStatus }
from "./batch-import-status";

export interface BatchImportResult {

    status: BatchImportStatus;

    totalItems: number;

    importedItems: number;

    failedItems: number;

}
