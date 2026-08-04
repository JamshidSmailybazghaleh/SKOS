/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Boot Success Validator
 * File      : boot-success-validator.js
 *
 * Build     : BUILD-000907.1
 * Version   : 1.0.0
 *
 * Mission:
 * Validate and publish final SKOS boot status.
 *
 * ==========================================================
 */

class BootSuccessValidator {

    constructor(options = {}) {

        this.name =
            "SKOS Boot Success Validator";

        this.version =
            "1.0.0";

        this.status =
            "CREATED";

        this.options =
            options;

        this.bootReport =
            null;

        this.validation =
            null;

        this.history =
            [];

    }



    initialize() {

        this.status =
            "INITIALIZED";

        this.record(
            "VALIDATOR_INITIALIZED"
        );

        return true;

    }



    loadBootReport(report) {

        if (!report) {

            throw new Error(
                "Boot report required."
            );

        }

        this.bootReport =
            report;

        return true;

    }



    validate() {

        if (!this.bootReport) {

            throw new Error(
                "Boot report not loaded."
            );

        }

        const success =
            this.bootReport.success === true;

        this.validation = {

            success,

            status:
                success
                    ? "SYSTEM_READY"
                    : "SYSTEM_NOT_READY",

            validatedAt:
                new Date(),

            report:
                this.bootReport

        };

        this.status =
            this.validation.status;

        this.record({

            event:
                "BOOT_VALIDATED",

            success

        });

        return this.validation;

    }



    publish() {

        if (!this.validation) {

            throw new Error(
                "Validation not executed."
            );

        }

        const message =

            this.validation.success

            ?

            "SKOS BOOT SUCCESSFUL"

            :

            "SKOS BOOT FAILED";

        this.record({

            event:
                "BOOT_STATUS_PUBLISHED",

            message

        });

        return {

            message,

            status:
                this.validation.status

        };

    }



    getValidation() {

        return this.validation;

    }



    getHistory() {

        return this.history;

    }



    record(event) {

        this.history.push({

            event,

            timestamp:
                new Date()

        });

    }



    reset() {

        this.status =
            "RESET";

        this.bootReport =
            null;

        this.validation =
            null;

        this.history =
            [];

        return true;

    }



    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            validated:
                this.validation !== null

        };

    }

}

module.exports =
    BootSuccessValidator;
