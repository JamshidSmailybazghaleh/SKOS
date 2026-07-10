/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module  : Metadata Pipeline Validator
 * Build   : BUILD-000179
 * Version : 1.0.0
 * ==========================================================
 */

import { FileSystemEnumerator } from "./file-system-enumerator";
import { FileMetadata } from "./file-metadata";

export interface MetadataPipelineResult {

    success: boolean;

    totalFiles: number;

    documents: number;

    images: number;

    audio: number;

    video: number;

    archives: number;

    sourceCode: number;

    unknown: number;

}

export class MetadataPipelineValidator {

    constructor(

        private readonly enumerator:
        FileSystemEnumerator

    ) {}

    public async validate(
        root: string
    ): Promise<MetadataPipelineResult> {

        const files =
            await this.enumerator.enumerate(root);

        const result: MetadataPipelineResult = {

            success: true,

            totalFiles: files.length,

            documents: 0,

            images: 0,

            audio: 0,

            video: 0,

            archives: 0,

            sourceCode: 0,

            unknown: 0

        };

        for (const file of files) {

            this.count(file, result);

        }

        return result;

    }

    private count(

        file: FileMetadata,

        result: MetadataPipelineResult

    ): void {

        switch (file.category) {

            case "document":

                result.documents++;

                break;

            case "image":

                result.images++;

                break;

            case "audio":

                result.audio++;

                break;

            case "video":

                result.video++;

                break;

            case "archive":

                result.archives++;

                break;

            case "source-code":

                result.sourceCode++;

                break;

            default:

                result.unknown++;

        }

    }

}
