/*
====================================================
SKOS Mission Control

ID Registry Service

File:
id-registry-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const IDRegistryService = {

    registry: null,

    path:
        "sdkc/metadata/id-registry.json",


    async initialize() {

        Logger.info(
            "ID Registry Service Initializing..."
        );

        return await this.load();

    },


    async load() {

        try {

            const response = await fetch(
                this.path
            );

            if (!response.ok) {

                throw new Error(
                    "id-registry.json not found."
                );

            }


            this.registry =
                await response.json();


            Logger.info(
                "ID Registry Loaded."
            );


            return true;

        }

        catch(error) {

            Logger.error(
                error.message
            );


            return false;

        }

    },


    async reserveID(type) {


        if (!this.registry) {

            await this.load();

        }


        if (
            !this.registry.counters[type]
        ) {

            this.registry.counters[type] = 0;

        }


        this.registry.counters[type]++;


        const id =

            type +

            "-" +

            String(

                this.registry.counters[type]

            )
            .padStart(6,"0");


        return id;

    },


    exists(id) {


        if (!this.registry) {

            return false;

        }


        return this.registry
            .registeredObjects
            .some(

                object =>

                object.id === id

            );

    },


    async register(object) {


        if (!this.registry) {

            await this.load();

        }


        if (
            this.exists(object.id)
        ) {

            Logger.warning(

                "ID already registered: " +

                object.id

            );


            return false;

        }


        this.registry
            .registeredObjects
            .push({

                id:
                    object.id,

                type:
                    object.type,

                title:
                    object.title,

                status:
                    object.status,

                created:
                    new Date()
                    .toISOString(),

                path:
                    object.path || ""

            });


        this.registry.lastUpdated =

            new Date()
            .toISOString();


        Logger.info(

            "ID Registered: " +

            object.id

        );


        return true;

    },


    getObject(id) {


        if (!this.registry) {

            return null;

        }


        return this.registry
            .registeredObjects
            .find(

                object =>

                object.id === id

            ) || null;

    },


    statistics() {


        if (!this.registry) {

            return null;

        }


        return {

            total:

            this.registry
                .registeredObjects
                .length,


            counters:

            this.registry.counters

        };

    },


    status() {


        return this.registry

            ? "READY"

            : "NOT LOADED";


    }


};


window.IDRegistryService =
    IDRegistryService;


Object.freeze(
    IDRegistryService
);
