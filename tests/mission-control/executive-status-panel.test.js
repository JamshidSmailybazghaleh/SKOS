/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Executive Status Panel
 * File      : executive-status-panel.test.js
 *
 * Build     : BUILD-000813.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate executive-level operational
 * visibility inside Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const ExecutiveStatusPanel =
    require(
        "../../src/mission-control/executive-status-panel"
    );



describe(
    "SKOS Executive Status Panel Tests",
    () => {



        let panel;

        let controller;



        beforeEach(() => {


            controller = {


                getSnapshot:

                    jest.fn()
                    .mockReturnValue({

                        system:
                            {

                                status:
                                    "READY",


                                runtime:
                                    {

                                        name:
                                            "SKOS Monitoring Runtime",


                                        monitors:
                                            6

                                    }

                            },


                        health:
                            {

                                healthy:
                                    6,


                                unhealthy:
                                    0

                            },


                        metrics:
                            {

                                CPU:
                                    25,


                                MEMORY:
                                    45

                            },


                        alerts:
                            {

                                totalAlerts:
                                    1

                            }

                    })


            };



            panel =

                new ExecutiveStatusPanel();



        });







        test(
            "Should create executive status panel",
            () => {


                expect(

                    panel

                )
                .toBeDefined();



                expect(

                    panel.name

                )
                .toBe(
                    "Executive Status Panel"
                );


            }
        );







        test(
            "Should initialize panel",
            () => {


                expect(

                    panel.initialize()

                )
                .toBe(true);



                expect(

                    panel.status

                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );







        test(
            "Should reject view generation without controller",
            () => {


                expect(

                    () =>
                        panel.generateView()

                )
                .toThrow();


            }
        );







        test(
            "Should connect live controller",
            () => {


                expect(

                    panel.connectController(
                        controller
                    )

                )
                .toBe(true);



                expect(

                    panel.status

                )
                .toBe(
                    "CONNECTED"
                );


            }
        );







        test(
            "Should generate executive view",
            () => {


                panel.connectController(

                    controller

                );



                const view =

                    panel.generateView();



                expect(

                    view.title

                )
                .toBe(
                    "Executive Status Panel"
                );



                expect(

                    view.systemStatus

                )
                .toBe(
                    "READY"
                );


            }
        );







        test(
            "Should expose runtime information",
            () => {


                panel.connectController(

                    controller

                );



                const view =

                    panel.generateView();



                expect(

                    view.runtime.name

                )
                .toBe(
                    "SKOS Monitoring Runtime"
                );



                expect(

                    view.runtime.monitors

                )
                .toBe(6);


            }
        );







        test(
            "Should expose health summary",
            () => {


                panel.connectController(

                    controller

                );



                panel.generateView();



                const health =

                    panel.getHealthSummary();



                expect(

                    health.healthy

                )
                .toBe(6);



                expect(

                    health.unhealthy

                )
                .toBe(0);


            }
        );







        test(
            "Should expose alert summary",
            () => {


                panel.connectController(

                    controller

                );



                panel.generateView();



                const alerts =

                    panel.getAlertSummary();



                expect(

                    alerts.totalAlerts

                )
                .toBe(1);


            }
        );







        test(
            "Should refresh panel",
            () => {


                panel.connectController(

                    controller

                );



                const result =

                    panel.refresh();



                expect(

                    result

                )
                .toBeDefined();



                expect(

                    panel.getSnapshot()

                )
                .toBe(result);


            }
        );







        test(
            "Should maintain panel history",
            () => {


                panel.initialize();



                expect(

                    panel.getHistory().length

                )
                .toBeGreaterThan(0);


            }
        );







        test(
            "Should return panel status",
            () => {


                const status =

                    panel.getStatus();



                expect(

                    status.name

                )
                .toBe(
                    "Executive Status Panel"
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


                panel.initialize();



                expect(

                    panel.shutdown()

                )
                .toBe(true);



                expect(

                    panel.status

                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );



    }
);
