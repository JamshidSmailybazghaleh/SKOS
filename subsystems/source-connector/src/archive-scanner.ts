/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : Archive Scanner
 *
 * Build     : BUILD-000143
 * Version   : 0.0.1
 * ==========================================================
 */

import { FileRecord } from "./file-record";
import { ScanSummary } from "./scan-summary";

export class ArchiveScanner {

    private readonly files: FileRecord[] = [];

    /**
     * Register discovered file.
     */
    public registerFile(

        file: FileRecord

    ): void {

        this.files.push(file);

    }

    /**
     * Return all files.
     */
    public getFiles(): FileRecord[] {

        return [...this.files];

    }

    /**
     * Build scan summary.
     */
    public summarize(): ScanSummary {

        const summary: ScanSummary = {

            totalFiles: this.files.length,

            pdfFiles: 0,

            wordFiles: 0,

            imageFiles: 0,

            textFiles: 0,

            unknownFiles: 0

        };

        for (const file of this.files) {

            switch (file.extension.toLowerCase()) {

                case "pdf":
                    summary.pdfFiles++;
                    break;

                case "doc":

                case "docx":
                    summary.wordFiles++;
                    break;

                case "txt":

                case "md":
                    summary.textFiles++;
                    break;

                case "png":

                case "jpg":

                case "jpeg":

                case "webp":
                    summary.imageFiles++;
                    break;

                default:
                    summary.unknownFiles++;

            }

        }

        return summary;

    }

}
