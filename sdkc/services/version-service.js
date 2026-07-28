/*
====================================================
SKOS Mission Control

Version Service

File:
version-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const VersionService = {


    async initialize() {

        Logger.info(
            "Version Service Initializing..."
        );

        return true;

    },


    createVersion(object) {


        if (!object) {

            return null;

        }


        if (!object.versions) {

            object.versions = [];

        }


        const currentVersion =

            object.version || "1.0";


        const newVersion =

            this.incrementVersion(
                currentVersion
            );


        object.versions.push({

            version:
                currentVersion,

            created:

                new Date()
                .toISOString(),

            status:
                "ARCHIVED"

        });


        object.version = newVersion;


        object.modified =

            new Date()
            .toISOString();


        if (window.EventBus) {

            EventBus.publish(

                "object.version.created",

                {

                    id:
                        object.id,

                    version:
                        newVersion

                }

            );

        }


        return newVersion;

    },


    incrementVersion(version) {


        const parts =

            version.split(".");


        let major =

            parseInt(parts[0]);


        let minor =

            parseInt(parts[1] || 0);


        minor++;


        return (

            major +

            "." +

            minor

        );

    },


    getVersions(object) {


        if (!object) {

            return [];

        }


        return object.versions || [];

    },


    getCurrentVersion(object) {


        return (

            object.version ||

            "1.0"

        );

    },


    compare(versionA, versionB) {


        const a =

            versionA
            .split(".")
            .map(Number);


        const b =

            versionB
            .split(".")
            .map(Number);



        if (a[0] !== b[0]) {

            return a[0] - b[0];

        }


        return a[1] - b[1];

    },


    rollback(object, version) {


        if (!object) {

            return false;

        }


        const exists =

            this.getVersions(object)
            .some(

                item =>

                item.version === version

            );


        if (!exists) {

            return false;

        }


        object.version = version;


        object.modified =

            new Date()
            .toISOString();


        if (window.EventBus) {

            EventBus.publish(

                "object.version.rollback",

                {

                    id:
                        object.id,

                    version

                }

            );

        }


        return true;

    },


    status() {

        return "READY";

    }

};


window.VersionService =

    VersionService;


Object.freeze(
    VersionService
);
