/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Graph Index Manager
 *
 * Build : BUILD-000370
 *
 * ==========================================================
 */


const GraphIndexManager =
require(
    "../../src/engines/knowledge-graph-engine/graph-index-manager"
);


describe(
    "SKOS Graph Index Manager Tests",
    () => {


        let index;


        beforeEach(
            () => {

                index =
                new GraphIndexManager();

            }
        );



        test(
            "Index manager should initialize",
            () => {

                expect(index)
                .toBeDefined();

            }
        );



        test(
            "Should create index",
            () => {

                index.createIndex(
                    "type"
                );


                expect(
                    index.hasIndex("type")
                )
                .toBe(true);

            }
        );



        test(
            "Should add indexed object",
            () => {


                index.createIndex(
                    "type"
                );


                index.add(

                    "type",

                    "book",

                    {

                        id:"OBJ-001"

                    }

                );


                const result =
                index.search(

                    "type",

                    "book"

                );


                expect(result.length)
                .toBe(1);


            }
        );



        test(
            "Should remove index",
            () => {


                index.createIndex(
                    "type"
                );


                index.removeIndex(
                    "type"
                );


                expect(
                    index.hasIndex("type")
                )
                .toBe(false);


            }
        );



    }
);
