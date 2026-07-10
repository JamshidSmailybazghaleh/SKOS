/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Engine
 * Module    : Text Extraction Engine
 *
 * Build     : BUILD-000180
 * Version   : 1.0.0
 * ==========================================================
 */

import { FileMetadata } from "../../android-connector/src/file-metadata";

import {
    ContentReaderFactory
} from "./content-reader-factory";

import {
    ContentReadResult
} from "./content-reader";

export class TextExtractionEngine {

    constructor(

        private readonly readerFactory:
        ContentReaderFactory

    ) {}

    /**
     * Extract raw text from a file.
     */
    public async extract(

        metadata: FileMetadata

    ): Promise<ContentReadResult> {

        const reader =
            this.readerFactory.getReader(
                metadata.extension
            );

        if (!reader) {

            return {

                success: false,

                metadata,

                text: "",

                duration: 0,

                error:
                    `No reader registered for extension: ${metadata.extension}`

            };

        }

        const started =
            Date.now();

        const result =
            await reader.read(metadata);

        result.duration =
            Date.now() - started;

        return result;

    }

}
