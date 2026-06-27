# Product

## Register

product

## Users

Three distinct roles — all operating in a workshop/service context:

- **Staff & Admins**: Workshop technicians and managers who live in this tool throughout the workday. They manage repair queues, assign work items, track parts orders, and communicate with customers. Context: low-ambient-light workshop or office, often on desktop, time-pressured and task-focused.
- **Customers**: Device owners checking in on their repair. Context: mobile or desktop, occasional use, unfamiliar with the tool — they need clarity above all else. Interface is in German.

## Product Purpose

ProductManager tracks the complete lifecycle of a repair request — from customer submission through internal diagnosis, parts ordering, repair phases, QA, and dispatch. It replaces paper-based or fragmented workflows with a single source of truth for the repair team. Success means: staff can act immediately on the right next thing without hunting for context, and customers know exactly where their device stands.

## Brand Personality

Structured, reliable, clear.

The tool should feel like a well-organized workshop: everything has a place, the important things are visible, and nothing is there just for decoration. Confident without being loud; precise without being cold.

## Anti-references

- **Generic SaaS clones** (Linear, Notion aesthetics): sidebar-driven layouts that feel borrowed, teal/blue accent combos, card grids that exist to fill space, identical-weight typography everywhere.
- **Enterprise bloat** (SAP, Jira): dense chrome-heavy UI, modal-within-modal patterns, status fields that require training to parse, "designed by committee" visual language.

## Design Principles

1. **Workflow over decoration** — every element earns its place by serving the repair workflow. Decorative surface area is a tax on the technician's attention.
2. **Status at a glance** — repair requests carry complex, layered state (work items, parts phases, request status, physical location). The interface must surface the right state for the current role without requiring the user to dig.
3. **Role-aware scope** — staff, admin, and customer surfaces are different tools for different jobs. Don't let admin complexity leak into customer views, and don't let customer simplicity under-serve staff needs.
4. **Predictable, not surprising** — a workshop trusts this tool with operational data. Interactions must be consistent, confirmations clear, and destructive actions explicitly guarded. The UI should never leave the user unsure what just happened.
5. **Density that serves, not overwhelms** — staff users need information density; customers need brevity. Calibrate each surface to its audience's actual scanning behavior, not to a one-size-fits-all layout convention.

## Accessibility & Inclusion

- WCAG AA minimum across all surfaces
- Sufficient contrast on dark-mode backgrounds (body text must hit ≥4.5:1 against dark gray backgrounds)
- All interactive elements keyboard-accessible
- Reduced-motion alternative for any animations (anime.js is in the stack; `prefers-reduced-motion` must always have a fallback)
- German-language content — no right-to-left requirements
