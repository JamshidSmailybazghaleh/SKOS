/*
====================================================
SKOS Mission Control

Publication Engine

BUILD-000370

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

const PublicationEngine = {

    async initialize() {

        Logger.info(
            "Publication Engine Initializing..."
        );

        return true;

    },

    async publish(objectId) {

        Logger.info(
            "Publication Started: " + objectId
        );

        const object =

            await RepositoryService.load(
                objectId
            );

        if (!object) {

            throw new Error(
                "Knowledge Object Not Found."
            );

        }

        await this.validate(object);

        const outputs =

            await this.generateOutputs(
                object
            );

        await this.publishLibrary(
            outputs
        );

        await this.publishBookstore(
            outputs
        );

        await this.publishGitHub(
            outputs
        );

        await this.registerPublication(
            object
        );

        AuditService.record(

            "PUBLICATION_COMPLETED",

            {

                id: object.id,

                version: object.version

            }

        );

        Logger.info(
            "Publication Completed."
        );

        return outputs;

    },

    async validate(object) {

        return MetadataValidator.validate(
            object
        );

    },

    async generateOutputs(object) {

        return {

            html:

                OutputBuilder.buildHTML(
                    object
                ),

            pdf:

                OutputBuilder.buildPDF(
                    object
                ),

            metadata:

                object.metadata

        };

    },

    async publishLibrary(outputs) {

        return LibraryService.publish(
            outputs
        );

    },

    async publishBookstore(outputs) {

        return BookstoreService.publish(
            outputs
        );

    },

    async publishGitHub(outputs) {

        return GitHubPublisher.publish(
            outputs
        );

    },

    async registerPublication(object) {

        return PublicationRegistry.register({

            id: object.id,

            version: object.version,

            publishedAt:

                new Date().toISOString()

        });

    },

    status() {

        return "READY";

    }

};

window.PublicationEngine =
    PublicationEngine;

Object.freeze(
    PublicationEngine);
