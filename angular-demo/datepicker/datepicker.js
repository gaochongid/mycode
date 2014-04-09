angular.module('myApp.directives', []).directive('datepicker', function () {
	return {
		restrict: 'A',
		require: '?ngModel',
		// scope: false 现有的作用域，默认方式
		// scope: true 新的作用域
		// 独立作用域
		// 默认情况下不可以访问父scope中的任何东西
		// 可以通过以下三种方式（绑定策略）传递指令中
		// &传递方法, @ | =传递属性
		// 当创建可复用的组件时使用独立作用域
		scope: {
			select: '&',
			date1: '@dateS1',
			date2: '=dateS2'
		},
		link: function ( scope, element, attrs, ngModel ) {
			if ( !ngModel ) { return false; }

			var optObj = {};

			optObj.dateFormat = 'mm/dd/yy';

			var updateModel = function ( dateTxt ) {
				scope.$apply(function () {
					ngModel.$setViewValue(dateTxt);
				});
			};

			optObj.onSelect = function ( dateTxt, picker ) {
				updateModel(dateTxt);
				if ( scope.select ) {
					scope.$apply(function () {
						scope.select({date: dateTxt});
					});
				}
				console.log('date1: ', scope.date1)
				console.log('date2: ', scope.date2)
			};

			ngModel.$render = function () {
				element.datepicker('setDate', ngModel.$viewValue);
			};

			element.datepicker(optObj);
		}
	};
}).directive('fyActiveTabDir', function () {
        return {
            restrict: 'A',
            scope: {
                cn: '@cname'
            },
            link: function ( scope, elem, attrs ) {
                console.log('aaaaa')
               elem.on('click', function (e) {
                   console.log('-----------')
                   e.preventDefault();
                   var cn = scope.cn;
                   elem.parent().find('.'+cn).removeClass(cn);
                   elem.addClass(cn);
               });
            }
        }
    });