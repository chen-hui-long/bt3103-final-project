<template>
    <div class = "chart">
        <doughnut-chart @on-receive="received"></doughnut-chart>
    </div>
</template>

<script>
import Doughnut from "./Doughnut.js"
export default {
    components:{
        "doughnut-chart": Doughnut
    },

    methods: {
        received:function(event) {
            this.$emit("clicked", event)
        }
    }
}
</script>
