# Test API Endpoints

## Test Registration
```powershell
$body = @{
    email = "test@example.com"
    password = "Test123!"
    firstName = "Test"
    lastName = "User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5175/api/auth/register" -Method POST -ContentType "application/json" -Body $body
```

## Test Login
```powershell
$body = @{
    email = "test@example.com"
    password = "Test123!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5175/api/auth/login" -Method POST -ContentType "application/json" -Body $body
```
