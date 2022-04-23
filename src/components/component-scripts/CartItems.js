import $ from 'jquery'

export default{
    data() {
        return{
            toggle: false,
            modal_paymentScreen: false,
            modal_pageCount: 0,
            cartReceipt: []
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
            // copy order to a receipt list prior to the reset of content
            for(let i of this.$store.state.cartInfo){
                this.cartReceipt.push(i);
            }
            this.$store.commit('sendOrderToDB');            
        },
        onSuccess(){
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
            return dollars;
        },
        getTotalAmount(cartInfo){
            // pass by reference taking local shopping basket and placing in Vuex, then Vuex will globally store the subtotal and then this function will grab a copy of it
            this.$store.commit('calculateTotalCost', cartInfo);
            let local_subTotal = (this.$store.subTotal)/100;
            local_subTotal = local_subTotal.toLocaleString("en-US", {style:"currency", currency:"USD"});
            return local_subTotal;
        },
        devMode(){
            this.$store.commit('switchMode'); 
        }
    },
    mounted: function(){
        // need arrow operator because the scope of "this" changes otherwise
        // any time the modal is clicked out of, we reset the modal page counter
        document.getElementById('cartModalReviewScreen').addEventListener("hidden.bs.modal",() => {
            this.modal_pageCount = 0;          
        });

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