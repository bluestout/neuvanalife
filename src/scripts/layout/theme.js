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
  cartClose: ".cart__header-close",
  acc: {
    button: "[data-accordion-button]",
    content: "[data-accordion-content]",
    parent: "[data-accordion-parent]",
    wrap: "[data-accordion-wrap]",
  }
};

const datasets = {
  acc: {
    button: "accordion-button",
    content: "accordion-content",
    parent: "accordion-parent",
  }
};

const elements = {
  homepageSlider: "[data-slider-testimonials]",
  researchSlider: "[data-research-slider]",
  teamMembersSlider: "[data-team-members-slider]",
  teamCouncilSlider: "[data-team-council-slider]",
  boxSlider: "[data-box-slider]",
  textImageSlider: "[data-text-image-slider]",
  textImageSliderUpper: "[data-text-image-slider-upper]",
  usingXenFeaturesSlider: "[data-using-xen-features-slider]",
  benefitsSlider: "[data-benefits-slider]",
  iconsTextSlider: "[data-icons-text-slider]"
};

let classes = {
  closedDropdown: "closed-dropdown",
  hide: "hide",
  blur: "blur-out",
  active: "active",
  open: "open"
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
    let $parentProduct = $(this).parents(".product-card");

    if ($(this).hasClass(classes.closedDropdown)) {
      $(this).parents(".product-item__submit-wrap").find(selectors.featuresDropdown).show();
    } else {
      $(this).parents(".product-item__submit-wrap").find(selectors.featuresDropdown).hide();
    }

    if ($(window).width() < 1025) {
      if ($(window).width() < 768) {
        if ($parentProduct.index() === 5) {
          $(".recommendations-list.closed").css("height", "2105px");
        }
      } else {
        console.log($parentProduct.index());
        if ($parentProduct.index() === 3 || $parentProduct.index() === 1) {
          $(".recommendations-list.closed").css("height", "auto");
        }
      }
    }

    $(this).toggleClass(classes.closedDropdown);
    $submitBtn.toggleClass(classes.closedDropdown);

  });

  $(".first-time-login .primary-btn").on("click", function () {
    $(".first-time-login").hide();
    sessionStorage.removeItem('firstTimeLogin');
  });

  $(".first-time-login__modal .close-icon").on("click", function () {
    $(".first-time-login").hide();
    sessionStorage.removeItem('firstTimeLogin');
  });

  $(document).on("submit", ".blog_search", function (event) {
    event.preventDefault();

    let query = $(this).find(".search_box").val();

    if ($(".headline").text() === "In The News") {
      let searchQueryString = "/search?q=" + query + "+AND+author:Ami%20Brannon";
      window.location.replace(searchQueryString);
    } else {
      let searchQueryString = "/search?q=" + query + "+AND+author:Blue%20Stout";
      window.location.replace(searchQueryString);
    }
  });

  $(".product-detail__zoom").on("click", function () {
    $(this).parents(".product__images").find(".gallery-cell.is-selected img").trigger("click");
  });

  if ($(window).width() == 1024) {
    let $productCards = $(".recommendations-list").find(".product-card");

    $productCards.each(function(index) {
      if (index > 1) {
        $productCards.eq(index).hide();
      }
    });
  }

  $(".recommendations__show-more").on("click", function () {
    if ($(window).width() == 1024) {
      let $productCards = $(".recommendations-list").find(".product-card");

      $(this).hide();

      $productCards.each(function(index) {
        if (index > 1) {
          $productCards.eq(index).show();
        }
      });
    } else {
      $(this).siblings(".recommendations-list").toggleClass("closed");
      $(this).hide();
    }

    if ($(window).width() < 1025) {
      $(".recommendations-list").css("height", "auto");
    }
  });

  $(".add-to-cart button").on("click", function () {
    $(".cart-container").addClass("cart-opened");
    $("body").addClass("is--no-scroll");
    $(".cart-overlay").fadeIn();
  });

  $(document).on("click", ".product-left", function () {
    let $prevSibling = $(".is-nav-selected").prev();
    $prevSibling[0].click();
  });

  $(document).on("click", ".product-right", function () {
    let $nextSibling = $(".is-nav-selected").next();
    $nextSibling.trigger("click tap touch")
    $nextSibling[0].click();
  });

  $(".cart-container--icon").on("click", function () {
    $(".cart_content").addClass("cart-opened");
    $("body").addClass("blocked-scroll");
    $(".cart-overlay").fadeIn();
  });

  $(".cart-container--icon").on("click", function (event) {
    console.log("test")
    let eventTargetClass = $(event.target)[0].classList[0];

    if (eventTargetClass === "cart__header-close-icon" || eventTargetClass === "cart__header-close-text") {
      $(".cart_content").removeClass("cart-opened");
      $("body").removeClass("blocked-scroll");
      $(".cart-overlay").fadeOut();
    }
  });

  if ($("body").hasClass("customers-account")) {
    let firstLogin = sessionStorage.getItem('firstTimeLogin');
    let emailAddr = $(".account-details").find("ul li").eq(0).text();

    console.log("is account page");

    if (firstLogin !== "true") {
      console.log("is not firsttimelogin");
      return false;
    }

    setTimeout(function () {
      $(".first-time-login").show();
      $(".email-addr").text(emailAddr);
    }, 500);
  }

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
      $(this).parents(".swatch").find(".swatch-element").removeClass("selected-default-swatch");

      let variantId = $(this).data("id");
      $(this).addClass("selected-swatch");
      $(this).parents(".product-wrap").find("#collectionProductId").attr("value", variantId);
      $(this).parents(".product-wrap").find("input[name='id']").attr("value", variantId);
      $(this).parents(".product-wrap").find("input[name='id']").data("productid", variantId);
    }
  });

  let pdpMoney = $(".pdp-money").text();
  let pdpMoneyWithoutCurrency = pdpMoney.split(" ")[0];

  $(".pdp-money").text(pdpMoneyWithoutCurrency);

  $(document).on("click", "#stamped-button-submit", function () {
    setTimeout(function () {
      $(".stamped-thank-you p").show();
    }, 1000);
  });

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

  if ($(window).width() < 768) {
    $(".cart-upsell-product").find(".swatch-element").eq(0).addClass("selected-swatch");
  } else {
    console.log("tes tes");
    $(".cart-upsell-product").find(".swatch-element").eq(0).addClass("selected-default-swatch");
  }

  homepageSlider();
  offcanvasMenu();

  $(document).on("resize", function () {
    offcanvasMenu();
  });

  if ($("body").hasClass("page-landing-page") || $("body").hasClass("page-landing-page-melanie")) {
    $("#shopify-section-lp-pdp .add_to_cart").removeClass("ajax-submit");
    $("#shopify-section-lp-pdp-2 .add_to_cart").removeClass("ajax-submit");
  }

  // landing page redirect
  $("#shopify-section-lp-pdp .add_to_cart").on("click", function (event) {
    if ($("body").hasClass("page-landing-page")) {
      event.preventDefault();
      window.location.replace("/products/intelligent-medicine-bundle");
    }
  });

  $("#shopify-section-lp-pdp-2 .add_to_cart").on("click", function (event) {
    if ($("body").hasClass("page-landing-page-melanie")) {
      event.preventDefault();
      window.location.replace("/products/biohacking-bundle");
    }
  });


  function offcanvasMenu() {
    let ww = $(window).width(),
        offcanvasOffset = -ww;

    if (ww < 1024) {
      $(".cart-container .cart_content").css("right", offcanvasOffset);
    }
  }

  $(document).on("click", selectors.acc.button, handleAccordionClick);

  function handleAccordionClick(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    const $source = $(event.currentTarget);
    const $parent = $source.closest(selectors.acc.parent);
    const index = $source.data(datasets.acc.button);
    const $content = $parent.find('[data-accordion-content="' + index + '"]');
    const $wrap = $source.closest(selectors.acc.wrap);

    if ($parent.length <= 0 || $content.length <= 0) {
      return;
    }

    const closeOthers = $parent.data(datasets.acc.parent) === true;

    // if a parent is set, close neighbor accordions when opening a new one
    if (closeOthers === true) {
      $(selectors.acc.parent)
          .find(selectors.acc.button)
          .not($source)
          .removeClass(classes.open);
      $(selectors.acc.parent)
          .find(selectors.acc.content)
          .not($content)
          .slideUp(200);

      if ($wrap.length > 0) {
        $(selectors.acc.parent)
            .find(selectors.acc.wrap)
            .not($wrap)
            .removeClass(classes.open);
      }
    }
    $content.slideToggle(200);
    $source.toggleClass(classes.open);
    if ($wrap.length > 0) {
      $wrap.toggleClass(classes.open);
    }
  }

  function homepageSlider() {
    let $homepageSlider = $(elements.homepageSlider),
        $boxSlider = $(elements.boxSlider),
        $textImageSlider = $(elements.textImageSlider),
        $textImageSliderUpper = $(elements.textImageSliderUpper),
        $researchSlider = $(elements.researchSlider),
        $usingXenFeaturesSlider = $(elements.usingXenFeaturesSlider),
        $benefitsSlider = $(elements.benefitsSlider),
        $iconsTextSlider = $(elements.iconsTextSlider),
        $teamMembersSlider = $(elements.teamMembersSlider),
        $teamCouncilSlider = $(elements.teamCouncilSlider);

    $homepageSlider.slick({
      swipeToSlide: true,
      arrows: false,
      dots: true,
      slidesToShow: 1,
      infinite: false,
      adaptiveHeight: true
    });

    if ($(window).width() < 768) {
      $(".team-members .product_clear").remove();

      $teamMembersSlider.slick({
        swipeToSlide: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        adaptiveHeight: true
      });

      $teamCouncilSlider.slick({
        swipeToSlide: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        adaptiveHeight: true
      });
    }

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
    let $textImageSliderNavLanding = $(".page-landing-page [data-text-image-slider]").find(".slick-navigation-container");
    let $textImageSliderNavLandingMelanie = $(".page-landing-page-melanie [data-text-image-slider]").find(".slick-navigation-container");
    let $textImageSliderUpperNav = $(".page-the-science [data-text-image-slider-upper]").find(".slick-navigation-container");

    $("[data-slider-testimonials] .text-image__content").append($theScienceNav);
    $("[data-text-image-slider] .text-image__content").append($textImageSliderNav);
    $("[data-text-image-slider] .text-image__content").append($textImageSliderNavLanding);
    $("[data-text-image-slider] .text-image__content").append($textImageSliderNavLandingMelanie);
    $("[data-text-image-slider-upper] .text-image__content").append($textImageSliderUpperNav);

    $(document).on("click", ".prev-slide", function () {
      if ($(this).parents("[data-text-image-slider]").length > 0) {
        $textImageSlider.slick("slickPrev");
      } else if ($(this).parents("[data-text-image-slider-upper]").length > 0) {
        $textImageSliderUpper.slick("slickPrev");
      } else if ($(this).parents("[data-benefits-slider]").length > 0) {
        $benefitsSlider.slick("slickPrev");
      } else {
        $homepageSlider.slick("slickPrev");
      }
    });

    $(document).on("click", ".next-slide", function () {
      if ($(this).parents("[data-text-image-slider]").length > 0) {
        $textImageSlider.slick("slickNext");
      } else if ($(this).parents("[data-text-image-slider-upper]").length > 0) {
        $textImageSliderUpper.slick("slickNext");
      } else if ($(this).parents("[data-benefits-slider]").length > 0) {
        $benefitsSlider.slick("slickNext");
      } else {
        $homepageSlider.slick("slickNext");
      }
    });

    if ($(window).width() < 769) {
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

      $benefitsSlider.slick('setPosition');
      $("<span class='prev-slide'><svg width=\"10\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 .515L.515 9 9 17.485\" stroke=\"#030303\" fill=\"none\" fill-rule=\"evenodd\"/></svg></span>").insertBefore($benefitsSlider.find(".slick-dots"));
      $("<span class='next-slide'><svg width=\"10\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1 .515L9.485 9 1 17.485\" stroke=\"#030303\" fill=\"none\" fill-rule=\"evenodd\"/></svg></span>").insertAfter($benefitsSlider.find(".slick-dots"));

      $(".slick-dots, .prev-slide, .next-slide").addClass("slick-navigation");
      $benefitsSlider.find(".slick-navigation").wrapAll("<div class='slick-navigation-container'></div>");

      let $benefitsSliderNav = $(".page-using-xen [data-benefits-slider]").find(".slick-navigation-container");

    }
  }
});

// Features dropdown

