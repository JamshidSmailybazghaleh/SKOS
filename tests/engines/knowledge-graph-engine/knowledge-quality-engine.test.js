/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Quality Engine
 * File      : knowledge-quality-engine.test.js
 *
 * Build     : BUILD-000399
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeQualityEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-quality-engine"
    );



describe(

    "SKOS Knowledge Quality Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeQualityEngine();


            }

        );





        test(

            "Quality engine should initialize",

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

            "Should evaluate knowledge quality",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-001",

                        {

                            completeness:

                                1,


                            accuracy:

                                1,


                            consistency:

                                1,


                            freshness:

                                1

                        }

                    );



                expect(

                    result.objectId

                ).toBe(

                    "OBJ-001"

                );



                expect(

                    result.score

                ).toBe(1);



                expect(

                    result.level

                ).toBe(

                    "EXCELLENT"

                );


            }

        );





        test(

            "Should reject invalid object id",

            () => {


                expect(

                    () =>

                        engine.evaluate(

                            null

                        )

                ).toThrow();


            }

        );





        test(

            "Should calculate weighted quality score",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-002",

                        {

                            completeness:

                                0.8,


                            accuracy:

                                0.9,


                            consistency:

                                0.7,


                            freshness:

                                1

                        }

                    );



                expect(

                    result.score

                ).toBe(

                    0.83

                );


            }

        );





        test(

            "Should classify excellent quality",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-003",

                        {

                            completeness:

                                1,


                            accuracy:

                                0.9,


                            consistency:

                                0.9,


                            freshness:

                                1

                        }

                    );



                expect(

                    result.level

                ).toBe(

                    "EXCELLENT"

                );


            }

        );





        test(

            "Should classify good quality",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-004",

                        {

                            completeness:

                                0.7,


                            accuracy:

                                0.7,


                            consistency:

                                0.7,


                            freshness:

                                0.7

                        }

                    );



                expect(

                    result.level

                ).toBe(

                    "GOOD"

                );


            }

        );





        test(

            "Should classify fair quality",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-005",

                        {

                            completeness:

                                0.5,


                            accuracy:

                                0.5,


                            consistency:

                                0.5,


                            freshness:

                                0.5

                        }

                    );



                expect(

                    result.level

                ).toBe(

                    "FAIR"

                );


            }

        );





        test(

            "Should classify poor quality",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-006",

                        {

                            completeness:

                                0.1,


                            accuracy:

                                0.2,


                            consistency:

                                0.1,


                            freshness:

                                0.2

                        }

                    );



                expect(

                    result.level

                ).toBe(

                    "POOR"

                );


            }

        );





        test(

            "Should retrieve quality record",

            () => {


                engine.evaluate(

                    "OBJ-007",

                    {

                        completeness:

                            1

                    }

                );



                const result =

                    engine.getQuality(

                        "OBJ-007"

                    );



                expect(

                    result.objectId

                ).toBe(

                    "OBJ-007"

                );


            }

        );





        test(

            "Should return null for unknown quality",

            () => {


                expect(

                    engine.getQuality(

                        "UNKNOWN"

                    )

                ).toBeNull();


            }

        );





        test(

            "Should identify high quality knowledge",

            () => {


                engine.evaluate(

                    "OBJ-008",

                    {

                        completeness:

                            1,


                        accuracy:

                            1,


                        consistency:

                            1,


                        freshness:

                            1

                    }

                );



                expect(

                    engine.isHighQuality(

                        "OBJ-008"

                    )

                ).toBe(true);


            }

        );





        test(

            "Should reject low quality knowledge",

            () => {


                engine.evaluate(

                    "OBJ-009",

                    {

                        completeness:

                            0.2,


                        accuracy:

                            0.2,


                        consistency:

                            0.2,


                        freshness:

                            0.2

                    }

                );



                expect(

                    engine.isHighQuality(

                        "OBJ-009"

                    )

                ).toBe(false);


            }

        );





        test(

            "Should remove quality record",

            () => {


                engine.evaluate(

                    "OBJ-010",

                    {

                        completeness:

                            1

                    }

                );



                expect(

                    engine.removeQuality(

                        "OBJ-010"

                    )

                ).toBe(true);



                expect(

                    engine.getQuality(

                        "OBJ-010"

                    )

                ).toBeNull();


            }

        );





        test(

            "Should return quality registry",

            () => {


                engine.evaluate(

                    "OBJ-011",

                    {

                        completeness:

                            1

                    }

                );



                expect(

                    engine.getRegistry().length

                ).toBe(1);


            }

        );





        test(

            "Should return quality statistics",

            () => {


                engine.evaluate(

                    "OBJ-012",

                    {

                        completeness:

                            1,


                        accuracy:

                            1,


                        consistency:

                            1,


                        freshness:

                            1

                    }

                );



                engine.evaluate(

                    "OBJ-013",

                    {

                        completeness:

                            0.7,


                        accuracy:

                            0.7,


                        consistency:

                            0.7,


                        freshness:

                            0.7

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.total

                ).toBe(2);



                expect(

                    stats.excellent

                ).toBe(1);



                expect(

                    stats.good

                ).toBe(1);


            }

        );





        test(

            "Should clear quality registry",

            () => {


                engine.evaluate(

                    "OBJ-014",

                    {

                        completeness:

                            1

                    }

                );



                expect(

                    engine.clearRegistry()

                ).toBe(true);



                expect(

                    engine.getRegistry().length

                ).toBe(0);


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

                    "Knowledge Quality Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.records

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
