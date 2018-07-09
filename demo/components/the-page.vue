<template>
    <PageLayout>
        <template slot="sidebar">
            <Logo />
        </template>
        <template slot="content">
            I am content
        </template>
    </PageLayout>
</template>

<script>
import {mapState} from "vuex";
import PageLayout from "./the-page-layout.vue";
import Logo from "./the-logo.vue";
import Icon from "./icon.vue";

export default {
    name: "ThePage",
    components: {PageLayout, Logo},
    props: {},
    data: () => ({}),
    computed: mapState({}),
    methods: {},
};
</script>

<style lang="scss" scoped>
@import "../variables";
</style>
