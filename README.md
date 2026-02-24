# Les Diables Rouges

**A Manchester United Fan Dashboard & Data Visualization App**

[![Live Demo](https://img.shields.io/badge/demo-live-red.svg)](https://les-diables-rouges.vercel.app/)
[![Next.js](https://img.shields.io/badge/Framework-Next.js-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-blue)](https://tailwindcss.com/)

## Project Overview

**Les Diables Rouges** (The Red Devils) is a dedicated dashboard for Manchester United fans. A couple of years ago I thought of an app that I can view any stats that has to do with my club Manchester United and of course it wasn't unique someone else had already built something like that already so I check his github to see what he did and I tried to replicate and improve on what he did.
I used a couple of free apis together since I couldn't afford the premium versions. There's a dashboard page that shows the next match the previous match played, the starting 11 of the previous match and also the next match when it's about to be played, a squad carousel, a small part of the premier league table where we are positioned, a pie chart that shows our wins loss and draws. There's also a page that shows the premier league table. A page that shows the all the squad players and thier jersey numbers. A page that shows the starting 11 of the previous fixture or shows the starting 11 of the next fixture that's about to be played. A page that shows all the premier league matches that we've played and it also shows the matches we've yet to played.

### Pages:

- **Dashboard:** Shows the next match, previous match, pie chart of our win/loss/draw, starting 11, squad carousel, premier league table.

- **Matches:** Shows premier league matches we've played and haven't played.

- **Table:** Show the premier league table.

- **Starting 11:** Show the starting 11 of the previous match or the match that's about to be played.

- **Squad:** Show the team and thier respective jersey numbers.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL)
- **State Management:** React Query / Context API
- **Deployment:** Vercel

---

## What I Learnt

- **Supabase & Postgesql:** Gained experience connecting a Next.js frontend to a **Supabase** backend. Because I had to use supabase I had to learn postgresql so that I can create tables, rls rules.

- **Complex Data Fetching with Edge functions:** I learned how to combine data fetching from different endpoints but I quickly ran into the problem of using up my daily limit of the api points. So I did this behind supabase in an edge function that would be called by a cron job. when this funciton gets called it populates the tables that I created in supabase, I then fetch that data instead from the api points directly but from supabase.

- **Design:** This project made really understand how to use grid and a special grid called the Bento Grid to make my dashboard more appealing. I got the design inspiration from dashboard ui designs I found online and customized it to my taste. The colors are gotten from various parts of the mancheter united jesey we are wearing in the season.

---
