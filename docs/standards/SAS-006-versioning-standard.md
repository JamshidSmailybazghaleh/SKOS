# SAS-006

# SKOS Versioning Standard

---

Document ID: SAS-006

Title: SKOS Versioning Standard

Short Name: Versioning Standard

Version: 1.0.0

Status: Draft

Classification: Development Standard

Governed By:
SAS-001 — SKOS Architecture Standard

Related Standards:
SAS-002 — JavaScript Development Standard
SAS-003 — JSON Schema Development Standard
SAS-004 — Directory Structure Standard
SAS-005 — Naming Convention Standard

---

# 1. Purpose

This standard defines the official versioning policy for all
software components, schemas, documentation, builds and releases
within the SKOS ecosystem.

Its objective is to ensure traceability, compatibility and
controlled evolution.

---

# 2. Scope

This standard applies to:

- Kernel
- Engines
- Services
- Pipelines
- Connectors
- Runtime
- Schemas
- Configuration
- Documentation
- APIs
- Releases

---

# 3. Semantic Versioning

Every version follows:

Major.Minor.Patch

Example:

1.0.0

---

# 4. Major Version

Increase Major when:

- Breaking changes occur.
- Architecture changes fundamentally.
- Backward compatibility is intentionally removed.

Examples:

1.0.0 → 2.0.0

---

# 5. Minor Version

Increase Minor when:

- New features are added.
- Existing functionality is extended.
- Backward compatibility is preserved.

Examples:

1.2.0 → 1.3.0

---

# 6. Patch Version

Increase Patch when:

- Bugs are fixed.
- Documentation is corrected.
- Performance improvements do not change behaviour.

Examples:

1.3.4 → 1.3.5

---

# 7. Build Number

Every build shall have a unique identifier.

Format:

BUILD-000001

BUILD-000002

...

Build numbers shall never be reused.

---

# 8. Operation Number

Development activities are organised into Operations.

Format:

OP-001

OP-002

OP-003

...

Every file shall reference the Operation in which it was created
or substantially revised.

---

# 9. Release Types

Supported release types:

Development

Alpha

Beta

Release Candidate (RC)

Stable

Long-Term Support (LTS)

---

# 10. Compatibility Policy

Each release shall define:

- Compatible versions
- Deprecated features
- Removed features
- Migration guidance

---

# 11. Change Log

Every released component shall maintain a changelog.

Each entry should contain:

- Version
- Date
- Summary
- Breaking Changes
- Author (optional)
- Related Build

---

# 12. Version Header

Every executable component should include:

Version

Build

Operation

Status

---

# 13. Release Tags

Recommended tags:

v1.0.0

v1.1.0

v2.0.0

---

# 14. Deprecation Policy

Deprecated features:

- Shall remain documented.
- Should provide migration guidance.
- Shall define a planned removal version where applicable.

---

# 15. Repository Traceability

Every release shall be traceable through:

- Version
- Build
- Operation
- Commit
- Release Notes

---

# 16. Compliance

All SKOS artifacts shall comply with SAS-006.

Version changes shall follow the rules defined in this document.

---

End of Standard
