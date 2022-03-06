import $ from 'jquery'

export default{
  data() {
    return{
      toggle: false
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
    }
    
  } 
}