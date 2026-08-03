/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-security-manager.js
 *
 * Build       : BUILD-000370
 * Version     : 1.0.0
 *
 * Mission:
 * Manage security policies,
 * access control and protection
 * of Knowledge Graph resources.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphSecurityManager {


    constructor(options = {}) {


        this.name =
            "Graph Security Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.permissions =
            new Map();



        this.auditLog =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_SECURITY_MANAGER_INITIALIZED"

        );


        return true;

    }





    /**
     * Create permission rule
     */


    grantPermission(

        subject,

        resource,

        action

    ) {


        if (

            !subject ||

            !resource ||

            !action

        ) {

            throw new Error(

                "Invalid permission definition."

            );

        }



        const key =

            this.createKey(

                subject,

                resource

            );



        if (

            !this.permissions.has(key)

        ) {


            this.permissions.set(

                key,

                []

            );

        }



        this.permissions

            .get(key)

            .push(action);



        this.audit(

            "PERMISSION_GRANTED",

            {

                subject,

                resource,

                action

            }

        );



        return true;

    }





    /**
     * Revoke permission
     */


    revokePermission(

        subject,

        resource,

        action

    ) {


        const key =

            this.createKey(

                subject,

                resource

            );



        const actions =

            this.permissions.get(key);



        if (

            !actions

        ) {

            return false;

        }



        const index =

            actions.indexOf(action);



        if (

            index === -1

        ) {

            return false;

        }



        actions.splice(

            index,

            1

        );



        this.audit(

            "PERMISSION_REVOKED",

            {

                subject,

                resource,

                action

            }

        );



        return true;

    }





    /**
     * Check access
     */


    checkAccess(

        subject,

        resource,

        action

    ) {


        const key =

            this.createKey(

                subject,

                resource

            );



        const actions =

            this.permissions.get(key)

            || [];



        const allowed =

            actions.includes(action);



        this.audit(

            allowed

                ? "ACCESS_GRANTED"

                : "ACCESS_DENIED",

            {

                subject,

                resource,

                action

            }

        );



        return allowed;

    }





    /**
     * Protect graph node
     */


    protectNode(

        nodeId,

        owner

    ) {


        this.grantPermission(

            owner,

            nodeId,

            "OWNER"

        );



        this.audit(

            "NODE_PROTECTED",

            {

                nodeId,

                owner

            }

        );


        return true;

    }





    /**
     * Audit history
     */


    getAuditLog() {


        return this.auditLog;

    }





    getSecurityStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            permissionRules:

                this.permissions.size,


            auditEvents:

                this.auditLog.length


        };

    }





    createKey(

        subject,

        resource

    ) {


        return (

            `${subject}:${resource}`

        );

    }





    audit(

        event,

        metadata = {}

    ) {


        const record = {


            event,


            metadata,


            timestamp:

                new Date()

        };



        this.auditLog.push(

            record

        );



        this.recordEvent(

            event,

            metadata

        );


    }





    recordEvent(

        event,

        metadata = {}

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    updateMetric(

        metric

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.updateMetric(

                metric

            );

        }

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "GRAPH_SECURITY_MANAGER_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphSecurityManager;
