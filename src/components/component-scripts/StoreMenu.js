//const axios = require('axios');
export default {
  methods: {
    async fetchingNameId(){
      try {
        // const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
        // { params: { fields:["item_id", "name"].join() } });
        //const obj = response.data;
        // TEMPORARY ITEM TEST CODE
        const obj = [{"item_id":"1", "name":"Doritos", "price":"1.25", "image_url":"https://world.openfoodfacts.org/images/products/871/039/860/0332/front_de.35.full.jpg"},
                     {"item_id":"2", "name":"Lays", "price":"1.25", "image_url":"https://upload.wikimedia.org/wikipedia/commons/0/07/2020-07-22_11_14_32_A_bag_of_Lay%27s_Classic_Potato_Chips_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg "},
                     {"item_id":"3", "name":"Fritos", "price":"1.25", "image_url":"https://world.openfoodfacts.org/images/products/002/840/004/7951/front_en.12.full.jpg"},
                     {"item_id":"7", "name":"Sun Chips", "price":"1.25", "image_url":"https://world.openfoodfacts.org/images/products/007/797/502/2047/front_en.17.full.jpg"},
                     {"item_id":"8", "name":"Ruffles", "price":"1.25", "image_url":"https://world.openfoodfacts.org/images/products/002/840/015/9630/front_en.10.full.jpg"},
                     {"item_id":"9", "name":"Cheetos", "price":"1.25", "image_url":"https://world.openfoodfacts.org/images/products/002/840/058/9864/front_en.23.full.jpg"},
                     {"item_id":"4", "name":"M&M's", "price":"2.25", "image_url":"https://world.openfoodfacts.org/images/products/40111490/front_en.101.full.jpg"},
                     {"item_id":"5", "name":"Reeses", "price":"2.25", "image_url":"https://world.openfoodfacts.org/images/products/643/005/769/0796/front_fi.12.full.jpg"},
                     {"item_id":"6", "name":"Twix", "price":"2.25", "image_url":"https://world.openfoodfacts.org/images/products/500/015/945/1666/front_en.60.full.jpg"},];
        let parsedData = obj;
        let dataPlaceHolder = [];
        let chunk = 3; // 3 items displayed per row
        let i,j;
        for (i = 0,j = parsedData.length; i < j; i += chunk) {
          dataPlaceHolder = parsedData.slice(i,i+chunk);
          this.nameIdSet.push(dataPlaceHolder); // push the (food, id) as a set together
        }        
      } catch (e) {
        console.log("Error");
        console.log(e);
        console.log(e.response);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      }
    },
  },
  

  data(){
    return{
      nameIdSet: [] // an array that holds an object. each object holds a foodname and foodID
    };
  },

  created(){
    this.fetchingNameId();
  }

}