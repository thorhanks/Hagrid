<template>
    <div
        class="absolute w-64 -left-72 top-0 bg-gray-100 p-4 rounded-md shadow-xl border"
    >
        <component :is="component" :record="record" />
    </div>
</template>

<script>
import VirtualScrollerPopoverContentAvatarInfo from "./VirtualScrollerPopoverContentAvatarInfo.vue";
export default {
    name: "VirtualScrollerPopup",
    components: { VirtualScrollerPopoverContentAvatarInfo },
    props: {
        record: { type: Object, default: null },
        component: { type: String, required: true },
    },
};
</script>
