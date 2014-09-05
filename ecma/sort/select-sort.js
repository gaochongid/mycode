/**
 * 描述：选择排序
 * 1.在未排序序列中找到最小（大）的元素，存放到排序序列的起始位置
 * 2.再从剩余未排序的元素中继续寻找最小（大）的元素，然后放到已排序序列的末尾
 * 3.以此类推，直到所有元素均排序完毕
 */
var selectSort = function ( arr ) {
    var len = arr.length
    , tmp
    , min;

    for ( var i = 0; i < len; i++ ) {
        min = i;
        for ( var j = i+1; j < len; j++ ) {
            if ( arr[j] < arr[min] ) {
                min = j;
            }
        }
        tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
    }
    return arr;
};
console.log( selectSort([3,1,2,7,5]) );
