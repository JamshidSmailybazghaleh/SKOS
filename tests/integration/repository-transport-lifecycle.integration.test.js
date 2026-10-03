/**
 * ==========================================================
 * SKOS
 * Repository Transport Lifecycle Gate
 * ==========================================================
 *
 * Gate : R8.5.27
 *
 * Mission:
 * Verify that RepositoryTransportServer is:
 *
 * 01 — Startable
 * 02 — Stoppable
 * 03 — Idempotently stoppable
 * 04 — Restartable
 * 05 — Correctly reports lifecycle state
 *
 * No mocks.
 * No repository mutation.
 * ==========================================================
 */

const RepositoryTransportServer =
    require("../../src/runtime/transport/repository-transport-server");

const SDKCRuntimeConnector =
    require("../../src/runtime/sdkc-runtime-connector");


describe(
    "R8.5.27 — Repository Transport Idempotency & Restartability Gate",
    () => {

        let transport;
        let connector;

        beforeEach(() => {

            connector =
                new SDKCRuntimeConnector();

            transport =
                new RepositoryTransportServer({
                    connector,
                    host: "127.0.0.1",
                    port: 0
                });

        });


        afterEach(async () => {

            if (
                transport &&
                typeof transport.shutdown === "function"
            ) {
                try {
                    await transport.shutdown();
                } catch (_) {}
            }

        });


        test(
            "01 — INITIAL STATE IS CREATED",
            () => {

                const status =
                    transport.getStatus();

                expect(
                    status.status
                ).toBe("CREATED");

                expect(
                    status.transport
                ).toBe("HTTP");

            }
        );


        test(
            "02 — TRANSPORT STARTS",
            async () => {

                await transport.initialize();

                const status =
                    transport.getStatus();

                expect(
                    status.status
                ).toBe("RUNNING");

            }
        );


        test(
            "03 — FIRST SHUTDOWN SUCCEEDS",
            async () => {

                await transport.initialize();

                await transport.shutdown();

                const status =
                    transport.getStatus();

                expect(
                    status.status
                ).toBe("STOPPED");

            }
        );


        test(
            "04 — SECOND SHUTDOWN IS IDEMPOTENT",
            async () => {

                await transport.initialize();

                await transport.shutdown();

                await expect(
                    transport.shutdown()
                ).resolves.toBe(true);

                expect(
                    transport.getStatus().status
                ).toBe("STOPPED");

            }
        );


        test(
            "05 — TRANSPORT CAN RESTART",
            async () => {

                await transport.initialize();

                await transport.shutdown();

                await transport.initialize();

                const status =
                    transport.getStatus();

                expect(
                    status.status
                ).toBe("RUNNING");

                await transport.shutdown();

                expect(
                    transport.getStatus().status
                ).toBe("STOPPED");

            }
        );


        test(
            "06 — PORT IS ACTUALLY RELEASED AFTER SHUTDOWN",
            async () => {

                await transport.initialize();

                const firstAddress =
                    transport.server.address();

                expect(
                    firstAddress
                ).toBeDefined();

                expect(
                    firstAddress.port
                ).toBeGreaterThan(0);

                await transport.shutdown();

                expect(
                    transport.server
                ).toBeNull();

                const secondTransport =
                    new RepositoryTransportServer({
                        connector,
                        host: "127.0.0.1",
                        port: firstAddress.port
                    });

                try {

                    await secondTransport.initialize();

                    expect(
                        secondTransport.getStatus().status
                    ).toBe("RUNNING");

                } finally {

                    await secondTransport.shutdown();

                }

            }
        );

    }
);
