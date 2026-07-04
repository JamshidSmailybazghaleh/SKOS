/**
 * SKOS
 * Source Validator
 *
 * BUILD-000016
 */

export interface ValidationResult {

    valid: boolean;

    reason: string;

}

export class SourceValidator {

    public validate(path: string): ValidationResult {

        if (!path || path.trim().length === 0) {

            return {

                valid: false,

                reason: "Empty source path."

            };

        }

        return {

            valid: true,

            reason: "Validation passed."

        };

    }

}
