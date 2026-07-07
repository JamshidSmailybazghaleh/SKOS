import { ScanRecord } from "./scan-record";
import { ScanResult } from "./scan-result";
import { ScannerOptions } from "./scanner-options";

export class SafeImportScanner {

    private readonly records: ScanRecord[] = [];

    constructor(

        private readonly options: ScannerOptions

    ) {}

    /**
     * Register discovered file.
     */
    public register(

        record: ScanRecord

    ): void {

        this.records.push(record);

    }

    /**
     * Execute scan.
     */
    public scan(): ScanResult {

        return {

            scanned: true,

            totalFiles: this.records.length,

            records: [...this.records]

        };

    }

}
