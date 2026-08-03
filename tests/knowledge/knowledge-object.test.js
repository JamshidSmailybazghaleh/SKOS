/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Object
 * File : knowledge-object.test.js
 *
 * Build : BUILD-000600.4
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeObject =
    require("../../src/knowledge/knowledge-object");



describe(
"Knowledge Object Tests",
() => {


    test(
    "Should create Knowledge Object",
    () => {


        const object =
            new KnowledgeObject({

                id:
                    "KO-000001",

                type:
                    "CONCEPT",

                title:
                    "Knowledge Operating System"

            });



        expect(
            object
        ).toBeDefined();



        expect(
            object.id
        )
        .toBe(
            "KO-000001"
        );


        expect(
            object.type
        )
        .toBe(
            "CONCEPT"
        );


    });



    test(
    "Should reject object without identity",
    () => {


        expect(

            () =>
                new KnowledgeObject({})

        )
        .toThrow();


    });



    test(
    "Should set default version",
    () => {


        const object =
            new KnowledgeObject({

                id:
                    "KO-000002"

            });



        expect(
            object.version
        )
        .toBe(
            "1.0.0"
        );


    });



    test(
    "Should validate Knowledge Object",
    () => {


        const object =
            new KnowledgeObject({

                id:
                    "KO-000003",

                type:
                    "DATA"

            });



        expect(
            object.validate()
        )
        .toBe(true);


    });



    test(
    "Should update content",
    () => {


        const object =
            new KnowledgeObject({

                id:
                    "KO-000004",

                content:
                    "Initial"

            });



        object.update({

            content:
                "Updated"

        });



        expect(
            object.content
        )
        .toBe(
            "Updated"
        );


    });



    test(
    "Should activate Knowledge Object",
    () => {


        const object =
            new KnowledgeObject({

                id:
                    "KO-000005"

            });



        expect(
            object.activate()
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
    "Should archive Knowledge Object",
    () => {


        const object =
            new KnowledgeObject({

                id:
                    "KO-000006"

            });



        object.archive();



        expect(
            object.state
        )
        .toBe(
            "ARCHIVED"
        );


    });



    test(
    "Should return identity",
    () => {


        const object =
            new KnowledgeObject({

                id:
                    "KO-000007",

                type:
                    "DOCUMENT"

            });



        const identity =
            object.getIdentity();



        expect(
            identity.id
        )
        .toBe(
            "KO-000007"
        );



        expect(
            identity.version
        )
        .toBe(
            "1.0.0"
        );


    });



    test(
    "Should return status",
    () => {


        const object =
            new KnowledgeObject({

                id:
                    "KO-000008"

            });



        const status =
            object.getStatus();



        expect(
            status.state
        )
        .toBe(
            "CREATED"
        );


    });



});
