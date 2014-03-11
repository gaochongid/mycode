angular.module('myModule', []).factory('greeter', function ($window) {
	return {
		greet: function (text) {
			$window.alert(text);
		}
	};
});


var injector = angular.injector(['myModule', 'ng']);

var greeter = injector.get('greeter');

function MyCtrl($scope, greeter) {
	$scope.sayHello = function () {
		greeter('hello world!');
	};
}

injector.instantiate(MyCtrl);


/*
//创建OtherModule这个module，相当于外部的module
var otherModule = angular.module("OtherModule", []);
//教injector如何创建"greeter"
//注意，greeter本身需要依赖$window
otherModule.factory("greeter", function ($window) {
    //这里是一个工厂方法，负责创建greet服务
    return {
        greet:function (text) {
            $window.alert(text);
        }
    };
});
//下面展示在非当前module中，通过injector调用greet方法：
//从module中创建新的injector
//这个步骤通常由angular启动时自动完成。
//必须引入'ng'，angular的东东
//故意颠倒顺序，暂时证实这玩意的顺序是无所谓的。。
var injector = angular.injector(['OtherModule','ng']);
//请求greeter这个依赖。
var g = injector.get("greeter");
//直接调用它~
g.greet("Hi~My Little Dada~");

//这里是当前的主app，需要依赖OtherModule
var mainApp = angular.module("myModule", ["OtherModule"]);
//留意Controller的定义函数的参数，在这里直接注入$scope、greeter。
// greeter服务是在OtherModule中的
mainApp.controller("MyCtrl",function ($scope,greeter) {
        $scope.sayHello = function() {
            greeter.greet("Hello Kitty~~");
        };
    }
);
//ng-controller已经在背后默默地做了这个事情
//injector.instantiate(MyController);*/