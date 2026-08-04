/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SKOS Core Entry Point
 * File      : skos.js
 *
 * Build     : BUILD-000908.1
 * Version   : 1.0.0
 *
 * ==========================================================
 */

const OperationalBootSequence =
require(
    "./mission-control/operational-boot-sequence"
);

const BootManager =
require(
    "./mission-control/boot-manager"
);

const RuntimeOrchestrator =
require(
    "./mission-control/runtime-orchestrator"
);

const BootVerificationEngine =
require(
    "./mission-control/boot-verification-engine"
);

const OperationalStateManager =
require(
    "./mission-control/operational-state-manager"
);



class SKOS {


    constructor() {

        this.name =
            "Smaily Knowledge Operating System";

        this.version =
            "1.0.0";

        this.build =
            "BUILD-000908.1";

        this.status =
            "CREATED";

        this.bootSequence =
            new OperationalBootSequence();

        this.bootManager =
            new BootManager();

        this.orchestrator =
            new RuntimeOrchestrator();

        this.verifier =
            new BootVerificationEngine();

        this.state =
            new OperationalStateManager();

    }



    async initialize() {

        this.status =
            "INITIALIZING";

        this.bootSequence.initialize();

        this.bootManager.initialize();

        this.orchestrator.initialize();

        this.verifier.initialize();

        this.state.initialize();

        this.bootSequence.attachBootManager(
            this.bootManager
        );

        this.bootSequence.attachOrchestrator(
            this.orchestrator
        );

        this.bootSequence.attachVerifier(
            this.verifier
        );

        return true;

    }



    async start() {

        await this.initialize();

        this.verifier.attachComponent(
            "kernel",
            {
                status: "READY"
            }
        );

        this.verifier.attachComponent(
            "runtime",
            {
                status: "OPERATIONAL"
            }
        );

        this.verifier.attachComponent(
            "state",
            {
                readiness: true
            }
        );

        const report =
            await this.bootSequence.execute();

        this.state.setState(
            "system",
            report.success
                ? "OPERATIONAL"
                : "FAILED"
        );

        this.state.setState(
            "readiness",
            report.success
        );

        this.status =
            report.success
                ? "RUNNING"
                : "FAILED";

        return report;

    }



    async shutdown() {

        this.status =
            "SHUTTING_DOWN";

        await this.orchestrator.shutdown();

        this.state.shutdown();

        this.status =
            "STOPPED";

        return true;

    }



    getStatus() {

        return {

            system:
                this.name,

            version:
                this.version,

            build:
                this.build,

            status:
                this.status

        };

    }

}



module.exports =
    new SKOS();
