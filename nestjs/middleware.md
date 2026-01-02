# Middleware in NestJS

## Overview

In NestJS, **middleware runs before a request reaches the controller** and before any framework-level constructs such as **pipes, guards, or interceptors**. It operates at a very early stage of the request lifecycle and is mainly responsible for **pre-processing incoming requests**.

Middleware is commonly used to **inspect, validate at a shallow level, or modify the request**, such as checking headers, extracting tokens, logging request details, or enforcing basic constraints.

Middleware can be integrated with NestJS's **dependency injection system** by using the `@Injectable()` decorator, allowing it to inject and reuse application services like any other provider.

A typical middleware is implemented in a dedicated file (for example, `auth.middleware.ts`). Required utilities are imported from `@nestjs/common` and the underlying HTTP platform (Express or Fastify), and the request-handling logic is defined there.

---

## When Middleware Is the Right Choice

Middleware should be used when:

- The logic applies to **multiple routes**
- The logic is **request-wide**, not tied to a specific controller or handler
- The logic does **not require access to route metadata or decorators**

### Common Use Cases

- Extracting authentication tokens
- Logging incoming requests
- Attaching request or trace identifiers
- Rate limiting or abuse prevention
- CORS-related adjustments

---

## Applying Middleware in NestJS

Middleware **must be explicitly applied** using the `configure()` method in a module that implements `NestModule`.

> There is no standalone middleware module.  
> If middleware is not registered in `configure()`, it will never run.

---

## Types of Middleware Implementations

### 1. Function-Based Middleware

Function-based middleware is lightweight and stateless. It does not use dependency injection and is suitable for simple logic.

```ts
export function loggerMiddleware(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // Without this, the request lifecycle stops here
}
```

**Applying it:**

```ts
consumer.apply(loggerMiddleware).forRoutes("users");
```

---

### 2. Class-Based Middleware

Class-based middleware provides better structure and is the most common approach in production applications.

```ts
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized");
    }
    next();
  }
}
```

**Applying it:**

```ts
consumer.apply(AuthMiddleware).forRoutes("users");
```

---

### 3. Injectable Middleware with Dependency Injection

Used when middleware depends on application services.

```ts
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req, res, next) {
    const token = req.headers.authorization;
    const user = await this.authService.verify(token);
    req.user = user;
    next();
  }
}
```

**Applying it:**

```ts
consumer.apply(AuthMiddleware).forRoutes("users");
```

Using `'*'` applies the middleware to **all routes**.

---

### 4. Route-Scoped Middleware

Middleware can be limited to specific routes or HTTP methods.

```ts
consumer.apply(AuthMiddleware).forRoutes("users");
```

or

```ts
consumer.apply(AuthMiddleware).forRoutes({
  path: "users",
  method: RequestMethod.POST,
});
```

---

### 5. Excluding Routes from Middleware

Routes can be excluded when middleware is applied globally.

```ts
consumer.apply(AuthMiddleware).exclude("auth/login", "health").forRoutes("*");
```

This is commonly used for public or health-check endpoints.

---

### 6. Chaining Multiple Middleware

Multiple middleware can be applied in sequence and will execute **left to right**.

```ts
consumer
  .apply(RequestIdMiddleware, LoggerMiddleware, AuthMiddleware)
  .forRoutes("*");
```

If any middleware does not call `next()`, execution stops immediately.

---

## Frequently Used Logic in Middleware (Very Important)

Middleware is designed for **repetitive, cross-cutting, and early-stage logic**. The following patterns are the most common in real-world applications:

### 1. Authentication Token Extraction

- Read tokens from headers or cookies
- Attach token or decoded payload to the request
- Authorization decisions happen later (usually in guards)

### 2. Request Logging and Metrics

- Log HTTP method, URL, IP address
- Measure request-response duration
- Feed logs into monitoring or alerting systems

### 3. Request or Trace ID Injection

- Generate a unique ID per request
- Attach it to `req` for tracing across logs and services

### 4. Header and Content-Type Validation

- Ensure required headers exist
- Reject unsupported content types early

### 5. Rate Limiting and Abuse Prevention

- Limit requests per IP or token
- Block brute-force or spam behavior

### 6. Request Normalization

- Normalize headers
- Trim strings
- Convert values into a consistent format

### 7. IP Whitelisting or Blacklisting

- Allow or deny traffic based on IP ranges
- Common for internal or admin endpoints

### 8. Maintenance or Kill-Switch Logic

- Temporarily block traffic during incidents
- Return service-unavailable responses globally

### 9. Payload Size and Safety Checks

- Prevent oversized payloads
- Protect against basic denial-of-service vectors

---

## Key Takeaways

- Middleware runs **before all NestJS request lifecycle features**
- It should remain **thin, fast, and framework-agnostic**
- Middleware prepares or filters requests, but **never contains business logic**
- If logic needs route metadata or handler context, middleware is already too early

> **Middleware prepares the request; it does not decide outcomes.**
