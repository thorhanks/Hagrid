<template>
    <div class="font-sans flex items-stretch relative p-3">
        <LoadingOverlay v-if="loading" />
        <table class="flex-1 w-full" @wheel.prevent="onTableMouseWheel">
            <colgroup>
                <col
                    v-for="c in columns"
                    :key="c.key"
                    :style="{ width: c.widthCss || 'auto' }"
                />
            </colgroup>
            <thead>
                <tr>
                    <th v-for="c in columns" :key="c.key" class="pb-3">
                        {{ c.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <TableRow
                    v-for="r in windowRows"
                    :key="r[tableConfig.rowKeyProp]"
                    :columns="columns"
                    :record="r"
                />
            </tbody>
        </table>
        <VirtualScroller
            ref="virtualScroller"
            :popup-content-component="
                tableConfig.virtualScrollerPopupContentComponent
            "
            :window-top-index-record="records[windowStartIndex]"
            :scrollable-record-count="records.length - maxDisplayRowCount"
            :total-scrollable-record-count="totalRecordCount"
            @scrolled-to-new-window-start-index="(i) => (windowStartIndex = i)"
            @scrolled-to-bottom="onScrolledToBottom"
        />
    </div>
</template>

<script>
import { makeServer } from "./api-server.js";
import wretch from "wretch";
import TableRow from "./TableRow.vue";
import VirtualScroller from "./VirtualScroller.vue";
import LoadingOverlay from "./LoadingOverlay.vue";
export default {
    name: "Hagrid",
    components: { TableRow, VirtualScroller, LoadingOverlay },
    props: {
        title: { type: String, default: null },
    },
    data: () => ({
        loading: false,
        records: [],
        currentPageNum: 0,
        pageSizeToFetch: 200,
        sortValueProp: "name",
        sortDirection: "asc",
        totalRecordCount: 0,
        maxDisplayRowCount: 10,
        windowStartIndex: 0,
        tableConfig: {
            rowKeyProp: "id",
            virtualScrollerPopupContentComponent:
                "VirtualScrollerPopoverContentAvatarInfo",
        },
        columns: [
            {
                key: "name",
                label: "Name",
                valueProp: "name",
                widthCss: "300px",
                componentName: "TableCellAvatar",
                alignment: null,
            },
            {
                key: "type",
                label: "Type",
                valueProp: "type",
                widthCss: "200px",
                componentName: null,
                alignment: null,
            },
            {
                key: "address",
                label: "Address",
                valueProp: "address",
                widthCss: null,
                componentName: null,
                alignment: null,
            },
            {
                key: "price",
                label: "Price",
                valueProp: "price",
                widthCss: "150px",
                componentName: null,
                alignment: "right",
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
    created() {},
    mounted() {
        makeServer();
        this.fetchRecords();
    },
    methods: {
        fetchRecords() {
            if (
                this.totalRecordCount > 0 &&
                this.records.length === this.totalRecordCount
            )
                return;

            this.loading = true;
            let url = `/api/cats?page=${this.currentPageNum + 1}&size=${
                this.pageSizeToFetch
            }&sortby=${this.sortValueProp}&sortdirection=${this.sortDirection}`;
            wretch(url)
                .get()
                .json()
                .then((response) => {
                    //this.records = this.records.concat(response.records);
                    response.records.forEach((x) => this.records.push(x));
                    this.totalRecordCount = response.totalRecordCount;
                    this.currentPageNum += 1;
                    this.loading = false;
                });
        },
        onTableMouseWheel(event) {
            let index = this.windowStartIndex;
            let newWindowStartIndex = event.deltaY > 0 ? index + 2 : index - 2;

            // If user scrolled to top bound of table
            if (newWindowStartIndex < 0) {
                this.windowStartIndex = 0;
                this.$refs.virtualScroller.$setTopMargin(0);
                return;
            }

            // If user scrolled to bottom bound of table
            if (newWindowStartIndex > this.topIndexOfLastWindow) {
                this.windowStartIndex = this.topIndexOfLastWindow;
                this.$refs.virtualScroller.$setTopMargin(
                    this.topIndexOfLastWindow
                );
                if (!this.loading) this.fetchRecords();
                return;
            }

            // Else we are not at top or bottom bound
            this.windowStartIndex = newWindowStartIndex;
            this.$refs.virtualScroller.$setTopMargin(newWindowStartIndex);
        },
        onScrolledToBottom() {
            if (!this.loading) this.fetchRecords();
        },
    },
};
</script>
