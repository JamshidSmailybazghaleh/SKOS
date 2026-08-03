/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Permission Manager
 * File      : knowledge-permission-manager.test.js
 *
 * Build     : BUILD-000419
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgePermissionManager =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-permission-manager"
    );



describe(

    "SKOS Knowledge Permission Manager Tests",

    () => {



        let manager;



        beforeEach(

            () => {


                manager =

                    new KnowledgePermissionManager();


            }

        );





        test(

            "Permission manager should initialize",

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

            "Should create permission",

            () => {


                const permission =

                    manager.createPermission(

                        "PERMISSION-001",

                        {

                            subject:

                                "USER-001",


                            resource:

                                "KNOWLEDGE-001",


                            actions:

                                [

                                    "READ",

                                    "WRITE"

                                ]

                        }

                    );



                expect(

                    permission.id

                ).toBe(

                    "PERMISSION-001"

                );



                expect(

                    permission.active

                ).toBe(true);



                expect(

                    permission.actions.length

                ).toBe(2);


            }

        );





        test(

            "Should reject invalid permission id",

            () => {


                expect(

                    () =>

                        manager.createPermission(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should create permission group",

            () => {


                const group =

                    manager.createPermissionGroup(

                        "GROUP-ADMIN",

                        [

                            "READ",

                            "WRITE",

                            "PUBLISH"

                        ]

                    );



                expect(

                    group.id

                ).toBe(

                    "GROUP-ADMIN"

                );



                expect(

                    group.permissions.length

                ).toBe(3);



                expect(

                    group.active

                ).toBe(true);


            }

        );





        test(

            "Should assign permission to subject",

            () => {


                manager.createPermission(

                    "PERMISSION-002",

                    {

                        resource:

                            "DOC-002",

                        actions:

                            [

                                "READ"

                            ]

                    }

                );



                const permission =

                    manager.assignPermission(

                        "PERMISSION-002",

                        "AI-AGENT-001"

                    );



                expect(

                    permission.subject

                ).toBe(

                    "AI-AGENT-001"

                );


            }

        );





        test(

            "Should check valid permission",

            () => {


                manager.createPermission(

                    "PERMISSION-003",

                    {

                        subject:

                            "USER-003",


                        resource:

                            "DOC-003",


                        actions:

                            [

                                "READ"

                            ]

                    }

                );



                expect(

                    manager.checkPermission(

                        "USER-003",

                        "DOC-003",

                        "READ"

                    )

                ).toBe(true);


            }

        );





        test(

            "Should reject invalid permission action",

            () => {


                manager.createPermission(

                    "PERMISSION-004",

                    {

                        subject:

                            "USER-004",


                        resource:

                            "DOC-004",


                        actions:

                            [

                                "READ"

                            ]

                    }

                );



                expect(

                    manager.checkPermission(

                        "USER-004",

                        "DOC-004",

                        "DELETE"

                    )

                ).toBe(false);


            }

        );





        test(

            "Should revoke permission",

            () => {


                manager.createPermission(

                    "PERMISSION-005",

                    {

                        subject:

                            "USER-005"

                    }

                );



                const permission =

                    manager.revokePermission(

                        "PERMISSION-005"

                    );



                expect(

                    permission.active

                ).toBe(false);


            }

        );





        test(

            "Should restore permission",

            () => {


                manager.createPermission(

                    "PERMISSION-006",

                    {

                        subject:

                            "USER-006"

                    }

                );



                manager.revokePermission(

                    "PERMISSION-006"

                );



                const permission =

                    manager.restorePermission(

                        "PERMISSION-006"

                    );



                expect(

                    permission.active

                ).toBe(true);


            }

        );





        test(

            "Should return permission by id",

            () => {


                manager.createPermission(

                    "PERMISSION-007",

                    {}

                );



                const result =

                    manager.getPermission(

                        "PERMISSION-007"

                    );



                expect(

                    result.id

                ).toBe(

                    "PERMISSION-007"

                );


            }

        );





        test(

            "Should return all permissions",

            () => {


                manager.createPermission(

                    "PERMISSION-008",

                    {}

                );



                manager.createPermission(

                    "PERMISSION-009",

                    {}

                );



                expect(

                    manager.getPermissions().length

                ).toBe(2);


            }

        );





        test(

            "Should record permission history",

            () => {


                manager.createPermission(

                    "PERMISSION-010",

                    {}

                );



                expect(

                    manager.getHistory().length

                ).toBeGreaterThan(0);


            }

        );





        test(

            "Should return permission statistics",

            () => {


                manager.createPermission(

                    "PERMISSION-011",

                    {}

                );



                manager.createPermission(

                    "PERMISSION-012",

                    {}

                );



                manager.revokePermission(

                    "PERMISSION-012"

                );



                const stats =

                    manager.getStatistics();



                expect(

                    stats.permissions

                ).toBe(2);



                expect(

                    stats.activePermissions

                ).toBe(1);



                expect(

                    stats.historyEvents

                ).toBeGreaterThan(0);


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

                    "Knowledge Permission Manager"

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
