
// 获取表单和邮箱DOM节点
const form = document.getElementById('mail_form');
const email = document.getElementById('mail');
const error = document.querySelector('#error');

// 邮箱验证正则
const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// 创建 addEventListener 的替代函数
function addEvent(element, event, callback) {
    let previousEventCallBack = element["on"+event];
    element["on"+event] = function(e) {
        const output = callback(e);
        if (output === false) return false;

        if (typeof previousEventCallBack === 'function') {
            output = previousEventCallBack(e);
            if (output === false) return false;
        }
    };

}

// 注册 window load 事件处理，判断 email 有没有填，是否符合正则要求
addEvent(window, "load", function(){
    const test = email.value.length === 0 || emailReg.test(email.value);
    email.className = test ? "valid" : "invalid";
});

// 添加 email 输入栏输入验证
addEvent(email, "input", function(){
    const test = email.value.length === 0 || emailReg.test(email.value);
    if (test) {
        email.className = "valid";
        error.innerHTML = "";
        error.className = "error";
  } else {
        email.className = "invalid";
  }
});

// 添加表单提交事件
addEvent(form, "submit", function () {
    const test = email.value.length === 0 || emailReg.test(email.value);

    if (!test) {
      email.className = "invalid";
      error.innerHTML = "请输入正确的邮件地址";
      error.className = "error active";

    } else {
      email.className = "valid";
      error.innerHTML = "";
      error.className = "error";
    }
});

