/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Reasoning Engine
 * File      : knowledge-reasoning-engine.test.js
 *
 * Build     : BUILD-000432
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeReasoningEngine =
    require(
        "../../src/engines/knowledge-reasoning-engine"
    );



describe(

    "SKOS Knowledge Reasoning Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeReasoningEngine();


            }

        );





        test(

            "Reasoning engine should initialize",

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

            "Should add reasoning rule",

            () => {


                const rule =

                    engine.addRule(

                        "RULE-001",

                        {

                            condition:

                                {

                                    type:

                                        "FACT"

                                },


                            conclusion:

                                "VALID",


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

            "Should add knowledge fact",

            () => {


                const fact =

                    engine.addFact(

                        "FACT-001",

                        {

                            subject:

                                "Earth",


                            predicate:

                                "has",


                            object:

                                "Atmosphere",


                            confidence:

                                90

                        }

                    );



                expect(

                    fact.id

                ).toBe(

                    "FACT-001"

                );



                expect(

                    fact.confidence

                ).toBe(90);


            }

        );





        test(

            "Should reject invalid fact id",

            () => {


                expect(

                    () =>

                        engine.addFact(

                            null,

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should execute reasoning with matching rule",

            () => {


                engine.addRule(

                    "RULE-002",

                    {

                        condition:

                            {

                                subject:

                                    "AI"

                            },


                        conclusion:

                            "INTELLIGENT"


                    }

                );



                const result =

                    engine.reason(

                        {

                            subject:

                                "AI"

                        }

                    );



                expect(

                    result.length

                ).toBe(1);



                expect(

                    result[0].conclusion

                ).toBe(

                    "INTELLIGENT"

                );


            }

        );





        test(

            "Should not execute disabled rules",

            () => {


                engine.addRule(

                    "RULE-003",

                    {

                        condition:

                            {

                                subject:

                                    "TEST"

                            },


                        conclusion:

                            "RESULT"

                    }

                );



                engine.disableRule(

                    "RULE-003"

                );



                const result =

                    engine.reason(

                        {

                            subject:

                                "TEST"

                        }

                    );



                expect(

                    result.length

                ).toBe(0);


            }

        );





        test(

            "Should enable disabled rule",

            () => {


                engine.addRule(

                    "RULE-004",

                    {

                        condition:

                            {

                                subject:

                                    "TEST"

                            },


                        conclusion:

                            "RESULT"

                    }

                );



                engine.disableRule(

                    "RULE-004"

                );



                engine.enableRule(

                    "RULE-004"

                );



                const result =

                    engine.reason(

                        {

                            subject:

                                "TEST"

                        }

                    );



                expect(

                    result.length

                ).toBe(1);


            }

        );





        test(

            "Should create reasoning trace",

            () => {


                engine.addRule(

                    "RULE-005",

                    {

                        condition:

                            {

                                subject:

                                    "DATA"

                            },


                        conclusion:

                            "KNOWLEDGE"

                    }

                );



                engine.reason(

                    {

                        subject:

                            "DATA"

                    }

                );



                expect(

                    engine.getReasoningTrace().length

                ).toBeGreaterThan(0);


            }

        );





        test(

            "Should retrieve rules",

            () => {


                engine.addRule(

                    "RULE-006",

                    {}

                );



                expect(

                    engine.getRules().length

                ).toBe(1);


            }

        );





        test(

            "Should retrieve facts",

            () => {


                engine.addFact(

                    "FACT-006",

                    {}

                );



                expect(

                    engine.getFacts().length

                ).toBe(1);


            }

        );





        test(

            "Should retrieve inferences",

            () => {


                engine.addRule(

                    "RULE-007",

                    {

                        condition:

                            {

                                value:

                                    1

                            },


                        conclusion:

                            "TRUE"

                    }

                );



                engine.reason(

                    {

                        value:

                            1

                    }

                );



                expect(

                    engine.getInferences().length

                ).toBe(1);


            }

        );





        test(

            "Should return reasoning statistics",

            () => {


                engine.addRule(

                    "RULE-008",

                    {}

                );


                engine.addFact(

                    "FACT-008",

                    {}

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.rules

                ).toBe(1);



                expect(

                    stats.facts

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

                    "Knowledge Reasoning Engine"

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
