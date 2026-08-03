/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Registry
 * File : knowledge-registry.test.js
 *
 * Build : BUILD-000600.10
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeRegistry =
    require("../../src/knowledge/knowledge-registry");



describe(
"Knowledge Registry Tests",
() => {


    let registry;



    beforeEach(() => {


        registry =
            new KnowledgeRegistry();


    });



    test(
    "Should create knowledge registry",
    () => {


        expect(
            registry
        )
        .toBeDefined();



        expect(
            registry.name
        )
        .toBe(
            "Knowledge Registry"
        );


    });



    test(
    "Should register Knowledge Object",
    () => {


        const object = {


            id:
                "KO-000001",


            type:
                "CONCEPT",


            title:
                "Knowledge Operating System"


        };



        expect(

            registry.register(object)

        )
        .toBe(true);



        expect(
            registry.count()
        )
        .toBe(1);


    });



    test(
    "Should reject object without id",
    () => {


        expect(

            () =>
                registry.register({

                    title:
                        "Invalid Object"

                })

        )
        .toThrow();


    });



    test(
    "Should retrieve object by id",
    () => {


        const object = {


            id:
                "KO-000002",


            title:
                "SKOS"


        };



        registry.register(
            object
        );



        expect(

            registry.get(
                "KO-000002"
            )

        )
        .toEqual(object);


    });



    test(
    "Should check object existence",
    () => {


        registry.register({

            id:
                "KO-000003"

        });



        expect(

            registry.exists(
                "KO-000003"
            )

        )
        .toBe(true);



        expect(

            registry.exists(
                "UNKNOWN"
            )

        )
        .toBe(false);


    });



    test(
    "Should return all knowledge objects",
    () => {


        registry.register({

            id:
                "KO-A"

        });



        registry.register({

            id:
                "KO-B"

        });



        expect(

            registry.getAll().length

        )
        .toBe(2);


    });



    test(
    "Should search knowledge objects",
    () => {


        registry.register({

            id:
                "KO-SEARCH-001",


            title:
                "Knowledge Operating System"

        });



        registry.register({

            id:
                "KO-SEARCH-002",


            title:
                "Artificial Intelligence"

        });



        const result =
            registry.search(
                "Knowledge"
            );



        expect(
            result.length
        )
        .toBe(1);



        expect(
            result[0].id
        )
        .toBe(
            "KO-SEARCH-001"
        );


    });



    test(
    "Should unregister object",
    () => {


        registry.register({

            id:
                "KO-REMOVE"

        });



        expect(

            registry.unregister(
                "KO-REMOVE"
            )

        )
        .toBe(true);



        expect(

            registry.exists(
                "KO-REMOVE"
            )

        )
        .toBe(false);


    });



    test(
    "Should clear registry",
    () => {


        registry.register({

            id:
                "KO-CLEAR"

        });



        expect(

            registry.clear()

        )
        .toBe(true);



        expect(

            registry.count()

        )
        .toBe(0);


    });



    test(
    "Should return registry status",
    () => {


        const status =
            registry.getStatus();



        expect(
            status.status
        )
        .toBe(
            "READY"
        );



        expect(
            status.objects
        )
        .toBe(0);


    });



});
