import axios from 'axios';
import $ from 'jquery'

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

        // this function will call /order to verify the stock items
        async checkInventory() {
            this.sleeping = true;
            await new Promise(resolve => setTimeout(resolve, 3000));

            // stuff returned is {order_id, paypal_order_id}

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
                const obj = response.data;
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
                // state.cartInfo = []; // clear the cart and all information associated with it based on return code

            } catch (e) {
                console.log("Error (cartitems.js): " + e);
                // console.log(`Reason: ${JSON.stringify(e["reason"])}`)
                // EMIT A NEW EVENT? CREATE COMPONENT STATING ITEM IS OUT OF STOCK? come back to this.
                this.modal_pageCount = 0;
            }


        }
        // async checkInventory() {
        //     this.sleeping = true;
        //     // await new Promise(resolve => setTimeout(resolve, 3000));
        //     // I AM AWARE OF THIS GIANT COMMENT BLOCK: please keep this here for inventory validation

        //     try {
        //         const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/machine',
        //             { params: { fields: ["machine_id", "location", "stock"].join() } });
        //         const obj = response.data;
        //         let parsedData = obj;
        //         let inventoryObj = parsedData.find((o) => o.machine_id == "testclient");

        //         if ((inventoryObj != null) && (inventoryObj.machine_id == "testclient")) {
        //             // loop through temp.stock and compare with cart contents now:
        //             console.log("machine stock is: " + JSON.stringify(inventoryObj))
        //             for (let item in this.$store.state.cartInfo) {
        //                 console.log(`looping... item: ${JSON.stringify(item)}`)
        //                 let foodExists = inventoryObj.stock.find((i) => i === item.itemId);
        //                 if (foodExists) {
        //                     if (foodExists.quantity > item.quantity) {
        //                         console.log(`OUT OF STOCK. You requested: ${item.itemId} amount ${item.quantity} but only ${foodExists.quantity} was found`)
        //                     }
        //                 }
        //             }
        //             // for (let foodIds in inventoryObj.stock) {
        //             //     console.log(`food: ${foodIds}, quantity: ${inventoryObj.stock[foodIds]}`);
        //             // }
        //             // console.log("the user's cart is: " + JSON.stringify(this.$store.state.cartInfo))
        //         }

        //         // async so we need to confirm with "mutex boolean" style logic before updating
        //         if (this.sleeping == true) {
        //             this.modal_pageCount++;
        //             this.sleeping = false;
        //         }
        //         await new Promise(resolve => setTimeout(resolve, 10000));
        //     } catch (e) {
        //         console.log("Error (cartitems.js): " + e);
        //         this.modal_pageCount = 0;
        //         this.sleeping = false;
        //     }
        //     // // async so we need to confirm with "mutex boolean" style logic before updating
        //     // if (this.sleeping == true) {
        //     //     this.modal_pageCount++;
        //     //     this.sleeping = false;
        //     // }
        // }
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