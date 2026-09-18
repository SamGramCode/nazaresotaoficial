export default {
  async fetch(request) {
    const url = new URL(request.url);
    const domain = url.searchParams.get('domain') || 'nazaresotaoficial.com';
    const path = url.searchParams.get('path') || '/';

    const config = getConfigForPath(path);

    return new Response(JSON.stringify(config), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
};

function getConfigForPath(path) {
  return {
    name: 'NAZARESOTA',
    bio: 'Soy NAZARESOTA ♡ auténtica y con mucho encanto',
    links: [
      {
        id: 'l_instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/nazaresotaoficial'
      }
    ]
  };
}
