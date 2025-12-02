# MySQL Workbench - Setup Guide

## Installation and Initial Configuration

---

## Installation

### Windows

1. **Download MySQL Workbench**

   - Visit: https://dev.mysql.com/downloads/workbench/
   - Download MySQL Workbench Installer for Windows
   - Run the installer
   - Follow installation wizard
2. **Install MySQL Server (if not installed)**

   - MySQL Workbench installer includes option to install MySQL Server
   - Or download separately from: z

### macOS

1. **Using Homebrew (Recommended)**

   ```bash
   brew install --cask mysql-workbench
   ```
2. **Manual Installation**

   - Visit: https://dev.mysql.com/downloads/workbench/
   - Download macOS DMG file
   - Open DMG and drag MySQL Workbench to Applications

### Linux

1. **Ubuntu/Debian**

   ```bash
   sudo apt update
   sudo apt install mysql-workbench
   ```
2. **Fedora/RHEL**

   ```bash
   sudo dnf install mysql-workbench
   ```

---

## Initial Configuration

### First Launch

1. **Open MySQL Workbench**
2. **Create Local Connection** (if MySQL Server is local)
   - Click "+" next to "MySQL Connections"
   - Connection Name: `WorkConnect Local`
   - Hostname: `localhost` (or `127.0.0.1`)
   - Port: `3306` (default)
   - Username: `root` (or your MySQL user)
   - Password: Click "Store in Keychain" and enter password
   - Click "Test Connection"
   - Click "OK" to save

### Connection Settings

**For Remote MySQL Server:**

- Hostname: IP address or hostname
- Port: 3306 (or custom port)
- Username: MySQL username
- Password: MySQL password
- Default Schema: `workconnect_db` (optional)

---

## Creating Database Connection

### Step-by-Step

1. **Open MySQL Workbench**
2. **Click "+" in MySQL Connections panel**
3. **Fill Connection Details:**
   ```
   Connection Name: WorkConnect Database
   Hostname: localhost
   Port: 3306
   Username: root
   Password: [your password]
   Default Schema: workconnect_db
   ```
4. **Test Connection**
   - Click "Test Connection"
   - Enter password if prompted
   - Should see "Successfully made the MySQL connection"
5. **Save Connection**
   - Click "OK"

---

## Verifying Installation

### Check MySQL Workbench Version

1. Open MySQL Workbench
2. Go to: **Help** → **About MySQL Workbench**
3. Note version (should be 8.0+)

### Test Database Connection

1. Double-click your connection
2. Enter password if prompted
3. Should see SQL Editor open
4. Run test query:
   ```sql
   SELECT VERSION();
   ```

---

## Next Steps

After setup:

1. Create database (if not exists)
2. Import schema (see `mysql-workbench-erd-guide.md`)
3. Create EER model (see `mysql-workbench-erd-guide.md`)

---

## Troubleshooting

### Connection Refused

**Problem:** Cannot connect to MySQL server

**Solutions:**

- Verify MySQL Server is running
- Check hostname and port
- Verify firewall settings
- Check MySQL user permissions

### Authentication Failed

**Problem:** Wrong username/password

**Solutions:**

- Verify username and password
- Reset MySQL root password if needed
- Check user privileges

### Workbench Won't Start

**Problem:** Application crashes on launch

**Solutions:**

- Update to latest version
- Check system requirements
- Reinstall if necessary

---

## System Requirements

### Minimum Requirements

- **OS:** Windows 10+, macOS 10.14+, or Linux
- **RAM:** 4 GB
- **Disk Space:** 500 MB
- **MySQL Server:** 5.7+ or 8.0+

### Recommended

- **RAM:** 8 GB+
- **MySQL Server:** 8.0+

---

## Additional Resources

- MySQL Workbench Documentation: https://dev.mysql.com/doc/workbench/en/
- MySQL Server Documentation: https://dev.mysql.com/doc/
- Community Forums: https://forums.mysql.com/
