/*
====================================================
SKOS Mission Control

SKOS Kernel

BUILD-000374

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

const SKOSKernel = {

    version: "1.0.0",

    initialized: false,

    startedAt: null,

    async initialize() {

        Logger.info(
            "=================================="
        );

        Logger.info(
            "Starting SKOS Kernel..."
        );

        Logger.info(
            "=================================="
        );

        this.startedAt = new Date();

        /*
        Runtime
        */

        await RuntimeService.initialize();

        /*
        Services
        */

        await ServiceManager.initialize();

        /*
        Engines
        */

        await EngineManager.initialize();

        /*
        Repository
        */

        await RepositoryEngine.initialize();

        /*
        Query
        */

        await KnowledgeQueryEngine.initialize();

        /*
        Graph
        */

        await KnowledgeGraphEngine.initialize();

        /*
        Reasoning
        */

        await ReasoningEngine.initialize();

        /*
        Recommendation
        */

        await RecommendationEngine.initialize();

        /*
        Assistant
        */

        await KnowledgeAssistantEngine.initialize();

        /*
        Natural Language
        */

        await NaturalLanguageEngine.initialize();

        /*
        Autonomous Agent
        */

        await AutonomousAgentEngine.initialize();

        /*
        Workflow
        */

        await WorkflowEngine.initialize();

        /*
        Publication
        */

        await PublicationEngine.initialize();

        /*
        Library
        */

        await DigitalLibraryEngine.initialize();

        /*
        Bookstore
        */

        await BookstoreEngine.initialize();

        /*
        Revenue
        */

        await RevenueEngine.initialize();

        /*
        Health
        */

        await HealthService.check();

        this.initialized = true;

        Logger.info(
            "SKOS Kernel Ready."
        );

        return true;

    },

    async shutdown() {

        Logger.info(
            "Stopping SKOS..."
        );

        this.initialized = false;

        return true;

    },

    async restart() {

        await this.shutdown();

        await this.initialize();

    },

    status() {

        return {

            version:
                this.version,

            initialized:
                this.initialized,

            startedAt:
                this.startedAt

        };

    }

};

window.SKOSKernel =
    SKOSKernel;

Object.freeze(
    SKOSKernel);
