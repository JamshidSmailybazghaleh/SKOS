/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Explorer Panel
 * File      : knowledge-explorer-panel.test.js
 *
 * Build     : BUILD-000815.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate knowledge visibility,
 * repository tracking and semantic
 * exploration inside Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeExplorerPanel =
    require(
        "../../src/mission-control/knowledge-explorer-panel"
    );



describe(
    "SKOS Knowledge Explorer Panel Tests",
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

                                repository:
                                    "SDKC"

                            }

                    });



            panel =

                new KnowledgeExplorerPanel();


        });







        test(
            "Should create knowledge explorer panel",
            () => {


                expect(
                    panel
                )
                .toBeDefined();



                expect(
                    panel.name
                )
                .toBe(
                    "Knowledge Explorer Panel"
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
            "Should register knowledge repository",
            () => {


                const repository =

                    panel.registerRepository(

                        "SDKC-001",

                        {

                            name:
                                "SDKC Repository",

                            type:
                                "KNOWLEDGE"

                        }

                    );



                expect(
                    repository.id
                )
                .toBe(
                    "SDKC-001"
                );



                expect(
                    panel.getRepositories().length
                )
                .toBe(1);


            }
        );







        test(
            "Should reject invalid repository id",
            () => {


                expect(

                    () =>
                        panel.registerRepository()

                )
                .toThrow();


            }
        );







        test(
            "Should add knowledge object",
            () => {


                expect(

                    panel.addKnowledgeObject({

                        id:
                            "KNOW-001",

                        title:
                            "SKOS Architecture",

                        type:
                            "DOCUMENT"

                    })

                )
                .toBe(true);



                expect(

                    panel
                        .getKnowledgeObjects()
                        .length

                )
                .toBe(1);


            }
        );







        test(
            "Should reject empty knowledge object",
            () => {


                expect(

                    () =>
                        panel.addKnowledgeObject()

                )
                .toThrow();


            }
        );







        test(
            "Should register semantic layer",
            () => {


                expect(

                    panel.registerSemanticLayer({

                        name:
                            "Ontology Layer",

                        version:
                            "1.0"

                    })

                )
                .toBe(true);



                expect(

                    panel
                        .getSemanticLayers()
                        .length

                )
                .toBe(1);


            }
        );







        test(
            "Should update knowledge graph status",
            () => {


                expect(

                    panel.updateGraphStatus(

                        1500,

                        4200

                    )

                )
                .toBe(true);



                const graph =

                    panel.getGraphStatus();



                expect(
                    graph.nodes
                )
                .toBe(1500);



                expect(
                    graph.relations
                )
                .toBe(4200);


            }
        );







        test(
            "Should generate knowledge view",
            () => {


                panel.connectController(

                    controller

                );



                panel.registerRepository(

                    "SDKC"

                );



                panel.addKnowledgeObject({

                    id:
                        "KNOW-100",

                    title:
                        "Knowledge Core"

                });



                const view =

                    panel.generateView();



                expect(
                    view.title
                )
                .toBe(
                    "Knowledge Explorer Panel"
                );



                expect(
                    view.repositories
                )
                .toBe(1);



                expect(
                    view.knowledgeObjects
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
                    "Knowledge Explorer Panel"
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
