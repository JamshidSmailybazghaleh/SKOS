/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Subscription Manager
 * ------------------------------------------------------------
 * File      : subscription-manager.js
 * Operation : OP-014
 * Build     : BUILD-000369
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Manages subscription-based access models for
 * knowledge products within SKOS Marketplace.
 *
 * Responsibilities:
 * - Create subscription plans
 * - Manage user subscriptions
 * - Control access periods
 * - Track subscription lifecycle
 * - Prepare recurring revenue foundation
 *
 * Principle:
 * Subscription Manager manages access models.
 *
 * It does not:
 * - create knowledge
 * - process financial settlement
 * - define product quality
 *
 * ============================================================
 */


class SubscriptionManager {


    constructor(config = {}) {


        this.name = "SubscriptionManager";

        this.version = "1.0.0";


        this.config = config;


        this.initialized = false;

        this.running = false;



        this.plans = new Map();

        this.subscriptions = new Map();

        this.history = [];



        this.statistics = {


            plansCreated: 0,

            subscriptionsCreated: 0,

            activeSubscriptions: 0,

            cancelledSubscriptions: 0


        };


    }





    /**
     * Initialize Manager
     */
    initialize() {


        if (this.initialized) {


            return true;


        }



        this.initialized = true;



        return true;


    }





    /**
     * Execute Manager
     */
    execute() {


        if (!this.initialized) {


            this.initialize();


        }



        this.running = true;



        return true;


    }





    /**
     * Shutdown
     */
    shutdown() {


        this.running = false;



        return true;


    }





    /**
     * Create Subscription Plan
     */
    createPlan(plan = {}) {



        const subscriptionPlan = {


            id: this.generateID(),


            name: plan.name || "Standard Plan",


            productID: plan.productID || null,


            duration:

                plan.duration || "MONTHLY",



            accessLevel:

                plan.accessLevel || "BASIC",



            price:

                plan.price || 0,



            currency:

                plan.currency || "GBP",



            status: "ACTIVE",


            createdAt: new Date()



        };





        this.plans.set(

            subscriptionPlan.id,

            subscriptionPlan

        );



        this.statistics.plansCreated++;



        this.record({

            action: "PLAN_CREATED",

            planID: subscriptionPlan.id


        });



        return subscriptionPlan;


    }





    /**
     * Create Subscription
     */
    subscribe(userID, planID) {



        const plan = this.plans.get(

            planID

        );



        if (!plan) {


            return null;


        }





        const subscription = {


            id: this.generateID(),


            userID,


            planID,


            status: "ACTIVE",


            startedAt: new Date(),


            expiresAt: this.calculateExpiry(

                plan.duration

            )



        };





        this.subscriptions.set(

            subscription.id,

            subscription

        );



        this.statistics.subscriptionsCreated++;


        this.statistics.activeSubscriptions++;



        this.record({

            action: "SUBSCRIPTION_CREATED",

            subscriptionID: subscription.id


        });



        return subscription;


    }





    /**
     * Calculate Expiry
     */
    calculateExpiry(duration) {


        const date = new Date();



        switch(duration) {


            case "YEARLY":

                date.setFullYear(

                    date.getFullYear() + 1

                );

                break;



            case "MONTHLY":

                date.setMonth(

                    date.getMonth() + 1

                );

                break;



            case "WEEKLY":

                date.setDate(

                    date.getDate() + 7

                );

                break;



            default:

                date.setDate(

                    date.getDate() + 1

                );


        }



        return date;


    }





    /**
     * Cancel Subscription
     */
    cancel(subscriptionID) {



        const subscription = this.subscriptions.get(

            subscriptionID

        );



        if (!subscription) {


            return false;


        }



        subscription.status = "CANCELLED";


        subscription.cancelledAt = new Date();



        this.statistics.cancelledSubscriptions++;


        this.statistics.activeSubscriptions--;



        this.record({

            action: "SUBSCRIPTION_CANCELLED",

            subscriptionID


        });



        return true;


    }





    /**
     * Check Access
     */
    hasAccess(userID, productID) {



        for (const subscription of this.subscriptions.values()) {



            if (

                subscription.userID === userID &&

                subscription.status === "ACTIVE"

            ) {



                const plan = this.plans.get(

                    subscription.planID

                );



                if (

                    plan &&

                    plan.productID === productID &&

                    subscription.expiresAt > new Date()

                ) {


                    return true;


                }


            }


        }



        return false;


    }





    /**
     * Get Subscription
     */
    get(id) {


        return this.subscriptions.get(id);


    }





    /**
     * List Plans
     */
    listPlans() {


        return Array.from(

            this.plans.values()

        );


    }





    /**
     * List Subscriptions
     */
    listSubscriptions() {


        return Array.from(

            this.subscriptions.values()

        );


    }





    /**
     * Record History
     */
    record(event) {


        this.history.push({


            timestamp: new Date(),


            ...event


        });


    }





    /**
     * Generate ID
     */
    generateID() {


        return (

            "subscription-" +

            Date.now() +

            "-" +

            Math.floor(

                Math.random() * 100000

            )

        );


    }





    /**
     * Health Check
     */
    healthCheck() {


        return {


            manager: this.name,


            version: this.version,


            initialized: this.initialized,


            running: this.running,


            plans: this.plans.size,


            subscriptions: this.subscriptions.size,


            statistics: this.statistics



        };


    }





    /**
     * Reset
     */
    reset() {


        this.plans.clear();

        this.subscriptions.clear();

        this.history = [];



        this.statistics = {


            plansCreated: 0,

            subscriptionsCreated: 0,

            activeSubscriptions: 0,

            cancelledSubscriptions: 0


        };


    }


}





/**
 * Export
 */

if (typeof module !== "undefined") {


    module.exports = SubscriptionManager;


}



if (typeof window !== "undefined") {


    window.SubscriptionManager = SubscriptionManager;


}
