import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor() {   
    this.setupParallax()
    this.alternateNavBar() 

  }

  ngOnInit() {
    $(".wrapper").hover(
      function () {
          $(this).parent().removeClass('out').addClass('in');
          $(this).removeClass('overlay-animation-out');
          $(this).addClass('overlay-animation');
      },
      function () {
          $(this).parent().removeClass('in').addClass('out');
          $(this).removeClass('overlay-animation');
          $(this).addClass('overlay-animation-out');
      }
    );

    $('.first-headline').addClass('is-shown');
  }

  ngOnDestroy(){

  }

  setupCardFx(){

  }

  alternateNavBar(){
    $(window).scroll(function (){
      var wScroll = $(this).scrollTop()
      if($('.navbar').offset().top > $('.bird-box').offset().top+60){
        $('.navbar').addClass('change-state')
        if($('.navbar').offset().top > $('.bird-box').offset().top + $('.bird-box').height()-60){
          $('.navbar').removeClass('change-state')
        }
      }else{
        $('.navbar').removeClass('change-state')
      }
    })
  }


  setupParallax() {
    

    $(window).scroll(function () {

      var wScroll = $(this).scrollTop()
      let partOfTheWindow = (windowHeight() / 1.2)

      setupHeaderParallax(wScroll)
      setupMosaicAnimation(wScroll, partOfTheWindow)
      setupRevealerParallax(wScroll, partOfTheWindow)
      setupBlogPostsAnimation(wScroll)
    })

    function setupBlogPostsAnimation(wScroll){
      if (wScroll > (offsetTop('.blog-container') - windowHeight())) {

        var relativeScroll = wScroll - offsetTop('.blog-container') + windowHeight() - 300
        var offset = Math.min(0, relativeScroll)

        var opacity = (wScroll - offsetTop('.blog-container') + windowHeight()) / (wScroll / 11)

        $('.post-1').css({ 'opacity': opacity })
        $('.post-3').css({ 'opacity': opacity })
        translateDiv('.post-1', (-offset / 2), 'px', 0, 'px')
        translateDiv('.post-3', (offset / 2), 'px', 0, 'px')
      }
    }

    function setupRevealerParallax(wScroll, partOfTheWindow){
      if (wScroll > offsetTop('.revealer') - windowHeight()) {

        if (wScroll > offsetTop('.revealer-container') - partOfTheWindow) {
          $('.revealer-container').addClass('is-showing');
        }

        $('.revealer').css({
          'background-position': 'center ' + (wScroll - windowHeight() + 350) + 'px'
        })

        var opacity = (wScroll - offsetTop('.revealer') + 350) / (wScroll / 7)

        $('.window-tint').css({ 'opacity': opacity })
      }
    }

    function setupMosaicAnimation(wScroll, partOfTheWindow){
      try {
        if (wScroll > offsetTopEq('.col-container figure', 2) - partOfTheWindow) {
          timeAnimation('.col-container figure', 3, 'is-showing')
        }

        if (wScroll > offsetTopEq('.col-container figure', 5) - partOfTheWindow) {
          timeAnimation('.col-container figure', 6, 'is-showing')
        }
      } catch (error) {

      }
    }

    function setupHeaderParallax(wScroll){

      var rate = (wScroll - $('.bird-box').offset().top)/wScroll
      console.log(rate);
      
      $('.bird-box').css({
        'background-position': '0px ' + (-(wScroll/2)-200) +'px',
        'background-size' : '100%'
      })

      $('.bird-box .overlay').css({
        'background-color': 'rgba(0,0,0,'+rate/1.5+')'
      })

      $('.fore-bird').css({
        'background-size' : 'auto ' + ((540+wScroll/4)) +'px',
        'background-position' : wScroll/6+'px'
      })

      $('.back-bird').css({
        'background-size' : 'auto ' + ((200+wScroll/4)) +'px',
        'background-position' : wScroll/6+'px'
      })

      transDiv('.back-bird', wScroll / 22);
      transDiv('.logo', wScroll / 1.75);
      transDiv('.fore-bird', -wScroll / 33);
    }

    function timeAnimation(cssClass, lt, noDotCssClass) {
      $(''+cssClass+':lt('+lt+')').each(function (i) {
        setTimeout(function () {
          $(cssClass).eq(i).addClass(noDotCssClass);
        }, 30 * (i * 2))
      })
    }

    function offsetTopEq(cssClass, eq) {
      return $(cssClass).eq(eq).offset().top
    }

    function translateDiv(cssClass, hRate, hUnit, vRate, vUnit) {
      $(cssClass).css({
        'transform': 'translate(' + hRate + hUnit + ', ' + vRate + vUnit + ')',
      })
    }

    function transDiv(cssClass, vRate) {
      translateDiv(cssClass, 0, 'px', vRate, '%')
    }

    function offsetTop(cssClass) {
      return $(cssClass).offset().top
    }
    // Window Height!
    function windowHeight() {
      return $(window).height()
    }
  }
}

