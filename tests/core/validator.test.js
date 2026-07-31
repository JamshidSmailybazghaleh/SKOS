/**
 * SKOS Validator Test
 *
 * TEST-CORE-004
 */


const Validator =
require(
"../../src/core/validator"
);



describe(
"SKOS Validator Tests",
()=>{


let validator;



beforeEach(()=>{


validator =
new Validator();


validator.initialize();


});



test(
"Validator initializes",
()=>{


expect(
validator.getStatus().status
)
.toBe(
"INITIALIZED"
);


});



test(
"Valid object should pass",
()=>{


const result =
validator.validate({

id:
"SKOS-KO-000001",

title:
"Hekmat Noor"

});



expect(
result.valid
)
.toBe(
true
);


});



test(
"Invalid object should fail",
()=>{


const result =
validator.validate({

title:
"Hekmat Noor"

});



expect(
result.valid
)
.toBe(
false
);


});



test(
"Metadata validation works",
()=>{


const result =
validator.validateMetadata({

id:
"001",

title:
"Test",

format:
"PDF"

});



expect(
result.valid
)
.toBe(
true
);


});



});
