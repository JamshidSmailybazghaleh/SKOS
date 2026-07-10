/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Vault Query Engine
 *
 * Build     : BUILD-000184
 * Version   : 1.0.0
 * ==========================================================
 */

import { VaultStorage } from "./vault-storage";
import { VaultIndex } from "./vault-index";
import { VaultRecord } from "./vault-record";
import { KnowledgeUnitType } from "../../knowledge-engine/src/knowledge-unit";

export class VaultQueryEngine {

    constructor(
        private readonly storage: VaultStorage,
        private readonly index: VaultIndex
    ) {}

    /**
     * Find a record by id.
     */
    public findById(
        id: string
    ): VaultRecord | undefined {

        return this.storage.findById(id);

    }

    /**
     * Find records by knowledge type.
     */
    public findByType(
        type: KnowledgeUnitType
    ): VaultRecord[] {

        const ids = this.index.findByType(type);

        return ids
            .map(id => this.storage.findById(id))
            .filter(
                (record): record is VaultRecord =>
                    record !== undefined
            );

    }

    /**
     * Simple text search.
     */
    public search(
        text: string
    ): VaultRecord[] {

        const query = text.toLowerCase();

        return this.storage
            .findAll()
            .filter(record =>
                record.knowledge.value
                    .toLowerCase()
                    .includes(query)
            );

    }

    /**
     * Return all records.
     */
    public findAll(): readonly VaultRecord[] {

        return this.storage.findAll();

    }

}
