# Middleware in NestJS

## Overview

In NestJS, **middleware runs before a request reaches the controller** and before any framework-level constructs such as **pipes, guards, or interceptors**. It operates at a very early stage of the request lifecycle and is mainly responsible for **pre-processing incoming requests**.

Middleware is commonly used to **inspect, validate at a shallow level, or modify the request**, such as checking headers, extracting tokens, logging request details, or enforcing basic constraints.

Middleware can be integrated with NestJS’s **dependency injection system** by using the `@Injectable()` decorator, allowing it to inject and reuse application services like any other provider.

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


