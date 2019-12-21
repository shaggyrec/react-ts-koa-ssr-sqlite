$(function() {
	$(".siteHeader").append($("<div class='siteHeader__preloader'/>"));
	$(".siteHeader__preloader").width((10 + Math.random() * 30) + "%");
	var $skills = $('#skills'),
		$experience = $('#experience'),
		$portfolio = $('#portfolio'),
		$contacts = $('#contacts');
	$(window).scroll(function(){
		var mainHeight = $('main').height(),
			topScroll = $(window).scrollTop(),
			progress = (topScroll/mainHeight).toFixed(2) ;
// 		console.log(progress);
		if(progress >= .01){
			$('.iam,.bg').css({'-webkit-transform':'translate3d(0,0,0)','-webkit-transform':'translate3d(0,0,0)'});
			rotateEarth(progress);
			if(progress>=.06){
				$('.siteHeader,.tcon-indicator').fadeOut(300);
			}else{
				$('.siteHeader,.tcon-indicator').fadeIn(300);
			}
			if(progress>=.07 && progress <= .24){
				$skills.removeClass('hidden').addClass('show');
				if(progress>=.09 && progress<=.17){
					$('#skills1').addClass('show');
				}else{
					$('#skills1').removeClass('show');
				}
				if(progress>=.18 && progress<=.24){
					$skills.find('.skills').css({'-webkit-transform':'rotateX(90deg)','transform':'rotateX(90deg)'});
					$('#skills2').addClass('show');
				}else{
					$('#skills2').removeClass('show');
					$skills.find('.skills').css({'-webkit-transform':'rotateX(0deg)','-webkit-transform':'rotateX(0deg)'});
				}
			}else{
				if($skills.hasClass('show')){
					$skills.addClass('hidden').removeClass('show');
				}
			}
			if(progress>=.26 && progress<=.72){
				$('.scene').addClass('teal');
					$experience.removeClass('hidden').addClass('show');
				if(progress>=.29){
					$('.bg').css('bottom','-100%');
					$('.iam').css({'left':'2%','bottom':'13%'});
				}
				if(progress>=.31 && progress<=.34){
					$('#born>div').addClass('show');
				}else{
					$('#born>div').removeClass('show');
				}
				
				if(progress>=.35 && progress<=.41){
					$('#volsu>div').addClass('show');
				}else{
					$('#volsu>div').removeClass('show');
				}
				if(progress>=.42 && progress<=.46){
					$('#beganWeb>div').addClass('show');
				}else{
					$('#beganWeb>div').removeClass('show');
				}
				if(progress>=.47 && progress<=.51){
					$('#lookinFor>div').addClass('show');
				}else{
					$('#lookinFor>div').removeClass('show');
				}
				if(progress>=.52 && progress<=.56){
					$('#Gorizont>div').addClass('show');
				}else{
					$('#Gorizont>div').removeClass('show');
				}
				if(progress>=.57 && progress<=.62){
					$('#ClickON>div').addClass('show');
				}else{
					$('#ClickON>div').removeClass('show');
				}
				if(progress>=.63 && progress<=.68){
					$('#VUDU>div').addClass('show');
				}else{
					$('#VUDU>div').removeClass('show');
				}
				if(progress>=.69 && progress<=.71){
					$('#RG>div').addClass('show');
				}else{
					$('#RG>div').removeClass('show');
				}
// 				scale
				changeExperienceScale(progress);
			}else{
				$('.scene').removeClass('teal');;
				if($experience.hasClass('show')){
					$experience.addClass('hidden').removeClass('show');
				}
				$('.bg').css('bottom','0');
				$('.iam').css({'left':'47%','bottom':'5%'});
			}
			
			if(progress>=.73 && progress<=.90){
				$portfolio.removeClass('hidden').addClass('show');
				if(progress>=.75 && progress<=.79){
					$portfolio.find('.clickon').addClass('show').removeClass('hidden');
				}else{
					$portfolio.find('.clickon').addClass('hidden').removeClass('show');
				}
				if(progress>=.80 && progress<=.85){
					$portfolio.find('.vudu').addClass('show').removeClass('hidden');
				}else{
					$portfolio.find('.vudu').addClass('hidden').removeClass('show');
				}
				if(progress>=.86 && progress<=.90){
					$portfolio.find('.freelance').addClass('show').removeClass('hidden');
				}else{
					$portfolio.find('.freelance').addClass('hidden').removeClass('show');
				}
			}else{
				if($portfolio.hasClass('show')){
					$portfolio.addClass('hidden').removeClass('show');
				}	
			}
			
			if(progress>=.91){
				$contacts.removeClass('hidden').addClass('show');
				setTimeout(
					function(){
						$('.iam').css('background-position','-97px 100%');
				},1000);
				
				if(progress>=.93){
					$('.iam,.bg').css({'-webkit-transform':'translate3d(0,150%,0)','transform':'translate3d(0,150%,0)'});
					$('#endBg').addClass('goDown');
				}else{
					$('#endBg').removeClass('goDown');
				}
				
			}else{
				if($contacts.hasClass('show')){
					$contacts.addClass('hidden').removeClass('show');
				}
			}
			iAmWalk(progress);
		}else{
			$('.iam,.bg').css({'-webkit-transform':'translate3d(0,150%,0)','transform':'translate3d(0,150%,0)'});
		}
	});
});
$(window).load(function() {
    $(".siteHeader__preloader").width("101%");
	$('.tcon-indicator').fadeIn(200);
	$('main').height(13000);
});

function iAmWalk(progress){	
	$('.iam').css('background-position', '-347px 0');
	setTimeout(function(){
		$('.iam').css('background-position', '-20px 0');	
	},200);
}
function changeExperienceScale(progress){
	if(progress>=.70){
		$('.scale__y17').addClass('toScale');
		$('.iam').css('left','98%');
		$('.experience__scale').css('padding-right','0%');
		return false;
	}else{
		$('.scale__y17').removeClass('toScale');
		$('.iam').css('left','96%');
		$('.experience__scale').css('padding-right','5%');
	}
	
	if(progress>=.68){
		$('.scale__y16').addClass('toScale');
		$('.iam').css('left','96%');
		$('.experience__scale').css('padding-right','5%');
		return false;
	}else{
		$('.scale__y16').removeClass('toScale');
		$('.iam').css('left','93%');
		$('.experience__scale').css('padding-right','10%');
	}
	if(progress>=.64){
		$('.scale__y14').addClass('toScale');
		$('.iam').css('left','93%');
		$('.experience__scale').css('padding-right','10%');
		return false;
	}else{
		$('.scale__y14').removeClass('toScale');
		$('.iam').css('left','83%');
		$('.experience__scale').css('padding-right','15%');
	}
	if(progress>=.59){
		$('.scale__y13').addClass('toScale');
		$('.iam').css('left','83%');
		$('.experience__scale').css('padding-right','15%');
		return false;
	}else{
		$('.scale__y13').removeClass('toScale');
		$('.iam').css('left','73%');
		$('.experience__scale').css('padding-right','25%');
	}
	if(progress>=.53){
		$('.scale__y11').addClass('toScale');
		$('.iam').css('left','73%');
		$('.experience__scale').css('padding-right','25%');
		return false;
	}else{
		$('.scale__y11').removeClass('toScale');
		$('.iam').css('left','63%');
		$('.experience__scale').css('padding-right','35%');
	}
	if(progress>=.47){
		$('.scale__y10').addClass('toScale');
		$('.iam').css('left','67%');
		$('.experience__scale').css('padding-right','30%');
		return false;
	}else{
		$('.scale__y10').removeClass('toScale');
		$('.iam').css('left','47%');
		$('.experience__scale').css('padding-right','50%');
	}
	if(progress>=.41){
		$('.scale__y07').addClass('toScale');
		$('.iam').css('left','47%');
		$('.experience__scale').css('padding-right','50%');
		return false;
	}else{
		$('.scale__y07').removeClass('toScale');
		$('.iam').css('left','37%');
		$('.experience__scale').css('padding-right','60%');
		
	}
	if(progress>=.34){
		$('.scale__y90').addClass('toScale');
		$('.iam').css('left','37%');
		$('.experience__scale').css('padding-right','60%');
		return false;
	}else{
		$('.scale__y90').removeClass('toScale');
		$('.iam').css('left','2%');
		$('.experience__scale').css('padding-right','99%');	
	}
}

function rotateEarth(progress){
	var angle = parseInt(progress*100*4);
	$('.bg').css({'-webkit-transform':'translate3d(0,0,0) rotate(-'+ angle +'deg)','transform':'translate3d(0,0,0) rotate(-'+ angle +'deg)'});
}