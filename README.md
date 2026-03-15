# ui-choicer

Interaktives Vergleichsportal für Ubiquiti UniFi und UISP Produkte — 142 Produkte in 8 Kategorien.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **8 Produktkategorien**: Gateways, Switches, Access Points, Richtfunk, Cameras, Access, NVR, UNAS
- **142 Produkte** mit detaillierten Spezifikationen und Vergleichstabellen
- **SVG Strahlungsdiagramme** für Access Points (Elevation + Azimuth) und Richtfunk-Antennen
- **Merkliste** mit Mengensteuerung, Gesamtpreisberechnung und Gruppen nach Kategorie
- **EN/DE Sprachumschaltung** mit Flaggen-Toggle, localStorage-Persistenz
- **Erweiterte Filter**: Preis, Features, Reichweite, Frequenz, IP-Schutzklasse u.v.m.
- **Geizhals-Links** für aktuelle Preisvergleiche
- **Responsive Design** (Desktop, Tablet, Mobile) · **Dark Theme**

## Produktkategorien

| Kategorie | Produkte | Highlights |
| --- | --- | --- |
| **Gateways** | 12 | IPS Throughput, Multi-WAN, UniFi Apps |
| **Switches** | 41 | PoE/PoE+/PoE++, L2/L3, 1G/2.5G/10G/25G |
| **Access Points** | 27 | Wi-Fi 5/6/6E/7, Strahlungsdiagramme, BLE |
| **Richtfunk** | 22 | 5/24/60 GHz, Strahlungsdiagramme, bis 100 km |
| **Cameras** | 23 | 4K/8K, AI, LPR, PTZ, Audio |
| **Access** | 8 | Türklingeln, Intercoms, Reader (NFC/PIN/Face ID) |
| **NVR** | 4 | RAID, bis 210 Streams, 16 Bays |
| **UNAS** | 5 | NVMe Cache, 10G/25G, iSCSI |

## Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.4

## Projektstruktur

```text
ui-choicer/
├── src/
│   ├── App.jsx              # Hauptkomponente (~3000 Zeilen)
│   ├── main.jsx             # React Entry Point
│   ├── index.css            # Tailwind + Custom Styles
│   └── data/                # Produktdaten (ausgelagert)
│       ├── apData.js
│       ├── switchData.js
│       ├── cameraData.js
│       ├── gatewayData.js
│       ├── accessData.js
│       ├── nvrData.js
│       ├── nasData.js
│       ├── bridgeData.js
│       └── categories.js
├── public/
│   ├── favicon.svg
│   └── CNAME                # Custom Domain: ui-choicer.de
├── .github/workflows/
│   └── build.yml
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Disclaimer

Dieses Projekt ist nicht offiziell mit Ubiquiti Inc. verbunden. Alle Produktnamen und Logos sind Eigentum ihrer jeweiligen Inhaber. Preisangaben sind ungefähre UVP-Werte ohne Gewähr.
