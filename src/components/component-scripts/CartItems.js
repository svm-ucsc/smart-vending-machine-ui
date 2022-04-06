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
            this.$store.commit('sendOrderToDB');
        },
        nextSplitModal(){
            this.modal_pageCount++;
            this.modal_paymentScreen = true;
                 
        },
        prevSplitModal(){
            this.modal_pageCount--;
            this.modal_paymentScreen = false;
        },
        costMultiplier(itemPrice){
            let dollars = itemPrice/100;
            dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
            console.log(`item price passed in: ${itemPrice}`);
            return dollars;
        }

        

    },
    mounted: function(){
        let nextBtn = document.querySelector('.CartItems__nextBtn');
        // if(nextBtn){
        //     if((this.modal_paymentScreen == false) && ($store.state.cartInfo.length === 0)){
        //         nextBtn.style.visibility="hidden";
        //     }else{
        //         nextBtn.style.visibility="visible";
        //     }
        // }
        
        if (this.modal_pageCount === 1){
            if(nextBtn){
                nextBtn.style.visibility="hidden";
            }
        }else{
            nextBtn.style.visibility="visible";
        }
    }
}