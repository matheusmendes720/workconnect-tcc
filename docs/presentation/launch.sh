#!/bin/bash
# ============================================
# WorkConnect Presentation - Quick Launcher
# ============================================
# Easy access to all tools and documentation
# ============================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

show_menu() {
    clear
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}  WorkConnect Presentation Launcher${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo "  1. Open Visual Dashboard"
    echo "  2. Run Master Check"
    echo "  3. Setup Database"
    echo "  4. Verify Database"
    echo "  5. Test Queries"
    echo "  6. Open Documentation"
    echo "  7. Open Slides"
    echo "  8. Open Next Steps Guide"
    echo "  9. Exit"
    echo ""
}

while true; do
    show_menu
    read -p "Select option (1-9): " choice
    
    case $choice in
        1)
            echo "Opening Visual Dashboard..."
            if [[ "$OSTYPE" == "darwin"* ]]; then
                open dashboard.html
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                xdg-open dashboard.html 2>/dev/null || sensible-browser dashboard.html 2>/dev/null || firefox dashboard.html
            fi
            sleep 2
            ;;
        2)
            echo "Running Master Check..."
            cd scripts
            ./master-check.sh
            cd ..
            read -p "Press Enter to continue..."
            ;;
        3)
            echo "Setting up database..."
            cd database
            ./setup.sh
            cd ..
            read -p "Press Enter to continue..."
            ;;
        4)
            echo "Verifying database..."
            cd scripts
            ./verify-db.sh
            cd ..
            read -p "Press Enter to continue..."
            ;;
        5)
            echo "Testing queries..."
            cd scripts
            ./test-queries.sh
            cd ..
            read -p "Press Enter to continue..."
            ;;
        6)
            echo "Opening documentation..."
            if [[ "$OSTYPE" == "darwin"* ]]; then
                open README.md PRESENTATION_GUIDE.md NEXT_STEPS.md
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                xdg-open README.md &
                sleep 1
                xdg-open PRESENTATION_GUIDE.md &
                sleep 1
                xdg-open NEXT_STEPS.md &
            fi
            sleep 2
            ;;
        7)
            echo "Opening slides..."
            if [[ "$OSTYPE" == "darwin"* ]]; then
                open slides/presentation.md
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                xdg-open slides/presentation.md
            fi
            ;;
        8)
            echo "Opening Next Steps Guide..."
            if [[ "$OSTYPE" == "darwin"* ]]; then
                open NEXT_STEPS.md
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                xdg-open NEXT_STEPS.md
            fi
            ;;
        9)
            echo ""
            echo "Thank you for using WorkConnect Presentation Launcher!"
            echo ""
            exit 0
            ;;
        *)
            echo "Invalid option. Please try again."
            sleep 2
            ;;
    esac
done

