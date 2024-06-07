# check if pnpm-lock.yaml exists

if (Test-Path pnpm-lock.yaml) {
    Write-Host "Removing pnpm-lock.yaml"
    Remove-Item pnpm-lock.yaml
}

# check if src folder exists

if (Test-Path src) {
    Write-Host "Removing src folder"
    Remove-Item -Recurse -Force src
}

Write-Host "Removing all node_modules,dist,.turbo,out,.next folders"

Get-ChildItem -Path . -Include node_modules,dist,.turbo,out,.next -Recurse -Force | Remove-Item -Recurse -Force

Write-Host "Installing dependencies"

pnpm install