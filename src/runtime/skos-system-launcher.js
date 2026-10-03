/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SKOS System Launcher
 * File      : skos-system-launcher.js
 *
 * Build     : BUILD-000451
 * Version   : 1.0.0
 *
 * Mission:
 * Launch complete SKOS runtime.
 * ==========================================================
 */

const IntakeEngine = require("../core/engines/intake-engine/intake-engine");
const SKOSNote = require("../connectors/skos-note/skos-note");
const BootstrapRuntime =
    require("./skos-bootstrap-runtime");

const SKOSKernel =
    require("../kernel/skos-kernel");

const EngineOrchestrator =
    require("../kernel/engine-orchestrator");

const RuntimeEventBridge =
    require("./runtime-event-bridge");

const StartupManager =
    require("./startup-manager");
const RuntimeSupervisor =
    require("../mission-control/runtime-supervisor");

const SDKCRuntimeConnector =
    require("./sdkc-runtime-connector");

const OrderEngine = require("../engines/order-engine/order-engine");
const ApiGateway = require("../communication/api-gateway");
const CommerceAPI = require("../communication/commerce/commerce-api");
const RepositoryService =
    require("../engines/sdkc-engine/repository-service");

const RepositoryTransportServer =
    require("./transport/repository-transport-server");

const MonitoringDashboardBridge =
    require("../monitoring/monitoring-dashboard-bridge");

const OperationalDashboardAdapter =
    require("../monitoring/operational-dashboard-adapter");

const MonitoringDashboardClient =
    require("../mission-control/monitoring-dashboard-client");

const LivePanelController =
    require("../mission-control/live-panel-controller");



class SKOSSystemLauncher {

    constructor() {

        this.version = "1.0.0";

        this.status = "CREATED";

        this.bootstrap =
            new BootstrapRuntime();

        // ILR-002.61-Z
        // Canonical Monitoring authority originates from Bootstrap.
        this.monitoring =
            this.bootstrap.monitoring;

        // Canonical Runtime Event Bridge.
        this.eventBridge =
            new RuntimeEventBridge({
                monitoring:
                    this.monitoring
            });

        // Bridge must be READY before event-producing
        // runtime components are constructed.
        this.eventBridge.initialize();

        this.kernel =
            new SKOSKernel({
                eventBridge:
                    this.eventBridge
            });

        this.orchestrator =
            new EngineOrchestrator({
                monitoring:
                    this.monitoring,
                eventBridge:
                    this.eventBridge
            });

        this.intakeEngine = new IntakeEngine();
        this.orchestrator.registerEngine(
            "INTAKE_ENGINE",
            this.intakeEngine
        );
        this.skosNote = new SKOSNote(this.intakeEngine);
        this.repository =
            new RepositoryService();

        this.intakeEngine.repository =
            this.repository;

        this.orderEngine = new OrderEngine({
            repository: this.repository
        });

        this.orchestrator.registerEngine(
            "ORDER_ENGINE",
            this.orderEngine
        );

        this.apiGateway = new ApiGateway();
        this.apiGateway.initialize();

        this.apiGateway.registerRoute(
            "/commerce/orders",
            payload => this.orderEngine.createOrder(payload)
        );

        this.commerceAPI = new CommerceAPI({
            orderEngine: this.orderEngine,
            gateway: this.apiGateway
        });

        this.sdkc =
            new SDKCRuntimeConnector({
                eventBridge:
                    this.eventBridge
            });

        this.sdkc.attachRepository(
            this.repository
        );

        // M16.8.005.441
        // Canonical Browser → SDKC Repository transport.
        this.repositoryTransport =
            new RepositoryTransportServer({
                connector: this.sdkc
            });

        this.startup =
            new StartupManager();

        // Canonical supervision authority.
        // Lifecycle authority remains StartupManager.
        this.supervisor =
            new RuntimeSupervisor();
        this.supervisor.initialize();
        this.supervisor.attachBootManager(
            this.startup
        );

        // M16.6-C.7.15
        // Canonical Visibility Composition Root.

        this.dashboardBridge =
            new MonitoringDashboardBridge(
                this.monitoring
            );

        this.dashboardAdapter =
            new OperationalDashboardAdapter(
                this.dashboardBridge
            );

        this.dashboardClient =
            new MonitoringDashboardClient(
                this.dashboardAdapter
            );

        this.livePanelController =
            new LivePanelController(
                this.dashboardClient
            );

    }



    initialize() {

        this.startup.attachBootstrap(
            this.bootstrap
        );

        this.startup.attachKernel(
            this.kernel
        );

        this.startup.attachOrchestrator(
            this.orchestrator
        );

        this.startup.attachSDKC(
            this.sdkc
        );

        this.kernel.attachSDKC(
            this.sdkc
        );



        // M16.6-C.7.15
        // Initialize canonical Visibility chain.

        this.dashboardBridge.initialize();
        this.dashboardBridge.connectRuntime(
            this.monitoring
        );

        this.dashboardAdapter.initialize();
        this.dashboardAdapter.connectBridge(
            this.dashboardBridge
        );

        this.dashboardClient.initialize();
        this.dashboardClient.connectAdapter(
            this.dashboardAdapter
        );

        this.livePanelController.initialize();
        this.livePanelController.connectClient(
            this.dashboardClient
        );this.status = "INITIALIZED";

        return true;
    }



    async launch() {

        if (
            this.status !== "INITIALIZED"
        ) {

            this.initialize();

        }

        try {

            // R8.9.16-S.6.3
            // Canonical Repository lifecycle is owned by the Launcher.
            // Repository must be CONNECTED before SDKC startup and
            // before the canonical Repository transport is exposed.
            this.repository.connect();

            this.startup.run();

            // M16.8.005.441
            // Transport starts only after SDKC startup.
            await this.repositoryTransport.initialize();

            if (
                this.monitoring &&
                typeof this.monitoring.start === "function"
            ) {
                await this.monitoring.start();
            }

            // FSP-028.68-P1
            // Activate the canonical live telemetry visibility chain only
            // after Monitoring Runtime is operational and before RUNNING.
            if (
                this.dashboardClient &&
                typeof this.dashboardClient.refresh === "function"
            ) {
                this.dashboardClient.refresh();
            }

            if (
                this.livePanelController &&
                typeof this.livePanelController.refresh === "function"
            ) {
                this.livePanelController.refresh();
            }

            if (
                this.dashboardClient &&
                typeof this.dashboardClient.startAutoRefresh === "function"
            ) {
                this.dashboardClient.startAutoRefresh();
            }

            if (
                this.supervisor &&
                typeof this.supervisor.start === "function"
            ) {
                await this.supervisor.start();
            }

            this.status = "RUNNING";

            return true;

        } catch (error) {

            // M16.8.005.448-R8.5.37
            // Failed launch must not leave transport resources alive.
            // Cleanup is intentionally best-effort and must preserve
            // the original launch error.

            try {

                if (
                    this.repositoryTransport &&
                    typeof this.repositoryTransport.shutdown === "function"
                ) {
                    await this.repositoryTransport.shutdown();
                }

            } catch (_) {
                // Preserve original launch failure.
            }

            if (this.startup) {

                this.startup.status = "FAILED";

            }

            this.status = "FAILED";

            throw error;

        }

    }


    async restart() {
        if (this.status !== "RUNNING") {
            return false;
        }

        if (
            this.dashboardClient &&
            typeof this.dashboardClient.shutdown === "function"
        ) {
            this.dashboardClient.shutdown();
        }

        if (
            this.livePanelController &&
            typeof this.livePanelController.shutdown === "function"
        ) {
            this.livePanelController.shutdown();
        }

        if (
            this.monitoring &&
            typeof this.monitoring.shutdown === "function"
        ) {
            await this.monitoring.shutdown();
        }

        const restarted = this.startup.restart();

        if (!restarted) {
            return false;
        }

        if (
            this.monitoring &&
            typeof this.monitoring.start === "function"
        ) {
            await this.monitoring.start();
        }

        if (
            this.dashboardClient &&
            typeof this.dashboardClient.refresh === "function"
        ) {
            this.dashboardClient.refresh();
        }

        if (
            this.livePanelController &&
            typeof this.livePanelController.refresh === "function"
        ) {
            this.livePanelController.refresh();
        }

        if (
            this.dashboardClient &&
            typeof this.dashboardClient.startAutoRefresh === "function"
        ) {
            this.dashboardClient.startAutoRefresh();
        }

        if (
            this.supervisor &&
            typeof this.supervisor.start === "function"
        ) {
            await this.supervisor.start();
        }

        this.status = "RUNNING";
        return true;
    }

    async shutdown() {


        // M16.6-C.7.15
        // Visibility teardown precedes runtime teardown.

        if (
            this.livePanelController &&
            typeof this.livePanelController.shutdown === "function"
        ) {
            this.livePanelController.shutdown();
        }

        if (
            this.dashboardClient &&
            typeof this.dashboardClient.shutdown === "function"
        ) {
            this.dashboardClient.shutdown();
        }

        if (
            this.dashboardAdapter &&
            typeof this.dashboardAdapter.shutdown === "function"
        ) {
            this.dashboardAdapter.shutdown();
        }

        if (
            this.dashboardBridge &&
            typeof this.dashboardBridge.shutdown === "function"
        ) {
            this.dashboardBridge.shutdown();
        }

        // M16.8.005.441
        // Transport teardown precedes runtime shutdown.
        if (
            this.repositoryTransport &&
            typeof this.repositoryTransport.shutdown === "function"
        ) {
            await this.repositoryTransport.shutdown();
        }

        this.startup.shutdown();

        // R8.9.16-S.6.5
        // Canonical Repository lifecycle is owned by the Launcher.
        // Repository shutdown occurs only after all runtime consumers,
        // including SDKC, have completed their shutdown sequence.
        if (
            this.repository &&
            typeof this.repository.shutdown === "function"
        ) {
            await this.repository.shutdown();
        }

        if (this.supervisor &&
            typeof this.supervisor.shutdown === "function") {
            await this.supervisor.shutdown();
        }

        this.status = "SHUTDOWN";

        return true;
    }



    getStatus() {

        return {

            launcher:

                this.status,

            bootstrap:

                this.bootstrap.status,

            kernel:

                this.kernel.status,

            orchestrator:

                this.orchestrator.status,

            sdkc:

                this.sdkc.status,

            startup:

                this.startup.status
,

            repositoryTransport:
                this.repositoryTransport.getStatus(),
            visibility: {
                bridge:
                    this.dashboardBridge.getStatus(),

                adapter:
                    this.dashboardAdapter.getStatus(),

                client:
                    this.dashboardClient.getStatus(),

                livePanel:
                    this.livePanelController.getStatus()
            }
        };

    }

}



module.exports =
    SKOSSystemLauncher;
