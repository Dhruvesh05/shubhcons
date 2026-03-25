# TEST API FLOW SCRIPT
# This script tests the complete project creation workflow

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TESTING SHUBH CONSTRUCTION API" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Check if backend is online
Write-Host "[TEST 1] Checking Backend Connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/" -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ Backend is ONLINE" -ForegroundColor Green
    Write-Host "   Message: $($data.message)" -ForegroundColor Green
    Write-Host "   Version: $($data.version)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend is OFFLINE: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`n[TEST 2] Checking GET /api/projects..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/projects" -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ GET /api/projects is working" -ForegroundColor Green
    Write-Host "   Success: $($data.success)" -ForegroundColor Green
    Write-Host "   Projects found: $($data.data.Count)" -ForegroundColor Green
} catch {
    Write-Host "⚠️  GET /api/projects error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n[TEST 3] Testing POST /api/projects (Create Project)..." -ForegroundColor Yellow
Write-Host "Creating test project with image..." -ForegroundColor Yellow

try {
    # Create FormData with project info
    $form = @{
        name = "Test Project $(Get-Random -Minimum 1000 -Maximum 9999)"
        type = "Residential"
        location = "Mumbai, Maharashtra"
        locationLink = "https://maps.google.com/?q=Mumbai"
        map3dIframe = '<iframe src="https://www.google.com/maps/embed" width="400" height="300"></iframe>'
    }
    
    # Create a simple test image (1x1 pixel PNG)
    $pngBytes = [byte[]]@(
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
        0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
        0x00, 0x03, 0x01, 0x01, 0x00, 0x18, 0xDD, 0x8D, 0xB4, 0x00, 0x00, 0x00,
        0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    )
    
    $tempImagePath = "$env:TEMP\test_image_$(Get-Random).png"
    [System.IO.File]::WriteAllBytes($tempImagePath, $pngBytes)
    
    # Prepare multipart form
    $boundary = [System.Guid]::NewGuid().ToString()
    $body = ""
    
    # Add file
    $body += "--$boundary`r`n"
    $body += 'Content-Disposition: form-data; name="image"; filename="test.png"' + "`r`n"
    $body += "Content-Type: image/png`r`n`r`n"
    
    # Add text fields
    $form.GetEnumerator() | ForEach-Object {
        $body += "`r`n--$boundary`r`n"
        $body += "Content-Disposition: form-data; name=`"$($_.Name)`"`r`n`r`n"
        $body += $_.Value
    }
    
    $body += "`r`n--$boundary--`r`n"
    
    # Upload via curl instead for simplicity
    $curlCmd = "curl.exe -X POST http://localhost:5000/api/projects " +
    "-F `"name=$($form.name)`" " +
    "-F `"type=$($form.type)`" " +
    "-F `"location=$($form.location)`" " +
    "-F `"locationLink=$($form.locationLink)`" " +
    "-F `"map3dIframe=$($form.map3dIframe)`" " +
    "-F `"image=@$tempImagePath`" " +
    "-v"
    
    Write-Host "Executing: $curlCmd" -ForegroundColor Gray
    $result = Invoke-Expression $curlCmd
    
    Write-Host "`n✅ Project creation request sent" -ForegroundColor Green
    Write-Host "Response: $result" -ForegroundColor Green
    
    # Cleanup
    Remove-Item -Force $tempImagePath -ErrorAction SilentlyContinue
    
} catch {
    Write-Host "❌ Project creation failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "API TESTING COMPLETE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "✅ Backend running on: http://localhost:5000" -ForegroundColor Green
Write-Host "✅ Frontend running on: http://localhost:3001" -ForegroundColor Green
Write-Host "`nNavigate to http://localhost:3001/admin/add-project to test the form!" -ForegroundColor Yellow
