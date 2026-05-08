#Intial Architecture
 I would like to create the file architecture minimal, where i will be implementing the entry flow validator.

 * Entry validator flow
 * Boolean schemas
 * Basic result structure
 * may be one keyword

 ## Okay I guess i am rushing to the code too fast, so i decide to create a flow diagram so that i can have clarity

 So My validator flow:
 * Accept schema and instance
 * If Schema is true, return Valid (as it is a boolean type)
 * If Schema is false, return Invalid
 * If Schem is Object,detect the draft
 * Load keyword handlers for the draft
 * For each keyword in the schema:
 - find the keyword handler
 - run it with schema value and instance
 - collect errors
 * Return final validation result

 ### (So for now, i will stick to this and plan to write the code around it, so changes are needed in the code)
