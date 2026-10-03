/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Engine Orchestrator
 * File      : engine-orchestrator.test.js
 *
 * Build     : BUILD-000447
 * Version   : 1.0.0
 * ==========================================================
 */

const EngineOrchestrator =
    require("../../src/kernel/engine-orchestrator");


class MockEngine {

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


describe(
    "SKOS Engine Orchestrator Tests",
    () => {

        let orchestrator;

        beforeEach(() => {

            orchestrator =
                new EngineOrchestrator();

        });


        test(
            "Should initialize orchestrator",
            () => {

                expect(
                    orchestrator.initialize()
                ).toBe(true);

                expect(
                    orchestrator.status
                ).toBe("INITIALIZED");

            }
        );


        test(
            "Should register engine",
            () => {

                const engine =
                    new MockEngine();

                expect(
                    orchestrator.registerEngine(
                        "ENGINE-A",
                        engine
                    )
                ).toBe(true);

                expect(
                    orchestrator.engines.has(
                        "ENGINE-A"
                    )
                ).toBe(true);

            }
        );


        test(
            "Should reject invalid engine id",
            () => {

                expect(
                    () =>
                        orchestrator.registerEngine(
                            null,
                            new MockEngine()
                        )
                ).toThrow();

            }
        );


        test(
            "Should register dependency",
            () => {

                orchestrator.registerEngine(
                    "ENGINE-A",
                    new MockEngine()
                );

                orchestrator.registerEngine(
                    "ENGINE-B",
                    new MockEngine()
                );

                expect(
                    orchestrator.addDependency(
                        "ENGINE-B",
                        "ENGINE-A"
                    )
                ).toBe(true);

                expect(
                    orchestrator
                        .dependencies
                        .get("ENGINE-B")
                ).toContain("ENGINE-A");

            }
        );


        test(
            "Should build execution order",
            () => {

                orchestrator.registerEngine(
                    "ENGINE-A",
                    new MockEngine()
                );

                orchestrator.registerEngine(
                    "ENGINE-B",
                    new MockEngine()
                );

                orchestrator.addDependency(
                    "ENGINE-B",
                    "ENGINE-A"
                );

                const order =
                    orchestrator.buildExecutionOrder();

                expect(order).toEqual([
                    "ENGINE-A",
                    "ENGINE-B"
                ]);

            }
        );


        test(
            "Should start all engines",
            () => {

                const a =
                    new MockEngine();

                const b =
                    new MockEngine();

                orchestrator.registerEngine(
                    "A",
                    a
                );

                orchestrator.registerEngine(
                    "B",
                    b
                );

                orchestrator.addDependency(
                    "B",
                    "A"
                );

                expect(
                    orchestrator.startAll()
                ).toBe(true);

                expect(
                    a.status
                ).toBe("INITIALIZED");

                expect(
                    b.status
                ).toBe("INITIALIZED");

                expect(
                    orchestrator.status
                ).toBe("RUNNING");

            }
        );


        test(
            "Should emit orchestration events",
            () => {

                orchestrator.emit(
                    "TEST_EVENT",
                    {
                        value: 100
                    }
                );

                expect(
                    orchestrator.getEvents().length
                ).toBe(1);

                expect(
                    orchestrator
                        .getEvents()[0]
                        .event
                ).toBe("TEST_EVENT");

            }
        );


        test(
            "Should return execution order",
            () => {

                orchestrator.registerEngine(
                    "A",
                    new MockEngine()
                );

                orchestrator.buildExecutionOrder();

                expect(
                    orchestrator
                        .getExecutionOrder()
                        .length
                ).toBe(1);

            }
        );


        test(
            "Should shutdown all engines",
            () => {

                const engine =
                    new MockEngine();

                orchestrator.registerEngine(
                    "ENGINE-X",
                    engine
                );

                orchestrator.buildExecutionOrder();

                orchestrator.startAll();

                expect(
                    orchestrator.shutdownAll()
                ).toBe(true);

                expect(
                    engine.status
                ).toBe("SHUTDOWN");

                expect(
                    orchestrator.status
                ).toBe("SHUTDOWN");

            }
        );


        test(
            "Should return orchestrator status",
            () => {

                const status =
                    orchestrator.getStatus();

                expect(
                    status.name
                ).toBe(
                    "Engine Orchestrator"
                );

                expect(
                    status.version
                ).toBe("1.1.0");

            }
        );


        test(
            "Should recover failed engine and restore HEALTHY monitoring state",
            () => {

                const monitoring = {

                    updateHealth:
                        jest.fn(),

                    recordEvent:
                        jest.fn()

                };

                orchestrator =
                    new EngineOrchestrator({
                        monitoring
                    });

                const engine = {

                    initialize:
                        jest.fn(() => true)

                };

                orchestrator.registerEngine(
                    "RECOVER_ENGINE",
                    engine
                );

                expect(
                    orchestrator.recoverEngine(
                        "RECOVER_ENGINE"
                    )
                ).toBe(true);

                expect(
                    engine.initialize
                ).toHaveBeenCalledTimes(1);

                expect(
                    monitoring.updateHealth
                ).toHaveBeenCalledWith(
                    "RECOVER_ENGINE",
                    "HEALTHY"
                );

                expect(
                    monitoring.recordEvent
                ).toHaveBeenCalledWith(
                    "ENGINE_RECOVERED",
                    {
                        engineId:
                            "RECOVER_ENGINE"
                    }
                );

            }
        );


        test(
            "Should propagate recovery failure as FAILED monitoring state",
            () => {

                const monitoring = {

                    updateHealth:
                        jest.fn(),

                    recordEvent:
                        jest.fn()

                };

                orchestrator =
                    new EngineOrchestrator({
                        monitoring
                    });

                const engine = {

                    initialize:
                        jest.fn(() => {
                            throw new Error(
                                "RECOVERY_FAILURE"
                            );
                        })

                };

                orchestrator.registerEngine(
                    "BROKEN_ENGINE",
                    engine
                );

                expect(
                    () =>
                        orchestrator.recoverEngine(
                            "BROKEN_ENGINE"
                        )
                ).toThrow(
                    "RECOVERY_FAILURE"
                );

                expect(
                    monitoring.updateHealth
                ).toHaveBeenCalledWith(
                    "BROKEN_ENGINE",
                    "FAILED"
                );

                expect(
                    monitoring.recordEvent
                ).toHaveBeenCalledWith(
                    "ENGINE_RECOVERY_FAILED",
                    expect.objectContaining({
                        engineId:
                            "BROKEN_ENGINE",
                        error:
                            "RECOVERY_FAILURE"
                    })
                );

            }
        );


        test(
            "Should reject recovery of unknown engine",
            () => {

                expect(
                    () =>
                        orchestrator.recoverEngine(
                            "UNKNOWN_ENGINE"
                        )
                ).toThrow();

            }
        );

    }
);
