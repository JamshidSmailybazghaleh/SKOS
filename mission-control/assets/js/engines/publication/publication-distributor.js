/*
====================================================
SKOS Mission Control

Publication Distributor

File:
publication-distributor.js

Engine:
OP-001

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const PublicationDistributor = {

    async distribute(asset, channel) {

        Logger.info(
            "Distribution Started : " + channel
        );

        if (!asset) {

            Logger.error(
                "No Asset Supplied."
            );

            return false;

        }

        switch (channel.toLowerCase()) {

            case "library":

                return await this.publishLibrary(asset);

            case "daneshsaz":

                return await this.publishDaneshsaz(asset);

            case "smaily":

                return await this.publishSmaily(asset);

            case "international":

                return await this.publishInternational(asset);

            case "github":

                return await this.publishGithub(asset);

            default:

                Logger.error(
                    "Unknown Distribution Channel."
                );

                return false;

        }

    },

    async publishLibrary(asset) {

        Logger.info(
            "Publishing To Digital Library..."
        );

        return true;

    },

    async publishDaneshsaz(asset) {

        Logger.info(
            "Publishing To Daneshsaz..."
        );

        return true;

    },

    async publishSmaily(asset) {

        Logger.info(
            "Publishing To Smaily Bookstore..."
        );

        return true;

    },

    async publishInternational(asset) {

        Logger.info(
            "Publishing To International Bookstore..."
        );

        return true;

    },

    async publishGithub(asset) {

        Logger.info(
            "Publishing To GitHub Pages..."
        );

        return true;

    }

};

Object.freeze(PublicationDistributor);
