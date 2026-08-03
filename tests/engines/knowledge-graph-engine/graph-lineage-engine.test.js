/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Lineage Engine
 * File      : graph-lineage-engine.test.js
 *
 * Build     : BUILD-000393
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphLineageEngine =
    require(
        "../../src/engines/knowledge-graph-engine/graph-lineage-engine"
    );



describe(

    "SKOS Graph Lineage Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new GraphLineageEngine();


            }

        );





        test(

            "Lineage engine should initialize",

            () => {


                expect(

                    engine.initialize()

                ).toBe(true);



                expect(

                    engine.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should register knowledge lineage",

            () => {


                const lineage =

                    engine.registerLineage(

                        "OBJ-001",

                        "SOURCE-DOCUMENT"

                    );



                expect(

                    lineage.id

                ).toBe(

                    "LINEAGE-1"

                );



                expect(

                    lineage.objectId

                ).toBe(

                    "OBJ-001"

                );



                expect(

                    lineage.source

                ).toBe(

                    "SOURCE-DOCUMENT"

                );


            }

        );





        test(

            "Should reject invalid object id",

            () => {


                expect(

                    () =>

                        engine.registerLineage(

                            null,

                            "SOURCE"

                        )

                ).toThrow();


            }

        );





        test(

            "Should store lineage metadata",

            () => {


                const lineage =

                    engine.registerLineage(

                        "OBJ-002",

                        "IMPORT-ENGINE",

                        {

                            format:

                                "PDF"

                        }

                    );



                expect(

                    lineage.metadata.format

                ).toBe(

                    "PDF"

                );


            }

        );





        test(

            "Should add transformation history",

            () => {


                const lineage =

                    engine.registerLineage(

                        "OBJ-003",

                        "USER-UPLOAD"

                    );



                const transformation =

                    engine.addTransformation(

                        lineage.id,

                        {

                            type:

                                "NORMALIZATION",


                            details:

                                {

                                    engine:

                                        "Metadata Engine"

                                }

                        }

                    );



                expect(

                    transformation.type

                ).toBe(

                    "NORMALIZATION"

                );



                expect(

                    lineage.transformations.length

                ).toBe(1);


            }

        );





        test(

            "Should reject unknown lineage transformation",

            () => {


                expect(

                    () =>

                        engine.addTransformation(

                            "INVALID",

                            {

                                type:

                                    "UPDATE"

                            }

                        )

                ).toThrow();


            }

        );





        test(

            "Should retrieve object lineage",

            () => {


                engine.registerLineage(

                    "OBJ-004",

                    "KNOWLEDGE-IMPORT"

                );



                const result =

                    engine.getLineage(

                        "OBJ-004"

                    );



                expect(

                    result.objectId

                ).toBe(

                    "OBJ-004"

                );


            }

        );





        test(

            "Should return null for unknown lineage",

            () => {


                const result =

                    engine.getLineage(

                        "UNKNOWN"

                    );



                expect(

                    result

                ).toBeNull();


            }

        );





        test(

            "Should return lineage graph",

            () => {


                engine.registerLineage(

                    "OBJ-005",

                    "SOURCE-A"

                );



                const graph =

                    engine.getLineageGraph();



                expect(

                    graph.length

                ).toBe(1);



            }

        );





        test(

            "Should return ancestors",

            () => {


                engine.registerLineage(

                    "OBJ-006",

                    "SOURCE-MASTER"

                );



                const ancestors =

                    engine.getAncestors(

                        "OBJ-006"

                    );



                expect(

                    ancestors[0]

                ).toBe(

                    "SOURCE-MASTER"

                );


            }

        );





        test(

            "Should add manual lineage",

            () => {


                const lineage = {


                    id:

                        "LINEAGE-MANUAL",


                    objectId:

                        "OBJ-MANUAL",


                    source:

                        "EXTERNAL"


                };



                const result =

                    engine.addLineage(

                        lineage

                    );



                expect(

                    result.id

                ).toBe(

                    "LINEAGE-MANUAL"

                );



                expect(

                    engine.getLineageGraph().length

                ).toBe(1);


            }

        );





        test(

            "Should clear lineage data",

            () => {


                engine.registerLineage(

                    "OBJ-007",

                    "SOURCE"

                );



                expect(

                    engine.clearLineage()

                ).toBe(true);



                expect(

                    engine.getLineageGraph().length

                ).toBe(0);



            }

        );





        test(

            "Should return lineage statistics",

            () => {


                const lineage =

                    engine.registerLineage(

                        "OBJ-008",

                        "SOURCE"

                    );



                engine.addTransformation(

                    lineage.id,

                    {

                        type:

                            "UPDATE"

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.objects

                ).toBe(1);



                expect(

                    stats.transformations

                ).toBe(1);


            }

        );





        test(

            "Should return engine status",

            () => {


                const status =

                    engine.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Lineage Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.lineages

                ).toBe(0);


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                engine.initialize();



                expect(

                    engine.shutdown()

                ).toBe(true);



                expect(

                    engine.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
