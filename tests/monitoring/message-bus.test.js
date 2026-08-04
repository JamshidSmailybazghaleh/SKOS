/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Message Bus
 * File      : message-bus.test.js
 *
 * Build     : BUILD-000803.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate SKOS internal communication core.
 *
 * ==========================================================
 */


const MessageBus =
    require("../../src/communication/message-bus");



describe(
    "SKOS Message Bus Tests",
    () => {


        let bus;



        beforeEach(() => {


            bus =
                new MessageBus();


        });





        test(
            "Message bus should initialize",
            () => {


                expect(
                    bus.initialize()
                )
                .toBe(true);



                expect(
                    bus.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Should subscribe to event",
            () => {


                const handler =
                    jest.fn();



                expect(

                    bus.subscribe(

                        "TEST_EVENT",

                        handler

                    )

                )
                .toBe(true);



                expect(
                    bus.getSubscribers()
                    .has(
                        "TEST_EVENT"
                    )
                )
                .toBe(true);


            }
        );





        test(
            "Should reject invalid event type",
            () => {


                expect(

                    () =>
                        bus.subscribe(
                            null,
                            () => {}
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should reject invalid handler",
            () => {


                expect(

                    () =>
                        bus.subscribe(
                            "EVENT",
                            null
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should publish message",
            () => {


                const message =
                    bus.publish(

                        "SYSTEM_EVENT",

                        {

                            status:
                                "READY"

                        },

                        "Health Monitor"

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
                    "SYSTEM_EVENT"
                );



                expect(
                    bus.getMessages()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should dispatch message to subscriber",
            () => {


                const handler =
                    jest.fn();



                bus.subscribe(

                    "ALERT",

                    handler

                );



                bus.publish(

                    "ALERT",

                    {

                        severity:
                            "CRITICAL"

                    },

                    "Alert Manager"

                );



                expect(
                    handler
                )
                .toHaveBeenCalled();



                expect(
                    handler.mock.calls[0][0]
                        .type
                )
                .toBe(
                    "ALERT"
                );


            }
        );





        test(
            "Should handle multiple subscribers",
            () => {


                const first =
                    jest.fn();



                const second =
                    jest.fn();



                bus.subscribe(
                    "EVENT",
                    first
                );


                bus.subscribe(
                    "EVENT",
                    second
                );



                bus.publish(
                    "EVENT",
                    {}
                );



                expect(
                    first
                )
                .toHaveBeenCalled();



                expect(
                    second
                )
                .toHaveBeenCalled();


            }
        );





        test(
            "Should store message history",
            () => {


                bus.publish(

                    "HISTORY_TEST",

                    {}

                );



                expect(
                    bus.getHistory()
                    .length
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should record events",
            () => {


                bus.initialize();



                bus.publish(

                    "EVENT_TEST",

                    {}

                );



                expect(
                    bus.getEvents()
                    .length
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return statistics",
            () => {


                bus.publish(

                    "A",

                    {}

                );


                bus.publish(

                    "B",

                    {}

                );



                const stats =
                    bus.getStatistics();



                expect(
                    stats.totalMessages
                )
                .toBe(2);



                expect(
                    stats.events
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return bus status",
            () => {


                const status =
                    bus.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Message Bus"
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


                bus.initialize();



                expect(
                    bus.shutdown()
                )
                .toBe(true);



                expect(
                    bus.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
