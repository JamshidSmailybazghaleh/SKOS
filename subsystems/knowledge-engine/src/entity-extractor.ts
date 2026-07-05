/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Entity Extractor
 *
 * Build     : BUILD-000037
 * Sprint    : Sprint 03
 * Version   : 0.0.2
 *
 * Status    : Active
 * ==========================================================
 */

export interface Entity {

    value: string;

    type: string;

}

export class EntityExtractor {

    /**
     * Extract candidate entities
     */

    public extract(

        text: string

    ): Entity[] {

        const entities: Entity[] = [];

        const words = text.split(/\s+/);

        for (const word of words) {

            if (

                word.length > 3 &&

                /^[A-Za-zآ-ی]/.test(word)

            ) {

                entities.push({

                    value: word,

                    type: "UNKNOWN"

                });

            }

        }

        return entities;

    }

}
