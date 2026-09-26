export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const h = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json;charset=UTF-8"
    };

    if (request.method === "OPTIONS")
      return new Response(null, {
        status: 204,
        headers: h
      });

    if (request.method === "GET" && url.pathname === "/")
      return Response.json({
        status: "success",
        service: "Smaily Commerce API",
        version: "1.0.0",
        runtime: "Cloudflare Worker",
        endpoints: {
          status: "/commerce/status",
          orders: "/commerce/orders"
        }
      }, { headers: h });

    if (
      request.method === "GET" &&
      url.pathname === "/commerce/status"
    )
      return Response.json({
        status: "success",
        service: "Smaily Commerce API",
        version: "1.0.0",
        runtime: "Cloudflare Worker",
        orderEngine: "READY",
        orderPersistence: env.DB ? "CONNECTED" : "NOT_CONNECTED",
        paymentGateway: "NOT_CONNECTED",
        fulfillment: "MANUAL"
      }, { headers: h });

    if (
      request.method === "POST" &&
      url.pathname === "/commerce/orders"
    ) {
      let b;

      try {
        b = await request.json();
      } catch {
        return Response.json({
          status: "error",
          message: "Invalid JSON body."
        }, {
          status: 400,
          headers: h
        });
      }

      if (!b?.orderId)
        return Response.json({
          status: "error",
          message: "orderId is required."
        }, {
          status: 400,
          headers: h
        });

      if (!b?.productId)
        return Response.json({
          status: "error",
          message: "productId is required."
        }, {
          status: 400,
          headers: h
        });

      if (
        b.amount == null ||
        Number.isNaN(Number(b.amount))
      )
        return Response.json({
          status: "error",
          message: "Valid amount is required."
        }, {
          status: 400,
          headers: h
        });

      if (!b.currency)
        return Response.json({
          status: "error",
          message: "currency is required."
        }, {
          status: 400,
          headers: h
        });

      const buyer = b.buyer || {
        name: "",
        email: "",
        phone: ""
      };

      const order = {
        id: `order-${b.orderId}`,
        orderId: String(b.orderId),
        type: "ORDER",
        status: "PENDING",
        productId: String(b.productId),
        productTitle: b.productTitle || "",
        amount: Number(b.amount),
        currency: String(b.currency).toUpperCase(),
        quantity: Number(b.quantity || 1),

        buyer: {
          name: buyer.name || "",
          email: buyer.email || "",
          phone: buyer.phone || ""
        },

        paymentMethod: b.paymentMethod || "",
        cryptoCurrency: b.cryptoCurrency || "",

        createdAt: new Date().toISOString(),

        paidAt: "",
        deliveredAt: "",
        closedAt: "",

        paymentReference: "",
        deliveryLink: "",
        notes: b.notes || "",

        source: b.source || "SMAILY_BOOKSTORE",

        displayAmount:
          Number(b.displayAmount ?? b.amount),

        displayCurrency:
          b.displayCurrency ||
          String(b.currency).toUpperCase(),

        checkoutBook: b.checkoutBook || "",
        checkoutMarket: b.checkoutMarket || "",
        productFile: b.productFile || "",

        persistence: "CONNECTED",
        paymentVerification: "PENDING",
        fulfillmentStatus: "PENDING"
      };

      try {
        await env.DB.prepare(`
          INSERT INTO orders (
            id,
            order_id,
            type,
            status,
            product_id,
            product_title,
            amount,
            currency,
            quantity,
            buyer_name,
            buyer_email,
            buyer_phone,
            payment_method,
            crypto_currency,
            created_at,
            paid_at,
            delivered_at,
            closed_at,
            payment_reference,
            delivery_link,
            notes,
            source,
            display_amount,
            display_currency,
            checkout_book,
            checkout_market,
            product_file,
            payment_verification,
            fulfillment_status
          )
          VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?
          )
        `)
        .bind(
          order.id,
          order.orderId,
          order.type,
          order.status,
          order.productId,
          order.productTitle,
          order.amount,
          order.currency,
          order.quantity,
          order.buyer.name,
          order.buyer.email,
          order.buyer.phone,
          order.paymentMethod,
          order.cryptoCurrency,
          order.createdAt,
          order.paidAt,
          order.deliveredAt,
          order.closedAt,
          order.paymentReference,
          order.deliveryLink,
          order.notes,
          order.source,
          order.displayAmount,
          order.displayCurrency,
          order.checkoutBook,
          order.checkoutMarket,
          order.productFile,
          order.paymentVerification,
          order.fulfillmentStatus
        )
        .run();

      } catch (error) {

        return Response.json({
          status: "error",
          message: "Order persistence failed.",
          error: error.message
        }, {
          status: 500,
          headers: h
        });
      }

      return Response.json({
        status: "success",
        message: "Order received and persisted successfully.",
        result: order
      }, {
        status: 201,
        headers: h
      });
    }

    return Response.json({
      status: "error",
      message: "Unknown commerce endpoint.",
      path: url.pathname
    }, {
      status: 404,
      headers: h
    });
  }
};
