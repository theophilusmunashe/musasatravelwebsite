module.exports = {
    // Other webpack configurations...
    module: {
      rules: [
        // Other rules...
        {
          test: /\.(mp4|webm|ogg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'videos/',
              },
            },
          ],
        },
      ],
    },
  };