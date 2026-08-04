/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Monitoring Runtime
 * File : monitoring-runtime.test.js
 *
 * Build : BUILD-000800.5
 * Version : 1.0.0
 * ==========================================================
 */

const MonitoringRuntime =
    require("../../src/monitoring/monitoring-runtime");


describe("Monitoring Runtime Tests", () => {


    let monitoring;

    let monitor;


    beforeEach(() => {

        monitoring =
            new MonitoringRuntime();


        monitor = {

            name:
                "Mock Health Monitor",


            start:
                jest.fn()
                .mockResolvedValue(true),


            collect:
                jest.fn()
                .mockResolvedValue({

                    cpu: 20,

                    memory: 40

                }),


            health:
                jest.fn()
                .mockResolvedValue(
                    "HEALTHY"
                ),


            shutdown:
                jest.fn()
                .mockResolvedValue(true)

        };

    });



    test("Should create monitoring runtime", () => {


        expect(monitoring)
            .toBeDefined();


        expect(monitoring.name)
            .toBe(
                "SKOS Monitoring Runtime"
            );


    });



    test("Should register monitor", () => {


        expect(
            monitoring.registerMonitor(monitor)
        )
        .toBe(true);


        expect(
            monitoring.monitors.length
        )
        .toBe(1);


    });



    test("Should reject empty monitor", () => {


        expect(() =>

            monitoring.registerMonitor()

        )
        .toThrow();


    });



    test("Should start monitoring runtime", async () => {


        monitoring.registerMonitor(monitor);


        await monitoring.start();


        expect(
            monitor.start
        )
        .toHaveBeenCalled();


        expect(
            monitoring.status
        )
        .toBe("READY");


    });



    test("Should collect metrics", async () => {


        monitoring.registerMonitor(monitor);


        await monitoring.start();


        const metrics =
            await monitoring.collect();


        expect(
            metrics["Mock Health Monitor"]
        )
        .toBeDefined();


        expect(
            metrics["Mock Health Monitor"].cpu
        )
        .toBe(20);


    });



    test("Should perform health check", async () => {


        monitoring.registerMonitor(monitor);


        const result =
            await monitoring.healthCheck();


        expect(
            result.length
        )
        .toBe(1);


        expect(
            result[0].status
        )
        .toBe(
            "HEALTHY"
        );


    });



    test("Should record monitoring events", () => {


        monitoring.recordEvent({

            type:
                "TEST_EVENT"

        });


        expect(
            monitoring.getEvents().length
        )
        .toBe(1);


    });



    test("Should return collected metrics", async () => {


        monitoring.registerMonitor(monitor);


        await monitoring.collect();


        expect(
            Object.keys(
                monitoring.getMetrics()
            ).length
        )
        .toBe(1);


    });



    test("Should shutdown monitoring", async () => {


        monitoring.registerMonitor(monitor);


        await monitoring.shutdown();


        expect(
            monitor.shutdown
        )
        .toHaveBeenCalled();


        expect(
            monitoring.status
        )
        .toBe(
            "STOPPED"
        );


    });



    test("Should return monitoring status", () => {


        const status =
            monitoring.getStatus();


        expect(
            status.name
        )
        .toBe(
            "SKOS Monitoring Runtime"
        );


        expect(
            status.status
        )
        .toBe(
            "INITIALIZED"
        );


    });


});
