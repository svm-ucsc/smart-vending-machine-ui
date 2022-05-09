import axios from 'axios';
import $ from 'jquery'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            toggle: false,
            modal_paymentScreen: false,
            modal_pageCount: 0,
            cartReceipt: [],
            sleeping: false
        }
    },
    computed: {
        ...mapGetters(['checkMode'])
    },
    methods: {
        showCart() {
            const btn = document.getElementById('reviewOrderBtn');
            $(btn).css('visibility', 'hidden');
            this.toggle = true;
            const collapseBtn = document.getElementById('collapseCartBtn');
            $(collapseBtn).css('visibility', 'visible');
        },
        collapseCart() {
            const btn = document.getElementById('reviewOrderBtn');
            $(btn).css('visibility', 'visible');
            this.toggle = false;
            const collapseBtn = document.getElementById('collapseCartBtn');
            $(collapseBtn).css('visibility', 'hidden');
            this.sleeping = false;

        },
        // decrementQuantity(index){

        // },
        placeOrder() {
            this.modal_pageCount++;
            // copy order to a receipt list prior to the reset of content
            for (let i of this.$store.state.cartInfo) {
                this.cartReceipt.push(i);
            }
            this.$store.commit('captureOrderID');

        },
        nextSplitModal() {
            this.modal_pageCount++;
            this.modal_paymentScreen = true;
            this.sleeping = false;


        },
        prevSplitModal() {
            if (this.modal_pageCount == 2) {
                this.modal_pageCount = 0;
            } else {
                this.modal_pageCount--;
            }
            this.modal_paymentScreen = false;
            this.sleeping = false;

        },
        backToHome() {
            this.modal_pageCount = 0;
            this.sleeping = false;
            this.cartReceipt.splice(0, this.cartReceipt.length); // reset the cart receipt
        },
        costMultiplier(itemPrice, quantity) {
            let dollars = (itemPrice * quantity) / 100;
            dollars = dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
            return dollars;
        },
        getTotalAmount(cartInfo) {
            // pass by reference taking local shopping basket and placing in Vuex, then Vuex will globally store the subtotal and then this function will grab a copy of it
            this.$store.commit('calculateTotalCost', cartInfo);
            let local_subTotal = (this.$store.subTotal) / 100;
            local_subTotal = local_subTotal.toLocaleString("en-US", { style: "currency", currency: "USD" });
            return local_subTotal;
        },
        devMode(){
            this.$store.commit('switchMode'); 
        },
        secretMode(){
            this.$store.commit('setMachineID'); 
        },

        // this function will call /order to verify the stock items
        async checkInventory() {
            this.sleeping = true;
            // await new Promise(resolve => setTimeout(resolve, 3000));
            // send the cartInfo by parsing cartInfo obj and reassigning to id:quantity format
            let orderObj = this.$store.state.cartInfo.reduce(
                (orderObj, item) =>
                    Object.assign(orderObj, { [item.itemId]: item.quantity }),
                {}
            );
            try {
                const response = await axios.post(
                    "http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/order/",

                    { machine_id: "testclient", items: orderObj }
                );
                // obj returns {"order_id": xxxx, "paypal_order_id": xxxxx}
                var obj = response.data; // needs to become global scoped
                const order_id_key = Object.keys(obj)[0];
                const order_id_value = obj[order_id_key];
                const paypal_id_key = Object.keys(obj)[1];
                const paypal_id_value = obj[paypal_id_key];

                this.$store.state.order_id = order_id_value;
                this.$store.state.paypal_order_id = paypal_id_value;

                console.log(`${order_id_key}: ${order_id_value}`)
                console.log(`${paypal_id_key}: ${paypal_id_value}`)
                console.log(`obj response is: ${JSON.stringify(obj)}`)
                if (this.sleeping == true) {
                    this.modal_pageCount++;
                    this.sleeping = false;
                }

            } catch (e) {
                console.log("Error (cartitems.js): " + e);
                console.log(`Here's the response: ${JSON.stringify(e.response.data)}`)

                // EMIT A NEW EVENT? CREATE COMPONENT STATING ITEM IS OUT OF STOCK? come back to this.
                this.modal_pageCount = 0;
            }


        }

    },
    mounted: function () {
        // need arrow operator because the scope of "this" changes otherwise
        // any time the modal is clicked out of, we reset the modal page counter
        document.getElementById('cartModalReviewScreen').addEventListener("hidden.bs.modal", () => {
            this.modal_pageCount = 0;
            this.sleeping = false;
            this.cartReceipt.splice(0, this.cartReceipt.length)
        });

        let nextBtn = document.querySelector('.CartItems__nextBtn');
        if (this.modal_pageCount === 1) {
            if (nextBtn) {
                nextBtn.style.visibility = "hidden";
            }
        } else {
            nextBtn.style.visibility = "visible";
        }
    }
}