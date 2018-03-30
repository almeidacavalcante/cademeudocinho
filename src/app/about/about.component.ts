import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.smoothScroll()
    this.setupParallax()
  }

  smoothScroll(){
    $(document).ready(function(){
			// $fn.scrollSpeed(step, speed, easing);
			$.scrollSpeed(100, 1200);
});

// Custom scrolling speed with jQuery
// Source: github.com/ByNathan/jQuery.scrollSpeed
// Version: 1.0.2

(function($) {
    
    $.scrollSpeed = function(step, speed, easing) {
        
        var $document = $(document),
            $window = $(window),
            $body = $('html, body'),
            option = easing || 'default',
            root = 0,
            scroll = false,
            scrollY,
            scrollX,
            view;
            
        if (window.navigator.msPointerEnabled)
        
            return false;
            
        $window.on('mousewheel DOMMouseScroll', function(e) {
            
            var deltaY = e.originalEvent.wheelDeltaY,
                detail = e.originalEvent.detail;
                scrollY = $document.height() > $window.height();
                scrollX = $document.width() > $window.width();
                scroll = true;
            
            if (scrollY) {
                
                view = $window.height();
                    
                if (deltaY < 0 || detail > 0)
            
                    root = (root + view) >= $document.height() ? root : root += step;
                
                if (deltaY > 0 || detail < 0)
            
                    root = root <= 0 ? 0 : root -= step;
                
                $body.stop().animate({
            
                    scrollTop: root
                
                }, speed, option, function() {
            
                    scroll = false;
                
                });
            }
            
            if (scrollX) {
                
                view = $window.width();
                    
                if (deltaY < 0 || detail > 0)
            
                    root = (root + view) >= $document.width() ? root : root += step;
                
                if (deltaY > 0 || detail < 0)
            
                    root = root <= 0 ? 0 : root -= step;
                
                $body.stop().animate({
            
                    scrollLeft: root
                
                }, speed, option, function() {
            
                    scroll = false;
                
                });
            }
            
            return false;
            
        }).on('scroll', function() {
            
            if (scrollY && !scroll) root = $window.scrollTop();
            if (scrollX && !scroll) root = $window.scrollLeft();
            
        }).on('resize', function() {
            
            if (scrollY && !scroll) view = $window.height();
            if (scrollX && !scroll) view = $window.width();
            
        });       
    };
    
    $.easing.default = function (x,t,b,c,d) {
    
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    };
    
})($);
  }


  setupParallax() {
    $(window).scroll(function () {
      var wScroll = $(this).scrollTop()
      $('.back-bird').css({
        'transform': 'translate(0px, -' + wScroll / 22 + '%)'
      })

      $('.logo').css({
        'transform': 'translate(0px, ' + wScroll / 1.75 + '%)'
      })

      $('.fore-bird').css({
        'transform': 'translate(0px, -' + wScroll / 33 + '%)'
      })


      let partOfTheWindow = ($(window).height() / 1.2)

      try {
        if (wScroll > $('.col-container figure').eq(2).offset().top - partOfTheWindow) {
          $('.col-container figure:lt(3)').each(function (i) {
            setTimeout(function (){
              $('.col-container figure').eq(i).addClass('is-showing');
            }, 30 * (i * 2))
          })
        }
  
        if (wScroll > $('.col-container figure').eq(4).offset().top - partOfTheWindow) {
          $('.col-container figure:lt(6)').each(function (i) {
            setTimeout(function (){
              $('.col-container figure').eq(i).addClass('is-showing');
            }, 30 * (i * 2))
          })
        }
      } catch (error) {
        console.log(error);   
      }

      if (wScroll > $('.revealer').offset().top - ($(window).height())) {
        $('.revealer').css({
          'background-position':'center '+ (wScroll-$(window).height()) +'px'
        })

        var opacity = (wScroll - $('.revealer').offset().top + 350)/ (wScroll / 7)
        
        $('.window-tint').css({
          'opacity' : opacity
        })
      }

    })
  }
}

