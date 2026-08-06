/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : SKOS End-to-End Boot
 * File      : skos.test.js
 *
 * Build     : BUILD-000908.3
 * Version   : 1.0.0
 *
 * ==========================================================
 */

const SKOS =
require("../src/skos");


describe(
"SKOS End-to-End Boot Tests",
() => {




test(
"Should create SKOS instance",
() => {

    expect(SKOS)
    .toBeDefined();

    expect(SKOS.name)
    .toBe(
        "Smaily Knowledge Operating System"
    );

});





test(
"Should initialize successfully",
async () => {

    const result =
        await SKOS.initialize();

    expect(result)
    .toBe(true);

});





test(
"Should perform full boot sequence",
async () => {

    const report =
        await SKOS.start();

    expect(report)
    .toBeDefined();

    expect(report.success)
    .toBe(true);

});






test(
"Should become operational",
() => {

    const status =
        SKOS.getStatus();

    expect(status.status)
    .toBe(
        "RUNNING"
    );

});







test(
"Should expose version",
() => {

    const status =
        SKOS.getStatus();

    expect(status.version)
    .toBe(
        "1.0.0"
    );

});







test(
"Should expose build",
() => {

    const status =
        skos.getStatus();


    expect(
        status.build
    )
    .toBeDefined();


    expect(
        status.build
    )
    .toMatch(
        /^BUILD-\d{6}\.\d+$/
    );

});








test(
"Should shutdown successfully",
async () => {

    const result =
        await SKOS.shutdown();

    expect(result)
    .toBe(true);

});







test(
"Should stop runtime",
() => {

    const status =
        SKOS.getStatus();

    expect(status.status)
    .toBe(
        "STOPPED"
    );

});



});
