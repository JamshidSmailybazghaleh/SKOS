/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : SKOS Bootstrap Runtime
 * File      : skos-bootstrap-runtime.test.js
 *
 * Build     : BUILD-000445
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const SKOSBootstrapRuntime =
    require("../../src/runtime/skos-bootstrap-runtime");



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




describe(
    "SKOS Bootstrap Runtime Tests",
    () => {


        let runtime;



        beforeEach(() => {

            runtime =
                new SKOSBootstrapRuntime();

        });



        test(
            "Runtime should initialize",
            () => {

                expect(
                    runtime.initialize()
                ).toBe(true);



                expect(
                    runtime.status
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
                    runtime.registerEngine(
                        "ENGINE-001",
                        engine
                    )
                ).toBe(true);



                expect(
                    runtime.getEngines()
                ).toContain(
                    "ENGINE-001"
                );

            }
        );



        test(
            "Should reject invalid engine id",
            () => {


                expect(
                    () =>
                        runtime.registerEngine(
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



                runtime.registerEngine(
                    "ENGINE-002",
                    engine
                );



                expect(
                    runtime.startEngine(
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
                        runtime.startEngine(
                            "UNKNOWN"
                        )
                ).toThrow();


            }
        );



        test(
            "Should start all engines",
            () => {


                runtime.registerEngine(
                    "ENGINE-A",
                    new MockEngine()
                );


                runtime.registerEngine(
                    "ENGINE-B",
                    new MockEngine()
                );



                expect(
                    runtime.startAll()
                ).toBe(true);



                expect(
                    runtime.status
                ).toBe(
                    "RUNNING"
                );

            }
        );



        test(
            "Should retrieve engine instance",
            () => {


                const engine =
                    new MockEngine();



                runtime.registerEngine(
                    "ENGINE-003",
                    engine
                );



                expect(
                    runtime.getEngine(
                        "ENGINE-003"
                    )
                ).toBe(engine);


            }
        );



        test(
            "Should activate monitoring component",
            () => {


                runtime.initialize();



                runtime.registerEngine(
                    "ENGINE-004",
                    new MockEngine()
                );



                const component =
                    runtime.monitoring
                        .getComponent(
                            "ENGINE-004"
                        );



                expect(
                    component.id
                ).toBe(
                    "ENGINE-004"
                );

            }
        );



        test(
            "Should return runtime status",
            () => {


                const status =
                    runtime.getStatus();



                expect(
                    status.name
                ).toBe(
                    "SKOS Bootstrap Runtime"
                );



                expect(
                    status.version
                ).toBe(
                    "1.0.0"
                );

            }
        );



        test(
            "Should shutdown runtime",
            () => {


                runtime.initialize();



                runtime.registerEngine(
                    "ENGINE-005",
                    new MockEngine()
                );



                expect(
                    runtime.shutdown()
                ).toBe(true);



                expect(
                    runtime.status
                ).toBe(
                    "SHUTDOWN"
                );

            }
        );


    }

);
