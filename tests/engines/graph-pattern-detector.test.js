/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Pattern Detector
 * File      : graph-pattern-detector.test.js
 *
 * Build     : BUILD-000383
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphPatternDetector =
    require(
        "../../src/engines/knowledge-graph-engine/graph-pattern-detector"
    );



describe(

    "SKOS Graph Pattern Detector Tests",

    () => {



        let detector;



        beforeEach(

            () => {


                detector =

                    new GraphPatternDetector();


            }

        );





        const graph = {


            nodes:

                [

                    {

                        id:

                            "node-A"

                    },


                    {

                        id:

                            "node-B"

                    },


                    {

                        id:

                            "node-C"

                    }


                ],


            edges:

                [

                    {

                        from:

                            "node-A",


                        to:

                            "node-B",


                        type:

                            "RELATED"

                    },


                    {

                        from:

                            "node-B",


                        to:

                            "node-C",


                        type:

                            "RELATED"

                    },


                    {

                        from:

                            "node-C",


                        to:

                            "node-A",


                        type:

                            "RELATED"

                    }

                ]

        };





        test(

            "Pattern detector should initialize",

            () => {


                expect(

                    detector.initialize()

                ).toBe(true);



                expect(

                    detector.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should detect graph patterns",

            () => {


                const result =

                    detector.detect(

                        graph

                    );



                expect(

                    result.length

                ).toBeGreaterThan(0);


            }

        );





        test(

            "Should detect relationship chains",

            () => {


                const result =

                    detector.detect(

                        graph

                    );



                const chains =

                    result.filter(

                        pattern =>

                            pattern.type ===

                            "CHAIN"

                    );



                expect(

                    chains.length

                ).toBeGreaterThan(0);



                expect(

                    chains[0].path.length

                ).toBe(3);


            }

        );





        test(

            "Should detect cycles",

            () => {


                const result =

                    detector.detect(

                        graph

                    );



                const cycles =

                    result.filter(

                        pattern =>

                            pattern.type ===

                            "CYCLE"

                    );



                expect(

                    cycles.length

                ).toBeGreaterThan(0);


            }

        );





        test(

            "Should detect clusters",

            () => {


                const clusterGraph = {


                    nodes:

                        [

                            {

                                id:

                                    "main"

                            },


                            {

                                id:

                                    "a"

                            },


                            {

                                id:

                                    "b"

                            }

                        ],


                    edges:

                        [

                            {

                                from:

                                    "main",


                                to:

                                    "a",


                                type:

                                    "RELATED"

                            },


                            {

                                from:

                                    "main",


                                to:

                                    "b",


                                type:

                                    "RELATED"

                            }

                        ]

                };



                const result =

                    detector.detect(

                        clusterGraph

                    );



                const clusters =

                    result.filter(

                        pattern =>

                            pattern.type ===

                            "CLUSTER"

                    );



                expect(

                    clusters.length

                ).toBe(1);



            }

        );





        test(

            "Should reject invalid graph",

            () => {


                expect(

                    () =>

                        detector.detect(

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should add custom pattern",

            () => {


                const pattern = {


                    type:

                        "CUSTOM",


                    value:

                        "test"

                };



                const result =

                    detector.addPattern(

                        pattern

                    );



                expect(

                    result.type

                ).toBe(

                    "CUSTOM"

                );



                expect(

                    detector.getPatterns().length

                ).toBe(1);


            }

        );





        test(

            "Should return patterns",

            () => {


                detector.addPattern(

                    {

                        type:

                            "TEST"

                    }

                );



                expect(

                    detector.getPatterns().length

                ).toBe(1);


            }

        );





        test(

            "Should clear patterns",

            () => {


                detector.addPattern(

                    {

                        type:

                            "TEST"

                    }

                );



                expect(

                    detector.clearPatterns()

                ).toBe(true);



                expect(

                    detector.getPatterns().length

                ).toBe(0);


            }

        );





        test(

            "Should return pattern statistics",

            () => {


                detector.detect(

                    graph

                );



                const stats =

                    detector.getStatistics();



                expect(

                    stats.total

                ).toBeGreaterThan(0);



                expect(

                    stats.chains

                ).toBeGreaterThan(0);



            }

        );





        test(

            "Should return detector status",

            () => {


                const status =

                    detector.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Pattern Detector"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.patterns

                ).toBe(0);


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                detector.initialize();



                expect(

                    detector.shutdown()

                ).toBe(true);



                expect(

                    detector.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
