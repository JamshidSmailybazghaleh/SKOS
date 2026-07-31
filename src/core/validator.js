/**
 * SKOS Validator Service
 *
 * File ID:
 * CORE-004
 *
 * Version:
 * 1.0.0
 *
 * Build:
 * BUILD-000001
 */


class Validator {


    constructor(options = {}) {


        this.rules =
            options.rules || {};


        this.status =
            "CREATED";


        this.errors = [];

    }



    /**
     * Initialize Validator
     */

    initialize(){


        this.status =
            "INITIALIZED";


        return true;

    }



    /**
     * Validate Object
     */

    validate(
        object
    ){


        this.errors = [];



        if(!object){

            this.errors.push(
                "OBJECT_EMPTY"
            );

        }



        if(
            object &&
            !object.id
        ){

            this.errors.push(
                "MISSING_ID"
            );

        }



        if(
            object &&
            !object.title
        ){

            this.errors.push(
                "MISSING_TITLE"
            );

        }



        return {

            valid:
                this.errors.length === 0,


            errors:
                this.errors

        };


    }



    /**
     * Validate File Metadata
     */

    validateMetadata(
        metadata
    ){


        const required = [

            "id",
            "title",
            "format"

        ];



        const errors = [];



        required.forEach(
            field => {


                if(!metadata[field]){

                    errors.push(
                        `MISSING_${field.toUpperCase()}`
                    );

                }


            }
        );



        return {

            valid:
                errors.length === 0,


            errors

        };


    }



    /**
     * Get Status
     */

    getStatus(){


        return {

            status:
                this.status,


            errors:
                this.errors.length

        };

    }



    /**
     * Shutdown
     */

    shutdown(){


        this.status =
            "SHUTDOWN";


        return true;

    }


}



module.exports = Validator;
