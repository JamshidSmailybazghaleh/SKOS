/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test      : Knowledge Query Engine
 * File      : knowledge-query-engine.test.js
 *
 * Build     : BUILD-000361
 * Version   : 1.0.0
 *
 * Status    : Active
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const KnowledgeQueryEngine = require(
    "../../src/engines/knowledge-query-engine/knowledge-query-engine"
);



describe(

    "SKOS Knowledge Query Engine Tests",

    () => {


        let repository;

        let monitoring;

        let engine;



        beforeEach(

            () => {


                repository = {


                    objects: [


                        {

                            id:
                                "KO-001",

                            type:
                                "book",

                            title:
                                "Hekmat Noor",

                            tags:
                                [

                                    "wisdom",

                                    "knowledge"

                                ],


                            content:
                                "Knowledge and human wisdom."

                        },


                        {

                            id:
                                "KO-002",

                            type:
                                "article",

                            title:
                                "SKOS Architecture",

                            tags:
                                [

                                    "technology",

                                    "knowledge"

                                ],


                            content:
                                "Knowledge Operating System."

                        }


                    ],



                    list() {


                        return this.objects;

                    }


                };





                monitoring = {


                    events: [],


                    recordEvent(

                        name,

                        data

                    ) {


                        this.events.push({

                            name,

                            data

                        });


                    }



                };





                engine = new KnowledgeQueryEngine({

                    repository,

                    monitoring

                });



                engine.initialize();


            }

        );





        test(

            "Engine should initialize",

            () => {


                const status =

                    engine.getStatus();



                expect(

                    status.status

                )

                .toBe(

                    "INITIALIZED"

                );


            }

        );






        test(

            "Should search object by id",

            () => {


                const result =

                    engine.searchById(

                        "KO-001"

                    );



                expect(

                    result.length

                )

                .toBe(

                    1

                );



                expect(

                    result[0].id

                )

                .toBe(

                    "KO-001"

                );


            }

        );






        test(

            "Should search object by tag",

            () => {


                const result =

                    engine.searchByTag(

                        "technology"

                    );



                expect(

                    result.length

                )

                .toBe(

                    1

                );



                expect(

                    result[0].id

                )

                .toBe(

                    "KO-002"

                );


            }

        );






        test(

            "Should search by text",

            () => {


                const result =

                    engine.execute({

                        text:

                            "human wisdom"

                    });



                expect(

                    result.length

                )

                .toBe(

                    1

                );


            }

        );






        test(

            "Should record monitoring events",

            () => {


                engine.execute({

                    id:

                        "KO-001"

                });



                expect(

                    monitoring.events.length

                )

                .toBeGreaterThan(

                    0

                );


            }

        );






        test(

            "Should return query history",

            () => {


                engine.execute({

                    id:

                        "KO-001"

                });



                const history =

                    engine.getHistory();



                expect(

                    history.length

                )

                .toBeGreaterThan(

                    0

                );


            }

        );






        test(

            "Engine should shutdown",

            () => {


                const result =

                    engine.shutdown();



                expect(

                    result

                )

                .toBe(

                    true

                );



                expect(

                    engine.getStatus().status

                )

                .toBe(

                    "SHUTDOWN"

                );


            }

        );


    }

);
