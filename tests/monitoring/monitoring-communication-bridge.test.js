/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Monitoring Communication Bridge
 * File      : monitoring-communication-bridge.test.js
 *
 * Build     : BUILD-000802.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate monitoring event communication,
 * message lifecycle and bridge readiness.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const MonitoringCommunicationBridge =
    require("../../src/monitoring/monitoring-communication-bridge");



describe(
    "SKOS Monitoring Communication Bridge Tests",
    () => {


        let bridge;



        beforeEach(() => {


            bridge =
                new MonitoringCommunicationBridge();


        });





        test(
            "Bridge should initialize",
            () => {


                expect(
                    bridge.initialize()
                )
                .toBe(true);



                expect(
                    bridge.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Bridge should activate after initialization",
            () => {


                bridge.initialize();



                expect(
                    bridge.activate()
                )
                .toBe(true);



                expect(
                    bridge.status
                )
                .toBe(
                    "ACTIVE"
                );


            }
        );





        test(
            "Should reject activation before initialization",
            () => {


                expect(

                    () =>
                        bridge.activate()

                )
                .toThrow();


            }
        );





        test(
            "Should create communication message",
            () => {


                const message =
                    bridge.createMessage(

                        "Alert Manager",

                        "Communication Engine",

                        "ALERT_NOTIFICATION",

                        {

                            severity:
                                "CRITICAL"

                        }

                    );



                expect(
                    message.id
                )
                .toMatch(
                    /^MSG-/
                );



                expect(
                    message.type
                )
                .toBe(
                    "ALERT_NOTIFICATION"
                );



                expect(
                    bridge.getMessages()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should receive alert from Alert Manager",
            () => {


                const alert = {


                    id:
                        "ALERT-000001",


                    severity:
                        "CRITICAL",


                    message:
                        "System failure"


                };



                const message =
                    bridge.receiveAlert(
                        alert
                    );



                expect(
                    message.source
                )
                .toBe(
                    "Alert Manager"
                );



                expect(
                    message.target
                )
                .toBe(
                    "Communication Engine"
                );



                expect(
                    message.type
                )
                .toBe(
                    "ALERT_NOTIFICATION"
                );


            }
        );





        test(
            "Should reject empty alert",
            () => {


                expect(

                    () =>
                        bridge.receiveAlert(
                            null
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should send message successfully",
            () => {


                const message =
                    bridge.createMessage(

                        "Health Monitor",

                        "Mission Control",

                        "HEALTH_REPORT"

                    );



                const result =
                    bridge.sendMessage(

                        message.id

                    );



                expect(
                    result.status
                )
                .toBe(
                    "SENT"
                );



                expect(
                    result.sentAt
                )
                .not
                .toBeNull();


            }
        );





        test(
            "Should fail message correctly",
            () => {


                const message =
                    bridge.createMessage(

                        "Alert Manager",

                        "Communication Engine",

                        "ALERT_NOTIFICATION"

                    );



                const result =
                    bridge.failMessage(

                        message.id,

                        "Connection unavailable"

                    );



                expect(
                    result.status
                )
                .toBe(
                    "FAILED"
                );



                expect(
                    result.failureReason
                )
                .toBe(
                    "Connection unavailable"
                );


            }
        );





        test(
            "Should reject unknown message send",
            () => {


                expect(

                    () =>
                        bridge.sendMessage(
                            "UNKNOWN"
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should track sent messages",
            () => {


                const message =
                    bridge.createMessage(

                        "Alert Manager",

                        "Mission Control",

                        "ALERT"

                    );



                bridge.sendMessage(
                    message.id
                );



                expect(
                    bridge.getSentMessages()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should track failed messages",
            () => {


                const message =
                    bridge.createMessage(

                        "Alert Manager",

                        "Communication Engine",

                        "ALERT"

                    );



                bridge.failMessage(
                    message.id
                );



                expect(
                    bridge.getFailedMessages()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should record communication events",
            () => {


                bridge.initialize();



                bridge.createMessage(

                    "A",

                    "B",

                    "TEST"

                );



                expect(
                    bridge.getEvents()
                    .length
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return statistics",
            () => {


                bridge.createMessage(

                    "A",

                    "B",

                    "TEST"

                );



                const stats =
                    bridge.getStatistics();



                expect(
                    stats.totalMessages
                )
                .toBe(1);



                expect(
                    stats.events
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return bridge status",
            () => {


                const status =
                    bridge.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Monitoring Communication Bridge"
                );



                expect(
                    status.version
                )
                .toBe(
                    "1.0.0"
                );


            }
        );





        test(
            "Should shutdown correctly",
            () => {


                bridge.initialize();



                expect(
                    bridge.shutdown()
                )
                .toBe(true);



                expect(
                    bridge.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
