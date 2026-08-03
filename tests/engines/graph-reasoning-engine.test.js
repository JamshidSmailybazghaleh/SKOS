/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Reasoning Engine
 * File      : graph-reasoning-engine.test.js
 *
 * Build     : BUILD-000379
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphReasoningEngine =
    require(
        "../../src/engines/knowledge-graph-engine/graph-reasoning-engine"
    );



describe(

    "SKOS Graph Reasoning Engine Tests",

    () => {



        let reasoning;



        beforeEach(

            () => {


                reasoning =

                    new GraphReasoningEngine();


            }

        );





        const graph = {


            nodes:

                [

                    {

                        id:

                            "knowledge-A"

                    },


                    {

                        id:

                            "knowledge-B"

                    },


                    {

                        id:

                            "knowledge-C"

                    }

                ],


            edges:

                [

                    {

                        from:

                            "knowledge-A",


                        to:

                            "knowledge-B",


                        type:

                            "RELATED"

                    },


                    {

                        from:

                            "knowledge-B",


                        to:

                            "knowledge-C",


                        type:

                            "RELATED"

                    }

                ]

        };





        test(

            "Reasoning engine should initialize",

            () => {


                expect(

                    reasoning.initialize()

                ).toBe(true);



                expect(

                    reasoning.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should add reasoning rule",

            () => {


                const rule = {


                    name:

                        "Test Rule",


                    condition:

                        () => true,


                    conclusion:

                        () =>

                            (

                                {

                                    inferred:

                                        true

                                }

                            )


                };



                const result =

                    reasoning.addRule(

                        rule

                    );



                expect(

                    result.name

                ).toBe(

                    "Test Rule"

                );



                expect(

                    reasoning.rules.length

                ).toBe(1);


            }

        );





        test(

            "Should reject invalid rule",

            () => {


                expect(

                    () =>

                        reasoning.addRule(

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should execute reasoning process",

            () => {


                reasoning.addRule(

                    {

                        name:

                            "Always Infer",


                        condition:

                            () => true,


                        conclusion:

                            () =>

                                (

                                    {

                                        type:

                                            "NEW_KNOWLEDGE"

                                    }

                                )

                    }

                );



                const result =

                    reasoning.reason(

                        graph

                    );



                expect(

                    result.length

                ).toBe(1);



                expect(

                    result[0].rule

                ).toBe(

                    "Always Infer"

                );


            }

        );





        test(

            "Should detect existing relationship",

            () => {


                const result =

                    reasoning.inferRelationship(

                        graph,

                        "knowledge-A",

                        "RELATED",

                        "knowledge-B"

                    );



                expect(

                    result

                ).toBe(true);


            }

        );





        test(

            "Should find transitive relationships",

            () => {


                const result =

                    reasoning.findTransitiveRelations(

                        graph,

                        "RELATED"

                    );



                expect(

                    result.length

                ).toBe(1);



                expect(

                    result[0].from

                ).toBe(

                    "knowledge-A"

                );



                expect(

                    result[0].to

                ).toBe(

                    "knowledge-C"

                );


            }

        );





        test(

            "Should return inference history",

            () => {


                reasoning.addRule(

                    {

                        name:

                            "History Rule",


                        condition:

                            () => true,


                        conclusion:

                            () =>

                                (

                                    {

                                        value:

                                            "inference"

                                    }

                                )

                    }

                );



                reasoning.reason(

                    graph

                );



                expect(

                    reasoning.getInferences().length

                ).toBe(1);


            }

        );





        test(

            "Should clear inferences",

            () => {


                reasoning.inferences =

                    [

                        {

                            test:

                                true

                        }

                    ];



                expect(

                    reasoning.clearInferences()

                ).toBe(true);



                expect(

                    reasoning.getInferences().length

                ).toBe(0);


            }

        );





        test(

            "Should return reasoning status",

            () => {


                const status =

                    reasoning.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Reasoning Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.rules

                ).toBe(0);


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                reasoning.initialize();



                expect(

                    reasoning.shutdown()

                ).toBe(true);



                expect(

                    reasoning.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
