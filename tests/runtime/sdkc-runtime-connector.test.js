/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : SDKC Runtime Connector
 * File      : sdkc-runtime-connector.test.js
 *
 * Build     : BUILD-000450
 * Version   : 1.0.0
 * ==========================================================
 */

const SDKCRuntimeConnector =
    require("../../src/runtime/sdkc-runtime-connector");


class MockRepository {

    constructor() {

        this.objects = new Map();

    }

    save(object) {

        this.objects.set(
            object.id,
            object
        );

        return true;

    }

    load(id) {

        return this.objects.get(id);

    }

    list() {

        return Array.from(
            this.objects.values()
        );

    }

}


describe(
    "SDKC Runtime Connector Tests",
    () => {

        let connector;
        let repository;

        beforeEach(() => {

            connector =
                new SDKCRuntimeConnector();

            repository =
                new MockRepository();

        });


        test(
            "Should attach repository",
            () => {

                expect(
                    connector.attachRepository(
                        repository
                    )
                ).toBe(true);

                expect(
                    connector.repository
                ).toBe(repository);

            }
        );


        test(
            "Should connect successfully",
            () => {

                connector.attachRepository(
                    repository
                );

                expect(
                    connector.connect()
                ).toBe(true);

                expect(
                    connector.isConnected()
                ).toBe(true);

            }
        );


        test(
            "Should reject connection without repository",
            () => {

                expect(
                    () => connector.connect()
                ).toThrow();

            }
        );


        test(
            "Should save knowledge object",
            () => {

                connector.attachRepository(
                    repository
                );

                connector.connect();

                const object = {

                    id: "KO-001",

                    title: "Knowledge Object"

                };

                expect(
                    connector.saveKnowledgeObject(
                        object
                    )
                ).toBe(true);

            }
        );


        test(
            "Should load knowledge object",
            () => {

                connector.attachRepository(
                    repository
                );

                connector.connect();

                const object = {

                    id: "KO-002",

                    title: "Example"

                };

                connector.saveKnowledgeObject(
                    object
                );

                expect(
                    connector.loadKnowledgeObject(
                        "KO-002"
                    )
                ).toEqual(object);

            }
        );


        test(
            "Should list knowledge objects",
            () => {

                connector.attachRepository(
                    repository
                );

                connector.connect();

                connector.saveKnowledgeObject({

                    id: "A"

                });

                connector.saveKnowledgeObject({

                    id: "B"

                });

                expect(
                    connector
                        .listKnowledgeObjects()
                        .length
                ).toBe(2);

            }
        );


        test(
            "Should emit events",
            () => {

                connector.emit(
                    "TEST_EVENT"
                );

                expect(
                    connector
                        .getEvents()
                        .length
                ).toBe(1);

            }
        );


        test(
            "Should disconnect",
            () => {

                connector.attachRepository(
                    repository
                );

                connector.connect();

                connector.disconnect();

                expect(
                    connector.isConnected()
                ).toBe(false);

            }
        );


        test(
            "Should return connector status",
            () => {

                const status =
                    connector.getStatus();

                expect(
                    status.name
                ).toBe(
                    "SDKC Runtime Connector"
                );

                expect(
                    status.version
                ).toBe("1.0.0");

            }
        );


        test(
            "Should reject object access while disconnected",
            () => {

                expect(
                    () =>
                        connector.listKnowledgeObjects()
                ).toThrow();

            }
        );

    }
);
