// 获取 form > input 对象
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

// 在手机号输入框的 blur 事件上注册手机号验证函数
// 手机号输入框的后面加了一个 span 用来呈现正确或错误信息
// 通过正则验证，则呈现对号按钮，学名叫 White Heavy Check Mark
// 没通过验证，则呈现错误文字提示。更好的体验是，对手机号增则中的单条规则呈现错误提示，如输入12开头，则提示，请输入13/15/18 开头的手机号
tel.blur(function(){
    if (telReg.test(this.value)) {
        $('#tel + span').empty().html('✅'); // 清除已有的提示，增加新的提示内容
    } else {
        $('#tel + span').empty().html('请输入正确的手机号');
    }
});

// 在密码输入框的 blur 事件上注册手机号验证函数
psw.blur(function(){
    if (pswReg.test(this.value)) {
        $('#psw + span').empty().html('✅');
    } else {
        $('#psw + span').empty().html('密码至少8位，至少包含1个字母和数字');
    }
});

// 在邮箱输入框 blur 事件上注册邮箱验证函数
mail.blur(function(){
    if (mailReg.test(this.value)) {
        $('#mail + span').empty().html('✅');
    } else {
        $('#mail + span').empty().html('请输入正确的邮箱地址');
    }

});

function valideBeforeSend(data) {
    if ($('#tel + span').html() === '✅' && $('#psw + span').html() === '✅' && $('#mail + span').html() === '✅' ) {
        sendData(data);
    } else {
        $('button + span').html('请填写正确的手机、密码和邮箱')
    }
}

function sendData(data) {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    for( name in data ) {
        fd.append( name, data[ name ] );
      }
    
    xhr.addEventListener( 'load', function( event ) {
        alert( 'Yeah! Data sent and response loaded.' );
    });

    xhr.addEventListener(' error', function( event ) {
        alert( 'Oops! Something went wrong.' );
    });

    xhr.open( 'POST', 'https://example.com/cors.php' );

    xhr.send(fd);
}

// 注册 btn 按钮提交事件
btn.click(function(){
    valideBeforeSend( {test:'haha'} );
});

