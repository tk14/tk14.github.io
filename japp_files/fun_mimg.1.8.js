// JavaScript Document
// * @author 林诗凤
// * @Email 245810159@qq.com
document.createElement("header");
document.createElement("footer");
document.createElement("section");
document.createElement("article");
document.createElement("nav");
document.createElement("menu");

$(function(){
	$("body").show();
	
	//获取图片
	var $imgObj=$(".slidCon img");
	var imgHtml="";
    $imgObj.each(function(){
        var src=$(this).attr("src");
        if(src!="img/moren.jpg"){
        imgHtml+="<div class='ul01'><img src=\"" + src + "\" /></div>";
        }
    })
    $(".slidCon").html(imgHtml);
    
	function sliding(width,obj){
	    
			width=$("body").width();
			var dom=document.getElementById(obj);
			var $obj=$("#"+obj);
			var $sliding=$obj.find(".slidCon");
			var widthBox=$obj.find(".slidCon div").length;
			$(".index span").width(100/widthBox+"%")
			$sliding.width(widthBox*width);
			$obj.find(".slidCon div").width(width+"px");	
		//监测浏览宽度
		function reSize(){
			width=$("body").width();
			dom=document.getElementById(obj);
			$obj=$("#"+obj);
			$sliding=$obj.find(".slidCon");
			widthBox=$obj.find(".slidCon div").length;
			$sliding.width(widthBox*width);
			$obj.find(".slidCon div").width(width+"px");	
		}
		
		window.onresize=function(){
			reSize();
		}
		reSize()


		
		
		//滑动
		var startX,startY,endX,endY,tanX,tanY,slidingWidth=0,indexNum=0;
		//点击
		$obj.find(".btnRight").bind("click",function(){
			//alert("dd")
			if(slidingWidth>=(widthBox-1)*width){
				$sliding.stop().animate({left:0+"px"},500);
				slidingWidth=0;
				index()
			}else{
				$sliding.stop().animate({left:-1*slidingWidth+(-width)+"px"},500);
				slidingWidth=slidingWidth+width>(widthBox-1)*width?(widthBox-1)*width:slidingWidth+width;
				index()
			}

		})
		
		$obj.find(".btnLeft").bind("click",function(){
			if(slidingWidth!=0&&slidingWidth<widthBox*width){				
				slidingWidth=slidingWidth-width;
				$sliding.stop().animate({left:-1*slidingWidth+"px"},500);
			}
			index()
		})
		
		function index(){
			
			var indexID=Math.abs( slidingWidth/width);
			if(indexID>0){
				$(".index span").animate({left:indexID*100/widthBox+"%"},500)
			}else{
				$(".index span").animate({left:0+"%"},500)	
			}
		}
		function index2(){
		$(".index span").animate({left:indexNum*100/widthBox+"%"},500)
		
		}
		var audio = document.getElementById('audio');
		dom.ontouchstart=function(e){
			endX=0;
			endY=0;
			var touch=e.touches[0];
			startX=Number(touch.screenX);
			startY=Number(touch.screenY);
			slidingWidth=parseInt( $sliding.css("left"));
			audio.play();
			
		}
		dom.ontouchmove=function (e){
			var touch=e.touches[0];
			endX=Number(touch.screenX);
			endY=Number(touch.screenY);
			tanX=Math.abs(endX-startX);
			tanY=Math.abs(endY-startY);
			$("#txt").html(slidingWidth+"---)"+-(widthBox*(width-1)));
			if(endX-startX!=0 & tanY/tanX<1){
				e.preventDefault();
				if(endX-startX<0){
					$sliding.css("left",slidingWidth+(endX-startX)+"px");
				}else{
					$sliding.css("left",slidingWidth+(endX-startX)+"px");
				}
			}	
		}
		
		dom.ontouchend=function(e){
			
			setTimeout(function(){$("#tis,.huadong").hide();},2000)
			if(Math.abs(endX-startX)>30 &endX!=0){
				if(endX-startX<30 & tanY/tanX<1){
					if((slidingWidth-width)>-(widthBox*(width-1))){
						$sliding.animate({left:slidingWidth+(-width)+"px"},100);
						indexNum++
					}else{
						$sliding.animate({left:slidingWidth+"px"},100);
					}
				}else{
					if(slidingWidth>=0){
						$sliding.animate({left:slidingWidth+"px"},100);
					}else{
						$sliding.animate({left:slidingWidth-(-width)+"px"},100);
						indexNum--

					}
				}
				
			}else{
				$sliding.animate({left:slidingWidth+"px"},100);
			}
			
			index2()
		}
	}
	
	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
			if(window.location.href.indexOf("?mobile")<0){
				try{
					if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
						
						$(".btnRight,.btnLeft").hide()
					}else if(/iPad/i.test(navigator.userAgent)){
						$(".btnRight,.btnLeft").hide()
					}else{
						
					}
				}catch(e){}
			}
		}else{$(".btnRight,.btnLeft").show()}


	sliding(320,"slidingBox");
	
	var screenW=parseInt(window.screen.width);
	var screenH=parseInt(window.screen.height);
	
	$(".btn_zhufu").click(function(){
	   
	    $(".windowBg,.pageBanner").show();
	     $(".windowBg").css({width:screenW,height:screenH})
	})
	
	$(".btnClose").click(function(){
	    $(".windowBg,.pageBanner").hide();
	})
	
	
	
	
	$(".xiangxi li .xs").click( function(){

		var map=$(this).attr("data-map");
		if(map=="map"){
			$(this).prev(".xh2").height(300).css("padding","10px 0px 10px 0px").hide();
			$(this).removeAttr("data-map")
		}
		 
        if(screenW>640){
            $("html, body").animate({ scrollTop: $(this).offset().top -1+ "px"}, 1000);
        }
		
		$(this).toggleClass("xs_border_top").prev(".xh").stop().slideToggle("slow");
	})
	
	$(window).scroll( function() { 	
	    var scroll_top=parseInt( $(window).scrollTop());
	    var msgTop= parseInt($(".bd_msg").offset().top);
	   
	    if(scroll_top>msgTop){
	            $(".xs_msg").removeClass("relative_css").addClass("fiexd_css");
	        }else{

	            $(".xs_msg").removeClass("fiexd_css").addClass("relative_css");
    	        
	    }
	} );
})
