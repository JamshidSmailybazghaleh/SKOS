/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Memory Engine
 * Module    : Memory Retrieval Engine
 *
 * Build     : BUILD-000063
 * Sprint    : Sprint 06
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { MemoryRecord } from "./memory-engine";
import { MemoryStore } from "./memory-store";

export class MemoryRetrievalEngine {

    constructor(

        private readonly store: MemoryStore

    ) {}

    /**
     * Retrieve memory by id.
     */
    public findById(

        id: string

    ): MemoryRecord | undefined {

        return this.store.findById(id);

    }

    /**
     * Retrieve every memory.
     */
    public findAll(): MemoryRecord[] {

        return this.store.findAll();

    }

    /**
     * Search by category.
     */
    public findByCategory(

        category: string

    ): MemoryRecord[] {

        return this.store

            .findAll()

            .filter(record =>

                record.category === category

            );

    }

    /**
     * Retrieve memories created after a date.
     */
    public findAfter(

        date: Date

    ): MemoryRecord[] {

        return this.store

            .findAll()

            .filter(record =>

                record.createdAt >= date

            );

    }

}
