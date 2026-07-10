/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Knowledge Vault Runtime
 *
 * Build     : BUILD-000184
 * Version   : 1.0.0
 * ==========================================================
 */

import { KnowledgeUnit } from "../../knowledge-engine/src/knowledge-unit";
import { VaultRecord, VaultRecordStatus } from "./vault-record";
import { VaultStorage } from "./vault-storage";
import { VaultIndex } from "./vault-index";
import { VaultQueryEngine } from "./vault-query-engine";

export class KnowledgeVaultRuntime {

    private readonly storage = new VaultStorage();

    private readonly index = new VaultIndex();

    private readonly queryEngine =
        new VaultQueryEngine(
            this.storage,
            this.index
        );

    /**
     * Store a KnowledgeUnit.
     */
    public store(unit: KnowledgeUnit): VaultRecord {

        const record: VaultRecord = {

            id: crypto.randomUUID(),

            knowledge: unit,

            version: 1,

            createdAt: new Date(),

            updatedAt: new Date(),

            status: VaultRecordStatus.Pending

        };

        this.storage.save(record);

        this.index.add(record);

        return record;

    }

    /**
     * Access query engine.
     */
    public query(): VaultQueryEngine {

        return this.queryEngine;

    }

    /**
     * Number of stored records.
     */
    public count(): number {

        return this.storage.count();

    }

    /**
     * Remove all records.
     */
    public clear(): void {

        this.index.clear();

        this.storage.clear();

    }

}
