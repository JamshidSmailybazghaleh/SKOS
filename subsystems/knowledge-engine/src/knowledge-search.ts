/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Search Engine
 *
 * Build     : BUILD-000048
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import { KnowledgeRepository } from "./knowledge-repository";
import { KnowledgeObjectSchema } from "./knowledge-schema";

export class KnowledgeSearchEngine {

    constructor(

        private readonly repository: KnowledgeRepository

    ) {}

    /**
     * Full text search
     */

    public search(

        keyword: string

    ): KnowledgeObjectSchema[] {

        const query = keyword.toLowerCase();

        return this.repository.findAll().filter(item => {

            if (item.title.toLowerCase().includes(query)) {

                return true;

            }

            if (item.summary.toLowerCase().includes(query)) {

                return true;

            }

            if (

                item.tags.some(

                    tag => tag.toLowerCase().includes(query)

                )

            ) {

                return true;

            }

            if (

                item.entities.some(

                    entity =>

                        entity.value.toLowerCase().includes(query)

                )

            ) {

                return true;

            }

            if (

                item.concepts.some(

                    concept =>

                        concept.value.toLowerCase().includes(query)

                )

            ) {

                return true;

            }

            return false;

        });

    }

}
