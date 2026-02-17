//the first task to create schema that enforces:Password must be 8+ chars and email must be valid
import {z} from "zod";
const userSchema = z.object({
    password:z.string().min(8),
    email:z.string().email(),
});

const invalidData = {
    email:"not-an-email",
    password:123,
};

const result = userSchema.safeParse(invalidData);

if(!result.success){
    console.log(result.error.issues);
}
else{
    console.log(result.data);
}




