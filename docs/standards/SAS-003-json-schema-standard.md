# SAS-003

# SKOS JSON Schema Development Standard

---

Document ID: SAS-003

Title: SKOS JSON Schema Development Standard

Short Name: JSON Schema Standard

Version: 1.0.0

Status: Draft

Classification: Development Standard

Governed By:
SAS-001 — SKOS Architecture Standard

Related Standards:
SAS-002 — JavaScript Development Standard

---

# 1. Purpose

This standard defines the architecture, structure, naming
rules and validation principles for every JSON Schema used
inside SKOS.

Every schema shall be machine-readable, human-readable,
versioned and extensible.

---

# 2. Scope

Applies to:

- Kernel Schemas
- Engine Schemas
- Service Schemas
- Pipeline Schemas
- Connector Schemas
- Runtime Schemas
- Configuration Schemas
- Metadata Schemas
- Analytics Schemas
- Strategy Schemas
- Execution Schemas

---

# 3. Design Principles

Every schema shall be:

- Consistent
- Modular
- Versioned
- Extensible
- Self-documented
- Validatable
- Backward compatible whenever possible

---

# 4. Mandatory Metadata

Every schema begins with:

- $schema
- schemaId
- title
- version
- description
- author
- organization
- compatibility
- lastUpdated

---

# 5. Standard Structure

Every schema should follow this order:

Metadata

↓

Definitions

↓

Properties

↓

Required Fields

↓

Validation Rules

↓

Examples

↓

Compatibility

↓

History

---

# 6. Naming Rules

Schema Files

kebab-case

Example

execution-schema.json

Properties

camelCase

Example

executionStatus

Definitions

PascalCase

Example

ExecutionStatistics

---

# 7. Required Sections

Every schema must define:

Metadata

Properties

Validation

Required

Version

---

# 8. Validation Rules

Every property defines:

type

description

constraints

default value (if applicable)

allowed values

---

# 9. Enumerations

Repeated values shall be defined
as reusable enumerations.

Example:

Status

READY

RUNNING

FAILED

STOPPED

---

# 10. Reusable Definitions

Common objects shall be defined once
and reused through references.

Avoid duplication.

---

# 11. Compatibility

Breaking changes require
Major Version increment.

Minor additions require
Minor Version increment.

Bug fixes require
Patch Version increment.

---

# 12. Documentation

Every schema must contain:

Purpose

Description

Examples

Compatibility Notes

---

# 13. File Organization

Schemas belong inside:

data/schema/

Subfolders may be introduced
when schema count grows.

---

# 14. Validation Tools

Every schema shall validate against
the approved JSON Schema specification.

---

# 15. Evolution

Schemas evolve without unnecessary
breaking changes.

Deprecated fields remain documented.

---

# 16. Compliance

Every JSON Schema inside SKOS
must comply with SAS-003.

Non-compliant schemas shall be
updated during maintenance cycles.

---

End of Standard
