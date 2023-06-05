module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co", "image.tmdb.org"],
  },
  async redirects() {
    return [
      {
        source: "/notes",
        destination: "/",
        permanent: true,
      },
      {
        source: "/articles",
        destination: "/",
        permanent: true,
      },
      {
        source: "/notes/:id",
        destination: "/:id",
        permanent: true,
      },
      {
        source: "/articles/:id",
        destination: "/:id",
        permanent: true,
      },
    ];
  },
};
