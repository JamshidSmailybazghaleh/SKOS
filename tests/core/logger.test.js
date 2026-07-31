/**
 * SKOS Logger Test
 *
 * TEST-CORE-003
 */


const Logger =
require(
"../../src/core/logger"
);



describe(
"SKOS Logger Tests",
()=>{


let logger;



beforeEach(()=>{


logger =
new Logger();


logger.initialize();


});



test(
"Logger initializes",
()=>{


expect(
logger.getStatus().status
)
.toBe(
"INITIALIZED"
);


});



test(
"Logger writes info event",
()=>{


logger.info(
"TEST_EVENT"
);



expect(
logger.getLogs().length
)
.toBeGreaterThan(
0
);


});



test(
"Logger writes error",
()=>{


logger.error(
"SAMPLE_ERROR"
);



const logs =
logger.getLogs();



expect(
logs[1].level
)
.toBe(
"ERROR"
);


});



});
