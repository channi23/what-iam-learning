//First task is to create a function makeResponses<T>(data:T) that returns {status:200,data:T}
function makeResponse(data) {
    return { status: 200, data: data };
}
var res = makeResponse({ id: 1, name: "sita" });
console.log(res);
function makeResponse2(data) {
    return { status: 200, data: data, timestamp: Date.now() };
}
var check = makeResponse2({ orderId: 1, amount: 5000, isPaid: true });
console.log(check);
