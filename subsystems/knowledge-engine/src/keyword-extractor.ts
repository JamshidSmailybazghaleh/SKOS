/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Keyword Extractor
 *
 * Build     : BUILD-000182
 * Version   : 1.0.0
 * ==========================================================
 */

import {
    TextDocument
} from "../../content-intelligence/src/text-document";

import {
    KnowledgeUnit,
    KnowledgeUnitType
} from "./knowledge-unit";

export class KeywordExtractor {

    /**
     * Initial stop-word list.
     * (Will be expanded in future builds.)
     */
    private readonly stopWords = new Set([

        "و",
        "در",
        "از",
        "به",
        "با",
        "برای",
        "که",

        "the",
        "of",
        "to",
        "and",
        "in",
        "on",
        "for"

    ]);

    /**
     * Extract keywords.
     */
    public extract(
        document: TextDocument
    ): KnowledgeUnit[] {

        const frequency =
            new Map<string, number>();

        const words =
            document.normalizedText
                .toLowerCase()
                .split(/\s+/);

        for (const word of words) {

            const token =
                word.replace(/[^\p{L}\p{N}]/gu, "");

            if (
                token.length < 3 ||
                this.stopWords.has(token)
            ) {

                continue;

            }

            frequency.set(
                token,
                (frequency.get(token) ?? 0) + 1
            );

        }

        const keywords: KnowledgeUnit[] = [];

        let index = 0;

        for (const [word, count] of frequency) {

            keywords.push({

                id: `kw-${index++}`,

                document,

                type: KnowledgeUnitType.Keyword,

                value: word,

                startOffset: -1,

                endOffset: -1,

                confidence:
                    Math.min(1, count / 10),

                metadata: {

                    frequency: count

                }

            });

        }

        return keywords.sort(

            (a, b) =>
                b.confidence - a.confidence

        );

    }

}
