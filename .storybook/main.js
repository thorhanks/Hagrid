// use `mergeConfig` to recursively merge Vite options
const { mergeConfig } = require("vite");

module.exports = {
    async viteFinal(config, { configType }) {
        // return the customized config
        return mergeConfig(config, {
            base: "/Hagrid/",
            resolve: {},
        });
    },
    core: { builder: "@storybook/builder-vite" },
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: "@storybook/vue3",
};
