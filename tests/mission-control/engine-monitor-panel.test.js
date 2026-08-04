/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Engine Monitor Panel
 * File      : engine-monitor-panel.test.js
 *
 * Build     : BUILD-000814.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate engine-level operational
 * monitoring inside Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const EngineMonitorPanel =
    require(
        "../../src/mission-control/engine-monitor-panel"
    );



describe(
    "SKOS Engine Monitor Panel Tests",
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
                                            "SKOS Monitoring Runtime"

                                    }

                            }

                    });



            panel =

                new EngineMonitorPanel();


        });







        test(
            "Should create engine monitor panel",
            () => {


                expect(

                    panel

                )
                .toBeDefined();



                expect(

                    panel.name

                )
                .toBe(
                    "Engine Monitor Panel"
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
            "Should reject missing controller connection",
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
            "Should register engine",
            () => {


                const engine =

                    panel.registerEngine(

                        "ENGINE-001",

                        {

                            name:
                                "Intake Engine",

                            type:
                                "CORE",

                            version:
                                "1.0.0"

                        }

                    );



                expect(

                    engine.id

                )
                .toBe(
                    "ENGINE-001"
                );



                expect(

                    panel.getEngines().length

                )
                .toBe(1);


            }
        );







        test(
            "Should reject invalid engine id",
            () => {


                expect(

                    () =>
                        panel.registerEngine()

                )
                .toThrow();


            }
        );







        test(
            "Should update engine status",
            () => {


                panel.registerEngine(

                    "ENGINE-002"

                );



                const result =

                    panel.updateEngineStatus(

                        "ENGINE-002",

                        "RUNNING",

                        "HEALTHY"

                    );



                expect(

                    result.status

                )
                .toBe(
                    "RUNNING"
                );



                expect(

                    result.health

                )
                .toBe(
                    "HEALTHY"
                );


            }
        );







        test(
            "Should reject unknown engine update",
            () => {


                expect(

                    () =>
                        panel.updateEngineStatus(

                            "UNKNOWN",

                            "FAILED"

                        )

                )
                .toThrow();


            }
        );







        test(
            "Should generate engine view",
            () => {


                panel.connectController(

                    controller

                );



                panel.registerEngine(

                    "ENGINE-003",

                    {

                        name:
                            "Registry Engine"

                    }

                );



                const view =

                    panel.generateView();



                expect(

                    view.title

                )
                .toBe(
                    "Engine Monitor Panel"
                );



                expect(

                    view.totalEngines

                )
                .toBe(1);



                expect(

                    view.system.status

                )
                .toBe(
                    "READY"
                );


            }
        );







        test(
            "Should count running engines",
            () => {


                panel.registerEngine(

                    "ENGINE-004"

                );


                panel.registerEngine(

                    "ENGINE-005"

                );



                panel.updateEngineStatus(

                    "ENGINE-004",

                    "RUNNING",

                    "HEALTHY"

                );



                panel.updateEngineStatus(

                    "ENGINE-005",

                    "STOPPED",

                    "HEALTHY"

                );



                expect(

                    panel.getHealthyEngines().length

                )
                .toBe(2);


            }
        );







        test(
            "Should detect failed engines",
            () => {


                panel.registerEngine(

                    "ENGINE-006"

                );



                panel.updateEngineStatus(

                    "ENGINE-006",

                    "FAILED",

                    "ERROR"

                );



                expect(

                    panel.getFailedEngines().length

                )
                .toBe(1);


            }
        );







        test(
            "Should refresh panel snapshot",
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
            "Should maintain history",
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
                    "Engine Monitor Panel"
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
