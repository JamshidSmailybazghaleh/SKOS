/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Statistics
 * File      : graph-statistics.test.js
 *
 * Build     : BUILD-000373
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphStatistics =
    require(
        "../../src/engines/knowledge-graph-engine/graph-statistics"
    );



describe(

    "SKOS Graph Statistics Tests",

    () => {



        let statistics;



        beforeEach(

            () => {


                statistics =

                    new GraphStatistics();


            }

        );





        const sampleGraph = {


            nodes:

                [

                    {
                        id:
                            "node-1"
                    },

                    {
                        id:
                            "node-2"
                    },

                    {
                        id:
                            "node-3"
                    },

                    {
                        id:
                            "node-4"
                    }

                ],


            edges:

                [

                    {

                        from:
                            "node-1",

                        to:
                            "node-2",

                        type:
                            "RELATED"

                    },


                    {

                        from:
                            "node-2",

                        to:
                            "node-3",

                        type:
                            "DEPENDS_ON"

                    },


                    {

                        from:
                            "node-1",

                        to:
                            "node-3",

                        type:
                            "RELATED"

                    }

                ]

        };





        test(

            "Statistics engine should initialize",

            () => {


                expect(

                    statistics.initialize()

                ).toBe(true);



                expect(

                    statistics.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should analyze graph structure",

            () => {


                statistics.initialize();



                const result =

                    statistics.analyze(

                        sampleGraph

                    );



                expect(

                    result.nodes

                ).toBe(4);



                expect(

                    result.edges

                ).toBe(3);


            }

        );





        test(

            "Should calculate graph density",

            () => {


                const density =

                    statistics.calculateDensity(

                        sampleGraph

                    );



                expect(

                    density

                ).toBe(

                    "0.2500"

                );


            }

        );





        test(

            "Should calculate average degree",

            () => {


                const degree =

                    statistics.calculateAverageDegree(

                        sampleGraph

                    );



                expect(

                    degree

                ).toBe(

                    "1.50"

                );


            }

        );





        test(

            "Should detect isolated nodes",

            () => {


                const isolated =

                    statistics.countIsolatedNodes(

                        sampleGraph

                    );



                expect(

                    isolated

                ).toBe(1);


            }

        );





        test(

            "Should count relation types",

            () => {


                const types =

                    statistics.countRelationTypes(

                        sampleGraph

                    );



                expect(

                    types.RELATED

                ).toBe(2);



                expect(

                    types.DEPENDS_ON

                ).toBe(1);


            }

        );





        test(

            "Should find central nodes",

            () => {


                const central =

                    statistics.findCentralNodes(

                        sampleGraph,

                        2

                    );



                expect(

                    central.length

                ).toBe(2);



                expect(

                    central[0][0]

                ).toBe(

                    "node-1"

                );


            }

        );





        test(

            "Should return statistics status",

            () => {


                const status =

                    statistics.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Statistics"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                statistics.initialize();



                expect(

                    statistics.shutdown()

                ).toBe(true);



                expect(

                    statistics.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
