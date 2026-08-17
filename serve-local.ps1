param(
  [ValidateRange(1, 65535)]
  [int]$Port = 8080,
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$siteRoot = (Resolve-Path -LiteralPath $PSScriptRoot).Path
$prefix = "http://localhost:$Port/"
$mimeTypes = @{
  '.css'   = 'text/css; charset=utf-8'
  '.gif'   = 'image/gif'
  '.html'  = 'text/html; charset=utf-8'
  '.ico'   = 'image/x-icon'
  '.jpeg'  = 'image/jpeg'
  '.jpg'   = 'image/jpeg'
  '.js'    = 'text/javascript; charset=utf-8'
  '.json'  = 'application/json; charset=utf-8'
  '.png'   = 'image/png'
  '.svg'   = 'image/svg+xml'
  '.webp'  = 'image/webp'
}

$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)
$listener.Start()

Write-Host "Project Control is running at $prefix"
Write-Host 'Press Ctrl+C to stop the server.'

if (-not $NoBrowser) {
  Start-Process $prefix
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()
      while ($reader.ReadLine()) { }

      $requestParts = $requestLine -split ' '
      $method = $requestParts[0]
      $requestPath = if ($requestParts.Count -ge 2) { ([Uri]::UnescapeDataString(($requestParts[1] -split '\?')[0])).TrimStart('/') } else { '' }
      if ([string]::IsNullOrWhiteSpace($requestPath)) { $requestPath = 'index.html' }

      $candidate = [IO.Path]::GetFullPath((Join-Path $siteRoot $requestPath))
      $insideRoot = $candidate.StartsWith($siteRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)

      if ($method -notin @('GET', 'HEAD')) {
        $status = '405 Method Not Allowed'
        $contentType = 'text/plain; charset=utf-8'
        $body = [Text.Encoding]::UTF8.GetBytes('405 - Method not allowed')
      }
      elseif (-not $insideRoot -or -not (Test-Path -LiteralPath $candidate -PathType Leaf)) {
        $status = '404 Not Found'
        $contentType = 'text/plain; charset=utf-8'
        $body = [Text.Encoding]::UTF8.GetBytes('404 - File not found')
      }
      else {
        $status = '200 OK'
        $body = [IO.File]::ReadAllBytes($candidate)
        $extension = [IO.Path]::GetExtension($candidate).ToLowerInvariant()
        $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { 'application/octet-stream' }
      }

      $headers = "HTTP/1.1 $status`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
      $headerBytes = [Text.Encoding]::ASCII.GetBytes($headers)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      if ($method -ne 'HEAD') { $stream.Write($body, 0, $body.Length) }
    }
    finally {
      $client.Close()
    }
  }
}
finally {
  $listener.Stop()
}
