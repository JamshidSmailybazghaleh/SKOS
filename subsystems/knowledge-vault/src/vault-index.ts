/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Vault Index
 *
 * Build     : BUILD-000184
 * Version   : 1.0.0
 * ==========================================================
 */

import { VaultRecord } from "./vault-record";
import { KnowledgeUnitType } from "../../knowledge-engine/src/knowledge-unit";

export class VaultIndex {

    private readonly typeIndex =
        new Map<KnowledgeUnitType, Set<string>>();

    /**
     * Add a record to the index.
     */
    public add(record: VaultRecord): void {

        const type = record.knowledge.type;

        if (!this.typeIndex.has(type)) {

            this.typeIndex.set(type, new Set());

        }

        this.typeIndex
            .get(type)!
            .add(record.id);

    }

    /**
     * Remove a record from the index.
     */
    public remove(record: VaultRecord): void {

        const ids =
            this.typeIndex.get(record.knowledge.type);

        ids?.delete(record.id);

    }

    /**
     * Find record ids by knowledge type.
     */
    public findByType(
        type: KnowledgeUnitType
    ): readonly string[] {

        return [
            ...(this.typeIndex.get(type) ?? [])
        ];

    }

    /**
     * Clear all indexes.
     */
    public clear(): void {

        this.typeIndex.clear();

    }

}
