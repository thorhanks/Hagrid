<template>
    <div ref="sliderContainer" class="mx-5 bg-slate-200 w-1">
        <div
            class="-ml-1 w-3 bg-slate-600 cursor-grab select-none relative"
            :style="{
                height: `${sliderHeight}px`,
                'margin-top': `${sliderTopMargin}px`,
            }"
            @mousedown="onMouseDown"
        >
            <VirtualScrollerPopup
                v-if="isGrabbed"
                :record="windowTopIndexRecord"
                :component="popupContentComponent"
            />
        </div>
    </div>
</template>

<script>
import VirtualScrollerPopup from "./VirtualScrollerPopup.vue";
export default {
    name: "VirtualScroller",
    components: { VirtualScrollerPopup },
    props: {
        popupContentComponent: { type: String, required: true },
        windowTopIndexRecord: { type: Object, default: null },
        scrollableRecordCount: { type: Number, required: true },
        totalScrollableRecordCount: { type: Number, required: true },
    },
    emits: ["scrolledToNewWindowStartIndex", "scrolledToBottom"],
    data: () => ({
        isGrabbed: false,
        sliderContainerHeight: 0,
        sliderTopMargin: 0,
        sliderTopBound: 0,
        currentScrolledToRowIndex: 0,
    }),
    computed: {
        sliderHeight() {
            let ratioOfTotalRecordsFetched =
                this.scrollableRecordCount / this.totalScrollableRecordCount;

            let ratioOfSliderToShow = 1 - ratioOfTotalRecordsFetched;
            ratioOfSliderToShow = Math.max(0.2, ratioOfSliderToShow);
            ratioOfSliderToShow = Math.min(0.8, ratioOfSliderToShow);

            return Math.floor(ratioOfSliderToShow * this.sliderContainerHeight);
        },
        sliderBottomBound() {
            return this.sliderContainerHeight - this.sliderHeight;
        },
        pxPerRecord() {
            // How many pixels on the slider bar represent a table row
            return this.sliderBottomBound / this.scrollableRecordCount;
        },
    },
    watch: {
        sliderTopMargin(value) {
            // Equation to get the scroll postion based on current row index to show
            // sliderTopMargin = pxPerRecord * windowStartIndex

            // Find index given how many pixels the slider is scrolled down
            // and how many pixels in the bar represent a row
            let windowStartIndex = Math.floor(
                this.sliderTopMargin / this.pxPerRecord
            );

            this.$emit("scrolledToNewWindowStartIndex", windowStartIndex);
        },
    },
    mounted() {
        let timeoutId = setInterval(() => {
            this.sliderContainerHeight =
                this.$refs.sliderContainer.clientHeight;
            if (this.sliderContainerHeight > 400) {
                clearTimeout(timeoutId);
            }
        }, 200);

        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mouseup", this.onMouseUp);
    },
    unmounted() {
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("mouseup", this.onMouseUp);
    },
    methods: {
        $setTopMargin(newWindowStartIndex) {
            // Equation to get the scroll postion based on current row index to show
            // sliderTopMargin = pxPerRecord * windowStartIndex
            this.sliderTopMargin = this.pxPerRecord * newWindowStartIndex;
        },
        onMouseDown() {
            this.isGrabbed = true;
        },
        onMouseUp() {
            this.isGrabbed = false;
        },
        onMouseMove(event) {
            if (this.isGrabbed) {
                let newSliderTopMargin = this.sliderTopMargin;
                newSliderTopMargin += event.movementY;

                newSliderTopMargin = Math.max(
                    this.sliderTopBound,
                    newSliderTopMargin
                );

                newSliderTopMargin = Math.min(
                    this.sliderBottomBound,
                    newSliderTopMargin
                );

                if (newSliderTopMargin >= this.sliderBottomBound - 50) {
                    this.$emit("scrolledToBottom");
                }

                this.sliderTopMargin = newSliderTopMargin;
            }
        },
    },
};
</script>
