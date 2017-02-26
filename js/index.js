/**
 * Created by lys on 2017/2/24.
 */
$(function () {
    var fullPages=document.getElementById("fullpage");
    var menu=document.getElementById("menu");
    var cas=document.getElementById("cas");
    $("#menu>li").on("mouseover", function () {
        $(this).addClass('animated tada');
    })
    $("#menu>li").on("mouseout", function () {
        $(this).removeClass('animated tada');
    })

    var circleMenu=document.getElementById("circleMenu");
    fullPage(fullPages,menu);
    fullPage(fullPages,circleMenu);


    //根据屏幕设置canvas大小
    //switch (true){
    //    case window.innerWidth<1600:
    //        cas.style.width="1400";
    //        break;
    //    case window.innerWidth>=1600:
    //        cas.style.width="1600";
    //        break;
    //}



    window.onscroll= function () {
        if(window.pageYOffset>menu.offsetTop){
            menu.className="fixed";
        }
        if(window.pageYOffset<50){
            menu.className="absoluted";
        }
    }

    var mySwiper = new Swiper ('.swiper-container', {
        //水平还是垂直，vertical
        direction: 'horizontal',
//            direction: 'vertical',
        loop: true,
        //最初是第几页0表示第一页
        initialSlide :0,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        //点击分页器的时候是否切换
        paginationClickable :true,
        //是否要自动播放，后面跟播放时间差
        autoplay : 3000,
        //用户操作过后是否停止滑动
        autoplayDisableOnInteraction : false,
        //滑动一下的时间
        speed:300,
        //鼠标放上去变成小手
        grabCursor : true,
        effect : 'coverflow',
        slidesPerView: 2,
        centeredSlides: true,
        coverflow: {
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows : true
        },
        //是否支持键盘控制
        keyboardControl : true,
        //是否支持滚轮
        //mousewheelControl : true,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

    })


    circle(200,100,80,288);
    circle(400,100,80,10);
    circle(600,100,80,10);
    circle(800,100,80,10);
    circle(1000,100,80,10);
    circle(1200,100,80,10);

    circle(200,350,80,288);
    circle(400,350,80,10);
    circle(600,350,80,10);
    circle(800,350,80,10);
    circle(1000,350,80,10);
    circle(1200,350,80,10);

    function circle(x,y,r,reg){
        var canvas=document.getElementById("cas");
        var ctx=canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(x,y,r,0,360*Math.PI/180);
        ctx.closePath();
        ctx.fillStyle="hotpink";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x,y,r,-90*Math.PI/180,(reg-90)*Math.PI/180);
        ctx.closePath();
        ctx.fillStyle="white";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x,y,r-10,0,360*Math.PI/180);
        ctx.closePath();
        ctx.fillStyle="#34353a";
        ctx.fill();
    }

})