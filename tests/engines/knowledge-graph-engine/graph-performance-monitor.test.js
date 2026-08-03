/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Performance Monitor
 * File      : graph-performance-monitor.test.js
 *
 * Build     : BUILD-000369
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphPerformanceMonitor =
    require(
        "../../src/engines/knowledge-graph-engine/graph-performance-monitor"
    );



describe(

    "SKOS Graph Performance Monitor Tests",

    () => {



        let monitor;



        beforeEach(

            () => {


                monitor =
                    new GraphPerformanceMonitor();


            }

        );





        test(

            "Monitor should initialize",

            () => {


                expect(

                    monitor.initialize()

                ).toBe(true);



                expect(

                    monitor.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should measure query performance",

            () => {


                monitor.initialize();



                monitor.recordQuery(

                    100

                );


                const dashboard =

                    monitor.getDashboard();



                expect(

                    dashboard.metrics.queries

                ).toBe(1);



                expect(

                    dashboard.averages.queryTime

                ).toBe(100);


            }

        );





        test(

            "Should measure traversal performance",

            () => {


                monitor.initialize();



                monitor.recordTraversal(

                    50,

                    5

                );



                const dashboard =

                    monitor.getDashboard();



                expect(

                    dashboard.metrics.traversals

                ).toBe(1);



                expect(

                    dashboard.averages.traversalTime

                ).toBe(50);


            }

        );





        test(

            "Should calculate cache efficiency",

            () => {


                monitor.recordCacheHit();


                monitor.recordCacheHit();


                monitor.recordCacheMiss();



                expect(

                    monitor.getCacheEfficiency()

                ).toBeCloseTo(

                    66.66,

                    1

                );


            }

        );





        test(

            "Should record storage operations",

            () => {


                monitor.recordStorageRead();


                monitor.recordStorageWrite();



                const dashboard =

                    monitor.getDashboard();



                expect(

                    dashboard.metrics.storageReads

                ).toBe(1);



                expect(

                    dashboard.metrics.storageWrites

                ).toBe(1);


            }

        );





        test(

            "Should record optimization runs",

            () => {


                monitor.recordOptimization();



                expect(

                    monitor.metrics.optimizationRuns

                ).toBe(1);


            }

        );





        test(

            "Should generate performance dashboard",

            () => {


                const dashboard =

                    monitor.getDashboard();



                expect(

                    dashboard.name

                ).toBe(

                    "Graph Performance Monitor"

                );


                expect(

                    dashboard.metrics

                ).toBeDefined();


                expect(

                    dashboard.historySize

                ).toBe(0);


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
