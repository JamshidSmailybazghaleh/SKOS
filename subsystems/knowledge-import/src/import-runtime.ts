/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Import Pipeline
 * Module    : Import Runtime
 *
 * Build     : BUILD-000193
 * Version   : 1.0.0
 * ==========================================================
 */

import { ImportSource } from "./import-source";
import {
    MetadataExtractor,
    MetadataRecord
} from "./metadata-extractor";
import {
    ContentClassifier,
    ClassificationResult
} from "./content-classifier";
import {
    KnowledgeBuilder,
    KnowledgeObject
} from "./knowledge-builder";
import {
    ImportReport,
    ImportReportGenerator
} from "./import-report";

export interface ImportRuntimeResult {

    knowledge: KnowledgeObject;

    report: ImportReport;

}

export class ImportRuntime {

    private readonly metadataExtractor =
        new MetadataExtractor();

    private readonly classifier =
        new ContentClassifier();

    private readonly builder =
        new KnowledgeBuilder();

    private readonly reportGenerator =
        new ImportReportGenerator();

    /**
     * Import one source.
     */
    public execute(
        source: ImportSource
    ): ImportRuntimeResult {

        const startedAt = new Date();

        const metadata: MetadataRecord =
            this.metadataExtractor.extract(source);

        const classification: ClassificationResult =
            this.classifier.classify(
                source,
                metadata
            );

        const knowledge =
            this.builder.build(
                source,
                metadata,
                classification
            );

        const finishedAt = new Date();

        const report =
            this.reportGenerator.generate(
                source.id,
                1,
                1,
                0,
                0,
                startedAt,
                finishedAt
            );

        return {

            knowledge,

            report

        };

    }

}
