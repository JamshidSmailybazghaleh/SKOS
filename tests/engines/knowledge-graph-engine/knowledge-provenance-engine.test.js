/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Provenance Engine
 * File      : knowledge-provenance-engine.test.js
 *
 * Build     : BUILD-000395
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeProvenanceEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-provenance-engine"
    );



describe(

    "SKOS Knowledge Provenance Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeProvenanceEngine();


            }

        );





        test(

            "Provenance engine should initialize",

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

            "Should register knowledge provenance",

            () => {


                const record =

                    engine.registerProvenance(

                        "OBJ-001",

                        "DOCUMENT-SOURCE"

                    );



                expect(

                    record.id

                ).toBe(

                    "PROVENANCE-1"

                );



                expect(

                    record.objectId

                ).toBe(

                    "OBJ-001"

                );



                expect(

                    record.source

                ).toBe(

                    "DOCUMENT-SOURCE"

                );


            }

        );





        test(

            "Should reject invalid knowledge object id",

            () => {


                expect(

                    () =>

                        engine.registerProvenance(

                            null,

                            "SOURCE"

                        )

                ).toThrow();


            }

        );





        test(

            "Should store evidence metadata",

            () => {


                const record =

                    engine.registerProvenance(

                        "OBJ-002",

                        "RESEARCH-DATABASE",

                        {

                            citation:

                                "REF-001"

                        },

                        {

                            format:

                                "PDF"

                        }

                    );



                expect(

                    record.evidence.citation

                ).toBe(

                    "REF-001"

                );



                expect(

                    record.metadata.format

                ).toBe(

                    "PDF"

                );


            }

        );





        test(

            "Should add validation evidence",

            () => {


                const record =

                    engine.registerProvenance(

                        "OBJ-003",

                        "SOURCE-A"

                    );



                const validation =

                    engine.addValidation(

                        record.id,

                        {

                            validator:

                                "EXPERT-SYSTEM",


                            result:

                                "APPROVED"

                        }

                    );



                expect(

                    validation.result

                ).toBe(

                    "APPROVED"

                );



                expect(

                    record.validations.length

                ).toBe(1);


            }

        );





        test(

            "Should reject unknown provenance validation",

            () => {


                expect(

                    () =>

                        engine.addValidation(

                            "INVALID-ID",

                            {

                                result:

                                    "APPROVED"

                            }

                        )

                ).toThrow();


            }

        );





        test(

            "Should calculate trust score",

            () => {


                const record =

                    engine.registerProvenance(

                        "OBJ-004",

                        "SOURCE"

                    );



                engine.addValidation(

                    record.id,

                    {

                        result:

                            "APPROVED"

                    }

                );



                engine.addValidation(

                    record.id,

                    {

                        result:

                            "REJECTED"

                    }

                );



                expect(

                    record.trustScore

                ).toBe(

                    0.5

                );


            }

        );





        test(

            "Should return provenance by object id",

            () => {


                engine.registerProvenance(

                    "OBJ-005",

                    "KNOWLEDGE-IMPORT"

                );



                const result =

                    engine.getProvenance(

                        "OBJ-005"

                    );



                expect(

                    result.objectId

                ).toBe(

                    "OBJ-005"

                );


            }

        );





        test(

            "Should return null for unknown object",

            () => {


                const result =

                    engine.getProvenance(

                        "UNKNOWN"

                    );



                expect(

                    result

                ).toBeNull();


            }

        );





        test(

            "Should return trust score",

            () => {


                const record =

                    engine.registerProvenance(

                        "OBJ-006",

                        "SOURCE"

                    );



                engine.addValidation(

                    record.id,

                    {

                        result:

                            "APPROVED"

                    }

                );



                expect(

                    engine.getTrustScore(

                        "OBJ-006"

                    )

                ).toBe(1);


            }

        );





        test(

            "Should return provenance registry",

            () => {


                engine.registerProvenance(

                    "OBJ-007",

                    "SOURCE"

                );



                expect(

                    engine.getRegistry().length

                ).toBe(1);


            }

        );





        test(

            "Should return provenance statistics",

            () => {


                const record =

                    engine.registerProvenance(

                        "OBJ-008",

                        "SOURCE"

                    );



                engine.addValidation(

                    record.id,

                    {

                        result:

                            "APPROVED"

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.records

                ).toBe(1);



                expect(

                    stats.validations

                ).toBe(1);


            }

        );





        test(

            "Should clear provenance registry",

            () => {


                engine.registerProvenance(

                    "OBJ-009",

                    "SOURCE"

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

                    "Knowledge Provenance Engine"

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
