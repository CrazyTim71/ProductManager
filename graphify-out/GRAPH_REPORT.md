# Graph Report - .  (2026-06-25)

## Corpus Check
- 200 files · ~75,557 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 732 nodes · 1131 edges · 88 communities (78 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Authentication & Session Management|Authentication & Session Management]]
- [[_COMMUNITY_CRUD Backend & Device Management|CRUD Backend & Device Management]]
- [[_COMMUNITY_Email Template Components|Email Template Components]]
- [[_COMMUNITY_Backend Services & Auto State|Backend Services & Auto State]]
- [[_COMMUNITY_Frontend Composables & Sockets|Frontend Composables & Sockets]]
- [[_COMMUNITY_Build Config & Dev Dependencies|Build Config & Dev Dependencies]]
- [[_COMMUNITY_Repair Parts & Work Items|Repair Parts & Work Items]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Staff Request Detail View|Staff Request Detail View]]
- [[_COMMUNITY_Feature & Repair Flow Docs|Feature & Repair Flow Docs]]
- [[_COMMUNITY_Auth API & Rate Limiting|Auth API & Rate Limiting]]
- [[_COMMUNITY_Database Scripts & Build|Database Scripts & Build]]
- [[_COMMUNITY_Work Item Editor|Work Item Editor]]
- [[_COMMUNITY_Repair Request UI Panels|Repair Request UI Panels]]
- [[_COMMUNITY_Style Lint Config|Style Lint Config]]
- [[_COMMUNITY_Layout & Style System|Layout & Style System]]
- [[_COMMUNITY_Repair Flow Diagram|Repair Flow Diagram]]
- [[_COMMUNITY_New Repair Request Form|New Repair Request Form]]
- [[_COMMUNITY_Docker & CICD Infrastructure|Docker & CI/CD Infrastructure]]
- [[_COMMUNITY_Chat Interface UI|Chat Interface UI]]
- [[_COMMUNITY_Changelog Popup|Changelog Popup]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Common Selector Component|Common Selector Component]]
- [[_COMMUNITY_Database Seed Data|Database Seed Data]]
- [[_COMMUNITY_Component Type Definitions|Component Type Definitions]]
- [[_COMMUNITY_Number Input Component|Number Input Component]]
- [[_COMMUNITY_Prettier Config|Prettier Config]]
- [[_COMMUNITY_Admin Config Page|Admin Config Page]]
- [[_COMMUNITY_Brand Admin Page|Brand Admin Page]]
- [[_COMMUNITY_Work Item Type Admin|Work Item Type Admin]]
- [[_COMMUNITY_Device Category Page|Device Category Page]]
- [[_COMMUNITY_Status UI Component|Status UI Component]]
- [[_COMMUNITY_Dev Container Init|Dev Container Init]]
- [[_COMMUNITY_Common Popup|Common Popup]]
- [[_COMMUNITY_Server Entrypoint|Server Entrypoint]]
- [[_COMMUNITY_Dev Server Entrypoint|Dev Server Entrypoint]]
- [[_COMMUNITY_Dev Container Setup|Dev Container Setup]]
- [[_COMMUNITY_View Menu|View Menu]]
- [[_COMMUNITY_Dev Docker App Service|Dev Docker App Service]]
- [[_COMMUNITY_Public Changelog|Public Changelog]]
- [[_COMMUNITY_Robots.txt|Robots.txt]]

## God Nodes (most connected - your core abstractions)
1. `createApiError()` - 40 edges
2. `scripts` - 21 edges
3. `crud()` - 18 edges
4. `getMailConfig()` - 14 edges
5. `renderEmailButton()` - 12 edges
6. `renderEmailLayout()` - 12 edges
7. `useStore` - 11 edges
8. `sendEmail()` - 11 edges
9. `ProductManager README` - 11 edges
10. `rules` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Planned: Timeline with Time per Status` --semantically_similar_to--> `Step 9: History and Analytics`  [INFERRED] [semantically similar]
  README.md → docs/repair-flow.md
- `docker-compose-local: productmanager-app Service (Build)` --semantically_similar_to--> `docker-compose: productmanager-app Service (latest image)`  [INFERRED] [semantically similar]
  docker-compose-local.yml → docker-compose.yml
- `docker-compose-next: productmanager-app Service (next image)` --semantically_similar_to--> `docker-compose: productmanager-app Service (latest image)`  [INFERRED] [semantically similar]
  docker-compose-next.yml → docker-compose.yml
- `Features Overview Document` --references--> `Tech Stack (Nuxt 4, Vue 3, Pinia, Prisma, PostgreSQL, Redis, Socket.io, Sass)`  [EXTRACTED]
  docs/features.md → README.md
- `Status System (Extensible, Custom Labels)` --conceptually_related_to--> `Status History for Repair Phases`  [INFERRED]
  docs/features.md → README.md

## Import Cycles
- 4-file cycle: `server/plugins/socket.io.server.ts -> server/socket.io/index.ts -> server/utils/backend/chat.ts -> server/utils/backend/notificationCenter.ts -> server/plugins/socket.io.server.ts`
- 5-file cycle: `server/plugins/socket.io.server.ts -> server/socket.io/index.ts -> server/socket.io/chatHandler.ts -> server/utils/backend/chat.ts -> server/utils/backend/notificationCenter.ts -> server/plugins/socket.io.server.ts`

## Hyperedges (group relationships)
- **End-to-End Repair Lifecycle Flow** — docs_repair_flow_customer_account, docs_repair_flow_create_request, docs_repair_flow_internal_review, docs_repair_flow_acceptance, docs_repair_flow_goods_receipt_queue, docs_repair_flow_diagnosis, docs_repair_flow_parts_repair, docs_repair_flow_testing_dispatch, docs_repair_flow_history_analytics [EXTRACTED 1.00]
- **Docker Deployment Environments (local build, next image, latest image, dev)** — docker_compose_local_service_app, docker_compose_next_service_app, docker_compose_yml_service_app, docker_compose_dev_service_app [INFERRED 0.85]
- **Planned Future Features (email, timeline, queue, statistics)** — productmanager_readme_future_email_updates, productmanager_readme_future_timeline, productmanager_readme_future_queue, productmanager_readme_future_statistics [EXTRACTED 1.00]

## Communities (88 total, 10 thin omitted)

### Community 0 - "Authentication & Session Management"
Cohesion: 0.05
Nodes (52): removeAuthCookie(), setAuthCookie(), checkJwt(), H3EventContext, invalidateUserSession(), makeSession(), makeUserSession(), parseSocketCookie() (+44 more)

### Community 1 - "CRUD Backend & Device Management"
Cohesion: 0.06
Nodes (36): crud(), CrudBaseRecord, CrudBody, CrudConfig, CrudCreateConfig, CrudDeleteConfig, CrudGetConfig, CrudListConfig (+28 more)

### Community 2 - "Email Template Components"
Cohesion: 0.09
Nodes (42): escapeHtml(), renderEmailButton(), EmailLayoutInput, escapeHtml(), renderEmailLayout(), escapeHtml(), renderEmailListItem(), normalizeRecipients() (+34 more)

### Community 3 - "Backend Services & Auto State"
Cohesion: 0.08
Nodes (32): syncAutomaticRequestState(), SyncAutomaticRequestStateInput, getUnreadNotificationCount(), getUserRoomName(), getOrCreateAppConfig(), createNotification(), emitNotificationBadgeForUser(), NotificationCreateInput (+24 more)

### Community 4 - "Frontend Composables & Sockets"
Cohesion: 0.06
Nodes (29): HeaderItem, useSocketClient(), registerToastManager(), useToastManager(), router, { showToast }, store, router (+21 more)

### Community 5 - "Build Config & Dev Dependencies"
Cohesion: 0.05
Nodes (37): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-vue, @iconify-json/material-symbols, @nuxt/devtools, @nuxt/eslint (+29 more)

### Community 6 - "Repair Parts & Work Items"
Cohesion: 0.08
Nodes (18): route, store, emit, deviceTypeFilter, filteredRequests, statusFilterOptions, AppConfigResponse, RepairSavingsSummary (+10 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.07
Nodes (27): dependencies, animejs, bcrypt, dotenv, ioredis, jsonwebtoken, markdown-it, nodemailer (+19 more)

### Community 8 - "Staff Request Detail View"
Cohesion: 0.09
Nodes (20): allWorkItemsDone, archiveRequest(), canArchive, chatButtonText, displayName, displayStatus, effectiveRepairStatus, isArchived (+12 more)

### Community 9 - "Feature & Repair Flow Docs"
Cohesion: 0.11
Nodes (25): Features Overview Document, Customer Area Features, Statistics and Device History, Status System (Extensible, Custom Labels), Team Area Features, Repair Flow Document (End-to-End Process), Step 4: Acceptance and Shipping Info, Step 2: Create Repair Request (+17 more)

### Community 10 - "Auth API & Rate Limiting"
Cohesion: 0.14
Nodes (13): groupDigestRowsByUser(), sendNotificationDigestEmails(), checkRateLimit(), RateLimitOptions, redisClient, createUser(), CreateUserResult, passwordResetRequestSchema (+5 more)

### Community 11 - "Database Scripts & Build"
Cohesion: 0.10
Nodes (21): scripts, build, db-deploy, db-drop, db-push, db-reset, db-reset-db, db-seed (+13 more)

### Community 12 - "Work Item Editor"
Cohesion: 0.12
Nodes (16): applySelectedWorkItemTypeDefaults(), emit, props, propsDefaultOrderIndex, propsItem, submit(), submitText, RepairWorkItemWithRelationsType (+8 more)

### Community 13 - "Repair Request UI Panels"
Cohesion: 0.21
Nodes (14): Customer Details Panel, Customer Notes Panel, iPhone 16 Pro (Example Device), Manager Application (ProductManager), mindcollaps Customer (mindcollaps@mill@gmx.de), Repair Device Panel, Repair Flow Panel, Repair Flow Phase: Diagnose (+6 more)

### Community 14 - "Style Lint Config"
Cohesion: 0.14
Nodes (13): extends, overrides, plugins, rules, custom-property-pattern, declaration-block-single-line-max-declarations, declaration-empty-line-before, declaration-property-value-keyword-no-deprecated (+5 more)

### Community 15 - "Layout & Style System"
Cohesion: 0.27
Nodes (5): ready, store, PartialRecord, ColorsList, ThemesList

### Community 16 - "Repair Flow Diagram"
Cohesion: 0.27
Nodes (12): Order Status: Pending, Phase: Diagnosis (10-29), Phase: Intake (0-9), Phase: Repair (30-89), Progress Tracker (0/9 done), Repair Flow, Step: Batteriewechsel (Battery replacement), Step: Diagnose (Fault finding and measurement) (+4 more)

### Community 17 - "New Repair Request Form"
Cohesion: 0.18
Nodes (9): alreadyTried, customerNotes, deviceBrand, deviceModel, deviceName, problemDesciption, router, { showToast } (+1 more)

### Community 18 - "Docker & CI/CD Infrastructure"
Cohesion: 0.33
Nodes (9): docker-compose-local: productmanager-app Service (Build), docker-compose-local: PostgreSQL DB Service, docker-compose-local: Redis Service, docker-compose-next: productmanager-app Service (next image), docker-compose: productmanager-app Service (latest image), GitHub Actions: Docker Publish Workflow, Branch-Based Docker Tag Strategy (latest/next/sha), Dockerfile (.config/Dockerfile) (+1 more)

### Community 19 - "Chat Interface UI"
Cohesion: 0.33
Nodes (9): Chat Interface UI, Dark Theme Design, Message Bubbles Layout, Message Input Field, Send Button (Senden), Message Timestamps, Two-User Conversation Feature, Admin User (+1 more)

### Community 20 - "Changelog Popup"
Cohesion: 0.25
Nodes (6): config, isVisible, lastSeenVersion, markdown, md, renderedMarkdown

### Community 21 - "TypeScript Config"
Cohesion: 0.25
Nodes (7): compilerOptions, noImplicitAny, paths, types, files, ~/*, references

### Community 22 - "Common Selector Component"
Cohesion: 0.38
Nodes (3): clearBlurTimeout(), openDropdown(), toggleDropdown()

### Community 23 - "Database Seed Data"
Cohesion: 0.29
Nodes (5): brands, deviceCategories, devices, prisma, workItemTypes

### Community 24 - "Component Type Definitions"
Cohesion: 0.33
Nodes (5): EditPage, EditPageField, ParametersPage, ParametersPageEntry, ParametersPageField

### Community 25 - "Number Input Component"
Cohesion: 0.33
Nodes (3): focused, inputValue, model

### Community 26 - "Prettier Config"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 28 - "Brand Admin Page"
Cohesion: 0.50
Nodes (3): id, route, router

### Community 29 - "Work Item Type Admin"
Cohesion: 0.50
Nodes (3): id, route, router

### Community 30 - "Device Category Page"
Cohesion: 0.50
Nodes (3): id, route, router

### Community 31 - "Status UI Component"
Cohesion: 0.50
Nodes (3): props, string, styleColor

## Knowledge Gaps
- **277 isolated node(s):** `entrypoint.dev.sh script`, `entrypoint.sh script`, `init-env.sh script`, `setup.sh script`, `semi` (+272 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createApiError()` connect `Backend Services & Auto State` to `Authentication & Session Management`, `CRUD Backend & Device Management`, `Auth API & Rate Limiting`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `ClientToServerEvents` connect `Authentication & Session Management` to `Frontend Composables & Sockets`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `ServerToClientEvents` connect `Authentication & Session Management` to `Frontend Composables & Sockets`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `createApiError()` (e.g. with `checkJwt()` and `requireAdminAuth()`) actually correct?**
  _`createApiError()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `entrypoint.dev.sh script`, `entrypoint.sh script`, `init-env.sh script` to the rest of the system?**
  _277 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Authentication & Session Management` be split into smaller, more focused modules?**
  _Cohesion score 0.05146242132543503 - nodes in this community are weakly interconnected._
- **Should `CRUD Backend & Device Management` be split into smaller, more focused modules?**
  _Cohesion score 0.05754475703324808 - nodes in this community are weakly interconnected._