/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Device Connector
 * Module    : Android Device
 *
 * Build     : BUILD-000192
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Android device status.
 */
export enum AndroidDeviceStatus {

    Connected = "connected",

    Disconnected = "disconnected",

    Unauthorized = "unauthorized",

    Unknown = "unknown"

}

/**
 * Android device information.
 */
export interface AndroidDevice {

    /**
     * Unique device identifier.
     */
    id: string;

    /**
     * Device manufacturer.
     */
    manufacturer: string;

    /**
     * Device model.
     */
    model: string;

    /**
     * Android version.
     */
    androidVersion: string;

    /**
     * Device name.
     */
    deviceName: string;

    /**
     * Current connection status.
     */
    status: AndroidDeviceStatus;

    /**
     * Internal storage capacity (bytes).
     */
    internalStorageBytes?: number;

    /**
     * SD Card capacity (bytes).
     */
    sdCardStorageBytes?: number;

    /**
     * Additional metadata.
     */
    metadata?: Record<string, unknown>;

}
