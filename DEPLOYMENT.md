# Guía de Despliegue - INFOSOFT 2025

Esta guía cubre el despliegue del sitio web de INFOSOFT 2025 en producción.

---

## 📑 Tabla de Contenidos

- [Requisitos del Servidor](#requisitos-del-servidor)
- [Variables de Entorno](#variables-de-entorno)
- [Métodos de Despliegue](#métodos-de-despliegue)
- [Configuración del Dominio](#configuración-del-dominio)
- [Nginx Configuration](#nginx-configuration)
- [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)
- [Troubleshooting](#troubleshooting)

---

## Requisitos del Servidor

### Hardware Mínimo (Producción)

- **CPU**: 2 cores
- **RAM**: 2 GB
- **Almacenamiento**: 10 GB
- **Ancho de banda**: 100 Mbps

### Software

- **Node.js**: >= 18.x LTS
- **pnpm**: >= 8.x
- **Nginx**: >= 1.18 (para reverse proxy)
- **Git**: Para deployment automatizado
- **PM2** o **systemd**: Para process management

### Sistema Operativo Recomendado

- Ubuntu 22.04 LTS
- Debian 11+
- CentOS Stream 9

---

## Variables de Entorno

### Archivo `.env`

Crear archivo `.env` en la raíz del proyecto:

```bash
# Environment
NODE_ENV=production

# Content Directory (opcional, por defecto: ./data)
CONTENT_DIR=/path/to/data

# Next.js
NEXT_TELEMETRY_DISABLED=1

# Analytics (opcional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

### Variables Importantes

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `production` |
| `CONTENT_DIR` | Directorio de archivos JSON | `./data` |
| `PORT` | Puerto del servidor (opcional) | `3000` |
| `HOSTNAME` | Hostname del servidor | `0.0.0.0` |

---

## Métodos de Despliegue

### Opción 1: Servidor Propio (Recomendado para PUCP)

#### 1. Preparar el Servidor

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar PM2 (process manager)
npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx
```

#### 2. Clonar y Configurar el Proyecto

```bash
# Crear directorio del proyecto
sudo mkdir -p /var/www/infosoft
sudo chown -R $USER:$USER /var/www/infosoft

# Clonar repositorio
cd /var/www/infosoft
git clone https://github.com/giano-montano/infosoft-2025-web.git .

# Instalar dependencias
pnpm install

# Crear archivo .env
cp .env.example .env
nano .env  # Editar según necesidades
```

#### 3. Build de Producción

```bash
# Sincronizar imágenes
pnpm sync-images

# Build de producción
pnpm build

# Verificar que .next/ se haya generado
ls -la .next/
```

#### 4. Configurar PM2

Crear archivo `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'infosoft-2025',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/infosoft',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    error_file: '/var/log/infosoft/error.log',
    out_file: '/var/log/infosoft/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
};
```

Iniciar con PM2:

```bash
# Crear directorio de logs
sudo mkdir -p /var/log/infosoft
sudo chown -R $USER:$USER /var/log/infosoft

# Iniciar aplicación
pm2 start ecosystem.config.js

# Configurar PM2 para auto-start
pm2 startup
pm2 save

# Verificar status
pm2 status
pm2 logs infosoft-2025
```

#### 5. Configurar Nginx

Crear archivo `/etc/nginx/sites-available/infosoft.conf`:

```nginx
upstream infosoft_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name infosoft.inf.pucp.edu.pe;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name infosoft.inf.pucp.edu.pe;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/infosoft.inf.pucp.edu.pe/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/infosoft.inf.pucp.edu.pe/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logging
    access_log /var/log/nginx/infosoft-access.log;
    error_log /var/log/nginx/infosoft-error.log;

    # Max upload size
    client_max_body_size 10M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Static files caching
    location /_next/static {
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://infosoft_upstream;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /content {
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://infosoft_upstream;
        add_header Cache-Control "public, max-age=86400";
    }

    # Proxy to Next.js
    location / {
        proxy_pass http://infosoft_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
```

Habilitar el sitio:

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/infosoft.conf /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

#### 6. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d infosoft.inf.pucp.edu.pe

# Verificar auto-renovación
sudo certbot renew --dry-run

# Agregar cronjob para auto-renovación
sudo crontab -e
# Agregar: 0 0,12 * * * certbot renew --quiet
```

---

### Opción 2: Vercel (Alternativa)

Vercel es la plataforma oficial de Next.js y ofrece despliegue con un solo click.

#### Pasos:

1. **Conectar repositorio a Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Importar proyecto desde GitHub
   - Configurar variables de entorno

2. **Configuración del Proyecto**

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "outputDirectory": ".next"
}
```

3. **Variables de Entorno en Vercel**
   - `NODE_ENV=production`
   - `CONTENT_DIR=/var/task/data`

4. **Configurar Dominio**
   - Agregar dominio personalizado en Vercel dashboard
   - Configurar DNS CNAME: `infosoft.inf.pucp.edu.pe` → `cname.vercel-dns.com`

**Ventajas de Vercel**:
- Deploy automático en cada push
- Edge Network global
- Analytics incluidos
- SSL automático

**Desventajas**:
- Dependencia de terceros
- Costos si se exceden los límites gratuitos

---

## Configuración del Dominio

### DNS Configuration

Para `infosoft.inf.pucp.edu.pe`:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | infosoft.inf.pucp | IP_DEL_SERVIDOR | 3600 |
| AAAA | infosoft.inf.pucp | IPv6_DEL_SERVIDOR (opcional) | 3600 |

### Verificar Propagación

```bash
# Verificar DNS
nslookup infosoft.inf.pucp.edu.pe

# Verificar con dig
dig infosoft.inf.pucp.edu.pe

# Verificar respuesta HTTP
curl -I https://infosoft.inf.pucp.edu.pe
```

---

## Nginx Configuration

### Configuración Completa con Optimizaciones

Ver sección anterior para configuración base. Optimizaciones adicionales:

#### Rate Limiting

```nginx
# En http block
limit_req_zone $binary_remote_addr zone=infosoft_limit:10m rate=10r/s;

# En server block
location / {
    limit_req zone=infosoft_limit burst=20 nodelay;
    # ... resto de config
}
```

#### Cache de Proxy

```nginx
# En http block
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=infosoft_cache:10m max_size=100m inactive=60m use_temp_path=off;

# En location
location / {
    proxy_cache infosoft_cache;
    proxy_cache_valid 200 10m;
    proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
    # ...
}
```

---

## Monitoreo y Mantenimiento

### Logs

```bash
# Logs de PM2
pm2 logs infosoft-2025

# Logs de Nginx
sudo tail -f /var/log/nginx/infosoft-access.log
sudo tail -f /var/log/nginx/infosoft-error.log

# Logs del sistema
sudo journalctl -u nginx -f
```

### Monitoreo de Performance

#### Con PM2 Plus (opcional)

```bash
pm2 link <secret_key> <public_key>
```

#### Métricas Básicas

```bash
# CPU y Memoria
pm2 monit

# Uptime
pm2 status

# Reload sin downtime
pm2 reload infosoft-2025
```

### Backups

#### Backup de Datos

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/var/backups/infosoft"
DATE=$(date +%Y%m%d_%H%M%S)

# Crear directorio de backup
mkdir -p $BACKUP_DIR

# Backup de data/
tar -czf $BACKUP_DIR/data_$DATE.tar.gz /var/www/infosoft/data

# Backup de .env
cp /var/www/infosoft/.env $BACKUP_DIR/env_$DATE

# Limpiar backups antiguos (más de 30 días)
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completado: $DATE"
```

Agregar a crontab:

```bash
0 2 * * * /var/www/infosoft/scripts/backup.sh
```

### Updates y Mantenimiento

```bash
# Pull de cambios
cd /var/www/infosoft
git pull origin main

# Instalar nuevas dependencias
pnpm install

# Rebuild
pnpm build

# Reload sin downtime
pm2 reload infosoft-2025
```

---

## Troubleshooting

### Problema: Sitio no carga

**Diagnóstico**:
```bash
# Verificar que Next.js esté corriendo
pm2 status

# Verificar logs
pm2 logs infosoft-2025 --lines 100

# Verificar puerto 3000
sudo netstat -tlnp | grep 3000
```

**Solución**:
```bash
# Reiniciar PM2
pm2 restart infosoft-2025

# Si falla, rebuild
pnpm build
pm2 restart infosoft-2025
```

### Problema: Imágenes no se muestran

**Diagnóstico**:
```bash
# Verificar que existan las imágenes
ls -la /var/www/infosoft/public/content/images/

# Verificar permisos
ls -la /var/www/infosoft/public/content/
```

**Solución**:
```bash
# Re-sincronizar imágenes
pnpm sync-images

# Verificar permisos
chmod -R 755 /var/www/infosoft/public/content/
```

### Problema: SSL Certificate Error

**Diagnóstico**:
```bash
# Verificar certificado
sudo certbot certificates
```

**Solución**:
```bash
# Renovar certificado
sudo certbot renew

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Problema: Out of Memory

**Diagnóstico**:
```bash
# Ver uso de memoria
pm2 monit
free -h
```

**Solución**:
```bash
# Ajustar max_memory_restart en ecosystem.config.js
max_memory_restart: '1G'

# Reload PM2
pm2 reload infosoft-2025
```

---

## Checklist de Despliegue

### Pre-Despliegue

- [ ] Build local exitoso (`pnpm build`)
- [ ] Tests pasando (si existen)
- [ ] Variables de entorno configuradas
- [ ] DNS configurado y propagado
- [ ] SSL certificate generado

### Despliegue

- [ ] Código actualizado (`git pull`)
- [ ] Dependencias instaladas (`pnpm install`)
- [ ] Imágenes sincronizadas (`pnpm sync-images`)
- [ ] Build de producción (`pnpm build`)
- [ ] PM2 configurado y corriendo
- [ ] Nginx configurado
- [ ] SSL funcionando

### Post-Despliegue

- [ ] Sitio accesible en HTTPS
- [ ] Todas las páginas cargan correctamente
- [ ] Imágenes se muestran
- [ ] Formularios funcionan
- [ ] Sitemap accesible (`/sitemap.xml`)
- [ ] Robots.txt accesible (`/robots.txt`)
- [ ] OG image funcionando (`/opengraph-image`)
- [ ] Logs sin errores
- [ ] Performance satisfactoria (Google PageSpeed)

---

## URLs de Producción

- **Sitio**: https://infosoft.inf.pucp.edu.pe
- **Sitemap**: https://infosoft.inf.pucp.edu.pe/sitemap.xml
- **Robots**: https://infosoft.inf.pucp.edu.pe/robots.txt
- **OG Image**: https://infosoft.inf.pucp.edu.pe/opengraph-image

---

## Contacto para Soporte

**Responsable Técnico**: Giano Montaño  
**Email**: [contacto a través del sitio]  
**LinkedIn**: https://www.linkedin.com/in/giano-monta%C3%B1o-8b1537349/

---

**Última actualización**: Diciembre 2025
