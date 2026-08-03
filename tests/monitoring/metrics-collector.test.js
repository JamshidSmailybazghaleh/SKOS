/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Metrics Collector
 * File      : metrics-collector.test.js
 *
 * Build     : BUILD-000440
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

const MetricsCollector =
    require("../../src/monitoring/metrics-collector");


describe(
    "SKOS Metrics Collector Tests",
    () => {

        let collector;

        beforeEach(() => {

            collector =
                new MetricsCollector();

        });


        test(
            "Metrics collector should initialize",
            () => {

                expect(
                    collector.initialize()
                ).toBe(true);

                expect(
                    collector.status
                ).toBe("INITIALIZED");

            }
        );


        test(
            "Should register metric",
            () => {

                expect(
                    collector.registerMetric(
                        "CPU_USAGE",
                        {
                            unit: "%"
                        }
                    )
                ).toBe(true);

                expect(
                    collector.getStatistics()
                        .registeredMetrics
                ).toBe(1);

            }
        );


        test(
            "Should reject invalid metric name",
            () => {

                expect(
                    () =>
                        collector.registerMetric(
                            null
                        )
                ).toThrow();

            }
        );


        test(
            "Should record metric values",
            () => {

                collector.record(
                    "CPU_USAGE",
                    40
                );

                collector.record(
                    "CPU_USAGE",
                    60
                );

                expect(
                    collector
                        .getMetricValues(
                            "CPU_USAGE"
                        )
                        .length
                ).toBe(2);

            }
        );


        test(
            "Should calculate average",
            () => {

                collector.record(
                    "MEMORY",
                    20
                );

                collector.record(
                    "MEMORY",
                    40
                );

                expect(
                    collector.calculateAverage(
                        "MEMORY"
                    )
                ).toBe(30);

            }
        );


        test(
            "Should calculate minimum",
            () => {

                collector.record(
                    "LATENCY",
                    12
                );

                collector.record(
                    "LATENCY",
                    8
                );

                collector.record(
                    "LATENCY",
                    25
                );

                expect(
                    collector.calculateMinimum(
                        "LATENCY"
                    )
                ).toBe(8);

            }
        );


        test(
            "Should calculate maximum",
            () => {

                collector.record(
                    "LATENCY",
                    10
                );

                collector.record(
                    "LATENCY",
                    55
                );

                collector.record(
                    "LATENCY",
                    15
                );

                expect(
                    collector.calculateMaximum(
                        "LATENCY"
                    )
                ).toBe(55);

            }
        );


        test(
            "Should return latest metric",
            () => {

                collector.record(
                    "REQUESTS",
                    100
                );

                collector.record(
                    "REQUESTS",
                    120
                );

                expect(
                    collector
                        .calculateLatest(
                            "REQUESTS"
                        )
                        .value
                ).toBe(120);

            }
        );


        test(
            "Should clear metric",
            () => {

                collector.record(
                    "QUEUE",
                    5
                );

                collector.clearMetric(
                    "QUEUE"
                );

                expect(
                    collector
                        .getMetricValues(
                            "QUEUE"
                        )
                        .length
                ).toBe(0);

            }
        );


        test(
            "Should clear all metrics",
            () => {

                collector.record(
                    "A",
                    1
                );

                collector.record(
                    "B",
                    2
                );

                collector.clearAll();

                expect(
                    collector
                        .getStatistics()
                        .registeredMetrics
                ).toBe(0);

            }
        );


        test(
            "Should return statistics",
            () => {

                collector.record(
                    "CPU",
                    10
                );

                collector.record(
                    "CPU",
                    20
                );

                collector.record(
                    "RAM",
                    30
                );

                const stats =
                    collector.getStatistics();

                expect(
                    stats.registeredMetrics
                ).toBe(2);

                expect(
                    stats.totalSamples
                ).toBe(3);

            }
        );


        test(
            "Should return collector status",
            () => {

                const status =
                    collector.getStatus();

                expect(
                    status.name
                ).toBe(
                    "Metrics Collector"
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

                collector.initialize();

                expect(
                    collector.shutdown()
                ).toBe(true);

                expect(
                    collector.status
                ).toBe("SHUTDOWN");

            }
        );

    }
);
