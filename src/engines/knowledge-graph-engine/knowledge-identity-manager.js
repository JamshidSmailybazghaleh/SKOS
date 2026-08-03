/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-identity-manager.js
 *
 * Build       : BUILD-000420
 * Version     : 1.0.0
 *
 * Mission:
 * Manage identities of humans, organizations,
 * services and AI agents inside SKOS.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeIdentityManager {


    constructor(options = {}) {


        this.name =
            "Knowledge Identity Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.identities =
            new Map();


        this.groups =
            new Map();


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_IDENTITY_MANAGER_INITIALIZED"

        );


        return true;

    }





    /**
     * Create identity
     */


    createIdentity(

        identityId,

        identity

    ) {


        if (

            !identityId

        ) {


            throw new Error(

                "Identity id required."

            );

        }



        const record = {


            id:

                identityId,


            name:

                identity.name || "Unknown",


            type:

                identity.type || "USER",


            organization:

                identity.organization || null,


            roles:

                identity.roles || [],


            active:

                true,


            verified:

                false,


            createdAt:

                new Date()

        };



        this.identities.set(

            identityId,

            record

        );



        this.recordEvent(

            "IDENTITY_CREATED",

            {

                identityId

            }

        );



        return record;

    }





    /**
     * Verify identity
     */


    verifyIdentity(

        identityId

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if (

            identity

        ) {


            identity.verified = true;

        }



        this.recordEvent(

            "IDENTITY_VERIFIED",

            {

                identityId

            }

        );



        return identity;

    }





    /**
     * Disable identity
     */


    disableIdentity(

        identityId

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if (

            identity

        ) {


            identity.active = false;

        }



        this.recordEvent(

            "IDENTITY_DISABLED",

            {

                identityId

            }

        );



        return identity;

    }





    /**
     * Enable identity
     */


    enableIdentity(

        identityId

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if (

            identity

        ) {


            identity.active = true;

        }



        this.recordEvent(

            "IDENTITY_ENABLED",

            {

                identityId

            }

        );



        return identity;

    }





    /**
     * Add role
     */


    addRole(

        identityId,

        role

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if (

            identity &&

            !identity.roles.includes(

                role

            )

        ) {


            identity.roles.push(

                role

            );

        }



        this.recordEvent(

            "ROLE_ASSIGNED",

            {

                identityId,

                role

            }

        );



        return identity;

    }





    /**
     * Remove role
     */


    removeRole(

        identityId,

        role

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if (

            identity

        ) {


            identity.roles =

                identity.roles.filter(

                    item =>

                        item !== role

                );

        }



        this.recordEvent(

            "ROLE_REMOVED",

            {

                identityId,

                role

            }

        );



        return identity;

    }





    /**
     * Create identity group
     */


    createGroup(

        groupId,

        members = []

    ) {


        const group = {


            id:

                groupId,


            members,


            active:

                true,


            createdAt:

                new Date()

        };



        this.groups.set(

            groupId,

            group

        );



        this.recordEvent(

            "IDENTITY_GROUP_CREATED",

            {

                groupId

            }

        );



        return group;

    }





    /**
     * Add identity to group
     */


    addToGroup(

        groupId,

        identityId

    ) {


        const group =

            this.groups.get(

                groupId

            );



        if (

            group &&

            !group.members.includes(

                identityId

            )

        ) {


            group.members.push(

                identityId

            );

        }



        return group;

    }





    getIdentity(

        identityId

    ) {


        return this.identities.get(

            identityId

        );

    }





    getIdentities() {


        return Array.from(

            this.identities.values()

        );

    }





    getGroups() {


        return Array.from(

            this.groups.values()

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


            identities:

                this.identities.size,


            groups:

                this.groups.size,


            verified:

                this.getIdentities()

                    .filter(

                        item =>

                            item.verified

                    )

                    .length,


            active:

                this.getIdentities()

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


            identities:

                this.identities.size,


            groups:

                this.groups.size


        };

    }





    recordEvent(

        event,

        metadata = {}

    ) {


        const record = {


            event,


            metadata,


            timestamp:

                new Date()

        };



        this.history.push(

            record

        );



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

            "KNOWLEDGE_IDENTITY_MANAGER_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeIdentityManager;
