/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Engine
 * Module    : Content Pipeline Validator
 *
 * Build     : BUILD-000180
 * Version   : 1.0.0
 * ==========================================================
 */

import { FileMetadata } from "../../android-connector/src/file-metadata";
import { ContentPipeline } from "./content-pipeline";

export interface ContentPipelineValidationResult {

    success: boolean;

    processedFiles: number;

    successfulReads: number;

    failedReads: number;

    totalCharacters: number;

}

export class ContentPipelineValidator {

    constructor(

        private readonly pipeline:
        ContentPipeline

    ) {}

    public async validate(

        files: readonly FileMetadata[]

    ): Promise<ContentPipelineValidationResult> {

        const results =
            await this.pipeline.processBatch(files);

        let successfulReads = 0;

        let failedReads = 0;

        let totalCharacters = 0;

        for (const result of results) {

            if (result.success) {

                successfulReads++;

                totalCharacters +=
                    result.text.length;

            } else {

                failedReads++;

            }

        }

        return {

            success: failedReads === 0,

            processedFiles: results.length,

            successfulReads,

            failedReads,

            totalCharacters

        };

    }

}
