export default{
    props: { 
        itemId: Number,
        foodName: String
    },
    data(){
        return{
            foodNames: [["Cheetos", "Takis", "Chips"], [ "Cadbury", "Sandwich", "Hersheys"], [ "Burgers", "Pizza", "Mojitos"]]

        };
    },
    methods: {

        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        
    }
};