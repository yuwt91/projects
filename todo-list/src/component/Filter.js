import React from 'react';
import ReactDom from 'react-dom';
import {Select, Card, Row, Col} from 'antd';

import 'antd/lib/select/style';
import 'antd/lib/card/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

const Option = Select.Option; 

// 过滤
export default props => (
    <Card style={ {width:300} }>
       <Row>
        <Col span={4}></Col>
        <Col span={20}>
            <Select defaultValue="uncompleted" onChange={props.onChange}>
                <Option value="all">全部显示</Option>
                <Option value="completed">已完成</Option>
                <Option value="uncompleted">未完成</Option>
            </Select>
        </Col>
       </Row>
    </Card>);
