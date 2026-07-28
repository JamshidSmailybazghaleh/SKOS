/*
====================================================
SKOS Mission Control

Metadata Validator

File:
metadata-validator.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const MetadataValidator = {


    registry: null,


    async initialize() {

        Logger.info(
            "Metadata Validator Initializing..."
        );

        await this.loadRegistry();

        return true;

    },


    async loadRegistry() {

        try {

            const response = await fetch(

                "sdkc/metadata/metadata-registry.json"

            );


            if (!response.ok) {

                throw new Error(
                    "Metadata Registry Not Found."
                );

            }


            this.registry =
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


        if (!object) {

            return {

                valid: false,

                errors: [

                    "Object is empty."

                ]

            };

        }


        if (!this.registry) {

            return {

                valid: false,

                errors: [

                    "Registry not loaded."

                ]

            };

        }


        const errors = [];


        const metadata =
            object.metadata;


        if (!metadata) {

            errors.push(

                "Metadata missing."

            );

            return {

                valid:false,

                errors

            };

        }


        const typeRule =

            this.registry
            .objectTypes
            [object.type];


        if (typeRule) {


            typeRule.requiredFields
            .forEach(

                field => {


                    if (

                        !metadata[field]

                    ) {

                        errors.push(

                            "Required field missing: "

                            + field

                        );

                    }

                }

            );

        }


        Object.keys(metadata)
        .forEach(

            field => {


                const definition =

                    this.registry
                    .fields[field];


                if (!definition) {

                    errors.push(

                        "Unknown metadata field: "

                        + field

                    );

                    return;

                }


                if (

                    !this.checkType(

                        metadata[field],

                        definition.type

                    )

                ) {


                    errors.push(

                        "Invalid type for field: "

                        + field

                    );


                }


            }

        );


        return {

            valid:

                errors.length === 0,


            errors

        };


    },


    checkType(value, type) {


        switch(type) {


            case "string":

                return typeof value === "string";


            case "array":

                return Array.isArray(value);


            case "datetime":

                return !isNaN(

                    Date.parse(value)

                );


            default:

                return true;

        }

    },


    status() {

        return "READY";

    }


};


window.MetadataValidator =
    MetadataValidator;


Object.freeze(
    MetadataValidator
);
