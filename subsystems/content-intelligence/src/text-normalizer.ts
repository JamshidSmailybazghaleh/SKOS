/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Text Normalizer
 *
 * Build     : BUILD-000181
 * Version   : 1.0.0
 * ==========================================================
 */

export class TextNormalizer {

    /**
     * Normalize raw text.
     */
    public normalize(
        text: string
    ): string {

        let normalized = text;

        // Normalize line endings
        normalized = normalized.replace(/\r\n/g, "\n");
        normalized = normalized.replace(/\r/g, "\n");

        // Replace tabs with spaces
        normalized = normalized.replace(/\t/g, " ");

        // Collapse repeated spaces
        normalized = normalized.replace(/[ ]{2,}/g, " ");

        // Collapse excessive blank lines
        normalized = normalized.replace(/\n{3,}/g, "\n\n");

        // Trim leading and trailing whitespace
        normalized = normalized.trim();

        return normalized;

    }

    }
