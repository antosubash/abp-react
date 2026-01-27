# Fix remaining relative UI imports
$files = Get-ChildItem -Path . -Recurse -Include "*.tsx","*.ts" | Where-Object { $_.FullName -notlike "*node_modules*" }

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace relative UI imports
    $content = $content -replace "from '\.\.?/ui/", "from '@/shared/components/ui/"
    $content = $content -replace 'from "\.\.?/ui/', "from '@/shared/components/ui/"
    
    # Only write back if content changed
    $originalContent = Get-Content -Path $file.FullName -Raw
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated: $($file.FullName)" -ForegroundColor Green
    }
}

Write-Host "Relative UI import fixes complete!" -ForegroundColor Cyan