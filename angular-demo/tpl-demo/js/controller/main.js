app.controller('MainCtrl', function($scope) {
	$scope.items = [
		{
			name: 'this is main111'
		},
		{
			name: 'this is main222'
		},
		{
			name: 'this is main333'
		}
	]
})
.controller('SellCtrl', function($scope) {
	$scope.goodsType = '煤炭';
	$scope.goods = '烟煤';
})
.controller('CaiGouCtrl', function($scope) {
	var goods = {};

	$scope.name = 'gc';

	$scope.pro = {
		items: ['无烟煤', '烟煤', '焦炭', '其它'],
		attrs: {
			wym: ['发热量（大卡）', '灰分（A）', '硫分（S）', '挥发分（V）', 'H2O（MT）'],
			ym: ['发热量（大卡）','灰分（A）', '硫分（S）', '挥发分（V）'],
			jt: ['发热量（大卡）','灰分（A）','硫分（S）'],
			other: ['发热量（大卡）','灰分（A）']
		}
	};

	goods.type = '无烟煤';
	$scope.goods = goods;
});