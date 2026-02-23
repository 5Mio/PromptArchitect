---
name: web-summarizer
description: Extrahiert und fasst Webseiten-Inhalte professionell zusammen. Verwenden Sie dies, wenn Benutzer eine schnelle Übersicht über Artikel, Blogposts oder Dokumentationen benötigen.
---

# Web Summarizer

## Übersicht

Diese Fähigkeit ermöglicht die effiziente Extraktion von Textinhalten aus Webseiten und deren anschließende Zusammenfassung. Sie nutzt ein Python-Skript zur Bereinigung von HTML-Daten, um sich auf den relevanten Text zu konzentrieren.

## Workflow

1. **Inhalt extrahieren**: Verwenden Sie das Skript `scripts/extract_content.py`, um den Rohtext der Webseite zu erhalten.
2. **Inhalt analysieren**: Identifizieren Sie die Hauptthemen, Schlüsselargumente und wichtige Fakten.
3. **Zusammenfassung erstellen**: Generieren Sie eine strukturierte Zusammenfassung basierend auf den unten stehenden Richtlinien.

## Zusammenfassungs-Richtlinien

Eine gute Zusammenfassung sollte folgende Struktur haben:

| Sektion | Inhalt |
| :--- | :--- |
| **Kernbotschaft** | Ein einzelner Satz, der das Hauptthema beschreibt. |
| **Wichtigste Punkte** | Eine Liste der 3-5 wichtigsten Erkenntnisse oder Argumente. |
| **Fazit/Ausblick** | Eine kurze Einschätzung der Bedeutung oder der nächsten Schritte. |

## Skript-Verwendung

Führen Sie das Extraktions-Skript wie folgt aus:

```bash
python3 scripts/extract_content.py <url>
```

## Beispiel

**Benutzeranfrage:** "Fasse diesen Artikel für mich zusammen: https://example.com/news/ai-trends"

**Vorgehensweise:**
1. Führen Sie `python3 scripts/extract_content.py https://example.com/news/ai-trends` aus.
2. Analysieren Sie den extrahierten Text.
3. Erstellen Sie die Zusammenfassung gemäß der Tabellenstruktur.
