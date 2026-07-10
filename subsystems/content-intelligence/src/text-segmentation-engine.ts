/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Text Segmentation Engine
 *
 * Build     : BUILD-000181
 * Version   : 1.0.0
 * ==========================================================
 */

export interface TextSegments {

    paragraphs: string[];

    sentences: string[];

    tokens: string[];

}

export class TextSegmentationEngine {

    /**
     * Segment normalized text.
     */
    public segment(
        text: string
    ): TextSegments {

        const paragraphs =
            this.extractParagraphs(text);

        const sentences =
            this.extractSentences(text);

        const tokens =
            this.extractTokens(text);

        return {

            paragraphs,

            sentences,

            tokens

        };

    }

    /**
     * Split into paragraphs.
     */
    private extractParagraphs(
        text: string
    ): string[] {

        return text
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0);

    }

    /**
     * Split into sentences.
     */
    private extractSentences(
        text: string
    ): string[] {

        return text
            .split(/[.!؟?\n]+/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

    }

    /**
     * Split into tokens.
     */
    private extractTokens(
        text: string
    ): string[] {

        return text
            .split(/\s+/)
            .map(t => t.trim())
            .filter(t => t.length > 0);

    }

}
