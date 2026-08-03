/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Consistency Manager
 * File      : graph-consistency-manager.test.js
 *
 * Build     : BUILD-000377
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphConsistencyManager =
    require(
        "../../src/engines/knowledge-graph-engine/graph-consistency-manager"
    );



describe(

    "SKOS Graph Consistency Manager Tests",

    () => {



        let consistency;



        beforeEach(

            () => {


                consistency =

                    new GraphConsistencyManager();


            }

        );





        const validGraph = {


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

                    }

                ]

        };





        test(

            "Consistency manager should initialize",

            () => {


                expect(

                    consistency.initialize()

                ).toBe(true);



                expect(

                    consistency.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should validate correct graph",

            () => {


                const result =

                    consistency.validate(

                        validGraph

                    );



                expect(

                    result.valid

                ).toBe(true);



                expect(

                    result.issues.length

                ).toBe(0);


            }

        );





        test(

            "Should detect duplicate nodes",

            () => {


                const graph = {


                    nodes:

                        [

                            {

                                id:

                                    "node-1"

                            },


                            {

                                id:

                                    "node-1"

                            }

                        ],


                    edges:

                        []

                };



                const result =

                    consistency.validate(

                        graph

                    );



                expect(

                    result.valid

                ).toBe(false);



                expect(

                    result.issues[0].type

                ).toBe(

                    "DUPLICATE_NODE"

                );


            }

        );





        test(

            "Should detect broken relations",

            () => {


                const graph = {


                    nodes:

                        [

                            {

                                id:

                                    "node-1"

                            }

                        ],


                    edges:

                        [

                            {

                                from:

                                    "node-1",


                                to:

                                    "node-404",


                                type:

                                    "RELATED"

                            }

                        ]

                };



                const result =

                    consistency.validate(

                        graph

                    );



                expect(

                    result.valid

                ).toBe(false);



                expect(

                    result.issues[0].type

                ).toBe(

                    "BROKEN_RELATION"

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

                                    "node-1"

                            },


                            {

                                id:

                                    "node-2"

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

                                    "node-1",


                                to:

                                    "node-2",


                                type:

                                    "RELATED"

                            }

                        ]

                };



                const result =

                    consistency.validate(

                        graph

                    );



                expect(

                    result.valid

                ).toBe(false);



                expect(

                    result.issues[0].type

                ).toBe(

                    "DUPLICATE_RELATION"

                );


            }

        );





        test(

            "Should return detected issues",

            () => {


                const graph = {


                    nodes:

                        [

                            {

                                id:

                                    "node-1"

                            },


                            {

                                id:

                                    "node-1"

                            }

                        ],


                    edges:

                        []

                };



                consistency.validate(

                    graph

                );



                expect(

                    consistency.getIssues().length

                ).toBe(1);


            }

        );





        test(

            "Should clear issues",

            () => {


                consistency.issues =

                    [

                        {

                            type:

                                "TEST_ERROR"

                        }

                    ];



                expect(

                    consistency.clearIssues()

                ).toBe(true);



                expect(

                    consistency.getIssues().length

                ).toBe(0);


            }

        );





        test(

            "Should return manager status",

            () => {


                const status =

                    consistency.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Consistency Manager"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.issues

                ).toBe(0);


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                consistency.initialize();



                expect(

                    consistency.shutdown()

                ).toBe(true);



                expect(

                    consistency.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
