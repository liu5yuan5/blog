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


    //������Ļ����canvas��С

        switch (true){
            case window.innerWidth<750:
                cas.width="750";
                break;
            case window.innerWidth<1600:
                cas.width="1336";
                break;
            case window.innerWidth>=1600:
                cas.width="1600";
                break;
        }



    window.onscroll= function () {
        if(window.pageYOffset>menu.offsetTop){
            menu.className="fixed";
        }
        if(window.pageYOffset<50){
            menu.className="absoluted";
        }
    }

    var mySwiper = new Swiper ('.swiper-container', {
        //ˮƽ���Ǵ�ֱ��vertical
        direction: 'horizontal',
//            direction: 'vertical',
        loop: true,
        //����ǵڼ�ҳ0��ʾ��һҳ
        initialSlide :0,
        // �����Ҫ��ҳ��
        pagination: '.swiper-pagination',
        //�����ҳ����ʱ���Ƿ��л�
        paginationClickable :true,
        //�Ƿ�Ҫ�Զ����ţ����������ʱ���
        autoplay : 3000,
        //�û����������Ƿ�ֹͣ����
        autoplayDisableOnInteraction : false,
        //����һ�µ�ʱ��
        speed:300,
        //������ȥ���С��
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
        //�Ƿ�֧�ּ��̿���
        keyboardControl : true,
        //�Ƿ�֧�ֹ���
        //mousewheelControl : true,
        // �����Ҫǰ�����˰�ť
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

    })


    circle(200,100,80,288);
    circle(400,100,80,252);
    circle(600,100,80,120);
    circle(800,100,80,252);
    circle(1000,100,80,252);
    circle(1200,100,80,120);

    circle(200,350,80,216);
    circle(400,350,80,288);
    circle(600,350,80,252);
    circle(800,350,80,216);
    circle(1000,350,80,120);
    circle(1200,350,80,252);

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