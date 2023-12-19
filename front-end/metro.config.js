module.exports = {
    server: {
      port: 8081,
    },
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx'],
    },
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
  };
  