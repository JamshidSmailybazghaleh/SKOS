/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Learning Engine
 * File : knowledge-learning-engine.test.js
 *
 * Build : BUILD-000700.8
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeLearningEngine =
    require("../../src/learning/knowledge-learning-engine");



describe(
"Knowledge Learning Engine Tests",
() => {


    let engine;



    beforeEach(() => {


        engine =
            new KnowledgeLearningEngine();


    });



    test(
    "Should create learning engine",
    () => {


        expect(
            engine
        )
        .toBeDefined();



        expect(
            engine.name
        )
        .toBe(
            "Knowledge Learning Engine"
        );


    });



    test(
    "Should record learning event",
    () => {


        const event = {


            type:
                "SEARCH",


            knowledge:
                "Artificial Intelligence"


        };



        expect(

            engine.recordEvent(event)

        )
        .toBe(true);



        expect(
            engine.getEvents().length
        )
        .toBe(1);


    });



    test(
    "Should reject empty learning event",
    () => {


        expect(

            () =>
                engine.recordEvent()

        )
        .toThrow();


    });



    test(
    "Should analyze patterns",
    () => {


        engine.recordEvent({

            type:
                "SEARCH"

        });



        engine.recordEvent({

            type:
                "INFERENCE"

        });



        const patterns =
            engine.analyzePatterns();



        expect(
            patterns.length
        )
        .toBe(2);



        expect(
            patterns[0].pattern
        )
        .toBe(
            "SEARCH"
        );


    });



    test(
    "Should learn from context",
    () => {


        const result =
            engine.learn({

                action:
                    "KNOWLEDGE_ACCESS"

            });



        expect(
            result.length
        )
        .toBe(1);



        expect(
            engine.getEvents().length
        )
        .toBe(1);


    });



    test(
    "Should add learning model",
    () => {


        const model = {


            type:
                "PATTERN_MODEL",


            version:
                "1.0"


        };



        expect(

            engine.addModel(

                "default",

                model

            )

        )
        .toBe(true);



        expect(

            engine.getModel(
                "default"
            )

        )
        .toEqual(model);


    });



    test(
    "Should return null for unknown model",
    () => {


        expect(

            engine.getModel(
                "unknown"
            )

        )
        .toBeNull();


    });



    test(
    "Should return patterns",
    () => {


        engine.recordEvent({

            type:
                "UPDATE"

        });



        engine.analyzePatterns();



        expect(

            engine.getPatterns().length

        )
        .toBe(1);


    });



    test(
    "Should clear learning data",
    () => {


        engine.recordEvent({

            type:
                "TEST"

        });



        engine.addModel(

            "test",

            {}

        );



        expect(
            engine.clear()
        )
        .toBe(true);



        expect(
            engine.getEvents().length
        )
        .toBe(0);



        expect(
            engine.getPatterns().length
        )
        .toBe(0);



        expect(
            engine.models.size
        )
        .toBe(0);


    });



    test(
    "Should return learning engine status",
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
            status.events
        )
        .toBe(0);



        expect(
            status.patterns
        )
        .toBe(0);



        expect(
            status.models
        )
        .toBe(0);


    });



});
