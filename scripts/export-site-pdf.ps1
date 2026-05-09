# Export index.html and index-ru.html to resume/*.pdf (headless Chrome).
# Run:  powershell -ExecutionPolicy Bypass -File scripts\export-site-pdf.ps1
# Args: en | ru | all (default: all)
$ErrorActionPreference = 'Stop'

$Mode = if ($args.Count -ge 1) { $args[0].ToLowerInvariant() } else { 'all' }

$Root = Resolve-Path (Join-Path $PSScriptRoot '..')
$Resume = Join-Path $Root 'resume'
New-Item -ItemType Directory -Force -Path $Resume | Out-Null

function Find-Chrome {
    if ($env:CHROME -and (Test-Path -LiteralPath $env:CHROME)) {
        return $env:CHROME
    }
    $pf86 = ${env:ProgramFiles(x86)}
    foreach ($p in @(
        (Join-Path $env:ProgramFiles 'Google\Chrome\Application\chrome.exe'),
        (Join-Path $pf86 'Google\Chrome\Application\chrome.exe'),
        (Join-Path $env:LOCALAPPDATA 'Google\Chrome\Application\chrome.exe')
    )) {
        if ($p -and (Test-Path -LiteralPath $p)) { return $p }
    }
    return $null
}

function Export-OnePage {
    param(
        [string] $HtmlRelative,
        [string] $PdfRelative
    )
    $htmlPath = Join-Path $Root $HtmlRelative
    if (-not (Test-Path -LiteralPath $htmlPath)) {
        Write-Warning "Skip (missing): $htmlPath"
        return
    }
    $pdfPath = Join-Path $Root $PdfRelative
    $resolved = Resolve-Path -LiteralPath $htmlPath
    $uri = ([Uri]::new($resolved.Path)).AbsoluteUri

    Write-Host "-> $PdfRelative <- $HtmlRelative"
    $argList = @(
        '--headless=new',
        '--disable-gpu',
        '--no-pdf-header-footer',
        "--print-to-pdf=$pdfPath",
        $uri
    )
    $proc = Start-Process -FilePath $ChromeExe -ArgumentList $argList -Wait -PassThru -WindowStyle Hidden
    if ($proc.ExitCode -ne 0) {
        Write-Warning "Chrome exited with code $($proc.ExitCode)"
    }
    if (Test-Path -LiteralPath $pdfPath) {
        $len = (Get-Item -LiteralPath $pdfPath).Length
        Write-Host ("  wrote {0:N0} KB {1}" -f ($len / 1KB), $pdfPath)
    }
}

$ChromeExe = Find-Chrome
if (-not $ChromeExe) {
    Write-Error "Chrome not found. Install Google Chrome or set env CHROME to chrome.exe full path."
}

switch ($Mode) {
    'en' { Export-OnePage 'index.html' 'resume\CV_site_en.pdf' }
    'ru' { Export-OnePage 'index-ru.html' 'resume\CV_site_ru.pdf' }
    'all' {
        Export-OnePage 'index.html' 'resume\CV_site_en.pdf'
        Export-OnePage 'index-ru.html' 'resume\CV_site_ru.pdf'
    }
    default {
        Write-Host "Usage: export-site-pdf.ps1 [ en | ru | all ]"
        exit 1
    }
}

Write-Host Done.
