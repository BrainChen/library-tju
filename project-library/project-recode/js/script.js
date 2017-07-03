$(document).ready(function() {
    $(".headview").append('<a href="#"><img src="images/logo.png"></a>');
    //要链接到登录界面咯、、、
    $(".headview").append('<a id="users" href=""><img src="images/users.png" height="20px" width="20px"/></a>');
})
var stage22 = true;
var stage33 = true;
var s = "star";
var unsubmitted = true;
var flag = "havenot";


var model = {
    authorImg: '<img src="images/author.png" height="21px" width="21px">',
    backgroundImg: '<img class="result-background" src="images/result-background.png" alt="background">',
    bookImg: '<img style="margin: 50px 10px -5px 30px;" src="images/book.png" height="25px" width="25px">',
    informationSpan: '<span style="font-size: 18px; color: #9e9e9e;">基本信息</span>',
    informationImg: '<img style="margin: 50px 10px -5px 30px;" src="images/information.png" height="25px" width="25px">',
    inlib: '<span style="font-size: 18px; color: #9e9e9e;">在馆信息</span>',
    commentsImg: '<img style="margin: 50px 10px -5px 30px;" src="images/comments.png" height="25px" width="25px">',
    allComments: '<span style="font-size: 18px; color: #9e9e9e;">全部书评</span>',
    goBack: '<a class="former-link" href="javascript:void(0)" onclick="return view.toFormer()"><&nbsp;&nbsp;返回上一级</a>',
    flagImg: '<a href="javascript:void(0)"><img id="flag" onclick="return view.changeFlag()" src="images/havenot.png" width="100px" height="150px"></a>',
    marks: '<span>4.0分&nbsp;</span>',
    star_filledImg: '<img class="star_filled" src="images/star_filled.png">',
    star_blankImg: '<img class="star_blank" src="images/star_blank.png">',
}


var view = {
    getBooksNumber: function() {
        var url = "http://open.twtstudio.com/api/v1/library/book?title=";
        $.ajax({
            url: url + viewModel.bookname + '/' + page,
            type: 'get',
            datatype: 'json',

            success: function(json) {
                if (json.data.code != 1) {
                    bookNumber += json.data.length;
                    if(page == viewModel.page)
                    	$(".background").append('<li class="pagesssCurrent" onclick="view.changePage('+page+')">'+page+'</li>');
                    else
                    	$(".background").append('<li class="pagesss" onclick="view.changePage('+page+')">'+page+'</li>');
                    page++;
                    view.getBooksNumber();
                }
            }
        })
    },

    formerPage: function() {
    	if(viewModel.page > 1) {
	    	viewModel.page--;
	    	view.getBooksPage(viewModel.page);
	    }
    },

    nextPage: function() {
    	viewModel.page++;
    	if(viewModel.data.length == 0) 
    		viewModel.page--;
    	view.getBooksPage(viewModel.page);
    },

    getBooksPage: function(i) {
        $.ajax({
            type: 'get',
            url: "http://open.twtstudio.com/api/v1/library/book?title=" + viewModel.bookname + "/" + i,
            datatype: 'json',
            success: function(json) {
                var re = json.data;
                viewModel.data = re;
                for (var k = 0; k < re.length; k++) {
                    if (viewModel.data[k].author.length <= 12) viewModel.data[k].author = viewModel.data[k].author;
                    else {
                        var subname = "";
                        for (var i = 0; i < 12; i++) {
                            subname += viewModel.data[k].author[i];
                        }
                        viewModel.data[k].author = subname + "...";
                    }
                    if (viewModel.data[k].title.length <= 50) viewModel.data[k].title = viewModel.data[k].title;
                    else {
                        var subname = "";
                        for (var i = 0; i < 50; i++) {
                            subname += viewModel.data[k].title[i];
                        }
                        viewModel.data[k].title = subname + "...";
                    }
                }
            }
        })
    },

    stage2: function() {
        $(".press").css("display", "block");
        $("#content").css("display", "none");
        $("footer").css("backgroundColor", "#3f2f2e");
        if (stage22)
            $(".background").append(model.backgroundImg);
        stage22 = false;
    },

    stage3: function() {
        $("#detail-text").css("display", "block");
        $(".press").css("display", "none");
        if (stage33) {
            $(".binfo").append(model.bookImg);
            $(".binfo").append(model.informationSpan);
            $(".iinfo").append(model.informationImg);
            $(".iinfo").append(model.inlib);
            $(".comments").append(model.commentsImg);
            $(".comments").append(model.allComments);
            $(".dhead").append(model.goBack);
            $(".dhead").append(model.flagImg);
            view.addStars(4);
            $(".level1").append(model.marks);
            for (var i = 1; i <= 5; i++) {
                $(".starss").append('<a href="javascript:void(0)"><img id="star' + i + '" onclick="return view.submit(' + i + ')" onmouseover="return view.change(' + i + ')" onmouseout="return view.ret(' + i + ')" src="images/star_blank.png"></a>');
                $(".starss").css("width", "80px");
            }
            stage33 = false;
        }
        $(".stars span").css("margin-left", "12px");
        $(".stars span").css("color", "#e53935");
    },

    toFormer: function() {
        $("#detail-text").css("display", "none");
        $(".press").css("display", "block");
        unsubmitted = true;
        for (var j = 5; j >= 1; j--) {
            j = j.toString();
            document.getElementById(s + j).src = "images/star_blank.png";
        }
        viewModel.mark = 0;
    },

    changeFlag: function() {
        if (flag == "have") {
            $('#flag').attr('src', "images/havenot.png");
            flag = "havenot";
        } else {
            $('#flag').attr('src', "images/have.png");
            flag = "have";
        }
    },

    //changePage: function(i) {

    //},

    submit: function(i) {
        if (unsubmitted) {
            unsubmitted = false;
            alert("评价成功！");
        } else {
            //这里应该有个post请求
            alert("不能重新评价！")
        }
    },

    change: function(i) {
        if (unsubmitted) {
            for (var j = 1; j <= i; j++) {
                j = j.toString();
                document.getElementById(s + j).src = "images/star_filled.png";
            }
            viewModel.mark = i;
        }
    },

    ret: function(i) {
        if (unsubmitted) {
            for (var j = 5; j >= 1; j--) {
                j = j.toString();
                document.getElementById(s + j).src = "images/star_blank.png";
            }
            viewModel.mark = 0;
        }
    },

    addStars: function(i) {
        for (var j = 0; j < i; j++) {
            $(".level1").append(model.star_filledImg);
        }
        for (var j = 0; j < 5 - i; j++) {
            $(".level1").append(model.star_blankImg);
        }
        $(".star_blank").css("width", "15px");
    },

    getBooksDetail: function(index, name, author) {
        if (name.length <= 8) viewModel.name = name;
        else {
            var subname = "";
            for (var i = 0; i < 8; i++) {
                subname += name[i];
            }
            viewModel.name = subname + "...";
        }
        viewModel.author = author;
        $.ajax({
            type: 'get',
            url: "http://open.twtstudio.com/api/v1/library/book/" + index,
            datatype: 'json',
            success: function(json) {
                var er = json.data;
                viewModel.detail = er;
                viewModel.holding = er.holding[0];
            }
        })
    }
}