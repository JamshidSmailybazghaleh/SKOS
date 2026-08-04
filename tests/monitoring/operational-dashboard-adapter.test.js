/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Operational Dashboard Adapter
 * File      : operational-dashboard-adapter.test.js
 *
 * Build     : BUILD-000810.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate transformation of monitoring
 * snapshots into operational dashboard models.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const OperationalDashboardAdapter =
    require(
        "../../src/monitoring/operational-dashboard-adapter"
    );



describe(
    "SKOS Operational Dashboard Adapter Tests",
    () => {



        let adapter;

        let bridge;



        beforeEach(() => {



            bridge = {


                getDashboardState:

                    jest.fn()
                    .mockReturnValue({

                        timestamp:
                            new Date(),


                        runtime:
                            {

                                name:
                                    "SKOS Monitoring Runtime",

                                version:
                                    "2.0.0",

                                status:
                                    "READY",

                                monitors:
                                    5

                            },


                        health:
                            {

                                healthy:
                                    5,

                                unhealthy:
                                    0

                            },


                        metrics:
                            {

                                CPU:
                                    40,

                                MEMORY:
                                    60

                            },


                        alerts:
                            {

                                totalAlerts:
                                    2

                            },


                        events:
                            10


                    });


            };



            adapter =

                new OperationalDashboardAdapter();


        });







        test(
            "Should create dashboard adapter",
            () => {


                expect(

                    adapter

                )
                .toBeDefined();



                expect(

                    adapter.name

                )
                .toBe(
                    "Operational Dashboard Adapter"
                );


            }
        );







        test(
            "Should initialize adapter",
            () => {


                expect(

                    adapter.initialize()

                )
                .toBe(true);



                expect(

                    adapter.status

                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );







        test(
            "Should reject missing bridge",
            () => {


                expect(

                    () =>
                        adapter.getOperationalModel()

                )
                .toThrow();


            }
        );







        test(
            "Should connect dashboard bridge",
            () => {


                expect(

                    adapter.connectBridge(
                        bridge
                    )

                )
                .toBe(true);



                expect(

                    adapter.status

                )
                .toBe(
                    "CONNECTED"
                );


            }
        );







        test(
            "Should generate operational dashboard model",
            () => {


                adapter.connectBridge(

                    bridge

                );



                const model =

                    adapter.getOperationalModel();



                expect(

                    model.systemStatus

                )
                .toBe(
                    "READY"
                );



                expect(

                    model.runtime.monitors

                )
                .toBe(5);


            }
        );







        test(
            "Should expose health information",
            () => {


                adapter.connectBridge(

                    bridge

                );



                const model =

                    adapter.getOperationalModel();



                expect(

                    model.health.healthy

                )
                .toBe(5);



                expect(

                    model.health.unhealthy

                )
                .toBe(0);


            }
        );







        test(
            "Should expose metrics information",
            () => {


                adapter.connectBridge(

                    bridge

                );



                const model =

                    adapter.getOperationalModel();



                expect(

                    model.metrics.CPU

                )
                .toBe(40);



                expect(

                    model.metrics.MEMORY

                )
                .toBe(60);


            }
        );







        test(
            "Should expose alert summary",
            () => {


                adapter.connectBridge(

                    bridge

                );



                const summary =

                    adapter.getSystemSummary();



                expect(

                    summary.alerts.totalAlerts

                )
                .toBe(2);


            }
        );







        test(
            "Should refresh operational model",
            () => {


                adapter.connectBridge(

                    bridge

                );



                const model =

                    adapter.refresh();



                expect(

                    model

                )
                .toBeDefined();



                expect(

                    adapter.getLastModel()

                )
                .toBe(model);


            }
        );







        test(
            "Should maintain history",
            () => {


                adapter.initialize();



                expect(

                    adapter.getHistory().length

                )
                .toBeGreaterThan(0);


            }
        );







        test(
            "Should return adapter status",
            () => {


                const status =

                    adapter.getStatus();



                expect(

                    status.name

                )
                .toBe(
                    "Operational Dashboard Adapter"
                );



                expect(

                    status.version

                )
                .toBe(
                    "1.0.0"
                );


            }
        );







        test(
            "Should shutdown correctly",
            () => {


                adapter.initialize();



                expect(

                    adapter.shutdown()

                )
                .toBe(true);



                expect(

                    adapter.status

                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );



    }
);
