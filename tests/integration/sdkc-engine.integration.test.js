/**
 * ==========================================================
 * SKOS
 * SDKC + Monitoring Integration Test
 * ==========================================================
 *
 * Test ID : TEST-INT-004
 * Build   : BUILD-000004.1
 * Version : 1.0.0
 * ==========================================================
 */

const SDKCEngine =
require(
"../../src/engines/sdkc-engine/sdkc-engine"
);

const MonitoringEngine =
require(
"../../src/engines/monitoring-engine/monitoring-engine"
);


describe(
"SDKC Monitoring Integration",
()=>{


let monitoring;

let sdkc;


beforeEach(()=>{


monitoring =
new MonitoringEngine();

monitoring.initialize();


sdkc =
new SDKCEngine({

monitoring

});

sdkc.initialize();


});


test(
"SDKC should report stored object",
()=>{


sdkc.store({

id:
"SKOS-KO-000001",

title:
"Knowledge Object"

});


expect(

monitoring.metrics.objectsStored

)

.toBe(1);


});


test(
"SDKC should report retrieve event",
()=>{


sdkc.store({

id:
"SKOS-KO-000001"

});


sdkc.retrieve(

"SKOS-KO-000001"

);


const event =

monitoring
.getEvents()

.find(

e =>

e.name ===

"SDKC_OBJECT_RETRIEVED"

);


expect(

event

)

.toBeDefined();


});


test(
"SDKC should report remove event",
()=>{


sdkc.store({

id:
"SKOS-KO-000001"

});


sdkc.remove(

"SKOS-KO-000001"

);


const event =

monitoring
.getEvents()

.find(

e =>

e.name ===

"SDKC_OBJECT_REMOVED"

);


expect(

event

)

.toBeDefined();


});


test(
"Monitoring dashboard should contain SDKC metrics",
()=>{


sdkc.store({

id:
"SKOS-KO-000001"

});


const dashboard =

monitoring
.getDashboard();


expect(

dashboard.metrics.objectsStored

)

.toBe(1);


});


});
