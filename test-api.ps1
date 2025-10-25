# Test Login API
$body = @{
    email = "admin@portfolio.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -MaximumRedirection 0 -ErrorAction Stop
    Write-Host "✅ Status Code:" $response.StatusCode
    Write-Host "Response:" $response.Content
} catch {
    if ($_.Exception.Response.StatusCode -eq 500) {
        Write-Host "❌ Error 500 - Internal Server Error"
        Write-Host "Response:" $_.Exception.Response
    } else {
        Write-Host "Status Code:" $_.Exception.Response.StatusCode
        Write-Host "Error:" $_.Exception.Message
    }
}
