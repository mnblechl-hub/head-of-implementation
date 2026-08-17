# Enterprise Implementation Operating Model

A focused case study created by Megan Blechl for a Head of Implementation role.

The site shows how a complex health-system implementation function can:

- qualify technical risk before commitments are made;
- move deployments through evidence-based stage gates;
- translate blockers into executive decisions;
- manage scarce implementation and engineering capacity;
- protect Product and Engineering from avoidable custom work;
- create clear ownership from pre-sales through stable handover.

All customer names, people, dates, and deployment data are fictional. The site demonstrates an operating approach; it does not present fictional results as personal achievements.

## Site structure

The page has four main sections:

1. **Operating model** — seven controlled gates from confirmed scope to accepted handover.
2. **Worked case study** — a missing SAML owner becomes a time-bound executive decision.
3. **Leadership judgment** — a capacity trade-off and a build-versus-configure decision.
4. **Role fit** — the implementation capabilities demonstrated by the work.

There are only two interactive ideas to understand:

- open and close the executive steering brief;
- select a capacity option to reveal its consequence.

## Files

- `index.html` contains the content and page structure.
- `styles.css` contains all layout and visual styling.
- `script.js` contains the two interactions.

There is no framework, build step, package installation, browser storage, or application state.

## Run locally

From PowerShell or Command Prompt in this folder, run:

```bat
.\serve-local.cmd
```

The site opens at `http://localhost:8080/`. Press `Ctrl+C` in PowerShell to stop it.

To use a different port or avoid opening the browser automatically:

```bat
.\serve-local.cmd -Port 3000 -NoBrowser
```

You can also open `index.html` directly. Internet access is used only for the two Google Fonts.

## Suggested review flow

In a short interview walkthrough:

1. State the three leadership principles in the opening section.
2. Explain why evidence is required to pass each implementation gate.
3. Walk through the Daisy Health risk from signal to executive decision.
4. Choose the recommended capacity response and explain the trade-off.
5. Close with the capabilities the operating model demonstrates.
