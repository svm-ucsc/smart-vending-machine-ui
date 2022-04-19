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
            // copy order to a receipt list prior to the reset of content
            for (let i of this.$store.state.cartInfo) {
                this.cartReceipt.push(i);
            }
            this.$store.commit('sendOrderToDB');
        },
        onSuccess() {
            this.modal_pageCount++;

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
            local_subTotal = local_subTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })
            return local_subTotal;
        },
        async sleepingFcn() {
            this.sleeping = true;
            await new Promise(resolve => setTimeout(resolve, 3000));
            // async so we need to confirm with "mutex boolean" style logic before updating
            if (this.sleeping == true) {
                this.modal_pageCount++;
                this.sleeping = false;

            }
            // else: there was an interrupt so it goes back to default and will need to reverify inventory if user decides to update cart
        }
    },
    mounted: function () {
        // need arrow operator because the scope of "this" changes otherwise
        // any time the modal is clicked out of, we reset the modal page counter
        document.getElementById('cartModalReviewScreen').addEventListener("hidden.bs.modal", () => {
            this.modal_pageCount = 0;
            this.sleeping = false;

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