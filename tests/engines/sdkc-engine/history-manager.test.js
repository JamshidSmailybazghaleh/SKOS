const HistoryManager =
require(
"../../../src/engines/sdkc-engine/history-manager"
);


test(
"History event should register",
()=>{


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
