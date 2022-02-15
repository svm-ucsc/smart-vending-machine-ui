export default{
    data(){
        return{
            detailsAreVisible: false,
            food:{
                name: 'Cheetos',
                description: 'Crunchy Orange Stick',
                calories: 100
            }
            // food:{
            //     name: 'Lays Potato Chips',
            //     description: 'Potato Crips',
            //     calories: 200
            // }
        };
    },
    methods: {
        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        }
    }
};