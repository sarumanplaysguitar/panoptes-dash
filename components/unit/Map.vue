<script setup>
    import { defineProps, ref, onMounted } from "vue";
    import * as d3 from "d3"; // actually using: select, json, geoPath, geoNaturalEarth1
    import { feature } from "topojson-client";

    // TODO get unit lat and long here as a prop
    const coordinates = [-118, 34] // placeholder long, lat

    onMounted(() => {
        // Initialize map when component loads
        initializeMap();
    });

    // D3 world map
    // Use Natural Earth projection (https://d3js.org/d3-geo/cylindrical#geoNaturalEarth1)
    // & world-atlas package for TopoJSON (https://www.npmjs.com/package/world-atlas)
    const mapperooni = ref(null);

    function initializeMap() {
        const container = d3.select(mapperooni.value);
        const width = 250;
        const height = 130;
        // any other styling vars define em here

        // Append SVG to the container
        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        // set up instances of geoPath & geoNaturalEarth1
        const projection = d3.geoNaturalEarth1()
            .scale(45)
            .translate([width / 2, height / 2]);
        const pathGenerator = d3.geoPath().projection(projection);

        // the lines
        // const graticule = d3.geoGraticule();

        // returns a promise; get topoJSON in memory
        // then need to convert it to geoJSON using topoJSON library
        d3.json("https://unpkg.com/world-atlas@1/world/110m.json")
            .then(data => {
                // putting together the map.
                const countries = feature(data, data.objects.countries);
                // console.log(countries);

                // projection outline
                svg.append("path")
                    .datum({ type: "Sphere" })
                    .attr("d", pathGenerator)
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-width", 1.5)
                    .attr("stroke-opacity", 0.35);

                // that thing is an array. there is a path for each country

                // set up data join for the paths
                const paths = svg.selectAll("path")
                    .data(countries.features);

                // need to set the d attribute for each of these paths based on the country
                paths.enter().append("path")
                    .attr("d", d => pathGenerator(d))
                    .attr("stroke", "white")
                    .attr("stroke-width", 0.05)
                    .attr("stroke-opacity", 0.35)
                    .attr("fill", "white")
                    .style("fill-opacity", 0.35);

                // drop the unit's location pin
                const [pin_x, pin_y] = projection(coordinates);
                const pin_scale_fac = 0.07;
                // note, if you want to change the svg color
                // you can open location_pin.svg in any text editor
                // and change the two instances of its fill hexcode "#..."
                svg.append("image")
                    .attr("href", "/location_pin.svg")
                    .attr("x", pin_x - (pin_scale_fac * 161/2))
                    .attr("y", pin_y - pin_scale_fac * 253)
                    .attr("width", pin_scale_fac * 161)
                    .attr("height", pin_scale_fac * 253)
                    .style("opacity", 0.8);
            });
    }

    
</script>

<template>
    <!-- <div class="w-48 h-24 rounded-full ring-[#ffffff] ring-2 opacity-20"></div> -->
    <div 
        class="map-container" 
        ref="mapperooni">
    </div>
</template>

<style scoped>
    .map-container {
        z-index: 100;
        opacity: 1;
    }
</style>