/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Language Detector
 *
 * Build     : BUILD-000167
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ContentLanguage
} from "./content-type";

/**
 * Language detection result.
 */
export interface LanguageDetectionResult {

    /**
     * Detected language.
     */
    language: ContentLanguage;

    /**
     * Confidence score.
     */
    confidence: number;

    /**
     * Detection method.
     */
    method: string;

}

/**
 * Language Detector.
 */
export class LanguageDetector {

    /**
     * Detect language.
     *
     * Foundation implementation.
     */
    public detect(

        text: string

    ): LanguageDetectionResult {

        const sample =

            text.trim();

        if (sample.length === 0) {

            return {

                language:
                    ContentLanguage.Unknown,

                confidence: 0,

                method: "empty"

            };

        }

        // Persian / Arabic Unicode
        if (/[\u0600-\u06FF]/.test(sample)) {

            // Simple Gilaki keyword heuristic
            const gilakiWords = [
                "ببو",
                "گیلان",
                "دیلمان",
                "گیلکی"
            ];

            const isGilaki = gilakiWords.some(

                word => sample.includes(word)

            );

            if (isGilaki) {

                return {

                    language:
                        ContentLanguage.Gilaki,

                    confidence: 0.80,

                    method:
                        "keyword"

                };

            }

            return {

                language:
                    ContentLanguage.Persian,

                confidence: 0.95,

                method:
                    "unicode"

            };

        }

        // Latin alphabet
        if (/[A-Za-z]/.test(sample)) {

            return {

                language:
                    ContentLanguage.English,

                confidence: 0.90,

                method:
                    "latin"

            };

        }

        return {

            language:
                ContentLanguage.Unknown,

            confidence: 0.20,

            method:
                "fallback"

        };

    }

    /**
     * Determine whether text
     * appears multilingual.
     */
    public isMultilingual(

        text: string

    ): boolean {

        return (

            /[\u0600-\u06FF]/.test(text)

            &&

            /[A-Za-z]/.test(text)

        );

    }

}
