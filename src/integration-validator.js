/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Integration Validator
 * File      : integration-validator.js
 *
 * Build     : BUILD-000500.3
 * Version   : 1.0.0
 * ==========================================================
 */

class IntegrationValidator {

    constructor() {

        this.name = "Integration Validator";
        this.version = "1.0.0";

        this.components = new Map();

        this.validationResults = [];

        this.status = "CREATED";
    }



    register(name, component) {

        this.components.set(name, component);

        return true;
    }



    validate() {

        this.validationResults = [];

        for (const [name, component] of this.components) {

            const result = {

                component: name,

                exists: component !== null,

                status: this.validateComponent(component)

            };

            this.validationResults.push(result);

        }

        const failed =
            this.validationResults.filter(

                item => item.status !== "VALID"

            );

        this.status =

            failed.length === 0

                ? "PASSED"

                : "FAILED";

        return this.status;
    }



    validateComponent(component) {

        if (!component)
            return "MISSING";

        if (

            typeof component.getStatus !== "function"

        ) {

            return "INVALID_INTERFACE";

        }

        const state =

            component.getStatus();

        if (!state)
            return "INVALID_STATE";

        return "VALID";
    }



    getValidationResults() {

        return this.validationResults;
    }



    getSummary() {

        return {

            validator: this.name,

            version: this.version,

            status: this.status,

            total:

                this.validationResults.length,

            valid:

                this.validationResults.filter(

                    r => r.status === "VALID"

                ).length,

            failed:

                this.validationResults.filter(

                    r => r.status !== "VALID"

                ).length

        };
    }



    printSummary() {

        console.log("");

        console.log(

            "==================================="

        );

        console.log(

            "SKOS Integration Validation"

        );

        console.log(

            "Status :", this.status

        );

        console.log(

            "==================================="

        );

        this.validationResults.forEach(

            r => {

                console.log(

                    r.component,

                    " -> ",

                    r.status

                );

            }

        );

        console.log(

            "==================================="

        );

    }

}

module.exports =
    IntegrationValidator;
