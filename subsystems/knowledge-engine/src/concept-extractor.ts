/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Concept Extractor
 *
 * Build     : BUILD-000038
 * Sprint    : Sprint 03
 * Version   : 0.0.2
 *
 * Status    : Active
 * ==========================================================
 */

export interface Concept {

    value: string;

    confidence: number;

}

export class ConceptExtractor {

    /**
     * Extract candidate concepts
     */

    public extract(

        text: string

    ): Concept[] {

        const concepts: Concept[] = [];

        const candidates = text
            .split(/\s+/)
            .map(item => item.trim())
            .filter(item => item.length > 4);

        for (const candidate of candidates) {

            concepts.push({

                value: candidate,

                confidence: 0.50

            });

        }

        return concepts;

    }

}
