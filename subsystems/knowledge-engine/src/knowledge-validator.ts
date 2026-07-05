/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Validator
 *
 * Build     : BUILD-000045
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import { KnowledgeObjectSchema } from "./knowledge-schema";

export interface ValidationResult {

    valid: boolean;

    errors: string[];

}

export class KnowledgeValidator {

    public validate(

        object: KnowledgeObjectSchema

    ): ValidationResult {

        const errors: string[] = [];

        if (!object.id) {

            errors.push("Missing id");

        }

        if (!object.title) {

            errors.push("Missing title");

        }

        if (!object.metadata) {

            errors.push("Missing metadata");

        }

        if (!object.entities) {

            errors.push("Missing entities");

        }

        if (!object.concepts) {

            errors.push("Missing concepts");

        }

        if (!object.relationships) {

            errors.push("Missing relationships");

        }

        if (!object.tags) {

            errors.push("Missing tags");

        }

        return {

            valid: errors.length === 0,

            errors

        };

    }

}
