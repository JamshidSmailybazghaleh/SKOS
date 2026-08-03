/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Startup Manager
 * File      : startup-manager.test.js
 *
 * Build     : BUILD-000449
 * Version   : 1.0.0
 * ==========================================================
 */

const StartupManager =
    require("../../src/runtime/startup-manager");


class MockBootstrap {

    constructor() {

        this.status = "CREATED";

    }

    initialize() {

        this.status = "INITIALIZED";

        return true;

    }

    shutdown() {

        this.status = "SHUTDOWN";

        return true;

    }

}



class MockKernel {

    constructor() {

        this.status = "CREATED";

        this.sdkcConnected = false;

        this.knowledgeReady = false;

        this.autonomousReady = false;

    }

    initialize() {

        this.status = "INITIALIZED";

        return true;

    }

    connectSDKC() {

        this.sdkcConnected = true;

        return true;

    }

    activateKnowledgeRuntime() {

        this.knowledgeReady = true;

        return true;

    }

    activateAutonomousRuntime() {

        this.autonomousReady = true;

        return true;

    }

    shutdown() {

        this.status = "SHUTDOWN";

        return true;

    }

}



class MockOrchestrator {

    constructor() {

        this.status = "CREATED";

    }

    startAll() {

        this.status = "RUNNING";

        return true;

    }

    shutdownAll() {

        this.status = "SHUTDOWN";

        return true;

    }

}



describe(
    "SKOS Startup Manager Tests",
    () => {

        let startup;

        beforeEach(() => {

            startup =
                new StartupManager();

        });



        test(
            "Should attach Bootstrap Runtime",
            () => {

                const runtime =
                    new MockBootstrap();

                startup.attachBootstrap(runtime);

                expect(
                    startup.bootstrap
                ).toBe(runtime);

            }
        );



        test(
            "Should attach Kernel",
            () => {

                const kernel =
                    new MockKernel();

                startup.attachKernel(kernel);

                expect(
                    startup.kernel
                ).toBe(kernel);

            }
        );



        test(
            "Should attach Engine Orchestrator",
            () => {

                const orchestrator =
                    new MockOrchestrator();

                startup.attachOrchestrator(orchestrator);

                expect(
                    startup.orchestrator
                ).toBe(orchestrator);

            }
        );



        test(
            "Should execute startup sequence",
            () => {

                startup.attachBootstrap(
                    new MockBootstrap()
                );

                startup.attachKernel(
                    new MockKernel()
                );

                startup.attachOrchestrator(
                    new MockOrchestrator()
                );

                expect(
                    startup.run()
                ).toBe(true);

                expect(
                    startup.status
                ).toBe("READY");

            }
        );



        test(
            "Should connect SDKC",
            () => {

                const kernel =
                    new MockKernel();

                startup.attachKernel(kernel);

                kernel.connectSDKC();

                expect(
                    kernel.sdkcConnected
                ).toBe(true);

            }
        );



        test(
            "Should activate Knowledge Runtime",
            () => {

                const kernel =
                    new MockKernel();

                startup.attachKernel(kernel);

                kernel.activateKnowledgeRuntime();

                expect(
                    kernel.knowledgeReady
                ).toBe(true);

            }
        );



        test(
            "Should activate Autonomous Runtime",
            () => {

                const kernel =
                    new MockKernel();

                startup.attachKernel(kernel);

                kernel.activateAutonomousRuntime();

                expect(
                    kernel.autonomousReady
                ).toBe(true);

            }
        );



        test(
            "Should record executed steps",
            () => {

                startup.attachBootstrap(
                    new MockBootstrap()
                );

                startup.attachKernel(
                    new MockKernel()
                );

                startup.attachOrchestrator(
                    new MockOrchestrator()
                );

                startup.run();

                expect(
                    startup.getSteps().length
                ).toBeGreaterThan(0);

            }
        );



        test(
            "Should return runtime status",
            () => {

                const status =
                    startup.getStatus();

                expect(
                    status.name
                ).toBe(
                    "Startup Manager"
                );

                expect(
                    status.version
                ).toBe("1.0.0");

            }
        );



        test(
            "Should shutdown complete runtime",
            () => {

                const runtime =
                    new MockBootstrap();

                const kernel =
                    new MockKernel();

                const orchestrator =
                    new MockOrchestrator();

                startup.attachBootstrap(runtime);

                startup.attachKernel(kernel);

                startup.attachOrchestrator(orchestrator);

                startup.shutdown();

                expect(
                    startup.status
                ).toBe("SHUTDOWN");

                expect(
                    runtime.status
                ).toBe("SHUTDOWN");

                expect(
                    kernel.status
                ).toBe("SHUTDOWN");

                expect(
                    orchestrator.status
                ).toBe("SHUTDOWN");

            }
        );

    }
);
