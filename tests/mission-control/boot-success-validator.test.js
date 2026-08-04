/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Boot Success Validator
 * File      : boot-success-validator.test.js
 *
 * Build     : BUILD-000907.2
 * Version   : 1.0.0
 * ==========================================================
 */

const BootSuccessValidator =
require(
    "../../src/mission-control/boot-success-validator"
);


describe(
"SKOS Boot Success Validator Tests",
() => {


let validator;



beforeEach(
() => {

    validator =
        new BootSuccessValidator();

});




test(
"Should create validator",
() => {

    expect(
        validator
    )
    .toBeDefined();

    expect(
        validator.name
    )
    .toBe(
        "SKOS Boot Success Validator"
    );

});




test(
"Should initialize validator",
() => {

    expect(
        validator.initialize()
    )
    .toBe(true);

    expect(
        validator.status
    )
    .toBe(
        "INITIALIZED"
    );

});




test(
"Should reject empty report",
() => {

    expect(() =>

        validator.loadBootReport()

    )
    .toThrow();

});




test(
"Should load boot report",
() => {

    const report = {

        success: true

    };

    expect(

        validator.loadBootReport(
            report
        )

    )
    .toBe(true);

});




test(
"Should validate successful boot",
() => {

    validator.loadBootReport({

        success: true

    });

    const result =
        validator.validate();

    expect(
        result.success
    )
    .toBe(true);

    expect(
        result.status
    )
    .toBe(
        "SYSTEM_READY"
    );

    expect(
        validator.status
    )
    .toBe(
        "SYSTEM_READY"
    );

});




test(
"Should validate failed boot",
() => {

    validator.loadBootReport({

        success: false

    });

    const result =
        validator.validate();

    expect(
        result.success
    )
    .toBe(false);

    expect(
        result.status
    )
    .toBe(
        "SYSTEM_NOT_READY"
    );

});




test(
"Should publish success",
() => {

    validator.loadBootReport({

        success: true

    });

    validator.validate();

    const publish =
        validator.publish();

    expect(
        publish.message
    )
    .toBe(
        "SKOS BOOT SUCCESSFUL"
    );

});




test(
"Should publish failure",
() => {

    validator.loadBootReport({

        success: false

    });

    validator.validate();

    const publish =
        validator.publish();

    expect(
        publish.message
    )
    .toBe(
        "SKOS BOOT FAILED"
    );

});




test(
"Should reject publish before validation",
() => {

    expect(() =>

        validator.publish()

    )
    .toThrow();

});




test(
"Should return validation result",
() => {

    validator.loadBootReport({

        success: true

    });

    validator.validate();

    expect(

        validator.getValidation()

    )
    .not
    .toBeNull();

});




test(
"Should record history",
() => {

    validator.record(
        "TEST_EVENT"
    );

    expect(

        validator.getHistory()
        .length

    )
    .toBe(1);

});




test(
"Should reset validator",
() => {

    validator.loadBootReport({

        success: true

    });

    validator.validate();

    validator.reset();

    expect(
        validator.validation
    )
    .toBeNull();

    expect(
        validator.bootReport
    )
    .toBeNull();

    expect(
        validator.history.length
    )
    .toBe(0);

});




test(
"Should return validator status",
() => {

    const status =
        validator.getStatus();

    expect(
        status.name
    )
    .toBe(
        "SKOS Boot Success Validator"
    );

    expect(
        status.validated
    )
    .toBe(false);

});


});
