/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Metadata Manager
 * File : knowledge-metadata-manager.test.js
 *
 * Build : BUILD-000600.8
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeMetadataManager =
    require("../../src/knowledge/knowledge-metadata-manager");


const KnowledgeObject =
    require("../../src/knowledge/knowledge-object");



describe(
"Knowledge Metadata Manager Tests",
() => {


    let manager;
    let object;



    beforeEach(() => {


        manager =
            new KnowledgeMetadataManager();



        object =
            new KnowledgeObject({

                id:
                    "KO-META-001",

                type:
                    "CONCEPT",

                title:
                    "Knowledge Architecture"

            });


    });



    test(
    "Should create metadata manager",
    () => {


        expect(
            manager
        )
        .toBeDefined();



        expect(
            manager.name
        )
        .toBe(
            "Knowledge Metadata Manager"
        );


    });



    test(
    "Should create metadata record",
    () => {


        const metadata =
            manager.create(

                object,

                {

                    source:
                        "SKOS Research",

                    author:
                        "Smaily"

                }

            );



        expect(
            metadata.id
        )
        .toBe(
            "KO-META-001"
        );



        expect(
            metadata.source
        )
        .toBe(
            "SKOS Research"
        );


    });



    test(
    "Should store metadata",
    () => {


        manager.create(
            object
        );


        expect(
            manager.metadataStore.size
        )
        .toBe(1);


    });



    test(
    "Should retrieve metadata",
    () => {


        manager.create(
            object
        );


        const metadata =
            manager.get(
                object.id
            );



        expect(
            metadata.title
        )
        .toBe(
            "Knowledge Architecture"
        );


    });



    test(
    "Should validate metadata",
    () => {


        manager.create(
            object
        );



        expect(
            manager.validate(
                object.id
            )
        )
        .toBe(true);


    });



    test(
    "Should update metadata",
    () => {


        manager.create(
            object
        );



        expect(

            manager.update(

                object.id,

                {

                    category:
                        "Knowledge Systems"

                }

            )

        )
        .toBe(true);



        expect(

            manager.get(
                object.id
            )
            .category

        )
        .toBe(
            "Knowledge Systems"
        );


    });



    test(
    "Should track metadata history",
    () => {


        manager.create(
            object
        );


        manager.update(

            object.id,

            {

                author:
                    "SKOS Team"

            }

        );



        expect(

            manager
                .getHistory(
                    object.id
                )
                .length

        )
        .toBe(2);


    });



    test(
    "Should attach metadata to object",
    () => {


        const metadata =
            manager.create(
                object
            );



        expect(

            manager.attach(

                object,

                metadata

            )

        )
        .toBe(true);



        expect(
            object.metadata.id
        )
        .toBe(
            "KO-META-001"
        );


    });



    test(
    "Should return metadata manager status",
    () => {


        const status =
            manager.getStatus();



        expect(
            status.status
        )
        .toBe(
            "READY"
        );



        expect(
            status.records
        )
        .toBe(0);


    });



    test(
    "Should reject update for missing metadata",
    () => {


        expect(

            () =>
                manager.update(

                    "UNKNOWN",

                    {

                        title:
                            "Test"

                    }

                )

        )
        .toThrow();


    });



});
