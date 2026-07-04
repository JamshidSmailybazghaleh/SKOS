/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Metadata Extractor
 *
 * Build     : BUILD-000023
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

export interface Metadata {

    title?: string;

    author?: string;

    language?: string;

    category?: string;

    keywords?: string[];

}

export class MetadataExtractor {

    public extract(text: string): Metadata {

        return {

            title: "",

            author: "",

            language: "",

            category: "",

            keywords: []

        };

    }

}
