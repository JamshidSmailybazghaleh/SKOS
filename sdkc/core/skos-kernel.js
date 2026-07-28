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

    async initialize() {

        Logger.info("Initializing SKOS Kernel...");

        await RepositoryEngine.initialize();
        await KnowledgeQueryEngine.initialize();
        await KnowledgeGraphEngine.initialize();
        await ReasoningEngine.initialize();
        await RecommendationEngine.initialize();
        await KnowledgeAssistantEngine.initialize();
        await NaturalLanguageEngine.initialize();
        await PublicationEngine.initialize();
        await DigitalLibraryEngine.initialize();
        await BookstoreEngine.initialize();
        await RevenueEngine.initialize();
        await WorkflowEngine.initialize();

        Logger.info("SKOS Kernel Ready.");

        return true;

    },

    async shutdown() {

        Logger.info("Shutting Down SKOS...");

        return true;

    },

    version() {

        return "1.0.0";

    },

    status() {

        return "READY";

    }

};

window.SKOSKernel = SKOSKernel;

Object.freeze(SKOSKernel);
