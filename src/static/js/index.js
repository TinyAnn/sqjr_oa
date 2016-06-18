$(function() {
	/*mui('.mui-slider').slider({
		interval:3000
	});*/

	$("#houseBtn").click(function() {
		alert('house');
	});

	$("#carBtn").click(function() {
		alert('car');
	});

	$("#mortgage-type").click(function() {
		mortgageType();
	});

	$("#business-type").click(function() {
		var obj = $("#mortgage-type").find('span').text();
		businessType(obj);
	});

	$("#loan-type").click(function() {
		loanType();
	});

	$("#loan-date").click(function() {
		loanDate();
	});

	$("#invaild-reason").click(function() {
		invaildReason();
	});

	var curDate = showCurDate();
	$("#loan-date").find("span").text(curDate);

	$("#return-way").click(function() {
		returnWay();
	})

	$("#order-borrower-btn").click(function() {
		$("#order-borrower-msg").toggle();
		var txt = $(this).find("span").text();
		if (txt == "点击收起") {
			$(this).find("span").removeClass("btnup-icon").addClass("btndown-icon").text("点击展开");
		} else {
			$(this).find("span").removeClass("btndown-icon").addClass("btnup-icon").text("点击收起");
		}
	})

	$("#order-link-backbtn").click(function() {
		$(".order-link-backcon").toggle();
		var txt = $(this).find(".order-link-backtxt").text();
		if (txt == "点击关闭还款详情") {
			$(this).find("i").removeClass("backicon-up").addClass("backicon-down");
			$(this).find(".order-link-backtxt").text("点击查看还款详情");
			$(this).addClass("order-link-backbtn1");
		} else {
			$(this).find("i").removeClass("backicon-down").addClass("backicon-up");
			$(this).find(".order-link-backtxt").text("点击关闭还款详情");
			$(this).removeClass("order-link-backbtn1");
		}
	})

	$("#order-tap li").click(function() {
		var index = $(this).index();
		if (index == 0) {
			$(this).siblings().removeClass("order-tap-on");
			$(this).addClass("order-tap-on");
			$("#order-detail").show();
			$("#order-backplan").hide();
		} else {
			$(this).siblings().removeClass("order-tap-on");
			$(this).addClass("order-tap-on");
			$("#order-detail").hide();
			$("#order-backplan").show();
		}
	})

	$(".order-borrower-msg").find("input").focus(function() {
		$(this).css("color", "#444444");
	})

})

var jsonMortgageType = [{
	value: 'car',
	text: '车辆抵押'
}, {
	value: 'house',
	text: '房产抵押'
}]

var jsonBusinessTypeCar = [{
	value: 'car1',
	text: '押车'
}, {
	value: 'car2',
	text: '押手续'
}, {
	value: 'car3',
	text: '双押'
}]

var jsonBusinessTypeHouse = [{
	value: 'house1',
	text: '质押'
}, {
	value: 'house2',
	text: '垫资'
}, {
	value: 'house3',
	text: '先质后抵'
}, {
	value: 'house4',
	text: '单方'
}, {
	value: 'house5',
	text: '赎本'
}, {
	value: 'house6',
	text: '老龄'
}, {
	value: 'house7',
	text: '疑难'
}, {
	value: 'house8',
	text: '惠民贷'
}]

var jsonLoanType = [{
	value: 'loan1',
	text: '先息后本'
}, {
	value: 'loan2',
	text: '等额本息'
}]

var jsonReturnWay = [{
	value: 'return1',
	text: '按月返佣'
}, {
	value: 'return2',
	text: '一次性返佣'
}]

var jsonInvaildReason = [{
	value: 'invail1',
	text: '无效原因1'
}, {
	value: 'invail2',
	text: '无效原因2'
}]

function mortgageType() {
	var picker = new mui.PopPicker();
	picker.setData(jsonMortgageType);
	picker.show(function(getselecteditem) {
		var mortxt = getselecteditem[0].text;
		$("#mortgage-type").find('span').text(mortxt);
		if (mortxt == "车辆抵押")
			$("#business-type").find('span').text("押手续");
		else
			$("#business-type").find('span').text("质押");
	})
}

function businessType(obj) {
	var picker = new mui.PopPicker();
	if (obj == "车辆抵押") {
		picker.setData(jsonBusinessTypeCar);
		picker.show(function(getselecteditem) {
			$("#business-type").find('span').text(getselecteditem[0].text);
		})
	}
	if (obj == "房产抵押") {
		picker.setData(jsonBusinessTypeHouse);
		picker.show(function(getselecteditem) {
			$("#business-type").find('span').text(getselecteditem[0].text);
		})
	}
}

function loanType() {
	var picker = new mui.PopPicker();
	picker.setData(jsonLoanType);
	picker.show(function(getselecteditem) {
		$("#loan-type").find('span').text(getselecteditem[0].text);
	})
}

function loanDate() {
	var dtpicker = new mui.DtPicker({
		type: "date", //设置日历初始视图模式
		beginDate: new Date(2016, 01, 01), //设置开始日期
		endDate: new Date(2026, 01, 01), //设置结束日期
		labels: ['Year', 'Mon', 'Day'], //设置默认标签区域提示语
	})
	dtpicker.show(function(e) {
		$("#loan-date").find('span').text(e.text);
	})
}

function returnWay() {
	var picker = new mui.PopPicker();
	picker.setData(jsonReturnWay);
	picker.show(function(getselecteditem) {
		$("#return-way").find('span').text(getselecteditem[0].text);
	})
}

function invaildReason() {
	var picker = new mui.PopPicker();
	picker.setData(jsonInvaildReason);
	picker.show(function(getselecteditem) {
		$("#invaild-reason").find('span').text(getselecteditem[0].text).css("color", "#444444")
	})
}

function showCurDate() {
	var mydate = new Date();
	curDate = "" + mydate.getFullYear() + "-";
	curDate += (mydate.getMonth() + 1) + "-";
	curDate += mydate.getDate();
	return curDate;
}