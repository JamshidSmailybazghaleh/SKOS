/**
 * SKOS Kernel Test Suite
 *
 * File:
 * tests/core/skos-kernel.test.js
 *
 * Project:
 * Smaily Knowledge Operating System
 *
 * Test ID:
 * TEST-CORE-001
 *
 * Build:
 * BUILD-000001
 *
 * Version:
 * 1.0.0
 */


const SKOSKernel = require(
    "../../src/core/skos-kernel"
);


describe(
    "SKOS Kernel Core Tests",
    () => {


        let kernel;


        beforeEach(
            () => {

                kernel = new SKOSKernel();

            }
        );



        test(
            "Kernel should initialize successfully",
            () => {


                const result =
                    kernel.initialize();


                expect(
                    result.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );



        test(
            "Kernel should return correct version",
            () => {


                kernel.initialize();


                const status =
                    kernel.getStatus();


                expect(
                    status.version
                )
                .toBe(
                    "1.0.0"
                );


            }
        );



        test(
            "Kernel should register engine",
            () => {


                kernel.initialize();


                const mockEngine = {


                    execute:
                    () => {

                        return {
                            status:
                            "EXECUTED"
                        };

                    }

                };



                const result =
                    kernel.registerEngine(
                        "test-engine",
                        mockEngine
                    );


                expect(
                    result
                )
                .toBe(
                    true
                );


                const status =
                    kernel.getStatus();


                expect(
                    status.engines
                )
                .toContain(
                    "test-engine"
                );


            }
        );



        test(
            "Kernel should execute registered engine",
            () => {


                kernel.initialize();


                kernel.registerEngine(
                    "test-engine",
                    {

                        execute:
                        () => {

                            return {
                                result:
                                "SUCCESS"
                            };

                        }

                    }
                );



                const output =
                    kernel.executeEngine(
                        "test-engine",
                        {}
                    );


                expect(
                    output.result
                )
                .toBe(
                    "SUCCESS"
                );


            }
        );



        test(
            "Kernel should record events",
            () => {


                kernel.initialize();


                const status =
                    kernel.getStatus();



                expect(
                    status.events
                )
                .toBeGreaterThan(
                    0
                );


            }
        );



        test(
            "Kernel should shutdown correctly",
            () => {


                kernel.initialize();


                const result =
                    kernel.shutdown();


                expect(
                    result
                )
                .toBe(
                    true
                );


                const status =
                    kernel.getStatus();


                expect(
                    status.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
