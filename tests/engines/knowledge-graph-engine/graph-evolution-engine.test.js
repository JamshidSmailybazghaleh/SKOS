/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Evolution Engine
 * File      : graph-evolution-engine.test.js
 *
 * Build     : BUILD-000391
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphEvolutionEngine =
    require(
        "../../src/engines/knowledge-graph-engine/graph-evolution-engine"
    );



describe(

    "SKOS Graph Evolution Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new GraphEvolutionEngine();


            }

        );





        const graphV1 = {


            nodes:

                [

                    {

                        id:

                            "A"

                    },


                    {

                        id:

                            "B"

                    }

                ],


            edges:

                [

                    {

                        from:

                            "A",


                        to:

                            "B",


                        type:

                            "RELATED"

                    }

                ]

        };





        const graphV2 = {


            nodes:

                [

                    {

                        id:

                            "A"

                    },


                    {

                        id:

                            "B"

                    },


                    {

                        id:

                            "C"

                    }

                ],


            edges:

                [

                    {

                        from:

                            "A",


                        to:

                            "B",


                        type:

                            "RELATED"

                    },


                    {

                        from:

                            "B",


                        to:

                            "C",


                        type:

                            "DEPENDS_ON"

                    }

                ]

        };





        test(

            "Evolution engine should initialize",

            () => {


                expect(

                    engine.initialize()

                ).toBe(true);



                expect(

                    engine.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should create first graph generation",

            () => {


                const result =

                    engine.evolve(

                        graphV1

                    );



                expect(

                    result.id

                ).toBe(

                    "GEN-1"

                );



                expect(

                    result.nodes

                ).toBe(2);



                expect(

                    result.relations

                ).toBe(1);


            }

        );





        test(

            "Should create multiple generations",

            () => {


                engine.evolve(

                    graphV1

                );


                engine.evolve(

                    graphV2

                );



                expect(

                    engine.getHistory().length

                ).toBe(2);



                expect(

                    engine.currentGeneration

                ).toBe(2);


            }

        );





        test(

            "Should store generation metadata",

            () => {


                const result =

                    engine.evolve(

                        graphV1,

                        {

                            source:

                                "learning-engine"

                        }

                    );



                expect(

                    result.metadata.source

                ).toBe(

                    "learning-engine"

                );


            }

        );





        test(

            "Should return latest generation",

            () => {


                engine.evolve(

                    graphV1

                );


                const latest =

                    engine.getLatestGeneration();



                expect(

                    latest.id

                ).toBe(

                    "GEN-1"

                );


            }

        );





        test(

            "Should compare generations",

            () => {


                engine.evolve(

                    graphV1

                );


                engine.evolve(

                    graphV2

                );



                const result =

                    engine.compareGenerations(

                        "GEN-1",

                        "GEN-2"

                    );



                expect(

                    result.nodeDifference

                ).toBe(1);



                expect(

                    result.relationDifference

                ).toBe(1);


            }

        );





        test(

            "Should reject invalid graph",

            () => {


                expect(

                    () =>

                        engine.evolve(

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should register evolution change",

            () => {


                const change =

                    engine.addChange(

                        {

                            type:

                                "NODE_ADDED",


                            node:

                                "C"

                        }

                    );



                expect(

                    change.id

                ).toBe(

                    "CHANGE-1"

                );



                expect(

                    engine.getChanges().length

                ).toBe(1);


            }

        );





        test(

            "Should clear evolution history",

            () => {


                engine.evolve(

                    graphV1

                );


                engine.addChange(

                    {

                        type:

                            "TEST"

                    }

                );



                expect(

                    engine.clearHistory()

                ).toBe(true);



                expect(

                    engine.getHistory().length

                ).toBe(0);



                expect(

                    engine.getChanges().length

                ).toBe(0);



                expect(

                    engine.currentGeneration

                ).toBe(0);


            }

        );





        test(

            "Should return evolution statistics",

            () => {


                engine.evolve(

                    graphV1

                );


                engine.addChange(

                    {

                        type:

                            "UPDATE"

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.generations

                ).toBe(1);



                expect(

                    stats.changes

                ).toBe(1);



                expect(

                    stats.currentGeneration

                ).toBe(1);


            }

        );





        test(

            "Should return engine status",

            () => {


                const status =

                    engine.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Evolution Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.generations

                ).toBe(0);


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                engine.initialize();



                expect(

                    engine.shutdown()

                ).toBe(true);



                expect(

                    engine.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
