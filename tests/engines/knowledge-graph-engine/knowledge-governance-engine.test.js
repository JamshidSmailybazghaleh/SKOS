/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Governance Engine
 * File      : knowledge-governance-engine.test.js
 *
 * Build     : BUILD-000430
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeGovernanceEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-governance-engine"
    );



describe(

    "SKOS Knowledge Governance Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeGovernanceEngine();


            }

        );





        test(

            "Governance engine should initialize",

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

            "Should register knowledge governance",

            () => {


                const record =

                    engine.registerGovernance(

                        "KNOWLEDGE-001",

                        {

                            owner:

                                "USER-001",


                            steward:

                                "TEAM-AI",


                            classification:

                                "PRIVATE"

                        }

                    );



                expect(

                    record.knowledgeId

                ).toBe(

                    "KNOWLEDGE-001"

                );



                expect(

                    record.status

                ).toBe(

                    "GOVERNED"

                );


            }

        );





        test(

            "Should reject invalid knowledge id",

            () => {


                expect(

                    () =>

                        engine.registerGovernance(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should assign knowledge owner",

            () => {


                engine.registerGovernance(

                    "KNOWLEDGE-002",

                    {}

                );



                const record =

                    engine.assignOwner(

                        "KNOWLEDGE-002",

                        "OWNER-001"

                    );



                expect(

                    record.owner

                ).toBe(

                    "OWNER-001"

                );


            }

        );





        test(

            "Should assign knowledge steward",

            () => {


                engine.registerGovernance(

                    "KNOWLEDGE-003",

                    {}

                );



                const record =

                    engine.assignSteward(

                        "KNOWLEDGE-003",

                        "STEWARD-001"

                    );



                expect(

                    record.steward

                ).toBe(

                    "STEWARD-001"

                );


            }

        );





        test(

            "Should update knowledge lifecycle",

            () => {


                engine.registerGovernance(

                    "KNOWLEDGE-004",

                    {}

                );



                const record =

                    engine.updateLifecycle(

                        "KNOWLEDGE-004",

                        "ARCHIVED"

                    );



                expect(

                    record.lifecycle

                ).toBe(

                    "ARCHIVED"

                );


            }

        );





        test(

            "Should create governance policy",

            () => {


                const policy =

                    engine.createPolicy(

                        "GOV-POLICY-001",

                        {

                            name:

                                "Knowledge Review Policy",


                            rules:

                                [

                                    "REVIEW_REQUIRED"

                                ]

                        }

                    );



                expect(

                    policy.id

                ).toBe(

                    "GOV-POLICY-001"

                );



                expect(

                    policy.enabled

                ).toBe(true);


            }

        );





        test(

            "Should reject invalid governance policy",

            () => {


                expect(

                    () =>

                        engine.createPolicy(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should record governance decision",

            () => {


                const decision =

                    engine.recordDecision(

                        {

                            id:

                                "DECISION-001",


                            knowledgeId:

                                "KNOWLEDGE-005",


                            actor:

                                "ADMIN",


                            action:

                                "APPROVE",


                            reason:

                                "Validated"

                        }

                    );



                expect(

                    decision.id

                ).toBe(

                    "DECISION-001"

                );



                expect(

                    decision.action

                ).toBe(

                    "APPROVE"

                );


            }

        );





        test(

            "Should retrieve governance record",

            () => {


                engine.registerGovernance(

                    "KNOWLEDGE-006",

                    {}

                );



                const record =

                    engine.getGovernance(

                        "KNOWLEDGE-006"

                    );



                expect(

                    record.knowledgeId

                ).toBe(

                    "KNOWLEDGE-006"

                );


            }

        );





        test(

            "Should retrieve governance records",

            () => {


                engine.registerGovernance(

                    "KNOWLEDGE-007",

                    {}

                );



                engine.registerGovernance(

                    "KNOWLEDGE-008",

                    {}

                );



                expect(

                    engine.getRecords().length

                ).toBe(2);


            }

        );





        test(

            "Should retrieve policies",

            () => {


                engine.createPolicy(

                    "POLICY-001",

                    {}

                );



                expect(

                    engine.getPolicies().length

                ).toBe(1);


            }

        );





        test(

            "Should retrieve decisions",

            () => {


                engine.recordDecision(

                    {

                        knowledgeId:

                            "KNOWLEDGE-009",


                        actor:

                            "SYSTEM",


                        action:

                            "UPDATE"

                    }

                );



                expect(

                    engine.getDecisions().length

                ).toBe(1);


            }

        );





        test(

            "Should return governance statistics",

            () => {


                engine.registerGovernance(

                    "KNOWLEDGE-010",

                    {}

                );



                engine.createPolicy(

                    "POLICY-010",

                    {}

                );



                engine.recordDecision(

                    {

                        knowledgeId:

                            "KNOWLEDGE-010"

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.governedObjects

                ).toBe(1);



                expect(

                    stats.policies

                ).toBe(1);



                expect(

                    stats.decisions

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

                    "Knowledge Governance Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );


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
