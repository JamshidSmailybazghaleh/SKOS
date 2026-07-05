/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Persistence
 * Module    : Repository Layer
 *
 * Build     : BUILD-000097
 * Sprint    : Sprint 13
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    StorageEngine,
    StorageRecord
} from "./storage-engine";

export class Repository {

    constructor(

        private readonly storage: StorageEngine

    ) {}

    /**
     * Save entity.
     */
    public save(

        id: string,

        data: unknown

    ): void {

        this.storage.save(id, data);

    }

    /**
     * Load entity.
     */
    public load(

        id: string

    ): StorageRecord | undefined {

        return this.storage.load(id);

    }

    /**
     * Delete entity.
     */
    public delete(

        id: string

    ): boolean {

        return this.storage.delete(id);

    }

    /**
     * Load all entities.
     */
    public getAll(): StorageRecord[] {

        return this.storage.getAll();

    }

}
