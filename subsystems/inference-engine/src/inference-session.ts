/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Inference Engine
 * Module    : Inference Session
 *
 * Build     : BUILD-000188
 * Version   : 1.0.0
 * ==========================================================
 */

import { InferenceEngine } from "./inference-engine";
import { InferenceFact } from "./inference-fact";
import { InferenceRule } from "./inference-rule";

export interface InferenceSessionResult {

    sessionId: string;

    startedAt: Date;

    finishedAt: Date;

    inputFactCount: number;

    generatedFactCount: number;

    generatedFacts: InferenceFact[];

}

export class InferenceSession {

    constructor(
        private readonly engine: InferenceEngine
    ) {}

    /**
     * Execute one inference session.
     */
    public execute(
        facts: readonly InferenceFact[],
        rules: readonly InferenceRule[]
    ): InferenceSessionResult {

        const startedAt = new Date();

        const generatedFacts =
            this.engine.execute(facts, rules);

        const finishedAt = new Date();

        return {

            sessionId: crypto.randomUUID(),

            startedAt,

            finishedAt,

            inputFactCount:
                facts.length,

            generatedFactCount:
                generatedFacts.length,

            generatedFacts

        };

    }

}
