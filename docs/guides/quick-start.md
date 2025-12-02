# 🚀 Quick Start - WorkConnect Dashboard

## Development Server

### Using npm (Recommended)
```bash
npm run dev
```

This will:
- Start Vite dev server on port 3001
- Open http://localhost:3001/login.html automatically
- Enable hot module replacement (HMR)
- Watch for file changes

### Alternative: Node.js Server
```bash
npm run serve
# or
node server.js 3001
```

## Access the Application

Once the server is running:

1. **Login Page**: http://localhost:3001/login.html
   - Use any email/password (demo mode)
   - Example: `admin@test.com` / `password`

2. **Main Dashboard**: http://localhost:3001/index.html
   - Automatically redirects after login
   - 7 tabs available for navigation

## Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Start Node.js server

## Features to Test

✅ **Login System** - Any credentials work
✅ **Tab Navigation** - 7 different sections
✅ **Stock Management** - Full CRUD operations
✅ **User Configurations** - Profile & preferences
✅ **Logistics** - Warehouses, orders, shipments
✅ **Golden Theme** - Glassmorphic dark design
✅ **Responsive** - Works on all screen sizes

## Troubleshooting

**Port already in use?**
- Change port in `app/dashboard/vite.config.js`
- Or use: `npm run serve` (uses Node.js server)

**Styles not loading?**
- Check browser console (F12)
- Verify CSS files in `app/dashboard/css/`
- Clear cache (Ctrl+F5)

**Module errors?**
- Run `npm install` again
- Check Node.js version (v16+ recommended)

---

**Happy Testing! 🎉**








