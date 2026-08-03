/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Identity Manager
 * File      : knowledge-identity-manager.test.js
 *
 * Build     : BUILD-000421
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeIdentityManager =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-identity-manager"
    );



describe(

    "SKOS Knowledge Identity Manager Tests",

    () => {



        let manager;



        beforeEach(

            () => {


                manager =

                    new KnowledgeIdentityManager();


            }

        );





        test(

            "Identity manager should initialize",

            () => {


                expect(

                    manager.initialize()

                ).toBe(true);



                expect(

                    manager.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should create user identity",

            () => {


                const identity =

                    manager.createIdentity(

                        "USER-001",

                        {

                            name:

                                "SKOS Administrator",


                            type:

                                "USER"

                        }

                    );



                expect(

                    identity.id

                ).toBe(

                    "USER-001"

                );



                expect(

                    identity.type

                ).toBe(

                    "USER"

                );



                expect(

                    identity.active

                ).toBe(true);


            }

        );





        test(

            "Should create AI agent identity",

            () => {


                const identity =

                    manager.createIdentity(

                        "AI-AGENT-001",

                        {

                            name:

                                "SKOS Reasoning Agent",


                            type:

                                "AI_AGENT"

                        }

                    );



                expect(

                    identity.type

                ).toBe(

                    "AI_AGENT"

                );


            }

        );





        test(

            "Should reject invalid identity id",

            () => {


                expect(

                    () =>

                        manager.createIdentity(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should verify identity",

            () => {


                manager.createIdentity(

                    "USER-002",

                    {}

                );



                const identity =

                    manager.verifyIdentity(

                        "USER-002"

                    );



                expect(

                    identity.verified

                ).toBe(true);


            }

        );





        test(

            "Should disable identity",

            () => {


                manager.createIdentity(

                    "USER-003",

                    {}

                );



                const identity =

                    manager.disableIdentity(

                        "USER-003"

                    );



                expect(

                    identity.active

                ).toBe(false);


            }

        );





        test(

            "Should enable disabled identity",

            () => {


                manager.createIdentity(

                    "USER-004",

                    {}

                );



                manager.disableIdentity(

                    "USER-004"

                );



                const identity =

                    manager.enableIdentity(

                        "USER-004"

                    );



                expect(

                    identity.active

                ).toBe(true);


            }

        );





        test(

            "Should assign role to identity",

            () => {


                manager.createIdentity(

                    "USER-005",

                    {}

                );



                const identity =

                    manager.addRole(

                        "USER-005",

                        "ADMIN"

                    );



                expect(

                    identity.roles

                ).toContain(

                    "ADMIN"

                );


            }

        );





        test(

            "Should remove role from identity",

            () => {


                manager.createIdentity(

                    "USER-006",

                    {

                        roles:

                            [

                                "EDITOR"

                            ]

                    }

                );



                const identity =

                    manager.removeRole(

                        "USER-006",

                        "EDITOR"

                    );



                expect(

                    identity.roles

                ).not.toContain(

                    "EDITOR"

                );


            }

        );





        test(

            "Should create identity group",

            () => {


                const group =

                    manager.createGroup(

                        "GROUP-DEVELOPERS",

                        [

                            "USER-007"

                        ]

                    );



                expect(

                    group.id

                ).toBe(

                    "GROUP-DEVELOPERS"

                );



                expect(

                    group.active

                ).toBe(true);


            }

        );





        test(

            "Should add identity to group",

            () => {


                manager.createGroup(

                    "GROUP-AI",

                    []

                );



                const group =

                    manager.addToGroup(

                        "GROUP-AI",

                        "AI-AGENT-002"

                    );



                expect(

                    group.members

                ).toContain(

                    "AI-AGENT-002"

                );


            }

        );





        test(

            "Should retrieve identity",

            () => {


                manager.createIdentity(

                    "USER-008",

                    {}

                );



                const identity =

                    manager.getIdentity(

                        "USER-008"

                    );



                expect(

                    identity.id

                ).toBe(

                    "USER-008"

                );


            }

        );





        test(

            "Should retrieve all identities",

            () => {


                manager.createIdentity(

                    "USER-009",

                    {}

                );



                manager.createIdentity(

                    "USER-010",

                    {}

                );



                expect(

                    manager.getIdentities().length

                ).toBe(2);


            }

        );





        test(

            "Should record identity history",

            () => {


                manager.createIdentity(

                    "USER-011",

                    {}

                );



                expect(

                    manager.getHistory().length

                ).toBeGreaterThan(0);


            }

        );





        test(

            "Should return identity statistics",

            () => {


                manager.createIdentity(

                    "USER-012",

                    {}

                );



                manager.verifyIdentity(

                    "USER-012"

                );



                const stats =

                    manager.getStatistics();



                expect(

                    stats.identities

                ).toBe(1);



                expect(

                    stats.verified

                ).toBe(1);



                expect(

                    stats.active

                ).toBe(1);


            }

        );





        test(

            "Should return engine status",

            () => {


                const status =

                    manager.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Knowledge Identity Manager"

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


                manager.initialize();



                expect(

                    manager.shutdown()

                ).toBe(true);



                expect(

                    manager.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
