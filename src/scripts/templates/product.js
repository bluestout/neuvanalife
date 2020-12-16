/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 * @file vendors@template.product.js
 * @file template.product.js
 *
 */


import $ from "jquery";
import "slick-carousel";

const classes = {
  hide: "hide",
  blur: "blur-out",
  active: "active",
  open: "open",
};

const keyboardKeys = {
  escape: 27,
};

const datasets = {
  acc: {
    button: "accordion-button",
    content: "accordion-content",
    parent: "accordion-parent",
  }
};

const selectors = {
  acc: {
    button: "[data-accordion-button]",
    content: "[data-accordion-content]",
    parent: "[data-accordion-parent]",
    wrap: "[data-accordion-wrap]",
  },
  slider: {
    influencerSlider: "[data-slider]",
    arrowNav: "[data-arrow-nav]",
  }
};

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

function init() {
  /*
  $(".video-modal").on("click", function () {
    console.log("test");

    return false;
  });
  */

  /*
  $(".video-modal").click(function() {
    $.fancybox({
      'padding'		: 0,
      'autoScale'		: false,
      'transitionIn'	: 'none',
      'transitionOut'	: 'none',
      'title'			: this.title,
      'width'		: 680,
      'height'		: 495,
      'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
      'type'			: 'iframe',
      'swf'			: {
        'wmode'		: 'transparent',
        'allowfullscreen'	: 'true'
      }
    });

    return false;
  });

 */

  let $slider = $(selectors.slider.influencerSlider);

  console.log($slider);

  $slider.slick({
    swipeToSlide: true,
    arrows: true,
    dots: false,
    slidesToShow: 1,
    infinite: false,
    adaptiveHeight: true,
    nextArrow: "<button type='button' class='slick-next slick-arrow'></button>",
    prevArrow: "<button type='button' class='slick-prev slick-arrow'></button>"
  });

  $slider.slick('setPosition');

  $(".slick-prev, .slick-next").appendTo($(selectors.slider.arrowNav));

}

$(document).on("ready", init());
$(document).on("click", selectors.acc.button, handleAccordionClick);

