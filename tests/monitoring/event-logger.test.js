/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Event Logger
 * File      : event-logger.test.js
 *
 * Build     : BUILD-000439
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

const EventLogger =
    require("../../src/monitoring/event-logger");


describe(
    "SKOS Event Logger Tests",
    () => {

        let logger;

        beforeEach(() => {

            logger =
                new EventLogger();

        });


        test(
            "Logger should initialize",
            () => {

                expect(
                    logger.initialize()
                ).toBe(true);

                expect(
                    logger.status
                ).toBe("INITIALIZED");

            }
        );


        test(
            "Should log event",
            () => {

                const record =
                    logger.log(
                        "ENGINE_START",
                        "SYSTEM",
                        {
                            version: "1.0.0"
                        }
                    );

                expect(
                    record.event
                ).toBe("ENGINE_START");

                expect(
                    logger.getAll().length
                ).toBe(2); // LOGGER_INITIALIZED + ENGINE_START

            }
        );


        test(
            "Should retrieve event by id",
            () => {

                const record =
                    logger.log(
                        "EVENT_A",
                        "ENGINE"
                    );

                expect(
                    logger.getById(
                        record.id
                    ).event
                ).toBe("EVENT_A");

            }
        );


        test(
            "Should retrieve events by type",
            () => {

                logger.log(
                    "TYPE_A",
                    "ENGINE"
                );

                logger.log(
                    "TYPE_A",
                    "SYSTEM"
                );

                expect(
                    logger.getByEvent(
                        "TYPE_A"
                    ).length
                ).toBe(2);

            }
        );


        test(
            "Should retrieve events by source",
            () => {

                logger.log(
                    "EVENT",
                    "ENGINE_A"
                );

                logger.log(
                    "EVENT",
                    "ENGINE_B"
                );

                expect(
                    logger.getBySource(
                        "ENGINE_A"
                    ).length
                ).toBe(1);

            }
        );


        test(
            "Should retrieve events in date range",
            () => {

                logger.log(
                    "DATE_EVENT",
                    "SYSTEM"
                );

                const from =
                    new Date(
                        Date.now() - 1000
                    );

                const to =
                    new Date(
                        Date.now() + 1000
                    );

                expect(
                    logger.getBetween(
                        from,
                        to
                    ).length
                ).toBeGreaterThan(0);

            }
        );


        test(
            "Should search events",
            () => {

                logger.log(
                    "SEARCH_EVENT",
                    "ENGINE"
                );

                const result =
                    logger.search(

                        item =>

                            item.source ===
                            "ENGINE"

                    );

                expect(
                    result.length
                ).toBeGreaterThan(0);

            }
        );


        test(
            "Should export events",
            () => {

                const exported =
                    logger.export();

                expect(
                    typeof exported
                ).toBe("string");

            }
        );


        test(
            "Should clear events",
            () => {

                logger.log(
                    "CLEAR_TEST",
                    "SYSTEM"
                );

                logger.clear();

                expect(
                    logger.getAll().length
                ).toBe(0);

            }
        );


        test(
            "Should return statistics",
            () => {

                logger.log(
                    "STAT_EVENT",
                    "ENGINE"
                );

                const stats =
                    logger.getStatistics();

                expect(
                    stats.totalEvents
                ).toBeGreaterThan(0);

            }
        );


        test(
            "Should return logger status",
            () => {

                const status =
                    logger.getStatus();

                expect(
                    status.name
                ).toBe(
                    "Event Logger"
                );

                expect(
                    status.version
                ).toBe(
                    "1.0.0"
                );

            }
        );


        test(
            "Should shutdown correctly",
            () => {

                logger.initialize();

                expect(
                    logger.shutdown()
                ).toBe(true);

                expect(
                    logger.status
                ).toBe("SHUTDOWN");

            }
        );

    }

);
