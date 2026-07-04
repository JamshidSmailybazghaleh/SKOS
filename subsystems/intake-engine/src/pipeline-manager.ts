/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Pipeline Manager
 *
 * Build     : BUILD-000029
 * Sprint    : Sprint 02
 * Version   : 0.0.2
 *
 * Status    : Active
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

import {

    PipelineContext,

    PipelineStep

} from "./pipeline-step";

import { SourceValidator } from "./source-validator";

export class PipelineManager {

    private readonly steps: PipelineStep[] = [];

    constructor() {

        this.initialize();

    }

    /**
     * Register default pipeline steps
     */

    private initialize(): void {

        this.register(

            new SourceValidator()

        );

    }

    /**
     * Register a new pipeline step
     */

    public register(

        step: PipelineStep

    ): void {

        this.steps.push(step);

    }

    /**
     * Execute the complete pipeline
     */

    public execute(

        context: PipelineContext

    ): PipelineContext {

        console.log("==================================");

        console.log("SKOS Pipeline Started");

        console.log("==================================");

        let current = context;

        for (const step of this.steps) {

            current = step.execute(current);

        }

        console.log("==================================");

        console.log("SKOS Pipeline Finished");

        console.log("==================================");

        return current;

    }

    /**
     * Remove every registered step
     */

    public clear(): void {

        this.steps.length = 0;

    }

    /**
     * Number of registered steps
     */

    public count(): number {

        return this.steps.length;

    }

}
