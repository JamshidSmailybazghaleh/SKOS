/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Learning
 * Module    : Learning Memory
 *
 * Build     : BUILD-000128
 * Sprint    : Sprint 19
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface LearningRecord {

    id: string;

    category: string;

    content: string;

    confidence: number;

    timestamp: number;

}

export class LearningMemory {

    private readonly records =
        new Map<string, LearningRecord>();

    /**
     * Store learning record.
     */
    public store(

        record: LearningRecord

    ): void {

        this.records.set(

            record.id,

            record

        );

    }

    /**
     * Retrieve learning record.
     */
    public get(

        id: string

    ): LearningRecord | undefined {

        return this.records.get(id);

    }

    /**
     * Retrieve all records.
     */
    public getAll(): LearningRecord[] {

        return Array.from(

            this.records.values()

        );

    }

    /**
     * Number of records.
     */
    public count(): number {

        return this.records.size;

    }

}
