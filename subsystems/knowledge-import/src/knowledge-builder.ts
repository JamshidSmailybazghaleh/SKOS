/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Import Pipeline
 * Module    : Knowledge Builder
 *
 * Build     : BUILD-000193
 * Version   : 1.0.0
 * ==========================================================
 */

import { ImportSource } from "./import-source";
import { MetadataRecord } from "./metadata-extractor";
import {
    ClassificationResult
} from "./content-classifier";

/**
 * Standard knowledge object.
 */
export interface KnowledgeObject {

    /**
     * Unique identifier.
     */
    id: string;

    /**
     * Original source.
     */
    source: ImportSource;

    /**
     * Extracted metadata.
     */
    metadata: MetadataRecord;

    /**
     * Classification result.
     */
    classification: ClassificationResult;

    /**
     * Import timestamp.
     */
    importedAt: Date;

}

/**
 * Knowledge builder.
 */
export class KnowledgeBuilder {

    /**
     * Build knowledge object.
     */
    public build(
        source: ImportSource,
        metadata: MetadataRecord,
        classification: ClassificationResult
    ): KnowledgeObject {

        return {

            id: source.id,

            source,

            metadata,

            classification,

            importedAt: new Date()

        };

    }

}
