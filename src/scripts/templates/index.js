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
  textImageSlider: "[data-text-image-slider]",
  textImageSliderUpper: "[data-text-image-slider-upper]"
};

$(document).ready(function () {

  $(".show-more").on("click", function () {
    $(this).siblings(".visible-text").hide();
    $(this).siblings(".full-text").show();

    $(this).hide();
    $(this).siblings(".show-less").show();
  });

  $(".show-less").on("click", function () {
    $(this).siblings(".full-text").hide();
    $(this).siblings(".visible-text").show();

    $(this).hide();
    $(this).siblings(".show-more").show();
  });

  homepageSlider();

  function homepageSlider() {
    let $homepageSlider = $(elements.homepageSlider),
        $boxSlider = $(elements.boxSlider),
        $textImageSlider = $(elements.textImageSlider),
        $textImageSliderUpper = $(elements.textImageSliderUpper),
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


    $textImageSliderUpper.slick({
      swipeToSlide: true,
      arrows: false,
      dots: true,
      slidesToShow: 1,
      infinite: false,
      adaptiveHeight: true
    });

    $textImageSliderUpper.slick('setPosition');
    $("<span class='prev-slide'><svg width=\"10\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 .515L.515 9 9 17.485\" stroke=\"#030303\" fill=\"none\" fill-rule=\"evenodd\"/></svg></span>").insertBefore($textImageSliderUpper.find(".slick-dots"));
    $("<span class='next-slide'><svg width=\"10\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1 .515L9.485 9 1 17.485\" stroke=\"#030303\" fill=\"none\" fill-rule=\"evenodd\"/></svg></span>").insertAfter($textImageSliderUpper.find(".slick-dots"));


    $(".slick-dots, .prev-slide, .next-slide").addClass("slick-navigation");
    $homepageSlider.find(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");
    $textImageSlider.find(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");
    $textImageSliderUpper.find(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");


    let $textImageSliderSlickNav = $textImageSlider.find(".slick-navigation-container");
    $textImageSliderSlickNav.appendTo("[data-text-image-slider] .slick-slide .text-image__content");

    let $textImageSliderUpperSlickNav = $textImageSliderUpper.find(".slick-navigation-container");
    $textImageSliderUpperSlickNav.appendTo("[data-text-image-slider-upper] .slick-slide .text-image__content");

    $(document).on("click", ".prev-slide", function () {
      if ($(this).parents("[data-text-image-slider]").length > 0) {
        $textImageSlider.slick("slickPrev");
      } else if ($(this).parents("[data-text-image-slider-upper]").length > 0) {
        $textImageSliderUpper.slick("slickPrev");
      } else {
        $homepageSlider.slick("slickPrev");
      }
    });

    $(document).on("click", ".next-slide", function () {
      if ($(this).parents("[data-text-image-slider]").length > 0) {
        $textImageSlider.slick("slickNext");
      } else if ($(this).parents("[data-text-image-slider-upper]").length > 0) {
        $textImageSliderUpper.slick("slickNext");
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
