//generics on type-level

type MyGenericType<TData>={
    data:TData;
};

type example1 = MyGenericType<{
    firstName:string;
    lastName:string;
}>;


const example:example1={
    data:{
        firstName:"HariHaran",
        lastName:"Sharma"
    }
};

type example2 = MyGenericType<number>;

const num:example2 = {
    data:67
};


// passing type arguments to function

//to understand this, let us take a function named makefetch and initially it returns 'any'

const makeFetch = <TData>(url:string):Promise<TData>=>{
    return fetch(url).then((res)=>res.json());
}

makeFetch<{firstName:string; lastName:string}>("api/endpoint").then((res)=>{
    console.log(res);
});

//passing type arguments to set

const set = new Set(); //normal init

//we can add numbers and string for that set

set.add(123);
set.add("abc");

//now we want the set to only accept numbers and give errors for the string type

//with the help of generics

const newSet = new Set<number>();

newSet.add(123);

//here we can only add number if add string or any other thing, it will throw err

//okay the next concept is type inference

const addIdToObject = <TObj>(obj:TObj)=>{
    return{
        ...obj,
        id:'123',
    };
};

const result = addIdToObject({
    firstName:"Harry",
    LastName:"Brook",
});
console.log(result);








