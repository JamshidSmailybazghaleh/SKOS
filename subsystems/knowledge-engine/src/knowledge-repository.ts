/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Repository
 *
 * Build     : BUILD-000046
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { KnowledgeObjectSchema } from "./knowledge-schema";

export interface KnowledgeRepository {

    save(object: KnowledgeObjectSchema): void;

    findById(id: string): KnowledgeObjectSchema | undefined;

    findAll(): KnowledgeObjectSchema[];

}

export class InMemoryKnowledgeRepository implements KnowledgeRepository {

    private readonly storage: Map<string, KnowledgeObjectSchema>;

    constructor() {

        this.storage = new Map<string, KnowledgeObjectSchema>();

    }

    public save(object: KnowledgeObjectSchema): void {

        this.storage.set(object.id, object);

    }

    public findById(id: string): KnowledgeObjectSchema | undefined {

        return this.storage.get(id);

    }

    public findAll(): KnowledgeObjectSchema[] {

        return Array.from(this.storage.values());

    }

}
