# UniFi Network Portal

Ein interaktives Vergleichsportal für Ubiquiti UniFi und UISP Produkte mit über 145 Produkten in 7 Kategorien.

![UniFi Network Portal](https://img.shields.io/badge/Products-145+-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

- **7 Produktkategorien**: Access Points, Switches, Gateways, Cameras, NVR, UNAS, Richtfunk
- **145+ Produkte** mit detaillierten Spezifikationen
- **Strahlungsdiagramme** für Access Points und Richtfunk-Antennen
- **Erweiterte Filter**: Preis, Features, Reichweite, Frequenz, etc.
- **Deutsche Preise** mit Geizhals-Links
- **Responsive Design** (Desktop, Tablet, Mobile)
- **Dark Theme** (Gray-900 Farbschema)

## 📦 Produktkategorien

| Kategorie | Produkte | Highlights |
|-----------|----------|------------|
| **Access Points** | 24 | Wi-Fi 5/6/6E/7, Strahlungsdiagramme, EIRP |
| **Switches** | 42 | PoE/PoE+/PoE++, L2/L3, Aggregation |
| **Gateways** | 12 | IPS Throughput, Multi-WAN, UniFi Apps |
| **Cameras** | 26 | 4K/8K, AI, LPR, PTZ |
| **NVR** | 5 | RAID, AI Processing, bis 200 Kameras |
| **UNAS** | 6 | NVMe Cache, 10G/25G, ZFS |
| **Richtfunk** | 20 | 5/24/60 GHz, Strahlungsdiagramme, bis 100 km |

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.4
- **Deployment**: Docker + Nginx / Apache
- **Build Size**: ~150 KB (gzip)

## 📋 Quick Start

### Option 1: Docker (empfohlen)

```bash
# Repository klonen
git clone https://github.com/your-username/unifi-network-portal.git
cd unifi-network-portal

# Container starten
docker compose up -d

# Öffne http://localhost:8080
```

### Option 2: Node.js Development

```bash
# Repository klonen
git clone https://github.com/your-username/unifi-network-portal.git
cd unifi-network-portal

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Öffne http://localhost:5173
```

### Option 3: Statischer Build

```bash
# Build erstellen
npm run build

# dist/ Ordner auf Webserver kopieren
```

## 🐳 Docker Deployment

### Docker Compose

```yaml
version: '3.8'
services:
  unifi-portal:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
docker compose up -d
```

### Standalone Docker

```bash
# Image bauen
docker build -t unifi-network-portal .

# Container starten
docker run -d -p 8080:80 --name unifi-portal unifi-network-portal
```

### GitHub Container Registry

```bash
# Image direkt von GHCR ziehen (nach erstem Push)
docker pull ghcr.io/your-username/unifi-network-portal:latest
docker run -d -p 8080:80 ghcr.io/your-username/unifi-network-portal:latest
```

### Mit Traefik (HTTPS)

Siehe auskommentierte Konfiguration in `docker-compose.yml` für automatische Let's Encrypt Zertifikate.

## 🌐 Apache Deployment

Siehe [DEPLOYMENT.md](DEPLOYMENT.md) für detaillierte Apache-Anleitung.

```bash
# Build erstellen
npm run build

# Auf Server kopieren
rsync -avz --delete dist/ user@server:/var/www/unifi-portal/
```

## 📁 Projektstruktur

```
unifi-network-portal/
├── .github/
│   └── workflows/
│       └── build.yml        # CI/CD Pipeline
├── src/
│   ├── App.jsx              # Hauptkomponente (~3700 Zeilen)
│   ├── main.jsx             # React Entry Point
│   └── index.css            # Tailwind + Custom Styles
├── public/
│   └── favicon.svg          # UniFi-Style Favicon
├── docker-compose.yml       # Docker Compose Config
├── Dockerfile               # Multi-Stage Build
├── nginx.conf               # Nginx Config für SPA
├── vite.config.js           # Vite Konfiguration
├── tailwind.config.js       # Tailwind Konfiguration
├── package.json
├── DEPLOYMENT.md            # Ausführliche Deployment-Anleitung
├── CONTRIBUTING.md          # Contribution Guidelines
├── LICENSE                  # MIT License
└── README.md
```

## 🔄 CI/CD

Das Repository enthält eine GitHub Actions Workflow (`.github/workflows/build.yml`):

- **Build**: Automatischer Build bei Push/PR
- **GitHub Pages**: Automatisches Deployment auf GitHub Pages
- **Docker**: Automatischer Push zu GitHub Container Registry (ghcr.io)

### GitHub Pages aktivieren

1. Repository Settings → Pages
2. Source: "GitHub Actions"
3. Push zu `main` Branch

### Container Registry

Nach dem ersten Push ist das Image verfügbar unter:
```
ghcr.io/your-username/unifi-network-portal:latest
```

## 🎨 Screenshots

### Access Points mit Strahlungsdiagrammen
- Elevation & Azimuth Patterns
- Gain-Werte pro Band (2.4/5/6 GHz)
- Beamwidth-Visualisierung

### Richtfunk mit Beam-Charakteristiken
- Pencil Beam (≤5°) für 60 GHz
- Dish Beam (6-15°) für PowerBeams
- Sector Beam (>20°) für NanoStations

### Vergleichstabellen
- Sortierbare Spalten
- Inline Geizhals-Links
- Datasheet-Links

## 🔧 Konfiguration

### Port ändern (Docker)

```yaml
# docker-compose.yml
ports:
  - "3000:80"  # Statt 8080
```

### Base URL ändern (Subdirectory)

```javascript
// vite.config.js
export default defineConfig({
  base: '/unifi/',  // Für /unifi/ Subdirectory
  // ...
})
```

## 📊 Datenquellen

- Preise: ~MSRP in EUR (Stand: 2024/2025)
- Spezifikationen: Ubiquiti Datasheets
- Strahlungsdiagramme: Basierend auf Beamwidth-Angaben

## 🤝 Contributing

Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Details.

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/neue-funktion`)
3. Änderungen committen (`git commit -m 'Neue Funktion hinzugefügt'`)
4. Branch pushen (`git push origin feature/neue-funktion`)
5. Pull Request erstellen

### Produkte hinzufügen

Produkte werden in `src/App.jsx` in den jeweiligen Data-Objekten definiert:

```javascript
const apData = {
  'U7-Pro': {
    name: 'U7 Pro',
    sku: 'U7-Pro',
    category: 'flagship',
    msrp: 189,
    // ... weitere Eigenschaften
  }
};
```

## 📝 Changelog

### v1.0.0
- Initial Release
- 145 Produkte in 7 Kategorien
- Strahlungsdiagramme für APs und Richtfunk
- Docker Support
- Deutsche Preise + Geizhals-Links
- GitHub Actions CI/CD

## 📄 License

MIT License - siehe [LICENSE](LICENSE) Datei.

## 🙏 Credits

- **Ubiquiti** für die großartigen Produkte
- **React** & **Vite** für das Frontend-Tooling
- **Tailwind CSS** für das Styling
- **Geizhals** für Preisvergleiche

---

**Disclaimer**: Dieses Projekt ist nicht offiziell mit Ubiquiti Inc. verbunden. Alle Produktnamen und Logos sind Eigentum ihrer jeweiligen Inhaber.
