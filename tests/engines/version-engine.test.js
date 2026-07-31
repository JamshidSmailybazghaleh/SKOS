/**
 * SKOS Version Engine Test
 *
 * TEST-ENG-VERSION-001
 */


const VersionEngine =
require(
"../../src/engines/version-engine/version-engine"
);



describe(
"SKOS Version Engine Tests",
()=>{


let engine;



beforeEach(()=>{


engine =
new VersionEngine();


engine.initialize();


});



test(
"Version engine initializes",
()=>{


expect(
engine.getStatus().status
)
.toBe(
"INITIALIZED"
);


});



test(
"Creates first version",
()=>{


const result =
engine.createVersion(

"SKOS-KO-000001",

{
title:
"Hekmat Noor"
}

);



expect(
result.version
)
.toBe(
"1.0.0"
);


});



test(
"Updates version",
()=>{


engine.createVersion(

"SKOS-KO-000001",

{
title:
"First"
}

);



const result =
engine.updateVersion(

"SKOS-KO-000001",

{
title:
"Updated"
}

);



expect(
result.version
)
.toBe(
"1.1.0"
);


});



});
