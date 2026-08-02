# San Diego Budget Explorer — methodology

## Architecture

The data is stored in one normalized, multi-year JSON document:

- `years.FY2027.nodes`: stable node records
- `breakdowns`: named child-reference collections such as funds, departments, programs, expense categories, and projects
- `flowViews`: special multi-column Sankey views
- `reconciliation`: differences between exact adopted totals and the latest detailed draft tables

This is intentionally a normalized hierarchy/DAG rather than a deeply duplicated tree. A CIP department can therefore be linked from both the citywide CIP branch and the related operating department without duplicating project data.

## Accuracy levels

- `adoptedExact`: exact enacted value from O-22116
- `reconciledFinal`: arithmetic reconstruction from exact final totals
- `draftDetail`: detailed Volume II or III value published before enactment
- `derivedClassification`: transparent convenience grouping, not an official City category

No draft program or project allocations were proportionally scaled to force them to match final adopted totals. Doing so would create false precision.

## Main FY2027 reconciliations

- Total adopted appropriations: $6,486,936,146
- General Fund adopted: $2,256,647,832
- CIP adopted: $858,083,119
- CIP draft project detail: $821,746,323
- CIP final-minus-draft detail: $36,336,796

## Updating for another year

Add a sibling object under `years` with its own `rootId`, `nodes`, and `flowViews`. The HTML automatically populates its fiscal-year selector from that object. It can also load a compatible JSON file directly in the browser.
