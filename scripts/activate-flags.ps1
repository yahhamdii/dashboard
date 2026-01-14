# Script PowerShell pour activer/désactiver les feature flags Circuit UI
# Usage: .\scripts\activate-flags.ps1 -Phase 2

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("1", "2", "3", "4", "5", "6", "7", "8", "reset", "all")]
    [string]$Phase
)

$envFile = ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "Fichier .env introuvable!" -ForegroundColor Red
    exit 1
}

function Update-Flag {
    param(
        [string]$FlagName,
        [bool]$Enable
    )
    
    $value = if ($Enable) { "true" } else { "false" }
    $pattern = "NEXT_PUBLIC_$FlagName"
    
    $content = Get-Content $envFile
    $updated = $false
    $newContent = @()
    
    foreach ($line in $content) {
        if ($line -match "^#?\s*$pattern=(true|false)") {
            $updated = $true
            $newContent += "$pattern=$value"
        } elseif ($line -match "^#?\s*$pattern=") {
            $updated = $true
            $newContent += "$pattern=$value"
        } else {
            $newContent += $line
        }
    }
    
    if (-not $updated) {
        $newContent += "$pattern=$value"
    }
    
    Set-Content -Path $envFile -Value $newContent
    Write-Host "  OK $pattern = $value" -ForegroundColor Green
}

function Reset-AllFlags {
    Write-Host "Reinitialisation de tous les flags..." -ForegroundColor Yellow
    
    Update-Flag "USE_CIRCUIT_LAYOUTS" $false
    Update-Flag "USE_CIRCUIT_LAYOUTS_DASHBOARD" $false
    Update-Flag "USE_CIRCUIT_LAYOUTS_ACCOUNT" $false
    Update-Flag "USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT" $false
    Update-Flag "USE_CIRCUIT_LAYOUTS_FILE_MANAGER" $false
    Update-Flag "USE_CIRCUIT_LAYOUTS_ERROR_PAGES" $false
    
    Update-Flag "USE_CIRCUIT_DASHBOARD" $false
    Update-Flag "USE_CIRCUIT_ACCOUNT" $false
    Update-Flag "USE_CIRCUIT_USER_MANAGEMENT" $false
    Update-Flag "USE_CIRCUIT_FILE_MANAGER" $false
    
    Update-Flag "USE_CIRCUIT_TYPOGRAPHY" $true
    Update-Flag "USE_CIRCUIT_BUTTONS" $true
    Update-Flag "USE_CIRCUIT_FORMS" $true
    
    Write-Host "Tous les flags ont ete reinitialises!" -ForegroundColor Green
}

function Activate-Phase {
    param([int]$PhaseNumber)
    
    Write-Host "Activation de la Phase $PhaseNumber..." -ForegroundColor Cyan
    
    switch ($PhaseNumber) {
        1 {
            Write-Host "Phase 1 : Composants de Base (deja actives)" -ForegroundColor Yellow
        }
        2 {
            Write-Host "Phase 2 : Pages d'Erreur" -ForegroundColor Yellow
            Update-Flag "USE_CIRCUIT_ERROR_PAGES" $true
            Update-Flag "USE_CIRCUIT_LAYOUTS_ERROR_PAGES" $true
        }
        3 {
            Write-Host "Phase 3 : Account Settings" -ForegroundColor Yellow
            Update-Flag "USE_CIRCUIT_ACCOUNT" $true
            Update-Flag "USE_CIRCUIT_LAYOUTS_ACCOUNT" $true
        }
        4 {
            Write-Host "Phase 4 : Dashboard Overview" -ForegroundColor Yellow
            Update-Flag "USE_CIRCUIT_DASHBOARD" $true
            Update-Flag "USE_CIRCUIT_LAYOUTS_DASHBOARD" $true
        }
        5 {
            Write-Host "Phase 5 : File Manager" -ForegroundColor Yellow
            Update-Flag "USE_CIRCUIT_FILE_MANAGER" $true
            Update-Flag "USE_CIRCUIT_LAYOUTS_FILE_MANAGER" $true
        }
        6 {
            Write-Host "Phase 6 : User Management" -ForegroundColor Yellow
            Update-Flag "USE_CIRCUIT_USER_MANAGEMENT" $true
            Update-Flag "USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT" $true
        }
        7 {
            Write-Host "Phase 7 : Composants Avances" -ForegroundColor Yellow
            Update-Flag "USE_CIRCUIT_CARDS" $true
            Update-Flag "USE_CIRCUIT_TABLES" $true
            Update-Flag "USE_CIRCUIT_DIALOGS" $true
            Update-Flag "USE_CIRCUIT_NAVIGATION" $true
        }
        8 {
            Write-Host "Phase 8 : Activation Globale" -ForegroundColor Yellow
            Update-Flag "USE_CIRCUIT_LAYOUTS_DASHBOARD" $false
            Update-Flag "USE_CIRCUIT_LAYOUTS_ACCOUNT" $false
            Update-Flag "USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT" $false
            Update-Flag "USE_CIRCUIT_LAYOUTS_FILE_MANAGER" $false
            Update-Flag "USE_CIRCUIT_LAYOUTS_ERROR_PAGES" $false
            Update-Flag "USE_CIRCUIT_LAYOUTS" $true
        }
    }
    
    Write-Host "Phase $PhaseNumber activee!" -ForegroundColor Green
    Write-Host "N'oubliez pas de redemarrer le serveur (npm run dev)" -ForegroundColor Yellow
}

if ($Phase -eq "reset") {
    Reset-AllFlags
} elseif ($Phase -eq "all") {
    Write-Host "Activation de toutes les phases..." -ForegroundColor Cyan
    for ($i = 2; $i -le 8; $i++) {
        Activate-Phase $i
    }
} else {
    Activate-Phase ([int]$Phase)
}

Write-Host ""
Write-Host "Etat actuel des flags:" -ForegroundColor Cyan
Get-Content $envFile | Select-String -Pattern "NEXT_PUBLIC_USE_CIRCUIT" | ForEach-Object {
    if ($_.Line -match "true") {
        Write-Host "  OK $($_.Line)" -ForegroundColor Green
    } elseif ($_.Line -match "false") {
        Write-Host "  NO $($_.Line)" -ForegroundColor Red
    } else {
        Write-Host "  -- $($_.Line)" -ForegroundColor Yellow
    }
}
