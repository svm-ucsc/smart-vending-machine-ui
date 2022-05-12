// import { parse } from '@vue/compiler-dom';
import { mapGetters } from 'vuex'
const axios = require('axios');
export default {
    data(){
        return{
            nameIdSet: [] // an array that holds an object. each object holds a foodname and foodID and foodcost
        }
    },
    
    computed: {
        ...mapGetters({
            machine_id: 'checkMachineID'
        })
    },
    watch:{
        machine_id(){
            this.fetchingNameId()
        },
    },
    methods: {
        async fetchingNameId(){
            this.nameIdSet = []
            try {
                const machine_id = this.machine_id
                const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/machine', 
                    { params: { mids:machine_id, fields:["stock"].join() } });
                const obj = response.data
                if(obj.length === 0){return null}
                let machineParsedData = Object.keys(obj[0].stock);
                let quantityParsedData = Object.values(obj[0].stock);
                const res = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
                    { params: { iids:machineParsedData.join(), fields:["item_id", "name","nutrition_url", "cost", "image_url"].join()} });
                let itemParsedData = res.data;
                let dataPlaceHolder = [];
                let i,j;
  
                for (i = 0,j = itemParsedData.length; i < j; i+=2) {
                    if((i == j - 1) && (j % 2 != 0)){                        
                        itemParsedData[i].quantity = quantityParsedData[i];
                        let temp = itemParsedData.slice(i, i+1);
                        this.nameIdSet.push(temp);
                        continue;
                    }
                    itemParsedData[i].quantity = quantityParsedData[i];
                    itemParsedData[i+1].quantity = quantityParsedData[i+1];
                    dataPlaceHolder = itemParsedData.slice(i, i+2);
                    this.nameIdSet.push(dataPlaceHolder); // push the (food, id, cost) as a set together
                }     
            } catch (e) {
                console.log(e)
                console.log("Error StoreMenu.js " + e);
            }
        },
    },

    created(){
        this.fetchingNameId();
        this.$store.commit('initMode');
    }

}