// ## 3. 高阶函数练习（1）
// ### Array.sort()
// sort 是个高阶函数，它接受一个可选的比较函数，比较函数的逻辑实现如下：

let compareFunction = (a,b) => { // a, b 是 sort 传给比较函数的数组中的元素
    // 在用户给定的规则下，a<b, 返回 -1，排序后 a 出现在 b 前面
    if (a < b)
        return -1;
    
    // 在用户给定的规则下，a>b, 返回 1，排序后 a 出现在 b 后面
    if (a > b)
        return 1;
    
    // 此外，a==b ，返回0
    return 0;
}

const people = [
    {number:1, firstname:'aaFirstName', lastname:'cclastName'},
    {number:2, firstname:'ccFirstName', lastname:'aalastName'},
    {number:3, firstname:'bbFirstName', lastname:'bblastName'}
]

// 对people 数组中元素按照 firstname 从小到大顺序排列
people.sort(
    (a, b) => {
        return a.firstname < b.firstname ? -1 : a.firstname > b.firstname ? 1 : 0;
    }
);

// 对people 数组中元素按照 lastname 从小到大顺序排列

people.sort(
    (a, b) => {
        return a.lastname < b.lastname ? -1 : a.lastname > b.lastname ? 1 : 0;
    }
);

// 上述代码重复了很多，能否把重复的部分抽象成一个函数，使之可以这样调用 people.sort(sortBy(people[0].firstname))
// 即 sortBy 函数接受一个属性(字符串类型)，作为排序的参照，返回一个比较函数
// 返回的比较函数是一个闭包，能访问它外部函数的参数，并且在它的生命周期内一直保留这些值
const sortBy = (property) => {
    return (a,b) => {
        let result = a[property] < b[property] ? -1: a[property] > b[property] ? 1:0;
        return result;
    };
};

people.sort(sortBy('number'));

// console.log(people);

// ##4. 闭包和高阶函数练习（2）

// ### 4.1 unary 函数（一元化函数）
// 有一个数字，元素是字符串，想把它转为数字，直接这么写达不到效果：

['1','2','3'].map(parseInt); // 结果是 [1,NaN,NaN]

// 因为 map 调用回调函数时，依次传入三个参数：element,index,arr
// parseInt 函数接受两个参数, string,radixe, map 把 index 的值作为 radixe 参数传入 parseInt，结果只有第一个数转换正常，radix 为 0 ，以十进制解析字符串
// 我们构建一个一元化函数，它接受一个多参数的函数，返回一个它的单参数版本

const unary = (fn) => {
    return fn.length === 1 ? fn : (arg) => fn(arg); 
    // 判断 fn 的参数是否是1，是则返回它，不是则返回一个该函数的复制，该复制只接受一个参数。
}

['1','2','3'].map(unary(parseInt)); // 结果是 [1,2,3]

// ### 4.2 只执行一次函数 once
// 把一个函数进行封装，使之只能执行一次，once 接受一个函数，返回一个带状态的函数的复制，状态记录知否执行过
const once = (fn) => {
    let done = false;

    return () => {
        return done ? undefined : ((done = true), fn.apply(this,arguments)) // done 是true，则返回undefined，否则设done 为true，并返回fn 调用 apply 的结果(为什么不直接返回调用fn 的结果？)
    };
};

var doPayment = once(() => {
    console.log('Payment is done');
});

// doPayment(); // 'Payment is done'
// doPayment(); // undefined

// ## 5. 处理数组的高阶函数
// ### 5.1 reduce() 函数
// reduce 用于把拥有多个元素的数组，处理成单个元素。
// reduce 不写具体的处理数组的逻辑，它只是接收一个待处理的处理，一个用于传进来的函数，然后遍历数组，调用回调函数，并输出一个单一元素的数组。
const reduce = (arr, fn, initialValue) => {
    let acc;

    // 如果没有传入起始值，默认取数组第一个元素为起始值，存入累计值 acc
    if (initialValue) { acc = initialValue } 
    else { acc = arr[0]; } 
    
    if (initialValue === undefined) {
        for (let i=1, len=arr.length; i<len; i++) {
            acc = fn(arr[i],acc);
        }
    } else {
        for (const value of arr) {
            acc = fn(value,acc);
        }
    }
    console.log('结果是' + acc);
    return [acc];
};

// 测试
// reduce([1,2,3,4,5],(ele,acc)=> ele*acc ); // 120
// reduce([1,2,3,4,5],(ele,acc)=> ele+acc ); // 15

// ### 5.2 concatAll 函数
// concatAll 用来把含有多层嵌套的数组，摊平成一维数组
// 它接收一个数组，返回一个摊平后的数组
const concatAll = (arr) => {
    let newArr = [];
    for (const value of arr) {
        console.log('原数组里有这些值' + value);
        newArr.push.apply(newArr, [value]); // 注：apply 第二个参数需要是数组
        // 这和 newArr.push(value) 看上去没什么区别啊
    }
    console.log('摊平后的数组是' + newArr);
    return newArr;
};


const oriArr = [
    {name:'james'},
    [{name:'ales'},{name:'tom'}],
    [[{name:'haha'},{name:'yes'}],{name:'jone'}]
];

concatAll(oriArr);




