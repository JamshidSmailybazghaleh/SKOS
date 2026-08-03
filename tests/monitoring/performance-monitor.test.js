/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Performance Monitor
 * File      : performance-monitor.test.js
 *
 * Build     : BUILD-000442
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

const PerformanceMonitor =
    require("../../src/monitoring/performance-monitor");


describe(
    "SKOS Performance Monitor Tests",
    () => {

        let monitor;


        beforeEach(() => {

            monitor =
                new PerformanceMonitor();

        });



        test(
            "Performance monitor should initialize",
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
            "Should start operation measurement",
            () => {

                expect(
                    monitor.start(
                        "OPERATION-001"
                    )
                ).toBe(true);


                expect(
                    monitor.operations.has(
                        "OPERATION-001"
                    )
                ).toBe(true);

            }
        );



        test(
            "Should stop operation measurement",
            async () => {

                monitor.start(
                    "OPERATION-002"
                );


                const result =
                    monitor.stop(
                        "OPERATION-002"
                    );


                expect(
                    result.operationId
                ).toBe(
                    "OPERATION-002"
                );


                expect(
                    result.durationMs
                ).toBeGreaterThanOrEqual(0);

            }
        );



        test(
            "Should reject stopping unknown operation",
            () => {

                expect(
                    () =>
                        monitor.stop(
                            "UNKNOWN"
                        )
                ).toThrow();

            }
        );



        test(
            "Should record manual measurement",
            () => {

                expect(
                    monitor.record(
                        "DATABASE_QUERY",
                        25
                    )
                ).toBe(true);


                expect(
                    monitor.getMeasurements().length
                ).toBe(1);

            }
        );



        test(
            "Should retrieve operation history",
            () => {

                monitor.record(
                    "INFERENCE",
                    10
                );


                monitor.record(
                    "INFERENCE",
                    20
                );


                expect(
                    monitor.getOperationHistory(
                        "INFERENCE"
                    ).length
                ).toBe(2);

            }
        );



        test(
            "Should calculate average execution time",
            () => {

                monitor.record(
                    "PIPELINE",
                    100
                );


                monitor.record(
                    "PIPELINE",
                    200
                );


                expect(
                    monitor.calculateAverage(
                        "PIPELINE"
                    )
                ).toBe(150);

            }
        );



        test(
            "Should calculate minimum execution time",
            () => {

                monitor.record(
                    "ENGINE",
                    50
                );


                monitor.record(
                    "ENGINE",
                    15
                );


                monitor.record(
                    "ENGINE",
                    80
                );


                expect(
                    monitor.calculateMinimum(
                        "ENGINE"
                    )
                ).toBe(15);

            }
        );



        test(
            "Should calculate maximum execution time",
            () => {

                monitor.record(
                    "ENGINE",
                    50
                );


                monitor.record(
                    "ENGINE",
                    150
                );


                monitor.record(
                    "ENGINE",
                    80
                );


                expect(
                    monitor.calculateMaximum(
                        "ENGINE"
                    )
                ).toBe(150);

            }
        );



        test(
            "Should calculate throughput",
            () => {

                expect(
                    monitor.calculateThroughput(
                        100,
                        10
                    )
                ).toBe(10);

            }
        );



        test(
            "Should return zero throughput for invalid time",
            () => {

                expect(
                    monitor.calculateThroughput(
                        100,
                        0
                    )
                ).toBe(0);

            }
        );



        test(
            "Should register custom statistic",
            () => {

                expect(
                    monitor.registerStatistic(
                        "ACTIVE_USERS",
                        250
                    )
                ).toBe(true);


                expect(
                    monitor.getStatistic(
                        "ACTIVE_USERS"
                    )
                ).toBe(250);

            }
        );



        test(
            "Should clear measurements",
            () => {

                monitor.record(
                    "TEST",
                    20
                );


                monitor.clear();


                expect(
                    monitor.getMeasurements().length
                ).toBe(0);

            }
        );



        test(
            "Should return performance statistics",
            () => {

                monitor.start(
                    "OP-STAT"
                );


                monitor.stop(
                    "OP-STAT"
                );


                const stats =
                    monitor.getStatistics();


                expect(
                    stats.completedMeasurements
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
                    "Performance Monitor"
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
                ).toBe(
                    "SHUTDOWN"
                );

            }
        );

    }
);
