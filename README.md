# UTP — Unified Test Platform clickable prototype

A static, clickable prototype of the UTP screens (17 pages). Plain HTML, CSS and one small JavaScript runtime (`runtime.js`); no build step and no server code. All data shown is sample data.

## Pages

| Page | File |
| --- | --- |
| Dashboard | index.html |
| Requirements and traceability | requirements.html |
| Test case editor | test-case.html |
| Test Data Management | test-data.html |
| Script editor | scripts.html |
| AI Studio | ai-studio.html |
| Recorder | recorder.html |
| Object Repository | object-repository.html |
| Framework Hub (import and export) | framework-hub.html |
| API Testing workspace | api-testing.html |
| API run results | api-results.html |
| Postman import and export | postman-import-export.html |
| Run launcher | new-run.html |
| Run results | results.html |
| Device lab | devices.html |
| Report builder | report-builder.html |
| Integrations and settings | integrations.html |

## Publish on GitHub Pages

1. Create a repository on GitHub (Pages on a private repository needs a paid GitHub plan).
2. Upload **the contents of this folder** to the repository root, including the hidden `.nojekyll` file. With the web UI: **Add file → Upload files**, then drag the files in. With Git:
   ```bash
   git init && git add . && git commit -m "UTP prototype"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
3. Open **Settings → Pages**. Under **Build and deployment** choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute or two the site is live at `https://<user>.github.io/<repo>/`.

All links are relative, so the site works from a project sub-path. Anyone with the link can view a public Pages site.

## Run locally

From this folder run `python3 -m http.server 8080` and open http://localhost:8080.

## What works

Sidebar navigation between all pages; tabs and toggles on the run launcher, recorder, Object Repository, Framework Hub (Overview, Import, Export, Profiles, History), Test Data (data sets, environment switch, usage snippets, variables, generators, pools), report builder, API workspace, API results and Postman import/export. Buttons that would call a backend (Send, Run, Save, Import, Export) are visual only, and nothing is saved between visits.
