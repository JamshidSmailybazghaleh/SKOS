/*
====================================================
SKOS Mission Control

System Startup

BUILD-000359

Version:
1.0

Status:
ACTIVE
====================================================
*/

const SystemStartup = {

    async initialize() {

        Logger.info(
            "=================================="
        );

        Logger.info(
            "SKOS SYSTEM STARTUP"
        );

        Logger.info(
            "=================================="
        );

        /*
        ===============================
        Runtime
        ===============================
        */

        await RuntimeService.initialize();

        /*
        ===============================
        Managers
        ===============================
        */

        await ServiceManager.initialize();

        await EngineManager.initialize();

        /*
        ===============================
        Register Services
        ===============================
        */

        ServiceManager.register(
            "MetadataService",
            MetadataService
        );

        ServiceManager.register(
            "VersionService",
            VersionService
        );

        ServiceManager.register(
            "IntegrityService",
            IntegrityService
        );

        ServiceManager.register(
            "AuditService",
            AuditService
        );

        ServiceManager.register(
            "HealthService",
            HealthService
        );

        ServiceManager.register(
            "DiagnosticService",
            DiagnosticService
        );

        ServiceManager.register(
            "DashboardService",
            DashboardService
        );

        ServiceManager.register(
            "ModuleService",
            ModuleService
        );

        /*
        ===============================
        Start Services
        ===============================
        */

        for (const service of ServiceManager.list()) {

            await ServiceManager.start(
                service.name
            );

        }

        /*
        ===============================
        Register Engines
        ===============================
        */

        EngineManager.register(
            "RepositoryEngine",
            RepositoryEngine
        );

        /*
        در آینده:

        IngestEngine

        SearchEngine

        KnowledgeEngine

        PublicationEngine

        GraphEngine

        ReasoningEngine
        */

        /*
        ===============================
        Start Engines
        ===============================
        */

        for (const engine of EngineManager.list()) {

            await EngineManager.start(
                engine.name
            );

        }

        /*
        ===============================
        Validation
        ===============================
        */

        await RepositoryValidator.validate();

        /*
        ===============================
        Health
        ===============================
        */

        await HealthService.check();

        /*
        ===============================
        Diagnostics
        ===============================
        */

        await DiagnosticService.run();

        /*
        ===============================
        Dashboard
        ===============================
        */

        await DashboardService.getDashboard();

        /*
        ===============================
        Runtime Context
        ===============================
        */

        RuntimeService.setContext(

            "startup",

            "completed"

        );

        Logger.info(
            "=================================="
        );

        Logger.info(
            "SKOS READY"
        );

        Logger.info(
            "=================================="
        );

        return true;

    }

};

window.SystemStartup = SystemStartup;

Object.freeze(
    SystemStartup
);
