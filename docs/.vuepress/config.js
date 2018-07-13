module.exports = {
    port: 1234,
    dest: ".deploy/docs",
    base: "/Hagrid/docs/",
    title: "Hagrid",
    description: "The lovable vue datatable.",
    themeConfig: {
        nav: [{text: "Demo", link: "https://thorhanks.github.io/Hagrid/demo"}],
        sidebar: ["/", "/features", "/research"],
        lastUpdated: "Last updated",
        repo: "thorhanks/Hagrid",
        docsDir: "docs",
        editLinks: true,
    },
};
