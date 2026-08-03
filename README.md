# San Diego Budget Explorer

An interactive explorer for understanding where the City of San Diego gets
money, where that money goes, and what the major budget tradeoffs actually
look like.

## Why this project exists

Public budget discussions are often passionate but short on shared facts.
When the City asks where it should save money, people understandably defend
the services and benefits they use. At the same time, many people oppose new
fees, higher taxes, paid parking, or other ways of increasing revenue.

Those preferences are individually reasonable, but they cannot all be met at
once. A balanced budget requires choices among services, staffing, capital
projects, fees, taxes, reserves, and other funding sources.

This project aims to make those choices easier to understand. It gives
residents a practical way to research the budget before arguing for a cut, a
restoration, or a new source of revenue.

## Goals

- Make the City's published budget approachable without hiding its complexity.
- Show both sides of the budget: where revenue comes from and where spending
  goes.
- Let people drill from citywide totals into funds, departments, programs,
  expense categories, salary components, and capital projects.
- Make large budgets, such as Police, Fire-Rescue, Public Utilities, Parks &
  Recreation, and Transportation, easier to inspect.
- Help residents compare the scale of a proposed saving or revenue increase
  with the full budget.
- Preserve links to official sources and distinguish enacted amounts, draft
  details, reconciled totals, and derived groupings.
- Support informed disagreement rather than advocate for a particular tax,
  fee, department, service, or political position.

## What the explorer does

The page provides interactive flow and pie-chart views of San Diego's FY2027
budget. Users can follow revenue into funds, inspect department budgets, and
continue into the most detailed published categories available in the current
dataset.

The General Fund is represented as a shared pool. Property tax, sales tax, and
other General Fund revenue sources are not presented as if they directly pay
for a specific department. Instead, the explorer shows the sources entering
the common pool and the departments drawing from it. This avoids inventing
allocations that the official budget does not make.

## Accuracy and limitations

The explorer combines final adopted totals with the latest available detailed
draft tables. The interface labels the basis of each value because final
department totals and draft program detail do not always match.

The project does not infer that a particular revenue dollar paid for a
particular service, and it does not proportionally alter published line items
to force draft details to match final totals. Reconciliations and derived
groupings are identified explicitly.

See [the methodology](san_diego_budget_explorer_methodology.md) for the data
model, accuracy levels, and known reconciliations.

## Run locally

Serve the repository from its root:

```bash
python3 -m http.server
```

Then open:

```text
http://localhost:8000/site/
```

The HTML also contains an embedded copy of the dataset so it can be opened as
a standalone file. After changing the external JSON, update that copy with:

```bash
node scripts/sync-embedded-data.mjs
```

## Project structure

- `site/index.html` — standalone interactive application
- `site/san_diego_budget_hierarchy.json` — normalized budget dataset
- `san_diego_budget_explorer_methodology.md` — methodology and reconciliation
  notes
- `scripts/sync-embedded-data.mjs` — keeps the standalone HTML data in sync

## Contributing

Contributions should remain source-backed, politically neutral, and explicit
about uncertainty. Prefer correcting the highest-level data source or parsing
rule over patching a misleading value only in the interface.

