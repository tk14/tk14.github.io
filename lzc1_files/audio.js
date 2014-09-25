
	
	/*
	** 声音功能的控制
	*/
var	audio_switch_btn= true,			//声音开关控制值
	audio_btn		= true,			//声音播放完毕
	audio_loop		= true,		//声音循环
	audioTime		= null,         //声音播放延时
	audioTimeT		= null,			//记录上次播放时间
	audio_interval	= null,			//声音循环控制器
	audio_start		= null,			//声音加载完毕
	audio_stop		= null,			//声音是否在停止
	mousedown		= null;			//PC鼠标控制鼠标按下获取值
	
	
	



	

/*
** 声音功能
*/
	//关闭声音
	function audio_close(){
		if(audio_btn&&audio_loop){
			audio_btn =false;
			audioTime = Number($("#car_audio")[0].duration-$("#car_audio")[0].currentTime)*1000;	
			if(audioTime<0){ audioTime=0; }
			if(audio_start){
				if(isNaN(audioTime)){
					audioTime = audioTimeT;
				}else{
					audioTime > audioTimeT ? audioTime = audioTime: audioTime = audioTimeT;
				}
			};
			if(!isNaN(audioTime)&&audioTime!=0){
				audio_btn =false;		
				setTimeout(
					function(){	
						$("#car_audio")[0].pause();
						$("#car_audio")[0].currentTime = 0;
						audio_btn = true;
						audio_start = true;	
						if(!isNaN(audioTime)&&audioTime>audioTimeT) audioTimeT = audioTime;
					},audioTime);
			}else{
				audio_interval = setInterval(function(){
					if(!isNaN($("#car_audio")[0].duration)){
						if($("#car_audio")[0].currentTime !=0 && $("#car_audio")[0].duration!=0 && $("#car_audio")[0].duration==$("#car_audio")[0].currentTime){
							$("#car_audio")[0].currentTime = 0;	
							$("#car_audio")[0].pause();
							clearInterval(audio_interval);
							audio_btn = true;
							audio_start = true;
							if(!isNaN(audioTime)&&audioTime>audioTimeT) audioTimeT = audioTime;
						}
					}
				},20)	
			}
		}
	}
	
	//页面声音播放
	$(function(){
		//获取声音元件
		var btn_au = $("#splay");
		
		//绑定点击事件
		btn_au.on('click',audio_switch);
		function audio_switch(){
			
			if($("#car_audio")==undefined){
				return;
			}
			if(audio_switch_btn){
				//关闭声音
				$("#car_audio")[0].pause();
				audio_switch_btn = false;
				$("#car_audio")[0].currentTime = 0;
				document.getElementById('splay').style.backgroundPosition='0px 0px';
		       
			}
			//开启声音
			else{
				audio_switch_btn = true;
				$("#car_audio")[0].play();
				document.getElementById('splay').style.backgroundPosition='-39px 0px';
		       
			}
		}
		
	});





