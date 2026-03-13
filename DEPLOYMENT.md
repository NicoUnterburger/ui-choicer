# UniFi Network Portal - Deployment Anleitung

## Übersicht

Diese Anleitung beschreibt, wie du das UniFi Network Portal auf einem Apache-Webserver veröffentlichst.

---

## Voraussetzungen

- **Node.js** (v18 oder höher) - [nodejs.org](https://nodejs.org/)
- **npm** (kommt mit Node.js)
- **Apache2** mit aktiviertem `mod_rewrite`
- **SSH-Zugang** zum Server (oder lokaler Zugang)

### Node.js installieren (falls nicht vorhanden)

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Oder mit nvm (empfohlen)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Version prüfen
node --version  # sollte v18+ sein
npm --version   # sollte v9+ sein
```

---

## Schritt 1: Projekt auf deinen Rechner kopieren

1. **Lade den `unifi-portal-vite` Ordner herunter** (aus Claude)

2. **Oder kopiere die Dateien manuell:**
   ```
   unifi-portal-vite/
   ├── package.json
   ├── vite.config.js
   ├── tailwind.config.js
   ├── postcss.config.js
   ├── index.html
   ├── public/
   │   └── favicon.svg
   └── src/
       ├── main.jsx
       ├── index.css
       └── App.jsx          ← Die Haupt-Komponente
   ```

---

## Schritt 2: Dependencies installieren & Build erstellen

```bash
# In das Projektverzeichnis wechseln
cd unifi-portal-vite

# Dependencies installieren
npm install

# Entwicklungsserver starten (zum Testen)
npm run dev
# → Öffne http://localhost:5173 im Browser

# Produktions-Build erstellen
npm run build
```

Nach dem Build existiert ein `dist/` Ordner mit:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js    (~150 KB gzip)
│   └── index-[hash].css   (~10 KB gzip)
└── favicon.svg
```

---

## Schritt 3: Auf Apache deployen

### Option A: Direkt ins DocumentRoot kopieren

```bash
# Build-Dateien auf den Server kopieren
scp -r dist/* user@server:/var/www/html/unifi-portal/

# Oder mit rsync (empfohlen)
rsync -avz --delete dist/ user@server:/var/www/html/unifi-portal/
```

### Option B: Als Virtual Host einrichten

1. **Verzeichnis erstellen:**
   ```bash
   sudo mkdir -p /var/www/unifi-portal
   sudo chown -R www-data:www-data /var/www/unifi-portal
   ```

2. **Build-Dateien kopieren:**
   ```bash
   sudo cp -r dist/* /var/www/unifi-portal/
   ```

3. **Apache Virtual Host erstellen:**
   ```bash
   sudo nano /etc/apache2/sites-available/unifi-portal.conf
   ```

   Inhalt:
   ```apache
   <VirtualHost *:80>
       ServerName unifi.example.com
       # Oder für Subdirectory: ServerAlias www.example.com
       
       DocumentRoot /var/www/unifi-portal
       
       <Directory /var/www/unifi-portal>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
           
           # Für SPA-Routing (falls später benötigt)
           FallbackResource /index.html
       </Directory>
       
       # Caching für Assets
       <LocationMatch "^/assets/">
           ExpiresActive On
           ExpiresDefault "access plus 1 year"
           Header set Cache-Control "public, immutable"
       </LocationMatch>
       
       # Kompression aktivieren
       <IfModule mod_deflate.c>
           AddOutputFilterByType DEFLATE text/html text/css application/javascript
       </IfModule>
       
       ErrorLog ${APACHE_LOG_DIR}/unifi-portal-error.log
       CustomLog ${APACHE_LOG_DIR}/unifi-portal-access.log combined
   </VirtualHost>
   ```

4. **Aktivieren:**
   ```bash
   # Notwendige Module aktivieren
   sudo a2enmod rewrite headers expires deflate
   
   # Site aktivieren
   sudo a2ensite unifi-portal.conf
   
   # Apache neu laden
   sudo systemctl reload apache2
   ```

---

## Schritt 4: HTTPS einrichten (empfohlen)

Mit Let's Encrypt (kostenlos):

```bash
# Certbot installieren
sudo apt install certbot python3-certbot-apache

# Zertifikat holen & automatisch konfigurieren
sudo certbot --apache -d unifi.example.com

# Auto-Renewal testen
sudo certbot renew --dry-run
```

---

## Schritt 5: .htaccess für Subdirectory (optional)

Falls du das Portal unter `/unifi/` statt als eigene Domain betreiben willst:

1. **vite.config.js anpassen BEVOR du baust:**
   ```javascript
   export default defineConfig({
     base: '/unifi/',  // Wichtig!
     // ...
   })
   ```

2. **Neu bauen:**
   ```bash
   npm run build
   ```

3. **In Subdirectory kopieren:**
   ```bash
   sudo cp -r dist/* /var/www/html/unifi/
   ```

4. **.htaccess erstellen:**
   ```bash
   sudo nano /var/www/html/unifi/.htaccess
   ```
   
   Inhalt:
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /unifi/
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /unifi/index.html [L]
   </IfModule>
   ```

---

## Updates einspielen

Wenn du Änderungen am Code machst:

```bash
# Lokal
cd unifi-portal-vite
npm run build

# Auf Server übertragen
rsync -avz --delete dist/ user@server:/var/www/unifi-portal/

# Cache leeren (optional, Assets haben neue Hashes)
sudo systemctl reload apache2
```

---

## Troubleshooting

### Weiße Seite / 404-Fehler

```bash
# Prüfe ob Dateien existieren
ls -la /var/www/unifi-portal/

# Prüfe Apache-Logs
sudo tail -f /var/log/apache2/unifi-portal-error.log
```

### Assets laden nicht

- Prüfe `base` in vite.config.js
- Prüfe Browser-Konsole auf 404-Fehler
- Stelle sicher, dass Pfade mit `/` oder `./` beginnen

### Berechtigungsfehler

```bash
sudo chown -R www-data:www-data /var/www/unifi-portal/
sudo chmod -R 755 /var/www/unifi-portal/
```

### mod_rewrite funktioniert nicht

```bash
# Aktivieren
sudo a2enmod rewrite

# In Apache-Config prüfen: AllowOverride All (nicht None!)
sudo apache2ctl configtest
sudo systemctl restart apache2
```

---

## Zusammenfassung der Befehle

```bash
# === EINMALIG ===
# 1. Dependencies installieren
cd unifi-portal-vite
npm install

# 2. Build erstellen
npm run build

# 3. Auf Server kopieren
rsync -avz --delete dist/ user@server:/var/www/unifi-portal/

# 4. Apache konfigurieren (siehe oben)
sudo a2ensite unifi-portal.conf
sudo systemctl reload apache2

# === BEI UPDATES ===
npm run build
rsync -avz --delete dist/ user@server:/var/www/unifi-portal/
```

---

## Support

Bei Problemen:
- Apache-Logs prüfen: `/var/log/apache2/`
- Browser Developer Tools öffnen (F12) → Console & Network Tab
- Vite-Dokumentation: https://vitejs.dev/

---

## Docker Deployment

### Voraussetzungen

- **Docker** (v20.10+) - [docs.docker.com](https://docs.docker.com/get-docker/)
- **Docker Compose** (v2.0+) - meist in Docker Desktop enthalten

### Quick Start

```bash
# In das Projektverzeichnis wechseln
cd unifi-portal-vite

# Container bauen und starten
docker compose up -d

# Logs anzeigen
docker compose logs -f

# Status prüfen
docker compose ps
```

Das Portal ist dann unter **http://localhost:8080** erreichbar.

### Docker Compose Befehle

```bash
# Starten
docker compose up -d

# Stoppen
docker compose down

# Neu bauen (nach Code-Änderungen)
docker compose up -d --build

# Logs anzeigen
docker compose logs -f unifi-portal

# In Container einsteigen (Debugging)
docker compose exec unifi-portal sh

# Ressourcen-Verbrauch anzeigen
docker stats unifi-portal
```

### Port ändern

Bearbeite `docker-compose.yml`:

```yaml
ports:
  - "3000:80"   # Statt 8080:80
```

### Mit Traefik (HTTPS + Reverse Proxy)

Für automatische Let's Encrypt Zertifikate, aktiviere die auskommentierte Traefik-Konfiguration in `docker-compose.yml`:

```yaml
services:
  unifi-portal:
    # ...
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.unifi-portal.rule=Host(`unifi.example.com`)"
      - "traefik.http.routers.unifi-portal.entrypoints=websecure"
      - "traefik.http.routers.unifi-portal.tls.certresolver=letsencrypt"
    networks:
      - traefik-public

networks:
  traefik-public:
    external: true
```

### Standalone Docker (ohne Compose)

```bash
# Image bauen
docker build -t unifi-network-portal:latest .

# Container starten
docker run -d \
  --name unifi-portal \
  --restart unless-stopped \
  -p 8080:80 \
  unifi-network-portal:latest

# Container stoppen
docker stop unifi-portal
docker rm unifi-portal
```

### Als Image exportieren (für Offline-Deployment)

```bash
# Image als Datei speichern
docker save unifi-network-portal:latest | gzip > unifi-portal-image.tar.gz

# Auf anderem Server laden
docker load < unifi-portal-image.tar.gz

# Dort starten
docker run -d --name unifi-portal -p 8080:80 unifi-network-portal:latest
```

### In Portainer deployen

1. **Stack erstellen** → Name: `unifi-portal`
2. **Web Editor** → Inhalt von `docker-compose.yml` einfügen
3. **Deploy the stack** klicken

### In Proxmox LXC mit Docker

```bash
# In deinem LXC Container
apt update && apt install -y docker.io docker-compose-plugin

# Projekt klonen/kopieren
cd /opt
# (Dateien hier ablegen)

# Starten
docker compose up -d
```

### Health Check

Der Container hat einen eingebauten Health Check:

```bash
# Status prüfen
docker inspect --format='{{.State.Health.Status}}' unifi-portal

# Manuell testen
curl http://localhost:8080/health
```

### Ressourcen-Limits

In `docker-compose.yml` sind bereits Limits definiert:

```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'      # Max 50% einer CPU
      memory: 128M     # Max 128 MB RAM
    reservations:
      cpus: '0.1'      # Garantiert 10% einer CPU
      memory: 32M      # Garantiert 32 MB RAM
```

Die App ist sehr leichtgewichtig (~15 MB Image, ~10 MB RAM im Betrieb).

---

## Dateistruktur (Docker)

```
unifi-portal-vite/
├── docker-compose.yml    ← Docker Compose Konfiguration
├── Dockerfile            ← Multi-Stage Build (Node → Nginx)
├── nginx.conf            ← Nginx Konfiguration für SPA
├── .dockerignore         ← Ausgeschlossene Dateien
├── package.json
├── vite.config.js
├── src/
│   └── App.jsx
└── ...
```
