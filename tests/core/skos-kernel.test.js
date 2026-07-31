const SKOSKernel =
require("../../src/core/skos-kernel");


test(
"SKOS Kernel initializes",
()=>{

    const kernel =
    new SKOSKernel();


    const result =
    kernel.initialize();


    expect(
        result.status
    )
    .toBe(
        "INITIALIZED"
    );

});
