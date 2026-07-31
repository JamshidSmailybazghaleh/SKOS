/**
 * Repository Manager
 *
 * ENG-SDKC-002
 * BUILD-000001
 */

const fs = require("fs");
const path = require("path");

class RepositoryManager {

    constructor(options = {}) {

        this.rootPath =
            options.rootPath ||
            path.join(
                process.cwd(),
                "sdkc",
                "repository",
                "objects"
            );

    }


    initialize() {

        if (!fs.existsSync(this.rootPath)) {

            fs.mkdirSync(
                this.rootPath,
                {
                    recursive: true
                }
            );

        }

        return true;

    }


    objectPath(objectId) {

        return path.join(
            this.rootPath,
            objectId
        );

    }


    createObjectRepository(objectId) {

        const objectDirectory =
            this.objectPath(objectId);

        if (!fs.existsSync(objectDirectory)) {

            fs.mkdirSync(
                objectDirectory,
                {
                    recursive: true
                }
            );

        }

        return objectDirectory;

    }


    exists(objectId) {

        return fs.existsSync(
            this.objectPath(objectId)
        );

    }


    listObjects() {

        if (!fs.existsSync(this.rootPath)) {

            return [];

        }

        return fs.readdirSync(this.rootPath);

    }


    removeObject(objectId) {

        const directory =
            this.objectPath(objectId);

        if (fs.existsSync(directory)) {

            fs.rmSync(
                directory,
                {
                    recursive: true,
                    force: true
                }
            );

            return true;

        }

        return false;

    }


    getRepositoryPath() {

        return this.rootPath;

    }

}

module.exports = RepositoryManager;
