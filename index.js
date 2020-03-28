//图片数组
var imgArr = ["img/b5.png","img/b1.png","img/b2.png","img/b3.png","img/b4.png","img/b5.png","img/b1.png"];

//图片索引
var index = 0;

var timer;

var autoTimer;

function show(){
    //添加slide
    let $slide = $("<div class='slider' id='slider'></div>");
    $("#box").append($slide);
    //添加图片
    for(let i =0;i<imgArr.length;i++){
        let $imgDiv = $("<div class='slide'><img src="+imgArr[i]+" alt=''></div>");
        $("#slider").append($imgDiv);
    }
    //添加span
    let $left = $("<span id='left'><</span>");
    let $right = $("<span id='right'>></span>");
    $("#box").append($left);
    $("#box").append($right);
    //添加nav
    let $nav = $("<ul class='nav' id='navs'></ul>");
    $("#box").append($nav);
    for(let i=0;i<5;i++){
        let $li = $("<li>"+(i+1)+"</li>");
        $("#navs").append($li);
    }

    //span事件
    var box = document.getElementById("box");
    var slider = document.getElementById("slider");
    slider.style.left = -1200+"px";
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    box.onmousemove = function(){
        left.style.opacity = 0.8;
        right.style.opacity = 0.8;
    }
    box.onmouseout = function(){
        left.style.opacity = 0;
        right.style.opacity = 0;
    }
    //向右滑动
    right.onclick = function(){
        clearInterval(autoTimer);
        ++index;
        let target = -1200*(index+1);
        setLi();
        move(20,target,30,autoChange());
        backOne();
    }
    //向左滑动
    left.onclick = function(){
        clearInterval(autoTimer);
        --index;
        let target = -1200*(index+1);
        setLi();
        move(20,target,30,autoChange());
        toLast();
    }
    //回到第一张
    function backOne(){
        if(parseInt(slider.style.left) <= -6000){ 
            index = 0; 
            clearInterval(timer);
            slider.style.left = 0 + 'px';
            move(20,-1200,30,setLi());
        }
    }
    //到最后一张
    function toLast(){
        if(index == -1){
            index = 4; 
            clearInterval(timer);
            slider.style.left = -(imgArr.length-1)*1200 + 'px';
            move(20,-(imgArr.length-2)*1200,30,setLi());
        }
    }

    //滑动函数
    function move(speed,target,time,callback){
        //关闭上一个
        clearInterval(timer);

        //判断滑动方向
        let left = slider.style.left;
        if(left == ""){
            left = -1200;
        }
        var current = parseInt(left);
        if(current > target){
            //向左滑动
            speed = -speed;
        }

        timer = setInterval(function(){
            let left = slider.style.left;
            if(left == ""){
                oldValue = -1200;
            }else{
                oldValue = parseInt(left);
            }
            var newValue = oldValue + speed;
            if((speed < 0 && newValue <= target)|| speed > 0 && newValue >= target ){
                newValue = target;
            }
            slider.style.left = newValue + 'px';
            if(newValue == target){
                clearInterval(timer);
                callback;
            }
            
        },time)
    }

    //点击nav切换图片
    let list = $("li");
    $(list[index]).addClass("active");
    //设置nav样式
    function setLi(){
        for(var i=0;i<list.length;i++){
            if($(list[i]).hasClass("active")){
                $(list[i]).removeClass("active");
            }
        }
        $(list[index]).addClass("active");
    }
    //nav点击函数
    for(var i=0;i<list.length;i++){
        list[i].num = i;
        list[i].onclick = function(){
            clearInterval(autoTimer);
            let tag = index - this.num;
            if(tag > 1 || tag < -1){
                if(tag<0){
                    tag = - tag;
                }
                move(tag*30,-1200*(this.num+1),20,autoChange());
                index = this.num;
                setLi();
            }
            else{
                index  = this.num;
                setLi()
                move(20,-1200*(index+1),20,autoChange());
            }
        }
    }

    //自动切换
    function autoChange(){
        autoTimer = setInterval(function(){
            ++index;
            move(20,-1200*(index+1),20,setLi());
            backOne();
        },3000)
    }
    autoChange();
}

show();