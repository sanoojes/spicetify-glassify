#!/bin/sh
set -e

version="remote"
mode="remote"
mode_set=0

# Parse command-line arguments
while [ "$#" -gt 0 ]; do
    case "$1" in
        --version)
            version="$2"
            shift 2
            ;;
        --mode)
            mode="$2"
            mode_set=1
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--version v1.0.0|v1.0.1|...] [--mode remote|local]"
            exit 1
            ;;
    esac
done

# Ignore mode if a specific version is specified
if [ "$version" != "latest" ] && [ "$mode_set" -eq 1 ]; then
    echo "⚠️ Ignoring --mode because --version is specified."
    mode="remote"
fi

# Validate mode
if [ "$mode" != "remote" ] && [ "$mode" != "local" ]; then
    echo "❌ Invalid mode: $mode"
    echo "Allowed values: remote, local"
    exit 1
fi

# Set theme directories and URLs
theme_name="Glassify"
theme_dir="$(dirname "$(spicetify -c)")/Themes/${theme_name}"
mkdir -p "$theme_dir"

base_url="https://sanooj.is-a.dev/spicetify-glassify/versions"
user_css_url="$version/$base_url/user.css"
theme_js_url="$version/$base_url/theme.js"
color_ini_url="$base_url/latest/color.ini"

echo "$user_css_url"
echo "$theme_js_url"

# Function to download and check file
download_file() {
    url="$1"
    dest="$2"
    
    # Use curl with -f to fail on HTTP errors
    if ! curl -fsSL --output "$dest" "$url"; then
        echo "❌ Failed to download $url (404 or network error)"
        exit 1
    fi

    # Check if file is empty
    if [ ! -s "$dest" ]; then
        echo "❌ Downloaded file $dest is empty"
        exit 1
    fi
}

# Download theme files
echo "📥 Downloading Lucid theme ($mode mode) version '$version'..."
download_file "$color_ini_url" "${theme_dir}/color.ini"
download_file "$user_css_url" "${theme_dir}/user.css"
download_file "$theme_js_url" "${theme_dir}/theme.js"

echo "✅ Files downloaded to: $theme_dir"

# Apply theme
echo "🎨 Applying theme..."
spicetify config current_theme "$theme_name"
spicetify config color_scheme dark
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify apply

echo "✅ All done!"
