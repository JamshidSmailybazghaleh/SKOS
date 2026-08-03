/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Reasoning Engine
 * File : knowledge-reasoning-engine.test.js
 *
 * Build : BUILD-000700.4
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeReasoningEngine =
    require("../../src/reasoning/knowledge-reasoning-engine");



describe(
"Knowledge Reasoning Engine Tests",
() => {


    let engine;



    let graph;



    beforeEach(() => {


        engine =
            new KnowledgeReasoningEngine();



        graph = {


            nodes:
            new Map([

                [

                    "KO-A",

                    {

                        id:
                            "KO-A",

                        title:
                            "Artificial Intelligence"

                    }

                ],


                [

                    "KO-B",

                    {

                        id:
                            "KO-B",

                        title:
                            "Machine Learning"

                    }

                ]

            ]),



            edges:
            [

                {

                    source:
                        "KO-A",


                    target:
                        "KO-B",


                    relation:
                        "SUBFIELD_OF"

                }

            ]

        };


    });



    test(
    "Should create reasoning engine",
    () => {


        expect(
            engine
        )
        .toBeDefined();



        expect(
            engine.name
        )
        .toBe(
            "Knowledge Reasoning Engine"
        );


    });



    test(
    "Should add reasoning rule",
    () => {


        const rule =
            () => {


                return {

                    type:
                        "TEST_RULE"

                };


            };



        expect(

            engine.addRule(rule)

        )
        .toBe(true);



        expect(
            engine.rules.length
        )
        .toBe(1);


    });



    test(
    "Should reject invalid rule",
    () => {


        expect(

            () =>
                engine.addRule(
                    "invalid"
                )

        )
        .toThrow();


    });



    test(
    "Should analyze graph using rule",
    () => {


        engine.addRule(

            (graph) => {


                if(
                    graph.edges.length > 0
                )
                {

                    return {

                        type:
                            "RELATION_FOUND"

                    };

                }


            }

        );



        const result =
            engine.analyze(graph);



        expect(
            result.length
        )
        .toBe(1);



        expect(
            result[0].type
        )
        .toBe(
            "RELATION_FOUND"
        );


    });



    test(
    "Should find relationships by source",
    () => {


        const result =
            engine.inferRelationship(

                graph,

                "KO-A",

                "SUBFIELD_OF"

            );



        expect(
            result.length
        )
        .toBe(1);



        expect(
            result[0].target
        )
        .toBe(
            "KO-B"
        );


    });



    test(
    "Should detect graph patterns",
    () => {


        const patterns =
            engine.findPatterns(
                graph
            );



        expect(
            patterns.length
        )
        .toBe(1);



        expect(
            patterns[0].relation
        )
        .toBe(
            "SUBFIELD_OF"
        );


    });



    test(
    "Should return generated insights",
    () => {


        engine.addRule(

            () => ({

                type:
                    "INSIGHT",

                message:
                    "Knowledge relation detected."

            })

        );



        engine.analyze(graph);



        expect(

            engine.getInsights().length

        )
        .toBe(1);


    });



    test(
    "Should clear insights",
    () => {


        engine.insights =
            [

                {

                    type:
                        "OLD"

                }

            ];



        expect(

            engine.clearInsights()

        )
        .toBe(true);



        expect(
            engine.getInsights().length
        )
        .toBe(0);


    });



    test(
    "Should return reasoning status",
    () => {


        const status =
            engine.getStatus();



        expect(
            status.status
        )
        .toBe(
            "READY"
        );



        expect(
            status.rules
        )
        .toBe(0);



        expect(
            status.insights
        )
        .toBe(0);


    });



});
