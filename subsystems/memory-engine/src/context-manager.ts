/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Memory Engine
 * Module    : Context Manager
 *
 * Build     : BUILD-000064
 * Sprint    : Sprint 06
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { MemoryRecord } from "./memory-engine";
import { MemoryRetrievalEngine } from "./memory-retrieval";

export interface Context {

    query: string;

    category?: string;

    maxResults: number;

}

export class ContextManager {

    constructor(

        private readonly retrieval: MemoryRetrievalEngine

    ) {}

    /**
     * Build execution context.
     */
    public buildContext(

        context: Context

    ): MemoryRecord[] {

        let records = this.retrieval.findAll();

        if (context.category) {

            records = records.filter(

                record =>

                    record.category === context.category

            );

        }

        return records.slice(0, context.maxResults);

    }

}
