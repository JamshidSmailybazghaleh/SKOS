/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Lifecycle Manager
 * File : knowledge-lifecycle-manager.test.js
 *
 * Build : BUILD-000600.6
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeLifecycleManager =
    require("../../src/knowledge/knowledge-lifecycle-manager");


const KnowledgeObject =
    require("../../src/knowledge/knowledge-object");



describe(
"Knowledge Lifecycle Manager Tests",
() => {


    let lifecycle;
    let object;



    beforeEach(() => {


        lifecycle =
            new KnowledgeLifecycleManager();



        object =
            new KnowledgeObject({

                id:
                    "KO-TEST-001",

                type:
                    "CONCEPT",

                title:
                    "SKOS Knowledge Object"

            });


    });



    test(
    "Should create lifecycle manager",
    () => {


        expect(
            lifecycle
        )
        .toBeDefined();



        expect(
            lifecycle.name
        )
        .toBe(
            "Knowledge Lifecycle Manager"
        );


    });



    test(
    "Should initialize object lifecycle",
    () => {


        expect(
            lifecycle.initialize(object)
        )
        .toBe(true);



        expect(
            lifecycle.getHistory(
                object.id
            ).length
        )
        .toBe(1);


    });



    test(
    "Should transition CREATED to ACTIVE",
    () => {


        lifecycle.initialize(object);



        expect(

            lifecycle.transition(
                object,
                "ACTIVE"
            )

        )
        .toBe(true);



        expect(
            object.state
        )
        .toBe(
            "ACTIVE"
        );


    });



    test(
    "Should reject invalid transition",
    () => {


        expect(

            () =>
                lifecycle.transition(
                    object,
                    "ARCHIVED"
                )

        )
        .toThrow();


    });



    test(
    "Should update lifecycle history",
    () => {


        lifecycle.initialize(object);


        lifecycle.transition(
            object,
            "ACTIVE"
        );


        expect(

            lifecycle
                .getHistory(
                    object.id
                )
                .length

        )
        .toBe(2);


    });



    test(
    "Should version Knowledge Object",
    () => {


        lifecycle.initialize(object);



        const version =
            lifecycle.version(object);



        expect(
            version
        )
        .toBe(
            "1.0.1"
        );



        expect(
            object.state
        )
        .toBe(
            "VERSIONED"
        );


    });



    test(
    "Should archive Knowledge Object",
    () => {


        lifecycle.initialize(object);



        lifecycle.transition(
            object,
            "ACTIVE"
        );



        expect(

            lifecycle.archive(object)

        )
        .toBe(true);



        expect(
            object.state
        )
        .toBe(
            "ARCHIVED"
        );


    });



    test(
    "Should track multiple objects",
    () => {


        const object2 =
            new KnowledgeObject({

                id:
                    "KO-TEST-002"

            });



        lifecycle.initialize(
            object
        );


        lifecycle.initialize(
            object2
        );



        expect(
            lifecycle.history.size
        )
        .toBe(2);


    });



    test(
    "Should return lifecycle status",
    () => {


        const status =
            lifecycle.getStatus();



        expect(
            status.status
        )
        .toBe(
            "READY"
        );


        expect(
            status.trackedObjects
        )
        .toBe(0);


    });



});
