# SAS-005

# SKOS Naming Convention Standard

---

Document ID: SAS-005

Title: SKOS Naming Convention Standard

Short Name: Naming Standard

Version: 1.0.0

Status: Draft

Classification: Development Standard

Governed By:
SAS-001 — SKOS Architecture Standard

Related Standards:
SAS-002 — JavaScript Development Standard
SAS-003 — JSON Schema Development Standard
SAS-004 — Directory Structure Standard

---

# 1. Purpose

This standard defines the official naming conventions for every
artifact inside the SKOS ecosystem.

Consistent naming improves readability, discoverability,
automation and long-term maintainability.

---

# 2. Scope

This standard applies to:

- Directories
- Files
- Classes
- Interfaces
- Functions
- Methods
- Variables
- Constants
- Schemas
- Events
- APIs
- Services
- Engines
- Pipelines
- Connectors
- Documentation

---

# 3. General Principles

Names shall be:

- Clear
- Descriptive
- Consistent
- Unambiguous
- English
- Technology-neutral where possible

Avoid abbreviations unless officially defined.

---

# 4. Directory Names

Rule:

lowercase

Example:

assets/
config/
runtime/
connectors/

---

# 5. File Names

Rule:

kebab-case

Examples:

knowledge-engine.js

strategy-service.js

execution-schema.json

README.md

---

# 6. JavaScript Classes

Rule:

PascalCase

Examples:

KnowledgeEngine

PipelineManager

IntegrationManager

ConnectorRegistry

---

# 7. Interfaces

Rule:

PascalCase

Suffix:

Interface

Example:

KnowledgeProviderInterface

StorageInterface

---

# 8. Methods

Rule:

camelCase

Examples:

initialize()

execute()

shutdown()

healthCheck()

registerEngine()

---

# 9. Variables

Rule:

camelCase

Examples:

engineStatus

pipelineHistory

knowledgeGraph

---

# 10. Constants

Rule:

UPPER_SNAKE_CASE

Examples:

DEFAULT_TIMEOUT

MAX_RETRY_COUNT

SYSTEM_VERSION

---

# 11. Boolean Variables

Use positive names.

Examples:

isRunning

isInitialized

hasPermission

Avoid:

notReady

noData

---

# 12. Events

Rule:

Past tense

Examples:

engineStarted

pipelineCompleted

knowledgeImported

connectorConnected

---

# 13. Schema Files

Rule:

kebab-case

Suffix:

-schema.json

Examples:

kernel-schema.json

connector-schema.json

pipeline-schema.json

---

# 14. Documentation Files

Rule:

UPPERCASE for common documents

Examples:

README.md

CHANGELOG.md

LICENSE

CONTRIBUTING.md

---

# 15. Build Identifiers

Rule:

BUILD-000001

BUILD-000002

...

---

# 16. Operation Identifiers

Rule:

OP-001

OP-002

...

---

# 17. Standard Documents

Rule:

SAS-001

SAS-002

SAS-003

...

---

# 18. Version Format

Semantic Versioning

Major.Minor.Patch

Examples:

1.0.0

2.3.1

5.0.0

---

# 19. Reserved Prefixes

SKOS

SAS

SDKC

BUILD

OP

API

Do not redefine reserved prefixes.

---

# 20. Compliance

Every new artifact inside SKOS shall comply
with SAS-005.

Names violating this standard shall be corrected
before release.

---

End of Standard
