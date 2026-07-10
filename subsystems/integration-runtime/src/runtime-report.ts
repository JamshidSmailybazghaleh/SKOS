/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Integration Runtime
 * Module    : Runtime Report
 *
 * Build     : BUILD-000186
 * Version   : 1.0.0
 * ==========================================================
 */

import { PipelineContext } from "./pipeline-context";

export interface RuntimeReport {

    startedAt: Date;

    finishedAt: Date;

    durationMs: number;

    metadataCount: number;

    contentCount: number;

    knowledgeUnitCount: number;

    vaultRecordCount: number;

    graphNodeCount: number;

    graphEdgeCount: number;

    warningCount: number;

    errorCount: number;

}

export class RuntimeReportGenerator {

    /**
     * Build runtime report.
     */
    public generate(
        context: PipelineContext
    ): RuntimeReport {

        const finishedAt =
            context.finishedAt ?? new Date();

        return {

            startedAt: context.startedAt,

            finishedAt,

            durationMs:
                finishedAt.getTime() -
                context.startedAt.getTime(),

            metadataCount:
                context.metadata.length,

            contentCount:
                context.contents.length,

            knowledgeUnitCount:
                context.knowledgeUnits.length,

            vaultRecordCount:
                context.vaultRecords.length,

            graphNodeCount:
                context.graphNodes.length,

            graphEdgeCount:
                context.graphEdges.length,

            warningCount:
                context.warnings.length,

            errorCount:
                context.errors.length

        };

    }

}
