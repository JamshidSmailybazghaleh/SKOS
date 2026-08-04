/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Build Center Panel
 * File      : build-center-panel.test.js
 *
 * Build     : BUILD-000816.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate build lifecycle,
 * sprint, release and pipeline
 * visibility inside Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const BuildCenterPanel =
    require(
        "../../src/mission-control/build-center-panel"
    );



describe(
    "SKOS Build Center Panel Tests",
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

                                currentBuild:
                                    "BUILD-000816.1"

                            }

                    });



            panel =

                new BuildCenterPanel();


        });







        test(
            "Should create build center panel",
            () => {


                expect(
                    panel
                )
                .toBeDefined();



                expect(
                    panel.name
                )
                .toBe(
                    "Build Center Panel"
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
            "Should reject missing controller",
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
            "Should set current build",
            () => {


                const build =

                    panel.setBuild(

                        "BUILD-000816.1",

                        {

                            version:
                                "1.0.0",

                            status:
                                "ACTIVE"

                        }

                    );



                expect(
                    build.id
                )
                .toBe(
                    "BUILD-000816.1"
                );



                expect(
                    panel.getBuild().id
                )
                .toBe(
                    "BUILD-000816.1"
                );


            }
        );







        test(
            "Should reject invalid build id",
            () => {


                expect(

                    () =>
                        panel.setBuild()

                )
                .toThrow();


            }
        );







        test(
            "Should set sprint information",
            () => {


                const sprint =

                    panel.setSprint(

                        "SPRINT-001",

                        {

                            title:
                                "Bootstrap SKOS",

                            status:
                                "ACTIVE"

                        }

                    );



                expect(
                    sprint.id
                )
                .toBe(
                    "SPRINT-001"
                );



                expect(
                    panel.getSprint().title
                )
                .toBe(
                    "Bootstrap SKOS"
                );


            }
        );







        test(
            "Should set release information",
            () => {


                const release =

                    panel.setRelease(

                        "RELEASE-001B",

                        {

                            version:
                                "1.0.0",

                            status:
                                "PLANNED"

                        }

                    );



                expect(
                    release.id
                )
                .toBe(
                    "RELEASE-001B"
                );



                expect(
                    panel.getRelease().version
                )
                .toBe(
                    "1.0.0"
                );


            }
        );







        test(
            "Should add pipeline stage",
            () => {


                expect(

                    panel.addPipelineStage({

                        name:
                            "TEST",

                        status:
                            "PENDING"

                    })

                )
                .toBe(true);



                expect(
                    panel.getPipeline().length
                )
                .toBe(1);


            }
        );







        test(
            "Should update pipeline stage",
            () => {


                panel.addPipelineStage({

                    name:
                        "BUILD",

                    status:
                        "PENDING"

                });



                const stage =

                    panel.updatePipelineStage(

                        "BUILD",

                        "SUCCESS"

                    );



                expect(
                    stage.status
                )
                .toBe(
                    "SUCCESS"
                );


            }
        );







        test(
            "Should reject unknown pipeline stage",
            () => {


                expect(

                    () =>
                        panel.updatePipelineStage(

                            "UNKNOWN",

                            "FAILED"

                        )

                )
                .toThrow();


            }
        );







        test(
            "Should generate build view",
            () => {


                panel.connectController(

                    controller

                );



                panel.setBuild(

                    "BUILD-000816.1"

                );



                panel.setSprint(

                    "SPRINT-001"

                );



                panel.setRelease(

                    "RELEASE-001B"

                );



                panel.addPipelineStage({

                    name:
                        "TEST",

                    status:
                        "SUCCESS"

                });



                const view =

                    panel.generateView();



                expect(
                    view.title
                )
                .toBe(
                    "Build Center Panel"
                );



                expect(
                    view.build.id
                )
                .toBe(
                    "BUILD-000816.1"
                );



                expect(
                    view.sprint.id
                )
                .toBe(
                    "SPRINT-001"
                );



                expect(
                    view.release.id
                )
                .toBe(
                    "RELEASE-001B"
                );



                expect(
                    view.runtime.status
                )
                .toBe(
                    "READY"
                );


            }
        );







        test(
            "Should refresh snapshot",
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
                    "Build Center Panel"
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
