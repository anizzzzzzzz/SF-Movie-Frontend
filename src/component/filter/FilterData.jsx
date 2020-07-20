import React, {Component} from 'react';
import '../../style/FilterOption.css';
import {autocomplete} from "../../api/moviedata";
import {AutocompletionException} from "../../exception/Exception";
import SelectionFilter from "./SelectionFilter";
import {Button} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {storeMovieData} from "../../redux/action/MovieAction";
import {isMobile} from 'react-device-detect';

const fieldTypes = {TITLE:"title", LOCATIONS:"locations", PRODUCTIONCOMPANY:"productionCompany", WRITER:"writer",
    ACTOR1:"actor1", ACTOR2:"actor2", ACTOR3:"actor3"};

const MAXITEMS = isMobile? 0 : 4;

class FilterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery : {},
            allDatas: {},
            selectedDatas : {},
            seeAllFilters : false
        };
        /* Timeout for user typing. */
        this.timeout =  0;
    }

    /* Will fetch autocomplete service.
    * Added timeout setting so it will fetch the api after 2 seconds.*/
    search = (fieldTypes, query) => {
        if (this.timeout)
            clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.autoComplete(fieldTypes, query);
        }, 2000);
    };

    /* Fetching the Autocompletion API */
    autoComplete = (fieldType, query, storingInRedux=false) => {
        let {searchQuery, allDatas} = this.state;
        if(!storingInRedux){
            searchQuery[fieldType] = query;
            this.setState({searchQuery});
        }
        autocomplete(searchQuery)
            .then(response => {
                if(response.status === 200)
                    return response.json();
                else
                    throw new AutocompletionException();
            }).then(body => {
                if(storingInRedux){
                    this.props.saveMovieData(body);
                }else{
                    allDatas[fieldType] = this.getListByFieldType(body, fieldType);
                    this.setState({allDatas});
                }
            }).catch(ex => {
                if(ex instanceof AutocompletionException){
                    console.log("Error while trying to fetch autocompletion data.");
                }
            })
    };

    getListByFieldType = (allData, fieldType) => {
        return [...new Set(allData.map(data=>data[fieldType].trim()))];
    };

    /* This method will be called when user selects a option from auto suggestion. */
    handleChange = (fieldType, selectedValue) => {
        let {selectedDatas, searchQuery} = this.state;

        selectedDatas[fieldType] = selectedValue;
        searchQuery[fieldType] = selectedValue;
        this.setState({selectedDatas, searchQuery, allDatas:{}});
        /* Calling API for getting the Location data to plot it in map.
        This is need to plot the marker when user selects one of the options from auto suggested data. */
        this.autoComplete('', searchQuery, true);
    };

    /* Toggle the Filter Options Input Fields. */
    seeMoreFilterToggle = () => {
        this.setState({ seeAllFilters: !this.state.seeAllFilters });
    };

    /* Will clear the filter texts from all the Filter Options Input Fields. */
    clearAllFilters = () => {
        this.setState({searchQuery:{}, allDatas: {}, selectedDatas : {},})
    };

    /* Method for rendering SelectionFilter view preventing duplication of code. */
    renderItems = () => {
        const { allDatas, selectedDatas } = this.state;
        const size = "large";

        const titles = allDatas[fieldTypes.TITLE] === undefined ? [] : allDatas[fieldTypes.TITLE];
        const locations = allDatas[fieldTypes.LOCATIONS] === undefined ? [] : allDatas[fieldTypes.LOCATIONS];
        const productionCompany = allDatas[fieldTypes.PRODUCTIONCOMPANY] === undefined ? [] : allDatas[fieldTypes.PRODUCTIONCOMPANY];
        const writers = allDatas[fieldTypes.WRITER] === undefined ? [] : allDatas[fieldTypes.WRITER];
        const actor1 = allDatas[fieldTypes.ACTOR1] === undefined ? [] : allDatas[fieldTypes.ACTOR1];
        const actor2 = allDatas[fieldTypes.ACTOR2] === undefined ? [] : allDatas[fieldTypes.ACTOR2];
        const actor3 = allDatas[fieldTypes.ACTOR3] === undefined ? [] : allDatas[fieldTypes.ACTOR3];

        let renderingItems = [];
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.TITLE, "Movie Title", titles, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.LOCATIONS, "Street Name", locations, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.WRITER, "Writer", writers, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.ACTOR1, "Actor1 Name", actor1, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.PRODUCTIONCOMPANY, "Production Company", productionCompany, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.ACTOR2, "Actor2 Name", actor2, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.ACTOR3, "Actor3 Name", actor3, size));

        if(this.state.seeAllFilters)
            return renderingItems;
        return renderingItems.slice(0, MAXITEMS);
    };

    getRenderingData = (selectedDatas, fieldType, placeholder, optionDatas, size) => {
        return (
            <SelectionFilter key={placeholder} size={size} selectedDatas={selectedDatas} fieldTypes={fieldType}
                             placeholder={placeholder} search={this.search} handleChange={this.handleChange}
                             optionDatas={optionDatas}/>
        );
    };


    render() {
        return (
            <div className="filter-option">
                {this.renderItems().map(item => item)}
                <Button type="primary" onClick={this.seeMoreFilterToggle}>{this.state.seeAllFilters?'Show Less Filters':'Show More Filters'}</Button>
                <Button type="danger" onClick={this.clearAllFilters} icon={<DeleteOutlined />}>Clear All</Button>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveMovieData : storeMovieData
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(FilterData)