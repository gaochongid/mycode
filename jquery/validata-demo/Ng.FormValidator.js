/**
 * Created by zhaokai on 14-7-14.
 */
/**
 * 该模块用于对所有页面共用的服务，比如service directive等
 * @module FY.Common
 */
(function ( angular, common, infos, reg, msg ) {
    /**
     * 文本框的提醒信息，可自定义。例如：
     * FY.infos.xxx = '{data-name}xxx,{min}xxx,{max}xxx'
     * ======================
     * 对于type=text的文本框可提供data-name, minlength, maxlength这三个属性。
     * 在提醒信息的任何位置都可以使用data-name, {minlength}, {maxlength}，这三个表达式。
     *
     * 对于type=number的文本框可提供data-name, min, max这三个属性。
     * 在提醒信息的任何位置都可以使用{data-name}, {min}, {max}，这三个表达式。 
     * 
     * @type {Object}
     */
    infos['text'] = '{data-name}不能包含非法字符，最少为{minlength}个汉字，最多为{maxlength}个汉字。';
    infos['number_comm'] = '{data-name}只能是数字';
    infos['number_min'] = '最小值为{min}';
    infos['number_max'] = '最大值为{max}';
    infos['number_set'] = ['number_comm', ',', 'number_min', ',', 'number_max', '。'];
    infos['number'] = '{data-name}只能是数字，最小值为{min}，最大值为{max}。';
    infos['cell_phone'] = '请输入11位手机号，如：13312345678。';
    infos['tel_phone'] = '请输入座机号，如：010-12345678。';
    /**
     * 对infos里面的提醒信息内容进行解析
     * @type {Object}
     */
    var parseInfo = {
        _dataName: function ( dname, text ) {
            return text.replace(/\{data-name\}/ig, (dname || ''));
        },
        _text: function ( elem, text ) {
            var minlength = elem.attr('minlength') || ''
            , maxlength = elem.attr('maxlength') || '';
            return text.replace( /\{minlength\}/ig, minlength ).replace( /\{maxlength\}/ig, maxlength );
        },
        _number: function ( elem, text ) {
            var min = elem.attr('min') || ''
            , max = elem.attr('max') || '';
            return text.replace( /\{min\}/ig, min ).replace( /\{max\}/ig, max );
        },
        parse: function ( elem, info ) {
            var type = elem.attr('type');
            info = parseInfo._dataName( elem.data('name'), info );
            if ( type === 'text' ) {
                info = parseInfo._text( elem, info );
            } else if ( type === 'number' ) {
                info = parseInfo._number( elem, info );
            }
            return info;
        }
    }
    /**
     * 调用解析方法生产最终的提醒信息，然后调用notify插件
     * @method _notify
     */
    , _notify = function ( options ) {
        var elem = this
        , info = []
        , infoNames = elem.data('infos')
        , notifyOptions = $.extend({
            className: 'info',
            autoHide: false,
            showAnimation: 'fadeIn',
            hideAnimation: 'fadeOut',
            showDuration: 100,
            hideDuration: 100,
        }, options);
        
        for ( var i = 0; i < infoNames.length; i++ ) {
            var infoName = infos[ infoNames[i] ];
            // 组合方式
            // ['number_comm', ',', 'number_min', ',', 'number_max', '。']
            if ( angular.isArray(infoName) ) {
                var arr = [];
                for ( var j = 0; j < infoName.length; j++ ) {
                    var item = infoName[j];
                    if ( infos[item] ) {
                        arr.push( parseInfo.parse(elem, infos[item]) );
                    } else {
                        arr.push( item );
                    }
                }
                info.push( arr.join('') );
            }
            // 非组合方式
            // number_comm
            else if ( infoName ) {
                info.push( parseInfo.parse(elem, infoName) );
            }
            // 不是一个提醒信息，可能是文字
            else {
                info.push( infoNames[i] );
            }
        }

        this.notify( info.join(''), notifyOptions );
    };

    // 手机号验证规则
    $.validator.addMethod("cellphone-rule", function(value, element) {
        // element = $(element);
        // var dname = element.data('name') || '';
        if ( value.length < 11 || value.length > 11 ) {
            $.validator.messages[ 'cellphone-rule' ] = msg['00000'];
            return false;
        }
        if ( !reg['cell-phone'].test(value) ) {
            $.validator.messages[ 'cellphone-rule' ] = msg['00001'];
            return false;
        }
        return true;
    });
    
    // 座机号验证规则
    $.validator.addMethod("telphone-rule", function ( value, element ) {
        if ( !reg['tel-phone'].test(value) ) {
            $.validator.messages[ 'telphone-rule' ] = msg['00002'];
            return false;
        }
        return true;
    });

    // 设置默认验证规则
    $.validator.setDefaults({
        focusInvalid: false,
        // 失焦时验证该元素
        onfocusout: function ( element ) {
            this.element(element);
        },
        /**
         * 显示错误提示框。
         * 对checkbox、radio和其它input区分处理。
         * @param error jquery-validate自动生成的错误提示框
         * @param element 发生错误的输入框
         * @param {String} method （内置、自定义）错误规则名称
         */
        errorPlacement: function(error, element, method){
            var inputType = $(element).attr('type'),
                position = 'right middle',
                target = $(element),
                errorMsgTitle = method === 'required' ? target.attr('data-name') : '' ,
                errorMsg = target.attr('data-error') || errorMsgTitle + error.text();
            if ( inputType === 'checkbox' || inputType === 'radio' ){
                position = 'top middle';
                target = $(element).nextUntil('label');
            }

            target.notify(errorMsg, {
                className: 'error',
                elementPosition: position,
                autoHide: false,
                showAnimation: 'fadeIn',
                hideAnimation: 'fadeOut'
            });
        }
    });

    /**
     * 为表单增加信息提示及自动验证功能，支持自动填充消息及自定义消息。
     * 1.提醒规则使用方式：data-infos='["cell_phone"]' 注意：单引号与双引号的使用方式
     * 2.严重规则的使用方式：cellphone-rule="true"
     * 3.data-name使用方式：data-name="采购数量"，这个attr只会与提醒信息配合使用
     * 4.在表单位于的controller里面必须提供$scope.validator属性，在controller提交
     *   请求之前可以调用$scope.validator.form()获得表单的验证结果。
     * @class fyForm
     * @constructor
     * @namespace FY.Common
     */
    common.directive('fyForm', function () {
        return {
            link: function ( $scope, form ) {
                form.on('mouseenter', 'input[data-infos]', function () {
                    _notify.call( $(this) );
                }).on('mouseleave', 'input[data-infos]', function () {
                    $('.notifyjs-wrapper').trigger('notify-hide');
                });
                $scope.validator = form.validate({
                    // 某项成功时，清除该项的错误通知。
                    success: function ( error ) {}
                });
            }
        }
    });

})( angular, FY.Common, FY.INFOS, FY.REGEXP, FY.MSG );