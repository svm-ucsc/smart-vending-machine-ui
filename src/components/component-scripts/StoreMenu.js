//const axios = require('axios');
export default {
  methods: {
    async fetchingNameId(){
      try {
        // const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
        // { params: { fields:["item_id", "name"].join() } });
        //const obj = response.data;
        // TEMPORARY ITEM TEST CODE
        const obj = [{"item_id":"1", "name":"Doritos", "price":"1.25", "image_url":"https://smart-vending-product-img.s3.amazonaws.com/dos+manos.jpg"},{"item_id":"2", "name":"Lays", "image_url":""},{"item_id":"3", "name":"Red Vines", "image_url":""},
                     {"item_id":"4", "name":"M&M's", "image_url":""},{"item_id":"5", "name":"Reeses", "image_url":""},{"item_id":"6", "name":"Twix", "image_url":""},
                     {"item_id":"7", "name":"Sun Chips", "image_url":""},{"item_id":"8", "name":"Ruffles", "image_url":""},{"item_id":"9", "name":"Crunch", "image_url":""},];
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