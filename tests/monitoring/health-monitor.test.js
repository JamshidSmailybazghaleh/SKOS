/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Health Monitor Operational Tests
 * File      : health-monitor.test.js
 *
 * Build     : BUILD-000800.9
 * Version   : 2.0.0
 *
 * Mission:
 * Validate SKOS health monitoring lifecycle,
 * runtime integration and operational reporting.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const HealthMonitor =
    require("../../src/monitoring/health-monitor");



describe(
    "SKOS Health Monitor Operational Tests",
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
                )
                .toBe(true);



                expect(
                    monitor.status
                )
                .toBe(
                    "INITIALIZED"
                );


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

                )
                .toBe(true);



                expect(
                    monitor.getAllHealth().length
                )
                .toBe(1);


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

                )
                .toThrow();


            }
        );



        test(
            "Should update component health",
            () => {


                monitor.registerComponent(
                    "ENGINE-002"
                );



                const result =
                    monitor.updateHealth(

                        "ENGINE-002",

                        "HEALTHY",

                        {

                            latency:
                                12

                        }

                    );



                expect(
                    result.state
                )
                .toBe(
                    "HEALTHY"
                );



                expect(
                    result.details.latency
                )
                .toBe(12);


            }
        );



        test(
            "Should assign severity level",
            () => {


                monitor.registerComponent(
                    "ENGINE-003"
                );



                const result =
                    monitor.updateHealth(

                        "ENGINE-003",

                        "FAILED"

                    );



                expect(
                    result.severity
                )
                .toBe(
                    "CRITICAL"
                );


            }
        );



        test(
            "Should reject unknown component update",
            () => {


                expect(

                    () =>
                        monitor.updateHealth(

                            "UNKNOWN",

                            "FAILED"

                        )

                )
                .toThrow();


            }
        );



        test(
            "Should increment uptime",
            () => {


                monitor.registerComponent(
                    "ENGINE-004"
                );



                expect(

                    monitor.incrementUptime(

                        "ENGINE-004",

                        5000

                    )

                )
                .toBe(true);



                expect(

                    monitor
                    .getComponentHealth(
                        "ENGINE-004"
                    )
                    .uptime

                )
                .toBe(5000);


            }
        );



        test(
            "Should return healthy components",
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

                )
                .toBe(1);


            }
        );



        test(
            "Should return unhealthy components",
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

                )
                .toBe(1);


            }
        );



        test(
            "Should calculate health score",
            () => {


                monitor.registerComponent(
                    "A"
                );


                monitor.registerComponent(
                    "B"
                );


                monitor.registerComponent(
                    "C"
                );



                monitor.updateHealth(
                    "A",
                    "HEALTHY"
                );


                monitor.updateHealth(
                    "B",
                    "HEALTHY"
                );


                monitor.updateHealth(
                    "C",
                    "FAILED"
                );



                expect(
                    monitor.getHealthScore()
                )
                .toBe(67);


            }
        );



        test(
            "Should execute runtime health cycle",
            () => {


                monitor.initialize();



                const report =
                    monitor.execute({

                        components:

                        [

                            {

                                id:
                                    "ENGINE-001",

                                state:
                                    "HEALTHY"

                            }

                        ]

                    });



                expect(
                    report.total
                )
                .toBe(1);



                expect(
                    monitor.status
                )
                .toBe(
                    "READY"
                );


            }
        );



        test(
            "Should generate health report",
            () => {


                monitor.registerComponent(
                    "ENGINE-005"
                );


                monitor.updateHealth(
                    "ENGINE-005",
                    "HEALTHY"
                );



                const report =
                    monitor.generateReport();



                expect(
                    report.total
                )
                .toBe(1);



                expect(
                    report.healthy
                )
                .toBe(1);



                expect(
                    report.healthScore
                )
                .toBe(100);


            }
        );



        test(
            "Should track health events",
            () => {


                monitor.initialize();



                expect(

                    monitor.getEvents().length

                )
                .toBeGreaterThan(0);


            }
        );



        test(
            "Should return operational statistics",
            () => {


                monitor.registerComponent(
                    "ENGINE-006"
                );


                monitor.updateHealth(
                    "ENGINE-006",
                    "HEALTHY"
                );



                const stats =
                    monitor.getStatistics();



                expect(
                    stats.registeredComponents
                )
                .toBe(1);



                expect(
                    stats.healthChecks
                )
                .toBe(1);



                expect(
                    stats.healthScore
                )
                .toBe(100);


            }
        );



        test(
            "Should return monitor status",
            () => {


                const status =
                    monitor.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Health Monitor"
                );



                expect(
                    status.version
                )
                .toBe(
                    "2.0.0"
                );


            }
        );



        test(
            "Should shutdown correctly",
            () => {


                monitor.initialize();



                expect(
                    monitor.shutdown()
                )
                .toBe(true);



                expect(
                    monitor.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
