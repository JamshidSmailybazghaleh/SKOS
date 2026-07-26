/*
====================================================
SKOS Mission Control

Knowledge Linker

File:
knowledge-linker.js

Operation:
OP-007

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const KnowledgeLinker = {

    initialized: false,

    links: [],

    async initialize() {

        Logger.info(
            "Knowledge Linker Initializing..."
        );

        this.links = [];

        this.initialized = true;

        Logger.info(
            "Knowledge Linker Ready."
        );

        return true;

    },

    create(sourceId, targetId, relationType) {

        if (!sourceId || !targetId || !relationType) {

            Logger.error(
                "Invalid Knowledge Link."
            );

            return false;

        }

        const link = {

            linkId: this.generateLinkId(),

            sourceId: sourceId,

            targetId: targetId,

            relation: relationType,

            createdAt: new Date().toISOString()

        };

        this.links.push(link);

        Logger.info(
            "Knowledge Link Created : " +
            link.linkId
        );

        return link;

    },

    getBySource(sourceId) {

        return this.links.filter(
            link => link.sourceId === sourceId
        );

    },

    getByTarget(targetId) {

        return this.links.filter(
            link => link.targetId === targetId
        );

    },

    getAll() {

        return this.links;

    },

    count() {

        return this.links.length;

    },

    clear() {

        this.links = [];

        Logger.info(
            "Knowledge Links Cleared."
        );

    },

    generateLinkId() {

        return "LNK-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(KnowledgeLinker);
