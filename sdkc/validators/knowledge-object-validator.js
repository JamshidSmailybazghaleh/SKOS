/*
====================================================
SKOS Mission Control

Knowledge Object Validator

File:
knowledge-object-validator.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const KnowledgeObjectValidator = {


    schema: null,


    async initialize() {

        Logger.info(
            "Knowledge Object Validator Initializing..."
        );

        await this.loadSchema();

        return true;

    },


    async loadSchema() {


        try {


            const response = await fetch(

                "sdkc/schemas/knowledge-object.schema.json"

            );


            if (!response.ok) {

                throw new Error(

                    "Knowledge Object Schema Not Found."

                );

            }


            this.schema =

                await response.json();


            return true;


        }


        catch(error) {


            Logger.error(

                error.message

            );


            return false;


        }


    },


    validate(object) {


        const errors = [];


        if (!object) {


            errors.push(

                "Object is empty."

            );


            return this.result(errors);


        }



        /*
        ============================
        Identity Validation
        ============================
        */


        if (!object.id) {


            errors.push(

                "Missing object ID."

            );


        }



        if (!object.type) {


            errors.push(

                "Missing object type."

            );


        }



        if (!object.title) {


            errors.push(

                "Missing object title."

            );


        }



        /*
        ============================
        Metadata Validation
        ============================
        */


        if (!object.metadata) {


            errors.push(

                "Missing metadata."

            );


        }


        else if (

            window.MetadataValidator

        ) {


            const metadataResult =

                MetadataValidator.validate(

                    object

                );


            if (!metadataResult.valid) {


                errors.push(

                    ...metadataResult.errors

                );


            }


        }



        /*
        ============================
        Version Validation
        ============================
        */


        if (!object.version) {


            errors.push(

                "Missing version."

            );


        }



        /*
        ============================
        Lifecycle Validation
        ============================
        */


        if (!object.status) {


            errors.push(

                "Missing lifecycle status."

            );


        }



        /*
        ============================
        Integrity Validation
        ============================
        */


        if (

            object.metadata &&

            !object.metadata.checksum

        ) {


            errors.push(

                "Missing integrity checksum."

            );


        }



        return this.result(errors);


    },


    result(errors) {


        return {


            valid:

                errors.length === 0,


            errors:

                errors,


            timestamp:

                new Date()

                .toISOString()


        };


    },


    status() {


        return "READY";


    }


};



window.KnowledgeObjectValidator =

    KnowledgeObjectValidator;



Object.freeze(

    KnowledgeObjectValidator

);
