/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Pipeline Manager
 *
 * Build     : BUILD-000030
 * Sprint    : Sprint 02
 * Version   : 0.0.3
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

import { FileTypeDetector } from "./file-type-detector";

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

        this.register(

            new FileTypeDetector()

        );

    }

    /**
     * Register new pipeline step
     */

    public register(

        step: PipelineStep

    ): void {

        this.steps.push(step);

    }

    /**
     * Execute complete pipeline
     */

    public execute(

        context: PipelineContext

    ): PipelineContext {

        console.log("==================================");

        console.log("SKOS Intake Pipeline");

        console.log("==================================");

        let current = context;

        for (const step of this.steps) {

            console.log("----------------------------------");

            console.log(

                "Running:",

                step.constructor.name

            );

            current = step.execute(current);

        }

        console.log("----------------------------------");

        console.log("Pipeline Completed");

        console.log("==================================");

        return current;

    }

    /**
     * Remove all registered steps
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

    /**
     * Return registered steps
     */

    public getSteps(): PipelineStep[] {

        return [...this.steps];

    }

}
