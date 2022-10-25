module.exports = {
    publicPath: '',
    outputDir: 'dist',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8525',
                ws: true,
                changeOrigin: true
            }
        }
    },
}