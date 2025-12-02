#!/usr/bin/env python3
"""
Simple HTTP Server for Dashboard
Usage: python server.py [port]
Default port: 3001
"""

import http.server
import socketserver
import sys
import os
from pathlib import Path

# Default port
PORT = 3001

# Check if port is provided as argument
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        print(f"Invalid port number: {sys.argv[1]}")
        print(f"Using default port: {PORT}")

# Change to app directory
os.chdir(Path(__file__).parent / "app" / "dashboard")

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.log_date_time_string()}] {format % args}")

try:
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print("=" * 60)
        print(f"🚀 Dashboard Server running!")
        print(f"📍 Port: {PORT}")
        print(f"🌐 URL: http://localhost:{PORT}")
        print(f"📁 Serving: {os.getcwd()}")
        print("=" * 60)
        print("Press Ctrl+C to stop the server")
        print("=" * 60)
        httpd.serve_forever()
except OSError as e:
    if "Address already in use" in str(e):
        print(f"❌ Error: Port {PORT} is already in use!")
        print(f"💡 Try a different port: python server.py 3002")
    else:
        print(f"❌ Error: {e}")
except KeyboardInterrupt:
    print("\n\n🛑 Server stopped by user")










