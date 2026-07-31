/**
 * SKOS Monitoring Engine Test
 *
 * TEST-ENG-MON-001
 */


const MonitoringEngine =
require(
"../../src/engines/monitoring-engine/monitoring-engine"
);



describe(
"SKOS Monitoring Engine Tests",
()=>{


let monitor;



beforeEach(()=>{


monitor =
new MonitoringEngine();


monitor.initialize();


});



test(
"Monitoring initializes",
()=>{


expect(
monitor.getStatus().status
)
.toBe(
"INITIALIZED"
);


});



test(
"Event should register",
()=>{


monitor.recordEvent(
"TEST_EVENT"
);



expect(
monitor.getStatus().events
)
.toBeGreaterThan(
0
);


});



test(
"Metrics should update",
()=>{


monitor.updateMetric(
"objectsReceived"
);



expect(
monitor.getHealth()
.metrics
.objectsReceived
)
.toBe(
1
);


});



test(
"Dashboard should generate",
()=>{


const dashboard =
monitor.getDashboard();



expect(
dashboard.system
)
.toBe(
"SKOS"
);


});


});
