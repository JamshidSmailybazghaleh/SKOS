/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Operational State Manager
 * File      : operational-state-manager.test.js
 *
 * Build     : BUILD-000904.2
 * Version   : 1.0.0
 *
 * ==========================================================
 */


const OperationalStateManager =
require(
    "../../src/mission-control/operational-state-manager"
);



describe(
"SKOS Operational State Manager Tests",
() => {


let manager;



beforeEach(
() => {


    manager =
        new OperationalStateManager();


});









test(
"Should create operational state manager",
() => {


    expect(
        manager
    )
    .toBeDefined();



    expect(
        manager.name
    )
    .toBe(
        "SKOS Operational State Manager"
    );



});









test(
"Should initialize state manager",
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
"Should set system state",
() => {


    expect(

        manager.setState(
            "system",
            "RUNNING"
        )

    )
    .toBe(true);



    expect(

        manager.getState()
        .system

    )
    .toBe(
        "RUNNING"
    );



});









test(
"Should register runtime component",
() => {


    expect(

        manager.registerComponent(

            "ENGINE-001",

            {

                status:
                "READY"

            }

        )

    )
    .toBe(true);



    expect(

        manager.components.size

    )
    .toBe(1);



});









test(
"Should update component state",
() => {


    manager.registerComponent(

        "ENGINE-001",

        {

            status:
            "STARTING"

        }

    );



    expect(

        manager.updateComponent(

            "ENGINE-001",

            "READY"

        )

    )
    .toBe(true);



    expect(

        manager.getComponent(
            "ENGINE-001"
        )
        .status

    )
    .toBe(
        "READY"
    );



});









test(
"Should reject unknown component update",
() => {


    expect(

        () =>
        manager.updateComponent(

            "UNKNOWN",

            "READY"

        )

    )
    .toThrow();



});









test(
"Should remove component",
() => {


    manager.registerComponent(

        "ENGINE-001"

    );



    expect(

        manager.removeComponent(
            "ENGINE-001"
        )

    )
    .toBe(true);



    expect(

        manager.components.size

    )
    .toBe(0);



});









test(
"Should report readiness",
() => {


    expect(

        manager.isReady()

    )
    .toBe(false);



    manager.setState(

        "readiness",

        true

    );



    expect(

        manager.isReady()

    )
    .toBe(true);



});









test(
"Should create operational snapshot",
() => {


    manager.setState(

        "system",

        "OPERATIONAL"

    );



    const snapshot =

        manager.createSnapshot();



    expect(
        snapshot.state.system
    )
    .toBe(
        "OPERATIONAL"
    );



    expect(

        manager.getSnapshots()
        .length

    )
    .toBe(1);



});









test(
"Should record operational events",
() => {


    manager.recordEvent(

        {

            type:
            "BOOT_COMPLETED"

        }

    );



    expect(

        manager.getHistory()
        .length

    )
    .toBe(1);



});









test(
"Should return components list",
() => {


    manager.registerComponent(

        "MONITORING",

        {

            status:
            "ACTIVE"

        }

    );



    const components =

        manager.getComponents();



    expect(
        components.length
    )
    .toBe(1);



    expect(
        components[0].id
    )
    .toBe(
        "MONITORING"
    );



});









test(
"Should reset state manager",
() => {


    manager.registerComponent(
        "TEST"
    );


    manager.createSnapshot();


    manager.recordEvent(
        "EVENT"
    );



    expect(

        manager.reset()

    )
    .toBe(true);



    expect(
        manager.components.size
    )
    .toBe(0);



    expect(
        manager.snapshots.length
    )
    .toBe(0);



});









test(
"Should shutdown state manager",
() => {


    expect(

        manager.shutdown()

    )
    .toBe(true);



    expect(
        manager.status
    )
    .toBe(
        "SHUTDOWN"
    );



});









test(
"Should return manager status",
() => {


    const status =

        manager.getStatus();



    expect(
        status.name
    )
    .toBe(
        "SKOS Operational State Manager"
    );



    expect(
        status.components
    )
    .toBe(0);



});



});
