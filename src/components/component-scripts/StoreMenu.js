// import { parse } from '@vue/compiler-dom';

const axios = require('axios');
export default {
    methods: {
        async fetchingNameId(){
            try {
                const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/machine', 
                    { params: { mids:["pi1"].join(), fields:["stock"].join() } });
                const obj = response.data;
                let machineParsedData = Object.keys(obj[0].stock);
                const res = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
                    { params: { iids:machineParsedData, fields:["item_id", "name","nutrition_url", "cost", "image_url"].join() } });
            
                let itemParsedData = res.data;
                let dataPlaceHolder = [];
                let chunk = 3; // 3 items displayed per row
                let i,j;
                for (i = 0,j = itemParsedData.length; i < j; i += chunk) {
                    dataPlaceHolder = itemParsedData.slice(i,i+chunk);
                    console.log(dataPlaceHolder);
                    this.nameIdSet.push(dataPlaceHolder); // push the (food, id, cost) as a set together
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