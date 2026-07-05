/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Platform
 *
 * Build     : BUILD-000095
 * Sprint    : Sprint 12
 * Version   : 0.0.1
 *
 * Status    : Integration Test
 * ==========================================================
 */

import { ApiGateway } from "./api-gateway";
import { AuthenticationService } from "./authentication";
import { AuthorizationService } from "./authorization";
import { PluginManager } from "./plugin-manager";

export class PlatformLayerTest {

    public run(): boolean {

        const authentication = new AuthenticationService();

        const authorization = new AuthorizationService();

        const gateway = new ApiGateway();

        const plugins = new PluginManager();

        plugins.register({

            id: "knowledge-plugin",

            name: "Knowledge Plugin",

            version: "1.0.0",

            enabled: true

        });

        const auth = authentication.authenticate({

            username: "admin",

            token: "valid-token"

        });

        if (!auth.authenticated) {

            return false;

        }

        const permission = authorization.authorize({

            userId: "admin",

            role: "ADMIN",

            permission: "knowledge.read"

        });

        if (!permission.authorized) {

            return false;

        }

        const response = gateway.handle({

            id: "REQ-001",

            method: "GET",

            path: "/knowledge"

        });

        return (

            response.success &&

            plugins.getPlugins().length === 1

        );

    }

}
