/*
====================================================
SKOS Mission Control

Dashboard Service

File:
dashboard-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const DashboardService = {


    async initialize() {


        Logger.info(

            "Dashboard Service Initializing..."

        );


        return true;

    },


    async getDashboard() {


        const dashboard = {


            system: {

                name:
                    "SKOS",

                version:
                    "1.0",

                status:
                    "ACTIVE",

                timestamp:

                    new Date()
                    .toISOString()

            },


            health:

                await this.getHealth(),



            diagnostics:

                await this.getDiagnostics(),



            repository:

                this.getRepositoryStats(),



            objects:

                this.getObjectStats(),



            audit:

                this.getAuditStats()


        };



        return dashboard;


    },


    async getHealth() {


        if (

            window.HealthService

        ) {


            return await HealthService.check();


        }


        return {

            status:

                "UNAVAILABLE"

        };


    },


    async getDiagnostics() {


        if (

            window.DiagnosticService

        ) {


            return await DiagnosticService.run();


        }


        return {

            status:

                "UNAVAILABLE"

        };


    },


    getRepositoryStats() {


        if (

            window.RepositoryValidator

        ) {


            const report =

                RepositoryValidator.getReport();



            return {


                status:

                    report

                    ? report.valid

                        ? "HEALTHY"

                        : "ERROR"

                    : "UNKNOWN"


            };


        }


        return {

            status:
                "UNKNOWN"

        };


    },


    getObjectStats() {


        if (

            window.IDRegistryService

        ) {


            return IDRegistryService.statistics();


        }


        return {

            total:

                0

        };


    },


    getAuditStats() {


        if (

            window.AuditService

        ) {


            return {


                events:

                    AuditService
                    .getLogs()
                    .length

            };


        }


        return {


            events:

                0

        };


    },


    status() {


        return "READY";

    }


};



window.DashboardService =

    DashboardService;



Object.freeze(

    DashboardService

);
