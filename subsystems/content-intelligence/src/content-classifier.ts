/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Content Classifier
 *
 * Build     : BUILD-000167
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ContentType
} from "./content-type";

/**
 * Classification result.
 */
export interface ClassificationResult {

    /**
     * Detected content type.
     */
    type: ContentType;

    /**
     * Confidence score (0.0 - 1.0).
     */
    confidence: number;

    /**
     * Detection reason.
     */
    reason: string;

}

/**
 * Content Classifier.
 */
export class ContentClassifier {

    /**
     * Classify one file.
     */
    public classify(
        fileName: string,
        filePath: string
    ): ClassificationResult {

        const name =
            fileName.toLowerCase();

        const path =
            filePath.toLowerCase();

        // Cover detection
        if (
            name.includes("cover") ||
            name.includes("جلد")
        ) {

            return {

                type: ContentType.BookCover,

                confidence: 0.98,

                reason:
                    "Matched cover keywords."

            };

        }

        // Sample detection
        if (
            name.includes("sample") ||
            name.includes("نمونه")
        ) {

            return {

                type: ContentType.BookSample,

                confidence: 0.97,

                reason:
                    "Matched sample keywords."

            };

        }

        // PDF
        if (
            name.endsWith(".pdf")
        ) {

            return {

                type: ContentType.PDF,

                confidence: 0.95,

                reason:
                    "PDF extension."

            };

        }

        // Word
        if (

            name.endsWith(".doc") ||

            name.endsWith(".docx")

        ) {

            return {

                type: ContentType.Word,

                confidence: 0.95,

                reason:
                    "Word document."

            };

        }

        // Images
        if (

            /\.(jpg|jpeg|png|webp)$/i

                .test(name)

        ) {

            return {

                type: ContentType.Image,

                confidence: 0.94,

                reason:
                    "Image extension."

            };

        }

        // Archive
        if (

            /\.(zip|rar|7z)$/i

                .test(name)

        ) {

            return {

                type: ContentType.Archive,

                confidence: 0.93,

                reason:
                    "Archive extension."

            };

        }

        // Books folder heuristic
        if (
            path.includes("/books/")
        ) {

            return {

                type: ContentType.Book,

                confidence: 0.80,

                reason:
                    "Located inside books directory."

            };

        }

        return {

            type: ContentType.Unknown,

            confidence: 0.20,

            reason:
                "No classification rule matched."

        };

    }

}
