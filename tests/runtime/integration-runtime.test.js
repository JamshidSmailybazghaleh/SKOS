/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Integration Runtime
 * File : integration-runtime.test.js
 *
 * Build : BUILD-000500.5
 * Version : 1.0.0
 * ==========================================================
 */


const SKOSAlphaRuntime =
    require("../../src/runtime/skos-alpha-runtime");


const IntegrationManager =
    require("../../src/runtime/integration-manager");


const IntegrationValidator =
    require("../../src/runtime/integration-validator");


const IntegrationReport =
    require("../../src/runtime/integration-report");



describe(
"SKOS Alpha Integration Runtime Tests",
() => {


    let runtime;
    let manager;
    let validator;
    let report;



    beforeEach(() => {

        runtime =
            new SKOSAlphaRuntime();

        manager =
            new IntegrationManager();

        validator =
            new IntegrationValidator();

        report =
            new IntegrationReport();

    });



    test(
    "Should initialize Alpha Runtime",
    () => {

        expect(
            runtime
                .initialize()
        )
        .toBe(true);


        expect(
            runtime.status
        )
        .toBe(
            "INITIALIZED"
        );

    });



    test(
    "Should start Alpha Runtime",
    () => {

        expect(
            runtime.start()
        )
        .toBe(true);


        expect(
            runtime.isReady()
        )
        .toBe(true);

    });



    test(
    "Should register runtime components",
    () => {


        manager.register(
            "Bootstrap",
            runtime.bootstrap
        );


        manager.register(
            "Kernel",
            runtime.kernel
        );


        manager.register(
            "Startup",
            runtime.startup
        );


        expect(
            manager.components.size
        )
        .toBe(3);


    });



    test(
    "Should validate integration",
    () => {


        runtime.start();


        validator.register(
            "Bootstrap",
            runtime.bootstrap
        );


        validator.register(
            "Kernel",
            runtime.kernel
        );


        validator.register(
            "Startup",
            runtime.startup
        );


        const result =
            validator.validate();


        expect(
            result
        )
        .toBe(
            "PASSED"
        );


    });



    test(
    "Should generate integration report",
    () => {


        runtime.start();


        validator.register(
            "Kernel",
            runtime.kernel
        );


        validator.validate();


        report.generate(
            runtime,
            validator
        );


        const output =
            report.exportObject();


        expect(
            output.summary.runtime
        )
        .toBe(
            "SKOS Alpha Runtime"
        );


        expect(
            output.summary.validatorStatus
        )
        .toBe(
            "PASSED"
        );


    });



    test(
    "Should export JSON report",
    () => {


        const json =
            report.exportJSON();


        expect(
            typeof json
        )
        .toBe(
            "string"
        );


    });



    test(
    "Should shutdown runtime",
    () => {


        runtime.start();


        expect(
            runtime.stop()
        )
        .toBe(true);


        expect(
            runtime.status
        )
        .toBe(
            "STOPPED"
        );


    });



});
