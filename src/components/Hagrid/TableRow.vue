<template>
    <tr class="border-t border-gray-300 hover:bg-gray-100">
        <td
            v-for="c in columns"
            :key="c.key"
            class="py-3 px-3"
            :class="`text-${c.alignment || 'left'}`"
        >
            <component
                :is="c.componentName"
                v-if="c.componentName"
                :record="record"
            />
            <template v-else>
                {{ record[c.valueProp] || "-" }}
            </template>
        </td>
    </tr>
</template>

<script>
import TableCellAvatar from "./TableCellAvatar.vue";
export default {
    name: "TableRow",
    components: { TableCellAvatar },
    props: {
        columns: { type: Array, required: true },
        record: { type: Object, required: true },
    },
};
</script>
