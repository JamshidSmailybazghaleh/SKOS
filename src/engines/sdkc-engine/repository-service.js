/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SDKC Repository Service
 * File      : repository-service.js
 *
 * ILR       : ILR-001.71-N
 * Version   : 1.0.0
 *
 * Mission:
 * Unified service facade for SDKC Repository.
 * ==========================================================
 */

const fs = require("fs");
const path = require("path");

const RepositoryManager =
    require("./repository-manager");

const ObjectStorage =
    require("./object-storage");

const ManifestManager =
    require("./manifest-manager");

const HistoryManager =
    require("./history-manager");


class RepositoryService {

    constructor(options = {}) {

        this.rootPath =
            options.rootPath ||
            path.join(
                process.cwd(),
                "sdkc",
                "repository",
                "objects"
            );

        this.repository =
            new RepositoryManager({
                rootPath:
                    this.rootPath
            });

        this.storage =
            new ObjectStorage(
                this.repository
            );

        this.manifest =
            new ManifestManager(
                this.repository
            );

        this.history =
            new HistoryManager(
                this.repository
            );

        this.statusValue =
            "CREATED";
    }


    initialize() {

        this.repository.initialize();

        this.history.initialize();

        this.statusValue =
            "READY";

        return true;
    }


    connect() {

        return this.initialize();
    }


    store(object) {

        if (
            !object ||
            !object.id
        ) {

            throw new Error(
                "Knowledge Object must contain a valid id."
            );
        }


        if (!object.type) {

            throw new Error(
                "Knowledge Object must contain a type."
            );
        }


        if (!object.title) {

            throw new Error(
                "Knowledge Object must contain a title."
            );
        }


        if (this.exists(object.id)) {

            throw new Error(
                "Knowledge Object already exists: " +
                object.id
            );
        }


        const objectDirectory =
            this.repository.createObjectRepository(
                object.id
            );


        const objectFile =
            path.join(
                objectDirectory,
                "object.json"
            );


        fs.writeFileSync(
            objectFile,
            JSON.stringify(
                object,
                null,
                4
            ),
            "utf8"
        );


        this.storage.storeMetadata(
            object.id,
            object.metadata || {}
        );


        this.manifest.createManifest(
            object.id,
            {
                version:
                    object.version || "1.0.0",

                status:
                    object.status || "ACTIVE"
            }
        );


        this.history.addEvent(
            object.id,
            "OBJECT_CREATED",
            {
                type:
                    object.type,

                title:
                    object.title
            }
        );


        return object;
    }


    save(object) {

        return this.store(object);
    }


    load(objectId) {

        if (!objectId) {

            return null;
        }


        const objectFile =
            path.join(
                this.repository.objectPath(
                    objectId
                ),
                "object.json"
            );


        if (
            !fs.existsSync(objectFile)
        ) {

            return null;
        }


        try {

            return JSON.parse(
                fs.readFileSync(
                    objectFile,
                    "utf8"
                )
            );

        }

        catch (error) {

            throw new Error(
                "Failed to load knowledge object: " +
                objectId
            );

        }
    }


    exists(objectId) {

        if (!objectId) {

            return false;
        }


        return (
            this.repository.exists(
                objectId
            ) &&
            fs.existsSync(
                path.join(
                    this.repository.objectPath(
                        objectId
                    ),
                    "object.json"
                )
            )
        );
    }


    list() {

        const ids =
            this.repository.listObjects();


        const objects = [];


        for (
            const id of ids
        ) {

            const object =
                this.load(id);


            if (object) {

                objects.push(
                    object
                );
            }
        }


        return objects;
    }


    remove(objectId) {

        if (!this.exists(objectId)) {

            return false;
        }


        this.history.addEvent(
            objectId,
            "OBJECT_REMOVED"
        );


        return this.repository.removeObject(
            objectId
        );
    }


    update(
        objectId,
        values = {}
    ) {

        const object =
            this.load(objectId);


        if (!object) {

            return null;
        }


        Object.assign(
            object,
            values
        );


        const objectFile =
            path.join(
                this.repository.objectPath(
                    objectId
                ),
                "object.json"
            );


        fs.writeFileSync(
            objectFile,
            JSON.stringify(
                object,
                null,
                4
            ),
            "utf8"
        );


        if (values.metadata) {

            this.storage.storeMetadata(
                objectId,
                object.metadata
            );
        }


        this.manifest.updateManifest(
            objectId,
            {
                version:
                    object.version,

                status:
                    object.status
            }
        );


        this.history.addEvent(
            objectId,
            "OBJECT_UPDATED",
            {
                values
            }
        );


        return object;
    }


    getStatistics() {

        const objects =
            this.list();


        const statistics = {

            totalObjects:
                objects.length,

            types: {}

        };


        for (
            const object of objects
        ) {

            const type =
                object.type ||
                "UNKNOWN";


            if (
                !statistics.types[type]
            ) {

                statistics.types[type] =
                    0;
            }


            statistics.types[type]++;
        }


        return statistics;
    }


    status() {

        return this.statusValue;
    }


    getStatus() {

        return this.status();
    }


    synchronize() {
        const objects = this.list();

        const statistics = {
            totalObjects: objects.length
        };

        return {
            index: {
                statistics,
                objects
            },
            manifest: {
                statistics,
                objects
            }
        };
    }

    getStatus() {
        return {
            status: "CONNECTED",
            totalObjects: this.list().length
        };
    }

    shutdown() {

        this.statusValue =
            "STOPPED";

        return true;
    }

}



module.exports =
    RepositoryService;
