/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Version Control
 * File      : graph-version-control.test.js
 *
 * Build     : BUILD-000375
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphVersionControl =
    require(
        "../../src/engines/knowledge-graph-engine/graph-version-control"
    );



describe(

    "SKOS Graph Version Control Tests",

    () => {



        let versionControl;



        beforeEach(

            () => {


                versionControl =

                    new GraphVersionControl();


            }

        );





        const graphV1 = {


            nodes:

                [

                    {

                        id:

                            "node-1"

                    },


                    {

                        id:

                            "node-2"

                    }

                ],


            edges:

                [

                    {

                        from:

                            "node-1",


                        to:

                            "node-2",


                        type:

                            "RELATED"

                    }

                ]

        };





        const graphV2 = {


            nodes:

                [

                    {

                        id:

                            "node-1"

                    },


                    {

                        id:

                            "node-2"

                    },


                    {

                        id:

                            "node-3"

                    }

                ],


            edges:

                [

                    {

                        from:

                            "node-1",


                        to:

                            "node-2",


                        type:

                            "RELATED"

                    },


                    {

                        from:

                            "node-2",


                        to:

                            "node-3",


                        type:

                            "DEPENDS_ON"

                    }

                ]

        };





        test(

            "Version control should initialize",

            () => {


                expect(

                    versionControl.initialize()

                ).toBe(true);



                expect(

                    versionControl.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should create graph snapshot",

            () => {


                const snapshot =

                    versionControl.createSnapshot(

                        graphV1,

                        "Initial graph version"

                    );



                expect(

                    snapshot.version

                ).toBe(1);



                expect(

                    snapshot.message

                ).toBe(

                    "Initial graph version"

                );


            }

        );





        test(

            "Should retrieve snapshot",

            () => {


                versionControl.createSnapshot(

                    graphV1

                );



                const snapshot =

                    versionControl.getSnapshot(

                        1

                    );



                expect(

                    snapshot

                ).not.toBeNull();



                expect(

                    snapshot.graph.nodes.length

                ).toBe(2);


            }

        );





        test(

            "Should return latest snapshot",

            () => {


                versionControl.createSnapshot(

                    graphV1

                );


                versionControl.createSnapshot(

                    graphV2

                );



                const latest =

                    versionControl.getLatestSnapshot();



                expect(

                    latest.version

                ).toBe(2);



                expect(

                    latest.graph.nodes.length

                ).toBe(3);


            }

        );





        test(

            "Should rollback to previous version",

            () => {


                versionControl.createSnapshot(

                    graphV1

                );


                versionControl.createSnapshot(

                    graphV2

                );



                const rollback =

                    versionControl.rollback(

                        1

                    );



                expect(

                    rollback.nodes.length

                ).toBe(2);



                expect(

                    rollback.edges.length

                ).toBe(1);


            }

        );





        test(

            "Should compare graph versions",

            () => {


                versionControl.createSnapshot(

                    graphV1

                );


                versionControl.createSnapshot(

                    graphV2

                );



                const result =

                    versionControl.compareVersions(

                        1,

                        2

                    );



                expect(

                    result.nodeDifference

                ).toBe(1);



                expect(

                    result.edgeDifference

                ).toBe(1);


            }

        );





        test(

            "Should maintain version history",

            () => {


                versionControl.createSnapshot(

                    graphV1

                );


                versionControl.createSnapshot(

                    graphV2

                );



                const history =

                    versionControl.getHistory();



                expect(

                    history.length

                ).toBe(2);



                expect(

                    history[0].action

                ).toBe(

                    "SNAPSHOT_CREATED"

                );


            }

        );





        test(

            "Should return version status",

            () => {


                versionControl.createSnapshot(

                    graphV1

                );



                const status =

                    versionControl.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Version Control"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.currentVersion

                ).toBe(1);


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                versionControl.initialize();



                expect(

                    versionControl.shutdown()

                ).toBe(true);



                expect(

                    versionControl.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
