/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Engine
 * Module    : Content Pipeline
 *
 * Build     : BUILD-000180
 * Version   : 1.0.0
 * ==========================================================
 */

import { FileMetadata } from "../../android-connector/src/file-metadata";
import { TextExtractionEngine } from "./text-extraction-engine";
import { ContentReadResult } from "./content-reader";

export class ContentPipeline {

    constructor(
        private readonly extractionEngine:
        TextExtractionEngine
    ) {}

    /**
     * Process a single file.
     */
    public async process(
        metadata: FileMetadata
    ): Promise<ContentReadResult> {

        return await this.extractionEngine.extract(
            metadata
        );

    }

    /**
     * Process multiple files.
     */
    public async processBatch(
        files: readonly FileMetadata[]
    ): Promise<ContentReadResult[]> {

        const results: ContentReadResult[] = [];

        for (const file of files) {

            results.push(
                await this.process(file)
            );

        }

        return results;

    }

}
