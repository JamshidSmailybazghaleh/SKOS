/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Boot Integration
 * File      : boot-integration.test.js
 *
 * Build     : BUILD-000900.5
 * Version   : 1.0.0
 *
 * Mission:
 * Validate complete SKOS startup sequence.
 *
 * ==========================================================
 */


const MissionControlKernel =
require(
    "../../src/mission-control/mission-control-kernel"
);


const PanelRegistry =
require(
    "../../src/mission-control/panel-registry"
);


const EngineRegistry =
require(
    "../../src/mission-control/engine-registry"
);


const BootstrapSequence =
require(
    "../../src/mission-control/bootstrap-sequence"
);



describe(
"SKOS Boot Integration Tests",
() => {


let kernel;

let panelRegistry;

let engineRegistry;

let bootstrap;



beforeEach(
() => {


    kernel =
        new MissionControlKernel();


    panelRegistry =
        new PanelRegistry();


    engineRegistry =
        new EngineRegistry();


    bootstrap =
        new BootstrapSequence();


});





test(
"Should initialize SKOS boot infrastructure",
() => {


    expect(
        kernel.initialize()
    )
    .toBe(true);



    expect(
        panelRegistry.initialize()
    )
    .toBe(true);



    expect(
        engineRegistry.initialize()
    )
    .toBe(true);



    expect(
        bootstrap.initialize()
    )
    .toBe(true);



});







test(
"Should register Mission Control panels",
() => {


    const panels = [

        {
            name:
            "Executive Status Panel",

            initialize:
            jest.fn()

        },


        {
            name:
            "Analytics Center Panel",

            initialize:
            jest.fn()

        }

    ];



    panels.forEach(

        panel =>

            panelRegistry.register(panel)

    );



    expect(

        panelRegistry.getCount()

    )
    .toBe(2);



    expect(

        panelRegistry.exists(
            "Executive Status Panel"
        )

    )
    .toBe(true);



});









test(
"Should register SKOS engines",
() => {


    const engines = [

        {

            name:
            "Monitoring Engine",

            initialize:
            jest.fn(),

            shutdown:
            jest.fn()

        },


        {

            name:
            "Communication Engine",

            initialize:
            jest.fn(),

            shutdown:
            jest.fn()

        }

    ];



    engines.forEach(

        engine =>

            engineRegistry.register(engine)

    );



    expect(

        engineRegistry.getCount()

    )
    .toBe(2);



});









test(
"Should validate complete registry state",
() => {


    panelRegistry.register({

        name:
        "Test Panel",

        initialize:
        jest.fn()

    });



    engineRegistry.register({

        name:
        "Test Engine",

        initialize:
        jest.fn()

    });



    expect(

        panelRegistry.validate()
        .valid

    )
    .toBe(true);



    expect(

        engineRegistry.validate()
        .valid

    )
    .toBe(true);



});









test(
"Should execute ordered bootstrap sequence",
async () => {


    const execution = [];



    bootstrap.registerStep(

        "Kernel",

        async () => {

            execution.push(
                "Kernel"
            );

        },

        1

    );



    bootstrap.registerStep(

        "Registry",

        async () => {

            execution.push(
                "Registry"
            );

        },

        2

    );



    bootstrap.registerStep(

        "Runtime",

        async () => {

            execution.push(
                "Runtime"
            );

        },

        3

    );




    await bootstrap.executeAll();



    expect(

        execution

    )
    .toEqual([

        "Kernel",

        "Registry",

        "Runtime"

    ]);



    expect(

        bootstrap.status

    )
    .toBe(
        "READY"
    );



});









test(
"Should boot complete SKOS environment",
async () => {



    const panel = {

        name:
        "Mission Panel",

        initialize:
        jest.fn()

    };



    const engine = {

        name:
        "Core Engine",

        initialize:
        jest.fn(),

        shutdown:
        jest.fn()

    };




    panelRegistry.register(panel);


    engineRegistry.register(engine);




    bootstrap.registerStep(

        "Panels",

        async () => {

            await panelRegistry
            .loadAll();

        }

    );




    bootstrap.registerStep(

        "Engines",

        async () => {

            await engineRegistry
            .startAll();

        }

    );




    const result =

        await bootstrap.executeAll();




    expect(result)
    .toBe(true);



    expect(

        bootstrap
        .getBootStatus()
        .status

    )
    .toBe(
        "READY"
    );



});









test(
"Should create boot history",
async () => {


    bootstrap.initialize();


    bootstrap.registerStep(

        "TEST",

        async()=>{}

    );


    await bootstrap.executeAll();



    expect(

        bootstrap.getHistory()
        .length

    )
    .toBeGreaterThan(0);



});









test(
"Should shutdown registered engines",
async () => {


    const engine = {


        name:
        "Shutdown Engine",


        initialize:
        jest.fn(),


        shutdown:
        jest.fn()

    };



    engineRegistry.register(engine);



    await engineRegistry.stopAll();



    expect(

        engine.shutdown

    )
    .toHaveBeenCalled();



});









test(
"Should expose kernel status",
() => {


    const status =
        kernel.getStatus();



    expect(
        status.name
    )
    .toBe(
        "Mission Control Kernel"
    );



});





});
