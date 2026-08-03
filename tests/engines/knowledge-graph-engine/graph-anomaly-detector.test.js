/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Anomaly Detector
 * File      : graph-anomaly-detector.test.js
 *
 * Build     : BUILD-000385
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphAnomalyDetector =
    require(
        "../../src/engines/knowledge-graph-engine/graph-anomaly-detector"
    );



describe(

    "SKOS Graph Anomaly Detector Tests",

    () => {



        let detector;



        beforeEach(

            () => {


                detector =

                    new GraphAnomalyDetector();


            }

        );





        const normalGraph = {


            nodes:

                [

                    {

                        id:

                            "node-A"

                    },


                    {

                        id:

                            "node-B"

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

                    }

                ]

        };





        test(

            "Anomaly detector should initialize",

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

            "Should analyze graph",

            () => {


                const result =

                    detector.analyze(

                        normalGraph

                    );



                expect(

                    Array.isArray(result)

                ).toBe(true);


            }

        );





        test(

            "Should detect orphan nodes",

            () => {


                const graph = {


                    nodes:

                        [

                            {

                                id:

                                    "connected"

                            },


                            {

                                id:

                                    "orphan"

                            }

                        ],


                    edges:

                        [

                            {

                                from:

                                    "connected",


                                to:

                                    "connected"


                            }

                        ]

                };



                const result =

                    detector.analyze(

                        graph

                    );



                const orphan =

                    result.find(

                        item =>

                            item.type ===

                            "ORPHAN_NODE"

                    );



                expect(

                    orphan

                ).toBeDefined();



                expect(

                    orphan.node

                ).toBe(

                    "orphan"

                );


            }

        );





        test(

            "Should detect self relations",

            () => {


                const graph = {


                    nodes:

                        [

                            {

                                id:

                                    "node-A"

                            }

                        ],


                    edges:

                        [

                            {

                                from:

                                    "node-A",


                                to:

                                    "node-A",


                                type:

                                    "RELATED"

                            }

                        ]

                };



                const result =

                    detector.analyze(

                        graph

                    );



                const anomaly =

                    result.find(

                        item =>

                            item.type ===

                            "SELF_RELATION"

                    );



                expect(

                    anomaly

                ).toBeDefined();



                expect(

                    anomaly.severity

                ).toBe(

                    "HIGH"

                );


            }

        );





        test(

            "Should detect duplicate relations",

            () => {


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



                const result =

                    detector.analyze(

                        graph

                    );



                const duplicate =

                    result.find(

                        item =>

                            item.type ===

                            "DUPLICATE_RELATION"

                    );



                expect(

                    duplicate

                ).toBeDefined();


            }

        );





        test(

            "Should reject invalid graph",

            () => {


                expect(

                    () =>

                        detector.analyze(

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should add manual anomaly",

            () => {


                const anomaly = {


                    type:

                        "CUSTOM_ANOMALY",


                    severity:

                        "LOW"

                };



                const result =

                    detector.addAnomaly(

                        anomaly

                    );



                expect(

                    result.type

                ).toBe(

                    "CUSTOM_ANOMALY"

                );



                expect(

                    detector.getAnomalies().length

                ).toBe(1);


            }

        );





        test(

            "Should return anomaly statistics",

            () => {


                detector.addAnomaly(

                    {

                        type:

                            "TEST_HIGH",


                        severity:

                            "HIGH"

                    }

                );



                detector.addAnomaly(

                    {

                        type:

                            "TEST_MEDIUM",


                        severity:

                            "MEDIUM"

                    }

                );



                const stats =

                    detector.getStatistics();



                expect(

                    stats.total

                ).toBe(2);



                expect(

                    stats.high

                ).toBe(1);



                expect(

                    stats.medium

                ).toBe(1);


            }

        );





        test(

            "Should clear anomalies",

            () => {


                detector.addAnomaly(

                    {

                        type:

                            "TEST"

                    }

                );



                expect(

                    detector.clearAnomalies()

                ).toBe(true);



                expect(

                    detector.getAnomalies().length

                ).toBe(0);


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

                    "Graph Anomaly Detector"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.anomalies

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
