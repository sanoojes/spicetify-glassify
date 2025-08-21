param(
    [string]$version = "latest",
    [string]$mode = "Remote"
)

$ErrorActionPreference = 'Stop'
$mode_set = $false

# Parse command-line arguments
for ($i = 0; $i -lt $args.Count; $i++) {
    switch ($args[$i]) {
        '--version' {
            $version = $args[$i + 1]
            $i++
        }
        '--mode' {
            $mode = $args[$i + 1]
            $mode_set = $true
            $i++
        }
        default {
            Write-Host "Unknown option: $($args[$i])" -ForegroundColor Red
            Write-Host "Usage: script.ps1 [--version v1.0.0|v1.0.1|...] [--mode Remote|Local]"
            exit 1
        }
    }
}

# Ignore mode if a specific version is specified
if ($version -ne "latest" -and $mode_set) {
    Write-Host "⚠️  Ignoring --mode because --version is specified."
    $mode = "Remote"
}

if ($mode -ne "Remote" -and $mode -ne "Local") {
    Write-Host "❌ Invalid mode: $mode" -ForegroundColor Red
    Write-Host "Allowed values: Remote, Local"
    exit 1
}

# Check Spicetify
if (-not (Get-Command spicetify -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Spicetify is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

$themeName = "Glassify"
$themeDir = Join-Path (Split-Path (spicetify -c)) "Themes\$themeName"
New-Item -Path $themeDir -ItemType Directory -Force | Out-Null

$baseUrl = "https://sanooj.is-a.dev/spicetify-glassify/versions/$version"

if ($mode -eq "Remote") {
    $userCssUrl = "$baseUrl/remote/user.css"
    $themeJsUrl = "$baseUrl/remote/theme.js"
} else {
    $userCssUrl = "$baseUrl/$version/user.css"
    $themeJsUrl = "$baseUrl/$version/theme.js"
}

$colorIniUrl = "$baseUrl/$version/color.ini"

Write-Host "📥 Downloading Glassify theme ($mode mode) version '$version'..."

Invoke-WebRequest -Uri $colorIniUrl -OutFile (Join-Path $themeDir "color.ini") -UseBasicParsing
Invoke-WebRequest -Uri $userCssUrl -OutFile (Join-Path $themeDir "user.css") -UseBasicParsing
Invoke-WebRequest -Uri $themeJsUrl -OutFile (Join-Path $themeDir "theme.js") -UseBasicParsing

Write-Host "🎨 Applying theme..."
spicetify config current_theme $themeName
spicetify config color_scheme 'dark'
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify apply

Write-Host "✅ All done!"
