export default function handler(req, res) {
  // Get base URL - default to root /
  const baseUrl = req.query.url || '/';

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

  // Collect all parameters (exclude 'url' and 'v' which are internal)
  const params = [];

  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'url' && key !== 'v') {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  // If no parameters from Instagram, add defaults
  if (params.length === 0) {
    params.push('utm_source=ig');
    params.push('utm_medium=webview');
    params.push('utm_campaign=instagram');
  }

  // Append parameters to URL
  if (params.length > 0) {
    const separator = fullUrl.includes('?') ? '&' : '?';
    fullUrl = `${fullUrl}${separator}${params.join('&')}`;
  }

  // Log for debugging
  console.log('📍 Redirect Request:', {
    from: isInstagram ? '📱 Instagram' : '🌐 Browser',
    targetUrl: fullUrl.substring(0, 150),
  });

  // Respond with HTTP 302 redirect
  res.statusCode = 302;
  res.setHeader('Location', fullUrl);
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.end();
}
