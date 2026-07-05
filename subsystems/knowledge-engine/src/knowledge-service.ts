/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Service
 *
 * Build     : BUILD-000049
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import {
    KnowledgeRepository
} from "./knowledge-repository";

import {
    KnowledgeObjectSchema
} from "./knowledge-schema";

import {
    KnowledgeValidator
} from "./knowledge-validator";

import {
    KnowledgeSearchEngine
} from "./knowledge-search";

import {
    KnowledgeQueryEngine
} from "./knowledge-query";

export class KnowledgeService {

    constructor(

        private readonly repository: KnowledgeRepository,

        private readonly validator: KnowledgeValidator,

        private readonly queryEngine: KnowledgeQueryEngine,

        private readonly searchEngine: KnowledgeSearchEngine

    ) {}

    /**
     * Store Knowledge Object
     */

    public save(

        object: KnowledgeObjectSchema

    ): boolean {

        const result = this.validator.validate(object);

        if (!result.valid) {

            return false;

        }

        this.repository.save(object);

        return true;

    }

    /**
     * Find by id
     */

    public findById(

        id: string

    ) {

        return this.queryEngine.findById(id);

    }

    /**
     * Full text search
     */

    public search(

        keyword: string

    ) {

        return this.searchEngine.search(keyword);

    }

}
