/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Policy Engine
 * File      : knowledge-policy-engine.test.js
 *
 * Build     : BUILD-000405
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgePolicyEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-policy-engine"
    );



describe(

    "SKOS Knowledge Policy Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgePolicyEngine();


            }

        );





        test(

            "Policy engine should initialize",

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

            "Should register knowledge policy",

            () => {


                const policy =

                    engine.addPolicy(

                        "POLICY-001",

                        {

                            name:

                                "Publication Approval Policy",


                            condition:

                                {

                                    assurance:

                                        "APPROVED"

                                },


                            action:

                                {

                                    publish:

                                        true

                                }

                        }

                    );



                expect(

                    policy.id

                ).toBe(

                    "POLICY-001"

                );



                expect(

                    policy.enabled

                ).toBe(true);


            }

        );





        test(

            "Should reject invalid policy id",

            () => {


                expect(

                    () =>

                        engine.addPolicy(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should retrieve policy",

            () => {


                engine.addPolicy(

                    "POLICY-002",

                    {

                        name:

                            "AI Access Policy"

                    }

                );



                const result =

                    engine.getPolicy(

                        "POLICY-002"

                    );



                expect(

                    result.name

                ).toBe(

                    "AI Access Policy"

                );


            }

        );





        test(

            "Should remove policy",

            () => {


                engine.addPolicy(

                    "POLICY-003",

                    {}

                );



                expect(

                    engine.removePolicy(

                        "POLICY-003"

                    )

                ).toBe(true);



                expect(

                    engine.getPolicy(

                        "POLICY-003"

                    )

                ).toBeNull();


            }

        );





        test(

            "Should execute matching policy",

            () => {


                engine.addPolicy(

                    "POLICY-004",

                    {

                        condition:

                            {

                                status:

                                    "VALID"

                            },


                        action:

                            {

                                approve:

                                    true

                            }

                    }

                );



                const result =

                    engine.execute(

                        "POLICY-004",

                        {

                            status:

                                "VALID"

                        }

                    );



                expect(

                    result.matched

                ).toBe(true);



                expect(

                    result.action.approve

                ).toBe(true);


            }

        );





        test(

            "Should not execute non matching policy",

            () => {


                engine.addPolicy(

                    "POLICY-005",

                    {

                        condition:

                            {

                                status:

                                    "VALID"

                            },


                        action:

                            {

                                approve:

                                    true

                            }

                    }

                );



                const result =

                    engine.execute(

                        "POLICY-005",

                        {

                            status:

                                "INVALID"

                        }

                    );



                expect(

                    result.matched

                ).toBe(false);



                expect(

                    result.action

                ).toBeNull();


            }

        );





        test(

            "Should reject execution of unknown policy",

            () => {


                expect(

                    () =>

                        engine.execute(

                            "UNKNOWN"

                        )

                ).toThrow();


            }

        );





        test(

            "Should evaluate empty condition as valid",

            () => {


                engine.addPolicy(

                    "POLICY-006",

                    {

                        action:

                            {

                                allow:

                                    true

                            }

                    }

                );



                const result =

                    engine.execute(

                        "POLICY-006",

                        {}

                    );



                expect(

                    result.matched

                ).toBe(true);


            }

        );





        test(

            "Should disable policy",

            () => {


                engine.addPolicy(

                    "POLICY-007",

                    {}

                );



                const policy =

                    engine.disablePolicy(

                        "POLICY-007"

                    );



                expect(

                    policy.enabled

                ).toBe(false);


            }

        );





        test(

            "Should enable policy",

            () => {


                engine.addPolicy(

                    "POLICY-008",

                    {}

                );



                engine.disablePolicy(

                    "POLICY-008"

                );



                const policy =

                    engine.enablePolicy(

                        "POLICY-008"

                    );



                expect(

                    policy.enabled

                ).toBe(true);


            }

        );





        test(

            "Should return execution history",

            () => {


                engine.addPolicy(

                    "POLICY-009",

                    {}

                );



                engine.execute(

                    "POLICY-009",

                    {}

                );



                expect(

                    engine.getExecutionHistory().length

                ).toBe(1);


            }

        );





        test(

            "Should return policy registry",

            () => {


                engine.addPolicy(

                    "POLICY-010",

                    {}

                );



                expect(

                    engine.getRegistry().length

                ).toBe(1);


            }

        );





        test(

            "Should return policy statistics",

            () => {


                engine.addPolicy(

                    "POLICY-011",

                    {}

                );



                engine.execute(

                    "POLICY-011",

                    {}

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.policies

                ).toBe(1);



                expect(

                    stats.executions

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

                    "Knowledge Policy Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.policies

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
