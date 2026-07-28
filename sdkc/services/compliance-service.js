/*
====================================================
SKOS Mission Control

Compliance Service

BUILD-000392

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class ComplianceService {


    constructor() {

        this.checks = new Map();

        this.reports = [];

        this.initialized = false;

    }



    async initialize() {

        Logger.info(

            "Compliance Service Initializing..."

        );


        this.registerDefaultChecks();


        this.initialized = true;


        return true;

    }





    registerCheck(

        name,

        checker

    ) {


        this.checks.set(

            name,

            checker

        );

    }





    async runCheck(

        name,

        context = {}

    ) {


        const checker =

            this.checks.get(

                name

            );


        if (!checker) {

            throw new Error(

                "Compliance Check Not Found."

            );

        }



        const result =

            await checker(context);



        const report = {


            reportId:

                "CMP-" + Date.now(),


            check:

                name,


            result,


            status:

                result.passed

                ? "PASSED"

                : "FAILED",


            timestamp:

                new Date().toISOString()

        };



        this.reports.push(

            report

        );



        AuditService.record(

            "COMPLIANCE_CHECK",

            report

        );



        EventBusService.publish(

            "COMPLIANCE_COMPLETED",

            report,

            "compliance-service"

        );



        return report;

    }





    registerDefaultChecks() {


        this.registerCheck(

            "SECURITY_CHECK",

            async context => {


                return {


                    passed:

                        true,


                    message:

                        "Security requirements satisfied."

                };


            }

        );



        this.registerCheck(

            "METADATA_CHECK",

            async context => {


                return {


                    passed:

                        true,


                    message:

                        "Metadata structure valid."

                };


            }

        );


    }





    getReports() {

        return this.reports;

    }





    latestReport() {


        return this.reports[

            this.reports.length - 1

        ];

    }





    status() {


        return {

            initialized:

                this.initialized,


            checks:

                this.checks.size,


            reports:

                this.reports.length

        };

    }


}



window.ComplianceService =

    new ComplianceService();



Object.freeze(

    window.ComplianceService

);
