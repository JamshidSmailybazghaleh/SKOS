/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : SKOS System Launcher
 * File : skos-system-launcher.test.js
 *
 * Build : BUILD-000451
 * Version : 1.0.0
 * ==========================================================
 */

const SKOSSystemLauncher =
require("../../src/runtime/skos-system-launcher");


describe(
"SKOS System Launcher Tests",
() => {

    let launcher;


    beforeEach(() => {

        launcher =
            new SKOSSystemLauncher();

    });


    test(
    "Should create launcher",
    () => {

        expect(
            launcher
        ).toBeDefined();

        expect(
            launcher.version
        ).toBe("1.0.0");

    });


    test(
    "Should initialize launcher",
    () => {

        expect(
            launcher.initialize()
        ).toBe(true);

        expect(
            launcher.status
        ).toBe("INITIALIZED");

    });


    test(
    "Should launch SKOS",
    () => {

        launcher.initialize();

        expect(
            launcher.launch()
        ).toBe(true);

        expect(
    launcher.status
)
.toBe(
    "READY"
    
    });


    test(
    "Should return runtime status",
    () => {

        launcher.initialize();

        launcher.launch();

        const status =
            launcher.getStatus();

        expect(
            status.launcher
        ).toBe("RUNNING");

    });


    test(
    "Should shutdown SKOS",
    () => {

        launcher.initialize();

        launcher.launch();

        expect(
            launcher.shutdown()
        ).toBe(true);

        expect(
            launcher.status
        ).toBe("SHUTDOWN");

    });


    test(
    "Should launch without manual initialize",
    () => {

        expect(
            launcher.launch()
        ).toBe(true);

        expect(
            launcher.status
        ).toBe("RUNNING");

    });


    test(
    "Bootstrap should exist",
    () => {

        expect(
            launcher.bootstrap
        ).toBeDefined();

    });


    test(
    "Kernel should exist",
    () => {

        expect(
            launcher.kernel
        ).toBeDefined();

    });


    test(
    "Orchestrator should exist",
    () => {

        expect(
            launcher.orchestrator
        ).toBeDefined();

    });


    test(
    "Startup manager should exist",
    () => {

        expect(
            launcher.startup
        ).toBeDefined();

    });


    test(
    "SDKC connector should exist",
    () => {

        expect(
            launcher.sdkc
        ).toBeDefined();

    });

});
