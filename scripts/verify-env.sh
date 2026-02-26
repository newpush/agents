#!/bin/bash

echo -e "\n🚀 Starting Project NoéMI Pre-Flight Check...\n"

# Function to check dependencies
check_tool() {
    if command -v "$2" >/dev/null 2>&1; then
        echo -e "✅ $1 is installed."
        return 0
    else
        echo -e "❌ $1 is missing. Please install it."
        return 1
    fi
}

ALL_GOOD=true
check_tool "Git" "git" || ALL_GOOD=false
check_tool "Node.js" "node" || ALL_GOOD=false
check_tool "Python" "python3" || ALL_GOOD=false
check_tool "Docker" "docker" || ALL_GOOD=false
check_tool "Gemini CLI" "gemini" || ALL_GOOD=false

if [ "$ALL_GOOD" = false ]; then
    echo -e "\n⚠️ Please install the missing tools and run this script again.\n"
    exit 1
fi

echo -e "\n🔒 Checking API Keys..."
if [ -f ".env" ]; then
    echo -e "✅ .env file already exists."
else
    read -s -p "Enter your Gemini API Key (from Google AI Studio): " api_key
    echo ""
    if [ -n "$api_key" ]; then
        echo "GEMINI_API_KEY=$api_key" > .env
        echo -e "✅ API Key saved securely to .env file."
    else
        echo -e "⚠️ No key provided. You will need to create a .env file later."
    fi
fi

echo -e "\n🎉 All Systems Go! You are ready to build agents.\n"
