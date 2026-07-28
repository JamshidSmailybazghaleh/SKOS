/*
====================================================
SKOS Mission Control

Policy Service

BUILD-000391

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class PolicyService {


    constructor() {

        this.policies = new Map();

        this.rules = [];

        this.initialized = false;

    }



    async initialize() {

        Logger.info(

            "Policy Service Initializing..."

        );


        this.loadDefaultPolicies();


        this.initialized = true;


        return true;

    }





    createPolicy(policy) {


        const record = {


            policyId:

                policy.policyId ||

                "POL-" + Date.now(),


            name:

                policy.name,


            type:

                policy.type,


            rules:

                policy.rules || [],


            status:

                "ACTIVE",


            createdAt:

                new Date().toISOString()

        };



        this.policies.set(

            record.policyId,

            record

        );



        AuditService.record(

            "POLICY_CREATED",

            record

        );



        return record;

    }





    addRule(

        policyId,

        rule

    ) {


        const policy =

            this.policies.get(

                policyId

            );



        if (!policy) {

            throw new Error(

                "Policy Not Found."

            );

        }



        policy.rules.push(

            rule

        );


        this.rules.push(

            rule

        );


        return policy;

    }





    evaluate(

        context

    ) {


        const result = {


            allowed:

                true,


            reasons: []

        };



        for (

            const policy of this.policies.values()

        ) {


            if (

                policy.status !== "ACTIVE"

            ) {

                continue;

            }



            for (

                const rule of policy.rules

            ) {


                if (

                    rule.role &&

                    rule.role !== context.role

                ) {

                    continue;

                }



                if (

                    rule.effect === "DENY"

                ) {


                    result.allowed = false;


                    result.reasons.push(

                        rule.reason ||

                        "Denied by policy"

                    );

                }

            }

        }



        return result;

    }





    disablePolicy(

        policyId

    ) {


        const policy =

            this.policies.get(

                policyId

            );



        if (policy) {

            policy.status =

                "DISABLED";

        }


        return policy;

    }





    getPolicy(

        policyId

    ) {


        return this.policies.get(

            policyId

        );

    }





    listPolicies() {


        return Array.from(

            this.policies.values()

        );

    }





    loadDefaultPolicies() {


        this.createPolicy({

            name:

                "Secret Protection Policy",


            type:

                "SECURITY_POLICY",


            rules:[

                {

                    action:

                        "ACCESS_SECRET",

                    effect:

                        "ALLOW"

                }

            ]

        });


    }





    status() {

        return {

            initialized:

                this.initialized,


            policies:

                this.policies.size,


            rules:

                this.rules.length

        };

    }


}



window.PolicyService =

    new PolicyService();



Object.freeze(

    window.PolicyService

);
