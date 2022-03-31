import $ from 'jquery'

export default{
    data() {
        return{
            toggle: false,
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
            
            let nextBtn = document.querySelector('.CartItems__nextBtn');
            if(this.modal_pageCount === 1){
                nextBtn.classList.add("disabled");
                // if validation successful, increment counter and remove disabled class
                                // nextBtn.classList.remove("disabled");
                
            }else{
                this.modal_pageCount++;
            }            
        },
        prevSplitModal(){
            this.modal_pageCount--;
            let nextBtn = document.querySelector('.CartItems__nextBtn');
            nextBtn.classList.remove("disabled");
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