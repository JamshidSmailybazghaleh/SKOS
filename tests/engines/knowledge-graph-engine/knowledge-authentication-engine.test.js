/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Authentication Engine
 * File      : knowledge-authentication-engine.test.js
 *
 * Build     : BUILD-000415
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeAuthenticationEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-authentication-engine"
    );



describe(

    "SKOS Knowledge Authentication Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeAuthenticationEngine();


            }

        );





        test(

            "Authentication engine should initialize",

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

            "Should register identity",

            () => {


                const identity =

                    engine.addIdentity(

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

            "Should register credential",

            () => {


                engine.addIdentity(

                    "USER-002",

                    {

                        name:

                            "Developer"

                    }

                );



                const credential =

                    engine.addCredential(

                        "USER-002",

                        {

                            secret:

                                "password123",


                            type:

                                "PASSWORD"

                        }

                    );



                expect(

                    credential.identityId

                ).toBe(

                    "USER-002"

                );



                expect(

                    credential.type

                ).toBe(

                    "PASSWORD"

                );


            }

        );





        test(

            "Should authenticate valid identity",

            () => {


                engine.addIdentity(

                    "USER-003",

                    {

                        name:

                            "AI Agent"

                    }

                );



                engine.addCredential(

                    "USER-003",

                    {

                        secret:

                            "secret-key"

                    }

                );



                const result =

                    engine.authenticate(

                        "USER-003",

                        "secret-key"

                    );



                expect(

                    result.authenticated

                ).toBe(true);



                expect(

                    result.session

                ).not.toBeNull();


            }

        );





        test(

            "Should reject invalid credential",

            () => {


                engine.addIdentity(

                    "USER-004",

                    {}

                );



                engine.addCredential(

                    "USER-004",

                    {

                        secret:

                            "correct"

                    }

                );



                const result =

                    engine.authenticate(

                        "USER-004",

                        "wrong"

                    );



                expect(

                    result.authenticated

                ).toBe(false);



                expect(

                    result.session

                ).toBeNull();


            }

        );





        test(

            "Should reject unknown identity",

            () => {


                const result =

                    engine.authenticate(

                        "UNKNOWN",

                        "secret"

                    );



                expect(

                    result.authenticated

                ).toBe(false);


            }

        );





        test(

            "Should create session after authentication",

            () => {


                engine.addIdentity(

                    "USER-005",

                    {}

                );



                engine.addCredential(

                    "USER-005",

                    {

                        secret:

                            "abc"

                    }

                );



                const result =

                    engine.authenticate(

                        "USER-005",

                        "abc"

                    );



                expect(

                    result.session.id

                ).toContain(

                    "SESSION-"

                );


            }

        );





        test(

            "Should validate active session",

            () => {


                engine.addIdentity(

                    "USER-006",

                    {}

                );



                engine.addCredential(

                    "USER-006",

                    {

                        secret:

                            "123"

                    }

                );



                const result =

                    engine.authenticate(

                        "USER-006",

                        "123"

                    );



                expect(

                    engine.validateSession(

                        result.session.id

                    )

                ).toBe(true);


            }

        );





        test(

            "Should revoke session",

            () => {


                engine.addIdentity(

                    "USER-007",

                    {}

                );



                engine.addCredential(

                    "USER-007",

                    {

                        secret:

                            "xyz"

                    }

                );



                const result =

                    engine.authenticate(

                        "USER-007",

                        "xyz"

                    );



                engine.revokeSession(

                    result.session.id

                );



                expect(

                    engine.validateSession(

                        result.session.id

                    )

                ).toBe(false);


            }

        );





        test(

            "Should disable identity",

            () => {


                engine.addIdentity(

                    "USER-008",

                    {}

                );



                const identity =

                    engine.disableIdentity(

                        "USER-008"

                    );



                expect(

                    identity.active

                ).toBe(false);


            }

        );





        test(

            "Should record authentication logs",

            () => {


                engine.addIdentity(

                    "USER-009",

                    {}

                );



                engine.addCredential(

                    "USER-009",

                    {

                        secret:

                            "key"

                    }

                );



                engine.authenticate(

                    "USER-009",

                    "key"

                );



                expect(

                    engine.getAuthenticationLogs().length

                ).toBe(1);


            }

        );





        test(

            "Should return authentication statistics",

            () => {


                engine.addIdentity(

                    "USER-010",

                    {}

                );



                engine.addCredential(

                    "USER-010",

                    {

                        secret:

                            "pass"

                    }

                );



                engine.authenticate(

                    "USER-010",

                    "pass"

                );



                engine.authenticate(

                    "USER-010",

                    "wrong"

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.identities

                ).toBe(1);



                expect(

                    stats.credentials

                ).toBe(1);



                expect(

                    stats.attempts

                ).toBe(2);



                expect(

                    stats.successful

                ).toBe(1);



                expect(

                    stats.failed

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

                    "Knowledge Authentication Engine"

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
