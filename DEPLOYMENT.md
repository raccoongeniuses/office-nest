# Deployment Guide for Office Nest (VPS)

This guide will help you deploy the application to your office VPS using PM2 and SQLite.

## Prerequisites on VPS

1.  **Node.js & NPM**: Ensure Node.js (v18 or v20+) is installed.
    ```bash
    node -v
    npm -v
    ```
2.  **PM2**: Install the process manager globally.
    ```bash
    npm install -g pm2
    ```

## Step 1: Transfer Code

**Option A: Git (Recommended)**

1.  SSH into your VPS.
2.  Clone your repository (or pull latest changes).
    ```bash
    git clone <your-repo-url> office-nest
    cd office-nest
    ```

**Option B: Manual Copy**

1.  Zip your project folder (excluding `node_modules`, `dist`, `.git`).
2.  Upload to the VPS using `scp` or FileZilla.
3.  Unzip in your desired folder.

## Step 2: Install Dependencies & Build

Run the following commands inside the project folder on the VPS:

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Build the application (NestJS + Tailwind)
npm run build
```

## Step 3: Configuration (.env)

Create a `.env` file in the project root:

```bash
nano .env
```

Paste the following configuration (update values as needed):

```env
NODE_ENV=production
PORT=150
DATABASE_URL="file:./dev.db"
JWT_SECRET="CHANGE_THIS_TO_A_LONG_RANDOM_STRING"
```

_Note: We use port 150 as requested. Ensure you have permission to bind to this port (ports < 1024 usually require root/sudo)._

## Step 4: Database Setup

Initialize the SQLite database on the server:

```bash
# Run migrations to create tables
npx prisma migrate deploy
```

## Step 5: Start Application

Use PM2 to start and manage the application.

```bash
# Start using the ecosystem config
pm2 start ecosystem.config.js

# Save the process list so it respawns on reboot
pm2 save
pm2 startup
```

## Maintenance Commands

- **View Logs:** `pm2 logs office-nest`
- **Restart App:** `pm2 restart office-nest`
- **Stop App:** `pm2 stop office-nest`
- **Update App:**
  1.  `git pull`
  2.  `npm install`
  3.  `npm run build`
  4.  `npx prisma migrate deploy` (if DB changed)
  5.  `pm2 restart office-nest`
