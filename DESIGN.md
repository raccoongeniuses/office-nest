# 🎨 Design System

This document outlines the visual language and design principles for Vibe Learning. The aesthetic is a mix of **Soft Brutalism** and **High-Density Utilities**, prioritizing information density, clear structure, and a distinct "developer-tool" feel.

## 1. Core Philosophy

- **Soft Brutalism**: We use raw, structural elements like bold borders and visible grids, but soften them with a refined color palette and rounded corners (border-radius) to avoid looking too harsh. It's "brutalist" in structure, but "soft" in touch.
- **Dense & Boxy**: The UI should feel substantial and utilitarian. Elements are packed efficiently (dense) and clearly delineated by borders or backgrounds (boxy). White space is used for structure, not just for airiness.
- **Monospace First**: Monospace fonts are not just for code. We use them for headings, UI labels, and data to reinforce the technical, constructive nature of the app.

## 2. Typography

We lean heavily on Monospace fonts to create a technical, rigorous vibe.

- **Primary Font**: `font-mono` (e.g., JetBrains Mono, Fira Code, or default system-ui-mono).
- **Usage**:
    - **Headings**: Uppercase, tracked wide, often boxed.
    - **Body Text**: High legibility, standard tracking.
    - **UI Elements**: Small buttons, badges, and labels should always be monospace.

## 3. Color Palette: "Soft Colored"

Avoid neon or hyper-saturated colors. Stick to earthy, muted, or pastel tones that look good on both light and dark backgrounds.

- **Neutrals**:
    - **Light Mode**: `bg-stone-50`, `text-stone-900`, `border-stone-800`.
    - **Dark Mode**: `bg-stone-900`, `text-stone-50`, `border-stone-700`.
- **Accents (Softened)**:
    - **Action**: Muted Indigo (`text-indigo-600` / `bg-indigo-500` but desaturated).
    - **Success**: Sage Green.
    - **Warning**: Ocher / Mustard.
    - **Error**: Burnt Sienna / Muted Red.

## 4. UI Component Guide

### Containers & Cards ("Boxy")
Everything lives in a box.
- **Borders**: almost always visible. `border-1` or `border-2`.
- **Shadows**: minimal or hard-edged shadows (brutalist style) rather than soft diffusions.
- **Rounding**: `rounded-md` or `rounded-sm`. Avoid `rounded-full` for large containers.

### Spacing ("Dense")
- Use tighter padding than standard consumer apps.
- `p-2` or `p-3` is often enough for cards.
- `gap-2` instead of `gap-4` for lists.
- Information density is a feature, not a bug, for a learning/authoring tool.

### Buttons & Inputs
- **Buttons**:
    - Solid background, contrasting text.
    - Visible border.
    - Hover effects should be sharp (quick color swap or small translate).
- **Inputs**:
    - Boxy, strict borders.
    - No floating labels; keep it traditional and reliable.

## 5. Theming (Dark / Light)

- **Strategy**: Tailwind's `darkMode: 'class'`.
- **Implementation**: The app defaults to system preference but exposes a toggle in the UI.
- **Contrast**: Ensure borders remain visible in Dark Mode to maintain the "Boxy" structure. Avoid pure black (`#000`); use deep grays or browned charcoals.
