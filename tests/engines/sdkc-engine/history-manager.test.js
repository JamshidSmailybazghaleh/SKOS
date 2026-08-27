/**
 * SKOS History Manager Test
 *
 * TEST-ENG-HISTORY-001
 */


const fs = require("fs");
const os = require("os");
const path = require("path");

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

const testRoot =
fs.mkdtempSync(
    path.join(
        os.tmpdir(),
        "skos-history-test-"
    )
);

const repository =
new RepositoryManager({
    rootPath: path.join(
        testRoot,
        "repository",
        "objects"
    )
});

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
