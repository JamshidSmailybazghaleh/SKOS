/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Security Manager
 * File      : graph-security-manager.test.js
 *
 * Build     : BUILD-000371
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphSecurityManager =
    require(
        "../../src/engines/knowledge-graph-engine/graph-security-manager"
    );



describe(

    "SKOS Graph Security Manager Tests",

    () => {



        let security;



        beforeEach(

            () => {


                security =

                    new GraphSecurityManager();


            }

        );





        test(

            "Security manager should initialize",

            () => {


                expect(

                    security.initialize()

                ).toBe(true);



                expect(

                    security.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should grant permission",

            () => {


                security.grantPermission(

                    "user01",

                    "node01",

                    "READ"

                );



                expect(

                    security.checkAccess(

                        "user01",

                        "node01",

                        "READ"

                    )

                ).toBe(true);


            }

        );





        test(

            "Should deny unauthorized access",

            () => {


                expect(

                    security.checkAccess(

                        "user01",

                        "node01",

                        "DELETE"

                    )

                ).toBe(false);


            }

        );





        test(

            "Should revoke permission",

            () => {


                security.grantPermission(

                    "user01",

                    "node01",

                    "WRITE"

                );



                expect(

                    security.revokePermission(

                        "user01",

                        "node01",

                        "WRITE"

                    )

                ).toBe(true);



                expect(

                    security.checkAccess(

                        "user01",

                        "node01",

                        "WRITE"

                    )

                ).toBe(false);


            }

        );





        test(

            "Should protect knowledge node",

            () => {


                expect(

                    security.protectNode(

                        "knowledge-object-001",

                        "admin"

                    )

                ).toBe(true);



                expect(

                    security.checkAccess(

                        "admin",

                        "knowledge-object-001",

                        "OWNER"

                    )

                ).toBe(true);


            }

        );





        test(

            "Should create audit log",

            () => {


                security.grantPermission(

                    "user01",

                    "node01",

                    "READ"

                );



                const logs =

                    security.getAuditLog();



                expect(

                    logs.length

                ).toBe(1);



                expect(

                    logs[0].event

                ).toBe(

                    "PERMISSION_GRANTED"

                );


            }

        );





        test(

            "Should return security status",

            () => {


                const status =

                    security.getSecurityStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Security Manager"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );


                expect(

                    status.permissionRules

                ).toBe(0);


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                security.initialize();



                expect(

                    security.shutdown()

                ).toBe(true);



                expect(

                    security.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
