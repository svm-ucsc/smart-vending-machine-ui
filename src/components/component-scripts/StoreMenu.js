const axios = require('axios');
export default {
    methods: {
        async fetchingNameId(){
            try {
                const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
                    { params: { fields:["item_id", "cost", "name"].join() } });
                const obj = response.data;

   

                let parsedData = obj;
                let dataPlaceHolder = [];
                let chunk = 3; // 3 items displayed per row
                let i,j;
                for (i = 0,j = parsedData.length; i < j; i += chunk) {
                    dataPlaceHolder = parsedData.slice(i,i+chunk);
                    this.nameIdSet.push(dataPlaceHolder); // push the (food, id, cost) as a set together
                    //   console.log(`stuff: ${JSON.stringify(parsedData)}`)
                }        
            } catch (e) {
                console.log("Error");
            }
        },
    },
  

    data(){
        return{
            nameIdSet: [] // an array that holds an object. each object holds a foodname and foodID and foodcost
        };
    },

    created(){
        this.fetchingNameId();
    }

}