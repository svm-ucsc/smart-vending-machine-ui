import hereIcon from '@/assets/here.png'
import pinIcon from '@/assets/pin.png'
import {ref} from 'vue'

export default {
    props: { 
        locations: Object,
        loc_num: Number
    },
    setup() {
        const center = ref([-122.0633153,37.0004593])
        const projection = ref('EPSG:4326')
        const zoom = ref(8)
        const rotation = ref(0)
        const view = ref(null)
        const map = ref(null)

        const geoLocChange = (loc) => {
            view.value.fit([loc[0], loc[1], loc[0], loc[1]], {
                maxZoom: 14
            })
        }

        return {
            center,
            projection,
            zoom,
            rotation,
            hereIcon,
            view,
            map,
            geoLocChange,
        }
    },
    methods:{
        getPinImg(){
            // console.log(this.locations[0]["latitude"])
            return pinIcon;
        },
        getCoordinates(location){
            console.log(location)
            const coordinates = [location["longitude"], location["latitude"]]
            return coordinates
        }
    }
}
