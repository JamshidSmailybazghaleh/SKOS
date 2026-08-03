/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Startup Manager
 * File      : startup-manager.js
 *
 * Build     : BUILD-000449
 * Version   : 1.0.0
 *
 * Mission:
 * Complete operational startup sequence of SKOS.
 * ==========================================================
 */

class StartupManager {

    constructor(options = {}) {

        this.name = "Startup Manager";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.bootstrap = null;
        this.kernel = null;
        this.orchestrator = null;

        this.steps = [];
        this.startTime = null;

        this.options = options;
    }



    attachBootstrap(runtime) {

        this.bootstrap = runtime;

    }



    attachKernel(kernel) {

        this.kernel = kernel;

    }



    attachOrchestrator(orchestrator) {

        this.orchestrator = orchestrator;

    }



    run() {

        this.startTime = new Date();

        this.status = "STARTING";

        this.executeStep(
            "BOOTSTRAP_RUNTIME",
            () => this.bootstrap.initialize()
        );

        this.executeStep(
            "KERNEL_INITIALIZATION",
            () => this.kernel.initialize()
        );

        this.executeStep(
            "SDKC_CONNECTION",
            () => this.kernel.connectSDKC()
        );

        this.executeStep(
            "KNOWLEDGE_RUNTIME",
            () => this.kernel.activateKnowledgeRuntime()
        );

        this.executeStep(
            "AUTONOMOUS_RUNTIME",
            () => this.kernel.activateAutonomousRuntime()
        );

        this.executeStep(
            "ENGINE_ORCHESTRATION",
            () => this.orchestrator.startAll()
        );

        this.status = "READY";

        return true;
    }



    executeStep(name, callback) {

        const record = {

            name,
            status: "RUNNING",
            started: new Date()

        };

        this.steps.push(record);

        try {

            callback();

            record.status = "SUCCESS";

        } catch (error) {

            record.status = "FAILED";
            record.error = error.message;

            this.status = "FAILED";

            throw error;

        }

        record.finished = new Date();

        return true;
    }



    getSteps() {

        return this.steps;

    }



    getStatus() {

        return {

            name: this.name,

            version: this.version,

            status: this.status,

            startedAt: this.startTime,

            completedSteps:

                this.steps.filter(
                    step => step.status === "SUCCESS"
                ).length,

            totalSteps:

                this.steps.length

        };

    }



    shutdown() {

        if (this.orchestrator) {

            this.orchestrator.shutdownAll();

        }

        if (this.kernel) {

            this.kernel.shutdown();

        }

        if (this.bootstrap) {

            this.bootstrap.shutdown();

        }

        this.status = "SHUTDOWN";

        return true;
    }

}

module.exports = StartupManager;
