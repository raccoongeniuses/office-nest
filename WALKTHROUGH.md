# 🚀 Office Nest - Walkthrough

This guide will help you set up and run the **Office Nest** application locally.

## 📋 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

## 🛠️ Installation

1.  **Install Dependencies**
    Run the following command in the root directory to install all necessary packages:
    ```bash
    npm install
    ```

## 🗄️ Database Setup

Office Nest uses **SQLite**, so you don't need to install any external database server. The database file will be created locally.

1.  **Run Migrations**
    Initialize the database and apply the schema:

    ```bash
    npx prisma migrate dev --name init
    ```

    This command will create a `dev.db` file in the `prisma` directory.

2.  **View/Manage Database (Optional)**
    To inspect tables or manually edit data, you can use Prisma Studio:
    ```bash
    npx prisma studio
    ```
    This will open a web interface at `http://localhost:5555`.

## 🏃 Running the Application

This project is a **Monolithic Application** (Backend + SSR Views), which means **there is only ONE port**.

1.  **Start Development Server**

    ```bash
    npm run start:dev
    ```

    This command starts the NestJS server.

    > **Note on Architecture:**
    > Unlike a "Headless" setup (where React runs on port 3000 and Node runs on 3001), this app serves **BOTH** the Backend API and the Frontend HTML from the **same port** (3001).
    >
    > - **Frontend**: Served via Handlebars templates at `http://localhost:3001/`
    > - **Backend API**: Accessible at the same domain (e.g., `http://localhost:3001/attendance/check-in`)

2.  **Access the App**
    Open your browser and navigate to:
    👉 **http://localhost:3001**

    (The port is defined in `src/main.ts` line 37: `await app.listen(process.env.PORT ?? 3001);`)

## 🧩 Project Structure

- **Backend**: Built with **NestJS** (`src/`).
- **Frontend/Views**: Server-Side Rendered using **Handlebars** (`src/views/`).
- **Styling**: **Tailwind CSS** (`src/styles.css` compiles to `src/public/css/styles.css`).
- **Database**: **SQLite** managed by **Prisma** (`prisma/schema.prisma`).

## ✅ Troubleshooting

- **Port in use?**
  If port `3001` is busy, you can change it in `src/main.ts` or set a `PORT` environment variable.
- **CSS not updating?**
  Ensure `npm run start:dev` is running, as it includes the Tailwind watcher.
