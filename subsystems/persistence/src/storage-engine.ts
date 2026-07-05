/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Persistence
 * Module    : Storage Engine
 *
 * Build     : BUILD-000096
 * Sprint    : Sprint 13
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface StorageRecord {

    id: string;

    data: unknown;

    createdAt: Date;

    updatedAt: Date;

}

export class StorageEngine {

    private readonly storage =
        new Map<string, StorageRecord>();

    /**
     * Save or update a record.
     */
    public save(

        id: string,

        data: unknown

    ): void {

        const now = new Date();

        const existing = this.storage.get(id);

        this.storage.set(id, {

            id,

            data,

            createdAt: existing?.createdAt ?? now,

            updatedAt: now

        });

    }

    /**
     * Retrieve a record.
     */
    public load(

        id: string

    ): StorageRecord | undefined {

        return this.storage.get(id);

    }

    /**
     * Delete a record.
     */
    public delete(

        id: string

    ): boolean {

        return this.storage.delete(id);

    }

    /**
     * Return all records.
     */
    public getAll(): StorageRecord[] {

        return Array.from(this.storage.values());

    }

}
