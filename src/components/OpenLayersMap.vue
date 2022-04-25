<template>
  <ol-map style="height:400px">
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <ol-geolocation
      :projection="projection"
      @positionChanged="geoLocChange"
    >
      <template #default="slotProps">
        <ol-vector-layer :z-index="2">
          <ol-source-vector>
            <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="slotProps.position" />
              <ol-style>
                <ol-style-icon
                  :src="hereIcon"
                  :scale="0.1"
                />
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="[-122.0633153, 37.0004593]" />
          <ol-style>
            <ol-style-icon
              :src="getPinImg()"
              :scale="0.1"
            />
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="[-122.0616427, 36.9995773]" />
          <ol-style>
            <ol-style-icon
              :src="getPinImg()"
              :scale="0.1"
            />
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="[-122.0587888, 37.0014776]" />
          <ol-style>
            <ol-style-icon
              :src="getPinImg()"
              :scale="0.1"
            />
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script> 
import hereIcon from '@/assets/here.png'
import pinIcon from '@/assets/pin.png'
import {
    ref
} from 'vue'
export default {
    setup() {
        const center = ref([-122.0633153,37.0004593])
        const projection = ref('EPSG:4326')
        const zoom = ref(8)
        const rotation = ref(0)
        const view = ref(null)
        const map = ref(null)

        const geoLocChange = (loc) => {
            console.log(loc);
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
            return pinIcon;
        }
    }
}
</script>
<style>
.overlay-content {
    background: #efefef;
    box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
    padding: 10px 20px;
    font-size: 16px;
}
</style>

