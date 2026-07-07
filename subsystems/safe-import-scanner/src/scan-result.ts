import { ScanRecord } from "./scan-record";

export interface ScanResult {

    scanned: boolean;

    totalFiles: number;

    records: ScanRecord[];

}
