/**
 * SKOS History Manager Test
 *
 * TEST-ENG-HISTORY-001
 */


const HistoryManager =
require(
"../../../src/engines/sdkc-engine/history-manager"
);


test(
"History event should register",
()=>{


const history =
new HistoryManager();


const result =
history.addEvent(

"SKOS-KO-000001",

"TEST_EVENT"

);


expect(
result.event
)
.toBe(
"TEST_EVENT"
);


});
