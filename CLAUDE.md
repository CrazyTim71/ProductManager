# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (Docker — preferred, runs Postgres + Redis)
bun run dev          # start with Docker Compose
bun run dev:down     # stop Docker Compose

# Development (local — requires external Postgres/Redis)
bun run dev:local    # nuxt dev on port 8080

# Build & type-check
bun run build        # nuxt build (runs tsc at build time)
npx tsc --noEmit     # standalone type-check without building

# Linting (run both before committing)
bun run lint         # stylelint + eslint check
bun run lint:fix     # auto-fix both

# Database (all run inside the Docker container)
bun run db-push      # push schema changes (dev only, no migration file)
bun run db-deploy    # apply pending migrations (production-safe)
bun run db-seed      # seed initial data
bun run db-reset     # wipe migrations + reset DB (destructive)
```

## Architecture

**Nuxt 4** full-stack app. The `~/` alias points to `app/`, `~~/` points to the repo root.

### Server layout

```
server/
  api/v1/
    admin/     — admin-only routes (requireAdminAuth)
    staff/     — staff + admin routes (requireStaffAuth)
    user/      — authenticated customer routes (requireAuth)
    auth/      — login / signup / password-reset (public)
  middleware/auth.ts   — applies auth guards by URL prefix automatically
  plugins/
    socket.io.server.ts   — initializes Socket.IO, exports `socketServer`
    notificationDigest.ts — background digest mailer (polling interval)
    initSequence.ts
  realtime/             — all real-time / chat logic in one place
    index.ts            — Socket.IO connection setup, room join on connect
    chatHandler.ts      — socket event handlers (chat:join, chat:send, etc.)
    chat.ts             — DB logic for messages, channels, participants
    notifications.ts    — create/emit notifications, badge counts
  utils/
    apiResponses.ts     — createApiError(), sendApiResponse() — used everywhere
    prisma.ts           — shared Prisma client singleton
    auth/               — session management (JWT + Redis), cookie helpers, socket auth
    crypto/             — JWT sign/verify, token generation
    cache/
      redis.ts          — IORedis client singleton + getRedisSync/setRedisSync helpers
    backend/            — pure domain/CRUD logic (no socket concerns)
      crud.ts           — generic CRUD handler factory used by most admin/staff routes
      route.ts          — withExistingRouteEntity() helper
      routeHelpers.ts   — getValidatedBody(), findRecordOrThrow()
      validation.ts     — Zod schemas for request bodies
      repairStatus.ts   — repair status transitions + notifications
      automaticState.ts — auto-sync request state from work item statuses
      workItems.ts, partOrders.ts, user.ts, config.ts, rateLimit.ts
    mail/               — nodemailer setup, templates, email service
```

### Auth model

Sessions are stored in Redis (not database). On login a JWT is issued containing a `random` token; the actual session data (`UserSession`) lives in Redis at `user-{random}`. `server/middleware/auth.ts` calls `requireAuth` / `requireStaffAuth` / `requireAdminAuth` based on URL prefix — no per-route decoration needed.

`server/utils/auth/index.ts` is also the entry point for `parseSocketCookie()`, used by the Socket.IO middleware to authenticate WebSocket connections using the same cookie.

### Real-time

`server/plugins/socket.io.server.ts` creates the Socket.IO server and exports the `socketServer` singleton. `server/realtime/notifications.ts` imports that singleton to emit badge updates. When adding new socket events, put handlers in `server/realtime/chatHandler.ts` and business logic in `server/realtime/chat.ts`.

The frontend connects via `app/composables/socketClient.ts` (`useSocketClient()`), which is a module-level singleton wrapping `socket.io-client`.

### Frontend layout

```
app/
  pages/
    admin/    — device, brand, category, work-item-type management
    staff/    — request list and detail, parts
    request/  — customer-facing request list + new request form
    chat/     — real-time chat room
    (root)    — login, signup, profile, dashboard
  components/
    common/   — shared layout pieces (popup, selector, changelog)
    repair/   — repair-specific widgets (work item editor, step graph, status badge)
    ui/       — primitive UI components (UiButton, InputText, Checkbox, etc.)
    view/     — page-level view templates (edit page, parameters page)
  composables/
    socketClient.ts  — Socket.IO client singleton + event wiring
    toastManager.ts  — global toast queue
    navigation.ts    — header menu config
    layout.ts        — viewport/window store bridge
  store/index.ts     — single Pinia store (user session, toasts, notification badge)
  scss/              — global SCSS variables and color tokens (auto-injected into every SFC)
```

### Data model (key Prisma models)

- **User** — `CUSTOMER | STAFF | ADMIN` roles
- **RepairRequest** — central entity; has `RepairRequestStatus` (workflow state) and `RepairStatus` (physical location of the device)
- **RepairWorkItem** — checklist steps on a request; status drives `automaticState.ts`
- **RepairMessage / MessageChannel** — chat per request
- **Notification** — in-app + digest email notifications
- **PartOrder** — spare-part tracking per work item
- **RepairDevice / Brand / DeviceCategory** — device catalog

### Import conventions

- `~~/server/...` — server-side absolute imports (from any server file)
- `~/...` — client-side absolute imports pointing into `app/`
- Nuxt auto-imports: composables in `app/composables/`, utils in `server/utils/` are available without explicit import. `prisma`, `createApiError`, `requireAuth` etc. are all auto-imported in server route handlers.

### SCSS

Global color and variable tokens are injected via `additionalData` in `nuxt.config.ts` — every Vue SFC can use them without importing. The tokens live in `app/scss/colors.scss` and `app/scss/variables.scss`.
