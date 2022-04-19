import $ from 'jquery'
const axios = require('axios');
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
            local_subTotal = local_subTotal.toLocaleString("en-US", {style:"currency", currency:"USD"})
            return local_subTotal;
        },
        async demoOrder(){
            try{
                let orderObj = {itemId: 'd016', quantity: '2'}
                console.log(orderObj)
                await axios.post('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/order/',
                
                    {"machine_id": "pi1", "items": orderObj} //, "totalCost": this.subTotal}
                    // right now the post request will fail because the API cannot handle the subTotal receipt yet
                )
            }catch(e){
                console.log("Error (main.js): Cannot place the order")
            }
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