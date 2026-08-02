/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test     : Knowledge Graph Engine
 *
 * Build    : BUILD-000363
 * Version  : 1.0.0
 *
 * Status   : Active
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeGraphEngine =
    require(
        "../../src/engines/knowledge-graph-engine/knowledge-graph-engine"
    );



describe(
    "SKOS Knowledge Graph Engine Tests",
    () => {



        let graph;



        beforeEach(
            () => {

                graph =
                    new KnowledgeGraphEngine();

            }
        );





        test(
            "Engine should initialize",
            () => {


                expect(

                    graph.initialize()

                ).toBe(true);



                expect(

                    graph.status

                ).toBe(
                    "INITIALIZED"
                );


            }
        );





        test(
            "Should add knowledge object node",
            () => {


                graph.initialize();



                const node = {

                    id:
                        "KO-001",

                    title:
                        "Knowledge Object"

                };



                const result =

                    graph.addNode(

                        node

                    );



                expect(

                    result.id

                ).toBe(
                    "KO-001"
                );



                expect(

                    graph.getNode(
                        "KO-001"
                    )

                ).toEqual(
                    node
                );


            }
        );





        test(
            "Should reject invalid node",
            () => {


                expect(

                    () =>

                        graph.addNode({})

                )

                .toThrow();


            }
        );





        test(
            "Should create relationship between nodes",
            () => {


                graph.initialize();



                graph.addNode({

                    id:
                        "KO-001"

                });



                graph.addNode({

                    id:
                        "KO-002"

                });



                const relation =

                    graph.addRelation(

                        "KO-001",

                        "KO-002",

                        "RELATED_TO"

                    );



                expect(

                    relation.from

                ).toBe(
                    "KO-001"
                );



                expect(

                    relation.to

                ).toBe(
                    "KO-002"
                );



                expect(

                    graph.edges.length

                ).toBe(1);


            }
        );





        test(
            "Should return graph structure",
            () => {


                graph.addNode({

                    id:
                        "KO-001"

                });



                const result =

                    graph.getGraph();



                expect(

                    result.nodes.length

                ).toBe(1);



                expect(

                    result.edges.length

                ).toBe(0);


            }
        );





        test(
            "Should return graph status",
            () => {


                const status =

                    graph.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Knowledge Graph Engine"

                );



                expect(

                    status.version

                ).toBe(

                    "1.1.0"

                );


            }
        );





        test(
            "Should shutdown correctly",
            () => {


                expect(

                    graph.shutdown()

                ).toBe(true);



                expect(

                    graph.status

                ).toBe(

                    "SHUTDOWN"

                );


            }
        );



    }
);
