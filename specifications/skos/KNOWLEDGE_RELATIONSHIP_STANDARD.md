# Knowledge Relationship Standard

Version: 0.0.1

---

## Purpose

Define how Knowledge Objects are connected inside SKOS.

---

## Relationship Types

supports

extends

explains

contradicts

references

derived_from

parent_of

child_of

part_of

related_to

same_as

duplicate_of

translation_of

revision_of

inspired_by

---

## Example

KO-000021

supports

KO-000005

---

KO-000021

derived_from

KO-000001

---

KO-000045

translation_of

KO-000003

---

## Rule

Every relationship must reference valid Knowledge Object IDs.

Relationships are directional unless explicitly defined as bidirectional.

No anonymous relationship is allowed.
