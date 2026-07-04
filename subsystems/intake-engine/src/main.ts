/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Main Engine
 *
 * Build     : BUILD-000024
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
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

    public start(): void {

        console.log("==================================");
        console.log("SKOS Intake Engine");
        console.log("Generation Zero");
        console.log("Status : READY");
        console.log("==================================");

    }

    public receive(request: IntakeRequest): IntakeResult {

        console.log("Receiving source...");

        const parsed = this.parser.parse(request.sourcePath);

        console.log("Parsed Document");

        console.log(parsed);

        return {

            accepted: true,

            message: "Source accepted."

        };

    }

}
