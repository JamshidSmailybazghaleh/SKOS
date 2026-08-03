/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Authorization Engine
 * File      : knowledge-authorization-engine.test.js
 *
 * Build     : BUILD-000417
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeAuthorizationEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-authorization-engine"
    );



describe(

    "SKOS Knowledge Authorization Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeAuthorizationEngine();


            }

        );





        test(

            "Authorization engine should initialize",

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

            "Should create authorization rule",

            () => {


                const rule =

                    engine.addRule(

                        "RULE-001",

                        {

                            subject:

                                "USER-001",


                            resource:

                                "KNOWLEDGE-001",


                            actions:

                                [

                                    "READ",

                                    "WRITE"

                                ],


                            effect:

                                "ALLOW",


                            priority:

                                10

                        }

                    );



                expect(

                    rule.id

                ).toBe(

                    "RULE-001"

                );



                expect(

                    rule.effect

                ).toBe(

                    "ALLOW"

                );



                expect(

                    rule.enabled

                ).toBe(true);


            }

        );





        test(

            "Should reject invalid rule id",

            () => {


                expect(

                    () =>

                        engine.addRule(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should allow authorized action",

            () => {


                engine.addRule(

                    "RULE-002",

                    {

                        subject:

                            "USER-002",


                        resource:

                            "DOC-002",


                        actions:

                            [

                                "READ"

                            ],


                        effect:

                            "ALLOW"

                    }

                );



                const result =

                    engine.authorize(

                        "USER-002",

                        "DOC-002",

                        "READ"

                    );



                expect(

                    result.allowed

                ).toBe(true);


            }

        );





        test(

            "Should deny unauthorized action",

            () => {


                engine.addRule(

                    "RULE-003",

                    {

                        subject:

                            "USER-003",


                        resource:

                            "DOC-003",


                        actions:

                            [

                                "READ"

                            ],


                        effect:

                            "ALLOW"

                    }

                );



                const result =

                    engine.authorize(

                        "USER-003",

                        "DOC-003",

                        "DELETE"

                    );



                expect(

                    result.allowed

                ).toBe(false);


            }

        );





        test(

            "Should support wildcard subject",

            () => {


                engine.addRule(

                    "RULE-004",

                    {

                        subject:

                            "*",


                        resource:

                            "DOC-004",


                        actions:

                            [

                                "READ"

                            ],


                        effect:

                            "ALLOW"

                    }

                );



                const result =

                    engine.authorize(

                        "ANY-USER",

                        "DOC-004",

                        "READ"

                    );



                expect(

                    result.allowed

                ).toBe(true);


            }

        );





        test(

            "Should support wildcard resource",

            () => {


                engine.addRule(

                    "RULE-005",

                    {

                        subject:

                            "ADMIN",


                        resource:

                            "*",


                        actions:

                            [

                                "PUBLISH"

                            ],


                        effect:

                            "ALLOW"

                    }

                );



                const result =

                    engine.authorize(

                        "ADMIN",

                        "ANY-DOCUMENT",

                        "PUBLISH"

                    );



                expect(

                    result.allowed

                ).toBe(true);


            }

        );





        test(

            "Should respect rule priority",

            () => {


                engine.addRule(

                    "RULE-LOW",

                    {

                        subject:

                            "USER",


                        resource:

                            "DOC",


                        actions:

                            [

                                "DELETE"

                            ],


                        effect:

                            "ALLOW",


                        priority:

                            1

                    }

                );



                engine.addRule(

                    "RULE-HIGH",

                    {

                        subject:

                            "USER",


                        resource:

                            "DOC",


                        actions:

                            [

                                "DELETE"

                            ],


                        effect:

                            "DENY",


                        priority:

                            100

                    }

                );



                const result =

                    engine.authorize(

                        "USER",

                        "DOC",

                        "DELETE"

                    );



                expect(

                    result.allowed

                ).toBe(false);


            }

        );





        test(

            "Should disable authorization rule",

            () => {


                engine.addRule(

                    "RULE-006",

                    {

                        subject:

                            "USER",


                        resource:

                            "DOC",


                        actions:

                            [

                                "READ"

                            ],


                        effect:

                            "ALLOW"

                    }

                );



                engine.disableRule(

                    "RULE-006"

                );



                const result =

                    engine.authorize(

                        "USER",

                        "DOC",

                        "READ"

                    );



                expect(

                    result.allowed

                ).toBe(false);


            }

        );





        test(

            "Should enable authorization rule",

            () => {


                engine.addRule(

                    "RULE-007",

                    {

                        subject:

                            "USER",


                        resource:

                            "DOC",


                        actions:

                            [

                                "READ"

                            ],


                        effect:

                            "ALLOW"

                    }

                );



                engine.disableRule(

                    "RULE-007"

                );



                engine.enableRule(

                    "RULE-007"

                );



                const result =

                    engine.authorize(

                        "USER",

                        "DOC",

                        "READ"

                    );



                expect(

                    result.allowed

                ).toBe(true);


            }

        );





        test(

            "Should create role inheritance",

            () => {


                expect(

                    engine.addRoleInheritance(

                        "ADMIN",

                        "SUPER-ADMIN"

                    )

                ).toBe(true);



                expect(

                    engine.roleHierarchy

                        .get(

                            "SUPER-ADMIN"

                        )

                )

                .toContain(

                    "ADMIN"

                );


            }

        );





        test(

            "Should record authorization decisions",

            () => {


                engine.authorize(

                    "USER",

                    "DOC",

                    "READ"

                );



                expect(

                    engine.getDecisions().length

                ).toBe(1);


            }

        );





        test(

            "Should return authorization statistics",

            () => {


                engine.addRule(

                    "RULE-008",

                    {

                        subject:

                            "USER",


                        resource:

                            "DOC",


                        actions:

                            [

                                "READ"

                            ],


                        effect:

                            "ALLOW"

                    }

                );



                engine.authorize(

                    "USER",

                    "DOC",

                    "READ"

                );



                engine.authorize(

                    "USER",

                    "DOC",

                    "DELETE"

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.rules

                ).toBe(1);



                expect(

                    stats.decisions

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

                    "Knowledge Authorization Engine"

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
