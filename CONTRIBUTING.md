# Contributing to UniFi Network Portal

Vielen Dank für dein Interesse an diesem Projekt! 🎉

## 🐛 Bugs melden

1. **Prüfe zuerst**, ob der Bug bereits als Issue gemeldet wurde
2. Erstelle ein neues Issue mit:
   - Klare Beschreibung des Problems
   - Schritte zur Reproduktion
   - Erwartetes vs. tatsächliches Verhalten
   - Browser/OS Version
   - Screenshots wenn möglich

## 💡 Feature Requests

1. Erstelle ein Issue mit dem Label `enhancement`
2. Beschreibe das Feature und den Use Case
3. Warte auf Feedback bevor du mit der Implementierung beginnst

## 🔧 Pull Requests

### Setup

```bash
# Fork und Clone
git clone https://github.com/YOUR_USERNAME/unifi-network-portal.git
cd unifi-network-portal

# Dependencies installieren
npm install

# Dev Server starten
npm run dev
```

### Workflow

1. **Fork** das Repository
2. Erstelle einen **Feature Branch**: `git checkout -b feature/mein-feature`
3. **Committe** deine Änderungen: `git commit -m 'Add: Mein neues Feature'`
4. **Push** zum Branch: `git push origin feature/mein-feature`
5. Erstelle einen **Pull Request**

### Commit Messages

Verwende klare Commit Messages:

- `Add: Neues Feature XY`
- `Fix: Bug in Filterlogik`
- `Update: Preise für Switch-Lineup`
- `Docs: README aktualisiert`
- `Refactor: Code-Cleanup in App.jsx`

### Code Style

- **Einrückung**: 2 Spaces
- **Strings**: Single Quotes
- **Komponenten**: Functional Components mit Hooks
- **Styling**: Tailwind CSS Utility Classes

### Produktdaten aktualisieren

Die Daten befinden sich in `src/App.jsx`:

```javascript
const apData = {
  'U7-Pro': {
    name: 'U7 Pro',
    sku: 'U7-Pro',
    // ...
  }
};
```

Bitte mit Quellenangabe (UI Store, Datenblatt-Link).

## 📋 Checkliste für PRs

- [ ] Code funktioniert lokal (`npm run dev`)
- [ ] Build erfolgreich (`npm run build`)
- [ ] Keine Console Errors
- [ ] Responsive getestet (Mobile + Desktop)
- [ ] Commit Messages sind aussagekräftig
- [ ] README/Docs aktualisiert (falls nötig)

## 🙏 Danke!

Jeder Beitrag macht das Projekt besser. Danke für deine Zeit!
