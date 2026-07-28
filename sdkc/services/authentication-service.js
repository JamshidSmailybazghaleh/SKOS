/*
====================================================
SKOS Mission Control

Authentication Service

BUILD-000376

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

class AuthenticationService {

    constructor() {

        this.users = new Map();

        this.sessions = new Map();

        this.tokens = new Map();

        this.initialized = false;

    }


    async initialize() {

        Logger.info(
            "Authentication Service Initializing..."
        );

        this.initialized = true;

        return true;

    }


    registerUser(user) {

        if (!user.userId) {

            throw new Error(
                "User ID Required."
            );

        }

        this.users.set(

            user.userId,

            user

        );

        AuditService.record(

            "USER_REGISTERED",

            user

        );

        return user;

    }


    async authenticate(

        username,

        password

    ) {

        const user =

            Array.from(
                this.users.values()
            )
            .find(

                item =>
                    item.username === username

            );


        if (!user) {

            throw new Error(
                "Invalid User."
            );

        }


        /*
        نسخه اولیه:
        Password verification placeholder

        در نسخه Production:
        Hash Verification
        */

        const session = {

            sessionId:

                "SES-" + Date.now(),

            userId:

                user.userId,

            createdAt:

                new Date().toISOString()

        };


        this.sessions.set(

            session.sessionId,

            session

        );


        const token = {

            tokenId:

                "TOK-" + Date.now(),

            sessionId:

                session.sessionId,

            userId:

                user.userId,

            role:

                user.role

        };


        this.tokens.set(

            token.tokenId,

            token

        );


        AuditService.record(

            "LOGIN_SUCCESS",

            {

                userId:
                    user.userId

            }

        );


        return {

            token:

                token.tokenId,

            session:

                session.sessionId,

            role:

                user.role

        };

    }


    validateToken(tokenId) {

        return this.tokens.has(

            tokenId

        );

    }


    getSession(sessionId) {

        return this.sessions.get(

            sessionId

        );

    }


    logout(sessionId) {

        this.sessions.delete(

            sessionId

        );


        AuditService.record(

            "LOGOUT",

            {

                sessionId

            }

        );


        return true;

    }


    status() {

        return {

            initialized:

                this.initialized,

            users:

                this.users.size,

            sessions:

                this.sessions.size

        };

    }

}


window.AuthenticationService =

    new AuthenticationService();


Object.freeze(

    window.AuthenticationService

);
