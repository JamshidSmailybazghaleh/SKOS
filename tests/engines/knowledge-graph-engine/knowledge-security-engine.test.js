/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Security Engine
 * File      : knowledge-security-engine.test.js
 *
 * Build     : BUILD-000411
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeSecurityEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-security-engine"
    );



describe(

    "SKOS Knowledge Security Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeSecurityEngine();


            }

        );





        test(

            "Security engine should initialize",

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

            "Should create security role",

            () => {


                const role =

                    engine.addRole(

                        "ROLE-ADMIN",

                        [

                            "READ",

                            "WRITE",

                            "PUBLISH"

                        ]

                    );



                expect(

                    role.id

                ).toBe(

                    "ROLE-ADMIN"

                );



                expect(

                    role.permissions.length

                ).toBe(3);


            }

        );





        test(

            "Should reject invalid role id",

            () => {


                expect(

                    () =>

                        engine.addRole(

                            null,

                            []

                        )

                ).toThrow();


            }

        );





        test(

            "Should register identity",

            () => {


                const identity =

                    engine.addIdentity(

                        "USER-001",

                        {

                            name:

                                "SKOS Administrator",


                            role:

                                "ROLE-ADMIN"

                        }

                    );



                expect(

                    identity.id

                ).toBe(

                    "USER-001"

                );



                expect(

                    identity.role

                ).toBe(

                    "ROLE-ADMIN"

                );



                expect(

                    identity.active

                ).toBe(true);


            }

        );





        test(

            "Should reject invalid identity id",

            () => {


                expect(

                    () =>

                        engine.addIdentity(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should create object access rule",

            () => {


                const rule =

                    engine.setAccessRule(

                        "KNOWLEDGE-001",

                        {

                            allowedRoles:

                                [

                                    "ROLE-ADMIN"

                                ],


                            encryption:

                                true,


                            classification:

                                "CONFIDENTIAL"

                        }

                    );



                expect(

                    rule.objectId

                ).toBe(

                    "KNOWLEDGE-001"

                );



                expect(

                    rule.encryption

                ).toBe(true);



                expect(

                    rule.classification

                ).toBe(

                    "CONFIDENTIAL"

                );


            }

        );





        test(

            "Should authorize valid identity",

            () => {


                engine.addRole(

                    "ROLE-EDITOR",

                    [

                        "WRITE"

                    ]

                );



                engine.addIdentity(

                    "USER-002",

                    {

                        role:

                            "ROLE-EDITOR"

                    }

                );



                engine.setAccessRule(

                    "OBJ-002",

                    {

                        allowedRoles:

                            [

                                "ROLE-EDITOR"

                            ]

                    }

                );



                const result =

                    engine.authorize(

                        "USER-002",

                        "OBJ-002",

                        "WRITE"

                    );



                expect(

                    result.approved

                ).toBe(true);



                expect(

                    result.action

                ).toBe(

                    "WRITE"

                );


            }

        );





        test(

            "Should reject unauthorized identity",

            () => {


                engine.addIdentity(

                    "USER-003",

                    {

                        role:

                            "ROLE-VIEWER"

                    }

                );



                engine.setAccessRule(

                    "OBJ-003",

                    {

                        allowedRoles:

                            [

                                "ROLE-ADMIN"

                            ]

                    }

                );



                const result =

                    engine.authorize(

                        "USER-003",

                        "OBJ-003",

                        "DELETE"

                    );



                expect(

                    result.approved

                ).toBe(false);


            }

        );





        test(

            "Should disable identity",

            () => {


                engine.addIdentity(

                    "USER-004",

                    {

                        role:

                            "ROLE-USER"

                    }

                );



                const identity =

                    engine.disableIdentity(

                        "USER-004"

                    );



                expect(

                    identity.active

                ).toBe(false);


            }

        );





        test(

            "Should enable identity",

            () => {


                engine.addIdentity(

                    "USER-005",

                    {

                        role:

                            "ROLE-USER"

                    }

                );



                engine.disableIdentity(

                    "USER-005"

                );



                const identity =

                    engine.enableIdentity(

                        "USER-005"

                    );



                expect(

                    identity.active

                ).toBe(true);


            }

        );





        test(

            "Should record security events",

            () => {


                engine.addIdentity(

                    "USER-006",

                    {

                        role:

                            "ROLE-A"

                    }

                );



                engine.setAccessRule(

                    "OBJ-006",

                    {

                        allowedRoles:

                            []

                    }

                );



                engine.authorize(

                    "USER-006",

                    "OBJ-006",

                    "READ"

                );



                expect(

                    engine.getSecurityEvents().length

                ).toBe(1);


            }

        );





        test(

            "Should return security statistics",

            () => {


                engine.addRole(

                    "ROLE-A",

                    []

                );



                engine.addIdentity(

                    "USER-007",

                    {

                        role:

                            "ROLE-A"

                    }

                );



                engine.setAccessRule(

                    "OBJ-007",

                    {

                        allowedRoles:

                            [

                                "ROLE-A"

                            ]

                    }

                );



                engine.authorize(

                    "USER-007",

                    "OBJ-007",

                    "READ"

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.roles

                ).toBe(1);



                expect(

                    stats.identities

                ).toBe(1);



                expect(

                    stats.accessRules

                ).toBe(1);



                expect(

                    stats.events

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

                    "Knowledge Security Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.roles

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
