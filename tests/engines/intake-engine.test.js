/**
 * SKOS Intake Engine Test
 *
 * TEST-ENG-INTAKE-001
 */


const IntakeEngine =
require(
"../../src/engines/intake-engine/intake-engine"
);



describe(
"SKOS Intake Engine Tests",
()=>{


let engine;



beforeEach(()=>{


engine =
new IntakeEngine();


engine.initialize();


});



test(
"Engine initializes",
()=>{


expect(
engine.getStatus().status
)
.toBe(
"INITIALIZED"
);


});



test(
"Engine receives object",
()=>{


const result =
engine.execute({

title:
"Hekmat Noor",

id:
"001"

});



expect(
result.status
)
.toBe(
"RECEIVED"
);


});



test(
"Queue stores object",
()=>{


engine.execute({

id:
"001",

title:
"Test"

});



expect(
engine.getQueue().length
)
.toBe(
1
);


});


});
