import { IntegrityRecord } from "./integrity-record";
import { IntegrityReport } from "./integrity-report";

export class IntegrityEngine {

    private readonly records =

        new Map<string, IntegrityRecord>();

    /**
     * Register integrity record.
     */
    public register(

        record: IntegrityRecord

    ): void {

        this.records.set(

            record.assetId,

            record

        );

    }

    /**
     * Retrieve integrity record.
     */
    public get(

        assetId: string

    ): IntegrityRecord | undefined {

        return this.records.get(assetId);

    }

    /**
     * Retrieve all records.
     */
    public getAll(): IntegrityRecord[] {

        return Array.from(

            this.records.values()

        );

    }

    /**
     * Total records.
     */
    public count(): number {

        return this.records.size;

    }

    /**
     * Generate integrity report.
     */
    public report(): IntegrityReport {

        return {

            totalRecords:

                this.records.size,

            verified:

                this.records.size,

            invalid: 0,

            duplicates: 0,

            generatedAt:

                Date.now()

        };

    }

}
