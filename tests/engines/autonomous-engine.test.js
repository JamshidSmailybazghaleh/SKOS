/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Autonomous Engine
 * File      : autonomous-engine.test.js
 *
 * Build     : BUILD-000431
 * Version   : 1.0.0
 *
 * Mission:
 * Validate autonomous agents, task lifecycle,
 * execution flow and decision management.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const AutonomousEngine =
    require(

        "../../src/engines/autonomous-engine"

    );



describe(

    "SKOS Autonomous Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new AutonomousEngine();


            }

        );





        test(

            "Autonomous engine should initialize",

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

            "Should register autonomous agent",

            () => {


                const agent =

                    engine.registerAgent(

                        "AGENT-001",

                        {

                            name:

                                "Knowledge Agent",


                            type:

                                "REASONING",


                            capabilities:

                                [

                                    "ANALYSIS",

                                    "DECISION"

                                ]

                        }

                    );



                expect(

                    agent.id

                ).toBe(

                    "AGENT-001"

                );



                expect(

                    agent.status

                ).toBe(

                    "ACTIVE"

                );



                expect(

                    agent.capabilities.length

                ).toBe(2);


            }

        );





        test(

            "Should reject invalid agent id",

            () => {


                expect(

                    () =>

                        engine.registerAgent(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should create autonomous task",

            () => {


                const task =

                    engine.createTask(

                        "TASK-001",

                        {

                            name:

                                "Analyze Knowledge",


                            objective:

                                "Evaluate data quality",


                            priority:

                                10,


                            agent:

                                "AGENT-001"

                        }

                    );



                expect(

                    task.id

                ).toBe(

                    "TASK-001"

                );



                expect(

                    task.status

                ).toBe(

                    "PENDING"

                );


            }

        );





        test(

            "Should reject invalid task id",

            () => {


                expect(

                    () =>

                        engine.createTask(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should execute autonomous task",

            () => {


                engine.createTask(

                    "TASK-002",

                    {

                        name:

                            "Execute Process",


                        agent:

                            "AGENT-002"

                    }

                );



                const execution =

                    engine.executeTask(

                        "TASK-002"

                    );



                expect(

                    execution.status

                ).toBe(

                    "SUCCESS"

                );



                expect(

                    execution.taskId

                ).toBe(

                    "TASK-002"

                );


            }

        );





        test(

            "Should fail execution for unknown task",

            () => {


                expect(

                    () =>

                        engine.executeTask(

                            "UNKNOWN"

                        )

                ).toThrow();


            }

        );





        test(

            "Should create autonomous decision",

            () => {


                const decision =

                    engine.makeDecision(

                        {

                            id:

                                "DECISION-001",


                            objective:

                                "Optimize knowledge flow",


                            action:

                                "RUN_ANALYSIS",


                            confidence:

                                95

                        }

                    );



                expect(

                    decision.id

                ).toBe(

                    "DECISION-001"

                );



                expect(

                    decision.confidence

                ).toBe(95);


            }

        );





        test(

            "Should retrieve agents",

            () => {


                engine.registerAgent(

                    "AGENT-003",

                    {}

                );



                expect(

                    engine.getAgents().length

                ).toBe(1);


            }

        );





        test(

            "Should retrieve tasks",

            () => {


                engine.createTask(

                    "TASK-003",

                    {}

                );



                expect(

                    engine.getTasks().length

                ).toBe(1);


            }

        );





        test(

            "Should retrieve executions",

            () => {


                engine.createTask(

                    "TASK-004",

                    {}

                );


                engine.executeTask(

                    "TASK-004"

                );



                expect(

                    engine.getExecutions().length

                ).toBe(1);


            }

        );





        test(

            "Should retrieve decisions",

            () => {


                engine.makeDecision(

                    {

                        action:

                            "UPDATE"

                    }

                );



                expect(

                    engine.getDecisions().length

                ).toBe(1);


            }

        );





        test(

            "Should return autonomous statistics",

            () => {


                engine.registerAgent(

                    "AGENT-004",

                    {}

                );



                engine.createTask(

                    "TASK-005",

                    {}

                );



                engine.executeTask(

                    "TASK-005"

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.agents

                ).toBe(1);



                expect(

                    stats.tasks

                ).toBe(1);



                expect(

                    stats.executions

                ).toBe(1);



                expect(

                    stats.completedTasks

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

                    "Autonomous Engine"

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
