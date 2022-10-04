const withMdxEnhanced = require("next-mdx-enhanced");

module.exports = withMdxEnhanced({
  defaultLayout: true,
  fileExtensions: ["mdx", "md"],
})({
  pageExtensions: ["js", "jsx", "mdx"],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/headshot",
        destination: "/images/profile.jpeg",
        permanent: false,
      },
    ];
  },
});
