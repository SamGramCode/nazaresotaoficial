export default function handler(req, res) {
  // Get base URL parameter
  const baseUrl = req.query.url || '/nzoficial';

  // Get UTM parameters
  const utm_source = req.query.utm_source || 'ig';
  const utm_medium = req.query.utm_medium || 'webview';
  const utm_campaign = req.query.utm_campaign || 'instagram';

  // Get user agent and referer
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const referer = (req.headers['referer'] || '').toLowerCase();

  // Detect Instagram webview
  const isInstagram = userAgent.includes('instagram') ||
                      userAgent.includes('igdmui') ||
                      referer.includes('instagram.com');

  // Build full URL with UTM parameters
  let fullUrl = baseUrl;
  if (!baseUrl.startsWith('http')) {
    fullUrl = `https://nazaresotaoficial.com${baseUrl}`;
  }

  // Add UTM parameters
  const separator = fullUrl.includes('?') ? '&' : '?';
  fullUrl = `${fullUrl}${separator}utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}`;

  // Log for debugging
  console.log('📍 Redirect Request:', {
    from: isInstagram ? '📱 Instagram' : '🌐 Browser',
    targetUrl: fullUrl,
    userAgent: userAgent.substring(0, 50),
  });

  // Respond with HTTP 302 redirect
  // Instagram respects standard HTTP redirects and opens in external browser
  res.statusCode = 302;
  res.setHeader('Location', fullUrl);
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.end();
}
