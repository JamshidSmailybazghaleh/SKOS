# SAS-002

# SKOS JavaScript Development Standard

---

Document ID: SAS-002

Title: SKOS JavaScript Development Standard

Version: 1.0.0

Status: Draft

Classification: Development Standard

Governed By:
SAS-001 — SKOS Architecture Standard

---

# 1. Purpose

This document defines the mandatory JavaScript development
standard for every executable component inside SKOS.

Applies to:

- Kernel
- Engines
- Services
- Pipelines
- Managers
- Controllers
- Utilities
- Connectors
- Runtime
- API Components

---

# 2. Design Principles

Every JavaScript component shall be:

- Modular
- Independent
- Testable
- Reusable
- Observable
- Maintainable
- Extensible

---

# 3. One Component Per File

Every file contains exactly one primary class.

Example:

knowledge-engine.js

↓

class KnowledgeEngine

---

# 4. Naming Convention

Files

kebab-case

Example

knowledge-engine.js

Classes

PascalCase

KnowledgeEngine

Methods

camelCase

initialize()

Variables

camelCase

engineStatus

Constants

UPPER_CASE

DEFAULT_TIMEOUT

---

# 5. Mandatory File Header

Every file begins with:

Project

Component

File

Operation

Build

Version

Status

Mission

Responsibilities

Dependencies

---

# 6. Mandatory Lifecycle

Every executable component implements:

Constructor()

Initialize()

Execute()

Shutdown()

Reset()

HealthCheck()

Destroy() (optional)

---

# 7. Constructor Rules

Constructor must only:

store configuration

initialize variables

never execute logic

---

# 8. Initialization Rules

Initialize()

loads resources

validates configuration

creates internal objects

must be idempotent

---

# 9. Execute Rules

Execute()

contains business logic

must not initialize configuration

must return execution result

---

# 10. Shutdown Rules

Shutdown()

releases resources

stops timers

closes connections

writes final logs

---

# 11. Error Handling

Never ignore exceptions.

Always:

validate input

record errors

return meaningful status

---

# 12. Logging

Every important action shall be logged.

Recommended levels:

INFO

WARNING

ERROR

CRITICAL

---

# 13. Health Check

Every component exposes:

healthCheck()

Returns:

status

version

uptime

statistics

errors

---

# 14. Statistics

Every component maintains statistics.

Example

executions

errors

warnings

processedItems

executionTime

---

# 15. Export Rules

NodeJS

module.exports

Browser

window.ComponentName

Both exports should be supported whenever possible.

---

# 16. Documentation

Every public method requires documentation.

Purpose

Parameters

Returns

Exceptions

---

# 17. Code Style

Maximum readability.

Avoid deeply nested logic.

Prefer small methods.

Avoid duplicated code.

Prefer composition.

---

# 18. Dependencies

Dependencies must be explicit.

Hidden dependencies are prohibited.

Circular dependencies are prohibited.

---

# 19. Testing

Every component shall be testable.

Business logic must be separated from infrastructure.

---

# 20. Compliance

Every JavaScript file inside SKOS
must comply with SAS-002.

Non-compliant components shall be refactored.

---

End of Standard
