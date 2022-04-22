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
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: this.product.description,
                                    amount: {
                                        currency_code: "USD",
                                        value: (this.$store.subTotal) / 100
                                    }
                                }
                            ]
                        });
                    },
                    onApprove: async (data, actions) => {
                        await actions.order.capture();
                        this.paidFor = true;
                        this.$emit('onApproval');
                        // console.log(order);
                    },
                    onError: err => {
                        console.log(err);
                    }
                })
                .render(this.$refs.paypal);
        },
    }
};