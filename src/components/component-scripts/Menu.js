const axios = require('axios');
export default {
  data(){
    return{
      food: [["Cheetos", "Takis", "Chips"], [ "Cadbury", "Sandwich", "Hersheys"], [ "Burgers", "Pizza", "Mojitos"]],
      foodNames: [],
      itemIDs: []
    };
  },

  async created() {
    try {
      // API call to get item_id
      // equivalent to http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item?fields=item_id
      const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
        { params: { fields: "item_id,name" } });
      const obj = response.data;
      var temp = [];
      // loop to push each item_id into itemIDs data field
      for(var i = 0; i < obj.length; i++){
        this.itemIDs.push(obj[i].item_id);
        temp.push(obj[i].name);
      }
      this.foodNames.push(temp);
      // console.log(this.foodNames);
      // console.log(this.food);
      
    } catch (e) {
      console.log(e);
    }
  }
  // methods:{
    
  
    // getFoodNames(){
    //   try{

    //   } catch(e){
    //     console.log(e).
    //   }
    // }
  
}