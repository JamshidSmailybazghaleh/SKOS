/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Memory Engine
 * Module    : Memory Store
 *
 * Build     : BUILD-000062
 * Sprint    : Sprint 06
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { MemoryRecord } from "./memory-engine";

export interface MemoryStore {

    save(record: MemoryRecord): void;

    findById(id: string): MemoryRecord | undefined;

    findAll(): MemoryRecord[];

    remove(id: string): boolean;

}

export class InMemoryStore implements MemoryStore {

    private readonly storage = new Map<string, MemoryRecord>();

    public save(record: MemoryRecord): void {

        this.storage.set(record.id, record);

    }

    public findById(id: string): MemoryRecord | undefined {

        return this.storage.get(id);

    }

    public findAll(): MemoryRecord[] {

        return Array.from(this.storage.values());

    }

    public remove(id: string): boolean {

        return this.storage.delete(id);

    }

}
