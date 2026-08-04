/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Monitoring Dashboard Bridge
 * File      : monitoring-dashboard-bridge.test.js
 *
 * Build     : BUILD-000809.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate operational data bridge between
 * Monitoring Runtime and Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const MonitoringDashboardBridge =
    require("../../src/monitoring/monitoring-dashboard-bridge");



describe(
    "SKOS Monitoring Dashboard Bridge Tests",
    () => {



        let bridge;

        let runtime;



        beforeEach(() => {



            runtime = {


                getStatus:

                    jest.fn()
                    .mockReturnValue({

                        name:
                            "SKOS Monitoring Runtime",

                        status:
                            "READY",

                        monitors:
                            3

                    }),



                getMetrics:

                    jest.fn()
                    .mockReturnValue({

                        CPU:
                            40,

                        MEMORY:
                            60

                    }),



                getEvents:

                    jest.fn()
                    .mockReturnValue([

                        {

                            type:
                                "TEST_EVENT"

                        }

                    ]),



                healthMonitor:


                {


                    getStatistics:

                        jest.fn()
                        .mockReturnValue({

                            healthy:
                                3,

                            unhealthy:
                                0

                        })


                },



                metricsCollector:


                {


                    getStatistics:

                        jest.fn()
                        .mockReturnValue({

                            registeredMetrics:
                                2

                        })


                },



                alertManager:


                {


                    getStatistics:

                        jest.fn()
                        .mockReturnValue({

                            totalAlerts:
                                1

                        })


                }



            };





            bridge =

                new MonitoringDashboardBridge();



        });







        test(
            "Should create dashboard bridge",
            () => {


                expect(

                    bridge

                )
                .toBeDefined();



                expect(

                    bridge.name

                )
                .toBe(
                    "Monitoring Dashboard Bridge"
                );


            }
        );







        test(
            "Should initialize bridge",
            () => {


                expect(

                    bridge.initialize()

                )
                .toBe(true);



                expect(

                    bridge.status

                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );







        test(
            "Should reject missing runtime connection",
            () => {


                expect(

                    () =>
                        bridge.getDashboardState()

                )
                .toThrow();


            }
        );







        test(
            "Should connect monitoring runtime",
            () => {


                expect(

                    bridge.connectRuntime(
                        runtime
                    )

                )
                .toBe(true);



                expect(

                    bridge.status

                )
                .toBe(
                    "CONNECTED"
                );


            }
        );







        test(
            "Should generate dashboard state",
            () => {


                bridge.connectRuntime(

                    runtime

                );



                const state =

                    bridge.getDashboardState();



                expect(

                    state.runtime.status

                )
                .toBe(
                    "READY"
                );



                expect(

                    state.metrics.CPU

                )
                .toBe(40);



                expect(

                    state.events

                )
                .toBe(1);


            }
        );







        test(
            "Should include health summary",
            () => {


                bridge.connectRuntime(

                    runtime

                );



                const health =

                    bridge.getHealthSummary();



                expect(

                    health.healthy

                )
                .toBe(3);


            }
        );







        test(
            "Should include metrics summary",
            () => {


                bridge.connectRuntime(

                    runtime

                );



                const metrics =

                    bridge.getMetricsSummary();



                expect(

                    metrics.registeredMetrics

                )
                .toBe(2);


            }
        );







        test(
            "Should include alert summary",
            () => {


                bridge.connectRuntime(

                    runtime

                );



                const alerts =

                    bridge.getAlertSummary();



                expect(

                    alerts.totalAlerts

                )
                .toBe(1);


            }
        );







        test(
            "Should refresh dashboard snapshot",
            () => {


                bridge.connectRuntime(

                    runtime

                );



                const snapshot =

                    bridge.refresh();



                expect(

                    snapshot

                )
                .toBeDefined();



                expect(

                    bridge.getSnapshot()

                )
                .toBe(snapshot);


            }
        );







        test(
            "Should record bridge history",
            () => {


                bridge.initialize();



                expect(

                    bridge.getHistory().length

                )
                .toBeGreaterThan(0);


            }
        );







        test(
            "Should return bridge status",
            () => {


                const status =

                    bridge.getStatus();



                expect(

                    status.name

                )
                .toBe(
                    "Monitoring Dashboard Bridge"
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


                bridge.initialize();



                expect(

                    bridge.shutdown()

                )
                .toBe(true);



                expect(

                    bridge.status

                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );



    }
);
