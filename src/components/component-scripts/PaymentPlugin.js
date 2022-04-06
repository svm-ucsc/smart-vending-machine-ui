// import image from "../assets/lamp.png"
export default {
    name: "PayPal Template",
  
    data: function() {
      return {
        loaded: false,
        paidFor: false,
        product: {
          price: 777.77,
          description: "this is the amount you owe"
          // img: "./assets/lamp.jpg"
        }
      };
    },
    mounted: function() {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AUa5_Jl61gBVAKStkIh3OroJlrRZUWqcfjmvjgKuUsCi7UsmZRZcPFT2uJKydC2n9Umqd_Xxyz3PB3WX";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },
    methods: {
      setLoaded: function() {
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
                      value: this.product.price
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.paidFor = true;
              console.log(order);
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.$refs.paypal);
      }
    }
  };