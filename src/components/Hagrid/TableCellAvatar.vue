<template>
    <div class="flex flex-row items-center">
        <div
            class="rounded-md w-14 h-14 bg-cover"
            :style="{ 'background-image': `url('${record.avatarImgUrl}')` }"
        />
        <div class="flex-1 pl-3">{{ record.name }}</div>
    </div>
</template>

<script>
export default {
    name: "TableCellAvatar",
    props: {
        record: { type: Object, required: true },
    },
};
</script>
