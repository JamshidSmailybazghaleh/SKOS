/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Assurance Engine
 * File      : knowledge-assurance-engine.test.js
 *
 * Build     : BUILD-000401
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeAssuranceEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-assurance-engine"
    );



describe(

    "SKOS Knowledge Assurance Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeAssuranceEngine();


            }

        );





        test(

            "Assurance engine should initialize",

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

            "Should evaluate knowledge assurance",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-001",

                        {

                            trust:

                                1,


                            quality:

                                1,


                            provenance:

                                1

                        }

                    );



                expect(

                    result.objectId

                ).toBe(

                    "OBJ-001"

                );



                expect(

                    result.assuranceScore

                ).toBe(1);



                expect(

                    result.decision

                ).toBe(

                    "APPROVED"

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

            "Should calculate weighted assurance score",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-002",

                        {

                            trust:

                                0.8,


                            quality:

                                0.7,


                            provenance:

                                0.9

                        }

                    );



                expect(

                    result.assuranceScore

                ).toBe(

                    0.78

                );


            }

        );





        test(

            "Should approve high assurance knowledge",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-003",

                        {

                            trust:

                                1,


                            quality:

                                0.9,


                            provenance:

                                1

                        }

                    );



                expect(

                    result.decision

                ).toBe(

                    "APPROVED"

                );


            }

        );





        test(

            "Should request review for medium assurance",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-004",

                        {

                            trust:

                                0.6,


                            quality:

                                0.6,


                            provenance:

                                0.6

                        }

                    );



                expect(

                    result.decision

                ).toBe(

                    "REVIEW_REQUIRED"

                );


            }

        );





        test(

            "Should reject low assurance knowledge",

            () => {


                const result =

                    engine.evaluate(

                        "OBJ-005",

                        {

                            trust:

                                0.2,


                            quality:

                                0.2,


                            provenance:

                                0.2

                        }

                    );



                expect(

                    result.decision

                ).toBe(

                    "REJECTED"

                );


            }

        );





        test(

            "Should retrieve assurance result",

            () => {


                engine.evaluate(

                    "OBJ-006",

                    {

                        trust:

                            1

                    }

                );



                const result =

                    engine.getAssurance(

                        "OBJ-006"

                    );



                expect(

                    result.objectId

                ).toBe(

                    "OBJ-006"

                );


            }

        );





        test(

            "Should return null for unknown assurance",

            () => {


                expect(

                    engine.getAssurance(

                        "UNKNOWN"

                    )

                ).toBeNull();


            }

        );





        test(

            "Should allow publication for approved knowledge",

            () => {


                engine.evaluate(

                    "OBJ-007",

                    {

                        trust:

                            1,


                        quality:

                            1,


                        provenance:

                            1

                    }

                );



                expect(

                    engine.canPublish(

                        "OBJ-007"

                    )

                ).toBe(true);


            }

        );





        test(

            "Should block publication for rejected knowledge",

            () => {


                engine.evaluate(

                    "OBJ-008",

                    {

                        trust:

                            0.1,


                        quality:

                            0.1,


                        provenance:

                            0.1

                    }

                );



                expect(

                    engine.canPublish(

                        "OBJ-008"

                    )

                ).toBe(false);


            }

        );





        test(

            "Should remove assurance record",

            () => {


                engine.evaluate(

                    "OBJ-009",

                    {

                        trust:

                            1

                    }

                );



                expect(

                    engine.removeAssurance(

                        "OBJ-009"

                    )

                ).toBe(true);



                expect(

                    engine.getAssurance(

                        "OBJ-009"

                    )

                ).toBeNull();


            }

        );





        test(

            "Should return assurance registry",

            () => {


                engine.evaluate(

                    "OBJ-010",

                    {

                        trust:

                            1

                    }

                );



                expect(

                    engine.getRegistry().length

                ).toBe(1);


            }

        );





        test(

            "Should return assurance statistics",

            () => {


                engine.evaluate(

                    "OBJ-011",

                    {

                        trust:

                            1,


                        quality:

                            1,


                        provenance:

                            1

                    }

                );



                engine.evaluate(

                    "OBJ-012",

                    {

                        trust:

                            0.5,


                        quality:

                            0.5,


                        provenance:

                            0.5

                    }

                );



                engine.evaluate(

                    "OBJ-013",

                    {

                        trust:

                            0,


                        quality:

                            0,


                        provenance:

                            0

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.total

                ).toBe(3);



                expect(

                    stats.approved

                ).toBe(1);



                expect(

                    stats.review

                ).toBe(1);



                expect(

                    stats.rejected

                ).toBe(1);


            }

        );





        test(

            "Should clear assurance registry",

            () => {


                engine.evaluate(

                    "OBJ-014",

                    {

                        trust:

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

                    "Knowledge Assurance Engine"

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
