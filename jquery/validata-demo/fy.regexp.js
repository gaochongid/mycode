(function ( fy ) {

var reg = {};

reg['number'] = 			/^\d+$/;
reg['0-9'] = 				/^[0-9]$/;
reg['cell-phone'] = 		/^1[3|4|5|8]\d{9}$/;
reg['tel-phone'] = 			/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;

fy.REGEXP = reg;

})( FY );