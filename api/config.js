export default {
  async fetch(request) {
    const url = new URL(request.url);
    const domain = url.searchParams.get('domain') || 'nazaresotaoficial.com';
    const path = url.searchParams.get('path') || '/';

    // Config por campaign o default
    const config = getConfigForPath(path);

    // Response con headers CORS
    return new Response(JSON.stringify(config), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
        'X-Campaign': config.campaign || 'default'
      }
    });
  }
};

function getConfigForPath(path) {
  const baseConfig = {
    name: 'NAZARESOTA',
    bio: 'Soy NAZARESOTA ♡ auténtica y con mucho encanto',
    theme: {
      accent: '#E8B4C4',
      bg: '#0a0a0a'
    },
    links: [
      {
        id: 'l_onlyfans',
        label: 'OnlyFans',
        url: 'https://onlyfans.com/nazaresota',
        icon: 'onlyfans'
      },
      {
        id: 'l_telegram',
        label: 'Telegram',
        url: 'https://t.me/nazaresotaoficial',
        icon: 'telegram'
      }
    ]
  };

  // Campaign-specific overrides (example: /d3vilf)
  if (path === '/d3vilf' || path.includes('d3vilf')) {
    return {
      ...baseConfig,
      campaign: 'd3vilf',
      links: [
        {
          id: 'l_onlyfans_d3vilf',
          label: 'OnlyFans',
          url: 'https://onlyfans.com/nazaresota?utm_source=d3vilf&utm_medium=link',
          icon: 'onlyfans'
        },
        {
          id: 'l_telegram_d3vilf',
          label: 'Telegram',
          url: 'https://t.me/nazaresotaoficial?utm_source=d3vilf&utm_medium=link',
          icon: 'telegram'
        }
      ]
    };
  }

  return baseConfig;
}
