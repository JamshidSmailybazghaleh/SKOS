/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : SKOS Kernel
 * File      : skos-kernel.test.js
 *
 * Build     : BUILD-000446
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const SKOSKernel =
    require("../../src/kernel/skos-kernel");



class MockEngine {


    constructor() {

        this.status =
            "CREATED";

    }



    initialize() {

        this.status =
            "INITIALIZED";

        return true;

    }



    shutdown() {

        this.status =
            "SHUTDOWN";

        return true;

    }

}




class MockService {


    constructor() {

        this.name =
            "Mock Service";

    }

}





describe(
    "SKOS Kernel Tests",
    () => {


        let kernel;



        beforeEach(() => {

            kernel =
                new SKOSKernel();

        });





        test(
            "Kernel should initialize",
            () => {


                expect(
                    kernel.initialize()
                ).toBe(true);



                expect(
                    kernel.status
                ).toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Should register engine",
            () => {


                const engine =
                    new MockEngine();



                expect(
                    kernel.registerEngine(
                        "ENGINE-001",
                        engine
                    )
                ).toBe(true);



                expect(
                    kernel.engines.has(
                        "ENGINE-001"
                    )
                ).toBe(true);


            }
        );





        test(
            "Should reject empty engine id",
            () => {


                expect(

                    () =>
                        kernel.registerEngine(
                            null,
                            new MockEngine()
                        )

                ).toThrow();


            }
        );





        test(
            "Should start registered engine",
            () => {


                const engine =
                    new MockEngine();



                kernel.registerEngine(

                    "ENGINE-002",

                    engine

                );



                expect(

                    kernel.startEngine(
                        "ENGINE-002"
                    )

                ).toBe(true);



                expect(

                    engine.status

                ).toBe(

                    "INITIALIZED"

                );


            }
        );





        test(
            "Should reject unknown engine startup",
            () => {


                expect(

                    () =>
                        kernel.startEngine(
                            "UNKNOWN"
                        )

                ).toThrow();


            }
        );





        test(
            "Should register service",
            () => {


                const service =
                    new MockService();



                expect(

                    kernel.registerService(
                        "SERVICE-001",
                        service
                    )

                ).toBe(true);



                expect(

                    kernel.getService(
                        "SERVICE-001"
                    )

                ).toBe(service);


            }
        );





        test(
            "Should retrieve engine instance",
            () => {


                const engine =
                    new MockEngine();



                kernel.registerEngine(

                    "ENGINE-003",

                    engine

                );



                expect(

                    kernel.getEngine(
                        "ENGINE-003"
                    )

                ).toBe(engine);


            }
        );





        test(
            "Should connect SDKC",
            () => {


                expect(

                    kernel.connectSDKC()

                ).toBe(true);



                expect(

                    kernel.context.sdkcConnected

                ).toBe(true);


            }
        );





        test(
            "Should activate knowledge runtime",
            () => {


                expect(

                    kernel.activateKnowledgeRuntime()

                ).toBe(true);



                expect(

                    kernel.context.knowledgeReady

                ).toBe(true);


            }
        );





        test(
            "Should activate autonomous runtime",
            () => {


                expect(

                    kernel.activateAutonomousRuntime()

                ).toBe(true);



                expect(

                    kernel.context.autonomousReady

                ).toBe(true);


            }
        );





        test(
            "Should emit events",
            () => {


                const event =
                    kernel.emit(

                        "TEST_EVENT",

                        {
                            value:
                                100
                        }

                    );



                expect(

                    event.event

                ).toBe(

                    "TEST_EVENT"

                );



                expect(

                    kernel.getEvents().length

                ).toBe(1);


            }
        );





        test(
            "Should return kernel status",
            () => {


                const status =
                    kernel.getStatus();



                expect(

                    status.name

                ).toBe(

                    "SKOS Kernel"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );


            }
        );





        test(
            "Should shutdown kernel",
            () => {


                const engine =
                    new MockEngine();



                kernel.registerEngine(

                    "ENGINE-004",

                    engine

                );



                expect(

                    kernel.shutdown()

                ).toBe(true);



                expect(

                    kernel.status

                ).toBe(

                    "SHUTDOWN"

                );



                expect(

                    engine.status

                ).toBe(

                    "SHUTDOWN"

                );


            }
        );


    }

);
