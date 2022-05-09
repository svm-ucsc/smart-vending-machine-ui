// This Component code was taken from: https://fireship.io/lessons/paypal-checkout-frontend/
// It is also based on the PayPal Developer Code: https://developer.paypal.com/docs/checkout/standard/integrate/ 
// These references were also used in conjunction with our PaymentPlugin.html template
const axios = require("axios");
export default {
    name: "PayPal Template",

    data: function () {
        return {
            loaded: false,
            paidFor: false,
            product: {
                description: "this is the amount you owe"
            },
            qrPaymentSuc: true
        };
    },
    mounted: function () {
        const script = document.createElement("script");
        script.src =
            "https://www.paypal.com/sdk/js?client-id=AUa5_Jl61gBVAKStkIh3OroJlrRZUWqcfjmvjgKuUsCi7UsmZRZcPFT2uJKydC2n9Umqd_Xxyz3PB3WX";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
    },
    methods: {
        setLoaded: function () {
            this.loaded = true;
            window.paypal
                .Buttons({
                    createOrder: () => {
                        return this.$store.state.paypal_order_id;
                    },
                    onApprove: async () => {
                        this.paidFor = true;
                        this.$emit('onApproval');
                    },
                    onError: err => {
                        console.log(err);
                    }
                })
                .render(this.$refs.paypal);
        },

        async qrCodeAttemptAproval() {
            try {
                // same functionality as captureOrderId() in main.js:
                await axios.post(
                    "http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/order/capture",

                    { order_id: this.$store.state.order_id }
                );

                this.loaded = true;
                this.paidFor = true;
                this.$emit('qrMoveForward') // increments modal
                this.$store.state.cartInfo = []; // clear the cart and all information associated with it based on return code
                this.$store.state.order_id = "";
                this.$store.state.paypal_order_id = "";

            } catch (e) {
                this.paidFor = false;
                this.qrPaymentSuc = false;
                console.log("Error (qr payment): Cannot capture the order");
            }

        }
    }
};