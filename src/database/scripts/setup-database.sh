#!/bin/bash
# ============================================
# Master Database Setup Script
# ============================================
# Wrapper for database setup
# ============================================

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DB_SETUP="$SCRIPT_DIR/../database/setup.sh"

if [ -f "$DB_SETUP" ]; then
    bash "$DB_SETUP"
else
    echo "Error: Database setup script not found at $DB_SETUP"
    exit 1
fi

