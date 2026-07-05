/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Memory Engine
 *
 * Build     : BUILD-000066
 * Sprint    : Sprint 06
 * Version   : 0.0.1
 *
 * Status    : Integration Test
 * ==========================================================
 */

import { InMemoryStore } from "./memory-store";
import { MemoryRetrievalEngine } from "./memory-retrieval";
import { ContextManager } from "./context-manager";
import { MemoryService } from "./memory-service";

export class MemoryEngineTest {

    public run(): boolean {

        const store = new InMemoryStore();

        const retrieval =

            new MemoryRetrievalEngine(store);

        const contextManager =

            new ContextManager(retrieval);

        const service =

            new MemoryService(

                store,

                retrieval,

                contextManager

            );

        service.save({

            id: "MEM-001",

            category: "knowledge",

            content: "SKOS Memory Test",

            createdAt: new Date(),

            updatedAt: new Date()

        });

        const result =

            service.buildContext({

                query: "memory",

                category: "knowledge",

                maxResults: 10

            });

        return result.length === 1;

    }

}
