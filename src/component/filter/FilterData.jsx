import React, {Component} from 'react';
import '../../style/FilterOption.css';
import {autocomplete} from "../../api/autocomplete";
import {AutocompletionException} from "../../exception/Exception";
import SelectionFilter from "./SelectionFilter";

const fieldTypes = {TITLE:"title", LOCATIONS:"locations", PRODUCTIONCOMPANY:"productionCompany"};

class FilterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery : {},
            movieDatas: [],
            allDatas: {},
            selectedDatas : {},
        };

        this.timeout =  0;
    }

    search = (fieldTypes, query) => {
        if (this.timeout)
            clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.autoComplete(fieldTypes, query);
        }, 600);
    };

    autoComplete = (fieldType, query) => {
        let {searchQuery, allDatas} = this.state;
        searchQuery[fieldType] = query;
        this.setState({searchQuery, movieDatas:[]});

        console.log(searchQuery);

        autocomplete(searchQuery)
            .then(response => {
                if(response.status === 200)
                    return response.json();
                else
                    throw new AutocompletionException();
            }).then(body => {
                allDatas[fieldType] = this.getListByFieldType(body, fieldType);
                this.setState({allDatas, movieDatas:body});
            }).catch(ex => {
                if(ex instanceof AutocompletionException){
                    console.log("Error while trying to fetch autocompletion data.");
                }
            })
    };

    getListByFieldType = (allData, fieldType) => {
        return [...new Set(allData.map(data=>data[fieldType].trim()))];
    };

    handleChange = (fieldType, selectedValue) => {
        let {selectedDatas, searchQuery} = this.state;

        selectedDatas[fieldType] = selectedValue;
        searchQuery[fieldType] = selectedValue;
        this.setState({selectedDatas, searchQuery, allDatas:{}});
        console.log(searchQuery);
    };


    render() {
        const { allDatas, selectedDatas } = this.state;
        const size = "large";

        const titles = allDatas[fieldTypes.TITLE] === undefined ? [] : allDatas[fieldTypes.TITLE];
        const locations = allDatas[fieldTypes.LOCATIONS] === undefined ? [] : allDatas[fieldTypes.LOCATIONS];
        const productionCompany = allDatas[fieldTypes.PRODUCTIONCOMPANY] === undefined ? [] : allDatas[fieldTypes.PRODUCTIONCOMPANY];
        return (
            <div className="filter-option">
                <SelectionFilter size={size} selectedDatas={selectedDatas} fieldTypes={fieldTypes.TITLE}
                                 placeholder="Movie Name" search={this.search} handleChange={this.handleChange}
                                 optionDatas={titles}/>

                <SelectionFilter size={size} selectedDatas={selectedDatas} fieldTypes={fieldTypes.LOCATIONS}
                                 placeholder="Street Name" search={this.search} handleChange={this.handleChange}
                                 optionDatas={locations}/>

                <SelectionFilter size={size} selectedDatas={selectedDatas} fieldTypes={fieldTypes.PRODUCTIONCOMPANY}
                                 placeholder="Production Company" search={this.search} handleChange={this.handleChange}
                                 optionDatas={productionCompany}/>
                {/*<Select
                    showSearch
                    size={size}
                    value={selectedDatas[fieldTypes.TITLE] !== undefined ? selectedDatas[fieldTypes.TITLE] : undefined}
                    autoClearSearchValue
                    placeholder="Movie Name"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    notFoundContent={null}
                    filterOption={false}
                    onSearch={(value) => this.search(fieldTypes.TITLE, value)}
                    onChange={(value) => this.handleChange(fieldTypes.TITLE, value)}>
                        {titles.map((title) => (
                            <Option key={title} value={title}>{title}</Option>
                        ))}
                </Select>

                <Select
                    showSearch
                    size={size}
                    value={selectedDatas[fieldTypes.LOCATIONS] !== undefined ? selectedDatas[fieldTypes.LOCATIONS] : undefined}
                    autoClearSearchValue
                    placeholder="Street Name"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    notFoundContent={null}
                    filterOption={true}
                    onSearch={(value) => this.search(fieldTypes.LOCATIONS, value)}
                    onChange={(value) => this.handleChange(fieldTypes.LOCATIONS, value)}>
                        {locations.map((loc) => (
                            <Option key={loc} value={loc}>{loc}</Option>
                        ))}
                </Select>*/}

            </div>
        )
    }
}

export default FilterData