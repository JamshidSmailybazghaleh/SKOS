/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Language Detector
 *
 * Build     : BUILD-000022
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

export enum LanguageCode {

    FA = "fa",

    EN = "en",

    AR = "ar",

    UNKNOWN = "unknown"

}

export class LanguageDetector {

    public detect(text: string): LanguageCode {

        if (!text || text.trim().length === 0) {

            return LanguageCode.UNKNOWN;

        }

        const value = text;

        if (/[آ-ی]/.test(value)) {

            return LanguageCode.FA;

        }

        if (/[A-Za-z]/.test(value)) {

            return LanguageCode.EN;

        }

        if (/[\u0600-\u06FF]/.test(value)) {

            return LanguageCode.AR;

        }

        return LanguageCode.UNKNOWN;

    }

}
