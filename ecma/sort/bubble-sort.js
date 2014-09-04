/**
 * 描述：
 * 1.比较相邻的元素，如果第一个比第二个大，则交换。
 * 2.对len-i做同样的工作，这时最大的数就拍到了最后的位置上。
 * 3.对多有元素重复做以上的步骤
 * 4.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较
 */
var bubbleSort = function ( arr ) {
    var tmp
    , len = arr.length;

    for ( var i = 0; i < len; i++ ) {
        console.log('begin: i = ', i);
        for ( var j = 1; j < len - i; j++ ) {
            console.log('   j = ', j);
            if ( arr[j-1] > arr[j] ) {
                tmp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = tmp;
            }
        }
        console.log('end: i = ', i);
    }
    return arr;
};
// console.dir( bubbleSort([3,1,7,5,2]) );

/**
 * 优化方案1
 * 加了一个状态标记
 * 如果在某一趟遍历没有数据可以交换，说明已经排序好了
 * 不需要迭代了，直接退出循环
 */
var bubbleSort1 = function ( arr ) {
    var tmp
    , len = arr.length
    , flag = 0;

    for ( var i = 0; i < len; i++ ) {
        flag = 1;
        console.log('begin: i = ', i);
        for ( var j = 1; j < len - i; j++ ) {
            console.log('   j = ', j);
            tmp = arr[j-1];
            if ( tmp > arr[i] ) {
                arr[j-1] = arr[i];
                arr[i] = tmp;
                flag = 0;
            }
        }
        console.log('end: i = ', i);
        if ( flag === 1 ) {
            break;
        }
    }
    return arr;
};
// console.dir( bubbleSort1([3,1,7,5,2]) );
/**
 * 优化方案2
 * 增加一个变量k用于保存上一次最后发生交换的位置
 * 用于下一次遍历的结束位置
 * 因为在这之后的数据已经有序了
 */
var bubbleSort2 = function ( arr ) {
    var tmp
    , len = arr.length
    , flag = 1
    , k = len;

    for ( var i = 0; i < len; i++ ) {
        console.log('begin: i = ', i);
        flag = 1;
        var end = 0;
        for ( var j = 1; j < k; j++ ) {
            console.log('   j = ', j);
            tmp = arr[j-1];
            if ( tmp > arr[j] ) {
                arr[j-1] = arr[j];
                arr[j] = tmp;
                flag = 0;
                end = j;
            }
            if ( j === k - 1 ) {
                k = end;
            }
        }
        console.log('end: i = ', i);
        if ( flag === 1 ) {
            break;
        }
    }
    return arr;
};
console.dir( bubbleSort2([3,1,7,5,2]) );
