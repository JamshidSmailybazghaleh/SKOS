/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Monitoring Engine
 * File      : monitoring-engine.test.js
 *
 * Build     : BUILD-000438
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

const MonitoringEngine =
    require("../../src/monitoring/monitoring-engine");


describe(
    "SKOS Monitoring Engine Tests",
    () => {

        let engine;

        beforeEach(() => {

            engine =
                new MonitoringEngine();

        });


        test(
            "Monitoring engine should initialize",
            () => {

                expect(
                    engine.initialize()
                ).toBe(true);

                expect(
                    engine.status
                ).toBe("INITIALIZED");

            }
        );


        test(
            "Should register component",
            () => {

                const component =
                    engine.registerComponent(
                        "ENGINE-001",
                        {
                            name: "Reasoning Engine",
                            version: "1.0.0"
                        }
                    );

                expect(
                    component.id
                ).toBe("ENGINE-001");

                expect(
                    component.status
                ).toBe("ONLINE");

            }
        );


        test(
            "Should reject invalid component id",
            () => {

                expect(
                    () =>
                        engine.registerComponent(
                            null,
                            {}
                        )
                ).toThrow();

            }
        );


        test(
            "Should record event",
            () => {

                const event =
                    engine.recordEvent(
                        "ENGINE_STARTED",
                        {
                            engine:
                                "Autonomous"
                        }
                    );

                expect(
                    event.event
                ).toBe("ENGINE_STARTED");

                expect(
                    engine.getEvents().length
                ).toBe(1);

            }
        );


        test(
            "Should record metric",
            () => {

                const metric =
                    engine.recordMetric(
                        "CPU_USAGE",
                        25
                    );

                expect(
                    metric.value
                ).toBe(25);

                expect(
                    engine.getMetrics().length
                ).toBe(1);

            }
        );


        test(
            "Should reject invalid metric name",
            () => {

                expect(
                    () =>
                        engine.recordMetric(
                            null,
                            10
                        )
                ).toThrow();

            }
        );


        test(
            "Should update component health",
            () => {

                engine.registerComponent(
                    "ENGINE-002"
                );

                expect(
                    engine.updateHealth(
                        "ENGINE-002",
                        "HEALTHY"
                    )
                ).toBe(true);

                expect(
                    engine.getHealth().length
                ).toBe(1);

            }
        );


        test(
            "Should create alert",
            () => {

                const alert =
                    engine.createAlert(
                        "WARNING",
                        "High Memory Usage"
                    );

                expect(
                    alert.level
                ).toBe("WARNING");

                expect(
                    engine.getAlerts().length
                ).toBe(1);

            }
        );


        test(
            "Should retrieve components",
            () => {

                engine.registerComponent(
                    "ENGINE-003"
                );

                expect(
                    engine.getComponents().length
                ).toBe(1);

            }
        );


        test(
            "Should retrieve events",
            () => {

                engine.recordEvent(
                    "EVENT-001"
                );

                expect(
                    engine.getEvents().length
                ).toBe(1);

            }
        );


        test(
            "Should return monitoring statistics",
            () => {

                engine.registerComponent(
                    "ENGINE-004"
                );

                engine.recordEvent(
                    "START"
                );

                engine.recordMetric(
                    "CPU",
                    50
                );

                engine.updateHealth(
                    "ENGINE-004",
                    "OK"
                );

                engine.createAlert(
                    "INFO",
                    "Running"
                );

                const stats =
                    engine.getStatistics();

                expect(
                    stats.components
                ).toBe(1);

                expect(
                    stats.events
                ).toBe(2); // START + ALERT_CREATED

                expect(
                    stats.metrics
                ).toBe(1);

                expect(
                    stats.healthChecks
                ).toBe(1);

                expect(
                    stats.alerts
                ).toBe(1);

            }
        );


        test(
            "Should return engine status",
            () => {

                const status =
                    engine.getStatus();

                expect(
                    status.name
                ).toBe(
                    "Monitoring Engine"
                );

                expect(
                    status.version
                ).toBe(
                    "1.0.0"
                );

            }
        );


        test(
            "Should shutdown correctly",
            () => {

                engine.initialize();

                expect(
                    engine.shutdown()
                ).toBe(true);

                expect(
                    engine.status
                ).toBe("SHUTDOWN");

            }
        );

    }
);
