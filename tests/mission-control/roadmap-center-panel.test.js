/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Roadmap Center Panel
 * File      : roadmap-center-panel.test.js
 *
 * Build     : BUILD-000817.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate strategic roadmap,
 * objectives, milestones and
 * execution alignment inside
 * Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const RoadmapCenterPanel =
    require(
        "../../src/mission-control/roadmap-center-panel"
    );



describe(
    "SKOS Roadmap Center Panel Tests",
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

                                roadmap:
                                    "ACTIVE"

                            }

                    });



            panel =
                new RoadmapCenterPanel();


        });







        test(
            "Should create roadmap center panel",
            () => {


                expect(
                    panel
                )
                .toBeDefined();



                expect(
                    panel.name
                )
                .toBe(
                    "Roadmap Center Panel"
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
            "Should add roadmap objective",
            () => {


                const objective =

                    panel.addObjective(

                        "OBJ-001",

                        {

                            title:
                                "Build Knowledge Core",

                            priority:
                                "HIGH",

                            status:
                                "ACTIVE"

                        }

                    );



                expect(
                    objective.id
                )
                .toBe(
                    "OBJ-001"
                );



                expect(
                    panel.getObjectives().length
                )
                .toBe(1);


            }
        );







        test(
            "Should reject invalid objective id",
            () => {


                expect(

                    () =>
                        panel.addObjective()

                )
                .toThrow();


            }
        );







        test(
            "Should add milestone",
            () => {


                const milestone =

                    panel.addMilestone(

                        "MILESTONE-001",

                        {

                            title:
                                "SDKC Foundation",

                            status:
                                "PENDING"

                        }

                    );



                expect(
                    milestone.id
                )
                .toBe(
                    "MILESTONE-001"
                );



                expect(
                    panel.getMilestones().length
                )
                .toBe(1);


            }
        );







        test(
            "Should reject invalid milestone id",
            () => {


                expect(

                    () =>
                        panel.addMilestone()

                )
                .toThrow();


            }
        );







        test(
            "Should add roadmap item",
            () => {


                expect(

                    panel.addRoadmapItem({

                        id:
                            "ROADMAP-001",

                        title:
                            "Foundation Phase",

                        phase:
                            "FOUNDATION",

                        status:
                            "ACTIVE"

                    })

                )
                .toBe(true);



                expect(
                    panel.getRoadmap().length
                )
                .toBe(1);


            }
        );







        test(
            "Should update objective status",
            () => {


                panel.addObjective(

                    "OBJ-002"

                );



                const result =

                    panel.updateObjectiveStatus(

                        "OBJ-002",

                        "COMPLETED"

                    );



                expect(
                    result.status
                )
                .toBe(
                    "COMPLETED"
                );


            }
        );







        test(
            "Should reject unknown objective update",
            () => {


                expect(

                    () =>
                        panel.updateObjectiveStatus(

                            "UNKNOWN",

                            "DONE"

                        )

                )
                .toThrow();


            }
        );







        test(
            "Should generate roadmap view",
            () => {


                panel.connectController(

                    controller

                );



                panel.addObjective(

                    "OBJ-100",

                    {

                        title:
                            "SKOS Evolution"

                    }

                );



                panel.addMilestone(

                    "MILESTONE-100"

                );



                panel.addRoadmapItem({

                    id:
                        "ROADMAP-100",

                    title:
                        "Operational Growth"

                });



                const view =

                    panel.generateView();



                expect(
                    view.title
                )
                .toBe(
                    "Roadmap Center Panel"
                );



                expect(
                    view.objectives.length
                )
                .toBe(1);



                expect(
                    view.milestones.length
                )
                .toBe(1);



                expect(
                    view.roadmap.length
                )
                .toBe(1);



                expect(
                    view.runtime.status
                )
                .toBe(
                    "READY"
                );


            }
        );







        test(
            "Should refresh roadmap snapshot",
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
            "Should maintain roadmap history",
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
                    "Roadmap Center Panel"
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
