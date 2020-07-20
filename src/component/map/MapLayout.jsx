import React, {Component} from 'react';
import 'ol/ol.css';
import {Feature, Map, Overlay, View} from 'ol';
import {Icon, Style} from 'ol/style';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point";
import {connect} from "react-redux";
import '../../style/MapLayout.css';
import markerImage from '../../images/marker.png';

class MapLayout extends Component {
    constructor() {
        super();
        this.vectorLayers = [];
        this.popupRef = React.createRef();
        this.popupContent = React.createRef();
    }
    componentDidMount() {
        this.createMap();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.refreshMarkers();
    }

    /* Initializing the Open Layer Map with San Francisco as the center. */
    createMap = () => {
        let lon = -122.431297, lat = 37.773972;
        let sanfrancisco  = fromLonLat([lon, lat]);
        let center = new View({
            center: sanfrancisco,
            zoom: 12
        });
        this.map = new Map({
            target: 'map-div',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: center
        });
        this.createPopup();
    };

    /* Refreshing the markers. This method will be called each time when user updates the filter parameters. */
    refreshMarkers = () => {
        /* Removing the previous marker layer from open layer. */
        this.vectorLayers.forEach(layer =>{
            this.map.removeLayer(layer);
        });
        this.vectorLayers = [];

        /* New Movie Data for plotting the marker on map. */
        let movieData = this.props.movieDatas;
        movieData.forEach(data => this.addMarker(parseFloat(data.longitude),
            parseFloat(data.latitude), this.getDescription(data)));
    };

    /* Popup Content in proper format. */
    getDescription = (data) => {
        let description =  Object.keys(data).map(key =>{
            if(key !== 'id' && key !== 'latitude' && key !== 'longitude' && key !== 'funFacts'){
                if(data[key] !== '')
                    return '<b>' + key.substr(0,1).toUpperCase() + key.substring(1) + '</b> : ' + data[key] + '<br/>';
            }
            return '';
        });
        return description.join('');
    };

    /* Pinning the new Marker based on provided coordinates. */
    addMarker = (long, lat, description) => {
        let locationCoordinates  = fromLonLat([long, lat]);

        let iconFeature = new Feature({
            geometry: new Point(locationCoordinates),
            type: 'click',
            desc: description,
        });
        let iconStyle = new Style({
            image: new Icon({
                src: markerImage,
                // src: 'https://raw.githubusercontent.com/jonataswalker/map-utils/master/images/marker.png',
                scale:0.7
            })
        });
        iconFeature.setStyle(iconStyle);

        let vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [iconFeature]
            })
        });
        this.vectorLayers.push(vectorLayer);
        this.map.addLayer(vectorLayer);
    };

    /* Popup Configuration. Will display popup when user hovers over the markers. */
    createPopup = () => {
        let popup = new Overlay({
            element: this.popupRef.current,
            positioning: 'center-center',
            stopEvent: false,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        this.map.addOverlay(popup);

        /* Add a pointermove handler to the map to render the popup.*/
        this.map.on('pointermove', (evt) => {
            let feature = this.map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {return feat;});
            if(feature){
                let coordinates = feature.values_.geometry.flatCoordinates;
                let content = this.popupContent.current;
                content.innerHTML = feature.values_.desc;
                popup.setPosition(coordinates);
            }
            else {
                popup.setPosition(undefined);
            }
        });
    };

    render() {
        return (
            <>
                <div className="map-area" id="map-div"> </div>
                <div id = "popup" ref={this.popupRef} className = "ol-popup" >
                    <div id="popup-content" ref={this.popupContent}/>
                </div>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        movieDatas : state.loadMovieData
    }
};

export default connect(mapStateToProps)(MapLayout);