/*
====================================================
SKOS Mission Control

Diagnostic Service

File:
diagnostic-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const DiagnosticService = {


    issues: [],


    async initialize() {


        Logger.info(

            "Diagnostic Service Initializing..."

        );


        return true;

    },


    async run() {


        this.issues = [];


        await this.checkServices();


        await this.checkRepository();


        await this.checkRegistry();


        await this.checkMetadata();


        await this.checkAudit();



        const report = {


            status:

                this.issues.length === 0

                ? "HEALTHY"

                : "ISSUES_FOUND",



            issueCount:

                this.issues.length,



            issues:

                this.issues,



            timestamp:

                new Date()

                .toISOString()


        };



        if (window.EventBus) {


            EventBus.publish(

                "diagnostic.completed",

                report

            );


        }



        return report;


    },


    async checkServices() {


        const services = {


            IDRegistryService:

                window.IDRegistryService,


            MetadataService:

                window.MetadataService,


            VersionService:

                window.VersionService,


            IntegrityService:

                window.IntegrityService,


            AuditService:

                window.AuditService,


            HealthService:

                window.HealthService


        };



        Object.keys(services)

        .forEach(

            service => {


                if (!services[service]) {


                    this.addIssue(

                        "SERVICE_MISSING",

                        service

                    );


                }


            }

        );


    },


    async checkRepository() {


        if (!window.RepositoryValidator) {


            this.addIssue(

                "REPOSITORY_VALIDATOR_MISSING",

                "Repository Validator unavailable."

            );


            return;

        }



        const result =

            await RepositoryValidator.validate();



        if (!result.valid) {


            this.addIssue(

                "REPOSITORY_INVALID",

                result.errors

            );


        }


    },


    async checkRegistry() {


        if (!window.IDRegistryService) {


            return;

        }



        const stats =

            IDRegistryService.statistics();



        if (!stats) {


            this.addIssue(

                "REGISTRY_UNAVAILABLE",

                "ID Registry cannot be loaded."

            );


        }


    },


    async checkMetadata() {


        if (!window.MetadataValidator) {


            this.addIssue(

                "METADATA_VALIDATOR_MISSING",

                "Metadata Validator unavailable."

            );


        }


    },


    async checkAudit() {


        if (!window.AuditService) {


            this.addIssue(

                "AUDIT_SERVICE_MISSING",

                "Audit system unavailable."

            );


        }


    },


    addIssue(type, detail) {


        this.issues.push({


            type:

                type,


            detail:

                detail,


            timestamp:

                new Date()

                .toISOString()


        });


    },


    getIssues() {


        return this.issues;


    },


    status() {


        return "READY";

    }


};



window.DiagnosticService =

    DiagnosticService;



Object.freeze(

    DiagnosticService

);
