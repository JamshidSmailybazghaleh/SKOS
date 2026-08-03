/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Graph Inference Manager
 * File      : graph-inference-manager.test.js
 *
 * Build     : BUILD-000381
 * Version   : 1.0.0
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const GraphInferenceManager =
    require(
        "../../src/engines/knowledge-graph-engine/graph-inference-manager"
    );



describe(

    "SKOS Graph Inference Manager Tests",

    () => {



        let manager;



        beforeEach(

            () => {


                manager =

                    new GraphInferenceManager();


            }

        );





        const inference = {


            rule:

                "TRANSITIVE_RELATION_RULE",


            result:

                {

                    from:

                        "node-A",


                    to:

                        "node-C",


                    relation:

                        "RELATED"

                },


            confidence:

                0.95

        };





        test(

            "Inference manager should initialize",

            () => {


                expect(

                    manager.initialize()

                ).toBe(true);



                expect(

                    manager.status

                ).toBe(

                    "INITIALIZED"

                );


            }

        );





        test(

            "Should register inference",

            () => {


                const result =

                    manager.registerInference(

                        inference

                    );



                expect(

                    result.id

                ).toBe(

                    "INF-1"

                );



                expect(

                    result.status

                ).toBe(

                    "PENDING"

                );


            }

        );





        test(

            "Should reject invalid inference",

            () => {


                expect(

                    () =>

                        manager.registerInference(

                            {}

                        )

                ).toThrow();


            }

        );





        test(

            "Should validate inference",

            () => {


                const item =

                    manager.registerInference(

                        inference

                    );



                const validated =

                    manager.validateInference(

                        item.id

                    );



                expect(

                    validated.status

                ).toBe(

                    "VALIDATED"

                );


            }

        );





        test(

            "Should reject inference",

            () => {


                const item =

                    manager.registerInference(

                        inference

                    );



                const rejected =

                    manager.rejectInference(

                        item.id,

                        "Low confidence"

                    );



                expect(

                    rejected.status

                ).toBe(

                    "REJECTED"

                );



                expect(

                    rejected.reason

                ).toBe(

                    "Low confidence"

                );


            }

        );





        test(

            "Should return validated inferences",

            () => {


                const item =

                    manager.registerInference(

                        inference

                    );



                manager.validateInference(

                    item.id

                );



                const result =

                    manager.getValidatedInferences();



                expect(

                    result.length

                ).toBe(1);



                expect(

                    result[0].status

                ).toBe(

                    "VALIDATED"

                );


            }

        );





        test(

            "Should rank inferences by confidence",

            () => {


                manager.registerInference(

                    {

                        result:

                            "A",


                        confidence:

                            0.5

                    }

                );


                manager.registerInference(

                    {

                        result:

                            "B",


                        confidence:

                            0.9

                    }

                );



                const ranked =

                    manager.rankInferences();



                expect(

                    ranked[0].confidence

                ).toBe(0.9);


            }

        );





        test(

            "Should retrieve inference by id",

            () => {


                const item =

                    manager.registerInference(

                        inference

                    );



                const result =

                    manager.getInference(

                        item.id

                    );



                expect(

                    result.id

                ).toBe(

                    "INF-1"

                );


            }

        );





        test(

            "Should remove inference",

            () => {


                const item =

                    manager.registerInference(

                        inference

                    );



                expect(

                    manager.removeInference(

                        item.id

                    )

                ).toBe(true);



                expect(

                    manager.getInference(

                        item.id

                    )

                ).toBeNull();


            }

        );





        test(

            "Should return inference statistics",

            () => {


                const item1 =

                    manager.registerInference(

                        inference

                    );



                manager.validateInference(

                    item1.id

                );



                manager.registerInference(

                    {

                        result:

                            "Pending"

                    }

                );



                const stats =

                    manager.getStatistics();



                expect(

                    stats.total

                ).toBe(2);



                expect(

                    stats.validated

                ).toBe(1);



                expect(

                    stats.pending

                ).toBe(1);


            }

        );





        test(

            "Should return manager status",

            () => {


                const status =

                    manager.getStatus();



                expect(

                    status.name

                ).toBe(

                    "Graph Inference Manager"

                );



                expect(

                    status.version

                ).toBe(

                    "1.0.0"

                );



                expect(

                    status.inferences

                ).toBe(0);


            }

        );





        test(

            "Should shutdown correctly",

            () => {


                manager.initialize();



                expect(

                    manager.shutdown()

                ).toBe(true);



                expect(

                    manager.status

                ).toBe(

                    "SHUTDOWN"

                );


            }

        );



    }

);
