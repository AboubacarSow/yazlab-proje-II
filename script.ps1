$backendPath = ".\backend\src"
$frontendPath = ".\frontend\src"
$outputFile = ".\22_yazlab2_kaynakkod.txt"

# Folders to exclude
$excludedFolders = @("node_modules", "bin", "obj", "dist", ".angular", ".git")

if (Test-Path $outputFile) {
    Clear-Content $outputFile
}

function Append-Files($path, $extensions) {
    Get-ChildItem -Path $path -Recurse -File |
    Where-Object {
        $extensions -contains $_.Extension -and
        ($excludedFolders | Where-Object { $_ -in $_.FullName }) -eq $null
    } |
    ForEach-Object {
        Add-Content $outputFile "==============================="
        Add-Content $outputFile "FILE: $($_.FullName)"
        Add-Content $outputFile "==============================="
        Get-Content $_.FullName | Add-Content $outputFile
        Add-Content $outputFile "`n"
        Write-Host "✅ file $($_.FullName) added `n "
    }
}

# Backend
Append-Files $backendPath @(".cs")
Write-Host "✅ Backend generated successfully"
# Frontend
Append-Files $frontendPath @(".ts", ".css", ".html")

Write-Host "✅ submission.txt generated (node_modules excluded) successfully"
