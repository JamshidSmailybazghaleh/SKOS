/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Adaptation Engine
 * File      : graph-adaptation-engine.test.js
 *
 * Build     : BUILD-000389
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphAdaptationEngine =
    require(
        "../../src/engines/knowledge-graph-engine/graph-adaptation-engine"
    );



describe(

    "SKOS Graph Adaptation Engine Tests",

    () => {



        let engine;
let graph;

beforeEach(() => {
    engine = new GraphAdaptationEngine();

    graph = {
        nodes: [
            { id: "A" },
            { id: "B" },
            { id: "C" }
        ],
        edges: [
            {
                from: "A",
                to: "B",
                type: "RELATED"
            },
            {
                from: "A",
                to: "B",
                type: "RELATED"
            }
        ]
    };
});





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

                            "A",


                        to:

                            "B",


                        type:

                            "RELATED"

                    }

                ]

        };





        test(

            "Adaptation engine should initialize",

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

            "Should adapt graph",

            () => {


                const result =

                    engine.adapt(

                        graph

                    );



                expect(

                    result.id

                ).toBe(

                    "ADAPT-1"

                );



                expect(

                    result.changes.length

                ).toBeGreaterThan(0);


            }

        );





        test(

            "Should remove duplicate relations",

            () => {


                const result =

                    engine.adapt(

                        graph

                    );



                const change =

                    result.changes.find(

                        item =>

                            item.type ===

                            "REMOVE_DUPLICATE_RELATION"

                    );



                expect(

                    change

                ).toBeDefined();



                expect(

                    graph.edges.length

                ).toBe(1);


            }

        );





        test(

            "Should detect isolated nodes",

            () => {


                const isolatedGraph = {


                    nodes:

                        [

                            {

                                id:

                                    "A"

                            },


                            {

                                id:

                                    "ISOLATED"

                            }

                        ],


                    edges:

                        []

                };



                const result =

                    engine.adapt(

                        isolatedGraph

                    );



                const isolated =

                    result.changes.find(

                        item =>

                            item.type ===

                            "ISOLATED_NODE_DETECTED"

                    );



                expect(

                    isolated

                ).toBeDefined();



                expect(

                    isolated.node

                ).toBe(

                    "A"

                );


            }

        );





        test(

            "Should accept learning source",

            () => {


                const result =

                    engine.adapt(

                        graph,

                        {

                            id:

                                "LEARN-1"

                        }

                    );



                expect(

                    result.source

                ).toBe(

                    "LEARN-1"

                );


            }

        );





        test(

            "Should reject invalid graph",

            () => {


                expect(

                    () =>

                        engine.adapt(

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should add manual adaptation",

            () => {


                const adaptation = {


                    type:

                        "CUSTOM_ADAPTATION",


                    changes:

                        []

                };



                const result =

                    engine.addAdaptation(

                        adaptation

                    );



                expect(

                    result.type

                ).toBe(

                    "CUSTOM_ADAPTATION"

                );



                expect(

                    engine.getAdaptations().length

                ).toBe(1);


            }

        );





        test(

            "Should return adaptation history",

            () => {


                engine.adapt(

                    graph

                );



                const history =

                    engine.getAdaptations();



                expect(

                    history.length

                ).toBe(1);



                expect(

                    history[0].id

                ).toBe(

                    "ADAPT-1"

                );


            }

        );





        test(

            "Should clear adaptation history",

            () => {


                engine.adapt(

                    graph

                );



                expect(

                    engine.clearAdaptations()

                ).toBe(true);



                expect(

                    engine.getAdaptations().length

                ).toBe(0);


            }

        );





        test(

            "Should return adaptation statistics",

            () => {


                engine.adapt(

                    graph

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.total

                ).toBe(1);



                expect(

                    stats.totalChanges

                ).toBeGreaterThan(0);


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

                    "Graph Adaptation Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.adaptations

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
