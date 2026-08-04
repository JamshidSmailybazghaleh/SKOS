/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Boot Manager
 * File : boot-manager.test.js
 *
 * Build : BUILD-000800.2
 * Version : 1.0.0
 * ==========================================================
 */

const BootManager =
    require("../../src/runtime/boot-manager");


describe("Boot Manager Tests", () => {

    let boot;

    let component;


    beforeEach(() => {

        boot =
            new BootManager();

        component = {

            name: "Mock Component",

            initialize:
                jest.fn().mockResolvedValue(true),

            start:
                jest.fn().mockResolvedValue(true),

            shutdown:
                jest.fn().mockResolvedValue(true),

            getStatus:
                jest.fn().mockReturnValue({

                    status: "READY"

                })

        };

    });


    test("Should create boot manager", () => {

        expect(boot).toBeDefined();

        expect(boot.name)
            .toBe("SKOS Boot Manager");

    });


    test("Should register component", () => {

        expect(
            boot.register(component)
        ).toBe(true);

        expect(
            boot.components.length
        ).toBe(1);

    });


    test("Should reject invalid component", () => {

        expect(() =>

            boot.register()

        ).toThrow();

    });


    test("Should initialize components", async () => {

        boot.register(component);

        await boot.initialize();

        expect(
            component.initialize
        ).toHaveBeenCalled();

    });


    test("Should verify components", async () => {

        boot.register(component);

        expect(

            await boot.verify()

        ).toBe(true);

    });


    test("Should start components", async () => {

        boot.register(component);

        await boot.start();

        expect(
            component.start
        ).toHaveBeenCalled();

        expect(
            boot.status
        ).toBe("READY");

    });


    test("Should shutdown components", async () => {

        boot.register(component);

        await boot.shutdown();

        expect(
            component.shutdown
        ).toHaveBeenCalled();

        expect(
            boot.status
        ).toBe("STOPPED");

    });


    test("Should return boot logs", () => {

        expect(
            Array.isArray(
                boot.getLogs()
            )
        ).toBe(true);

    });


    test("Should return boot status", () => {

        const status =
            boot.getStatus();

        expect(
            status.name
        )
        .toBe("SKOS Boot Manager");

        expect(
            status.build
        )
        .toBe("BUILD-000800.1");

    });

});
