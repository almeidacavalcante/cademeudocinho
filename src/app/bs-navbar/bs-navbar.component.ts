import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(
    private router: Router,
    private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.smoothScroll();
  }

  logout() {
    this.auth.logout()
  }

  goHome() {
    this.router.navigate(['/'])
  }

  smoothScroll() {
    $(document).ready(function () {
      // $fn.scrollSpeed(step, speed, easing);
      $.scrollSpeed(100, 1200);
    });

    // Custom scrolling speed with jQuery
    // Source: github.com/ByNathan/jQuery.scrollSpeed
    // Version: 1.0.2

    (function ($) {

      $.scrollSpeed = function (step, speed, easing) {

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

        $window.on('mousewheel DOMMouseScroll', function (e) {

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

            }, speed, option, function () {

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

            }, speed, option, function () {

              scroll = false;

            });
          }

          return false;

        }).on('scroll', function () {

          if (scrollY && !scroll) root = $window.scrollTop();
          if (scrollX && !scroll) root = $window.scrollLeft();

        }).on('resize', function () {

          if (scrollY && !scroll) view = $window.height();
          if (scrollX && !scroll) view = $window.width();

        });
      };

      $.easing.default = function (x, t, b, c, d) {

        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      };

    })($);
  }


}
