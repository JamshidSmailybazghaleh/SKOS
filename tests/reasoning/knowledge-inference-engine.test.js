/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Inference Engine
 * File : knowledge-inference-engine.test.js
 *
 * Build : BUILD-000700.6
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeInferenceEngine =
    require("../../src/reasoning/knowledge-inference-engine");



describe(
"Knowledge Inference Engine Tests",
() => {


    let engine;



    let context;



    beforeEach(() => {


        engine =
            new KnowledgeInferenceEngine();



        context = {


            source:
                "KO-A",


            target:
                "KO-B",


            relation:
                "SUBFIELD_OF"



        };


    });



    test(
    "Should create inference engine",
    () => {


        expect(
            engine
        )
        .toBeDefined();



        expect(
            engine.name
        )
        .toBe(
            "Knowledge Inference Engine"
        );


    });



    test(
    "Should add inference rule",
    () => {


        const rule =
            () => {


                return {

                    id:
                        "INF-001"

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
    "Should reject invalid inference rule",
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
    "Should generate inferred knowledge",
    () => {


        engine.addRule(

            (context) => {


                if(
                    context.relation ===
                    "SUBFIELD_OF"
                )
                {

                    return {


                        id:
                            "INF-001",


                        type:
                            "DERIVED_KNOWLEDGE",


                        statement:
                            "Derived relationship"

                    };

                }


            }

        );



        const result =
            engine.infer(
                context
            );



        expect(
            result.length
        )
        .toBe(1);



        expect(
            result[0].id
        )
        .toBe(
            "INF-001"
        );


    });



    test(
    "Should store derived knowledge",
    () => {


        engine.addRule(

            () => ({

                id:
                    "INF-002"

            })

        );



        engine.infer(
            context
        );



        expect(

            engine.getDerivedKnowledge()
                .length

        )
        .toBe(1);


    });



    test(
    "Should prevent duplicate inference",
    () => {


        engine.addRule(

            () => ({

                id:
                    "INF-DUP"

            })

        );



        engine.infer(
            context
        );


        engine.infer(
            context
        );



        expect(

            engine.getDerivedKnowledge()
                .length

        )
        .toBe(1);


    });



    test(
    "Should execute multiple inference rules",
    () => {


        engine.addRule(

            () => ({

                id:
                    "INF-A"

            })

        );



        engine.addRule(

            () => ({

                id:
                    "INF-B"

            })

        );



        const result =
            engine.infer(
                context
            );



        expect(
            result.length
        )
        .toBe(2);


    });



    test(
    "Should clear derived knowledge",
    () => {


        engine.derivedKnowledge =
            [

                {

                    id:
                        "OLD-INF"

                }

            ];



        expect(

            engine.clear()

        )
        .toBe(true);



        expect(

            engine.getDerivedKnowledge()
                .length

        )
        .toBe(0);


    });



    test(
    "Should return inference engine status",
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
            status.derived
        )
        .toBe(0);


    });



});
