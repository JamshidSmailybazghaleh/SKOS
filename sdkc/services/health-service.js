/*
====================================================
SKOS Mission Control

Health Service

File:
health-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const HealthService = {


    async initialize() {

        Logger.info(
            "Health Service Initializing..."
        );

        return true;

    },


    async check() {


        const report = {


            system:

            {

                name:
                    "SKOS",

                status:
                    "ACTIVE",

                timestamp:

                    new Date()
                    .toISOString()

            },


            services:
                this.checkServices(),


            repository:
                await this.checkRepository(),


            audit:
                this.checkAudit(),


            overall:
                "UNKNOWN"

        };


        report.overall =

            this.calculateStatus(
                report
            );


        return report;

    },


    checkServices() {


        const services = {


            IDRegistry:

                !!window.IDRegistryService,


            Metadata:

                !!window.MetadataService,


            Version:

                !!window.VersionService,


            Integrity:

                !!window.IntegrityService,


            Audit:

                !!window.AuditService,


            Lifecycle:

                !!window.ObjectLifecycleService


        };


        return services;

    },


    async checkRepository() {


        if (

            !window.RepositoryValidator

        ) {


            return {

                status:
                    "UNAVAILABLE"

            };

        }


        const result =

            await RepositoryValidator.validate();


        return {


            status:

                result.valid

                ? "HEALTHY"

                : "ERROR",


            errors:

                result.errors.length,


            warnings:

                result.warnings.length


        };


    },


    checkAudit() {


        if (

            !window.AuditService

        ) {


            return {

                status:
                    "UNAVAILABLE"

            };

        }


        return {


            status:
                "ACTIVE",


            events:

                AuditService
                .getLogs()
                .length


        };


    },


    calculateStatus(report) {


        const repositoryOK =

            report.repository.status ===

            "HEALTHY";


        const servicesOK =

            Object.values(

                report.services

            )

            .every(

                value => value

            );


        if (

            repositoryOK &&

            servicesOK

        ) {

            return "HEALTHY";

        }


        return "WARNING";

    },


    status() {

        return "READY";

    }


};


window.HealthService =

    HealthService;


Object.freeze(
    HealthService
);
