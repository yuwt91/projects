import React from 'react';
import ReactDom from 'react-dom';
import {Checkbox, Card, Row, Col} from 'antd';

import 'antd/lib/checkbox/style';
import 'antd/lib/card/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

export default props => (
    <Card style={ {width:300} }>
       <Row>
        <Col span={4}>
            <Checkbox checked={props.todo.completed} onChange={e => props.onChange(e,props.todo.key)} />
        </Col>
        <Col span={20}>{props.todo.title}</Col>
       </Row>
    </Card>);
