/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Runtime Supervisor
 * File      : runtime-supervisor.test.js
 *
 * Build     : BUILD-000902.2
 * Version   : 1.0.0
 *
 * ==========================================================
 */


const RuntimeSupervisor =
require(
    "../../src/mission-control/runtime-supervisor"
);



describe(
"SKOS Runtime Supervisor Tests",
() => {


let supervisor;

let monitor;

let bootManager;



beforeEach(
() => {


    supervisor =
        new RuntimeSupervisor();



    monitor = {


        name:
        "Mock Monitoring Engine",



        health:
        jest.fn()
        .mockResolvedValue(
            "HEALTHY"
        )


    };



    bootManager = {


        restart:
        jest.fn()
        .mockResolvedValue(true)


    };


});







test(
"Should create runtime supervisor",
() => {


    expect(
        supervisor
    )
    .toBeDefined();



    expect(
        supervisor.name
    )
    .toBe(
        "SKOS Runtime Supervisor"
    );



});









test(
"Should initialize supervisor",
() => {


    expect(

        supervisor.initialize()

    )
    .toBe(true);



    expect(
        supervisor.status
    )
    .toBe(
        "INITIALIZED"
    );



});









test(
"Should attach boot manager",
() => {


    expect(

        supervisor.attachBootManager(
            bootManager
        )

    )
    .toBe(true);



    expect(

        supervisor.bootManager

    )
    .toBe(
        bootManager
    );



});









test(
"Should reject missing boot manager",
() => {


    expect(

        () =>
        supervisor.attachBootManager()

    )
    .toThrow();



});









test(
"Should attach monitoring service",
() => {


    expect(

        supervisor.attachMonitor(
            monitor
        )

    )
    .toBe(true);



    expect(

        supervisor.monitors.length

    )
    .toBe(1);



});









test(
"Should register runtime component",
() => {


    const component = {


        status:
        "READY"


    };



    expect(

        supervisor.registerComponent(
            "ENGINE-001",
            component
        )

    )
    .toBe(true);



    expect(

        supervisor.components.size

    )
    .toBe(1);



});









test(
"Should start runtime supervisor",
async () => {


    const result =

        await supervisor.start();



    expect(
        result
    )
    .toBe(true);



    expect(
        supervisor.status
    )
    .toBe(
        "RUNNING"
    );



    expect(
        supervisor.startedAt
    )
    .not
    .toBeNull();



});









test(
"Should perform healthy check",
async () => {


    supervisor.attachMonitor(
        monitor
    );



    const result =

        await supervisor.checkHealth();



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









test(
"Should supervise healthy runtime",
async () => {


    supervisor.attachMonitor(
        monitor
    );



    const result =

        await supervisor.supervise();



    expect(
        result.status
    )
    .toBe(
        "HEALTHY"
    );



    expect(
        result.failures
    )
    .toBe(0);



});









test(
"Should detect runtime failure",
async () => {


    monitor.health =
        jest.fn()
        .mockResolvedValue(
            "FAILED"
        );



    supervisor.attachMonitor(
        monitor
    );



    const result =

        await supervisor.supervise();



    expect(
        result.status
    )
    .toBe(
        "WARNING"
    );



    expect(
        result.failures
    )
    .toBe(1);



});









test(
"Should recover failed runtime",
async () => {


    supervisor.attachBootManager(
        bootManager
    );



    const result =

        await supervisor.recover();



    expect(
        result
    )
    .toBe(true);



    expect(
        bootManager.restart
    )
    .toHaveBeenCalled();



    expect(
        supervisor.status
    )
    .toBe(
        "HEALTHY"
    );



});









test(
"Should stop supervisor",
async () => {


    const result =

        await supervisor.stop();



    expect(
        result
    )
    .toBe(true);



    expect(
        supervisor.status
    )
    .toBe(
        "STOPPED"
    );



});









test(
"Should record supervisor history",
() => {


    supervisor.record(
        "TEST_EVENT"
    );



    expect(

        supervisor.getHistory()
        .length

    )
    .toBe(1);



});









test(
"Should return runtime state",
() => {


    const state =

        supervisor.getRuntimeState();



    expect(
        state.name
    )
    .toBe(
        "SKOS Runtime Supervisor"
    );



    expect(
        state.components
    )
    .toBe(0);



});









test(
"Should shutdown supervisor",
async () => {


    const result =

        await supervisor.shutdown();



    expect(
        result
    )
    .toBe(true);



    expect(
        supervisor.status
    )
    .toBe(
        "SHUTDOWN"
    );



});



});
