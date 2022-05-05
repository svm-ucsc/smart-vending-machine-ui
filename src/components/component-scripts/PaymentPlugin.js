// This Component code was taken from: https://fireship.io/lessons/paypal-checkout-frontend/
// It is also based on the PayPal Developer Code: https://developer.paypal.com/docs/checkout/standard/integrate/ 
// These references were also used in conjunction with our PaymentPlugin.html template

export default {
    name: "PayPal Template",

    data: function () {
        return {
            loaded: false,
            paidFor: false,
            product: {
                description: "this is the amount you owe"
            }
        };
    },
    mounted: function () {


        const script = document.createElement("script");
        const script_string = "https://www.paypal.com/sdk/js?client-id=" + process.env.VUE_APP_PAYPALPUBKEY;
        script.src = script_string;
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);

    },
    methods: {
        setLoaded: function () {
            this.loaded = true;
            window.paypal
                .Buttons({
                    createOrder: () => {
                        // /order
                        console.log(` payment plugin.js: ${this.$store.state.paypal_order_id}`)
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
    }
};