/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Operational Boot Sequence
 * File      : operational-boot-sequence.test.js
 *
 * Build     : BUILD-000906.2
 * Version   : 1.0.0
 *
 * ==========================================================
 */


const OperationalBootSequence =
require(
    "../../src/mission-control/operational-boot-sequence"
);



describe(
"SKOS Operational Boot Sequence Tests",
() => {


let sequence;

let bootManager;

let orchestrator;

let verifier;



beforeEach(
() => {


    sequence =
        new OperationalBootSequence();



    bootManager = {


        boot:
        jest.fn()
        .mockResolvedValue(true)


    };



    orchestrator = {


        start:
        jest.fn()
        .mockResolvedValue(true)


    };



    verifier = {


        verify:
        jest.fn()
        .mockReturnValue({

            success:
            true,


            checks:
            {

                kernel:
                true,


                runtime:
                true,


                state:
                true

            }

        })

    };


});









test(
"Should create operational boot sequence",
() => {


    expect(
        sequence
    )
    .toBeDefined();



    expect(
        sequence.name
    )
    .toBe(
        "SKOS Operational Boot Sequence"
    );



});









test(
"Should initialize boot sequence",
() => {


    expect(

        sequence.initialize()

    )
    .toBe(true);



    expect(
        sequence.status
    )
    .toBe(
        "INITIALIZED"
    );



});









test(
"Should attach boot manager",
() => {


    expect(

        sequence.attachBootManager(
            bootManager
        )

    )
    .toBe(true);



    expect(
        sequence.bootManager
    )
    .toBe(
        bootManager
    );



});









test(
"Should attach runtime orchestrator",
() => {


    expect(

        sequence.attachOrchestrator(
            orchestrator
        )

    )
    .toBe(true);



    expect(
        sequence.orchestrator
    )
    .toBe(
        orchestrator
    );



});









test(
"Should attach verifier",
() => {


    expect(

        sequence.attachVerifier(
            verifier
        )

    )
    .toBe(true);



    expect(
        sequence.verifier
    )
    .toBe(
        verifier
    );



});









test(
"Should reject missing dependencies",
() => {


    expect(

        () =>
        sequence.attachBootManager()

    )
    .toThrow();



    expect(

        () =>
        sequence.attachOrchestrator()

    )
    .toThrow();



    expect(

        () =>
        sequence.attachVerifier()

    )
    .toThrow();



});









test(
"Should execute successful operational boot",
async () => {


    sequence.attachBootManager(
        bootManager
    );


    sequence.attachOrchestrator(
        orchestrator
    );


    sequence.attachVerifier(
        verifier
    );



    const result =

        await sequence.execute();



    expect(
        result.success
    )
    .toBe(true);



    expect(
        bootManager.boot
    )
    .toHaveBeenCalled();



    expect(
        orchestrator.start
    )
    .toHaveBeenCalled();



    expect(
        verifier.verify
    )
    .toHaveBeenCalled();



    expect(
        sequence.status
    )
    .toBe(
        "BOOT_SUCCESSFUL"
    );



});









test(
"Should generate boot report",
async () => {


    sequence.attachVerifier(
        verifier
    );



    const report =

        await sequence.execute();



    expect(
        report.steps.length
    )
    .toBeGreaterThan(0);



    expect(
        report.completed
    )
    .toBeDefined();



});









test(
"Should detect boot failure",
async () => {


    verifier.verify =
        jest.fn()
        .mockReturnValue({

            success:
            false,


            checks:
            {

                kernel:
                false,

                runtime:
                false,

                state:
                false

            }

        });



    sequence.attachVerifier(
        verifier
    );



    const result =

        await sequence.execute();



    expect(
        result.success
    )
    .toBe(false);



    expect(
        sequence.status
    )
    .toBe(
        "BOOT_FAILED"
    );



});









test(
"Should handle boot exception",
async () => {


    bootManager.boot =
        jest.fn()
        .mockRejectedValue(
            new Error(
                "Boot Error"
            )
        );



    sequence.attachBootManager(
        bootManager
    );



    const result =

        await sequence.execute();



    expect(
        result.success
    )
    .toBe(false);



    expect(
        sequence.status
    )
    .toBe(
        "BOOT_FAILED"
    );



});









test(
"Should return last boot report",
async () => {


    sequence.attachVerifier(
        verifier
    );



    await sequence.execute();



    const report =

        sequence.getReport();



    expect(
        report
    )
    .not
    .toBeNull();



});









test(
"Should record boot history",
() => {


    sequence.record(
        "TEST_EVENT"
    );



    expect(

        sequence.getHistory()
        .length

    )
    .toBe(1);



});









test(
"Should reset boot sequence",
() => {


    sequence.record(
        "EVENT"
    );


    sequence.lastReport =
        {};



    expect(

        sequence.reset()

    )
    .toBe(true);



    expect(
        sequence.history.length
    )
    .toBe(0);



    expect(
        sequence.lastReport
    )
    .toBeNull();



});









test(
"Should return sequence status",
() => {


    const status =

        sequence.getStatus();



    expect(
        status.name
    )
    .toBe(
        "SKOS Operational Boot Sequence"
    );



    expect(
        status.status
    )
    .toBe(
        "CREATED"
    );



});



});
