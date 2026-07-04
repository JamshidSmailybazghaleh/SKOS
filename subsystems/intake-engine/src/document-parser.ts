/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Document Parser
 *
 * Build     : BUILD-000024
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 * Status    : Active
 * ==========================================================
 */

export interface ParsedDocument {

    raw: string;

    paragraphs: string[];

}

export class DocumentParser {

    public parse(text: string): ParsedDocument {

        const paragraphs = text
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0);

        return {

            raw: text,

            paragraphs

        };

    }

}
