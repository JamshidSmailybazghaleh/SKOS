/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Event Dispatcher
 * File      : event-dispatcher.test.js
 *
 * Build     : BUILD-000803.4
 * Version   : 1.0.0
 *
 * Mission:
 * Validate SKOS internal event routing.
 *
 * ==========================================================
 */


const EventDispatcher =
    require("../../src/communication/event-dispatcher");



describe(
    "SKOS Event Dispatcher Tests",
    () => {


        let dispatcher;



        beforeEach(() => {


            dispatcher =
                new EventDispatcher();


        });





        test(
            "Event dispatcher should initialize",
            () => {


                expect(
                    dispatcher.initialize()
                )
                .toBe(true);



                expect(
                    dispatcher.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Should register event route",
            () => {


                const handler =
                    jest.fn();



                expect(

                    dispatcher.registerRoute(

                        "ALERT_CREATED",

                        handler

                    )

                )
                .toBe(true);



                expect(
                    dispatcher.hasRoute(
                        "ALERT_CREATED"
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
                        dispatcher.registerRoute(
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
                        dispatcher.registerRoute(
                            "EVENT",
                            null
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should dispatch event to handler",
            () => {


                const handler =
                    jest.fn(

                        payload => {

                            return {

                                processed:
                                    true,

                                payload

                            };

                        }

                    );



                dispatcher.registerRoute(

                    "SYSTEM_READY",

                    handler

                );



                const result =
                    dispatcher.dispatch(

                        "SYSTEM_READY",

                        {

                            component:
                                "Kernel"

                        }

                    );



                expect(
                    result.dispatched
                )
                .toBe(true);



                expect(
                    handler
                )
                .toHaveBeenCalled();



                expect(
                    result.result.processed
                )
                .toBe(true);


            }
        );





        test(
            "Should handle missing route",
            () => {


                const result =
                    dispatcher.dispatch(

                        "UNKNOWN_EVENT",

                        {}

                    );



                expect(
                    result.dispatched
                )
                .toBe(false);


            }
        );





        test(
            "Should store received events",
            () => {


                dispatcher.dispatch(

                    "TEST_EVENT",

                    {}

                );



                expect(
                    dispatcher.getEvents()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should return registered routes",
            () => {


                dispatcher.registerRoute(

                    "ENGINE_START",

                    () => true

                );



                expect(
                    dispatcher.getRoutes()
                    .size
                )
                .toBe(1);


            }
        );





        test(
            "Should record history",
            () => {


                dispatcher.initialize();



                dispatcher.dispatch(

                    "HISTORY_EVENT",

                    {}

                );



                expect(
                    dispatcher.getHistory()
                    .length
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return statistics",
            () => {


                dispatcher.registerRoute(

                    "EVENT_A",

                    () => true

                );



                dispatcher.dispatch(

                    "EVENT_A",

                    {}

                );



                const stats =
                    dispatcher.getStatistics();



                expect(
                    stats.routes
                )
                .toBe(1);



                expect(
                    stats.events
                )
                .toBe(1);



                expect(
                    stats.history
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return dispatcher status",
            () => {


                const status =
                    dispatcher.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Event Dispatcher"
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


                dispatcher.initialize();



                expect(
                    dispatcher.shutdown()
                )
                .toBe(true);



                expect(
                    dispatcher.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
