/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Trust Engine
 * File      : knowledge-trust-engine.test.js
 *
 * Build     : BUILD-000397
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeTrustEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-trust-engine"
    );



describe(

    "SKOS Knowledge Trust Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeTrustEngine();


            }

        );





        test(

            "Trust engine should initialize",

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

            "Should evaluate knowledge trust",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-001",

                        {

                            provenance:

                                1,


                            evidence:

                                1,


                            validation:

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

                    "HIGH"

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

            "Should calculate weighted trust score",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-002",

                        {

                            provenance:

                                0.5,


                            evidence:

                                0.8,


                            validation:

                                1

                        }

                    );



                expect(

                    result.score

                ).toBe(

                    0.74

                );


            }

        );





        test(

            "Should classify high trust knowledge",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-003",

                        {

                            provenance:

                                1,


                            evidence:

                                0.9,


                            validation:

                                1

                        }

                    );



                expect(

                    result.level

                ).toBe(

                    "HIGH"

                );


            }

        );





        test(

            "Should classify medium trust knowledge",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-004",

                        {

                            provenance:

                                0.6,


                            evidence:

                                0.6,


                            validation:

                                0.6

                        }

                    );



                expect(

                    result.level

                ).toBe(

                    "MEDIUM"

                );


            }

        );





        test(

            "Should classify low trust knowledge",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-005",

                        {

                            provenance:

                                0.4,


                            evidence:

                                0.2,


                            validation:

                                0.4

                        }

                    );



                expect(

                    result.level

                ).toBe(

                    "LOW"

                );


            }

        );





        test(

            "Should classify untrusted knowledge",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-006",

                        {

                            provenance:

                                0,


                            evidence:

                                0,


                            validation:

                                0

                        }

                    );



                expect(

                    result.level

                ).toBe(

                    "UNTRUSTED"

                );


            }

        );





        test(

            "Should retrieve trust record",

            () => {


                engine.evaluate(

                    "OBJ-007",

                    {

                        provenance:

                            1

                    }

                );



                const result =

                    engine.getTrust(

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

            "Should return null for unknown trust",

            () => {


                expect(

                    engine.getTrust(

                        "UNKNOWN"

                    )

                ).toBeNull();


            }

        );





        test(

            "Should identify trusted knowledge",

            () => {


                engine.evaluate(

                    "OBJ-008",

                    {

                        provenance:

                            1,


                        evidence:

                            1,


                        validation:

                            1

                    }

                );



                expect(

                    engine.isTrusted(

                        "OBJ-008"

                    )

                ).toBe(true);


            }

        );





        test(

            "Should reject low confidence knowledge",

            () => {


                engine.evaluate(

                    "OBJ-009",

                    {

                        provenance:

                            0.2,


                        evidence:

                            0.2,


                        validation:

                            0.2

                    }

                );



                expect(

                    engine.isTrusted(

                        "OBJ-009"

                    )

                ).toBe(false);


            }

        );





        test(

            "Should remove trust record",

            () => {


                engine.evaluate(

                    "OBJ-010",

                    {

                        provenance:

                            1

                    }

                );



                expect(

                    engine.removeTrust(

                        "OBJ-010"

                    )

                ).toBe(true);



                expect(

                    engine.getTrust(

                        "OBJ-010"

                    )

                ).toBeNull();


            }

        );





        test(

            "Should return trust registry",

            () => {


                engine.evaluate(

                    "OBJ-011",

                    {

                        provenance:

                            1

                    }

                );



                expect(

                    engine.getRegistry().length

                ).toBe(1);


            }

        );





        test(

            "Should return trust statistics",

            () => {


                engine.evaluate(

                    "OBJ-012",

                    {

                        provenance:

                            1,


                        evidence:

                            1,


                        validation:

                            1

                    }

                );



                engine.evaluate(

                    "OBJ-013",

                    {

                        provenance:

                            0.5,


                        evidence:

                            0.5,


                        validation:

                            0.5

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.total

                ).toBe(2);



                expect(

                    stats.high

                ).toBe(1);



                expect(

                    stats.medium

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

                    "Knowledge Trust Engine"

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
