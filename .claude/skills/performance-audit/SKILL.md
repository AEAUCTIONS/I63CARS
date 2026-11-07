---
name: performance-audit
description: >-
  Audits an application against 31 performance criteria and applies only the
  fitting optimizations: audit first with a status report (applied, missing,
  needs work, not applicable), then fix in priority order, measuring before and
  after on slow devices and weak networks. Use when the user says "performance",
  "optimize", "speed up", "slow", "لتحسين الأداء", "حسّن الأداء", or when
  building or modifying any program or app.
---

# Performance Audit (31 criteria)

Applies to every program. Never apply a technique blindly. Inspect first.

## Hard rules

1. Review ALL 31 criteria below and verify what is actually implemented BEFORE any edit.
2. Inspect the code and architecture before suggesting anything.
3. Classify each criterion: **Applied**, **Missing**, **Needs improvement**, **Not applicable**.
4. Apply a technique only if it fits this app. Skip duplicates and anything that adds complexity without measurable gain.
5. Preserve all functionality, design, and behavior.
6. Measure before and after, including slow devices (CPU throttling 4x) and weak networks (Slow 3G / Fast 3G).

## Workflow (one step at a time, confirm before the next)

### Step 1: Detect the stack
Read package.json / requirements / config / folder structure. Identify frontend, backend, database, hosting, and whether any criterion is not applicable by nature (e.g. no database means skip 8, 17, 24, 25).

### Step 2: Baseline measurement
Record before-numbers: Lighthouse (mobile), LCP, INP, CLS, TTFB, bundle size, request count, slowest API/query timings. Use throttled CPU and Slow 3G. Save the numbers; they are the proof.

### Step 3: Status report (short, table)
For each of the 31: status, priority (High / Medium / Low), expected impact, one-line evidence (file or finding). Present it and wait for approval before changing code.

### Step 4: Apply by priority
Highest impact and lowest risk first. One criterion at a time, verify the app still works after each.

### Step 5: Re-measure and report
Same conditions as the baseline. Show a before/after table. State plainly if a change gave no gain, and revert it.

## The 31 criteria and what to verify

**Frontend**
1. Skeleton Loading: placeholders for async content, no layout jump.
2. WebP / AVIF: images converted, with width/height and responsive srcset.
3. Duplicate API Calls: same request fired twice; dedupe or use a query cache.
4. Debounce: search/input/resize handlers calling APIs per keystroke.
11. Unused Dependencies: run depcheck / bundle analyzer, remove dead packages.
14. Optimistic UI: instant feedback on safe mutations, rollback on failure.
15. Lazy Loading: images, below-the-fold sections, heavy components.
20. SSR / Static Generation: use only where SEO or first paint benefits.
21. Third-Party Scripts: defer/async, remove unneeded analytics and widgets.
22. Code Splitting: route-level and heavy-library dynamic imports.
23. Virtualization: long lists and tables only.
26. Unnecessary Re-renders: memo, stable props, state placement; profile before touching.
29. Font Optimization: subset, font-display: swap, preload critical, self-host.

**Network / delivery**
5. Pagination: no unbounded lists from API or DB.
6. CDN: static assets and images served from edge.
9. Brotli / Gzip: confirm response headers.
27. Browser Caching: Cache-Control and hashed filenames for static assets.
28. Load Balancing: only if multiple instances or real traffic need it.
16. Parallel Requests: independent calls via Promise.all, not sequential awaits.
12. API Timeouts: every outbound call has a timeout and sane retry.
13. AI Streaming: stream LLM output instead of waiting for the full response.

**Backend / data**
7. Background Job Queue: move slow work (email, reports, imports) off the request path.
8. N+1 Queries: batch, join, or dataloader.
10. Redis Caching: cache hot, expensive, rarely-changing reads with invalidation.
17. Database Indexes: indexes for real filters/joins/sorts; check EXPLAIN.
19. Server / Database Proximity: same region.
24. Required Columns Only: no SELECT *, no over-fetching in API responses.
25. Connection Pooling: pooled DB connections, correct pool size.

**Observability / quality**
18. OpenTelemetry: tracing for requests and queries.
30. Real User Monitoring: field data (Web Vitals) from real users.
31. Performance Testing: repeatable Lighthouse CI / load test (k6) with budgets.

## Output format

Status table columns: `#`, criterion, status, priority, expected impact, evidence.
Then the before/after table: metric, before, after, conditions.

## Never

- Add Redis, queues, CDN, SSR, or OpenTelemetry to a small app that does not need them.
- Optimize without a measured baseline.
- Change visible design or behavior.
