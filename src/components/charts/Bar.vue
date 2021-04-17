<template>
    <div class = "chart">
        <bar-chart @on-receive="received"></bar-chart>
    </div>
</template>

<script>
import Barchart from "./Barchart.js"
export default {
    components:{
        "bar-chart": Barchart
    },

    methods: {
        received:function(event) {
            this.$emit("clicked", event)
        }
    }
}
</script>
