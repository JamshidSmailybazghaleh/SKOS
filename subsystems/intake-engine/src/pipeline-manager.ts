/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Pipeline Manager
 *
 * Build     : BUILD-000028
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import {
    PipelineContext,
    PipelineStep
} from "./pipeline-step";

export class PipelineManager {

    private readonly steps: PipelineStep[] = [];

    public register(step: PipelineStep): void {

        this.steps.push(step);

    }

    public execute(
        context: PipelineContext
    ): PipelineContext {

        let current = context;

        for (const step of this.steps) {

            current = step.execute(current);

        }

        return current;

    }

    public clear(): void {

        this.steps.length = 0;

    }

    public count(): number {

        return this.steps.length;

    }

}
