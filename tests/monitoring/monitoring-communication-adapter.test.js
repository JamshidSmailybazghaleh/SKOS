/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Monitoring Communication Adapter
 * File      : monitoring-communication-adapter.test.js
 *
 * Build     : BUILD-000807.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate bridge between communication
 * and monitoring services.
 *
 * ==========================================================
 */


const MonitoringCommunicationAdapter =
    require(
        "../../src/monitoring/monitoring-communication-adapter"
    );



describe(
    "SKOS Monitoring Communication Adapter Tests",
    () => {


        let adapter;


        let metricsCollector;


        let healthMonitor;


        let alertManager;


        let communicationHistory;




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

                }


            };



            healthMonitor = {


                updates: [],


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

                }


            };



            communicationHistory = {


                records: [],


                addRecord(

                    source,

                    event,

                    data

                ) {


                    this.records.push({

                        source,

                        event,

                        data

                    });


                }


            };



            adapter =

                new MonitoringCommunicationAdapter({

                    metricsCollector,

                    healthMonitor,

                    alertManager,

                    communicationHistory

                });


        });







        test(
            "Adapter should initialize",
            () => {


                expect(
                    adapter.initialize()
                )
                .toBe(true);



                expect(
                    adapter.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );







        test(
            "Should process communication event",
            () => {


                const event = {


                    type:
                        "MESSAGE_RECEIVED",


                    source:
                        "MESSAGE_BUS",


                    payload:
                        {

                            message:
                                "hello"

                        }

                };



                const result =

                    adapter.processEvent(

                        event

                    );



                expect(
                    result.processed
                )
                .toBe(true);



                expect(
                    adapter.getEvents()
                    .length
                )
                .toBe(1);


            }
        );







        test(
            "Should record communication history",
            () => {


                adapter.processEvent({

                    type:
                        "EVENT_TEST"

                });



                expect(

                    communicationHistory
                        .records
                        .length

                )
                .toBe(1);



                expect(

                    communicationHistory
                        .records[0]
                        .source

                )
                .toBe(
                    "MONITORING_ADAPTER"
                );


            }
        );







        test(
            "Should create communication metric",
            () => {


                adapter.processEvent({

                    type:
                        "REQUEST"

                });



                expect(
                    metricsCollector
                        .records
                        .length
                )
                .toBe(1);



                expect(
                    metricsCollector
                        .records[0]
                        .name
                )
                .toBe(
                    "COMMUNICATION_EVENTS"
                );


            }
        );







        test(
            "Should monitor component health",
            () => {


                const result =

                    adapter.monitorComponent(

                        "ENGINE-001",

                        "HEALTHY",

                        {

                            latency:
                                10

                        }

                    );



                expect(
                    result.state
                )
                .toBe(
                    "HEALTHY"
                );



                expect(
                    healthMonitor.updates.length
                )
                .toBe(1);


            }
        );







        test(
            "Should return false when health monitor unavailable",
            () => {


                const isolated =

                    new MonitoringCommunicationAdapter();



                expect(

                    isolated.monitorComponent(

                        "ENGINE",

                        "FAILED"

                    )

                )
                .toBe(false);


            }
        );







        test(
            "Should create alert through adapter",
            () => {


                const alert =

                    adapter.createAlert(

                        "CRITICAL",

                        "Engine failure",

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
            "Should return statistics",
            () => {


                adapter.processEvent({

                    type:
                        "EVENT"

                });



                const stats =

                    adapter.getStatistics();



                expect(
                    stats.events
                )
                .toBe(1);



                expect(
                    stats.metricsConnected
                )
                .toBe(true);



                expect(
                    stats.monitoringConnected
                )
                .toBe(true);



                expect(
                    stats.alertsConnected
                )
                .toBe(true);


            }
        );







        test(
            "Should return adapter status",
            () => {


                const status =

                    adapter.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Monitoring Communication Adapter"
                );



                expect(
                    status.version
                )
                .toBe(
                    "1.0.0"
                );


            }
        );







        test(
            "Should shutdown correctly",
            () => {


                adapter.initialize();



                expect(
                    adapter.shutdown()
                )
                .toBe(true);



                expect(
                    adapter.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
