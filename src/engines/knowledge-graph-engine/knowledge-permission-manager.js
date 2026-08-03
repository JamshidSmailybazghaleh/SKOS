/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-permission-manager.js
 *
 * Build       : BUILD-000418
 * Version     : 1.0.0
 *
 * Mission:
 * Centralized management of permissions for users,
 * AI agents and knowledge resources.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgePermissionManager {


    constructor(options = {}) {


        this.name =
            "Knowledge Permission Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.permissions =
            new Map();


        this.permissionGroups =
            new Map();


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_PERMISSION_MANAGER_INITIALIZED"

        );


        return true;

    }





    /**
     * Create permission
     */


    createPermission(

        permissionId,

        permission

    ) {


        if (

            !permissionId

        ) {


            throw new Error(

                "Permission id required."

            );

        }



        const record = {


            id:

                permissionId,


            subject:

                permission.subject || null,


            resource:

                permission.resource || null,


            actions:

                permission.actions || [],


            scope:

                permission.scope || "RESOURCE",


            active:

                true,


            createdAt:

                new Date()

        };



        this.permissions.set(

            permissionId,

            record

        );



        this.addHistory(

            "PERMISSION_CREATED",

            record

        );



        return record;

    }





    /**
     * Create permission group
     */


    createPermissionGroup(

        groupId,

        permissions = []

    ) {


        const group = {


            id:

                groupId,


            permissions,


            active:

                true,


            createdAt:

                new Date()

        };



        this.permissionGroups.set(

            groupId,

            group

        );



        this.addHistory(

            "PERMISSION_GROUP_CREATED",

            group

        );



        return group;

    }





    /**
     * Assign permission
     */


    assignPermission(

        permissionId,

        subject

    ) {


        const permission =

            this.permissions.get(

                permissionId

            );



        if (

            permission

        ) {


            permission.subject = subject;

        }



        this.addHistory(

            "PERMISSION_ASSIGNED",

            {

                permissionId,

                subject

            }

        );



        return permission;

    }





    /**
     * Revoke permission
     */


    revokePermission(

        permissionId

    ) {


        const permission =

            this.permissions.get(

                permissionId

            );



        if (

            permission

        ) {


            permission.active = false;

        }



        this.addHistory(

            "PERMISSION_REVOKED",

            {

                permissionId

            }

        );



        return permission;

    }





    /**
     * Restore permission
     */


    restorePermission(

        permissionId

    ) {


        const permission =

            this.permissions.get(

                permissionId

            );



        if (

            permission

        ) {


            permission.active = true;

        }



        this.addHistory(

            "PERMISSION_RESTORED",

            {

                permissionId

            }

        );



        return permission;

    }





    /**
     * Check permission
     */


    checkPermission(

        subject,

        resource,

        action

    ) {


        const result =

            Array.from(

                this.permissions.values()

            )

            .some(

                permission =>


                    permission.active &&

                    permission.subject === subject &&

                    permission.resource === resource &&

                    permission.actions.includes(

                        action

                    )

            );



        this.addHistory(

            "PERMISSION_CHECKED",

            {

                subject,

                resource,

                action,

                allowed:

                    result

            }

        );



        return result;

    }





    /**
     * Get permission
     */


    getPermission(

        permissionId

    ) {


        return this.permissions.get(

            permissionId

        );

    }





    getPermissions() {


        return Array.from(

            this.permissions.values()

        );

    }





    getHistory() {


        return this.history;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            permissions:

                this.permissions.size,


            groups:

                this.permissionGroups.size,


            activePermissions:

                this.getPermissions()

                    .filter(

                        item =>

                            item.active

                    )

                    .length,


            historyEvents:

                this.history.length


        };

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            permissions:

                this.permissions.size,


            groups:

                this.permissionGroups.size


        };

    }





    addHistory(

        event,

        data = {}

    ) {


        const record = {


            event,


            data,


            timestamp:

                new Date()

        };


        this.history.push(

            record

        );


        this.recordEvent(

            event,

            data

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

            "KNOWLEDGE_PERMISSION_MANAGER_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgePermissionManager;
