# Recon map: Copart (web) -> motorcycle-only auction for UAE/GCC

Scope: the buyer-side core loop only: find a motorcycle lot, inspect it, pre-bid / live-bid / Buy It Now, win, pay, collect or ship. Seller console and Copart's yard operations are only sized, not mapped.
For: the user's own new business (AE Auctions), motorcycles only, UAE/GCC first.
Date: 2026-11-05

> Evidence limit: copart.com is not reachable from this session (DNS blocked), so nothing here was read from the live site. Everything comes from web-search excerpts of Copart's public help pages (regional sites) and third-party descriptions. Screens, components and the data model are therefore inferred. Confidence is marked on each row. To raise it, allow copart.com in the session network settings and re-run, or provide screenshots from the user's own account.

## Sources

| # | source | URL | notes |
| --- | --- | --- | --- |
| 1 | Bidding process (UK help) | https://support.copart.co.uk/?p=1855 | bid types, timing |
| 2 | Place Bids (help) | https://copart.com/content/us/en/support/how-to-buy/place-bids-1 | pre-bid / live bid rules |
| 3 | Ways to Bid (KB) | https://help.copart.com/22724/kb/article/120725/ways-to-bid | bid types |
| 4 | Motorcycles landing page | https://copart.com/Content/us/en/landing-page/motorcycles | 10+ images per lot, motorcycle condition report, third-party inspections |
| 5 | Searching FAQ | https://www.copart.ca/content/us/en-CA/support/faq-topics/searching | filters |
| 6 | Vehicle reports | https://www.copart.ca/content/us/en/landing-page/vehicle-reports | paid condition report |
| 7 | New lot details | https://www.copart.com/content/us/en/member-news/new-lot-details | lot page layout |
| 8 | Glossary | https://copart.com/content/us/en/landing-page/copart-glossary | terms |
| 9 | Germany motorcycles | https://www.copart.de/en/content/de/en/landing-page/motorcycles-for-sale | 15+ filters (make, damage, year...) |

## Core loop

Members search a large inventory of damaged or used vehicles, pre-bid or bid live in an online auction against other members, and pay fees on top of the winning bid before collecting the vehicle.

## Screens

| ID | screen | route / how to reach | purpose | key components | states | confidence |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | Home | / | search entry, categories, how it works | search bar, category tiles, featured lots | logged out, logged in | medium |
| S02 | Motorcycle landing | /motorcycles | niche entry (used and salvage bikes) | hero, filters shortcut, inspection promo | - | high |
| S03 | Search results | /lotSearchResults | browse and filter lots | filter panel (make, model, year, damage, location, Buy It Now, run-and-drive), sort, lot cards, pagination | empty, loading, filled | high |
| S04 | Lot detail | /lot/{id} | decide to bid | image gallery (10+), details, location, sale date, bid panel, condition report link, watchlist | upcoming, live, sold, withdrawn | high |
| S05 | Condition report | from S04 | seller Yes/No report (exterior, interior, mechanical); paid extended report | checklist, photos, video | free, paid, unavailable | medium |
| S06 | Register / sign in | modal or page | create member | email, phone, ID/licence upload | error, verifying | medium |
| S07 | Membership / deposit | account | buying power | tier selector, deposit payment | none, active | medium |
| S08 | Pre-bid | panel on S04 | set a max bid | amount input, confirm, fee estimate | outbid, leading | high |
| S09 | Live auction room | /auction/{sale} | real-time bidding | current lot, bid buttons, ticker, timer, lot queue | waiting, live, sold, reserve not met | high |
| S10 | Buy It Now | panel on S04 | instant purchase | price, fees, confirm | unavailable | high |
| S11 | My bids / Watchlist | account | track lots | tabs: watching, bidding, won, lost | empty | medium |
| S12 | Won lot / Invoice | account | pay and collect | invoice, fee breakdown, pay, pickup instructions | unpaid, paid, overdue | medium |
| S13 | Fees and calculator | /fees | total cost estimate | calculator | - | high |
| S14 | Shipping / export | account | arrange transport or export | quote, carrier, documents | - | guess |
| S15 | Notifications / messages | account | outbid, auction start, payment due | list | empty | guess |

## Flows

```
F01 Find a motorcycle
    S01 -> S02 -> S03 -> S04
    happy path clicks: 3-4
    edge: no results, filter combination empty, lot withdrawn

F02 Register and get buying power
    S06 -> S07
    edge: ID not verified, deposit failed

F03 Pre-bid on a lot
    S04 -> S08 -> confirm
    edge: auction already started, bid below minimum, outbid by live bidder
    rules (sourced): pre-bid is a max; system bids incrementally for you; live bid wins ties; pre-bid cutoff varies by region (up to 1h before, or minutes before the lot)

F04 Bid live
    S11 -> S09 -> place bid -> sold / not sold
    edge: connection drop, last-second bid, reserve not met, seller approval pending (Canada: open to seller review until 6pm next business day)

F05 Buy It Now
    S04 -> S10 -> pay
    edge: not available on every lot, licence limits, payment deadline then relist

F06 Win, pay, collect
    S12 -> pay -> pickup / S14
    edge: late payment fees, storage fees, wrong documents
```

## Components

| component | variants | states | used on |
| --- | --- | --- | --- |
| Lot card | grid, list | default, watched, live now, sold | S03, S11 |
| Filter panel | checkbox, range, search-in-filter | collapsed, applied | S03 |
| Image gallery | thumbnails, zoom | loading | S04, S05 |
| Bid panel | pre-bid, live, buy it now | disabled, leading, outbid | S04, S08, S09, S10 |
| Countdown timer | to sale, to lot | ended | S04, S09 |
| Fee breakdown | estimate, invoice | - | S08, S12, S13 |
| Status badge | run-and-drive, sold, upcoming | - | S03, S04 |
| Toast / outbid alert | success, warning | - | S09 |

## Inferred data model

```
User         id, email, phone, name, id_doc_status, membership_tier, deposit_balance, country
             evidence: S06, S07   confidence: medium
Lot          id, vin_or_chassis, make, model, year, engine_cc, odometer, damage_primary, run_and_drive, title_type,
             location_id, sale_id, sale_time, buy_it_now_price, reserve (hidden), status
             evidence: S03 filters, S04   confidence: high
LotMedia     id, lot_id, url, kind (photo|video)   evidence: S04 (10+ images)   confidence: high
ConditionReport id, lot_id, kind (seller_yes_no|paid_extended), exterior, interior, mechanical, media
             evidence: S05 help pages   confidence: medium
Sale         id, yard_id, starts_at, status   evidence: S09   confidence: medium
Bid          id, lot_id, user_id, amount, type (pre|live), created_at, is_winning
             evidence: F03, F04 help pages   confidence: high
Invoice      id, lot_id, user_id, hammer_price, fees_json, total, due_at, status   evidence: S12, S13   confidence: medium
Watch        user_id, lot_id   evidence: S11   confidence: medium
Yard         id, name, address, city, country   evidence: S04 location   confidence: medium
Shipment     id, invoice_id, carrier, status   confidence: guess
```

Relationships: Yard 1-n Sale, Sale 1-n Lot, Lot 1-n Bid, Lot 1-n LotMedia, Lot 1-1 ConditionReport, User 1-n Bid, Lot 1-1 Invoice (when sold), User n-n Lot via Watch.

## Feature matrix

See `features.csv`. Must: 20, should: 7, could: 4, skip: 3 (34 rows; the parity tool scores 19 must-haves because "Arabic and English with RTL" is our addition, not Copart's).

## Out of scope (cannot or should not be cloned)

- Copart's inventory, sellers (insurers), photos, VIN data and brand: the network and content are theirs.
- Their logo, copy, colours, app code: rebrand required (see /replica-brand).
- Vehicle history reports from third-party providers: licensed.
- Licences and legal requirements: a vehicle auction operator needs the right trade/auction licence in each GCC country, plus rules for salvage titles, export and customs. Get legal advice before taking real bids or money.
- Yard operations (receiving, storing, releasing bikes) are physical, not software.

## Size

Screens 15, flows 6, entities 10. Hard parts: real-time live auction (bid ordering, timers, reconnects), proxy/pre-bid engine with ties and increments, payments and deposits (local gateways, AED), identity verification, media at scale. Size: L (a quarter) for a real launch; M for a clickable single-yard MVP with pre-bid and Buy It Now first and live auction after.

## Motorcycle-only adaptations (not seen at Copart, our additions)

- Fields cars lack: engine cc, bike type (sport, cruiser, off-road), frame/chassis no., ABS, aftermarket parts, keys count.
- Gulf specifics: AED/SAR currency, Arabic and English (RTL), export paperwork, GCC specs vs non-GCC.
- Pre-sale inspection as a first-class feature (the motorcycle page promotes inspections).
