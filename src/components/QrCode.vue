<template>
  <qrcode-vue
    :value="value"
    :size="size"
    level="H"
  />
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
    components: {
        QrcodeVue,
    },
    data() {
        return {
            value:
        "https://www.sandbox.paypal.com/checkoutnow?token=" +
        this.$store.state.paypal_order_id,
            size: 100,
        };
    }
};
</script>