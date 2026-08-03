/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Compliance Engine
 * File      : knowledge-compliance-engine.test.js
 *
 * Build     : BUILD-000407
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeComplianceEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-compliance-engine"
    );



describe(

    "SKOS Knowledge Compliance Engine Tests",

    () => {



        let engine;



        beforeEach(

            () => {


                engine =

                    new KnowledgeComplianceEngine();


            }

        );





        test(

            "Compliance engine should initialize",

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

            "Should create compliance rule",

            () => {


                const rule =

                    engine.addRule(

                        "RULE-001",

                        {

                            name:

                                "Required Metadata Rule",


                            category:

                                "METADATA",


                            condition:

                                {

                                    metadataValid:

                                        true

                                },


                            severity:

                                "HIGH"

                        }

                    );



                expect(

                    rule.id

                ).toBe(

                    "RULE-001"

                );



                expect(

                    rule.category

                ).toBe(

                    "METADATA"

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

            "Should retrieve compliance rule",

            () => {


                engine.addRule(

                    "RULE-002",

                    {

                        name:

                            "AI Safety Rule"

                    }

                );



                const result =

                    engine.getRule(

                        "RULE-002"

                    );



                expect(

                    result.name

                ).toBe(

                    "AI Safety Rule"

                );


            }

        );





        test(

            "Should remove compliance rule",

            () => {


                engine.addRule(

                    "RULE-003",

                    {}

                );



                expect(

                    engine.removeRule(

                        "RULE-003"

                    )

                ).toBe(true);



                expect(

                    engine.getRule(

                        "RULE-003"

                    )

                ).toBeNull();


            }

        );





        test(

            "Should pass compliant knowledge check",

            () => {


                engine.addRule(

                    "RULE-004",

                    {

                        condition:

                            {

                                approved:

                                    true

                            }

                    }

                );



                const report =

                    engine.check(

                        "OBJ-001",

                        {

                            approved:

                                true

                        }

                    );



                expect(

                    report.compliant

                ).toBe(true);



                expect(

                    report.violations.length

                ).toBe(0);


            }

        );





        test(

            "Should detect compliance violation",

            () => {


                engine.addRule(

                    "RULE-005",

                    {

                        name:

                            "Approval Required",


                        condition:

                            {

                                approved:

                                    true

                            },


                        severity:

                            "HIGH"

                    }

                );



                const report =

                    engine.check(

                        "OBJ-002",

                        {

                            approved:

                                false

                        }

                    );



                expect(

                    report.compliant

                ).toBe(false);



                expect(

                    report.violations.length

                ).toBe(1);



                expect(

                    report.violations[0].severity

                ).toBe(

                    "HIGH"

                );


            }

        );





        test(

            "Should reject invalid knowledge object id",

            () => {


                expect(

                    () =>

                        engine.check(

                            null

                        )

                ).toThrow();


            }

        );





        test(

            "Should evaluate empty rule condition as valid",

            () => {


                engine.addRule(

                    "RULE-006",

                    {

                        condition:

                            {}

                    }

                );



                const report =

                    engine.check(

                        "OBJ-003",

                        {}

                    );



                expect(

                    report.compliant

                ).toBe(true);


            }

        );





        test(

            "Should disable compliance rule",

            () => {


                engine.addRule(

                    "RULE-007",

                    {

                        condition:

                            {

                                valid:

                                    true

                            }

                    }

                );



                const rule =

                    engine.disableRule(

                        "RULE-007"

                    );



                expect(

                    rule.enabled

                ).toBe(false);


            }

        );





        test(

            "Should enable compliance rule",

            () => {


                engine.addRule(

                    "RULE-008",

                    {}

                );



                engine.disableRule(

                    "RULE-008"

                );



                const rule =

                    engine.enableRule(

                        "RULE-008"

                    );



                expect(

                    rule.enabled

                ).toBe(true);


            }

        );





        test(

            "Should return compliance reports",

            () => {


                engine.check(

                    "OBJ-004",

                    {}

                );



                expect(

                    engine.getReports().length

                ).toBe(1);


            }

        );





        test(

            "Should return rule registry",

            () => {


                engine.addRule(

                    "RULE-009",

                    {}

                );



                expect(

                    engine.getRegistry().length

                ).toBe(1);


            }

        );





        test(

            "Should return compliance statistics",

            () => {


                engine.check(

                    "OBJ-005",

                    {}

                );



                engine.addRule(

                    "RULE-010",

                    {

                        condition:

                            {

                                approved:

                                    true

                            }

                    }

                );



                engine.check(

                    "OBJ-006",

                    {

                        approved:

                            false

                    }

                );



                const stats =

                    engine.getStatistics();



                expect(

                    stats.rules

                ).toBe(1);



                expect(

                    stats.reports

                ).toBe(2);



                expect(

                    stats.violations

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

                    "Knowledge Compliance Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.rules

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
