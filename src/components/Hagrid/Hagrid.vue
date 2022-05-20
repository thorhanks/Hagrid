<template>
    <div class="">
        <table class="w-full" @wheel.prevent="onTableMouseWheel">
            <colgroup>
                <col
                    v-for="c in columns"
                    :key="c.key"
                    :style="{ width: c.widthCss || 'auto' }"
                />
            </colgroup>
            <thead>
                <tr>
                    <th v-for="c in columns" :key="c.key">{{ c.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in windowRows" :key="r[tableConfig.rowKeyProp]">
                    <td v-for="c in columns" :key="c.key">
                        {{ r[c.valueProp] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import setupFakeTableApi from "./setup-fake-table-api.js";
import wretch from "wretch";
export default {
    name: "Hagrid",
    components: {},
    filters: {},
    props: {
        title: { type: String, default: null },
    },
    data: () => ({
        loading: false,
        records: [],
        maxDisplayRowCount: 20,
        windowStartIndex: 0,
        tableConfig: {
            rowKeyProp: "id",
        },
        columns: [
            {
                key: "name",
                label: "Name",
                valueProp: "name",
                widthCss: "40%",
            },
            {
                key: "favCat",
                label: "Favorite Cat",
                valueProp: "favCat",
                widthCss: null,
            },
        ],
    }),
    computed: {
        windowRows() {
            let start = this.windowStartIndex;
            let end = start + this.maxDisplayRowCount;
            return this.records.slice(this.windowStartIndex, end);
        },
        topIndexOfLastWindow() {
            // If user is scrolled to the bottom of the table
            // what would be the record index of the first row
            return this.records.length - this.maxDisplayRowCount;
        },
    },
    watch: {},
    created() {
        setupFakeTableApi();
    },
    mounted() {
        this.fetchRecords();
    },
    methods: {
        fetchRecords() {
            this.loading = true;
            wretch("/api/tabledata")
                .get()
                .json()
                .then((response) => {
                    this.records = this.records.concat(response.records);
                    this.loading = false;
                });
        },
        onTableMouseWheel(event) {
            let index = this.windowStartIndex;
            let newWindowStartIndex = event.deltaY > 0 ? index + 2 : index - 2;

            // If user scrolled to top bound of table
            if (newWindowStartIndex < 0) {
                this.windowStartIndex = 0;
                return;
            }

            // If user scrolled to bottom bound of table
            if (newWindowStartIndex > this.topIndexOfLastWindow) {
                this.windowStartIndex = this.topIndexOfLastWindow;
                if (!this.loading) this.fetchRecords();
                return;
            }

            // Else we are not at top or bottom bound
            this.windowStartIndex = newWindowStartIndex;
        },
    },
};
</script>

<style scoped></style>
