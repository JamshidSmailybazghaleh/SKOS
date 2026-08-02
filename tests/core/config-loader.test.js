/**
 * SKOS Config Loader Test
 *
 * TEST-CORE-002
 */


const ConfigLoader =
require(
"../../src/core/config-loader"
);



describe(
"SKOS Config Loader Tests",
()=>{


let loader;



beforeEach(()=>{


loader =
new ConfigLoader();



loader.initialize();



});



test(
"Loader should initialize",
()=>{


expect(
loader.getStatus().status
)
.toBe(
"INITIALIZED"
);


});



test(
"Configuration should load",
()=>{


const config =
loader.load();



expect(
 config.system.name
)
.toBe(
 "SKOS"
);


});



test(
"Configuration should validate",
()=>{


loader.load();



expect(
loader.validate()
)
.toBe(
true
);


});



});
