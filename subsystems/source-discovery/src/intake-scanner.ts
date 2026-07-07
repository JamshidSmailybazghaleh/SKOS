/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Discovery
 * Module    : Intake Scanner
 *
 * Build     : BUILD-000165
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    SourceDescriptor
} from "./source-descriptor";

import {
    ScanResult,
    ScanResultBuilder,
    ScanStatus
} from "./scan-result";

import {
    SourceType
} from "./source-type";

/**
 * Supported import file extensions.
 */
const SUPPORTED_EXTENSIONS = [

    "pdf",
    "doc",
    "docx",
    "txt",
    "md",

    "jpg",
    "jpeg",
    "png",
    "webp",

    "zip"

];

/**
 * Intake Scanner.
 */
export class IntakeScanner {

    /**
     * Scan one source.
     */
    public scan(

        source: SourceDescriptor

    ): ScanResult {

        const builder =

            new ScanResultBuilder();

        const startedAt =

            Date.now();

        /**
         * Foundation Version
         *
         * Future Android implementation:
         *
         * - enumerate files
         * - recursive scan
         * - permission verification
         * - duplicate detection
         * - checksum generation
         * - metadata extraction
         */

        return builder.build(

            this.scanId(),

            source.type,

            ScanStatus.Completed,

            0,

            0,

            0,

            0,

            startedAt

        );

    }

    /**
     * Determine whether a file
     * can be imported.
     */
    public isSupported(

        extension: string

    ): boolean {

        return SUPPORTED_EXTENSIONS.includes(

            extension

                .toLowerCase()

                .replace(".", "")

        );

    }

    /**
     * Supported extensions.
     */
    public supportedExtensions(): string[] {

        return [

            ...SUPPORTED_EXTENSIONS

        ];

    }

    /**
     * Generate scan identifier.
     */
    private scanId(): string {

        return `scan-${Date.now()}`;

    }

    /**
     * Verify source compatibility.
     */
    public supports(

        source: SourceType

    ): boolean {

        switch (source) {

            case SourceType.InternalStorage:

            case SourceType.SDCard:

            case SourceType.CloudStorage:

            case SourceType.Documents:

            case SourceType.Downloads:

            case SourceType.UserFolder:

            case SourceType.ExternalDrive:

                return true;

            default:

                return false;

        }

    }

}
