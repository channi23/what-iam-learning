# FULL STACK ROADMAP

**TypeScript + NestJS (Docs-only learning)**

> Goal: Become *actually good* at full-stack engineering by learning from first principles and official documentation only.

---

## PHASE 0 — Rules of the Game (Read Once)

- Use **official documentation only**
- ❌ No ChatGPT / Copilot / AI tools while learning
- Google errors, read GitHub issues, read specs
- If stuck → re-read docs, simplify, retry

> This phase never ends.

---

## PHASE 1 — Web + JavaScript Runtime Fundamentals  
**(Weeks 1–4)**

### Concepts to Learn

#### HTML
- Semantic tags  
- Forms & inputs  
- Accessibility basics  

#### CSS
- Box model  
- Flexbox  
- Grid  
- Responsive layouts  

#### JavaScript (runtime-level, not syntax)
- Execution context  
- Call stack  
- Heap  
- Closures  
- `this`  
- Prototypes  
- Event loop (macrotask vs microtask)  
- Sync vs async execution  

#### Async JavaScript
- Promises  
- `async / await`  
- Error propagation  
- Parallel vs sequential execution  

#### Node.js Basics
- What Node actually provides  
- Node vs browser JavaScript  
- Global objects  
- Streams (basic idea)  

---

### Exercises / Tasks

- Build a **static website** with:
  - Proper HTML semantics
  - Responsive layout (mobile + desktop)

- Write **pure JavaScript programs** (no frameworks):
  - Implement a custom `sleep(ms)`
  - Implement parallel API calls using `Promise.all`
  - Log execution order to prove event loop understanding

- Build a **bare Node HTTP server** (no Express):
  - Handle GET and POST
  - Parse request body manually
  - Send JSON responses

📌 **Rule:** If you can’t explain the event loop on paper → don’t move on.

---

## PHASE 2 — HTTP, REST & Backend Fundamentals  
**(Weeks 5–6)**

### Concepts to Learn

#### HTTP
- Methods  
- Status codes  
- Headers  
- Cookies vs tokens  
- Idempotency  

#### REST
- Resource-oriented design  
- Proper route naming  
- Error responses  
- Pagination basics  

#### TypeScript (backend-focused)
- Types vs interfaces  
- Generics  
- Enums  
- Utility types  
- Type narrowing  

---

### Exercises / Tasks

- Design a **REST API on paper**:
  - Resources
  - Routes
  - Request/response shapes
  - Error cases

- Build a **REST API using Express**:
  - CRUD for one resource
  - Centralized error handling
  - Strict response format

- Convert the same project to **TypeScript**:
  - ❌ No `any`
  - Proper DTO types

📌 **Rule:** If your API responses are inconsistent → redo.

---

## PHASE 3 — NestJS Deep Dive (Backend Engineering)  
**(Weeks 7–9)**

### Concepts to Learn

#### NestJS Core
- Modules  
- Controllers  
- Providers  
- Dependency Injection  
- Lifecycle  

#### Request Pipeline
- Pipes  
- Guards  
- Interceptors  
- Exception filters  

#### Validation
- DTOs  
- Schema validation  
- Request sanitization  

#### Authentication
- Password hashing  
- JWT  
- Auth guards  

#### Authorization
- Role-based access  
- Ownership checks  

---

### Exercises / Tasks

- Build a **NestJS API** with:
  - Authentication (signup, login, me)
  - Role-based access (admin / user)

- Add:
  - Global validation pipe
  - Global exception filter
  - Logging interceptor

- Refactor code to ensure:
  - Controllers = thin
  - Services = business logic
  - ❌ No business logic in controllers

📌 **Rule:** If your controllers are fat → refactor.

---

## PHASE 4 — Databases & Backend Architecture  
**(Weeks 10–12)**

### Concepts to Learn

#### Databases
- Relational thinking  
- Tables & relations  
- Indexes  
- Transactions  
- Joins  

#### PostgreSQL
- Schema design  
- Constraints  
- Foreign keys  

#### ORM (Prisma or Drizzle)
- Migrations  
- Relations  
- Transactions  
- Type-safe queries  

#### Architecture
- Separation of concerns  
- Service boundaries  
- Configuration management  
- Environment variables  

---

### Exercises / Tasks

- Design a **database schema on paper**:
  - Users
  - Roles
  - Relations

- Implement schema using ORM:
  - Migrations
  - Relations
  - Seed data

- Implement:
  - Ownership checks at service level
  - Transaction-based operations

- Add **basic tests**:
  - Service-level tests
  - API-level tests

📌 **Rule:** If deleting data breaks your app → schema is wrong.

---

## PHASE 5 — Frontend (Enough to be Full Stack)  
**(Weeks 13–14)**

### Concepts to Learn

#### React
- Components  
- Props  
- State  
- Hooks  
- Controlled inputs  

#### Next.js
- Routing  
- Data fetching  
- API routes  
- Server vs client components  

---

### Exercises / Tasks

- Build a **frontend** that:
  - Consumes your backend
  - Handles authentication
  - Shows errors properly

- Implement:
  - Protected routes
  - Loading states
  - Error boundaries

📌 **Rule:** Ugly UI is fine. Broken UX is not.

---

## PHASE 6 — Realtime Systems & Background Work  
**(Weeks 15–16)**

### Concepts to Learn

#### WebSockets
- Connection lifecycle  
- Authentication over WebSockets  
- Broadcast vs unicast  
- Event-based protocols  

#### In-memory State
- Global state risks  
- Cleanup strategies  
- Lifecycle management  

#### Queues / Pub-Sub
- Why async jobs exist  
- Retry logic  
- Failure handling  

---

### Exercises / Tasks (Capstone-Level)

- Build a **real-time backend system**:
  - JWT-authenticated WebSocket server
  - Role-based WebSocket events
  - In-memory session state
  - Persistence to database

- Implement:
  - Broadcast events
  - User-specific responses
  - Proper cleanup on completion

- Add:
  - Error events
  - Guard checks
  - Persistence guarantees

📌 **Rule:** If a server restart breaks logic → redesign.

---

## End Result (Reality Check)

After completing this roadmap:

- You understand how web systems **actually** work
- You can read and reason about **any backend codebase**
- You don’t panic when things break
- You’re ready for **AI / system design / infrastructure next**

> No hype. No shortcuts. Just engineering.
