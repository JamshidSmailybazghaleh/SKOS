/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Memory Engine
 * Module    : Memory Service
 *
 * Build     : BUILD-000065
 * Sprint    : Sprint 06
 * Version   : 0.1.0
 *
 * Status    : Integration
 * ==========================================================
 */

import {
    MemoryRecord
} from "./memory-engine";

import {
    MemoryStore
} from "./memory-store";

import {
    MemoryRetrievalEngine
} from "./memory-retrieval";

import {
    Context,
    ContextManager
} from "./context-manager";

export class MemoryService {

    constructor(

        private readonly store: MemoryStore,

        private readonly retrieval: MemoryRetrievalEngine,

        private readonly contextManager: ContextManager

    ) {}

    /**
     * Save memory.
     */
    public save(

        record: MemoryRecord

    ): void {

        this.store.save(record);

    }

    /**
     * Retrieve one memory.
     */
    public getById(

        id: string

    ): MemoryRecord | undefined {

        return this.retrieval.findById(id);

    }

    /**
     * Retrieve all memories.
     */
    public getAll(): MemoryRecord[] {

        return this.retrieval.findAll();

    }

    /**
     * Build execution context.
     */
    public buildContext(

        context: Context

    ): MemoryRecord[] {

        return this.contextManager.buildContext(context);

    }

}
