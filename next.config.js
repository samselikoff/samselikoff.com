const withMdxEnhanced = require("next-mdx-enhanced");
// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
// });

module.exports = withMdxEnhanced({
  defaultLayout: true,
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
});
