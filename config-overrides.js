const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
    alias({
        '@/assets': './src/assets',
        '@/components': './src/components',
        '@/contexts': './src/contexts',
        '@/firebase': './src/firebase',
        '@/layout': './src/layout',
        '@/pages': './src/pages',
        '@/api': './src/api',
        '@/lang': './src/lang',
        '@/openai': './src/openai',
        '@/interfaces': './src/interfaces',
        // '@/recoil': './src/recoil',
    })(config)

    return config
}
