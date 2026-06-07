# Funktionsübersicht

Dieses Dokument fasst die wichtigsten geplanten Bausteine des Systems zusammen.

## Kundenbereich

- Registrierung und Login
- Neue Reparaturanfrage erfassen
- Status der eigenen Aufträge einsehen
- Rückfragen beantworten
- Frühere Anfragen und Historien abrufen

## Teambereich

- Offene Anfragen prüfen und annehmen
- Interne Rückfragen stellen
- Status manuell oder automatisch anpassen
- Arbeitsschritte und Ersatzteile dokumentieren
- Queue und Durchlaufzeiten überwachen

## Statussystem

Die Status sind bewusst offen gehalten, damit das Team später eigene Bezeichnungen ergänzen kann. Geplant sind unter anderem:

- Auf dem Weg
- Im Lager
- In Reparatur
- Wartet auf Ersatzteile
- Im Warenausgang
- Auf dem Weg zu dir

Zusätzlich sollen pro Anfrage eigene Textbausteine möglich sein, damit der Status nicht nur technisch, sondern auch für den Kunden verständlich beschrieben werden kann.

## Statistik und Gerätehistorie

Jede Reparaturanfrage erzeugt später einen Datensatz für das jeweilige Gerät. So können Auswertungen entstehen wie:

- Wie oft ein Modell repariert wurde
- Welche Defekte am häufigsten vorkommen
- Wie viel Wert im Vergleich zum Neukauf gespart wurde
- Welche Reparaturschritte besonders viel Zeit brauchen

## Technik

Die Anwendung basiert auf Nuxt, Vue, Pinia und Prisma. Das Projekt ist für einen modernen, modularen Ausbau gedacht, damit spätere Features wie Chat, E-Mail-Automatisierung und statistische Graphen sauber ergänzt werden können.
