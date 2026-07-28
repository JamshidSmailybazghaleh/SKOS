/*
====================================================
SKOS Mission Control

Authorization Service

BUILD-000377

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

class AuthorizationService {

    constructor() {

        this.roles = new Map();

        this.permissions = new Map();

        this.policies = new Map();

        this.initialized = false;

    }


    async initialize() {

        Logger.info(
            "Authorization Service Initializing..."
        );

        this.loadDefaultRoles();

        this.initialized = true;

        return true;

    }


    createRole(
        roleName,
        permissions
    ) {

        this.roles.set(

            roleName,

            permissions

        );

        return true;

    }


    addPermission(
        permission,
        resource,
        action
    ) {

        this.permissions.set(

            permission,

            {

                resource,

                action

            }

        );

    }


    check(
        role,
        resource,
        action
    ) {

        const permissions =

            this.roles.get(role);


        if (!permissions) {

            return false;

        }


        return permissions.some(

            permission => {

                const item =

                    this.permissions.get(
                        permission
                    );


                return (

                    item.resource === resource

                    &&

                    item.action === action

                );

            }

        );

    }


    loadDefaultRoles() {


        this.addPermission(
            "REPOSITORY_WRITE",
            "repository",
            "write"
        );


        this.addPermission(
            "PUBLICATION_CREATE",
            "publication",
            "create"
        );


        this.addPermission(
            "BOOKSTORE_MANAGE",
            "bookstore",
            "manage"
        );


        this.createRole(

            "SYSTEM_ADMIN",

            [

                "REPOSITORY_WRITE",

                "PUBLICATION_CREATE",

                "BOOKSTORE_MANAGE"

            ]

        );


        this.createRole(

            "EDITOR",

            [

                "REPOSITORY_WRITE",

                "PUBLICATION_CREATE"

            ]

        );

    }


    status() {

        return {

            initialized:
                this.initialized,

            roles:
                this.roles.size,

            permissions:
                this.permissions.size

        };

    }

}


window.AuthorizationService =

    new AuthorizationService();


Object.freeze(

    window.AuthorizationService

);
