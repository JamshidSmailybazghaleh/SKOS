/**
 * SKOS
 * Intake Engine
 *
 * BUILD-000015
 * Generation Zero
 */

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

    public start(): void {

        console.log("==================================");
        console.log("SKOS Intake Engine");
        console.log("Generation Zero");
        console.log("Status : READY");
        console.log("==================================");

    }

    public receive(request: IntakeRequest): IntakeResult {

        console.log("Receiving source...");

        return {

            accepted: true,

            message: "Source accepted."

        };

    }

}
