/**
 * SKOS History Manager Test
 *
 * TEST-ENG-HISTORY-001
 */


const HistoryManager =
require(
"../../../src/engines/sdkc-engine/history-manager"
);


const RepositoryManager =
require(
"../../../src/engines/sdkc-engine/repository-manager"
);



test(
"History event should register",
()=>{


const repository =
new RepositoryManager();


repository.initialize();



const history =
new HistoryManager(
    repository
);



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
