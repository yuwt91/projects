import React from 'react';
import ReactDom from 'react-dom';

// 添加子元素,在 React 中叫组件
class Toggle extends React.Component {

  state = {
    flag: true
  }

  handleClick(event) {
    let x = event.target;
    alert(`触发元素的 id 是 ${x.id}`);
    this.setState({flag:!this.state.flag});
  }

  render(){
    let text = this.state.flag ? 'true':'false';
    return (<div id="id1" onClick={this.handleClick.bind(this)}>点击我会触发一个弹窗事件。<br />
    flag: {text}
    </div>
   );
  }
}


class Root extends React.Component {
  render() {
    return (
    <div>
      <h2>Hello, world!</h2>
      <br />
      <Toggle />
      </div>);
    // return React.createElement('div', null, 'Welcome to Magedu.');
  }
}

// ReactDom.render(React.createElement(Root), document.getElementById('root'));
ReactDom.render(<Root />, document.getElementById('root'));