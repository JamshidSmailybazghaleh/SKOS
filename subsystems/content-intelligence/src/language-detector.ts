/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Language Detector
 *
 * Build     : BUILD-000181
 * Version   : 1.0.0
 * ==========================================================
 */

import { DocumentLanguage } from "./text-document";

export class LanguageDetector {

    /**
     * Detect document language.
     */
    public detect(
        text: string
    ): DocumentLanguage {

        const sample =
            text.substring(0, 5000);

        let persian = 0;
        let arabic = 0;
        let latin = 0;

        for (const character of sample) {

            const code =
                character.charCodeAt(0);

            // Persian / Arabic Unicode Block
            if (code >= 0x0600 && code <= 0x06FF) {

                if (
                    character === "پ" ||
                    character === "چ" ||
                    character === "ژ" ||
                    character === "گ"
                ) {

                    persian++;

                } else {

                    arabic++;

                }

            }

            // Latin letters
            else if (
                (code >= 65 && code <= 90) ||
                (code >= 97 && code <= 122)
            ) {

                latin++;

            }

        }

        if (
            persian > arabic &&
            persian > latin
        ) {

            return DocumentLanguage.Persian;

        }

        if (
            arabic > persian &&
            arabic > latin
        ) {

            return DocumentLanguage.Arabic;

        }

        if (
            latin > persian &&
            latin > arabic
        ) {

            return DocumentLanguage.English;

        }

        return DocumentLanguage.Unknown;

    }

}
