# ProductManager

Modernes Reparatur- und Auftragsmanagement für Werkstätten, Service-Teams und Ersatzteilprozesse. Das Projekt ist noch sehr früh in der Entwicklung, deshalb sind einige Bereiche bewusst nur als Platzhalter beschrieben.

## Überblick

ProductManager soll den kompletten Weg einer Reparaturanfrage abbilden: vom ersten Kunden-Login über die Anfrage, die interne Sichtung und die Kommunikation bis hin zur Statusverfolgung, Ersatzteilverwaltung und Auswertung von Statistiken. Der Fokus liegt auf einem klaren Ablauf, nachvollziehbaren Statuswechseln und einer sauberen Historie pro Gerät.

## Was das System später können soll

- 📬 E-Mail-Updates zu jedem wichtigen Statuswechsel des Pakets und der Reparatur
- 🔁 Frei konfigurierbare Reparatur- und Versandstatus wie „Auf dem Weg“, „Im Lager“, „in Reparatur“, „wartet auf Ersatzteile“ oder „auf dem Weg zu dir“
- 📝 Erfassung von Gerätedaten, Fehlerbeschreibung, bereits getesteten Schritten, Trackingnummer und weiteren Notizen
- 💸 Anzeige von gespartem Wert im Vergleich zum Neukauf
- 🕒 Timeline mit der Zeit, die ein Auftrag in jedem Status verbracht hat
- 📦 Warteschlange mit geschätzter Restzeit auf Basis der aktuellen Auslastung
- 💬 Rückfragen per Chat oder E-Mail, wenn Informationen fehlen oder unklar sind
- 📊 Statistik- und Graph-Ansichten für Gerätetypen, Reparaturarten und Team-Auswertung

## Beispielablauf

Ein Kunde legt ein Konto an, sendet eine Reparaturanfrage und beschreibt Gerät, Vermutung und bereits getestete Schritte. Das Team prüft die Anfrage, stellt Rückfragen und setzt den Status auf „warte auf Antwort“. Sobald die nötigen Informationen da sind, wird die Anfrage angenommen.

Danach folgen Versand, Wareneingang, interne Sichtung, Ersatzteilbestellung, Reparatur, Test und Warenausgang. Jede Phase soll später zeitlich erfasst werden, damit Kundinnen und Kunden sowie das Team jederzeit sehen können, wo sich der Auftrag befindet und wie lange der nächste Schritt ungefähr noch dauert.

## Dokumentation

- [Detaillierter Ablauf einer Reparaturanfrage](docs/repair-flow.md)
- [Funktionsübersicht und geplante Module](docs/features.md)
- [Screenshot-Platzhalter und geplante UI-Ansichten](docs/screenshots.md)

## Platzhalter für Screenshots

Die folgenden Ansichten sind aktuell nur als Platzhalter dokumentiert und werden später mit echten Screenshots ersetzt:

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
- `bun run lint` - TypeScript- und Style-Linting
- `bun run lint:fix` - Automatische Korrekturen
- `bun run db-push` - Prisma Schema in die Datenbank schreiben
- `bun run db-deploy` - Prisma Migrationen anwenden

## Tech-Stack

- Nuxt 4
- Vue 3
- Pinia
- Prisma
- PostgreSQL
- Sass / SCSS

## Status

Dieses Repository ist ein frühes Fundament für das spätere Produkt. Inhalte, UI und Datenmodell werden schrittweise ausgebaut.
