/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Platform
 * Module    : Plugin Manager
 *
 * Build     : BUILD-000094
 * Sprint    : Sprint 12
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface PluginDescriptor {

    id: string;

    name: string;

    version: string;

    enabled: boolean;

}

export class PluginManager {

    private readonly plugins =
        new Map<string, PluginDescriptor>();

    /**
     * Register plugin.
     */
    public register(

        plugin: PluginDescriptor

    ): void {

        this.plugins.set(

            plugin.id,

            plugin

        );

    }

    /**
     * Enable plugin.
     */
    public enable(

        id: string

    ): boolean {

        const plugin = this.plugins.get(id);

        if (!plugin) {

            return false;

        }

        plugin.enabled = true;

        return true;

    }

    /**
     * Disable plugin.
     */
    public disable(

        id: string

    ): boolean {

        const plugin = this.plugins.get(id);

        if (!plugin) {

            return false;

        }

        plugin.enabled = false;

        return true;

    }

    /**
     * Get one plugin.
     */
    public getPlugin(

        id: string

    ): PluginDescriptor | undefined {

        return this.plugins.get(id);

    }

    /**
     * Return all plugins.
     */
    public getPlugins(): PluginDescriptor[] {

        return Array.from(

            this.plugins.values()

        );

    }

}
