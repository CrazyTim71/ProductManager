# ProductManager

Modernes Reparatur- und Auftragsmanagement für Werkstätten, Service-Teams und Ersatzteilprozesse.

## Überblick

ProductManager soll den kompletten Weg einer Reparaturanfrage abbilden: vom ersten Kunden-Login über die Anfrage, die interne Sichtung und die Kommunikation bis hin zur Statusverfolgung, Ersatzteilverwaltung und Auswertung von Statistiken. Der Fokus liegt auf einem klaren Ablauf, nachvollziehbaren Statuswechseln und einer sauberen Historie pro Gerät.

## Aktueller Funktionsstand

- Reparaturanfragen mit Kunden- und Staff-Sichten
- Arbeitsschritte (inklusive Statuswechseln wie PENDING, IN_PROGRESS, DONE)
- Chat pro Anfrage via Socket.IO
- Benachrichtigungen mit Badge, Mark-All-Read und Delete-Read
- Statushistorie für Reparaturphasen
- Archiv- und Verlaufssichten für abgeschlossene Aufträge

## Was das System später zusätzlich können soll

- 📬 E-Mail-Updates zu jedem wichtigen Statuswechsel des Pakets und der Reparatur
- 💸 Anzeige von gespartem Wert im Vergleich zum Neukauf
- 🕒 Timeline mit der Zeit, die ein Auftrag in jedem Status verbracht hat
- 📦 Warteschlange mit geschätzter Restzeit auf Basis der aktuellen Auslastung
- 💬 Rückfragen per E-Mail, wenn Informationen fehlen oder unklar sind
- 📊 Statistik- und Graph-Ansichten für Gerätetypen, Reparaturarten und Team-Auswertung

## Beispielablauf

Ein Kunde legt ein Konto an, sendet eine Reparaturanfrage und beschreibt Gerät, Vermutung und bereits getestete Schritte. Das Team prüft die Anfrage, stellt Rückfragen und setzt den Status auf „warte auf Antwort“. Sobald die nötigen Informationen da sind, wird die Anfrage angenommen.

Danach folgen Versand, Wareneingang, interne Sichtung, Ersatzteilbestellung, Reparatur, Test und Warenausgang. Jede Phase soll später zeitlich erfasst werden, damit Kundinnen und Kunden sowie das Team jederzeit sehen können, wo sich der Auftrag befindet und wie lange der nächste Schritt ungefähr noch dauert.

## Dokumentation

- [Detaillierter Ablauf einer Reparaturanfrage](docs/repair-flow.md)
- [Funktionsübersicht und geplante Module](docs/features.md)
- [Screenshot-Platzhalter und geplante UI-Ansichten](docs/screenshots.md)

## Platzhalter für Screenshots

- [Staff-Dashboard](docs/screenshots.md#staff-dashboard)
- [Statistik-Ansicht](docs/screenshots.md#statistik-ansicht)
- [Anfrage-Detail mit Timeline und Chat](docs/screenshots.md#anfrage-detail-mit-timeline-und-chat)

## Entwicklung

### Voraussetzungen

- Node.js oder Bun
- Docker und Docker Compose für den bevorzugten lokalen Workflow
- Eine konfigurierte PostgreSQL-Datenbank für Prisma

### Lokaler Start

```bash
bun install
bun run dev:local
```

### Start mit Docker

```bash
bun run dev
```

### Nützliche Befehle

- `bun run build` - Production-Build
- `bun run lint` - Automatische Korrekturen
- `bun run lint:fix` - Automatische Korrekturen
- `bun run lint:check` - TypeScript- und Style-Linting
- `bun run db-push` - Prisma Schema in die Datenbank schreiben
- `bun run db-deploy` - Prisma Migrationen anwenden

## Tech-Stack

- Nuxt 4
- Vue 3
- Pinia
- Prisma
- PostgreSQL
- Sass / SCSS
- Redis
- Socket.io

## Status

Dieses Repository ist ein frühes Fundament für das spätere Produkt. Inhalte, UI und Datenmodell werden schrittweise ausgebaut.
