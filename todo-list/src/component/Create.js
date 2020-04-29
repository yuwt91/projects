import React from 'react';
import ReactDom from 'react-dom';
import {Input, Card} from 'antd';

import 'antd/lib/input/style';
import 'antd/lib/card/style';

export default props => (
    <Card title="请输入待办事项" style={ {width:300} }>
        <Input placeholder="请输入" onPressEnter={props.onCreate} />
    </Card>);
