/**
 * Object Storage
 *
 * ENG-SDKC-003
 * BUILD-000001
 */

const fs = require("fs");
const path = require("path");

class ObjectStorage {

    constructor(repositoryManager) {

        this.repository = repositoryManager;

    }

    storeMetadata(objectId, metadata) {

        const objectPath =
            this.repository.createObjectRepository(objectId);

        const metadataPath =
            path.join(objectPath, "metadata.json");

        fs.writeFileSync(
            metadataPath,
            JSON.stringify(metadata, null, 4),
            "utf8"
        );

        return metadataPath;

    }

    storeManifest(objectId, manifest) {

        const objectPath =
            this.repository.createObjectRepository(objectId);

        const manifestPath =
            path.join(objectPath, "manifest.json");

        fs.writeFileSync(
            manifestPath,
            JSON.stringify(manifest, null, 4),
            "utf8"
        );

        return manifestPath;

    }

    storeContent(objectId, sourceFile) {

        const objectPath =
            this.repository.createObjectRepository(objectId);

        const contentDirectory =
            path.join(objectPath, "content");

        if (!fs.existsSync(contentDirectory)) {

            fs.mkdirSync(
                contentDirectory,
                { recursive: true }
            );

        }

        const fileName =
            path.basename(sourceFile);

        const destination =
            path.join(
                contentDirectory,
                fileName
            );

        fs.copyFileSync(
            sourceFile,
            destination
        );

        return destination;

    }

    loadMetadata(objectId) {

        const file =
            path.join(
                this.repository.objectPath(objectId),
                "metadata.json"
            );

        if (!fs.existsSync(file))
            return null;

        return JSON.parse(
            fs.readFileSync(file, "utf8")
        );

    }

    exists(objectId) {

        return this.repository.exists(objectId);

    }

}

module.exports = ObjectStorage;
