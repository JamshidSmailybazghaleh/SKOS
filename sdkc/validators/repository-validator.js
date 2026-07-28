/*
====================================================
SKOS Mission Control

Repository Validator

File:
repository-validator.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const RepositoryValidator = {


    report: null,


    async initialize() {

        Logger.info(
            "Repository Validator Initializing..."
        );

        return true;

    },


    async validate() {


        const errors = [];

        const warnings = [];


        /*
        ============================
        Check Repository Index
        ============================
        */


        const index =

            window.RepositoryEngine &&

            RepositoryEngine.index;



        if (!index) {


            errors.push(

                "Repository index missing."

            );


        }



        /*
        ============================
        Check Objects
        ============================
        */


        if (

            index &&

            index.objects

        ) {


            index.objects.forEach(

                object => {


                    const result =

                        KnowledgeObjectValidator.validate(

                            object

                        );


                    if (!result.valid) {


                        errors.push({

                            object:

                                object.id,


                            issues:

                                result.errors

                        });


                    }


                }

            );


        }



        /*
        ============================
        Check ID Registry
        ============================
        */


        if (

            window.IDRegistryService

        ) {


            const stats =

                IDRegistryService.statistics();


            if (!stats) {


                warnings.push(

                    "ID Registry unavailable."

                );


            }


        }



        /*
        ============================
        Check Metadata
        ============================
        */


        if (

            window.MetadataValidator

        ) {


            if (

                index &&

                index.objects

            ) {


                index.objects.forEach(

                    object => {


                        const result =

                            MetadataValidator.validate(

                                object

                            );


                        if (!result.valid) {


                            warnings.push({

                                object:

                                    object.id,


                                issues:

                                    result.errors

                            });


                        }


                    }

                );


            }


        }



        this.report = {


            valid:

                errors.length === 0,


            errors:

                errors,


            warnings:

                warnings,


            timestamp:

                new Date()

                .toISOString()


        };


        return this.report;


    },


    getReport() {


        return this.report;


    },


    status() {

        return "READY";

    }


};



window.RepositoryValidator =

    RepositoryValidator;



Object.freeze(
    RepositoryValidator
);
