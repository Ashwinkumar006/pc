<?php
/**
 * Simple Local PHP Server for Proconnect Development
 * This simulates a local web server to run the website
 */

// Set content type for different file extensions
function getContentType($file) {
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    $contentTypes = [
        'html' => 'text/html; charset=UTF-8',
        'css' => 'text/css; charset=UTF-8',
        'js' => 'application/javascript; charset=UTF-8',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'png' => 'image/png',
        'gif' => 'image/gif',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'json' => 'application/json',
        'md' => 'text/markdown; charset=UTF-8'
    ];
    
    return $contentTypes[$ext] ?? 'text/plain';
}

// Get current file path
$request_uri = $_SERVER['REQUEST_URI'] ?? '/';
$clean_uri = parse_url($request_uri, PHP_URL_PATH);
$clean_uri = ltrim($clean_uri, '/');
$clean_uri = $clean_uri === '' ? 'index.html' : $clean_uri;

// Security check - prevent directory traversal
$clean_uri = str_replace('..', '', $clean_uri);
$clean_uri = preg_replace('/\/+/', '/', $clean_uri);

$file_path = __DIR__ . '/' . $clean_uri;

// Check if file exists
if (!file_exists($file_path)) {
    // Try to find HTML files with .html extension
    if (!preg_match('/\.(html|css|js|jpg|jpeg|png|gif|ico|woff|woff2|json|md)$/i', $clean_uri)) {
        $html_file = __DIR__ . '/' . $clean_uri . '.html';
        if (file_exists($html_file)) {
            $file_path = $html_file;
        }
    }
}

if (!file_exists($file_path)) {
    // Return 404
    http_response_code(404);
    echo '<h1>404 - File Not Found</h1>';
    echo '<p>The requested file <strong>' . htmlspecialchars($clean_uri) . '</strong> was not found.</p>';
    echo '<p><a href="/">← Go to Homepage</a></p>';
    exit;
}

// Set content type
$content_type = getContentType($file_path);
header("Content-Type: $content_type");

// Set caching headers for static assets
if (preg_match('/\.(css|js|jpg|jpeg|png|gif|ico|woff|woff2)$/i', $file_path)) {
    header('Cache-Control: public, max-age=31536000'); // 1 year
    header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT');
}

// Handle CORS (for local development)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Output file content
if (preg_match('/\.(html|css|js|md)$/i', $file_path)) {
    // Text files - read and output
    $content = file_get_contents($file_path);
    echo $content;
} else {
    // Binary files - read and output
    readfile($file_path);
}
?>