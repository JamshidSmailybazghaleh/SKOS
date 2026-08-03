/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Health Monitor
 * File      : health-monitor.test.js
 *
 * Build     : BUILD-000441
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

const HealthMonitor =
    require("../../src/monitoring/health-monitor");


describe(
    "SKOS Health Monitor Tests",
    () => {

        let monitor;

        beforeEach(() => {

            monitor =
                new HealthMonitor();

        });


        test(
            "Health monitor should initialize",
            () => {

                expect(
                    monitor.initialize()
                ).toBe(true);

                expect(
                    monitor.status
                ).toBe("INITIALIZED");

            }
        );


        test(
            "Should register component",
            () => {

                expect(
                    monitor.registerComponent(
                        "ENGINE-001",
                        {
                            name:
                                "Reasoning Engine"
                        }
                    )
                ).toBe(true);

                expect(
                    monitor.getAllHealth().length
                ).toBe(1);

            }
        );


        test(
            "Should reject invalid component id",
            () => {

                expect(
                    () =>
                        monitor.registerComponent(
                            null
                        )
                ).toThrow();

            }
        );


        test(
            "Should update health",
            () => {

                monitor.registerComponent(
                    "ENGINE-002"
                );

                const result =
                    monitor.updateHealth(
                        "ENGINE-002",
                        "HEALTHY",
                        {
                            latency: 12
                        }
                    );

                expect(
                    result.state
                ).toBe("HEALTHY");

                expect(
                    result.details.latency
                ).toBe(12);

            }
        );


        test(
            "Should reject unknown component",
            () => {

                expect(
                    () =>
                        monitor.updateHealth(
                            "UNKNOWN",
                            "FAILED"
                        )
                ).toThrow();

            }
        );


        test(
            "Should increment uptime",
            () => {

                monitor.registerComponent(
                    "ENGINE-003"
                );

                expect(
                    monitor.incrementUptime(
                        "ENGINE-003",
                        5000
                    )
                ).toBe(true);

                expect(
                    monitor
                        .getComponentHealth(
                            "ENGINE-003"
                        )
                        .uptime
                ).toBe(5000);

            }
        );


        test(
            "Should return false for unknown uptime component",
            () => {

                expect(
                    monitor.incrementUptime(
                        "UNKNOWN",
                        1000
                    )
                ).toBe(false);

            }
        );


        test(
            "Should retrieve healthy components",
            () => {

                monitor.registerComponent(
                    "A"
                );

                monitor.registerComponent(
                    "B"
                );

                monitor.updateHealth(
                    "A",
                    "HEALTHY"
                );

                monitor.updateHealth(
                    "B",
                    "FAILED"
                );

                expect(
                    monitor
                        .getHealthyComponents()
                        .length
                ).toBe(1);

            }
        );


        test(
            "Should retrieve unhealthy components",
            () => {

                monitor.registerComponent(
                    "A"
                );

                monitor.updateHealth(
                    "A",
                    "WARNING"
                );

                expect(
                    monitor
                        .getUnhealthyComponents()
                        .length
                ).toBe(1);

            }
        );


        test(
            "Should generate report",
            () => {

                monitor.registerComponent(
                    "ENGINE-004"
                );

                monitor.updateHealth(
                    "ENGINE-004",
                    "HEALTHY"
                );

                const report =
                    monitor.generateReport();

                expect(
                    report.total
                ).toBe(1);

                expect(
                    report.healthy
                ).toBe(1);

            }
        );


        test(
            "Should return statistics",
            () => {

                monitor.registerComponent(
                    "ENGINE-005"
                );

                monitor.updateHealth(
                    "ENGINE-005",
                    "HEALTHY"
                );

                const stats =
                    monitor.getStatistics();

                expect(
                    stats.registeredComponents
                ).toBe(1);

                expect(
                    stats.healthChecks
                ).toBe(1);

            }
        );


        test(
            "Should return monitor status",
            () => {

                const status =
                    monitor.getStatus();

                expect(
                    status.name
                ).toBe(
                    "Health Monitor"
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

                monitor.initialize();

                expect(
                    monitor.shutdown()
                ).toBe(true);

                expect(
                    monitor.status
                ).toBe("SHUTDOWN");

            }
        );

    }
);
