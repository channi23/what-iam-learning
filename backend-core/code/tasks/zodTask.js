"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//the first task to create schema that enforces:Password must be 8+ chars and email must be valid
var zod_1 = require("zod");
var userSchema = zod_1.z.object({
    password: zod_1.z.string().min(8),
    email: zod_1.z.string().email(),
});
var invalidData = {
    email: "not-an-email",
    password: 123,
};
var result = userSchema.safeParse(invalidData);
if (!result) {
    console.log(result.error.errors);
}
else {
    console.log(result.data);
}
