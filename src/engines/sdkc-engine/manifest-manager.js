/**
 * Manifest Manager
 *
 * ENG-SDKC-004
 * BUILD-000001
 */

const fs = require("fs");
const path = require("path");

class ManifestManager {

    constructor(repositoryManager) {

        this.repository = repositoryManager;

    }

    createManifest(objectId, options = {}) {

        const objectDirectory =
            this.repository.createObjectRepository(objectId);

        const manifest = {

            objectId: objectId,

            build:
                options.build || "BUILD-000001",

            version:
                options.version || "1.0.0",

            status:
                options.status || "ACTIVE",

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString(),

            storage: {

                metadata: "metadata.json",

                content: "content/",

                history: "history.log"

            }

        };

        const manifestPath =
            path.join(
                objectDirectory,
                "manifest.json"
            );

        fs.writeFileSync(

            manifestPath,

            JSON.stringify(
                manifest,
                null,
                4
            ),

            "utf8"

        );

        return manifest;

    }

    loadManifest(objectId) {

        const manifestFile =
            path.join(
                this.repository.objectPath(objectId),
                "manifest.json"
            );

        if (!fs.existsSync(manifestFile))
            return null;

        return JSON.parse(
            fs.readFileSync(
                manifestFile,
                "utf8"
            )
        );

    }

    updateManifest(objectId, values = {}) {

        const manifest =
            this.loadManifest(objectId);

        if (!manifest)
            return null;

        Object.assign(
            manifest,
            values
        );

        manifest.updatedAt =
            new Date().toISOString();

        const manifestFile =
            path.join(
                this.repository.objectPath(objectId),
                "manifest.json"
            );

        fs.writeFileSync(

            manifestFile,

            JSON.stringify(
                manifest,
                null,
                4
            ),

            "utf8"

        );

        return manifest;

    }

}

module.exports = ManifestManager;
