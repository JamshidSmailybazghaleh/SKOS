/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Communication History
 * File      : communication-history.test.js
 *
 * Build     : BUILD-000806.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate SKOS communication history storage.
 *
 * ==========================================================
 */


const CommunicationHistory =
    require("../../src/communication/communication-history");



describe(
    "SKOS Communication History Tests",
    () => {


        let history;



        beforeEach(() => {


            history =
                new CommunicationHistory();


        });





        test(
            "Communication history should initialize",
            () => {


                expect(
                    history.initialize()
                )
                .toBe(true);



                expect(
                    history.status
                )
                .toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Should add communication record",
            () => {


                const record =
                    history.addRecord(

                        "API_GATEWAY",

                        "REQUEST_RECEIVED",

                        {

                            path:
                                "/status"

                        }

                    );



                expect(
                    record.id
                )
                .toMatch(
                    /^COMM-/
                );



                expect(
                    record.source
                )
                .toBe(
                    "API_GATEWAY"
                );



                expect(
                    history.getAll()
                    .length
                )
                .toBe(1);


            }
        );





        test(
            "Should retrieve record by id",
            () => {


                const record =
                    history.addRecord(

                        "MESSAGE_BUS",

                        "MESSAGE_SENT"

                    );



                const result =
                    history.getRecord(

                        record.id

                    );



                expect(
                    result.event
                )
                .toBe(
                    "MESSAGE_SENT"
                );


            }
        );





        test(
            "Should filter records by source",
            () => {


                history.addRecord(

                    "API_GATEWAY",

                    "REQUEST"

                );


                history.addRecord(

                    "MESSAGE_BUS",

                    "MESSAGE"

                );


                history.addRecord(

                    "API_GATEWAY",

                    "RESPONSE"

                );



                expect(

                    history.getBySource(

                        "API_GATEWAY"

                    ).length

                )
                .toBe(2);


            }
        );





        test(
            "Should filter records by event",
            () => {


                history.addRecord(

                    "ENGINE",

                    "ENGINE_STARTED"

                );


                history.addRecord(

                    "ENGINE",

                    "ENGINE_STOPPED"

                );


                history.addRecord(

                    "SYSTEM",

                    "ENGINE_STARTED"

                );



                expect(

                    history.getByEvent(

                        "ENGINE_STARTED"

                    ).length

                )
                .toBe(2);


            }
        );





        test(
            "Should search communication history",
            () => {


                history.addRecord(

                    "API_GATEWAY",

                    "USER_LOGIN",

                    {

                        user:
                            "ADMIN"

                    }

                );



                const result =
                    history.search(

                        "ADMIN"

                    );



                expect(
                    result.length
                )
                .toBe(1);


            }
        );





        test(
            "Should return latest records",
            () => {


                history.addRecord(

                    "A",

                    "EVENT_A"

                );


                history.addRecord(

                    "B",

                    "EVENT_B"

                );


                history.addRecord(

                    "C",

                    "EVENT_C"

                );



                const latest =
                    history.getLatest(2);



                expect(
                    latest.length
                )
                .toBe(2);



                expect(
                    latest[1].event
                )
                .toBe(
                    "EVENT_C"
                );


            }
        );





        test(
            "Should respect maximum capacity",
            () => {


                const limitedHistory =
                    new CommunicationHistory({

                        maxRecords:
                            2

                    });



                limitedHistory.addRecord(

                    "A",

                    "ONE"

                );


                limitedHistory.addRecord(

                    "B",

                    "TWO"

                );


                limitedHistory.addRecord(

                    "C",

                    "THREE"

                );



                expect(
                    limitedHistory.getAll()
                    .length
                )
                .toBe(2);



                expect(
                    limitedHistory.getAll()[0].event
                )
                .toBe(
                    "TWO"
                );


            }
        );





        test(
            "Should clear history",
            () => {


                history.addRecord(

                    "SYSTEM",

                    "TEST"

                );


                expect(
                    history.clear()
                )
                .toBe(true);



                expect(
                    history.getAll()
                    .length
                )
                .toBe(0);


            }
        );





        test(
            "Should return statistics",
            () => {


                history.addRecord(

                    "API",

                    "REQUEST"

                );


                history.addRecord(

                    "BUS",

                    "MESSAGE"

                );



                const stats =
                    history.getStatistics();



                expect(
                    stats.totalRecords
                )
                .toBe(2);



                expect(
                    stats.sources
                )
                .toBe(2);


            }
        );





        test(
            "Should return history status",
            () => {


                const status =
                    history.getStatus();



                expect(
                    status.name
                )
                .toBe(
                    "Communication History"
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


                history.initialize();



                expect(
                    history.shutdown()
                )
                .toBe(true);



                expect(
                    history.status
                )
                .toBe(
                    "SHUTDOWN"
                );


            }
        );


    }
);
