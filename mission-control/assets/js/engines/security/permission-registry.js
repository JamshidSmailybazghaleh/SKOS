/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Permission Registry
 * ------------------------------------------------------------
 * File      : permission-registry.js
 * Operation : OP-012
 * Build     : BUILD-000350
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Provides a centralized permission catalogue for SKOS.
 *
 * Responsibilities:
 * - Register permissions
 * - Maintain permission definitions
 * - Classify permission domains
 * - Validate permission existence
 * - Provide permission discovery services
 *
 * Principle:
 * Permission Registry defines available permissions.
 * It does not grant permissions.
 * Access Control decides permission usage.
 * ============================================================
 */


class PermissionRegistry {


    constructor(config = {}) {


        this.name = "PermissionRegistry";

        this.version = "1.0.0";


        this.config = config;


        this.initialized = false;

        this.running = false;



        this.permissions = new Map();

        this.categories = new Map();

        this.history = [];



        this.statistics = {


            registered: 0,

            removed: 0,

            validations: 0,

            failedValidations: 0


        };


    }





    /**
     * Initialize Registry
     */
    initialize() {


        if (this.initialized) {


            return true;


        }



        this.initialized = true;



        return true;


    }





    /**
     * Execute Registry
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
     * Register Permission
     */
    register(name, definition = {}) {



        if (!name) {


            return false;


        }





        const permission = {


            name,


            description: definition.description || "",


            category: definition.category || "GENERAL",


            level: definition.level || "STANDARD",


            status: "ACTIVE",


            createdAt: new Date()


        };





        this.permissions.set(

            name,

            permission

        );



        this.statistics.registered++;



        this.record({

            action: "PERMISSION_REGISTERED",

            permission: name


        });



        return true;


    }





    /**
     * Register Category
     */
    registerCategory(name, metadata = {}) {



        this.categories.set(name, {


            name,

            metadata,

            createdAt: new Date()


        });



        this.record({

            action: "CATEGORY_REGISTERED",

            category: name


        });



        return true;


    }





    /**
     * Validate Permission
     */
    validate(name) {


        this.statistics.validations++;



        const exists = this.permissions.has(name);



        if (!exists) {


            this.statistics.failedValidations++;


        }



        return exists;


    }





    /**
     * Get Permission
     */
    get(name) {


        return this.permissions.get(name);


    }





    /**
     * List Permissions
     */
    list() {


        return Array.from(

            this.permissions.values()

        );


    }





    /**
     * Find By Category
     */
    findByCategory(category) {


        return this.list().filter(

            permission =>

            permission.category === category

        );


    }





    /**
     * Remove Permission
     */
    remove(name) {



        const result = this.permissions.delete(name);



        if (result) {


            this.statistics.removed++;



            this.record({

                action: "PERMISSION_REMOVED",

                permission: name


            });


        }



        return result;


    }





    /**
     * Enable Permission
     */
    enable(name) {


        const permission = this.permissions.get(name);



        if (!permission) {


            return false;


        }



        permission.status = "ACTIVE";



        return true;


    }





    /**
     * Disable Permission
     */
    disable(name) {


        const permission = this.permissions.get(name);



        if (!permission) {


            return false;


        }



        permission.status = "INACTIVE";



        return true;


    }





    /**
     * Check Active Permission
     */
    isActive(name) {


        const permission = this.permissions.get(name);



        return (

            permission &&

            permission.status === "ACTIVE"

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
     * Health Check
     */
    healthCheck() {


        return {


            registry: this.name,


            version: this.version,


            initialized: this.initialized,


            running: this.running,


            permissions: this.permissions.size,


            categories: this.categories.size,


            statistics: this.statistics



        };


    }





    /**
     * Reset
     */
    reset() {


        this.permissions.clear();


        this.categories.clear();


        this.history = [];



        this.statistics = {


            registered: 0,

            removed: 0,

            validations: 0,

            failedValidations: 0


        };


    }


}





/**
 * Export
 */

if (typeof module !== "undefined") {


    module.exports = PermissionRegistry;


}



if (typeof window !== "undefined") {


    window.PermissionRegistry = PermissionRegistry;


}
