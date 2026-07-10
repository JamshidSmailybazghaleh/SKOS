/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Vault Storage
 *
 * Build     : BUILD-000184
 * Version   : 1.0.0
 * ==========================================================
 */

import { VaultRecord } from "./vault-record";

export class VaultStorage {

    private readonly records =
        new Map<string, VaultRecord>();

    /**
     * Store or update a record.
     */
    public save(
        record: VaultRecord
    ): void {

        this.records.set(
            record.id,
            record
        );

    }

    /**
     * Get record by id.
     */
    public findById(
        id: string
    ): VaultRecord | undefined {

        return this.records.get(id);

    }

    /**
     * Delete record.
     */
    public delete(
        id: string
    ): boolean {

        return this.records.delete(id);

    }

    /**
     * Check record existence.
     */
    public exists(
        id: string
    ): boolean {

        return this.records.has(id);

    }

    /**
     * Return all records.
     */
    public findAll(): readonly VaultRecord[] {

        return [...this.records.values()];

    }

    /**
     * Number of stored records.
     */
    public count(): number {

        return this.records.size;

    }

    /**
     * Remove all records.
     */
    public clear(): void {

        this.records.clear();

    }

}
