/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Access Control Engine
 * File      : knowledge-access-control-engine.test.js
 *
 * Build     : BUILD-000413
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeAccessControlEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-access-control-engine"
    );



describe(

    "SKOS Knowledge Access Control Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeAccessControlEngine();


            }

        );





        test(

            "Access control engine should initialize",

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

            "Should create access policy",

            () => {


                const policy =

                    engine.addPolicy(

                        "ACCESS-POLICY-001",

                        {

                            resource:

                                "KNOWLEDGE-001",


                            allowedActions:

                                [

                                    "READ",

                                    "WRITE"

                                ],


                            subjects:

                                [

                                    "EDITOR"

                                ],


                            mode:

                                "RBAC"

                        }

                    );



                expect(

                    policy.id

                ).toBe(

                    "ACCESS-POLICY-001"

                );



                expect(

                    policy.mode

                ).toBe(

                    "RBAC"

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

            "Should add permission mapping",

            () => {


                const permission =

                    engine.addPermission(

                        "USER-001",

                        "DOC-001",

                        [

                            "READ",

                            "PUBLISH"

                        ]

                    );



                expect(

                    permission.subject

                ).toBe(

                    "USER-001"

                );



                expect(

                    permission.resource

                ).toBe(

                    "DOC-001"

                );



                expect(

                    permission.actions.length

                ).toBe(2);


            }

        );





        test(

            "Should allow authorized access",

            () => {


                engine.addPermission(

                    "USER-002",

                    "KNOWLEDGE-002",

                    [

                        "READ"

                    ]

                );



                const result =

                    engine.checkAccess(

                        "USER-002",

                        "KNOWLEDGE-002",

                        "READ"

                    );



                expect(

                    result.allowed

                ).toBe(true);



                expect(

                    result.action

                ).toBe(

                    "READ"

                );


            }

        );





        test(

            "Should deny unauthorized access",

            () => {


                engine.addPermission(

                    "USER-003",

                    "KNOWLEDGE-003",

                    [

                        "READ"

                    ]

                );



                const result =

                    engine.checkAccess(

                        "USER-003",

                        "KNOWLEDGE-003",

                        "DELETE"

                    );



                expect(

                    result.allowed

                ).toBe(false);


            }

        );





        test(

            "Should deny unknown subject",

            () => {


                const result =

                    engine.checkAccess(

                        "UNKNOWN",

                        "OBJECT-001",

                        "READ"

                    );



                expect(

                    result.allowed

                ).toBe(false);


            }

        );





        test(

            "Should disable access policy",

            () => {


                engine.addPolicy(

                    "ACCESS-POLICY-002",

                    {}

                );



                const policy =

                    engine.disablePolicy(

                        "ACCESS-POLICY-002"

                    );



                expect(

                    policy.enabled

                ).toBe(false);


            }

        );





        test(

            "Should enable access policy",

            () => {


                engine.addPolicy(

                    "ACCESS-POLICY-003",

                    {}

                );



                engine.disablePolicy(

                    "ACCESS-POLICY-003"

                );



                const policy =

                    engine.enablePolicy(

                        "ACCESS-POLICY-003"

                    );



                expect(

                    policy.enabled

                ).toBe(true);


            }

        );





        test(

            "Should record access logs",

            () => {


                engine.checkAccess(

                    "USER-004",

                    "OBJECT-004",

                    "READ"

                );



                expect(

                    engine.getAccessLogs().length

                ).toBe(1);


            }

        );





        test(

            "Should return access policies",

            () => {


                engine.addPolicy(

                    "ACCESS-POLICY-004",

                    {}

                );



                expect(

                    engine.getPolicies().length

                ).toBe(1);


            }

        );





        test(

            "Should return access statistics",

            () => {


                engine.addPermission(

                    "USER-005",

                    "OBJECT-005",

                    [

                        "READ"

                    ]

                );



                engine.checkAccess(

                    "USER-005",

                    "OBJECT-005",

                    "READ"

                );



                engine.checkAccess(

                    "USER-005",

                    "OBJECT-005",

                    "DELETE"

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.permissions

                ).toBe(1);



                expect(

                    stats.accessChecks

                ).toBe(2);



                expect(

                    stats.allowed

                ).toBe(1);



                expect(

                    stats.denied

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

                    "Knowledge Access Control Engine"

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
