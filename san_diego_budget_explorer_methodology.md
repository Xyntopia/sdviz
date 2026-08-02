# San Diego Budget Explorer — methodology

## Architecture

The data is stored in one normalized, multi-year JSON document:

- `years.FY2027.nodes`: stable node records
- `breakdowns`: named child-reference collections such as funds, departments, programs, expense categories, and projects
- `flowViews`: special multi-column Sankey views
- `fundingPools`: shared revenue pools linking source and use node IDs without
  asserting that a particular source pays for a particular department
- `reconciliation`: differences between exact adopted totals and the latest detailed draft tables

This is intentionally a normalized hierarchy/DAG rather than a deeply duplicated tree. A CIP department can therefore be linked from both the citywide CIP branch and the related operating department without duplicating project data.

## Accuracy levels

- `adoptedExact`: exact enacted value from O-22116
- `reconciledFinal`: arithmetic reconstruction from exact final totals
- `draftDetail`: detailed Volume II or III value published before enactment
- `derivedClassification`: transparent convenience grouping, not an official City category

No draft program or project allocations were proportionally scaled to force them to match final adopted totals. Doing so would create false precision.

General Fund revenues are likewise treated as a shared pool. The explorer can
show all sources alongside a selected department, or one source alongside all
departments, but the links do not claim a source-to-department allocation.

Personnel-cost drill-downs for Police, Fire-Rescue, Parks & Recreation,
Transportation, and City Attorney group the official salary and wage lines into
base wages, overtime, other additional pay, and budgeted savings. Base wages and
the grouped totals are transparent derived classifications. The Police fringe
benefit drill-down additionally retains the exact published line items.

Fire-Rescue expense categories combine the Fire-Rescue and Office of Emergency
Services General Fund tables because those operations merged for FY2027. Parks
program rows include a transparent reconciliation item for the difference
between the published department total and its individually listed rows.

The two large operating funds that previously ended at the named-fund level,
Water Utility Operating and Engineering & Capital Projects, now expose their
published operating expense and revenue categories. Water CIP spending remains
in the separate CIP hierarchy to avoid mixing operating and capital views.

After changing the JSON, refresh the standalone copy embedded in the HTML with:

```bash
node scripts/sync-embedded-data.mjs
```

## Main FY2027 reconciliations

- Total adopted appropriations: $6,486,936,146
- General Fund adopted: $2,256,647,832
- CIP adopted: $858,083,119
- CIP draft project detail: $821,746,323
- CIP final-minus-draft detail: $36,336,796

## Updating for another year

Add a sibling object under `years` with its own `rootId`, `nodes`, and `flowViews`. The HTML automatically populates its fiscal-year selector from that object. It can also load a compatible JSON file directly in the browser.
