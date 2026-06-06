# SecureVault Dashboard

A file explorer interface built for SecureVault Inc., a legal firm managing sensitive case documents across departments. This project was built as part of the AmaliTech Practical Capstone Challenge.

## Overview

The dashboard provides a VS Code-style file tree interface for navigating SecureVault's internal document structure. Files are organised by department — Legal, Finance, IT Security, and Shared Resources.

## Tech Stack

- **React** (via Vite)
- **Lucide React** for icons
- **CSS-in-JS** inline styles following a base-4 spacing system
- No UI libraries — built from scratch

## Features

- **Recursive folder tree** — folders can be nested to any depth, handled via a recursive `TreeNode` component
- **File properties panel** — clicking a file shows its name, MIME type, size, and full location path
- **Keyboard navigation** — use arrow keys to move through the tree and Enter to select a file
- **Search** — filters the tree in real time, shows "No results found" when nothing matches
- **Resizable panels** — drag the borders between panels to resize the file tree and properties panel
- **Recently Viewed** *(Wildcard Feature)* — tracks the last 5 files opened, accessible via the clock icon in the sidebar

## Wildcard Feature — Recently Viewed

The Recently Viewed panel tracks the last 5 files a user opened during their session. The motivation behind this feature is a real use case — in a large document vault, a user may open a file and later forget exactly where it was located. The Recently Viewed panel solves this by:

1. Showing the filename and its full folder path at a glance
2. Allowing the user to right-click any recent file and select **"Show in Enclosing Folder"** — this switches back to the explorer view and automatically expands the folder tree to reveal exactly where the file lives

## Design

The UI follows a dark "cyber-secure" aesthetic with a base-4 spacing system. The full design system and UI frames are available in Figma:

[View Figma Design](https://www.figma.com/design/uyWmu3hzO1LmVDGEpVy8MP/SecureVault-Dashboard?node-id=1-2&t=LgFlMjrstN3f5p2S-1)

## Running Locally

```bash
git clone https://github.com/quashiecalvin/SecureVault-Dashboard.git
cd SecureVault-Dashboard
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Live Demo

[View Deployed App](YOUR_VERCEL_LINK_HERE)