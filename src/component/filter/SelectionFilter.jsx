import React from 'react';
import {Select} from "antd";

const { Option } = Select;

export default (props) => (
    <Select
        showSearch
        size={props.size}
        value={props.selectedDatas[props.fieldTypes] !== undefined ? props.selectedDatas[props.fieldTypes] : undefined}
        autoClearSearchValue
        placeholder= {props.placeholder}
        defaultActiveFirstOption={false}
        showArrow={false}
        notFoundContent={null}
        filterOption={false}
        onSearch={(value) => props.search(props.fieldTypes, value)}
        onChange={(value) => props.handleChange(props.fieldTypes, value)}>
        {props.optionDatas.map((title) => (
            <Option key={title} value={title}>{title}</Option>
        ))}
    </Select>
)