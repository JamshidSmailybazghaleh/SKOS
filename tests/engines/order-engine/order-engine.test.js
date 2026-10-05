const fs = require("fs");
const os = require("os");
const path = require("path");

const OrderEngine = require("../../../src/engines/order-engine/order-engine");
const OrderRepository = require("../../../src/engines/order-engine/order-repository");

describe("SKOS Order Engine — Operational Contract", () => {
  let rootPath;
  let repository;
  let engine;

  beforeEach(() => {
    rootPath = fs.mkdtempSync(
      path.join(os.tmpdir(), "skos-order-engine-")
    );

    repository = new OrderRepository({
      basePath: rootPath
    });

    engine = new OrderEngine({
      repository
    });

    engine.initialize();
  });

  test("01 — CREATE / PERSIST", () => {
    const order = engine.createOrder({
      orderId: "TEST-ORDER-001",
      productId: "wisdom-light-7X92LF",
      amount: 298000,
      currency: "IRR"
    });

    expect(order.orderId).toBe("TEST-ORDER-001");
    expect(order.status).toBe("PENDING");
    expect(repository.count()).toBe(1);
  });

  test("02 — LOAD FROM PERSISTENCE", () => {
    engine.createOrder({
      orderId: "TEST-ORDER-002",
      productId: "wisdom-light-7X92LF",
      amount: 298000,
      currency: "IRR"
    });

    const freshEngine = new OrderEngine({
      repository
    });

    const loaded = freshEngine.getOrder("TEST-ORDER-002");

    expect(loaded).not.toBeNull();
    expect(loaded.orderId).toBe("TEST-ORDER-002");
    expect(loaded.status).toBe("PENDING");
  });

  test("03 — STATUS LIFECYCLE", () => {
    engine.createOrder({
      orderId: "TEST-ORDER-003",
      productId: "wisdom-light-7X92LF",
      amount: 298000,
      currency: "IRR"
    });

    engine.updateStatus("TEST-ORDER-003", "PAID");
    expect(engine.getOrder("TEST-ORDER-003").status).toBe("PAID");

    engine.updateStatus("TEST-ORDER-003", "DELIVERED");
    expect(engine.getOrder("TEST-ORDER-003").status).toBe("DELIVERED");

    engine.updateStatus("TEST-ORDER-003", "CLOSED");
    expect(engine.getOrder("TEST-ORDER-003").status).toBe("CLOSED");
  });

  test("04 — UPDATED STATUS SURVIVES RELOAD", () => {
    engine.createOrder({
      orderId: "TEST-ORDER-004",
      productId: "wisdom-light-7X92LF",
      amount: 298000,
      currency: "IRR"
    });

    engine.updateStatus("TEST-ORDER-004", "PAID");

    const freshEngine = new OrderEngine({
      repository
    });

    const loaded = freshEngine.getOrder("TEST-ORDER-004");

    expect(loaded).not.toBeNull();
    expect(loaded.status).toBe("PAID");
    expect(loaded.paidAt).not.toBe("");
  });

  test("05 — INVALID ORDER IS REJECTED", () => {
    expect(() =>
      engine.createOrder({
        orderId: "TEST-ORDER-005"
      })
    ).toThrow("Valid productId is required.");

    expect(repository.count()).toBe(0);
  });
});
