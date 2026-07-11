/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Inference Engine
 * Module    : Inference Runtime
 *
 * Build     : BUILD-000188
 * Version   : 1.0.0
 * ==========================================================
 */

import { InferenceEngine } from "./inference-engine";
import { InferenceSession } from "./inference-session";
import {
    InferenceReport,
    InferenceReportGenerator
} from "./inference-report";
import { InferenceFact } from "./inference-fact";
import { InferenceRule } from "./inference-rule";

export class InferenceRuntime {

    private readonly engine =
        new InferenceEngine();

    private readonly session =
        new InferenceSession(this.engine);

    private readonly reportGenerator =
        new InferenceReportGenerator();

    /**
     * Execute inference runtime.
     */
    public run(
        facts: readonly InferenceFact[],
        rules: readonly InferenceRule[]
    ): {
        report: InferenceReport;
        generatedFacts: readonly InferenceFact[];
    } {

        const result =
            this.session.execute(facts, rules);

        const report =
            this.reportGenerator.generate(result);

        return {

            report,

            generatedFacts:
                result.generatedFacts

        };

    }

}
