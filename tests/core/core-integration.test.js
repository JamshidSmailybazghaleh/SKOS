"use strict";

const SKOSRuntime =

    require("../../src/core/skos-runtime");


describe(

    "CORE-INTEGRATION-001",

    () => {


        let runtime;


        beforeEach(

            () => {

                runtime =

                    new SKOSRuntime({

                        build:

                            "BUILD-000910"

                    });

            }

        );


        afterEach(

            () => {

                if(

                    runtime &&

                    typeof runtime.destroy ===

                        "function"

                ){

                    runtime.destroy();

                }

            }

        );


        test(

            "should create runtime",

            () => {

                expect(

                    runtime

                ).toBeDefined();


                expect(

                    runtime.name

                ).toBe(

                    "Smaily Knowledge Operating System"

                );


                expect(

                    runtime.version

                ).toBe(

                    "1.0.0"

                );


                expect(

                    runtime.build

                ).toBe(

                    "BUILD-000910"

                );


                expect(

                    runtime.status

                ).toBe(

                    "CREATED"

                );

            }

        );


        test(

            "should initialize core",

            () => {

                const result =

                    runtime.initialize();


                expect(

                    result

                ).toBe(

                    true

                );


                expect(

                    runtime.status

                ).toBe(

                    "INITIALIZED"

                );


                expect(

                    runtime.isReady()

                ).toBe(

                    true

                );

            }

        );


    }

);
