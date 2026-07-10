/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Engine
 * Module    : Content Reader Factory
 *
 * Build     : BUILD-000180
 * Version   : 1.0.0
 * ==========================================================
 */

import { ContentReader } from "./content-reader";

export class ContentReaderFactory {

    private readonly readers: ContentReader[] = [];

    /**
     * Register a new content reader.
     */
    public register(
        reader: ContentReader
    ): void {

        this.readers.push(reader);

    }

    /**
     * Find a suitable reader by file extension.
     */
    public getReader(
        extension: string
    ): ContentReader | null {

        const normalized =
            extension.toLowerCase();

        for (const reader of this.readers) {

            if (
                reader.supports(normalized)
            ) {

                return reader;

            }

        }

        return null;

    }

    /**
     * Return all registered readers.
     */
    public getReaders(): readonly ContentReader[] {

        return this.readers;

    }

}
