import Hagrid from "./Hagrid.vue";
import { action } from "@storybook/addon-actions";

export default {
    title: "Experiment 1",
    component: Hagrid,
};

export const Example = (args) => ({
    components: { Hagrid },
    template: `
        <div class="mx-20 my-10">
            <Hagrid v-bind="args" />
            <div class="flex flex-row mt-5">
                <div class="flex-1 text-center italic">Scroll to bottom to load more rows 👇</div>
                <div class="text-right italic pr-8">Try clicking and dragging the fake scrollbar ☝</div>
            </div>
        </div>
    `,
    setup() {
        return { args };
    },
});
Example.args = {
    title: "Hello",
};
