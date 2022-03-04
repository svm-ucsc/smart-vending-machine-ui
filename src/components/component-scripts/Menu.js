const axios = require('axios');
export default {
  data(){
    return{
      food: [["Cheetos", "Takis", "Chips"], [ "Cadbury", "Sandwich", "Hersheys"], [ "Burgers", "Pizza", "Mojitos"]],
      foodNames: [],
      itemIDs: [],
      items: []
    };
  },

  computed:{
    filteredFoodNames() {
        return this.foodNames.filter(this.items.name.includes(this.search))
    }
  },

  async created() {
    try {
      // API call to get item_id
      // equivalent to http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item?fields=item_id
      const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
        { params: { fields: "item_id,name" } });
      const obj = response.data;
      this.items.push(obj);
      var temp = [];
      // loop to push each item_id into itemIDs data field
      for(var i = 0; i < obj.length; i++){
        this.itemIDs.push(obj[i].item_id);
        temp.push(obj[i].name);
        if(((i+1)%3) == 0){
          this.foodNames.push(temp);
          temp = [];
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}