/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Alert Manager
 * File      : alert-manager.test.js
 *
 * Build     : BUILD-000443
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

const AlertManager =
    require("../../src/monitoring/alert-manager");


describe(
    "SKOS Alert Manager Tests",
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
                ).toBe(true);


                expect(
                    manager.status
                ).toBe(
                    "INITIALIZED"
                );

            }
        );



        test(
            "Should register alert rule",
            () => {

                expect(
                    manager.registerRule(
                        "RULE-001",
                        {
                            severity:
                                "CRITICAL",

                            description:
                                "CPU overload"
                        }
                    )
                ).toBe(true);



                expect(
                    manager.getRules().length
                ).toBe(1);

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
                ).toThrow();

            }
        );



        test(
            "Should create alert",
            () => {

                const alert =
                    manager.createAlert(
                        "ERROR",
                        "Engine failure",
                        "knowledge-engine"
                    );


                expect(
                    alert.severity
                ).toBe(
                    "ERROR"
                );


                expect(
                    alert.status
                ).toBe(
                    "OPEN"
                );


                expect(
                    manager.getAlerts().length
                ).toBe(1);

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
                    manager.getOpenAlerts().length
                ).toBe(1);

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
                ).toBe(1);

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
                ).toBe(
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
                ).toBe(
                    "RESOLVED"
                );


                expect(
                    result.resolvedAt
                ).not.toBeNull();

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
                ).toThrow();

            }
        );



        test(
            "Should send notification",
            () => {

                const alert =
                    manager.createAlert(
                        "CRITICAL",
                        "System failure"
                    );


                const notification =
                    manager.sendNotification(
                        alert,
                        "DASHBOARD"
                    );


                expect(
                    notification.status
                ).toBe(
                    "SENT"
                );


                expect(
                    manager.getNotifications().length
                ).toBe(1);

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
                    manager.getHistory().length
                )
                .toBeGreaterThan(0);

            }
        );



        test(
            "Should return statistics",
            () => {

                manager.createAlert(
                    "WARNING",
                    "Test warning"
                );


                manager.registerRule(
                    "RULE-002",
                    {}
                );


                const stats =
                    manager.getStatistics();



                expect(
                    stats.totalAlerts
                ).toBe(1);



                expect(
                    stats.rules
                ).toBe(1);

            }
        );



        test(
            "Should return manager status",
            () => {

                const status =
                    manager.getStatus();


                expect(
                    status.name
                ).toBe(
                    "Alert Manager"
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
