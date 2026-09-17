export default function handler(req, res) {
  // Get base URL parameter
  const baseUrl = req.query.url || '/nzoficial';

  // Get user agent and referer
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const referer = (req.headers['referer'] || '').toLowerCase();

  // Detect Instagram webview
  const isInstagram = userAgent.includes('instagram') ||
                      userAgent.includes('igdmui') ||
                      referer.includes('instagram.com');

  // Build full URL
  let fullUrl = baseUrl;
  if (!baseUrl.startsWith('http')) {
    fullUrl = `https://nazaresotaoficial.com${baseUrl}`;
  }

  // Capture ALL query parameters from Instagram (excluding 'url' and 'v')
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'url' && key !== 'v') {
      queryParams.append(key, value);
    }
  }

  // If no Instagram parameters, add our defaults
  if (queryParams.toString().length === 0) {
    queryParams.append('utm_source', 'ig');
    queryParams.append('utm_medium', 'webview');
    queryParams.append('utm_campaign', 'instagram');
  }

  // Add parameters to URL
  const separator = fullUrl.includes('?') ? '&' : '?';
  const paramString = queryParams.toString();
  if (paramString) {
    fullUrl = `${fullUrl}${separator}${paramString}`;
  }

  // Log for debugging
  console.log('📍 Redirect Request:', {
    from: isInstagram ? '📱 Instagram' : '🌐 Browser',
    targetUrl: fullUrl,
    userAgent: userAgent.substring(0, 50),
    params: paramString.substring(0, 100),
  });

  // Respond with HTTP 302 redirect
  // Instagram respects standard HTTP redirects and opens in external browser
  res.statusCode = 302;
  res.setHeader('Location', fullUrl);
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.end();
}
