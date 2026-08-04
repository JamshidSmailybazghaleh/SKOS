/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Monitoring Dashboard Client
 * File      : monitoring-dashboard-client.test.js
 *
 * Build     : BUILD-000811.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate Mission Control client access
 * to operational monitoring models.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const MonitoringDashboardClient =
    require(
        "../../src/mission-control/monitoring-dashboard-client"
    );



describe(
    "SKOS Monitoring Dashboard Client Tests",
    () => {


        let client;

        let adapter;



        beforeEach(() => {


            adapter = {


                getOperationalModel:

                    jest.fn()
                    .mockReturnValue({

                        systemStatus:
                            "READY",


                        runtime:
                            {

                                name:
                                    "SKOS Monitoring Runtime",

                                version:
                                    "1.0.0",

                                monitors:
                                    4

                            },


                        health:
                            {

                                healthy:
                                    4,

                                unhealthy:
                                    0

                            },


                        metrics:
                            {

                                CPU:
                                    35,

                                MEMORY:
                                    55

                            },


                        alerts:
                            {

                                totalAlerts:
                                    1

                            },


                        events:
                            8

                    })


            };



            client =

                new MonitoringDashboardClient();


        });







        test(
            "Should create dashboard client",
            () => {


                expect(

                    client

                )
                .toBeDefined();



                expect(

                    client.name

                )
                .toBe(
                    "Monitoring Dashboard Client"
                );


            }
        );







        test(
            "Should initialize client",
            () => {


                expect(

                    client.initialize()

                )
                .toBe(true);



                expect(

                    client.status

                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );







        test(
            "Should reject loading without adapter",
            () => {


                expect(

                    () =>
                        client.loadDashboard()

                )
                .toThrow();


            }
        );







        test(
            "Should connect adapter",
            () => {


                expect(

                    client.connectAdapter(
                        adapter
                    )

                )
                .toBe(true);



                expect(

                    client.status

                )
                .toBe(
                    "CONNECTED"
                );


            }
        );







        test(
            "Should load dashboard view model",
            () => {


                client.connectAdapter(

                    adapter

                );



                const view =

                    client.loadDashboard();



                expect(

                    view.system.status

                )
                .toBe(
                    "READY"
                );



                expect(

                    view.system.runtime.monitors

                )
                .toBe(4);


            }
        );







        test(
            "Should expose health data",
            () => {


                client.connectAdapter(

                    adapter

                );



                const view =

                    client.loadDashboard();



                expect(

                    view.health.healthy

                )
                .toBe(4);



            }
        );







        test(
            "Should expose metrics data",
            () => {


                client.connectAdapter(

                    adapter

                );



                const view =

                    client.loadDashboard();



                expect(

                    view.metrics.CPU

                )
                .toBe(35);



                expect(

                    view.metrics.MEMORY

                )
                .toBe(55);


            }
        );







        test(
            "Should expose alert information",
            () => {


                client.connectAdapter(

                    adapter

                );



                const view =

                    client.loadDashboard();



                expect(

                    view.alerts.totalAlerts

                )
                .toBe(1);


            }
        );







        test(
            "Should refresh dashboard",
            () => {


                client.connectAdapter(

                    adapter

                );



                const result =

                    client.refresh();



                expect(

                    result

                )
                .toBeDefined();



                expect(

                    client.getViewModel()

                )
                .toBe(result);


            }
        );







        test(
            "Should manage auto refresh",
            () => {


                expect(

                    client.startAutoRefresh(
                        1000
                    )

                )
                .toBe(true);



                expect(

                    client.stopAutoRefresh()

                )
                .toBe(true);


            }
        );







        test(
            "Should maintain history",
            () => {


                client.initialize();



                expect(

                    client.getHistory().length

                )
                .toBeGreaterThan(0);


            }
        );







        test(
            "Should return client status",
            () => {


                const status =

                    client.getStatus();



                expect(

                    status.name

                )
                .toBe(
                    "Monitoring Dashboard Client"
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


                client.initialize();



                expect(

                    client.shutdown()

                )
                .toBe(true);



                expect(

                    client.status

                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );



    }
);
