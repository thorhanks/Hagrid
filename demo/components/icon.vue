<template>
    <FontAwesomeIcon
        :icon="icon"
        :size="size"
        :spin="spin"
        :border="border"
        :fixed-width="fixedWidth"
    />
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt, faQuestionCircle} from "@fortawesome/free-regular-svg-icons";

export default {
    name: "Icon",
    components: {FontAwesomeIcon},
    props: {
        name: {type: String, required: true},
        size: {type: String, default: "1x"},
        spin: {type: Boolean, default: false},
        border: {type: Boolean, default: false},
        fixedWidth: {type: Boolean, default: false},
    },
    data: () => ({
        icons: {
            questionCircle: faQuestionCircle,
            spinner: faSpinner,
            trashAlt: faTrashAlt,
        },
    }),
    computed: {
        icon: function() {
            return this.icons[this.name];
        },
    },
};
</script>
