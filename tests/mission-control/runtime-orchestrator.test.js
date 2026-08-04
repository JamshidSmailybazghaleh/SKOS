/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Runtime Orchestrator
 * File      : runtime-orchestrator.test.js
 *
 * Build     : BUILD-000903.2
 * Version   : 1.0.0
 *
 * ==========================================================
 */


const RuntimeOrchestrator =
require(
    "../../src/mission-control/runtime-orchestrator"
);



describe(
"SKOS Runtime Orchestrator Tests",
() => {


let orchestrator;

let bootManager;

let supervisor;



beforeEach(
() => {


    orchestrator =
        new RuntimeOrchestrator();



    bootManager = {


        boot:
        jest.fn()
        .mockResolvedValue(true),



        restart:
        jest.fn()
        .mockResolvedValue(true),



        shutdown:
        jest.fn()
        .mockResolvedValue(true),



        getState:
        jest.fn()
        .mockReturnValue({

            status:
            "READY"

        })

    };





    supervisor = {


        start:
        jest.fn()
        .mockResolvedValue(true),



        shutdown:
        jest.fn()
        .mockResolvedValue(true),



        getRuntimeState:
        jest.fn()
        .mockReturnValue({

            status:
            "HEALTHY"

        })


    };


});









test(
"Should create runtime orchestrator",
() => {


    expect(
        orchestrator
    )
    .toBeDefined();



    expect(
        orchestrator.name
    )
    .toBe(
        "SKOS Runtime Orchestrator"
    );



});









test(
"Should initialize orchestrator",
() => {


    expect(

        orchestrator.initialize()

    )
    .toBe(true);



    expect(
        orchestrator.status
    )
    .toBe(
        "INITIALIZED"
    );



});









test(
"Should attach boot manager",
() => {


    expect(

        orchestrator.attachBootManager(
            bootManager
        )

    )
    .toBe(true);



    expect(
        orchestrator.bootManager
    )
    .toBe(
        bootManager
    );



});









test(
"Should attach runtime supervisor",
() => {


    expect(

        orchestrator.attachSupervisor(
            supervisor
        )

    )
    .toBe(true);



    expect(
        orchestrator.supervisor
    )
    .toBe(
        supervisor
    );



});









test(
"Should reject missing dependencies",
() => {


    expect(

        () =>
        orchestrator.attachBootManager()

    )
    .toThrow();



    expect(

        () =>
        orchestrator.attachSupervisor()

    )
    .toThrow();



});









test(
"Should start complete runtime",
async () => {


    orchestrator.attachBootManager(
        bootManager
    );


    orchestrator.attachSupervisor(
        supervisor
    );



    const result =

        await orchestrator.start();



    expect(
        result
    )
    .toBe(true);



    expect(
        bootManager.boot
    )
    .toHaveBeenCalled();



    expect(
        supervisor.start
    )
    .toHaveBeenCalled();



    expect(
        orchestrator.status
    )
    .toBe(
        "OPERATIONAL"
    );



});









test(
"Should verify runtime state",
async () => {


    orchestrator.attachBootManager(
        bootManager
    );


    orchestrator.attachSupervisor(
        supervisor
    );



    const result =

        await orchestrator.verify();



    expect(
        result.boot.status
    )
    .toBe(
        "READY"
    );



    expect(
        result.runtime.status
    )
    .toBe(
        "HEALTHY"
    );



});









test(
"Should restart runtime",
async () => {


    orchestrator.attachBootManager(
        bootManager
    );


    orchestrator.attachSupervisor(
        supervisor
    );



    const result =

        await orchestrator.restart();



    expect(
        result
    )
    .toBe(true);



    expect(
        bootManager.restart
    )
    .toHaveBeenCalled();



    expect(
        supervisor.start
    )
    .toHaveBeenCalled();



    expect(
        orchestrator.status
    )
    .toBe(
        "OPERATIONAL"
    );



});









test(
"Should shutdown complete runtime",
async () => {


    orchestrator.attachBootManager(
        bootManager
    );


    orchestrator.attachSupervisor(
        supervisor
    );



    const result =

        await orchestrator.shutdown();



    expect(
        result
    )
    .toBe(true);



    expect(
        supervisor.shutdown
    )
    .toHaveBeenCalled();



    expect(
        bootManager.shutdown
    )
    .toHaveBeenCalled();



    expect(
        orchestrator.status
    )
    .toBe(
        "STOPPED"
    );



});









test(
"Should create runtime history",
() => {


    orchestrator.record(
        "TEST_EVENT"
    );



    expect(

        orchestrator
        .getHistory()
        .length

    )
    .toBe(1);



});









test(
"Should return orchestrator status",
() => {


    const status =

        orchestrator.getStatus();



    expect(
        status.name
    )
    .toBe(
        "SKOS Runtime Orchestrator"
    );



    expect(
        status.status
    )
    .toBe(
        "CREATED"
    );



});



});
