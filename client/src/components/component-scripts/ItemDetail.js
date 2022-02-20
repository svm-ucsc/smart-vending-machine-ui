window.onload = function(){
    var count = 0;
    var butnUp = document.getElementById('ItemDetail-incr');
    var butnDwn = document.getElementById('ItemDetail-decr');
    if (count <= 0){
        butnDwn.classList.add("disabled");
    }
    // else{
    //     // if class exists, remove it:
    //     if(butnDwn.classList.contains("disabled")){
    //         butnDwn.classList.remove("disabled");
    //     }
    // }
    if (butnUp){
        butnUp.addEventListener("click", function() {
            var increment = document.getElementById("ItemDetail-count");
            count++;
            increment.innerHTML = count;
            // if class exists, remove it:
            if(butnDwn.classList.contains("disabled")){
                butnDwn.classList.remove("disabled");
            }
            
        });
    }
    if(butnDwn){
       
        butnDwn.addEventListener("click", function(){
            count--;
            if(count < 0){
               console.log("stop trying to go below 0 dummy"); 
               count = 0;
            butnDwn.classList.add("disabled");
            }else{
                var increment = document.getElementById("ItemDetail-count");
                increment.innerHTML = count;
            }
        });
        
       
    }
}



export default{
    props: {
        itemId: Number
    },
    data(){
        return{
            data_ready: false,
            item_data: [],
            detailsAreVisible: false,
        };
    },
    methods: {
        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        async getData() {
            try {
                // Calls the items API on this server
                let response = await fetch("/items");
                let response_data = await response.json();
                // itemId is an index
                // If the index doesn't exist dont update the data
                if(this.itemId < response_data.length) {
                    this.item_data = response_data[this.itemId];
                    this.data_ready = true;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getData();
    },
};




