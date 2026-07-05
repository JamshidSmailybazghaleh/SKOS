/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Platform
 * Module    : API Gateway
 *
 * Build     : BUILD-000091
 * Sprint    : Sprint 12
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface ApiRequest {

    id: string;

    method: "GET" | "POST" | "PUT" | "DELETE";

    path: string;

    body?: unknown;

}

export interface ApiResponse {

    status: number;

    success: boolean;

    message: string;

    data?: unknown;

}

export class ApiGateway {

    /**
     * Handle incoming API request.
     */
    public handle(

        request: ApiRequest

    ): ApiResponse {

        return {

            status: 200,

            success: true,

            message: `Request accepted: ${request.method} ${request.path}`,

            data: null

        };

    }

}
