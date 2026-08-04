/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Alert Manager Operational Tests
 * File      : alert-manager.test.js
 *
 * Build     : BUILD-000801.2
 * Version   : 2.0.0
 *
 * Mission:
 * Validate alert lifecycle,
 * rule management,
 * severity classification,
 * runtime execution,
 * notification readiness.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const AlertManager =
    require("../../src/monitoring/alert-manager");



describe(
    "SKOS Alert Manager Operational Tests",
    () => {


        let manager;



        beforeEach(() => {


            manager =
                new AlertManager();


        });





        test(
            "Alert manager should initialize",
            () => {


                expect(
                    manager.initialize()
                )
                .toBe(true);



                expect(
                    manager.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Should register alert rule",
            () => {


                const rule =
                    manager.registerRule(

                        "RULE-001",

                        {

                            severity:
                                "CRITICAL",

                            condition:
                                "CPU > 90"

                        }

                    );



                expect(
                    rule.id
                )
                .toBe(
                    "RULE-001"
                );



                expect(
                    manager.getRules()
                    .size
                )
                .toBe(1);


            }
        );





        test(
            "Should reject invalid rule id",
            () => {


                expect(

                    () =>
                        manager.registerRule(
                            null,
                            {}
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should create alert",
            () => {


                const alert =
                    manager.createAlert(

                        "ERROR",

                        "Engine failure",

                        {

                            component:
                                "knowledge-engine"

                        }

                    );



                expect(
                    alert.severity
                )
                .toBe(
                    "ERROR"
                );



                expect(
                    alert.status
                )
                .toBe(
                    "OPEN"
                );



                expect(
                    alert.id
                )
                .toMatch(
                    /^ALERT-/
                );


            }
        );





        test(
            "Should retrieve open alerts",
            () => {


                manager.createAlert(

                    "WARNING",

                    "Memory usage high"

                );



                expect(

                    manager
                    .getOpenAlerts()
                    .length

                )
                .toBe(1);


            }
        );





        test(
            "Should retrieve alerts by severity",
            () => {


                manager.createAlert(

                    "CRITICAL",

                    "Database unavailable"

                );



                manager.createAlert(

                    "INFO",

                    "System started"

                );



                expect(

                    manager
                    .getAlertsBySeverity(
                        "CRITICAL"
                    )
                    .length

                )
                .toBe(1);


            }
        );





        test(
            "Should evaluate alert rule",
            () => {


                manager.registerRule(

                    "RULE-002",

                    {

                        severity:
                            "CRITICAL"

                    }

                );



                const result =
                    manager.evaluateRule(

                        "RULE-002",

                        true

                    );



                expect(
                    result.triggered
                )
                .toBe(true);



                expect(
                    result.severity
                )
                .toBe(
                    "CRITICAL"
                );


            }
        );





        test(
            "Should acknowledge alert",
            () => {


                const alert =
                    manager.createAlert(

                        "WARNING",

                        "Latency increased"

                    );



                const result =
                    manager.acknowledgeAlert(

                        alert.id

                    );



                expect(
                    result.status
                )
                .toBe(
                    "ACKNOWLEDGED"
                );



            }
        );





        test(
            "Should resolve alert",
            () => {


                const alert =
                    manager.createAlert(

                        "ERROR",

                        "Service stopped"

                    );



                const result =
                    manager.resolveAlert(

                        alert.id

                    );



                expect(
                    result.status
                )
                .toBe(
                    "RESOLVED"
                );



                expect(
                    result.resolvedAt
                )
                .not
                .toBeNull();


            }
        );





        test(
            "Should reject unknown alert resolution",
            () => {


                expect(

                    () =>
                        manager.resolveAlert(
                            "UNKNOWN"
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should execute runtime alert cycle",
            () => {


                manager.initialize();



                const result =
                    manager.execute(

                        {

                            component:
                                "Health Monitor",

                            state:
                                "FAILED"

                        }

                    );



                expect(
                    result.totalAlerts
                )
                .toBe(1);



                expect(
                    manager.status
                )
                .toBe(
                    "READY"
                );


            }
        );





        test(
            "Should record notification readiness",
            () => {


                const alert =
                    manager.createAlert(

                        "CRITICAL",

                        "System failure"

                    );



                const notification =
                    manager.sendNotification(

                        alert,

                        "MISSION_CONTROL"

                    );



                expect(
                    notification.status
                )
                .toBe(
                    "SENT"
                );



                expect(
                    manager.getNotifications()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should record alert history",
            () => {


                manager.createAlert(

                    "INFO",

                    "Startup"

                );



                expect(

                    manager.getHistory()
                    .length

                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return operational statistics",
            () => {


                manager.createAlert(

                    "WARNING",

                    "Test warning"

                );



                manager.registerRule(

                    "RULE-003",

                    {}

                );



                const stats =
                    manager.getStatistics();



                expect(
                    stats.totalAlerts
                )
                .toBe(1);



                expect(
                    stats.rules
                )
                .toBe(1);



                expect(
                    stats.events
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return manager status",
            () => {


                const status =
                    manager.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Alert Manager"
                );



                expect(
                    status.version
                )
                .toBe(
                    "2.0.0"
                );


            }
        );





        test(
            "Should shutdown correctly",
            () => {


                manager.initialize();



                expect(
                    manager.shutdown()
                )
                .toBe(true);



                expect(
                    manager.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
