const fs = require("fs");
const path = require("path");
const os = require("os");

const RepositoryService =
    require("../../src/engines/sdkc-engine/repository-service");

describe("ILR-001.77 — Operational Repository Gate", () => {

    let service;
    let rootPath;

    const objectId = "SKOS-KO-ILR-001-077";

    beforeEach(() => {

        rootPath = fs.mkdtempSync(
            path.join(
                os.tmpdir(),
                "skos-operational-gate-"
            )
        );

        service = new RepositoryService({
            rootPath
        });

        service.connect();
    });


    test("01 — CREATE / SAVE", () => {

        const object = {
            id: objectId,
            type: "document",
            title: "Operational Repository Gate",
            status: "ACTIVE",
            version: "1.0.0",
            content: {
                purpose:
                    "ILR-001.77 end-to-end operational verification"
            }
        };

        const saved =
            service.save(object);

        expect(saved.id)
            .toBe(objectId);

        expect(service.exists(objectId))
            .toBe(true);
    });


    test("02 — LOAD", () => {

        service.save({
            id: objectId,
            type: "document",
            title: "Operational Repository Gate",
            version: "1.0.0"
        });

        const loaded =
            service.load(objectId);

        expect(loaded)
            .not
            .toBeNull();

        expect(loaded.id)
            .toBe(objectId);
    });


    test("03 — ARTIFACTS", () => {

        service.save({
            id: objectId,
            type: "document",
            title: "Operational Repository Gate",
            version: "1.0.0"
        });

        const objectPath =
            path.join(
                rootPath,
                "repository",
                "objects",
                objectId
            );

        expect(
            fs.existsSync(
                path.join(
                    objectPath,
                    "metadata.json"
                )
            )
        ).toBe(true);

        expect(
            fs.existsSync(
                path.join(
                    objectPath,
                    "manifest.json"
                )
            )
        ).toBe(true);

        expect(
            fs.existsSync(
                path.join(
                    objectPath,
                    "history.log"
                )
            )
        ).toBe(true);
    });


    test("04 — INDEX / MANIFEST RECONCILIATION", () => {

        service.save({
            id: objectId,
            type: "document",
            title: "Operational Repository Gate",
            version: "1.0.0"
        });

        const result =
            service.synchronize();

        expect(
            result.index.statistics.totalObjects
        ).toBe(1);

        expect(
            result.manifest.statistics.totalObjects
        ).toBe(1);

        expect(
            result.index.objects
                .some(
                    item =>
                        item.id === objectId
                )
        ).toBe(true);
    });


    test("05 — UPDATE", () => {

        service.save({
            id: objectId,
            type: "document",
            title: "Original Title",
            version: "1.0.0"
        });

        const updated =
            service.update(
                objectId,
                {
                    title:
                        "Updated Title"
                }
            );

        expect(updated.id)
            .toBe(objectId);

        expect(updated.title)
            .toBe("Updated Title");

        const loaded =
            service.load(objectId);

        expect(loaded.title)
            .toBe("Updated Title");
    });


    test("06 — HISTORY", () => {

        service.save({
            id: objectId,
            type: "document",
            title: "History Test",
            version: "1.0.0"
        });

        service.update(
            objectId,
            {
                title: "History Updated"
            }
        );

        const history =
            service.history.getHistory(
                objectId
            );

        expect(history.length)
            .toBeGreaterThanOrEqual(2);

        expect(
            history.some(
                event =>
                    event.event ===
                    "OBJECT_CREATED"
            )
        ).toBe(true);

        expect(
            history.some(
                event =>
                    event.event ===
                    "OBJECT_UPDATED"
            )
        ).toBe(true);
    });


    test("07 — LIST", () => {

        service.save({
            id: objectId,
            type: "document",
            title: "List Test",
            version: "1.0.0"
        });

        const objects =
            service.list();

        expect(
            objects.map(
                object => object.id
            )
        ).toContain(objectId);
    });


    test("08 — STATUS", () => {

        service.save({
            id: objectId,
            type: "document",
            title: "Status Test",
            version: "1.0.0"
        });

        const status =
            service.getStatus();

        expect(status.status)
            .toBe("CONNECTED");

        expect(status.totalObjects)
            .toBe(1);
    });


    test("09 — REMOVE / RECONCILE", () => {

        service.save({
            id: objectId,
            type: "document",
            title: "Remove Test",
            version: "1.0.0"
        });

        expect(
            service.exists(objectId)
        ).toBe(true);

        const removed =
            service.remove(objectId);

        expect(removed)
            .toBe(true);

        expect(
            service.exists(objectId)
        ).toBe(false);

        const result =
            service.synchronize();

        expect(
            result.index.statistics.totalObjects
        ).toBe(0);

        expect(
            result.manifest.statistics.totalObjects
        ).toBe(0);
    });

});
