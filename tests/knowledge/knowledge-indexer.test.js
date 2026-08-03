/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Indexer
 * File : knowledge-indexer.test.js
 *
 * Build : BUILD-000600.12
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeIndexer =
    require("../../src/knowledge/knowledge-indexer");



describe(
"Knowledge Indexer Tests",
() => {


    let indexer;



    beforeEach(() => {


        indexer =
            new KnowledgeIndexer();


    });



    test(
    "Should create knowledge indexer",
    () => {


        expect(
            indexer
        )
        .toBeDefined();



        expect(
            indexer.name
        )
        .toBe(
            "Knowledge Indexer"
        );


    });



    test(
    "Should index Knowledge Object",
    () => {


        const object = {


            id:
                "KO-INDEX-001",


            type:
                "CONCEPT",


            title:
                "Knowledge Operating System"


        };



        expect(

            indexer.index(object)

        )
        .toBe(true);



        expect(
            indexer.count()
        )
        .toBe(1);


    });



    test(
    "Should reject object without id",
    () => {


        expect(

            () =>
                indexer.index({

                    title:
                        "Invalid"

                })

        )
        .toThrow();


    });



    test(
    "Should search by text",
    () => {


        indexer.index({

            id:
                "KO-TEXT-001",


            title:
                "Knowledge Operating System"


        });



        const result =
            indexer.search(
                "knowledge"
            );



        expect(
            result.length
        )
        .toBe(1);



        expect(
            result[0].id
        )
        .toBe(
            "KO-TEXT-001"
        );


    });



    test(
    "Should search by type",
    () => {


        indexer.index({

            id:
                "KO-CONCEPT-001",


            type:
                "CONCEPT",


            title:
                "AI Knowledge"


        });



        indexer.index({

            id:
                "KO-DOC-001",


            type:
                "DOCUMENT",


            title:
                "Research Paper"


        });



        const result =
            indexer.findByType(
                "CONCEPT"
            );



        expect(
            result.length
        )
        .toBe(1);



        expect(
            result[0].id
        )
        .toBe(
            "KO-CONCEPT-001"
        );


    });



    test(
    "Should remove indexed object",
    () => {


        indexer.index({

            id:
                "KO-REMOVE-001",


            title:
                "Temporary Knowledge"

        });



        expect(

            indexer.remove(
                "KO-REMOVE-001"
            )

        )
        .toBe(true);



        expect(
            indexer.count()
        )
        .toBe(0);


    });



    test(
    "Should maintain multiple indexes",
    () => {


        indexer.index({

            id:
                "KO-MULTI-001",


            type:
                "MODEL",


            title:
                "AI Model Architecture"

        });



        expect(
            indexer.idIndex.has(
                "KO-MULTI-001"
            )
        )
        .toBe(true);



        expect(
            indexer.typeIndex.has(
                "MODEL"
            )
        )
        .toBe(true);



        expect(
            indexer.textIndex.has(
                "ai"
            )
        )
        .toBe(true);


    });



    test(
    "Should return indexer status",
    () => {


        const status =
            indexer.getStatus();



        expect(
            status.status
        )
        .toBe(
            "READY"
        );



        expect(
            status.indexedObjects
        )
        .toBe(0);


    });



});
