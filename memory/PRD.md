# Valentine's Day Website for HABY - PRD

## Original Problem Statement
Create an immersive, elegant, magical and emotional Valentine's Day romantic website for HABY. Features include password-protected entry, cinematic transitions, parallax effects, typewriter animation, custom heart cursor, runaway NO button, shooting stars, heart confetti explosion, and background music player.

## Architecture
- **Frontend**: React + Framer Motion + Canvas Confetti
- **Backend**: FastAPI (minimal, health check only)
- **Database**: MongoDB (not used for this project)
- **Styling**: Tailwind CSS + Custom CSS with CSS variables

## User Personas
- Primary: The sender (romantic partner)
- Target: HABY (the recipient of the romantic experience)

## Core Requirements
- Password gate: "batoulou"
- French language throughout
- Valentine color palette: burgundy, gold, pink, white
- Fonts: Playfair Display, Great Vibes, Montserrat, Courier Prime
- Music: MP3 upload with localStorage persistence

## What's Been Implemented (Feb 2026)
- [x] Password gate with dark romantic theme + particles
- [x] Wrong password error with shake animation
- [x] Cinematic transition (gold radial burst)
- [x] Particle canvas with floating hearts + gold dots
- [x] Custom heart cursor with sparkle trail
- [x] Typewriter text animation (3 sections)
- [x] Parallax decorative elements
- [x] Valentine proposal ("Veux-tu être ma Valentine ce soir?")
- [x] YES button with glow + scale hover
- [x] NO button that runs away and fades
- [x] Shooting stars on click
- [x] Heart confetti explosion (canvas-confetti)
- [x] Final declaration with "Haby" in gold + love message
- [x] Falling hearts overlay
- [x] Music player (toggle + MP3 upload)
- [x] Scroll indicator

## Prioritized Backlog
- P0: None (all core features implemented)
- P1: User can customize messages through a settings panel
- P1: Photo gallery section with slideshow
- P2: Additional parallax sections with memories
- P2: Countdown timer to Valentine's Day
- P2: Mobile-optimized gesture interactions

## Next Tasks
- User to provide custom MP3 file
- User to finalize love declaration text
- Potential: Add photo memories section
