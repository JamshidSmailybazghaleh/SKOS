/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Notification Service
 * File      : notification-service.test.js
 *
 * Build     : BUILD-000804.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate SKOS notification lifecycle.
 *
 * ==========================================================
 */


const NotificationService =
    require("../../src/communication/notification-service");



describe(
    "SKOS Notification Service Tests",
    () => {


        let service;



        beforeEach(() => {


            service =
                new NotificationService();


        });





        test(
            "Notification service should initialize",
            () => {


                expect(
                    service.initialize()
                )
                .toBe(true);



                expect(
                    service.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Should register notification channel",
            () => {


                const handler =
                    jest.fn();



                expect(

                    service.registerChannel(

                        "DASHBOARD",

                        handler

                    )

                )
                .toBe(true);



                expect(
                    service.channels
                    .has(
                        "DASHBOARD"
                    )
                )
                .toBe(true);


            }
        );





        test(
            "Should reject invalid channel id",
            () => {


                expect(

                    () =>
                        service.registerChannel(
                            null,
                            () => {}
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should reject invalid channel handler",
            () => {


                expect(

                    () =>
                        service.registerChannel(
                            "API",
                            null
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should create notification",
            () => {


                const notification =
                    service.createNotification(

                        "SYSTEM_ALERT",

                        "Engine failure",

                        {

                            source:
                                "Alert Manager"

                        }

                    );



                expect(
                    notification.id
                )
                .toMatch(
                    /^NOTIFY-/
                );



                expect(
                    notification.status
                )
                .toBe(
                    "CREATED"
                );



                expect(
                    service
                    .getNotifications()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should send notification",
            () => {


                const handler =
                    jest.fn();



                service.registerChannel(

                    "MISSION_CONTROL",

                    handler

                );



                const notification =
                    service.createNotification(

                        "ALERT",

                        "Critical issue"

                    );



                const result =
                    service.send(

                        notification.id,

                        "MISSION_CONTROL"

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



                expect(
                    handler
                )
                .toHaveBeenCalled();


            }
        );





        test(
            "Should reject unknown notification",
            () => {


                expect(

                    () =>
                        service.send(

                            "UNKNOWN",

                            "DASHBOARD"

                        )

                )
                .toThrow();


            }
        );





        test(
            "Should reject unknown channel",
            () => {


                const notification =
                    service.createNotification(

                        "TEST",

                        "Message"

                    );



                expect(

                    () =>
                        service.send(

                            notification.id,

                            "UNKNOWN"

                        )

                )
                .toThrow();


            }
        );





        test(
            "Should mark failed notification",
            () => {


                const notification =
                    service.createNotification(

                        "ERROR",

                        "Delivery error"

                    );



                const result =
                    service.fail(

                        notification.id,

                        "Network unavailable"

                    );



                expect(
                    result.status
                )
                .toBe(
                    "FAILED"
                );



                expect(
                    result.reason
                )
                .toBe(
                    "Network unavailable"
                );


            }
        );





        test(
            "Should retrieve sent notifications",
            () => {


                service.registerChannel(

                    "EMAIL",

                    () => {}

                );



                const notification =
                    service.createNotification(

                        "INFO",

                        "System started"

                    );



                service.send(

                    notification.id,

                    "EMAIL"

                );



                expect(
                    service
                    .getSentNotifications()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should retrieve failed notifications",
            () => {


                const notification =
                    service.createNotification(

                        "WARNING",

                        "Failure"

                    );



                service.fail(

                    notification.id

                );



                expect(
                    service
                    .getFailedNotifications()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should record history",
            () => {


                service.initialize();



                service.createNotification(

                    "EVENT",

                    "History test"

                );



                expect(
                    service.getHistory()
                    .length
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return statistics",
            () => {


                service.createNotification(

                    "A",

                    "Test"

                );



                const stats =
                    service.getStatistics();



                expect(
                    stats.total
                )
                .toBe(1);



                expect(
                    stats.history
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return service status",
            () => {


                const status =
                    service.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Notification Service"
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


                service.initialize();



                expect(
                    service.shutdown()
                )
                .toBe(true);



                expect(
                    service.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
