/**
 * Index Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Index/Home template.
 *
 * @namespace index
 * @file vendors@template.index.js
 * @file template.index.js
 *
 */

import $ from "jquery";
import "slick-carousel";

const elements = {
  homepageSlider: "[data-slider-testimonials]",
  researchSlider: "[data-research-slider]",
  boxSlider: "[data-box-slider]",
  textImageSlider: "[data-text-image-slider]"
};

$(document).ready(function () {

  homepageSlider();

  function homepageSlider() {
    let $homepageSlider = $(elements.homepageSlider),
        $boxSlider = $(elements.boxSlider),
        $textImageSlider = $(elements.textImageSlider),
        $researchSlider = $(elements.researchSlider);

    $homepageSlider.slick({
      swipeToSlide: true,
      arrows: false,
      dots: true,
      slidesToShow: 1,
      infinite: false,
      adaptiveHeight: true
    });

    $homepageSlider.slick('setPosition');
    $homepageSlider.prepend("<div class='slider-quotation-mark'>“</div>");

    $("<span class='prev-slide'><svg width=\"10\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 .515L.515 9 9 17.485\" stroke=\"#030303\" fill=\"none\" fill-rule=\"evenodd\"/></svg></span>").insertBefore($homepageSlider.find(".slick-dots"));
    $("<span class='next-slide'><svg width=\"10\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1 .515L9.485 9 1 17.485\" stroke=\"#030303\" fill=\"none\" fill-rule=\"evenodd\"/></svg></span>").insertAfter($homepageSlider.find(".slick-dots"));

    $textImageSlider.slick({
      swipeToSlide: true,
      arrows: false,
      dots: true,
      slidesToShow: 1,
      infinite: false,
      adaptiveHeight: true
    });

    $textImageSlider.slick('setPosition');
    $("<span class='prev-slide'><svg width=\"10\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 .515L.515 9 9 17.485\" stroke=\"#030303\" fill=\"none\" fill-rule=\"evenodd\"/></svg></span>").insertBefore($textImageSlider.find(".slick-dots"));
    $("<span class='next-slide'><svg width=\"10\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1 .515L9.485 9 1 17.485\" stroke=\"#030303\" fill=\"none\" fill-rule=\"evenodd\"/></svg></span>").insertAfter($textImageSlider.find(".slick-dots"));


    $(".slick-dots, .prev-slide, .next-slide").addClass("slick-navigation");
    $homepageSlider.find(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");
    $textImageSlider.find(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");
    // $(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");

    $(document).on("click", ".prev-slide", function () {
      if ($(this).parents(".text-image__content").length > 0) {
        $textImageSlider.slick("slickPrev");
      } else {
        $homepageSlider.slick("slickPrev");
      }
    });

    $(document).on("click", ".next-slide", function () {
      if ($(this).parents(".text-image__content").length > 0) {
        $textImageSlider.slick("slickNext");
      } else {
        $homepageSlider.slick("slickNext");
      }
    });


    if ($(window).width() < 768) {
      $boxSlider.slick({
        swipeToSlide: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        centerMode: true
      });

      $researchSlider.slick({
        swipeToSlide: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        adaptiveHeight: true
      });

      $researchSlider.find(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");
    }

  }
});
