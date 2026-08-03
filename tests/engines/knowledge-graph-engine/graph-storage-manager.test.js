/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Test File  : graph-storage-manager.test.js
 *
 * Build      : BUILD-000363
 * Version    : 1.0.0
 *
 * ==========================================================
 */

const GraphStorageManager =
require(
    "../../../src/engines/knowledge-graph-engine/graph-storage-manager"
);

describe(
    "SKOS Graph Storage Manager Tests",
    () => {

        let storage;

        beforeEach(() => {

            storage =
            new GraphStorageManager();

            storage.initialize();

        });

        test(
            "Storage should initialize",
            () => {

                expect(
                    storage.initialized
                ).toBe(true);

            }
        );

        test(
            "Should store node",
            () => {

                const node = {

                    id: "OBJ-001",

                    title:
                    "Knowledge Object"

                };

                storage.addNode(node);

                expect(

                    storage.getNode(
                        "OBJ-001"
                    )

                ).toEqual(node);

            }
        );

        test(
            "Should reject invalid node",
            () => {

                expect(

                    () =>

                    storage.addNode({})

                ).toThrow();

            }
        );

        test(
            "Should remove node",
            () => {

                storage.addNode({

                    id:
                    "NODE-01"

                });

                expect(

                    storage.removeNode(
                        "NODE-01"
                    )

                ).toBe(true);

                expect(

                    storage.getNode(
                        "NODE-01"
                    )

                ).toBeNull();

            }
        );

        test(
            "Should store edge",
            () => {

                storage.addEdge({

                    from:
                    "A",

                    to:
                    "B",

                    type:
                    "LINK"

                });

                expect(

                    storage.getEdges()
                    .length

                ).toBe(1);

            }
        );

        test(
            "Should clear storage",
            () => {

                storage.addNode({

                    id:
                    "N1"

                });

                storage.addEdge({

                    from:
                    "N1",

                    to:
                    "N1",

                    type:
                    "SELF"

                });

                storage.clear();

                expect(

                    storage.getStatistics()
                    .nodes

                ).toBe(0);

                expect(

                    storage.getStatistics()
                    .edges

                ).toBe(0);

            }
        );

        test(
            "Should report statistics",
            () => {

                storage.addNode({

                    id:
                    "A"

                });

                storage.addNode({

                    id:
                    "B"

                });

                storage.addEdge({

                    from:
                    "A",

                    to:
                    "B",

                    type:
                    "CONNECTED"

                });

                const stats =
                storage.getStatistics();

                expect(

                    stats.nodes

                ).toBe(2);

                expect(

                    stats.edges

                ).toBe(1);

            }
        );

        test(
            "Shutdown should work",
            () => {

                storage.shutdown();

                expect(

                    storage.initialized

                ).toBe(false);

            }
        );

    }
);
