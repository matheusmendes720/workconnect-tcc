# 🚀 Dashboard Server Setup Guide

This guide explains how to run the dashboard on a custom port to avoid conflicts with other applications.

## 📋 Quick Start

### Option 1: Live Server (VS Code Extension) - Recommended

1. **Install Live Server extension** in VS Code:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Port is already configured** in `.vscode/settings.json`:
   - Default port: **3001**
   - To change it, edit `.vscode/settings.json` and modify `"liveServer.settings.port"`

3. **Start the server**:
   - Right-click on `app/dashboard/pages/dash.html`
   - Select "Open with Live Server"
   - Dashboard will open at `http://localhost:3001`

### Option 2: Python HTTP Server

**Windows:**
```bash
python server.py 3001
```

**Linux/Mac:**
```bash
python3 server.py 3001
```

**Custom port:**
```bash
python server.py 3002
```

### Option 3: Node.js HTTP Server

```bash
node server.js 3001
```

**Custom port:**
```bash
node server.js 3002
```

### Option 4: Vite Dev Server (npm run dev)

If you're using Vite for development:

1. **Port is configured** in `app/dashboard/vite.config.js`:
   - Default port: **3002** (changed from 5173)
   - To change it, edit `vite.config.js` and modify the `server.port` value

2. **Start the dev server:**
   ```bash
   cd app/dashboard
   npm run dev
   ```
   - Dashboard will open at `http://localhost:3002`

3. **Alternative: Change port via command line:**
   ```bash
   npm run dev -- --port 3002
   ```

### Option 5: Quick Launcher Scripts

**Windows:**
```bash
start-server.bat 3001
```

**Linux/Mac:**
```bash
chmod +x start-server.sh
./start-server.sh 3001
```

## 🔧 Changing the Port

### Method 1: VS Code Live Server

Edit `.vscode/settings.json`:
```json
{
  "liveServer.settings.port": 3002
}
```

### Method 2: Vite Configuration

Edit `app/dashboard/vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3002, // Change this value
  }
})
```

Or use command line:
```bash
npm run dev -- --port 3002
```

### Method 3: Command Line Arguments

**Python:**
```bash
python server.py 3002
```

**Node.js:**
```bash
node server.js 3002
```

**Batch/Script:**
```bash
start-server.bat 3002
./start-server.sh 3002
```

## 🌐 Default Ports

- **Vite Dev Server:** 3002 (configured in `app/dashboard/vite.config.js`)
- **Live Server (VS Code):** 3001 (configured in `.vscode/settings.json`)
- **Python Server:** 3001 (can be changed via argument)
- **Node.js Server:** 3001 (can be changed via argument)

## ⚠️ Troubleshooting

### Port Already in Use

If you see an error like "Address already in use" or "Port 3001 is already in use":

1. **Use a different port:**
   ```bash
   python server.py 3002
   # or
   node server.js 3002
   ```

2. **Find what's using the port:**
   - **Windows:**
     ```bash
     netstat -ano | findstr :3001
     ```
   - **Linux/Mac:**
     ```bash
     lsof -i :3001
     ```

3. **Kill the process** (if needed):
   - **Windows:** Use Task Manager or `taskkill /PID <pid> /F`
   - **Linux/Mac:** `kill -9 <pid>`

### Server Not Starting

1. **Check if Python/Node.js is installed:**
   ```bash
   python --version
   node --version
   ```

2. **Make sure you're in the project root directory**

3. **Check file permissions** (Linux/Mac):
   ```bash
   chmod +x server.py server.js start-server.sh
   ```

## 📁 File Structure

```
tcc/
├── .vscode/
│   └── settings.json          # Live Server configuration
├── server.py                  # Python HTTP server
├── server.js                  # Node.js HTTP server
├── start-server.bat           # Windows launcher
├── start-server.sh            # Linux/Mac launcher
└── app/
    └── dashboard/             # Dashboard files
        ├── vite.config.js     # Vite dev server configuration
        └── pages/
            └── dash.html      # Main dashboard page
```

## 🎯 Recommended Setup

For development, we recommend using **Live Server** in VS Code because:
- ✅ Auto-reload on file changes
- ✅ Easy to start/stop
- ✅ Integrated with VS Code
- ✅ No command line needed

For production or testing, use the Python/Node.js servers for more control.

## 📝 Notes

- All servers serve files from `app/dashboard/` directory
- Default page is `pages/dash.html` when accessing root URL
- CORS headers are enabled for API testing
- All servers support custom ports via command line arguments

