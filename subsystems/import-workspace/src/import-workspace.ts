import { ImportRecord } from "./import-record";

export class ImportWorkspace {

    private readonly records =

        new Map<string, ImportRecord>();

    /**
     * Register new import record.
     */
    public register(

        record: ImportRecord

    ): void {

        this.records.set(

            record.id,

            record

        );

    }

    /**
     * Retrieve import record.
     */
    public get(

        id: string

    ): ImportRecord | undefined {

        return this.records.get(id);

    }

    /**
     * Retrieve all records.
     */
    public getAll(): ImportRecord[] {

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

}
