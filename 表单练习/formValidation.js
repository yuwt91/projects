
const tel = $('#tel');
const psw = $('#psw');
const mail = $('#mail');
const btn = $('button');

// 手机号验证正则
const telReg = /^1(3|5|8)\d{9}$/; // 1开头，第二位是3/5/8中的任意一个，\d 表示数字0-9，{9}表示9个

// 密码验证正则
// 至少8个字符，至少1个小写字母，1个数字，其他可以任意字符
const pswReg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;


// 邮箱验证正则
// 左边可以是数字、字母、下划线、英语点号、表示成：[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*
// 右边是域名，可以有数字、字母、短横线、英语点号，顶级域名一般2-6个字符，表示成：
// ([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}
const mailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;


tel.blur(function(){
    if (telReg.test(this.value)) {
        $('#tel + span').empty().html('✅');
    } else {
        $('#tel + span').empty().html('请输入正确的手机号').css('color','red');
    }
});

psw.blur(function(){

});

mail.blur(function(){

});

