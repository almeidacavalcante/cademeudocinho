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

    this.setupParallax()

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
      if (wScroll > (offsetTop('.blog-posts') - windowHeight())) {

        var relativeScroll = wScroll - offsetTop('.blog-posts') + windowHeight() - 300
        var offset = Math.min(0, relativeScroll)

        var opacity = (wScroll - offsetTop('.blog-posts') + windowHeight()) / (wScroll / 11)

        $('.post-1').css({ 'opacity': opacity })
        $('.post-3').css({ 'opacity': opacity })
        translateDiv('.post-1', (offset / 4), 'px', offset / 3, 'px')
        translateDiv('.post-3', Math.abs(offset / 4), 'px', offset / 3, 'px')
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
        console.log(error);
      }
    }

    function setupHeaderParallax(wScroll){
      transDiv('.back-bird', wScroll / 22);
      transDiv('.logo', wScroll / 1.75);
      transDiv('.fore-bird', wScroll / 33);
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
        'transform': 'translate(' + hRate + hUnit + ', ' + vRate + vUnit + ')'
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

