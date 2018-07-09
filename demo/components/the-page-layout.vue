<template>
    <div class="page-layout">
        <div class="page-layout__sidebar">
            <slot name="sidebar"/>
        </div>
        <div class="page-layout__content">
            <slot name="content"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageLayout",
};
</script>

<style lang="scss" scoped>
@import "../variables";

.page-layout {
    display: flex;
    flex-direction: row;
    height: 100vh;
}

.page-layout__sidebar {
    padding: $space-l;
    min-width: 250px;
    text-align: right;
}

.page-layout__content {
    flex: 1 1 auto;
    padding: $space-l $space-xl;
    box-shadow: 0px 0px 90px 10px rgba(0, 0, 0, 0.15);
}
</style>
