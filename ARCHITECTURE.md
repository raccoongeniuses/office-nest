# System Architecture

## Technical Stack

### Backend
- **Framework**: NestJS (TypeScript)
- **Runtime**: Node.js
- **Database**: SQLite (via Prisma ORM)

### Frontend
- **Architecture**: Server-Side Rendering (MVC)
- **Template Engine**: Handlebars (hbs)
- **Styling**: Tailwind CSS (Utility classes in views)

## High-Level Architecture
The application follows a traditional **Model-View-Controller (MVC)** pattern implemented within the NestJS framework.

### 1. Request Flow
1.  **Client Request**: User accesses a URL (e.g., `/leave`).
2.  **Controller**: NestJS Controller handles the request.
    -   Validates input.
    -   Calls Service layer for business logic.
3.  **Service**: Executes business logic.
    -   Interacts with Database (via Prisma) if needed.
4.  **Database**: PostgreSQL stores/retrieves data.
5.  **Response**: Controller selects a View (HBS template) and passes data to it.
6.  **Rendering**: Server renders the HBS template to HTML, injecting the data.
7.  **Client Response**: Browser receives fully rendered HTML.

## Directory Structure
```
src/
├── main.ts           # Entry point (configures NestFactory with Express & HBS)
├── app.module.ts     # Root module
├── users/            # Users Module
├── leave/            # Leave Module
│   ├── leave.controller.ts # Handles routes, returns views
│   ├── leave.service.ts    # Business logic
│   └── leave.entity.ts     # Data structure
└── views/            # Handlebars templates
    ├── index.hbs
    ├── layouts/
    │   └── main.hbs
    └── partials/
        └── header.hbs
public/               # Static assets (CSS, images)
prisma/
└── schema.prisma     # Database Schema
```

## Styling Strategy
- **Tailwind CSS** will be used for styling.
- A build process (e.g., `postcss`) will compile Tailwind classes used in `.hbs` files into a static CSS file in `public/`.
