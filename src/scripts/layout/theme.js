/**
 * Theme Layout Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts and styles for all pages.
 *
 * @namespace theme
 * @file vendors@layout.theme.css.liquid
 * @file vendors@layout.theme.js
 * @file layout.theme.css.liquid
 * @file layout.theme.js
 *
 */

import $ from "jquery";
import "../../styles/theme.scss";
import "../../styles/theme.scss.liquid";
import "slick-carousel";

let selectors = {
  activeIcon: "[data-active-icon]",
  featuredNav: ".featured-section__content-nav",
  contentItem: ".featured-section__content-item",
  featuredMobileTitle: ".featured-section__mobile-title",
  imageItem: ".featured-section__image",
  iconItem: ".featured-section__content-nav-icon",
  selectedIconItem: ".featured-section__content-nav-selected-icon",
  featuresBtn: "[data-features-btn]",
  featuresDropdown: "[data-features-content]",
  zoom: ".product-detail__zoom",
  productThumbnailRight: ".product-right",
  productThumbnailLeft: ".product-left",
  cartClose: ".cart__header-close"
};

const elements = {
  homepageSlider: "[data-slider-testimonials]",
  researchSlider: "[data-research-slider]",
  boxSlider: "[data-box-slider]",
  textImageSlider: "[data-text-image-slider]",
  textImageSliderUpper: "[data-text-image-slider-upper]",
  usingXenFeaturesSlider: "[data-using-xen-features-slider]",
  benefitsSlider: "[data-benefits-slider]",
  iconsTextSlider: "[data-icons-text-slider]"
};

let classes = {
  closedDropdown: "closed-dropdown"
};

// Featured Slider
$(document).ready(function () {
  let $listItems = $(selectors.featuredNav).find("li");
  let $firstListItem = $(selectors.featuredNav).find("li").eq(0);

  // Initially hide all active elements
  $(selectors.selectedIconItem).hide();

  // Display first item
  $firstListItem.addClass("active-index");
  $firstListItem.find(selectors.iconItem).hide();
  $firstListItem.find(selectors.selectedIconItem).show();

  $listItems.on("click", function () {
    let clickedIndex = $(this).index();

    $(selectors.contentItem).fadeOut();
    $(selectors.contentItem).delay(500).eq(clickedIndex).fadeIn();

    $(selectors.imageItem).fadeOut();
    $(selectors.imageItem).delay(500).eq(clickedIndex).fadeIn();

    $(selectors.featuredNav).find("ul li").removeClass("active-index");
    $(selectors.featuredNav).delay(500).find("ul li").eq(clickedIndex).addClass("active-index");

    $(selectors.featuredMobileTitle).fadeOut();
    $(selectors.featuredMobileTitle).delay(500).eq(clickedIndex).fadeIn();

    $(selectors.iconItem).show();
    $(selectors.iconItem).eq(clickedIndex).fadeOut();

    $(selectors.selectedIconItem).hide();
    $(selectors.selectedIconItem).delay(500).eq(clickedIndex).fadeIn();
  });

  $(selectors.featuresBtn).on("click", function (event) {
    event.preventDefault();

    let $submitBtn = $(this).parents(".product-item__submit-wrap").find(".product-item__submit-btn");

    if ($(this).hasClass(classes.closedDropdown)) {
      $(this).parents(".product-item__submit-wrap").find(selectors.featuresDropdown).show();
    } else {
      $(this).parents(".product-item__submit-wrap").find(selectors.featuresDropdown).hide();
    }

    $(this).toggleClass(classes.closedDropdown);
    $submitBtn.toggleClass(classes.closedDropdown);

  });

  $(".product-detail__zoom").on("click", function () {
    $(this).parents(".product__images").find(".gallery-cell.is-selected img").trigger("click");
  });

  $(".recommendations__show-more").on("click", function () {
    $(this).siblings(".recommendations-list").toggleClass("closed");
    $(this).hide();
  });

  $(".add-to-cart button").on("click", function () {
   $(".cart-container").addClass("cart-opened");
   $("body").addClass("is--no-scroll");
   $(".cart-overlay").fadeIn();
  });

  $(document).on("click tap touch", ".product-left", function () {
    let $prevSibling = $(".is-nav-selected").prev();
    $prevSibling[0].click();
  });

  $(document).on("click tap touch", ".product-right", function () {
    let $nextSibling = $(".is-nav-selected").next();
    $nextSibling[0].click();
  });

  $(".cart-container--icon").on("click", function () {
    $(".cart_content").addClass("cart-opened");
    $("body").addClass("blocked-scroll");
    $(".cart-overlay").fadeIn();
  });

  $(".cart-container--icon").on("click", function (event) {
    let eventTargetClass = $(event.target)[0].classList[0];

    if (eventTargetClass === "cart__header-close-icon" || eventTargetClass === "cart__header-close-text") {
      $(".cart_content").removeClass("cart-opened");
      $("body").removeClass("blocked-scroll");
      $(".cart-overlay").fadeOut();
    }
  });

  $(selectors.cartClose).on("click", function () {
    // desktop close cart
    $(".cart-container").removeClass("cart-opened");
    $("body").removeClass("is--no-scroll");
    $("body").removeClass("blocked-scroll");
    $(".cart-overlay").fadeOut();
  });

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

  $(document).on("click", ".parent-link--false", function (event) {
    $("body").addClass("is-active");
  });

  $(".link-dropdown > a").on("click", function (event) {
    event.preventDefault();
  });

  // swatches
  $(document).on("click", ".swatch-element", function () {
    if ($(this).hasClass("available")) {
      $(this).parents(".swatch").find(".swatch-element").removeClass("selected-swatch");

      let variantId = $(this).data("id");
      $(this).addClass("selected-swatch");
      $(this).parents(".product-wrap").find("#collectionProductId").attr("value", variantId);
      $(this).parents(".product-wrap").find("input[name='id']").attr("value", variantId);
      $(this).parents(".product-wrap").find("input[name='id']").data("productid", variantId);
    }
  });

  let pdpMoney = $(".pdp-money").text();
  let pdpMoneyWithoutCurrency = pdpMoney.split(" ")[0];

  console.log(pdpMoneyWithoutCurrency);

  $(".pdp-money").text(pdpMoneyWithoutCurrency);

  // collections add-to-cart
  $(document).on("click", ".collections-product__cta-add-to-cart", function () {
    let collectionProductId = $("#collectionProductId").val();

    let formData = {
      'items': [{
        'id': collectionProductId,
        'quantity': 1
      }]
    };

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then( function(response) {
      return response.json();
    }).catch(function(error) {
      console.error('Error:', error);
    });
  });

  homepageSlider();

  function homepageSlider() {
    let $homepageSlider = $(elements.homepageSlider),
        $boxSlider = $(elements.boxSlider),
        $textImageSlider = $(elements.textImageSlider),
        $textImageSliderUpper = $(elements.textImageSliderUpper),
        $researchSlider = $(elements.researchSlider),
        $usingXenFeaturesSlider = $(elements.usingXenFeaturesSlider),
        $benefitsSlider = $(elements.benefitsSlider),
        $iconsTextSlider = $(elements.iconsTextSlider);

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
    // $(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");

    let $theScienceNav = $(".page-the-science [data-slider-testimonials]").find(".slick-navigation-container");
    let $textImageSliderNav = $(".page-the-science [data-text-image-slider]").find(".slick-navigation-container");
    let $textImageSliderUpperNav = $(".page-the-science [data-text-image-slider-upper]").find(".slick-navigation-container");

    $("[data-slider-testimonials] .text-image__content").append($theScienceNav);
    $("[data-text-image-slider] .text-image__content").append($textImageSliderNav);
    $("[data-text-image-slider-upper] .text-image__content").append($textImageSliderUpperNav);


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

      $usingXenFeaturesSlider.slick({
        swipeToSlide: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        centerMode: true
      });

      $benefitsSlider.slick({
        swipeToSlide: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        centerMode: false
      });

      $iconsTextSlider.slick({
        swipeToSlide: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        centerMode: false
      });

      $researchSlider.find(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");
    }
  }
});

// Features dropdown

