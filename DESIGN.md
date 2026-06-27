---
name: ProductManager
description: Repair and order management platform for workshops, service teams, and technicians
colors:
  # Dark mode surfaces (default theme)
  surface-deep: "#131316"
  surface-base: "#18181B"
  surface-elevated: "#202024"
  surface-raised: "#26262C"
  surface-border: "#30303C"
  surface-border-muted: "#3c3c3f"
  # Text
  text-primary: "#DEDEE7"
  text-secondary: "#D5D5E4"
  text-muted: "#aaaaac"
  text-subtle: "#525255"
  # Primary — Technical Violet
  primary: "#7c59bc"
  primary-hover: "#8f70c6"
  primary-active: "#6743b2"
  primary-deep: "#512da8"
  primary-light: "#a287d0"
  # Semantic
  success: "#66bb58"
  success-deep: "#46a92d"
  warning: "#bb9d58"
  warning-deep: "#a97d2d"
  error: "#bb5866"
  error-deep: "#a92d46"
  info: "#58bbad"
  # Secondary — Muted Workshop Green
  secondary: "#587c58"
  secondary-hover: "#719f71"
typography:
  body:
    fontFamily: "Noto Sans, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Noto Sans, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
  small:
    fontFamily: "Noto Sans, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  fine:
    fontFamily: "Noto Sans, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  xs: "4px"
  sm: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xs}"
    padding: "8px 20px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xs}"
    padding: "8px 20px"
    height: "40px"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xs}"
    padding: "8px 20px"
    height: "40px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xs}"
    padding: "8px 20px"
    height: "40px"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xs}"
    width: "40px"
    height: "40px"
    padding: "8px"
  input:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  input-focused:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  status-badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "8px"
---

# Design System: ProductManager

## 1. Overview

**Creative North Star: "The Workshop Ledger"**

ProductManager is built on the logic of a well-kept technical record: every row has a purpose, every column is labeled, and nothing is there because it looked good. The dark substrate is not aesthetic preference — it's the natural context of a workshop environment where people work long shifts and the interface should recede, leaving only the content lit. The purple accent appears selectively, like ink on a ledger: marking what's actionable, signaling current state, never decorating.

The system earns trust through consistency. A button looks the same whether you're an admin or a customer. A status badge carries the same weight across every view. The hierarchy is communicated through spacing rhythm and font weight, not through visual flourish. Depth comes from layered dark surfaces — the header sits at the absolute base (`#131316`), the body one step up (`#18181B`), cards and inputs another step up (`#202024`) — with no shadows needed because the tonal separation is clear. Ghost borders appear only when interaction is possible; they disappear at rest to keep the surface clean.

This system explicitly rejects the generic SaaS clone aesthetic (sidebar-heavy layouts borrowed from Linear, identical card grids that fill space, teal/blue accent combos that feel borrowed) and the enterprise bloat of over-chromed tools (modals stacked inside modals, density without hierarchy, "designed by committee" status indicators that require training to parse).

**Key Characteristics:**
- Single-family typography (Noto Sans variable) across all roles — no decorative pairing
- Flat-by-default elevation: tonal layering over shadows, ghost borders over static strokes
- Semantic color vocabulary that maps 1:1 to repair workflow states
- PC-only hover transitions (`@include pc` gate) — touch devices get instant feedback
- Invertible light/dark theme: the dark gray and light gray scales swap symmetrically
- Technical Violet used exclusively for primary actions, active selection, and focus indicators — never decoration

## 2. Colors: The Shift-Ready Palette

A near-black substrate with a single violet accent and a full semantic vocabulary. Every color earns its presence by encoding information.

### Primary
- **Technical Violet** (`#7c59bc`): The interactive signal. Used on primary buttons, active nav items, input focus borders, checkbox fill, and progress indicators. Its rarity is the point — when violet appears, there's something to do or something that's happening.
- **Technical Violet Light** (`#8f70c6`): Hover state on primary buttons and active elements.
- **Technical Violet Deep** (`#6743b2`): Pressed/active state; also used for `ACCEPTED` and `IN_REPAIR` repair status badges.
- **Technical Violet Foundation** (`#512da8`): Darkest violet; loader animation accent color, deep emphasis.
- **Technical Violet Pale** (`#a287d0`): Subtle highlights, progress bar color on page load.

### Secondary
- **Workshop Green** (`#587c58`): Minor secondary accent used sparingly. Quieter than success; carries "secondary action" meaning without competing with semantic success colors.
- **Workshop Green Light** (`#719f71`): Hover on secondary-colored elements.

### Tertiary — Semantic States
Each semantic color maps directly to repair workflow meaning. They appear only in status badges, alert states, and inline indicators — never as background or decorative color.

- **Repair Green / Success** (`#66bb58` / deep: `#46a92d`): Completed requests, delivered status.
- **Amber Warning** (`#bb9d58` / deep: `#a97d2d`): Waiting states (diagnosis, waiting for parts, QA).
- **Rose Error** (`#bb5866` / deep: `#a92d46`): Cancelled, rejected states.
- **Teal Info** (`#58bbad`): Informational indicators.

### Neutral
- **Ledger Base** (`#131316`): Header, deepest chrome. The absolute floor.
- **Workshop Floor** (`#18181B`): Body background. Where everything rests.
- **Surface Card** (`#202024`): Input backgrounds, card surfaces. One visible step above the floor.
- **Surface Raised** (`#26262C`): Mid-surface layer for panels and secondary areas.
- **Ghost Border Active** (`#30303C`): The hover-state border on interactive surfaces. Present only when hovered.
- **Surface Button Dark** (`#3c3c3f`): Secondary-black button background.
- **Text Muted** (`#525255`): Counters, metadata, secondary labels at rest.
- **Text Subtle** (`#aaaaac`): Fine print, counter text, inactive labels.
- **Text Secondary** (`#D5D5E4`): Slightly dimmed body text, secondary content.
- **Text Primary** (`#DEDEE7`): Main body text, button labels, input values. Default ink on dark surfaces.
- **Near White** (`#FAFAFA`): True white for inverse-on-dark elements.

### Named Rules
**The One Signal Rule.** Technical Violet appears only on primary actions, active selection, and focus indication. It must never appear as a decorative tint, card accent, or section header. Its scarcity is the trust signal.

**The Semantic Lock Rule.** Success green (`#66bb58`), warning amber (`#bb9d58`), error rose (`#bb5866`), and info teal (`#58bbad`) are reserved exclusively for state communication. They do not appear as branding, section differentiation, or visual interest.

**The Tonal Stack Rule.** Dark surfaces are never at the same depth as their containers. The three-layer stack (`surface-deep` → `surface-base` → `surface-elevated`) must remain legible without shadow — if the contrast between adjacent layers is ambiguous, the outer layer is wrong.

## 3. Typography

**Body Font:** Noto Sans (variable, with `font-optical-sizing: auto` and `font-variation-settings: "wdth" 100`)
**Fallback:** Arial, sans-serif

**Character:** A single humanist sans-serif carries every role — display, body, label, fine print. No decorative pairing. The variable font axes provide just enough range that headings read as headings without requiring a second family. Noto Sans at 600 weight carries labels and buttons without aggression; at 400 it recedes into readable body text. The design exploits weight contrast, not family contrast.

### Hierarchy
- **Label / Title** (600 weight, 13px, 1.0 line-height): Form labels, column headers, card titles, button text. The primary UI voice.
- **Body** (400 weight, 13px, 1.5 line-height): Descriptions, notes, message content. Max 65–75ch where readable.
- **Small** (400 weight, 11px, 1.4 line-height): Counters, helper text, fine metadata.
- **Fine** (400 weight, 10px, 1.0 line-height): Link underlines, character count warnings, mobile overrides for all sizes.

*Mobile breakpoint (≤699px) drops label and body from 13px to 10px. Tablet (700–1365px) shares mobile sizing. PC (≥1366px) uses the default 13px scale.*

### Named Rules
**The One Family Rule.** Noto Sans only. Do not introduce a display typeface for headings, a mono face for data, or a serif for editorial pull-quotes. The system has no editorial ambitions; it is a tool. One family, used well.

**The Weight Hierarchy Rule.** Weight 600 = interactive or labeling. Weight 400 = descriptive or passive. Never invert these. A 400-weight button is illegible; a 600-weight paragraph is aggressive.

## 4. Elevation

This system is flat by design. There are no `box-shadow` declarations anywhere in the component library. Depth is communicated through the three-layer tonal stack: `#131316` (deepest chrome, header) → `#18181B` (body background) → `#202024` (elevated surfaces — inputs and card backgrounds). The separation is perceptible without requiring shadows, and the dark palette makes tonal layering more legible than light-mode alternatives.

Interactive depth is signaled through **ghost borders**: inputs and interactive containers carry `border: 2px solid transparent` at rest. On hover, the border becomes `#30303C` (surface-border); on focus, it becomes `#7c59bc` (primary). The border appears and disappears; it is a state indicator, not a static chrome element.

### Named Rules
**The Flat-by-Default Rule.** Add no shadows to new components. If something needs to feel "elevated," use a darker background container (go one step toward `surface-deep`) or a ghost border, not a drop shadow.

**The Ghost Border Rule.** Interactive containers use a transparent 2px border at rest. Never a visible static stroke. The border appears only on hover and focus, communicating interactivity without cluttering the resting state.

## 5. Components

### Buttons
**Precise and compact** — squared corners (4px radius), consistent 40px height (M) or 32px (S), tight 8px×20px padding. Five variants; each one unambiguous.

- **Primary** (`#7c59bc` bg, `#DEDEE7` text, 4px radius, 8px 20px padding, 40px height): The action the user should take. Hover → `#8f70c6`, focus/active → `#6743b2`. 0.3s transition on PC only.
- **Secondary** (transparent bg, `#DEDEE7` text): Ghost action — present but subordinate. Hover → `rgba(#FAFAFA, 2%)`, active → `#7c59bc` background.
- **Secondary-Black** (`#3c3c3f` bg): Toolbar and chrome actions. Darker read than secondary; slightly more prominent than ghost.
- **Destructive** (transparent bg, `#b14357` label color): Dangerous actions labeled in error-rose. Never a red background — the color is the warning, not the whole button.
- **Link** (transparent, underlined, 10px, left-aligned): Inline navigation or fine-print actions. Not a CTA.
- **Icon-only** (40px × 40px or 32px × 32px): Same variants as above; padding collapses to 8px all sides.

**Disabled state:** `opacity: 0.24`. Pointer events removed. Primary disabled gets `rgba(#FAFAFA, 2%)` background instead of violet.

### Inputs / Fields
- **Style:** `#202024` (surface-elevated) background, 2px ghost border (transparent → `#30303C` hover → `#7c59bc` focus), 8px radius.
- **Text:** 600 weight, 13px, `#DEDEE7`. Placeholder at 50% opacity of the same color.
- **Error state:** Border → `#bb5866`. Character counter turns 700 weight and `#bb5866` when exceeded.
- **Label:** Sits 8px above the container, 13px, 600 weight.
- **Textarea:** Identical treatment to text input; height is variable.
- **Disabled:** Not explicitly styled; inherits opacity reduction from parent context.

### Status Badges
The most distinctive primitive in the system — semantic repair-state chips.

- **Shape:** 8px radius, 8px padding (all sides), `width: fit-content`.
- **Color assignment:** Each repair status maps to a specific semantic color. The full map:
  - `ACCEPTED`, `IN_REPAIR`, `IN_OUTGOING`, `RECEIVED`, `ON_THE_WAY_TO_CUSTOMER` → violet primary family (`#6743b2`, `#7c59bc`)
  - `WAITING_*`, `IN_DIAGNOSIS`, `IN_QA`, `ON_THE_WAY_TO_SHOP` → warning amber (`#b18c43`, `#a97d2d`)
  - `COMPLETED`, `DELIVERED` → success green (`#57b143`)
  - `CANCELLED`, `REJECTED` → error rose (`#b14357`)
  - `ARCHIVED` → muted (`#bfbfc2`)
- **Text:** `#DEDEE7` on all colored backgrounds. No border.
- **Rule:** Status badges are always filled (background color = the status color). Never outline-only, never icon-only.

### Checkboxes
- **Shape:** 16px × 16px box, 4px radius, 1px `#EDEDF2` (lightgray100) border at rest.
- **Checked:** Background and border → `#7c59bc`; SVG check mark scales from 0 to 1 (0.3s transition).
- **Label:** 12px, 600 weight, 16px gap from box. Layout flips via `revert` prop.

### Navigation (Header)
- **Container:** Sticky, `#131316` background (surface-deep), 9px padding, `grid-template-columns: 0.5fr 2fr 0.5fr`.
- **Brand text:** "Manager" in plain text — no logo image.
- **Nav items:** `UiButton` in `secondary` type when inactive (transparent bg), `primary` type when active (`#7c59bc` bg). Material Symbols icons 16px–24px.
- **Dropdown children:** Positioned below parent button; same button variants inside.

### Loader
Signature loading state using a CSS 3D perspective animation (not a spinner):
- 48px (full) or 22px (small `smol` variant), rotated 45deg.
- Two `::before`/`::after` pseudoelements using `perspective: 1000px` and `box-shadow` animation.
- Primary color in `currentColor` (white), secondary in `#512da8` (primary700) on the after pseudo with 0.4s delay.

### Popup / Modal
- **Backdrop:** Fixed, full viewport.
- **Entry animation:** `opacity: 0 → 1` over `0.5s ease`.
- **Controls:** Two buttons (submit: `success500` tinted, close: `error600` tinted) with icon + label.

### Repair Timeline (Signature Component)
A horizontal Gantt chart showing repair phase durations.
- Rows: one per status phase, labeled with German status names.
- Bars: positioned and sized with inline style based on time range; colored per status using the same semantic map as Status Badges.
- Active/ongoing bars pulse with a CSS animation.
- Footer: start date, total duration, end date.
- Empty state: "Noch kein Verlauf vorhanden" in plain text.

## 6. Do's and Don'ts

### Do:
- **Do** use `surface-elevated` (`#202024`) as the background for inputs and interactive containers. Always pair with a ghost border.
- **Do** use Technical Violet (`#7c59bc`) as the single interactive accent. It appears on one dominant action per screen — the rest step back.
- **Do** use 600 weight for all interactive labels (buttons, inputs, nav items) and 400 for descriptive body copy. Weight is the hierarchy signal.
- **Do** communicate status through the semantic color map. Repair states are immutable to their colors; never remap them for aesthetics.
- **Do** apply hover transitions with `@include pc` only. Touch users get instant state changes — no `0.3s` delay.
- **Do** use ghost borders (transparent 2px at rest, colored on hover/focus) for all interactive containers. Static strokes at rest are noise.
- **Do** keep the three-layer tonal stack intact: `#131316` → `#18181B` → `#202024`. Don't put surfaces of the same depth adjacent to each other.
- **Do** give every interactive component all five states: default, hover, focus, active, disabled. Don't ship with half.
- **Do** respect the `prefers-reduced-motion` preference. Every CSS transition and animation must have an instant fallback.

### Don't:
- **Don't** use Technical Violet as a decorative color, section background, card tint, or illustration element. It signals action only.
- **Don't** introduce a second typeface. NotoSans handles every role. A display serif for a heading or a mono face for data is out of scope for a workshop tool.
- **Don't** add box-shadows. Depth is tonal. A shadow on a dark surface reads as a rendering bug, not elevation.
- **Don't** build components that look like Generic SaaS clones (Linear/Notion aesthetics: borrowed sidebar layouts, teal/blue accents, identical card grids that fill space for no reason, all-caps tracked eyebrows above every section).
- **Don't** build Enterprise bloat (SAP/Jira aesthetics: dense chrome-heavy UI, status fields that need training to parse, modal-within-modal patterns, navigation that requires learning a map).
- **Don't** use `border-left` greater than 1px as a colored stripe accent on cards or list items. If an item needs visual separation, use background tint or spacing.
- **Don't** use gradient text (`background-clip: text`). Emphasis is weight and color, not gradients.
- **Don't** apply orchestrated page-load sequences or stagger animations across sections. This is a task tool; users arrive in the middle of work, not at the beginning of an experience.
- **Don't** use display-weight type for labels, buttons, or status indicators. The system has one weight axis — use it consistently.
- **Don't** put a modal in front of an action that could be done inline. Modals are the last resort, not the first.
