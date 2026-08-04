/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Boot Manager
 * File      : boot-manager.test.js
 *
 * Build     : BUILD-000901.2
 * Version   : 1.0.0
 *
 * ==========================================================
 */


const BootManager =
require(
    "../../src/mission-control/boot-manager"
);


describe(
"SKOS Boot Manager Tests",
() => {


let manager;

let bootstrap;



beforeEach(
() => {


    manager =
        new BootManager();



    bootstrap = {


        status:
            "CREATED",



        executeAll:
            jest.fn()
            .mockResolvedValue(true),



        shutdown:
            jest.fn()
            .mockResolvedValue(true)


    };


});






test(
"Should create boot manager",
() => {


    expect(
        manager
    )
    .toBeDefined();



    expect(
        manager.name
    )
    .toBe(
        "SKOS Boot Manager"
    );



});









test(
"Should initialize boot manager",
() => {


    expect(

        manager.initialize()

    )
    .toBe(true);



    expect(

        manager.status

    )
    .toBe(
        "INITIALIZED"
    );



});









test(
"Should attach bootstrap sequence",
() => {


    expect(

        manager.attachBootstrap(
            bootstrap
        )

    )
    .toBe(true);



    expect(

        manager.bootstrap

    )
    .toBe(
        bootstrap
    );



});









test(
"Should reject missing bootstrap",
() => {


    expect(

        () =>
        manager.attachBootstrap()

    )
    .toThrow();



});









test(
"Should boot successfully",
async () => {


    manager.initialize();


    manager.attachBootstrap(
        bootstrap
    );



    const result =

        await manager.boot();



    expect(
        result
    )
    .toBe(true);



    expect(
        bootstrap.executeAll
    )
    .toHaveBeenCalled();



    expect(
        manager.status
    )
    .toBe(
        "READY"
    );



    expect(
        manager.bootCount
    )
    .toBe(1);



});









test(
"Should reject boot without bootstrap",
async () => {


    await expect(

        manager.boot()

    )
    .rejects
    .toThrow();



});









test(
"Should restart system",
async () => {


    manager.attachBootstrap(
        bootstrap
    );


    await manager.boot();



    const result =

        await manager.restart();



    expect(
        result
    )
    .toBe(true);



    expect(
        manager.status
    )
    .toBe(
        "READY"
    );



    expect(
        manager.bootCount
    )
    .toBe(2);



});









test(
"Should recover system",
async () => {


    manager.attachBootstrap(
        bootstrap
    );



    const result =

        await manager.recover();



    expect(
        result
    )
    .toBe(true);



    expect(
        bootstrap.executeAll
    )
    .toHaveBeenCalled();



});









test(
"Should perform health check",
async () => {


    manager.status =
        "READY";


    const health =

        await manager.healthCheck();



    expect(
        health.healthy
    )
    .toBe(true);



    expect(
        health.status
    )
    .toBe(
        "READY"
    );



});









test(
"Should shutdown correctly",
async () => {


    manager.attachBootstrap(
        bootstrap
    );



    const result =

        await manager.shutdown();



    expect(
        result
    )
    .toBe(true);



    expect(
        bootstrap.shutdown
    )
    .toHaveBeenCalled();



    expect(
        manager.status
    )
    .toBe(
        "STOPPED"
    );



});









test(
"Should record boot history",
async () => {


    manager.attachBootstrap(
        bootstrap
    );


    await manager.boot();



    expect(

        manager.getHistory()
        .length

    )
    .toBeGreaterThan(0);



});









test(
"Should reset manager",
() => {


    manager.bootCount =
        10;


    manager.history =
        [

            {
                event:
                "TEST"

            }

        ];



    expect(

        manager.reset()

    )
    .toBe(true);



    expect(
        manager.bootCount
    )
    .toBe(0);



    expect(
        manager.history.length
    )
    .toBe(0);



});









test(
"Should return manager state",
() => {


    const state =
        manager.getState();



    expect(
        state.name
    )
    .toBe(
        "SKOS Boot Manager"
    );



    expect(
        state.status
    )
    .toBe(
        "CREATED"
    );



});



});
