Write-Host "🚀 Starting Project NoéMI Pre-Flight Check..." -ForegroundColor Cyan

# Function to check dependencies
function Check-Tool ($name, $command) {
    if (Get-Command $command -ErrorAction SilentlyContinue) {
        Write-Host "✅ $name is installed." -ForegroundColor Green
        return $true
    } else {
        Write-Host "❌ $name is missing. Please install it." -ForegroundColor Red
        return $false
    }
}

$allGood = $true
if (-not (Check-Tool "Git" "git")) { $allGood = $false }
if (-not (Check-Tool "Node.js" "node")) { $allGood = $false }
if (-not (Check-Tool "Python" "python")) { $allGood = $false }
if (-not (Check-Tool "Docker" "docker")) { $allGood = $false }
if (-not (Check-Tool "Gemini CLI" "gemini")) { $allGood = $false }

if (-not $allGood) {
    Write-Host "`n⚠️ Please install the missing tools and run this script again." -ForegroundColor Yellow
    exit
}

Write-Host "`n🔒 Checking API Keys..." -ForegroundColor Cyan
if (Test-Path ".env") {
    Write-Host "✅ .env file already exists." -ForegroundColor Green
} else {
    $apiKey = Read-Host "Enter your Gemini API Key (from Google AI Studio)"
    if ($apiKey) {
        Set-Content -Path ".env" -Value "GEMINI_API_KEY=$apiKey"
        Write-Host "✅ API Key saved securely to .env file." -ForegroundColor Green
    } else {
        Write-Host "⚠️ No key provided. You will need to create a .env file later." -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 All Systems Go! You are ready to build agents." -ForegroundColor Green
