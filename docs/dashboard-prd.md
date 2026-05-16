# MetaMax Dashboard PRD v0.6

## Locked Layout (from user wireframe)

**Header (full width)**
- Left: MetaMax Logo
- Center: Project Name
- Right: Global ETA progress bar + time

**Left Column (full height)**
- Files & Artifacts (project tree)

**Center Area**
- Stage Cards Row (4 cards: IDEATION, DESIGN, TECH-PLAN, DEVELOPMENT) directly below header, between left and right columns
- Entry Prompt directly below Stage Cards
- Activity Pane below Prompt

**Right Column (full height)**
- Top: PAUSE, FINISH, LOOP buttons (stacked, height ~ stage cards)
- Below: Log Stream / Stage Completion

**Bottom**: Sticky Action Bar

## Design System
See mdesign.md for colors, typography, etc.

## Stage Artifact System (New)

Every stage follows a standardized 6-file structure stored in `docs/metamax-stages/`:

1. `01-stage-requirements.md` — Stage definition, sequence, agent roles, guardrails
2. `02-project-requirements.md` — Project-specific goals, constraints, success criteria
3. `03-work-status.md` — Current status (kept short and scannable)
4. `04-process-improvements.md` — Recommendations to improve the stage process
5. `05-final-results.md` — Deliverables (converted to .docx for stakeholders)
6. `06-work-items.md` — Agent pick list with signing when complete

This structure ensures consistency, agent-friendliness, and clean handoffs between stages.

## Features
- Multi-agent support in Activity Pane
- 3 Activity views (Artistic, Cards, Logs)
- Sentiment Survey at stage end
- Standardized stage artifacts for every project
- Gulf Oil racing-inspired color palette (cyan #00AEEF + orange #FF6B00) used as reference only (no logos)