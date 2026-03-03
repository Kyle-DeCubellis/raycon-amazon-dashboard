# Raycon Amazon Review Dashboard

Internal product review and ratings dashboard for Raycon's Amazon product portfolio.

## Data Source

All data is sourced from the `[Raycon] Amazon Weekly Tracker Total Review` Google Sheet, last synced March 2, 2026. Data is currently hardcoded in `src/data.js` - update this file to refresh.

## Products Tracked

| SKU | Product | Amazon Rating | BSR |
|-----|---------|--------------|-----|
| O15 | Essential Open Earbuds | 4.1 | #3 |
| B42 | Bone Conduction HP | 4.2 | #8 |
| O25 | Open Earbuds | 4.2 | #24 |
| E25 | Everyday Earbuds Classic | 4.3 | #40 |
| H20 | Everyday Headphones | 4.5 | #48 |
| E45 | Fitness Earbuds | 4.1 | #103 |
| H10 | Bone Conduction HP Pro | 4.6 | #209 |
| E75 | Gaming Earbuds | -- | #481 |
| E95 | Pro Earbuds | 4.0 | #789 |

## Pages

1. **Scorecard** - At-a-glance product health with status cards
2. **Rating Trends** - Weekly new-review weighted averages over time
3. **Review Volume** - Daily star distribution (O25 default)
4. **BSR Tracking** - Best Sellers Rank movement
5. **WoW Deltas** - Week-over-week comparison table

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Connect repo in Vercel dashboard
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`

Or use Vercel CLI:

```bash
npx vercel
```
