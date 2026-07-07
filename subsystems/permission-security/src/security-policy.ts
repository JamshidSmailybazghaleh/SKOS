/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Permission & Security
 * Module    : Security Policy
 *
 * Build     : BUILD-000166
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Security policy identifiers.
 */
export enum SecurityPolicyType {

    /**
     * Original files are read only.
     */
    ReadOnlyAccess = "read-only-access",

    /**
     * Never modify original files.
     */
    PreserveOriginal = "preserve-original",

    /**
     * Never delete original files.
     */
    NeverDeleteOriginal = "never-delete-original",

    /**
     * Verify file integrity.
     */
    VerifyIntegrity = "verify-integrity",

    /**
     * Verify checksum.
     */
    VerifyChecksum = "verify-checksum",

    /**
     * Store protected copies.
     */
    SecureCopy = "secure-copy",

    /**
     * Audit every operation.
     */
    AuditTrail = "audit-trail",

    /**
     * Require explicit user approval before import.
     */
    UserApproval = "user-approval"

}

/**
 * Security policy definition.
 */
export interface SecurityPolicy {

    /**
     * Policy identifier.
     */
    type: SecurityPolicyType;

    /**
     * Display title.
     */
    title: string;

    /**
     * Policy description.
     */
    description: string;

    /**
     * Indicates whether the policy is mandatory.
     */
    mandatory: boolean;

    /**
     * Indicates whether the policy is currently enabled.
     */
    enabled: boolean;

}

/**
 * Default SKOS security policies.
 */
export const DefaultSecurityPolicies: SecurityPolicy[] = [

    {
        type: SecurityPolicyType.ReadOnlyAccess,
        title: "Read Only Access",
        description: "Access original files in read-only mode.",
        mandatory: true,
        enabled: true
    },

    {
        type: SecurityPolicyType.PreserveOriginal,
        title: "Preserve Original Files",
        description: "Original files must never be modified.",
        mandatory: true,
        enabled: true
    },

    {
        type: SecurityPolicyType.NeverDeleteOriginal,
        title: "Never Delete Originals",
        description: "Original files must never be deleted by SKOS.",
        mandatory: true,
        enabled: true
    },

    {
        type: SecurityPolicyType.VerifyIntegrity,
        title: "Integrity Verification",
        description: "Verify file integrity before processing.",
        mandatory: true,
        enabled: true
    },

    {
        type: SecurityPolicyType.VerifyChecksum,
        title: "Checksum Verification",
        description: "Calculate and verify checksums when supported.",
        mandatory: true,
        enabled: true
    },

    {
        type: SecurityPolicyType.SecureCopy,
        title: "Secure Copy",
        description: "Create an independent protected copy for SKOS.",
        mandatory: true,
        enabled: true
    },

    {
        type: SecurityPolicyType.AuditTrail,
        title: "Audit Trail",
        description: "Record all security-sensitive operations.",
        mandatory: true,
        enabled: true
    },

    {
        type: SecurityPolicyType.UserApproval,
        title: "User Approval",
        description: "Require user confirmation before importing files.",
        mandatory: true,
        enabled: true
    }

];
