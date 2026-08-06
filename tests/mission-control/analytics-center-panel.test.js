/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Analytics Center Panel
 * File      : analytics-center-panel.test.js
 *
 * Build     : BUILD-000819.2
 * Version   : 1.0.0
 * ==========================================================
 */

const AnalyticsCenterPanel =
require(
"../../src/mission-control/analytics-center-panel"
);

describe(
"SKOS Analytics Center Panel Tests",
() => {

let panel;
let controller;
let source;

beforeEach(() => {

controller = {

getSnapshot:
jest.fn()
.mockReturnValue({

system:{

status:"READY",

version:"1.0.0"

}

})

};

source = {

getStatistics:
jest.fn()
.mockReturnValue({

count:10,

healthy:true

})

};

panel =
new AnalyticsCenterPanel();

});

test(
"Should create analytics panel",
() => {

expect(panel).toBeDefined();

expect(panel.name)
.toBe(
"Analytics Center Panel"
);

});

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
.toBe(
"INITIALIZED"
);

});

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
.toBe(
"CONNECTED"
);

});

test(
"Should reject missing controller",
() => {

expect(
()=>
panel.connectController()
)
.toThrow();

});

test(
"Should register analytics source",
() => {

expect(
panel.registerSource(
"MONITORING",
source
)
)
.toBe(true);

expect(
panel.sources.size
)
.toBe(1);

});

test(
"Should remove analytics source",
() => {

panel.registerSource(
"SRC",
source
);

expect(
panel.removeSource(
"SRC"
)
)
.toBe(true);

expect(
panel.sources.size
)
.toBe(0);

});

test(
"Should collect metrics",
() => {

panel.registerSource(
"MONITORING",
source
);

const metrics =
panel.collectMetrics();

expect(
metrics.MONITORING
)
.toBeDefined();

expect(
metrics.MONITORING.count
)
.toBe(10);

});

test(
"Should calculate KPIs",
() => {

panel.registerSource(
"A",
source
);

panel.collectMetrics();

const kpi =
panel.calculateKPIs();

expect(
kpi.totalSources
)
.toBe(1);

expect(
kpi.activeSources
)
.toBe(1);

});

test(
"Should generate executive summary",
() => {

panel.registerSource(
"A",
source
);

panel.collectMetrics();

panel.calculateKPIs();

const summary =
panel.generateExecutiveSummary();

expect(
summary.health
)
.toBe("READY");

});

test(
"Should generate snapshot",
() => {

panel.connectController(
controller
);

panel.registerSource(
"MONITORING",
test(
"Should generate snapshot",
() => {

    panel.connectController(
        controller
    );

    panel.registerSource(
        "MONITORING",
        source
    );

    panel.collectMetrics();

    const snapshot =
        panel.generateSnapshot();

    expect(
        snapshot
    )
    .toBeDefined();

});
