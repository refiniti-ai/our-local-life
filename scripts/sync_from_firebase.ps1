# Mirror live Firebase Hosting into this project (matches our-local-life.web.app)
Set-Location $PSScriptRoot\..

if (Test-Path "_firebase-live-sync") {
    Remove-Item "_firebase-live-sync" -Recurse -Force
}

python scripts/pull_firebase_hosting.py
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

robocopy "_firebase-live-sync" "." /E /IS /IT /NFL /NDL /NJH /NJS | Out-Null
Write-Host "Synced live Firebase files into project root."
Write-Host "Run: firebase serve --only hosting"
Write-Host "Open: http://localhost:5000"
