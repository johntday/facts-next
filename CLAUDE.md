# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production bundle 
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture Overview

This is a Next.js 15 fact-checking application that displays claim verification data from social media posts. The app uses the App Router pattern with TypeScript and modern React patterns.

### Key Components Structure
- **Main Layout**: App uses dark theme by default via next-themes ThemeProvider
- **Dynamic Routes**: `/facts/[id]` displays detailed claim verification for specific posts
- **Data Fetching**: Server-side data fetching via `fetchData()` utility that calls external Facts API
- **UI Framework**: Built with Radix UI components and Tailwind CSS for styling

### Core Data Flow
1. Claims are fetched from external API (`https://facts-api.johntday.workers.dev/api/facts/{id}`)
2. Data follows `ClaimVerificationData` type structure defined in `src/lib/types.ts`
3. Each claim contains evidence, factuality scores, and metadata from X/Twitter
4. UI displays factuality percentages, evidence analysis, and original source text

### Key Files
- `src/lib/types.ts` - Core TypeScript interfaces for claim verification data
- `src/lib/utils.ts` - Utilities for data fetching, date formatting, and factuality calculations
- `src/components/ClaimDetail.tsx` - Main component for displaying claim verification reports
- `src/app/facts/[id]/page.tsx` - Dynamic route for individual claim pages

### Environment Variables
- `FACTS_API_KEY` - Required for fetching data from the Facts API

### Styling Approach
- Uses Tailwind CSS with custom dark/light theme support
- Factuality scores have color-coded badges (red <70%, yellow 70-90%, green >90%)
- Responsive design with mobile-first approach