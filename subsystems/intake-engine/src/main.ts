/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Main Engine
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

import { DocumentParser } from "./document-parser";

export interface IntakeRequest {

    sourceType: string;

    sourcePath: string;

    language?: string;

}

export interface IntakeResult {

    accepted: boolean;

    message: string;

}

export class IntakeEngine {

    private parser = new DocumentParser();

    private monitoring: any = null;

    constructor(options: any = {}) {

        this.monitoring =
            options.monitoring || null;

    }

    /**
     * Start Intake Engine
     */

    public start(): void {

        console.log("==================================");
        console.log("SKOS Intake Engine");
        console.log("Generation Zero");
        console.log("Status : READY");
        console.log("==================================");

        if (this.monitoring) {

            this.monitoring.recordEvent(
                "INTAKE_ENGINE_INITIALIZED"
            );

        }

    }

    /**
     * Receive Source
     */

    public receive(
        request: IntakeRequest
    ): IntakeResult {

        console.log("Receiving source...");

        if (this.monitoring) {

            this.monitoring.recordEvent(

                "INTAKE_OBJECT_RECEIVED",

                {

                    sourcePath:
                        request.sourcePath,

                    sourceType:
                        request.sourceType

                }

            );

            this.monitoring.updateMetric(
                "objectsReceived"
            );

        }

        const parsed =
            this.parser.parse(
                request.sourcePath
            );

        console.log("Parsed Document");

        console.log(parsed);

        if (this.monitoring) {

            this.monitoring.recordEvent(

                "INTAKE_DOCUMENT_PARSED"

            );

        }

        return {

            accepted: true,

            message: "Source accepted."

        };

    }

    /**
     * Shutdown
     */

    public shutdown(): void {

        if (this.monitoring) {

            this.monitoring.recordEvent(
                "INTAKE_ENGINE_SHUTDOWN"
            );

        }

    }

}
