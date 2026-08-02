/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Source Validator
 *
 * Build     : BUILD-000005
 * Sprint    : Sprint 02
 * Version   : 0.1.0
 *
 * Status    : Monitoring Enabled
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

import {

    PipelineContext,

    PipelineStep

} from "./pipeline-step";


export class SourceValidator implements PipelineStep {


    private monitoring: any = null;


    constructor(
        monitoring: any = null
    ) {

        this.monitoring =
            monitoring;

    }


    public execute(

        context: PipelineContext

    ): PipelineContext {


        console.log(
            "STEP 01 : Source Validation"
        );


        if (
            this.monitoring
        ) {

            this.monitoring.recordEvent(

                "INTAKE_SOURCE_VALIDATION_STARTED",

                {

                    sourcePath:
                        context.sourcePath

                }

            );

        }


        if (
            !context.sourcePath
        ) {


            if (this.monitoring) {

                this.monitoring.recordEvent(

                    "INTAKE_SOURCE_VALIDATION_FAILED"

                );

                this.monitoring.updateMetric(

                    "validationFailed"

                );

            }


            throw new Error(
                "Source path is empty."
            );

        }


        if (
            context.sourcePath.trim().length === 0
        ) {


            if (this.monitoring) {

                this.monitoring.recordEvent(

                    "INTAKE_SOURCE_VALIDATION_FAILED"

                );

                this.monitoring.updateMetric(

                    "validationFailed"

                );

            }


            throw new Error(
                "Source path is invalid."
            );

        }


        if (
            this.monitoring
        ) {

            this.monitoring.recordEvent(

                "INTAKE_SOURCE_VALIDATED",

                {

                    sourcePath:
                        context.sourcePath

                }

            );

            this.monitoring.updateMetric(

                "objectsValidated"

            );

        }


        console.log(
            "Source validation passed."
        );


        return context;

    }

}
