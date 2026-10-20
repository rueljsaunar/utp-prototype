# UTP — Unified Test Platform clickable prototype

A static, clickable prototype of the UTP screens (16 pages). No build step and no server code: plain HTML, CSS and one small JavaScript runtime (`runtime.js`). Data shown is sample data only.

## Pages

| Page | File |
| --- | --- |
| Dashboard | index.html |
| Requirements and traceability | requirements.html |
| Test case editor | test-case.html |
| Script editor | scripts.html |
| AI Studio | ai-studio.html |
| Recorder | recorder.html |
| Object Repository | object-repository.html |
| Framework export | framework-export.html |
| API Testing workspace | api-testing.html |
| API run results | api-results.html |
| Postman import and export | postman-import-export.html |
| Run launcher | new-run.html |
| Run results | results.html |
| Device lab | devices.html |
| Report builder | report-builder.html |
| Integrations and settings | integrations.html |

## Deploy to Netlify

1. Sign in at app.netlify.com and open **Sites**.
2. Drag this unzipped folder onto the "Deploy manually" drop area.
3. Netlify gives you a URL like `https://<name>.netlify.app`. Rename it under **Site configuration**.
4. Optional: add password protection under **Site configuration → Access control** (paid plans), or use Netlify Identity.

## Deploy to GitHub Pages

1. Create a repository (private repositories need a paid GitHub plan for Pages).
2. Upload all files in this folder to the repository root, including the hidden `.nojekyll` file.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. The site appears at `https://<user>.github.io/<repository>/` within a minute or two.

## Run locally

Open a terminal in this folder and run `python3 -m http.server 8080`, then visit http://localhost:8080. Opening `index.html` directly from disk also works in most browsers.

## What works

Sidebar navigation between all pages, tabs and toggles (run launcher platform and target, recorder modes and output language, Object Repository element selection, framework export target and destination, report builder chart type and fields, API request tabs, API result field toggles, Postman import/export tabs). Buttons that would call a backend (Send, Run, Save, Import) are visual only.
