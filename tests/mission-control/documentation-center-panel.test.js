/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Documentation Center Panel
 * File      : documentation-center-panel.test.js
 *
 * Build     : BUILD-000818.2
 * Version   : 1.0.0
 * ==========================================================
 */

const DocumentationCenterPanel =
require("../../src/mission-control/documentation-center-panel");

describe(
"SKOS Documentation Center Panel Tests",
() => {

let panel;
let controller;

beforeEach(() => {

controller = {

getSnapshot:

jest.fn().mockReturnValue({

system:{

status:"READY"

}

})

};

panel =
new DocumentationCenterPanel();

});

test(
"Should create panel",
() => {

expect(panel).toBeDefined();

expect(panel.name)
.toBe(
"Documentation Center Panel"
);

}
);

test(
"Should initialize",
() => {

expect(
panel.initialize()
)
.toBe(true);

expect(
panel.status
)
.toBe("INITIALIZED");

}
);

test(
"Should connect controller",
() => {

expect(
panel.connectController(
controller
)
)
.toBe(true);

expect(
panel.status
)
.toBe("CONNECTED");

}
);

test(
"Should reject null controller",
() => {

expect(
() =>
panel.connectController()
)
.toThrow();

}
);

test(
"Should register category",
() => {

const category =

panel.registerCategory(
"ARCH",
{
name:
"Architecture"
}
);

expect(
category.id
)
.toBe("ARCH");

expect(
panel.getCategories()
.length
)
.toBe(1);

}
);

test(
"Should reject invalid category",
() => {

expect(
() =>
panel.registerCategory()
)
.toThrow();

}
);

test(
"Should add document",
() => {

const document =

panel.addDocument(

"RAD-001",

{

title:
"Reference Architecture",

type:
"ARCHITECTURE",

category:
"ARCH"

}

);

expect(
document.id
)
.toBe("RAD-001");

expect(
panel.getDocuments()
.length
)
.toBe(1);

}
);

test(
"Should reject invalid document",
() => {

expect(
() =>
panel.addDocument()
)
.toThrow();

}
);

test(
"Should update document status",
() => {

panel.addDocument(
"DOC-001"
);

const result =

panel.updateDocumentStatus(

"DOC-001",

"ARCHIVED"

);

expect(
result.status
)
.toBe("ARCHIVED");

}
);

test(
"Should reject unknown document",
() => {

expect(
() =>
panel.updateDocumentStatus(
"UNKNOWN",
"ACTIVE"
)
)
.toThrow();

}
);

test(
"Should filter by type",
() => {

panel.addDocument(
"DOC-1",
{
type:"POLICY"
}
);

panel.addDocument(
"DOC-2",
{
type:"STANDARD"
}
);

expect(
panel
.getDocumentsByType(
"POLICY"
)
.length
)
.toBe(1);

}
);

test(
"Should generate documentation view",
() => {

panel.connectController(
controller
);

panel.registerCategory(
"STD"
);

panel.addDocument(
"SAS-001"
);

const view =
panel.generateView();

expect(
view.documents.length
)
.toBe(1);

expect(
view.categories.length
)
.toBe(1);

expect(
view.runtime.status
)
.toBe("READY");

}
);

test(
"Should refresh snapshot",
() => {

panel.connectController(
controller
);

const snapshot =
panel.refresh();

expect(
snapshot
)
.toBeDefined();

expect(
panel.getSnapshot()
)
.toBe(snapshot);

}
);

test(
"Should maintain history",
() => {

panel.initialize();

expect(
panel.getHistory()
.length
)
.toBeGreaterThan(0);

}
);

test(
"Should return status",
() => {

const status =
panel.getStatus();

expect(
status.name
)
.toBe(
"Documentation Center Panel"
);

expect(
status.version
)
.toBe("1.0.0");

}
);

test(
"Should shutdown",
() => {

panel.initialize();

expect(
panel.shutdown()
)
.toBe(true);

expect(
panel.status
)
.toBe("SHUTDOWN");

}
);

});
