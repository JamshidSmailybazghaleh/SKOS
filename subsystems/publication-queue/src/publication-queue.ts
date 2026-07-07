import { PublicationRecord } from "./publication-record";
import { QueueReport } from "./queue-report";
import { PublicationStatus } from "./publication-status";

export class PublicationQueue {

    private readonly records =

        new Map<string, PublicationRecord>();

    public enqueue(

        record: PublicationRecord

    ): void {

        this.records.set(

            record.id,

            record

        );

    }

    public get(

        id: string

    ): PublicationRecord | undefined {

        return this.records.get(id);

    }

    public getAll(): PublicationRecord[] {

        return Array.from(

            this.records.values()

        );

    }

    public report(): QueueReport {

        const items = this.getAll();

        return {

            totalItems: items.length,

            waitingApproval: items.filter(

                item =>

                    item.status === PublicationStatus.WaitingApproval

            ).length,

            approved: items.filter(

                item =>

                    item.status === PublicationStatus.Approved

            ).length,

            published: items.filter(

                item =>

                    item.status === PublicationStatus.Published

            ).length,

            generatedAt: Date.now()

        };

    }

}
