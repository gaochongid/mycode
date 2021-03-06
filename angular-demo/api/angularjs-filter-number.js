function numberFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function(number, fractionSize) {
        return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP,
            fractionSize);
    };
}


var DECIMAL_SEP = '.';

function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
    if (isNaN(number) || !isFinite(number)) return '';

    var isNegative = number < 0;
    number = Math.abs(number);
    var numStr = number + '',
        formatedText = '',
        parts = [];

    var hasExponent = false;
    if (numStr.indexOf('e') !== -1) {
        var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
        if (match && match[2] == '-' && match[3] > fractionSize + 1) {
            numStr = '0';
        } else {
            formatedText = numStr;
            hasExponent = true;
        }
    }

    if (!hasExponent) {
        var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;

        // determine fractionSize if it is not specified
        if (isUndefined(fractionSize)) {
            fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
        }

        var pow = Math.pow(10, fractionSize);
        number = Math.round(number * pow) / pow;
        var fraction = ('' + number).split(DECIMAL_SEP);
        var whole = fraction[0];
        fraction = fraction[1] || '';

        var i, pos = 0,
            lgroup = pattern.lgSize,
            group = pattern.gSize;

        if (whole.length >= (lgroup + group)) {
            pos = whole.length - lgroup;
            for (i = 0; i < pos; i++) {
                if ((pos - i) % group === 0 && i !== 0) {
                    formatedText += groupSep;
                }
                formatedText += whole.charAt(i);
            }
        }

        for (i = pos; i < whole.length; i++) {
            if ((whole.length - i) % lgroup === 0 && i !== 0) {
                formatedText += groupSep;
            }
            formatedText += whole.charAt(i);
        }

        // format fraction part.
        while (fraction.length < fractionSize) {
            fraction += '0';
        }

        if (fractionSize && fractionSize !== "0") formatedText += decimalSep + fraction.substr(0, fractionSize);
    } else {

        if (fractionSize > 0 && number > -1 && number < 1) {
            formatedText = number.toFixed(fractionSize);
        }
    }

    parts.push(isNegative ? pattern.negPre : pattern.posPre);
    parts.push(formatedText);
    parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
    return parts.join('');
}