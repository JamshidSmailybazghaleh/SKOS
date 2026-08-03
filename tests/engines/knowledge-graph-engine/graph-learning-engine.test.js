/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Learning Engine
 * File      : graph-learning-engine.test.js
 *
 * Build     : BUILD-000387
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphLearningEngine =
    require(
        "../../src/engines/knowledge-graph-engine/graph-learning-engine"
    );



describe(

    "SKOS Graph Learning Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new GraphLearningEngine();


            }

        );





        const graph = {


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

            "Learning engine should initialize",

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

            "Should learn from graph",

            () => {


                const result =

                    engine.learn(

                        graph

                    );



                expect(

                    result.id

                ).toBe(

                    "LEARN-1"

                );



                expect(

                    result.nodes

                ).toBe(3);



                expect(

                    result.relations

                ).toBe(2);


            }

        );





        test(

            "Should reject invalid graph",

            () => {


                expect(

                    () =>

                        engine.learn(

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should extract graph features",

            () => {


                const result =

                    engine.learn(

                        graph

                    );



                expect(

                    result.patterns.nodeCount

                ).toBe(3);



                expect(

                    result.patterns.edgeCount

                ).toBe(2);



                expect(

                    result.patterns.relationTypes.length

                ).toBe(2);


            }

        );





        test(

            "Should calculate graph density",

            () => {


                const result =

                    engine.learn(

                        graph

                    );



                expect(

                    result.patterns.density

                ).toBeGreaterThan(0);



            }

        );





        test(

            "Should register learning model",

            () => {


                const model = {


                    type:

                        "PatternModel",


                    version:

                        "1.0"

                };



                const result =

                    engine.registerModel(

                        "pattern-model",

                        model

                    );



                expect(

                    result.name

                ).toBe(

                    "pattern-model"

                );



                expect(

                    engine.models.size

                ).toBe(1);


            }

        );





        test(

            "Should retrieve learning model",

            () => {


                engine.registerModel(

                    "test-model",

                    {

                        value:

                            true

                    }

                );



                const model =

                    engine.getModel(

                        "test-model"

                    );



                expect(

                    model.value

                ).toBe(true);


            }

        );





        test(

            "Should return learning history",

            () => {


                engine.learn(

                    graph

                );



                const history =

                    engine.getLearningHistory();



                expect(

                    history.length

                ).toBe(1);



                expect(

                    history[0].id

                ).toBe(

                    "LEARN-1"

                );


            }

        );





        test(

            "Should clear learning history",

            () => {


                engine.learn(

                    graph

                );



                expect(

                    engine.clearLearningHistory()

                ).toBe(true);



                expect(

                    engine.getLearningHistory().length

                ).toBe(0);


            }

        );





        test(

            "Should return learning statistics",

            () => {


                engine.learn(

                    graph

                );



                engine.registerModel(

                    "model-1",

                    {}

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.learningCycles

                ).toBe(1);



                expect(

                    stats.models

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

                    "Graph Learning Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.learningCycles

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
