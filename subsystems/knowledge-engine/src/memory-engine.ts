/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Memory Engine
 *
 * Build     : BUILD-000061
 * Sprint    : Sprint 06
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface MemoryRecord {

    id: string;

    category: string;

    content: string;

    createdAt: Date;

    updatedAt: Date;

}

export interface MemoryResult {

    success: boolean;

    recordCount: number;

}

export class MemoryEngine {

    private readonly memory: MemoryRecord[] = [];

    /**
     * Store a memory record.
     */
    public store(

        record: MemoryRecord

    ): MemoryResult {

        this.memory.push(record);

        return {

            success: true,

            recordCount: this.memory.length

        };

    }

    /**
     * Return all stored memories.
     */
    public getAll(): MemoryRecord[] {

        return [...this.memory];

    }

}
