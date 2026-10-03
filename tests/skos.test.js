/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Canonical System Launcher
 * File      : skos.test.js
 *
 * ==========================================================
 */

const SKOSSystemLauncher =
    require("../src/runtime/skos-system-launcher");

describe(
    "SKOS Canonical System Launcher",
    () => {

        test(
            "Should create launcher instance",
            () => {

                const launcher =
                    new SKOSSystemLauncher();

                expect(launcher)
                    .toBeDefined();

                expect(launcher.getStatus().launcher)
                    .toBe("CREATED");
            }
        );


        test(
            "Should initialize successfully",
            () => {

                const launcher =
                    new SKOSSystemLauncher();

                const result =
                    launcher.initialize();

                expect(result)
                    .toBe(true);

                expect(
                    launcher.getStatus().launcher
                ).toBe("INITIALIZED");

                launcher.shutdown();
            }
        );


        test(
            "Should perform canonical full launch",
            async () => {

                const launcher =
                    new SKOSSystemLauncher();

                const result =
                    await launcher.launch();

                const status =
                    launcher.getStatus();

                expect(result)
                    .toBe(true);

                expect(status.launcher)
                    .toBe("RUNNING");

                expect(status.startup)
                    .toBe("READY");

                expect(status.sdkc)
                    .toBe("CONNECTED");

                expect(status.orchestrator)
                    .toBe("RUNNING");

                launcher.shutdown();
            }
        );


        test(
            "Should expose canonical runtime status",
            async () => {

                const launcher =
                    new SKOSSystemLauncher();

                await launcher.launch();

                const status =
                    launcher.getStatus();

                expect(status)
                    .toBeDefined();

                expect(status.launcher)
                    .toBe("RUNNING");

                expect(status.bootstrap)
                    .toBeDefined();

                expect(status.kernel)
                    .toBeDefined();

                expect(status.orchestrator)
                    .toBeDefined();

                expect(status.sdkc)
                    .toBeDefined();

                launcher.shutdown();
            }
        );


        test(
            "Should expose visibility chain",
            async () => {

                const launcher =
                    new SKOSSystemLauncher();

                await launcher.launch();

                const status =
                    launcher.getStatus();

                expect(status.visibility)
                    .toBeDefined();

                expect(status.visibility.bridge)
                    .toBeDefined();

                expect(status.visibility.adapter)
                    .toBeDefined();

                expect(status.visibility.client)
                    .toBeDefined();

                expect(status.visibility.livePanel)
                    .toBeDefined();

                launcher.shutdown();
            }
        );


        test(
            "Should shutdown cleanly",
            async () => {

                const launcher =
                    new SKOSSystemLauncher();

                await launcher.launch();

                const result =
                    await launcher.shutdown();

                expect(result)
                    .toBe(true);

                expect(
                    launcher.getStatus().launcher
                ).toBe("SHUTDOWN");

                expect(
                    launcher.getStatus().startup
                ).toBe("SHUTDOWN");
            }
        );

    }
);
