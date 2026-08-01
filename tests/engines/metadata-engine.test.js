/**
 * SKOS Metadata Engine Test
 *
 * TEST-ENG-META-001
 */


const MetadataEngine =
require(
"../../src/engines/metadata-engine/metadata-engine"
);



describe(
"SKOS Metadata Engine Tests",
()=>{


let engine;



beforeEach(()=>{


engine =
new MetadataEngine();


engine.initialize();


});



test(
"Metadata engine initializes",
()=>{


expect(
engine.getStatus().status
)
.toBe(
"INITIALIZED"
);


});



test(
"Metadata should generate",
()=>{


const result =
engine.execute({

id:
"SKOS-KO-000001",

title:
"Hekmat Noor",

format:
"PDF"

});



expect(
result.object_id
)
.toBe(
"SKOS-KO-000001"
);


});



test(
"Metadata records stored",
()=>{


engine.execute({

id:
"001",

title:
"Test"

});



expect(
engine.getStatus().records
)
.toBe(
1
);


});


});
