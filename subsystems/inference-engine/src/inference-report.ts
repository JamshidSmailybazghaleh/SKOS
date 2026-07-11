/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Inference Engine
 * Module    : Inference Report
 *
 * Build     : BUILD-000188
 * Version   : 1.0.0
 * ==========================================================
 */

import { InferenceSessionResult } from "./inference-session";

export interface InferenceReport {

    sessionId: string;

    startedAt: Date;

    finishedAt: Date;

    durationMs: number;

    inputFactCount: number;

    generatedFactCount: number;

    totalFactCount: number;

    averageConfidence: number;

}

export class InferenceReportGenerator {

    /**
     * Generate an inference report.
     */
    public generate(
        result: InferenceSessionResult
    ): InferenceReport {

        const durationMs =
            result.finishedAt.getTime() -
            result.startedAt.getTime();

        const averageConfidence =
            result.generatedFacts.length === 0
                ? 0
                : result.generatedFacts
                    .reduce(
                        (sum, fact) =>
                            sum + fact.confidence.score,
                        0
                    ) / result.generatedFacts.length;

        return {

            sessionId: result.sessionId,

            startedAt: result.startedAt,

            finishedAt: result.finishedAt,

            durationMs,

            inputFactCount:
                result.inputFactCount,

            generatedFactCount:
                result.generatedFactCount,

            totalFactCount:
                result.inputFactCount +
                result.generatedFactCount,

            averageConfidence

        };

    }

}
