/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Query Engine
 *
 * Build     : BUILD-000047
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import {
    KnowledgeObjectSchema
} from "./knowledge-schema";

import {
    KnowledgeRepository
} from "./knowledge-repository";

export class KnowledgeQueryEngine {

    constructor(

        private readonly repository: KnowledgeRepository

    ) {}

    /**
     * Find one Knowledge Object
     */

    public findById(

        id: string

    ): KnowledgeObjectSchema | undefined {

        return this.repository.findById(id);

    }

    /**
     * Return every Knowledge Object
     */

    public findAll(): KnowledgeObjectSchema[] {

        return this.repository.findAll();

    }

    /**
     * Search by title
     */

    public searchByTitle(

        keyword: string

    ): KnowledgeObjectSchema[] {

        return this.repository

            .findAll()

            .filter(item =>

                item.title

                    .toLowerCase()

                    .includes(

                        keyword.toLowerCase()

                    )

            );

    }

}
