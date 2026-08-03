/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Audit Engine
 * File      : knowledge-audit-engine.test.js
 *
 * Build     : BUILD-000409
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeAuditEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-audit-engine"
    );



describe(

    "SKOS Knowledge Audit Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeAuditEngine();


            }

        );





        test(

            "Audit engine should initialize",

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

            "Should create audit record",

            () => {


                const log =

                    engine.record(

                        {

                            objectId:

                                "OBJ-001",


                            actor:

                                "USER-001",


                            action:

                                "CREATE",


                            source:

                                "SKOS",


                            result:

                                "SUCCESS"

                        }

                    );



                expect(

                    log.objectId

                ).toBe(

                    "OBJ-001"

                );



                expect(

                    log.actor

                ).toBe(

                    "USER-001"

                );



                expect(

                    log.action

                ).toBe(

                    "CREATE"

                );


            }

        );





        test(

            "Should reject empty audit event",

            () => {


                expect(

                    () =>

                        engine.record()

                ).toThrow();


            }

        );





        test(

            "Should generate audit identifier",

            () => {


                const log =

                    engine.record(

                        {

                            action:

                                "UPDATE"

                        }

                    );



                expect(

                    log.id

                ).toContain(

                    "AUDIT-"

                );


            }

        );





        test(

            "Should find audit records by object",

            () => {


                engine.record(

                    {

                        objectId:

                            "OBJ-002",


                        action:

                            "CREATE"

                    }

                );



                engine.record(

                    {

                        objectId:

                            "OBJ-002",


                        action:

                            "UPDATE"

                    }

                );



                const result =

                    engine.getByObject(

                        "OBJ-002"

                    );



                expect(

                    result.length

                ).toBe(2);


            }

        );





        test(

            "Should find audit records by actor",

            () => {


                engine.record(

                    {

                        actor:

                            "AI-AGENT-001"

                    }

                );



                const result =

                    engine.getByActor(

                        "AI-AGENT-001"

                    );



                expect(

                    result.length

                ).toBe(1);


            }

        );





        test(

            "Should find audit records by action",

            () => {


                engine.record(

                    {

                        action:

                            "PUBLISH"

                    }

                );



                const result =

                    engine.getByAction(

                        "PUBLISH"

                    );



                expect(

                    result.length

                ).toBe(1);


            }

        );





        test(

            "Should return latest audit record",

            () => {


                engine.record(

                    {

                        action:

                            "CREATE"

                    }

                );



                const latest =

                    engine.getLatest();



                expect(

                    latest.action

                ).toBe(

                    "CREATE"

                );


            }

        );





        test(

            "Should return null when history is empty",

            () => {


                expect(

                    engine.getLatest()

                ).toBeNull();


            }

        );





        test(

            "Should return full audit history",

            () => {


                engine.record(

                    {

                        objectId:

                            "OBJ-003"

                    }

                );



                expect(

                    engine.getHistory().length

                ).toBe(1);


            }

        );





        test(

            "Should clear audit history",

            () => {


                engine.record(

                    {

                        action:

                            "DELETE"

                    }

                );



                expect(

                    engine.clearHistory()

                ).toBe(true);



                expect(

                    engine.getHistory().length

                ).toBe(0);


            }

        );





        test(

            "Should return audit statistics",

            () => {


                engine.record(

                    {

                        actor:

                            "USER-A",


                        action:

                            "CREATE"

                    }

                );



                engine.record(

                    {

                        actor:

                            "USER-B",


                        action:

                            "UPDATE"

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.total

                ).toBe(2);



                expect(

                    stats.actors

                ).toBe(2);



                expect(

                    stats.actions

                ).toBe(2);


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

                    "Knowledge Audit Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.records

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
