import React, {Component} from 'react';
import 'ol/ol.css';
import {Feature, Map, View} from 'ol';
import {Icon, Style} from 'ol/style';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point";
import imageLogo from '../../images/marker_32.ico'

const data = [
    {name:"Epic Roasthouse (399 Embarcadero)", lat:37.7907487, long:-122.3893537},
    {name:"Mason & California Streets (Nob Hill)", lat:37.7932622, long:-122.415249},
    {name:"Rainforest Café (145 Jefferson Street)", lat:37.8081859, long:-122.4148792},
];
class MapLayout extends Component {
    componentDidMount() {
        let longitude = -122.431297, latitude = 37.773972;
        let sanfrancisco  = fromLonLat([longitude, latitude]);
        this.map = new Map({
            target: 'map-div',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: sanfrancisco,
                zoom: 13
            })
        });

        data.forEach(d => this.addMarker(d.long, d.lat));
        // this.addMarker(longitude, latitude);
    }

    addMarker = (long, lat) => {
        let sanfrancisco  = fromLonLat([long, lat]);

        let iconFeature = new Feature({
            geometry: new Point(sanfrancisco),
            name: 'Null Island',
        });
        var iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                // src: 'data/icon.png',
                src: imageLogo,
                scale:1.5
            })
        });
        iconFeature.setStyle(iconStyle);

        let vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [iconFeature]
            })
        });

        /*let layer = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point(sanfrancisco),
                        name: 'San Fracisco',
                    })
                ]
            })
        });*/
        // return vectorLayer;
        this.map.addLayer(vectorLayer);
    };



    render() {
        return (
            <div className="map-area" id="map-div"> </div>
            /*<div className="parent-div">
                <FilterData/>
                <div className="child-div" id="map-div"> </div>
            </div>*/
        )
    }
}

export default MapLayout