/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Monitoring Runtime
 * File : monitoring-runtime.test.js
 *
 * Build : BUILD-000808.3
 * Version : 2.0.0
 *
 * Mission:
 * Validate unified monitoring orchestration,
 * service integration and operational reporting.
 *
 * ==========================================================
 */


const MonitoringRuntime =
    require("../../src/monitoring/monitoring-runtime");



describe(
    "SKOS Monitoring Runtime Tests",
    () => {


        let monitoring;

        let monitor;

        let metricsCollector;

        let healthMonitor;

        let alertManager;

        let communicationAdapter;



        beforeEach(() => {



            metricsCollector = {


                records: [],



                record(

                    name,

                    value

                ) {


                    this.records.push({

                        name,

                        value

                    });


                    return true;

                },



                getStatistics() {


                    return {

                        registeredMetrics:
                            this.records.length

                    };

                }


            };





            healthMonitor = {


                updates: [],



                registerComponent:

                    jest.fn()
                    .mockReturnValue(true),



                updateHealth(

                    component,

                    state,

                    details

                ) {


                    const result = {


                        component,

                        state,

                        details

                    };



                    this.updates.push(

                        result

                    );


                    return result;

                },



                getStatistics() {


                    return {


                        registeredComponents:
                            1,


                        healthChecks:
                            this.updates.length

                    };

                }


            };





            alertManager = {


                alerts: [],



                createAlert(

                    severity,

                    message,

                    metadata

                ) {


                    const alert = {


                        severity,

                        message,

                        metadata

                    };


                    this.alerts.push(

                        alert

                    );


                    return alert;

                },



                getStatistics() {


                    return {

                        totalAlerts:
                            this.alerts.length

                    };

                }


            };





            communicationAdapter = {


                events: [],



                processEvent(

                    event

                ) {


                    this.events.push(

                        event

                    );


                    return {


                        processed:
                            true

                    };

                }


            };





            monitoring =

                new MonitoringRuntime({

                    metricsCollector,

                    healthMonitor,

                    alertManager,

                    communicationAdapter

                });





            monitor = {


                name:
                    "Mock Health Monitor",



                start:

                    jest.fn()
                    .mockResolvedValue(true),



                collect:

                    jest.fn()
                    .mockResolvedValue({

                        cpu:
                            20,

                        memory:
                            40

                    }),



                health:

                    jest.fn()
                    .mockResolvedValue(
                        "HEALTHY"
                    ),



                shutdown:

                    jest.fn()
                    .mockResolvedValue(true)


            };


        });







        test(
            "Should create monitoring runtime",
            () => {


                expect(
                    monitoring
                )
                .toBeDefined();



                expect(
                    monitoring.name
                )
                .toBe(
                    "SKOS Monitoring Runtime"
                );


            }
        );







        test(
            "Should initialize runtime",
            () => {


                expect(

                    monitoring.initialize()

                )
                .toBe(true);



                expect(
                    monitoring.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );







        test(
            "Should register monitor",
            () => {


                expect(

                    monitoring.registerMonitor(
                        monitor
                    )

                )
                .toBe(true);



                expect(

                    monitoring.monitors.length

                )
                .toBe(1);


            }
        );







        test(
            "Should reject empty monitor",
            () => {


                expect(

                    () =>
                        monitoring.registerMonitor()

                )
                .toThrow();


            }
        );







        test(
            "Should start monitoring runtime",
            async () => {


                monitoring.registerMonitor(

                    monitor

                );



                await monitoring.start();



                expect(

                    monitor.start

                )
                .toHaveBeenCalled();



                expect(

                    monitoring.status

                )
                .toBe(
                    "READY"
                );


            }
        );







        test(
            "Should collect monitor data",
            async () => {


                monitoring.registerMonitor(

                    monitor

                );



                const metrics =

                    await monitoring.collect();



                expect(

                    metrics["Mock Health Monitor"]

                )
                .toBeDefined();



                expect(

                    metrics["Mock Health Monitor"]
                        .cpu

                )
                .toBe(20);


            }
        );







        test(
            "Should integrate with metrics collector",
            async () => {


                monitoring.registerMonitor(

                    monitor

                );



                await monitoring.collect();



                expect(

                    metricsCollector.records.length

                )
                .toBe(1);


            }
        );







        test(
            "Should perform health check",
            async () => {


                monitoring.registerMonitor(

                    monitor

                );



                const result =

                    await monitoring.healthCheck();



                expect(
                    result.length
                )
                .toBe(1);



                expect(

                    result[0].status

                )
                .toBe(
                    "HEALTHY"
                );


            }
        );







        test(
            "Should create alert through runtime",
            () => {


                const alert =

                    monitoring.createAlert(

                        "CRITICAL",

                        "Engine Failure",

                        {

                            engine:
                                "Reasoning"

                        }

                    );



                expect(

                    alert.severity

                )
                .toBe(
                    "CRITICAL"
                );



                expect(

                    alertManager.alerts.length

                )
                .toBe(1);


            }
        );







        test(
            "Should process communication events",
            () => {


                const result =

                    monitoring.processEvent({

                        type:
                            "MESSAGE_RECEIVED"

                    });



                expect(

                    result.processed

                )
                .toBe(true);



                expect(

                    communicationAdapter.events.length

                )
                .toBe(1);


            }
        );







        test(
            "Should record runtime events",
            () => {


                monitoring.recordEvent({

                    type:
                        "TEST_EVENT"

                });



                expect(

                    monitoring.getEvents().length

                )
                .toBe(1);


            }
        );







        test(
            "Should generate operational report",
            () => {


                const report =

                    monitoring.generateOperationalReport();



                expect(

                    report.runtime

                )
                .toBeDefined();



                expect(

                    report.metrics

                )
                .toBeDefined();



                expect(

                    report.health

                )
                .toBeDefined();



                expect(

                    report.alerts

                )
                .toBeDefined();


            }
        );







        test(
            "Should return history",
            () => {


                monitoring.initialize();



                expect(

                    monitoring.getHistory().length

                )
                .toBeGreaterThan(0);


            }
        );







        test(
            "Should shutdown monitoring runtime",
            async () => {


                monitoring.registerMonitor(

                    monitor

                );



                await monitoring.shutdown();



                expect(

                    monitor.shutdown

                )
                .toHaveBeenCalled();



                expect(

                    monitoring.status

                )
                .toBe(
                    "STOPPED"
                );


            }
        );







        test(
            "Should return runtime status",
            () => {


                const status =

                    monitoring.getStatus();



                expect(

                    status.name

                )
                .toBe(
                    "SKOS Monitoring Runtime"
                );



                expect(

                    status.version

                )
                .toBe(
                    "2.0.0"
                );


            }
        );



    }
);
