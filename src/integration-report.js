/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Integration Report
 * File      : integration-report.js
 *
 * Build     : BUILD-000500.4
 * Version   : 1.0.0
 * ==========================================================
 */

class IntegrationReport {

    constructor() {

        this.name = "Integration Report";
        this.version = "1.0.0";
        this.build = "BUILD-000500.4";

        this.createdAt = new Date();

        this.summary = {};
        this.components = [];
    }



    generate(runtime, validator) {

        this.summary = {

            runtime:

                runtime.name,

            runtimeVersion:

                runtime.version,

            build:

                runtime.build,

            runtimeStatus:

                runtime.status,

            validatorStatus:

                validator.status,

            createdAt:

                new Date()

        };



        this.components =

            validator.getValidationResults();

        return true;
    }



    exportObject() {

        return {

            summary:

                this.summary,

            components:

                this.components

        };

    }



    exportJSON() {

        return JSON.stringify(

            this.exportObject(),

            null,

            2

        );

    }



    print() {

        console.log("");

        console.log(
            "======================================"
        );

        console.log(
            "SKOS Integration Report"
        );

        console.log(
            "======================================"
        );

        console.log(
            "Runtime :",
            this.summary.runtime
        );

        console.log(
            "Version :",
            this.summary.runtimeVersion
        );

        console.log(
            "Build   :",
            this.summary.build
        );

        console.log(
            "Status  :",
            this.summary.runtimeStatus
        );

        console.log(
            "Validation :",
            this.summary.validatorStatus
        );

        console.log(
            "======================================"
        );

        this.components.forEach(item => {

            console.log(
                item.component,
                " -> ",
                item.status
            );

        });

        console.log(
            "======================================"
        );

    }

}

module.exports = IntegrationReport;
