# Glassify Theme

- Glassify is a fluid, glass-like Spicetify theme for Spotify, designed to give your music player a modern, translucent interface with smooth visuals and fully customizable elements. Experience Spotify like never before with an elegant, immersive design.

---

## 🖥️ Preview

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem">
  <img src="./assets/images/base.png" style="width: 48%; border-radius: 8px;">
  <img src="./assets/images/base-2.png" style="width: 48%; border-radius: 8px;">
</div>

<details>
  <summary>Lazy note</summary>
  Sorry, am lazy to add more previews. Try out the theme.
</details>

---

## ✅ Compatibility

- **Recommended Spicetify**: `v2.40.11` or later
- **Recommended Spotify**: `v1.2.63` or later

## 📦 Older Versions

If you want previous releases, you can find them here:
[Older Releases](https://sanooj.is-a.dev/spicetify-glassify/versions/)

> Each release contains full theme files.

---

## 💬 Community & Support

- 🗨️ [Discord (Lucid Theme Server)](https://discord.gg/PWEyKduwJh) – _I’m lazy to create a separate Spicetify server_
- 🐛 [GitHub Issues](https://github.com/sanoojes/Spicetify-Glassify/issues)

---

## 📥 Installation

### 🔸 Spicetify Marketplace (Recommended)

1. [Install Marketplace](https://github.com/spicetify/marketplace/wiki/Installation)
2. Search **"Glassify"** and click **Install**

---

### 🔹 Script Installation

#### Windows (PowerShell)

**Install latest version:**

```powershell
iex "& { $(iwr -useb 'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Glassify/scripts/install.ps1') }"
```

**Install latest version (Local):**

```powershell
iex "& { $(iwr -useb 'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Glassify/scripts/install.ps1') } -- --mode Local"
```

**Install specific version (Local):**

```powershell
iex "& { $(iwr -useb 'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Glassify/scripts/install.ps1') } -- --version v1.2.3 --mode Local"
```

**Notes:**

- `--version <tag>` — Set the theme version. Default is `latest`.
- `--mode <Remote|Local>` — Choose between downloading Remote or Local files. Default is `Remote`.
- Requires PowerShell 5.1 or higher and Spicetify installed.

---

#### Linux/macOS (Bash)

**Install latest version:**

```bash
curl -fsSL https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Glassify/scripts/install.sh | sh
```

**Install latest version in Locally:**

```bash
curl -fsSL https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Glassify/scripts/install.sh | sh -s -- --mode Local
```

**Install specific version (Local mode):**

```bash
curl -fsSL https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Glassify/scripts/install.sh | sh -s -- --version v1.2.3 --mode Local
```

**Notes:**

- `--version <tag>` — Set the theme version. Default is `latest`.
- `--mode <Remote|Local>` — Choose between downloading Remote or Local files. Default is `Remote`.

---

### 🔸 Manual Installation

1. [Download ZIP](https://github.com/sanoojes/Spicetify-Glassify)

   - For older releases, go to [Releases](https://github.com/sanoojes/Spicetify-Glassify/releases)

2. Find your Spicetify themes folder:

```bash
spicetify path userdata
```

3. Create a `Glassify` folder inside `Themes`
4. Extract contents of `/src` (or `/releases/<tag>` for a specific version) into `Glassify`
5. Apply the theme:

```bash
spicetify config current_theme Glassify
spicetify config color_scheme dark
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify apply
```

---

## ❌ Uninstallation

### Windows (PowerShell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Glassify@latest/scripts/uninstall.ps1') }"
```

### Linux/macOS (Bash)

```bash
curl -fsSL https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Glassify/scripts/uninstall.sh | sh
```

---

## 📄 License

[MIT License](LICENSE)
