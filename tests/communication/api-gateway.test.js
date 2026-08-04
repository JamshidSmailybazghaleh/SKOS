/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : API Gateway
 * File      : api-gateway.test.js
 *
 * Build     : BUILD-000805.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate SKOS API communication layer.
 *
 * ==========================================================
 */


const ApiGateway =
    require("../../src/communication/api-gateway");



describe(
    "SKOS API Gateway Tests",
    () => {


        let gateway;



        beforeEach(() => {


            gateway =
                new ApiGateway();


        });





        test(
            "API Gateway should initialize",
            () => {


                expect(
                    gateway.initialize()
                )
                .toBe(true);



                expect(
                    gateway.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Should register API route",
            () => {


                const handler =
                    jest.fn();



                expect(

                    gateway.registerRoute(

                        "/status",

                        handler

                    )

                )
                .toBe(true);



                expect(
                    gateway.getRoutes()
                    .has(
                        "/status"
                    )
                )
                .toBe(true);


            }
        );





        test(
            "Should reject invalid route path",
            () => {


                expect(

                    () =>
                        gateway.registerRoute(
                            null,
                            () => {}
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should reject invalid route handler",
            () => {


                expect(

                    () =>
                        gateway.registerRoute(
                            "/test",
                            null
                        )

                )
                .toThrow();


            }
        );





        test(
            "Should handle valid request",
            () => {


                const handler =
                    jest.fn(

                        payload => {

                            return {

                                result:
                                    "OK",

                                payload

                            };

                        }

                    );



                gateway.registerRoute(

                    "/health",

                    handler

                );



                const response =
                    gateway.handleRequest(

                        "/health",

                        {

                            component:
                                "Kernel"

                        }

                    );



                expect(
                    response.status
                )
                .toBe(
                    "COMPLETED"
                );



                expect(
                    response.response.result
                )
                .toBe(
                    "OK"
                );



                expect(
                    handler
                )
                .toHaveBeenCalled();


            }
        );





        test(
            "Should handle unknown route",
            () => {


                const response =
                    gateway.handleRequest(

                        "/unknown",

                        {}

                    );



                expect(
                    response.status
                )
                .toBe(
                    "FAILED"
                );



                expect(
                    response.error
                )
                .toBe(
                    "Route not found."
                );


            }
        );





        test(
            "Should generate unique request id",
            () => {


                const first =
                    gateway.handleRequest(

                        "/a",

                        {}

                    );



                const second =
                    gateway.handleRequest(

                        "/b",

                        {}

                    );



                expect(
                    first.id
                )
                .not
                .toBe(
                    second.id
                );


            }
        );





        test(
            "Should store requests history",
            () => {


                gateway.handleRequest(

                    "/history",

                    {}

                );



                expect(
                    gateway.getRequests()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should return statistics",
            () => {


                gateway.registerRoute(

                    "/ok",

                    () => true

                );



                gateway.handleRequest(

                    "/ok",

                    {}

                );



                gateway.handleRequest(

                    "/missing",

                    {}

                );



                const stats =
                    gateway.getStatistics();



                expect(
                    stats.routes
                )
                .toBe(1);



                expect(
                    stats.requests
                )
                .toBe(2);



                expect(
                    stats.successful
                )
                .toBe(1);



                expect(
                    stats.failed
                )
                .toBe(1);


            }
        );





        test(
            "Should record gateway history",
            () => {


                gateway.initialize();



                gateway.registerRoute(

                    "/event",

                    () => true

                );



                expect(
                    gateway.getHistory()
                    .length
                )
                .toBeGreaterThan(0);


            }
        );





        test(
            "Should return gateway status",
            () => {


                const status =
                    gateway.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "API Gateway"
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


                gateway.initialize();



                expect(
                    gateway.shutdown()
                )
                .toBe(true);



                expect(
                    gateway.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
