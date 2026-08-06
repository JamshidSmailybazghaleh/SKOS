/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Authentication Engine
 * File        : knowledge-authentication-engine.js
 *
 * Build       : BUILD-000909
 * Version     : 1.0.0
 *
 * Mission:
 * Authenticate users, systems and AI agents
 * before accessing knowledge resources.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class KnowledgeAuthenticationEngine {

    static STATUS = {

        CREATED: "CREATED",

        INITIALIZED: "INITIALIZED",

        SHUTDOWN: "SHUTDOWN"

    };



    constructor(options = {}) {

        this.name =
            "Knowledge Authentication Engine";

        this.version =
            "1.0.0";

        this.status =
            KnowledgeAuthenticationEngine.STATUS.CREATED;

        this.monitoring =
            options.monitoring || null;

        this.identities =
            new Map();

        this.credentials =
            new Map();

        this.sessions =
            new Map();

        this.authenticationLogs =
            [];

        this.failedAttempts =
            new Map();

        this.lockedAccounts =
            new Set();

    }



    initialize() {

        this.status =
            KnowledgeAuthenticationEngine.STATUS.INITIALIZED;

        this.recordEvent(
            "KNOWLEDGE_AUTHENTICATION_ENGINE_INITIALIZED"
        );

        return true;

    }



    addIdentity(identityId, identity) {

        if (!identityId) {

            throw new Error(
                "Identity id required."
            );

        }

        const record = {

            id:
                identityId,

            name:
                identity.name || "Unknown",

            type:
                identity.type || "USER",

            active:
                true,

            createdAt:
                new Date()

        };

        this.identities.set(
            identityId,
            record
        );

        this.recordEvent(
            "AUTH_IDENTITY_CREATED",
            {
                identityId
            }
        );

        return record;

    }



    addCredential(identityId, credential) {

        if (!identityId || !credential) {

            throw new Error(
                "Identity and credential required."
            );

        }

        const record = {

            identityId,

            secret:
                credential.secret,

            type:
                credential.type || "PASSWORD",

            createdAt:
                new Date()

        };

        this.credentials.set(
            identityId,
            record
        );

        return record;

    }



    authenticate(identityId, secret) {

        if (
            this.lockedAccounts.has(
                identityId
            )
        ) {

            return {

                identityId,

                authenticated: false,

                reason: "ACCOUNT_LOCKED",

                timestamp:
                    new Date()

            };

        }

        const identity =
            this.identities.get(
                identityId
            );

        const credential =
            this.credentials.get(
                identityId
            );

        const success =
            Boolean(
                identity &&
                credential &&
                identity.active &&
                credential.secret === secret
            );

        let session = null;

        if (success) {

            this.failedAttempts.delete(
                identityId
            );

            session =
                this.createSession(
                    identityId
                );

        } else {

            const attempts =
                (
                    this.failedAttempts.get(
                        identityId
                    ) || 0
                ) + 1;

            this.failedAttempts.set(
                identityId,
                attempts
            );

            if (attempts >= 5) {

                this.lockedAccounts.add(
                    identityId
                );

            }

        }

        const result = {

            identityId,

            authenticated:
                success,

            session,

            timestamp:
                new Date()

        };

        this.authenticationLogs.push(
            result
        );

        this.recordEvent(
            "AUTHENTICATION_COMPLETED",
            result
        );

        return result;

    }



    createSession(identityId) {

        const sessionId =
            "SESSION-" +
            Date.now();

        const session = {

            id:
                sessionId,

            token:
                "TOKEN-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2),

            identityId,

            active:
                true,

            createdAt:
                new Date(),

            expiresAt:
                new Date(
                    Date.now() +
                    3600000
                )

        };

        this.sessions.set(
            sessionId,
            session
        );

        return session;

    }



    validateSession(sessionId) {

        const session =
            this.sessions.get(
                sessionId
            );

        if (
            !session ||
            !session.active
        ) {

            return false;

        }

        if (
            new Date() >
            session.expiresAt
        ) {

            session.active = false;

            return false;

        }

        return true;

    }



    revokeSession(sessionId) {

        const session =
            this.sessions.get(
                sessionId
            );

        if (session) {

            session.active = false;

        }

        return session;

    }



    logout(sessionId) {

        return this.revokeSession(
            sessionId
        );

    }



    disableIdentity(identityId) {

        const identity =
            this.identities.get(
                identityId
            );

        if (identity) {

            identity.active = false;

        }

        return identity;

    }



    getAuthenticationLogs() {

        return this.authenticationLogs;

    }



    getStatistics() {

        return {

            identities:
                this.identities.size,

            credentials:
                this.credentials.size,

            sessions:
                this.sessions.size,

            activeSessions:

                [...this.sessions.values()]
                    .filter(
                        s => s.active
                    ).length,

            attempts:
                this.authenticationLogs.length,

            successful:

                this.authenticationLogs.filter(
                    item =>
                        item.authenticated
                ).length,

            failed:

                this.authenticationLogs.filter(
                    item =>
                        !item.authenticated
                ).length,

            locked:

                this.lockedAccounts.size

        };

    }



    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            identities:
                this.identities.size,

            sessions:
                this.sessions.size

        };

    }



    recordEvent(event, metadata = {}) {

        if (this.monitoring) {

            this.monitoring.recordEvent(
                event,
                metadata
            );

        }

    }



    updateMetric(metric) {

        if (this.monitoring) {

            this.monitoring.updateMetric(
                metric
            );

        }

    }



    shutdown() {

        this.sessions.clear();

        this.status =
            KnowledgeAuthenticationEngine.STATUS.SHUTDOWN;

        this.recordEvent(
            "KNOWLEDGE_AUTHENTICATION_ENGINE_SHUTDOWN"
        );

        return true;

    }

}

module.exports =
    KnowledgeAuthenticationEngine;
