var arr = [1, 2, 3, 1, 4, 2];

arr.indexOf(1);
arr.lastIndexOf(1);

// 在数组中的每个项上运行一个函数，若所有结果都返回真值，此方法亦返回真值。
var every = arr.every(function (val, index, arr) {
	if ( val === 1 ) {
		return false;
	}
	return true;
});
console.log(every);

// 在数组中的每个项上运行一个函数，若存在任意的结果返回真，则返回真值。
arr.some(function (val, index, arr) {
	if ( val >= 4 ) {
		return true;
	}
});


// 在数组中的每个项上运行一个函数，并将函数返回真值的项作为数组返回。
arr.filter(function (val, index, arr) {
	if ( val > 1 ) {
		return val;
	}
});

// 在数组中的每个项上运行一个函数。
arr.forEach(function (val, index, arr) {
	console.log(val, index, arr);
});

// 在数组中的每个项上运行一个函数，并将全部结果作为数组返回。
arr.map(function (val, index, arr) {
	return val+1;
});
