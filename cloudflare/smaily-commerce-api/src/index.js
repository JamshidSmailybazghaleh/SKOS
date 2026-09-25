export default {
  async fetch(request) {
    const url = new URL(request.url);
    const h = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json;charset=UTF-8"
    };

    if (request.method === "OPTIONS")
      return new Response(null, {status:204,headers:h});

    if (request.method === "GET" && url.pathname === "/")
      return Response.json({
        status:"success",
        service:"Smaily Commerce API",
        version:"1.0.0",
        runtime:"Cloudflare Worker",
        endpoints:{
          status:"/commerce/status",
          orders:"/commerce/orders"
        }
      }, {headers:h});

    if (request.method === "GET" && url.pathname === "/commerce/status")
      return Response.json({
        status:"success",
        service:"Smaily Commerce API",
        version:"1.0.0",
        runtime:"Cloudflare Worker",
        orderEngine:"READY",
        orderPersistence:"NOT_CONNECTED",
        paymentGateway:"NOT_CONNECTED",
        fulfillment:"MANUAL"
      }, {headers:h});

    if (request.method === "POST" && url.pathname === "/commerce/orders") {
      let b;
      try { b = await request.json(); }
      catch {
        return Response.json({status:"error",message:"Invalid JSON body."},
          {status:400,headers:h});
      }

      if (!b?.orderId)
        return Response.json({status:"error",message:"orderId is required."},
          {status:400,headers:h});

      if (!b?.productId)
        return Response.json({status:"error",message:"productId is required."},
          {status:400,headers:h});

      if (b.amount == null || Number.isNaN(Number(b.amount)))
        return Response.json({status:"error",message:"Valid amount is required."},
          {status:400,headers:h});

      if (!b.currency)
        return Response.json({status:"error",message:"currency is required."},
          {status:400,headers:h});

      const order = {
        id:`order-${b.orderId}`,
        orderId:String(b.orderId),
        type:"ORDER",
        status:"PENDING",
        productId:String(b.productId),
        productTitle:b.productTitle || "",
        amount:Number(b.amount),
        currency:String(b.currency).toUpperCase(),
        quantity:Number(b.quantity || 1),
        buyer:b.buyer || {name:"",email:"",phone:""},
        paymentMethod:b.paymentMethod || "",
        cryptoCurrency:b.cryptoCurrency || "",
        createdAt:new Date().toISOString(),
        paidAt:"",
        deliveredAt:"",
        closedAt:"",
        paymentReference:"",
        deliveryLink:"",
        notes:b.notes || "",
        source:b.source || "SMAILY_BOOKSTORE",
        displayAmount:Number(b.displayAmount ?? b.amount),
        displayCurrency:b.displayCurrency || String(b.currency).toUpperCase(),
        checkoutBook:b.checkoutBook || "",
        checkoutMarket:b.checkoutMarket || "",
        productFile:b.productFile || "",
        persistence:"NOT_CONNECTED",
        paymentVerification:"PENDING",
        fulfillmentStatus:"PENDING"
      };

      return Response.json({
        status:"success",
        message:"Order received successfully.",
        result:order
      }, {status:201,headers:h});
    }

    return Response.json({
      status:"error",
      message:"Unknown commerce endpoint.",
      path:url.pathname
    }, {status:404,headers:h});
  }
};
