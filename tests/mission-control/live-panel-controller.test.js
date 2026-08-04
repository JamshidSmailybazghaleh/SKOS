/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Live Panel Controller
 * File      : live-panel-controller.test.js
 *
 * Build     : BUILD-000812.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate live operational panel management
 * inside Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const LivePanelController =
    require(
        "../../src/mission-control/live-panel-controller"
    );



describe(
    "SKOS Live Panel Controller Tests",
    () => {



        let controller;

        let client;



        beforeEach(() => {



            client = {


                getViewModel:

                    jest.fn()
                    .mockReturnValue({

                        system:
                            {

                                status:
                                    "READY",

                                runtime:
                                    {

                                        monitors:
                                            5

                                    }

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
                                    30,

                                MEMORY:
                                    50

                            },


                        alerts:
                            {

                                totalAlerts:
                                    2

                            }

                    })

            };



            controller =

                new LivePanelController();



        });







        test(
            "Should create live panel controller",
            () => {


                expect(

                    controller

                )
                .toBeDefined();



                expect(

                    controller.name

                )
                .toBe(
                    "Live Panel Controller"
                );


            }
        );







        test(
            "Should initialize controller",
            () => {


                expect(

                    controller.initialize()

                )
                .toBe(true);



                expect(

                    controller.status

                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );







        test(
            "Should reject missing client",
            () => {


                expect(

                    () =>
                        controller.loadLiveData()

                )
                .toThrow();


            }
        );







        test(
            "Should connect dashboard client",
            () => {


                expect(

                    controller.connectClient(
                        client
                    )

                )
                .toBe(true);



                expect(

                    controller.status

                )
                .toBe(
                    "CONNECTED"
                );


            }
        );







        test(
            "Should register dashboard panel",
            () => {


                const panel =

                    controller.registerPanel(

                        "EXECUTIVE_STATUS",

                        {

                            title:
                                "Executive Status",

                            type:
                                "STATUS"

                        }

                    );



                expect(

                    panel.id

                )
                .toBe(
                    "EXECUTIVE_STATUS"
                );



                expect(

                    controller.getPanels().length

                )
                .toBe(1);


            }
        );







        test(
            "Should reject invalid panel id",
            () => {


                expect(

                    () =>
                        controller.registerPanel()

                )
                .toThrow();


            }
        );







        test(
            "Should activate panel",
            () => {


                controller.registerPanel(

                    "SYSTEM_HEALTH"

                );



                expect(

                    controller.activatePanel(
                        "SYSTEM_HEALTH"
                    )

                )
                .toBe(true);



                expect(

                    controller.getActivePanels().length

                )
                .toBe(1);


            }
        );







        test(
            "Should reject activation of unknown panel",
            () => {


                expect(

                    () =>
                        controller.activatePanel(
                            "UNKNOWN"
                        )

                )
                .toThrow();


            }
        );







        test(
            "Should load live operational data",
            () => {


                controller.connectClient(

                    client

                );



                controller.registerPanel(

                    "MAIN"

                );



                controller.activatePanel(

                    "MAIN"

                );



                const data =

                    controller.loadLiveData();



                expect(

                    data.system.status

                )
                .toBe(
                    "READY"
                );



                expect(

                    data.metrics.CPU

                )
                .toBe(30);



                expect(

                    data.panels.length

                )
                .toBe(1);


            }
        );







        test(
            "Should refresh live data",
            () => {


                controller.connectClient(

                    client

                );



                const snapshot =

                    controller.refresh();



                expect(

                    snapshot

                )
                .toBeDefined();



                expect(

                    controller.getSnapshot()

                )
                .toBe(snapshot);


            }
        );







        test(
            "Should deactivate panel",
            () => {


                controller.registerPanel(

                    "ALERT_PANEL"

                );



                controller.activatePanel(

                    "ALERT_PANEL"

                );



                controller.deactivatePanel(

                    "ALERT_PANEL"

                );



                expect(

                    controller.getActivePanels().length

                )
                .toBe(0);


            }
        );







        test(
            "Should maintain history",
            () => {


                controller.initialize();



                expect(

                    controller.getHistory().length

                )
                .toBeGreaterThan(0);


            }
        );







        test(
            "Should return controller status",
            () => {


                const status =

                    controller.getStatus();



                expect(

                    status.name

                )
                .toBe(
                    "Live Panel Controller"
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


                controller.initialize();



                expect(

                    controller.shutdown()

                )
                .toBe(true);



                expect(

                    controller.status

                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );



    }
);
