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
        </div>
    `,
    setup() {
        return { args };
    },
});
Example.args = {
    title: "Hello",
};
