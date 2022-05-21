<template>
    <div class="flex flex-row items-center">
        <div
            class="rounded-md w-10 h-10 bg-cover"
            :style="{ 'background-image': `url('${record?.avatarImgUrl}')` }"
        />
        <div class="flex-1 pl-3">
            <div class="text-lg font-bold truncate" style="max-width: 160px">
                {{ record?.name }}
            </div>
            <div class="text-sm -mt-1">{{ record?.type }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VirtualScrollerPopoverContentAvatarInfo",
    props: {
        record: { type: Object, default: null },
    },
};
</script>
