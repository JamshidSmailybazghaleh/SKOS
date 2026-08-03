/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Governance Engine
 * File      : knowledge-governance-engine.test.js
 *
 * Build     : BUILD-000403
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

            "Should create governance policy",

            () => {


                const policy =

                    engine.addPolicy(

                        "POLICY-001",

                        {

                            name:

                                "Publication Policy",


                            rules:

                                {

                                    approvalRequired:

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



                expect(

                    policy.rules.approvalRequired

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

                            "AI Usage Policy"

                    }

                );



                const result =

                    engine.getPolicy(

                        "POLICY-002"

                    );



                expect(

                    result.name

                ).toBe(

                    "AI Usage Policy"

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

            "Should set knowledge permission",

            () => {


                const permission =

                    engine.setPermission(

                        "OBJ-001",

                        {

                            read:

                                true,


                            write:

                                true,


                            publish:

                                false,


                            owner:

                                "EDITORIAL-BOARD"

                        }

                    );



                expect(

                    permission.objectId

                ).toBe(

                    "OBJ-001"

                );



                expect(

                    permission.owner

                ).toBe(

                    "EDITORIAL-BOARD"

                );


            }

        );





        test(

            "Should check allowed permission",

            () => {


                engine.setPermission(

                    "OBJ-002",

                    {

                        read:

                            true,


                        publish:

                            true

                    }

                );



                expect(

                    engine.checkPermission(

                        "OBJ-002",

                        "publish"

                    )

                ).toBe(true);


            }

        );





        test(

            "Should reject unknown permission",

            () => {


                expect(

                    engine.checkPermission(

                        "UNKNOWN",

                        "publish"

                    )

                ).toBe(false);


            }

        );





        test(

            "Should update knowledge lifecycle",

            () => {


                const lifecycle =

                    engine.updateLifecycle(

                        "OBJ-003",

                        "PUBLISHED"

                    );



                expect(

                    lifecycle.objectId

                ).toBe(

                    "OBJ-003"

                );



                expect(

                    lifecycle.state

                ).toBe(

                    "PUBLISHED"

                );


            }

        );





        test(

            "Should retrieve lifecycle state",

            () => {


                engine.updateLifecycle(

                    "OBJ-004",

                    "REVIEW"

                );



                const result =

                    engine.getLifecycle(

                        "OBJ-004"

                    );



                expect(

                    result.state

                ).toBe(

                    "REVIEW"

                );


            }

        );





        test(

            "Should approve authorized governance action",

            () => {


                engine.setPermission(

                    "OBJ-005",

                    {

                        publish:

                            true

                    }

                );



                const decision =

                    engine.approveAction(

                        "OBJ-005",

                        "publish"

                    );



                expect(

                    decision.approved

                ).toBe(true);



                expect(

                    decision.action

                ).toBe(

                    "publish"

                );


            }

        );





        test(

            "Should reject unauthorized governance action",

            () => {


                engine.setPermission(

                    "OBJ-006",

                    {

                        publish:

                            false

                    }

                );



                const decision =

                    engine.approveAction(

                        "OBJ-006",

                        "publish"

                    );



                expect(

                    decision.approved

                ).toBe(false);


            }

        );





        test(

            "Should return governance registry",

            () => {


                engine.addPolicy(

                    "POLICY-004",

                    {}

                );


                engine.setPermission(

                    "OBJ-007",

                    {

                        read:

                            true

                    }

                );



                const registry =

                    engine.getRegistry();



                expect(

                    registry.policies.length

                ).toBe(1);



                expect(

                    registry.permissions.length

                ).toBe(1);


            }

        );





        test(

            "Should return governance statistics",

            () => {


                engine.addPolicy(

                    "POLICY-005",

                    {}

                );



                engine.setPermission(

                    "OBJ-008",

                    {

                        read:

                            true

                    }

                );



                engine.updateLifecycle(

                    "OBJ-008",

                    "ACTIVE"

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.policies

                ).toBe(1);



                expect(

                    stats.permissions

                ).toBe(1);



                expect(

                    stats.lifecycleRecords

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
