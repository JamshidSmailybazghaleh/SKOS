/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Security Policy Engine
 * File      : knowledge-security-policy-engine.test.js
 *
 * Build     : BUILD-000423
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeSecurityPolicyEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-security-policy-engine"
    );



describe(

    "SKOS Knowledge Security Policy Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeSecurityPolicyEngine();


            }

        );





        test(

            "Security policy engine should initialize",

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

            "Should create security policy",

            () => {


                const policy =

                    engine.createPolicy(

                        "POLICY-001",

                        {

                            name:

                                "Knowledge Protection Policy",


                            type:

                                "SECURITY",


                            priority:

                                10,


                            rules:

                                []

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

                        engine.createPolicy(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should allow matching security policy",

            () => {


                engine.createPolicy(

                    "POLICY-002",

                    {

                        priority:

                            10,


                        rules:

                            [

                                {

                                    subject:

                                        "USER-001",


                                    resource:

                                        "DOC-001",


                                    action:

                                        "READ",


                                    effect:

                                        "ALLOW"

                                }

                            ]

                    }

                );



                const result =

                    engine.evaluate(

                        {

                            subject:

                                "USER-001",


                            resource:

                                "DOC-001",


                            action:

                                "READ"

                        }

                    );



                expect(

                    result.allowed

                ).toBe(true);



                expect(

                    result.policy

                ).toBe(

                    "POLICY-002"

                );


            }

        );





        test(

            "Should deny blocked security policy",

            () => {


                engine.createPolicy(

                    "POLICY-003",

                    {

                        rules:

                            [

                                {

                                    subject:

                                        "USER-002",


                                    resource:

                                        "SECRET-DOC",


                                    action:

                                        "READ",


                                    effect:

                                        "DENY"

                                }

                            ]

                    }

                );



                const result =

                    engine.evaluate(

                        {

                            subject:

                                "USER-002",


                            resource:

                                "SECRET-DOC",


                            action:

                                "READ"

                        }

                    );



                expect(

                    result.allowed

                ).toBe(false);



                expect(

                    result.decision

                ).toBe(

                    "DENY"

                );


            }

        );





        test(

            "Should support wildcard security rules",

            () => {


                engine.createPolicy(

                    "POLICY-004",

                    {

                        rules:

                            [

                                {

                                    subject:

                                        "*",


                                    resource:

                                        "*",


                                    action:

                                        "*",


                                    effect:

                                        "ALLOW"

                                }

                            ]

                    }

                );



                const result =

                    engine.evaluate(

                        {

                            subject:

                                "ANY",


                            resource:

                                "ANY-DOC",


                            action:

                                "WRITE"

                        }

                    );



                expect(

                    result.allowed

                ).toBe(true);


            }

        );





        test(

            "Should respect policy priority",

            () => {


                engine.createPolicy(

                    "POLICY-LOW",

                    {

                        priority:

                            1,


                        rules:

                            [

                                {

                                    subject:

                                        "USER",


                                    effect:

                                        "ALLOW"

                                }

                            ]

                    }

                );



                engine.createPolicy(

                    "POLICY-HIGH",

                    {

                        priority:

                            100,


                        rules:

                            [

                                {

                                    subject:

                                        "USER",


                                    effect:

                                        "DENY"

                                }

                            ]

                    }

                );



                const result =

                    engine.evaluate(

                        {

                            subject:

                                "USER"

                        }

                    );



                expect(

                    result.allowed

                ).toBe(false);


            }

        );





        test(

            "Should disable policy",

            () => {


                engine.createPolicy(

                    "POLICY-005",

                    {

                        rules:

                            [

                                {

                                    effect:

                                        "DENY"

                                }

                            ]

                    }

                );



                engine.disablePolicy(

                    "POLICY-005"

                );



                const result =

                    engine.evaluate(

                        {}

                    );



                expect(

                    result.allowed

                ).toBe(true);


            }

        );





        test(

            "Should enable policy",

            () => {


                engine.createPolicy(

                    "POLICY-006",

                    {

                        rules:

                            [

                                {

                                    effect:

                                        "DENY"

                                }

                            ]

                    }

                );



                engine.disablePolicy(

                    "POLICY-006"

                );



                engine.enablePolicy(

                    "POLICY-006"

                );



                const result =

                    engine.evaluate(

                        {}

                    );



                expect(

                    result.allowed

                ).toBe(false);


            }

        );





        test(

            "Should retrieve policy",

            () => {


                engine.createPolicy(

                    "POLICY-007",

                    {}

                );



                const policy =

                    engine.getPolicy(

                        "POLICY-007"

                    );



                expect(

                    policy.id

                ).toBe(

                    "POLICY-007"

                );


            }

        );





        test(

            "Should return all policies",

            () => {


                engine.createPolicy(

                    "POLICY-008",

                    {}

                );



                engine.createPolicy(

                    "POLICY-009",

                    {}

                );



                expect(

                    engine.getPolicies().length

                ).toBe(2);


            }

        );





        test(

            "Should record policy evaluations",

            () => {


                engine.evaluate(

                    {

                        subject:

                            "USER"

                    }

                );



                expect(

                    engine.getEvaluations().length

                ).toBe(1);


            }

        );





        test(

            "Should return policy statistics",

            () => {


                engine.createPolicy(

                    "POLICY-010",

                    {

                        rules:

                            [

                                {

                                    effect:

                                        "ALLOW"

                                }

                            ]

                    }

                );



                engine.evaluate(

                    {}

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.policies

                ).toBe(1);



                expect(

                    stats.evaluations

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

                    "Knowledge Security Policy Engine"

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
