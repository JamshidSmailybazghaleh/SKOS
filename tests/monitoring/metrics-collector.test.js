/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Metrics Collector
 * File      : metrics-collector.test.js
 *
 * Build     : BUILD-000800.7
 * Version   : 2.0.0
 *
 * Mission:
 * Validate operational metrics lifecycle,
 * runtime integration and analytics.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const MetricsCollector =
    require("../../src/monitoring/metrics-collector");



describe(
    "SKOS Metrics Collector Operational Tests",
    () => {


        let collector;



        beforeEach(() => {


            collector =
                new MetricsCollector({

                    maxSamples: 3

                });


        });



        test(
            "Should initialize collector",
            () => {


                expect(
                    collector.initialize()
                )
                .toBe(true);



                expect(
                    collector.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );



        test(
            "Should register metric with metadata",
            () => {


                collector.registerMetric(

                    "CPU_USAGE",

                    {

                        unit:
                            "%"

                    }

                );


                const metric =
                    collector.getMetric(
                        "CPU_USAGE"
                    );



                expect(metric)
                    .toBeDefined();



                expect(
                    metric.metadata.unit
                )
                .toBe("%");


            }
        );



        test(
            "Should record metric samples",
            () => {


                collector.record(
                    "CPU",
                    40
                );


                collector.record(
                    "CPU",
                    60
                );


                expect(

                    collector
                    .getMetricValues(
                        "CPU"
                    )

                )
                .toEqual(
                    [
                        40,
                        60
                    ]
                );


            }
        );



        test(
            "Should calculate statistics",
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
                )
                .toBe(30);



                expect(
                    collector.calculateMinimum(
                        "MEMORY"
                    )
                )
                .toBe(20);



                expect(
                    collector.calculateMaximum(
                        "MEMORY"
                    )
                )
                .toBe(40);


            }
        );



        test(
            "Should return latest sample",
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
                    collector.calculateLatest(
                        "REQUESTS"
                    ).value
                )
                .toBe(120);


            }
        );



        test(
            "Should execute runtime collection",
            () => {


                collector.initialize();



                collector.execute({

                    runtimeStatus:
                        "READY",

                    engineCount:
                        16,

                    knowledgeObjects:
                        0

                });



                expect(

                    collector
                    .getMetricValues(
                        "runtime.status"
                    )

                )
                .toContain(
                    "READY"
                );


            }
        );



        test(
            "Should track events",
            () => {


                collector.initialize();



                expect(
                    collector.getEvents()
                        .length
                )
                .toBeGreaterThan(0);


            }
        );



        test(
            "Should respect maximum samples",
            () => {


                collector.record(
                    "TEST",
                    1
                );


                collector.record(
                    "TEST",
                    2
                );


                collector.record(
                    "TEST",
                    3
                );


                collector.record(
                    "TEST",
                    4
                );



                expect(

                    collector
                    .getMetricValues(
                        "TEST"
                    )
                    .length

                )
                .toBe(3);


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

                )
                .toBe(0);


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
                )
                .toBe(0);


            }
        );



        test(
            "Should shutdown correctly",
            () => {


                collector.initialize();



                expect(
                    collector.shutdown()
                )
                .toBe(true);



                expect(
                    collector.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );



        test(
            "Should return operational status",
            () => {


                const status =
                    collector.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Metrics Collector"
                );



                expect(
                    status.version
                )
                .toBe(
                    "2.0.0"
                );


            }
        );


    }
);
