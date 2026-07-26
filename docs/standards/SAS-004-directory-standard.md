# SAS-004

# SKOS Directory Structure Standard

---

Document ID: SAS-004

Title: SKOS Directory Structure Standard

Short Name: Directory Standard

Version: 1.0.0

Status: Draft

Classification: Development Standard

Governed By:
SAS-001 — SKOS Architecture Standard

Related Standards:
SAS-002 — JavaScript Development Standard
SAS-003 — JSON Schema Development Standard

---

# 1. Purpose

This standard defines the official directory structure for the
SKOS repository.

Every file, module, document and resource shall be placed in
its designated location.

---

# 2. Design Principles

The repository shall be:

- Organized
- Predictable
- Modular
- Scalable
- Maintainable
- Self-explanatory

---

# 3. Root Directory Structure

```text
SKOS/

assets/
config/
data/
docs/
examples/
logs/
scripts/
tests/
tools/
```

---

# 4. Assets

```text
assets/

css/
fonts/
icons/
images/
js/
```

---

# 5. JavaScript Structure

```text
assets/js/

kernel/
engines/
services/
pipelines/
integration/
connectors/
runtime/
analytics/
strategy/
execution/
improvement/
utilities/
common/
```

---

# 6. Configuration

```text
config/

system/
engines/
runtime/
security/
deployment/
```

---

# 7. Data

```text
data/

schema/
metadata/
history/
cache/
repository/
samples/
```

---

# 8. Documentation

```text
docs/

architecture/
standards/
guides/
api/
specifications/
references/
releases/
```

---

# 9. Examples

```text
examples/

basic/
advanced/
integration/
connector/
```

---

# 10. Logging

```text
logs/

application/
engine/
runtime/
security/
```

---

# 11. Scripts

```text
scripts/

build/
deploy/
maintenance/
migration/
testing/
```

---

# 12. Testing

```text
tests/

unit/
integration/
performance/
security/
fixtures/
```

---

# 13. Tools

```text
tools/

validation/
generator/
migration/
documentation/
```

---

# 14. File Placement Rules

Every file shall have exactly one
official location.

Duplicate implementations are prohibited.

---

# 15. Naming Rules

Directories:

lowercase

Files:

kebab-case

Examples:

knowledge-engine.js

execution-schema.json

README.md

---

# 16. Future Expansion

New top-level directories require
architecture approval.

New modules should be added inside
existing categories whenever possible.

---

# 17. Compliance

Every repository change shall comply
with SAS-004.

Repository reviews shall verify
directory compliance.

---

End of Standard
