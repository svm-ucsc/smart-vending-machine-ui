import $ from 'jquery'

export default{
    data() {
        return{
            toggle: false,
            modal_paymentScreen: false,
            modal_pageCount: 0,
        }
    },  
    methods: {
        showCart(){
            const btn = document.getElementById('reviewOrderBtn');
            $(btn).css('visibility', 'hidden');
            this.toggle = true;
            const collapseBtn = document.getElementById('collapseCartBtn');
            $(collapseBtn).css('visibility', 'visible');
        },
        collapseCart(){
            const btn = document.getElementById('reviewOrderBtn');
            $(btn).css('visibility', 'visible');
            this.toggle = false;
            const collapseBtn = document.getElementById('collapseCartBtn');
            $(collapseBtn).css('visibility', 'hidden');

        },
        placeOrder(){
            // this.$store.commit('sendOrderToDB');
            this.$store.cartInfo = {};
        },
        onSuccess(){
            // console.log("payment went through");
            this.modal_pageCount++;

        },
        nextSplitModal(){
            this.modal_pageCount++;
            this.modal_paymentScreen = true;
                 
        },
        prevSplitModal(){
            this.modal_pageCount--;
            this.modal_paymentScreen = false;
        },
        backToHome(){
            this.modal_pageCount = 0;
        },
        costMultiplier(itemPrice, quantity){
            let dollars = (itemPrice * quantity)/100;
            dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
            // console.log(`item price passed in: ${itemPrice}`);
            return dollars;
        },

        // Need to pass by reference here,TODO
        getTotalAmount(cartInfo){
            // pass by reference taking local shopping basket and placing in Vuex, then Vuex will globally store the subtotal and then this function will grab a copy of it
            this.$store.commit('calculateTotalCost', cartInfo);
            let local_subTotal = (this.$store.subTotal)/100;
            local_subTotal = local_subTotal.toLocaleString("en-US", {style:"currency", currency:"USD"})
            return local_subTotal;
        }

        

    },
    mounted: function(){
        let nextBtn = document.querySelector('.CartItems__nextBtn');        
        if (this.modal_pageCount === 1){
            if(nextBtn){
                nextBtn.style.visibility="hidden";
            }
        }else{
            nextBtn.style.visibility="visible";
        }
    }
}