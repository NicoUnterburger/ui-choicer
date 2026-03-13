# ui-choicer

Ein interaktives Vergleichsportal für Ubiquiti UniFi und UISP Produkte mit 139 Produkten in 7 Kategorien.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **7 Produktkategorien**: Gateways, Switches, Access Points, Richtfunk, Cameras, NVR, UNAS
- **139 Produkte** mit detaillierten Spezifikationen
- **Strahlungsdiagramme** für Access Points und Richtfunk-Antennen
- **Merkliste** (Warenkorb) mit Mengensteuerung und Gesamtpreisberechnung
- **Erweiterte Filter**: Preis, Features, Reichweite, Frequenz, IP-Schutzklasse, etc.
- **Deutsche Preise** mit Geizhals-Links
- **Responsive Design** (Desktop, Tablet, Mobile)
- **Dark Theme** (Gray-900 Farbschema)

## Produktkategorien

| Kategorie | Produkte | Highlights |
|-----------|----------|------------|
| **Gateways** | 12 | IPS Throughput, Multi-WAN, UniFi Apps |
| **Switches** | 41 | PoE/PoE+/PoE++, L2/L3, 1G/2.5G/10G/25G |
| **Access Points** | 27 | Wi-Fi 5/6/6E/7, Strahlungsdiagramme, EIRP |
| **Richtfunk** | 22 | 5/24/60 GHz, Strahlungsdiagramme, bis 100 km |
| **Cameras** | 26 | 4K/8K, AI, LPR, PTZ |
| **NVR** | 5 | RAID, AI Processing, bis 200 Kameras |
| **UNAS** | 6 | NVMe Cache, 10G/25G, ZFS |

## Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.4
- **CI/CD**: GitHub Actions → GitHub Pages

## Projektstruktur

```
ui-choicer/
├── .github/
│   └── workflows/
│       └── build.yml        # CI/CD Pipeline
├── src/
│   ├── App.jsx              # Hauptkomponente (~3900 Zeilen)
│   ├── main.jsx             # React Entry Point
│   └── index.css            # Tailwind + Custom Styles
├── public/
│   └── favicon.svg
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## CI/CD

GitHub Actions (`.github/workflows/build.yml`):

- **Build**: Automatischer Build bei Push/PR auf `main`/`master`
- **GitHub Pages**: Automatisches Deployment

### GitHub Pages aktivieren

1. Repository Settings → Pages
2. Source: "GitHub Actions"
3. Push zu `main` Branch

## Disclaimer

Dieses Projekt ist nicht offiziell mit Ubiquiti Inc. verbunden. Alle Produktnamen und Logos sind Eigentum ihrer jeweiligen Inhaber.
