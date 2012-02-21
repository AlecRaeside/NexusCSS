$(function() {
	$("body")
			.height($(window).height())
			.width($(window).width());
	
	setInterval(function() {
		createRandomBeam();
		//createRandomBeam();
	},750);
	
	$("body").click(function(e) {
		var beam_node = $(".beam-quad.template").clone();
		
		setBeamScale(beam_node);
		
		colours.sort(randOrd)
		
		beam_node.find(".beam").each(function(i,el) {
			$(el).addClass(colours[i]);
		})
			
		beam_node.removeClass("template")
					.css({"left":e.pageX,"top":e.pageY})
					.appendTo("body");
		setTimeout(function() {
			beam_node.addClass("moving");
		},15);
		setTimeout(function() {
			beam_node.remove();
		},16000);
	});
	
});

var colours = ["red","yellow","blue","green"];

function createRandomBeam() {
		if (Math.random()<0.35) {
			var side = Math.floor(Math.random()*4),
				win_width= $(window).width(),
				win_height = $(window).height(),
				pos = Math.random(),
				left,top,dir;
			if (side == 0) {
				left = 0;
				top = pos*win_height;
				dir = "right";
			} else if (side == 1) {
				top = 0;
				left = pos*win_width;
				dir = "down";
			} else if (side == 2) {
				left = win_width;
				top=pos*win_height;
				
				dir = "left";
			} else {
				left = pos*win_width;
				top=win_height;
				dir = "up";
			}
			
			var beam_node = $(".beam-random.template").clone();
			var beam= beam_node.find(".beam");
			setBeamScale(beam_node);
			
			colours.sort(randOrd)
			
			beam
				.addClass(colours[Math.floor(Math.random()*4)])
				.addClass(dir);
					
			beam_node.css({"left":left,"top":top})
				.removeClass("template")
				.appendTo("body");
			setTimeout(function() {
				beam_node.addClass("moving");
			},15);
			setTimeout(function() {
				beam_node.remove();
			},16000);
		}
	}

function randOrd() {
		return (Math.round(Math.random())-0.5);
	}

var prefixes = ["-moz-","-webkit-","-o-","-ms-",""];
function setBeamScale(beam_node) {
	var random_scale =  (Math.random() * 0.7) + 0.8;
	prefixes.forEach(function(prefix) {
		beam_node.css(prefix+"transform","scale("+random_scale+")")
		beam_node.find(".beam").css(prefix+"transition-duration", ( 30-parseInt(random_scale*15))+"s");
	})
	
}