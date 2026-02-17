//First task is to create a function makeResponses<T>(data:T) that returns {status:200,data:T}

type ApiResponse<T>={
    status:number;
    data:T;

};

function makeResponse<T>(data:T):ApiResponse<T>{
    return {status:200,data};
}

interface User{
    id:number;
    name:string;
}

const res = makeResponse<User>({id:1,name:"sita"});

console.log(res);

//another task 

type ApiResponse2<T>={
    status:number;
    data:T;
    timestamp:number;
};

function makeResponse2<T>(data:T):ApiResponse2<T>{
    return {status:200,data,timestamp:Date.now()};
}

interface Order{
    orderId:number;
    amount:number;
    isPaid:boolean;
}

const check = makeResponse2<Order>({orderId:1,amount:5000,isPaid:true});

console.log(check);

