import React, {Component} from 'react';
import {Button, Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import '../style/FilterOption.css';

class FilterOption extends Component {
    render() {
        const size = "large";
        return (
            <div className="filter-option">
                <Input placeholder="Movie Name" size={size}/>
                <Input placeholder="Street Name" size={size}/>
                <Button type="primary" icon={<SearchOutlined />} size={size} />
            </div>
        )
    }
}

export default FilterOption 