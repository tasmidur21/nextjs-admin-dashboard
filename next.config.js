const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
