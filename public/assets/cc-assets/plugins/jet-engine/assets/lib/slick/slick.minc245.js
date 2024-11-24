!(function (a) {
    "use strict";
    "function" == typeof define && define.amd
        ? define(["jquery"], a)
        : "undefined" != typeof exports
        ? (module.exports = a(require("jquery")))
        : a(jQuery);
})(function ($) {
    "use strict";
    var b,
        a = window.Slick || {};
    ((a =
        ((b = 0),
        function (a, d) {
            var c,
                _ = this;
            (_.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: $(a),
                appendDots: $(a),
                arrows: !0,
                asNavFor: null,
                prevArrow:
                    '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow:
                    '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (b, a) {
                    return $('<button type="button" />').text(a + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 0,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
            }),
                (_.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1,
                }),
                $.extend(_, _.initials),
                (_.activeBreakpoint = null),
                (_.animType = null),
                (_.animProp = null),
                (_.breakpoints = []),
                (_.breakpointSettings = []),
                (_.cssTransitions = !1),
                (_.focussed = !1),
                (_.interrupted = !1),
                (_.hidden = "hidden"),
                (_.paused = !0),
                (_.positionProp = null),
                (_.respondTo = null),
                (_.rowCount = 1),
                (_.shouldClick = !0),
                (_.$slider = $(a)),
                (_.$slidesCache = null),
                (_.transformType = null),
                (_.transitionType = null),
                (_.visibilityChange = "visibilitychange"),
                (_.windowWidth = 0),
                (_.windowTimer = null),
                (c = $(a).data("slick") || {}),
                (_.options = $.extend({}, _.defaults, d, c)),
                (_.currentSlide = _.options.initialSlide),
                (_.originalSettings = _.options),
                void 0 !== document.mozHidden
                    ? ((_.hidden = "mozHidden"),
                      (_.visibilityChange = "mozvisibilitychange"))
                    : void 0 !== document.webkitHidden &&
                      ((_.hidden = "webkitHidden"),
                      (_.visibilityChange = "webkitvisibilitychange")),
                (_.autoPlay = $.proxy(_.autoPlay, _)),
                (_.autoPlayClear = $.proxy(_.autoPlayClear, _)),
                (_.autoPlayIterator = $.proxy(_.autoPlayIterator, _)),
                (_.changeSlide = $.proxy(_.changeSlide, _)),
                (_.clickHandler = $.proxy(_.clickHandler, _)),
                (_.selectHandler = $.proxy(_.selectHandler, _)),
                (_.setPosition = $.proxy(_.setPosition, _)),
                (_.swipeHandler = $.proxy(_.swipeHandler, _)),
                (_.dragHandler = $.proxy(_.dragHandler, _)),
                (_.keyHandler = $.proxy(_.keyHandler, _)),
                (_.instanceUid = b++),
                (_.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                _.registerBreakpoints(),
                _.init(!0);
        })).prototype.activateADA = function () {
        this.$slideTrack
            .find(".slick-active")
            .attr({ "aria-hidden": "false" })
            .find("a, input, button, select")
            .attr({ tabindex: "0" });
    }),
        (a.prototype.addSlide = a.prototype.slickAdd =
            function (b, a, c) {
                var _ = this;
                if ("boolean" == typeof a) (c = a), (a = null);
                else if (a < 0 || a >= _.slideCount) return !1;
                _.unload(),
                    "number" == typeof a
                        ? 0 === a && 0 === _.$slides.length
                            ? $(b).appendTo(_.$slideTrack)
                            : c
                            ? $(b).insertBefore(_.$slides.eq(a))
                            : $(b).insertAfter(_.$slides.eq(a))
                        : !0 === c
                        ? $(b).prependTo(_.$slideTrack)
                        : $(b).appendTo(_.$slideTrack),
                    (_.$slides = _.$slideTrack.children(this.options.slide)),
                    _.$slideTrack.children(this.options.slide).detach(),
                    _.$slideTrack.append(_.$slides),
                    _.$slides.each(function (a, b) {
                        $(b).attr("data-slick-index", a);
                    }),
                    (_.$slidesCache = _.$slides),
                    _.reinit();
            }),
        (a.prototype.animateHeight = function () {
            if (
                1 === this.options.slidesToShow &&
                !0 === this.options.adaptiveHeight &&
                !1 === this.options.vertical
            ) {
                var a = this.$slides.eq(this.currentSlide).outerHeight(!0);
                this.$list.animate({ height: a }, this.options.speed);
            }
        }),
        (a.prototype.animateSlide = function (a, b) {
            var c = {},
                _ = this;
            _.animateHeight(),
                !0 === _.options.rtl && !1 === _.options.vertical && (a = -a),
                !1 === _.transformsEnabled
                    ? !1 === _.options.vertical
                        ? _.$slideTrack.animate(
                              { left: a },
                              _.options.speed,
                              _.options.easing,
                              b
                          )
                        : _.$slideTrack.animate(
                              { top: a },
                              _.options.speed,
                              _.options.easing,
                              b
                          )
                    : !1 === _.cssTransitions
                    ? (!0 === _.options.rtl && (_.currentLeft = -_.currentLeft),
                      $({ animStart: _.currentLeft }).animate(
                          { animStart: a },
                          {
                              duration: _.options.speed,
                              easing: _.options.easing,
                              step: function (a) {
                                  (a = Math.ceil(a)),
                                      !1 === _.options.vertical
                                          ? ((c[_.animType] =
                                                "translate(" + a + "px, 0px)"),
                                            _.$slideTrack.css(c))
                                          : ((c[_.animType] =
                                                "translate(0px," + a + "px)"),
                                            _.$slideTrack.css(c));
                              },
                              complete: function () {
                                  b && b.call();
                              },
                          }
                      ))
                    : (_.applyTransition(),
                      (a = Math.ceil(a)),
                      !1 === _.options.vertical
                          ? (c[_.animType] =
                                "translate3d(" + a + "px, 0px, 0px)")
                          : (c[_.animType] =
                                "translate3d(0px," + a + "px, 0px)"),
                      _.$slideTrack.css(c),
                      b &&
                          setTimeout(function () {
                              _.disableTransition(), b.call();
                          }, _.options.speed));
        }),
        (a.prototype.getNavTarget = function () {
            var a = this.options.asNavFor;
            return a && null !== a && (a = $(a).not(this.$slider)), a;
        }),
        (a.prototype.asNavFor = function (b) {
            var a = this.getNavTarget();
            null !== a &&
                "object" == typeof a &&
                a.each(function () {
                    var a = $(this).slick("getSlick");
                    a.unslicked || a.slideHandler(b, !0);
                });
        }),
        (a.prototype.applyTransition = function (b) {
            var _ = this,
                a = {};
            !1 === _.options.fade
                ? (a[_.transitionType] =
                      _.transformType +
                      " " +
                      _.options.speed +
                      "ms " +
                      _.options.cssEase)
                : (a[_.transitionType] =
                      "opacity " + _.options.speed + "ms " + _.options.cssEase),
                !1 === _.options.fade
                    ? _.$slideTrack.css(a)
                    : _.$slides.eq(b).css(a);
        }),
        (a.prototype.autoPlay = function () {
            var _ = this;
            _.autoPlayClear(),
                _.slideCount > _.options.slidesToShow &&
                    (_.autoPlayTimer = setInterval(
                        _.autoPlayIterator,
                        _.options.autoplaySpeed
                    ));
        }),
        (a.prototype.autoPlayClear = function () {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer);
        }),
        (a.prototype.autoPlayIterator = function () {
            var _ = this,
                a = _.currentSlide + _.options.slidesToScroll;
            _.paused ||
                _.interrupted ||
                _.focussed ||
                (!1 === _.options.infinite &&
                    (1 === _.direction &&
                    _.currentSlide + 1 === _.slideCount - 1
                        ? (_.direction = 0)
                        : 0 === _.direction &&
                          ((a = _.currentSlide - _.options.slidesToScroll),
                          _.currentSlide - 1 == 0 && (_.direction = 1))),
                _.slideHandler(a));
        }),
        (a.prototype.buildArrows = function () {
            var _ = this;
            !0 === _.options.arrows &&
                ((_.$prevArrow = $(_.options.prevArrow).addClass(
                    "slick-arrow"
                )),
                (_.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow")),
                _.slideCount > _.options.slidesToShow
                    ? (_.$prevArrow
                          .removeClass("slick-hidden")
                          .removeAttr("aria-hidden tabindex"),
                      _.$nextArrow
                          .removeClass("slick-hidden")
                          .removeAttr("aria-hidden tabindex"),
                      _.htmlExpr.test(_.options.prevArrow) &&
                          _.$prevArrow.prependTo(_.options.appendArrows),
                      _.htmlExpr.test(_.options.nextArrow) &&
                          _.$nextArrow.appendTo(_.options.appendArrows),
                      !0 !== _.options.infinite &&
                          _.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"))
                    : _.$prevArrow
                          .add(_.$nextArrow)
                          .addClass("slick-hidden")
                          .attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (a.prototype.buildDots = function () {
            var a,
                b,
                _ = this;
            if (
                !0 === _.options.dots &&
                _.slideCount > _.options.slidesToShow
            ) {
                for (
                    _.$slider.addClass("slick-dotted"),
                        b = $("<ul />").addClass(_.options.dotsClass),
                        a = 0;
                    a <= _.getDotCount();
                    a += 1
                )
                    b.append(
                        $("<li />").append(
                            _.options.customPaging.call(this, _, a)
                        )
                    );
                (_.$dots = b.appendTo(_.options.appendDots)),
                    _.$dots.find("li").first().addClass("slick-active");
            }
        }),
        (a.prototype.buildOut = function () {
            var _ = this;
            (_.$slides = _.$slider
                .children(_.options.slide + ":not(.slick-cloned)")
                .addClass("slick-slide")),
                (_.slideCount = _.$slides.length),
                _.$slides.each(function (b, a) {
                    $(a)
                        .attr("data-slick-index", b)
                        .data("originalStyling", $(a).attr("style") || "");
                }),
                _.$slider.addClass("slick-slider"),
                (_.$slideTrack =
                    0 === _.slideCount
                        ? $('<div class="slick-track"/>').appendTo(_.$slider)
                        : _.$slides
                              .wrapAll('<div class="slick-track"/>')
                              .parent()),
                (_.$list = _.$slideTrack
                    .wrap('<div class="slick-list"/>')
                    .parent()),
                _.$slideTrack.css("opacity", 0),
                (!0 === _.options.centerMode ||
                    !0 === _.options.swipeToSlide) &&
                    (_.options.slidesToScroll = 1),
                $("img[data-lazy]", _.$slider)
                    .not("[src]")
                    .addClass("slick-loading"),
                _.setupInfinite(),
                _.buildArrows(),
                _.buildDots(),
                _.updateDots(),
                _.setSlideClasses(
                    "number" == typeof _.currentSlide ? _.currentSlide : 0
                ),
                !0 === _.options.draggable && _.$list.addClass("draggable");
        }),
        (a.prototype.buildRows = function () {
            var a, b, c, e, g, d, f;
            if (
                ((e = document.createDocumentFragment()),
                (d = this.$slider.children()),
                this.options.rows > 0)
            ) {
                for (
                    a = 0,
                        f = this.options.slidesPerRow * this.options.rows,
                        g = Math.ceil(d.length / f);
                    a < g;
                    a++
                ) {
                    var h = document.createElement("div");
                    for (b = 0; b < this.options.rows; b++) {
                        var i = document.createElement("div");
                        for (c = 0; c < this.options.slidesPerRow; c++) {
                            var j = a * f + (b * this.options.slidesPerRow + c);
                            d.get(j) && i.appendChild(d.get(j));
                        }
                        h.appendChild(i);
                    }
                    e.appendChild(h);
                }
                this.$slider.empty().append(e),
                    this.$slider
                        .children()
                        .children()
                        .children()
                        .css({
                            width: 100 / this.options.slidesPerRow + "%",
                            display: "inline-block",
                        });
            }
        }),
        (a.prototype.checkResponsive = function (b, h) {
            var c,
                a,
                d,
                _ = this,
                e = !1,
                f = _.$slider.width(),
                g = window.innerWidth || $(window).width();
            if (
                ("window" === _.respondTo
                    ? (d = g)
                    : "slider" === _.respondTo
                    ? (d = f)
                    : "min" === _.respondTo && (d = Math.min(g, f)),
                _.options.responsive &&
                    _.options.responsive.length &&
                    null !== _.options.responsive)
            ) {
                for (c in ((a = null), _.breakpoints))
                    _.breakpoints.hasOwnProperty(c) &&
                        (!1 === _.originalSettings.mobileFirst
                            ? d < _.breakpoints[c] && (a = _.breakpoints[c])
                            : d > _.breakpoints[c] && (a = _.breakpoints[c]));
                null !== a
                    ? null !== _.activeBreakpoint
                        ? (a !== _.activeBreakpoint || h) &&
                          ((_.activeBreakpoint = a),
                          "unslick" === _.breakpointSettings[a]
                              ? _.unslick(a)
                              : ((_.options = $.extend(
                                    {},
                                    _.originalSettings,
                                    _.breakpointSettings[a]
                                )),
                                !0 === b &&
                                    (_.currentSlide = _.options.initialSlide),
                                _.refresh(b)),
                          (e = a))
                        : ((_.activeBreakpoint = a),
                          "unslick" === _.breakpointSettings[a]
                              ? _.unslick(a)
                              : ((_.options = $.extend(
                                    {},
                                    _.originalSettings,
                                    _.breakpointSettings[a]
                                )),
                                !0 === b &&
                                    (_.currentSlide = _.options.initialSlide),
                                _.refresh(b)),
                          (e = a))
                    : null !== _.activeBreakpoint &&
                      ((_.activeBreakpoint = null),
                      (_.options = _.originalSettings),
                      !0 === b && (_.currentSlide = _.options.initialSlide),
                      _.refresh(b),
                      (e = a)),
                    b || !1 === e || _.$slider.trigger("breakpoint", [_, e]);
            }
        }),
        (a.prototype.changeSlide = function (b, e) {
            var c,
                d,
                a = $(b.currentTarget);
            switch (
                (a.is("a") && b.preventDefault(),
                a.is("li") || (a = a.closest("li")),
                (c =
                    this.slideCount % this.options.slidesToScroll != 0
                        ? 0
                        : (this.slideCount - this.currentSlide) %
                          this.options.slidesToScroll),
                b.data.message)
            ) {
                case "previous":
                    (d =
                        0 === c
                            ? this.options.slidesToScroll
                            : this.options.slidesToShow - c),
                        this.slideCount > this.options.slidesToShow &&
                            this.slideHandler(this.currentSlide - d, !1, e);
                    break;
                case "next":
                    (d = 0 === c ? this.options.slidesToScroll : c),
                        this.slideCount > this.options.slidesToShow &&
                            this.slideHandler(this.currentSlide + d, !1, e);
                    break;
                case "index":
                    var f =
                        0 === b.data.index
                            ? 0
                            : b.data.index ||
                              a.index() * this.options.slidesToScroll;
                    this.slideHandler(this.checkNavigable(f), !1, e),
                        a.children().trigger("focus");
                    break;
                default:
                    return;
            }
        }),
        (a.prototype.checkNavigable = function (b) {
            var a, c;
            if (
                ((a = this.getNavigableIndexes()), (c = 0), b > a[a.length - 1])
            )
                b = a[a.length - 1];
            else
                for (var d in a) {
                    if (b < a[d]) {
                        b = c;
                        break;
                    }
                    c = a[d];
                }
            return b;
        }),
        (a.prototype.cleanUpEvents = function () {
            this.options.dots &&
                null !== this.$dots &&
                ($("li", this.$dots)
                    .off("click.slick", this.changeSlide)
                    .off("mouseenter.slick", $.proxy(this.interrupt, this, !0))
                    .off("mouseleave.slick", $.proxy(this.interrupt, this, !1)),
                !0 === this.options.accessibility &&
                    this.$dots.off("keydown.slick", this.keyHandler)),
                this.$slider.off("focus.slick blur.slick"),
                !0 === this.options.arrows &&
                    this.slideCount > this.options.slidesToShow &&
                    (this.$prevArrow &&
                        this.$prevArrow.off("click.slick", this.changeSlide),
                    this.$nextArrow &&
                        this.$nextArrow.off("click.slick", this.changeSlide),
                    !0 === this.options.accessibility &&
                        (this.$prevArrow &&
                            this.$prevArrow.off(
                                "keydown.slick",
                                this.keyHandler
                            ),
                        this.$nextArrow &&
                            this.$nextArrow.off(
                                "keydown.slick",
                                this.keyHandler
                            ))),
                this.$list.off(
                    "touchstart.slick mousedown.slick",
                    this.swipeHandler
                ),
                this.$list.off(
                    "touchmove.slick mousemove.slick",
                    this.swipeHandler
                ),
                this.$list.off(
                    "touchend.slick mouseup.slick",
                    this.swipeHandler
                ),
                this.$list.off(
                    "touchcancel.slick mouseleave.slick",
                    this.swipeHandler
                ),
                this.$list.off("click.slick", this.clickHandler),
                $(document).off(this.visibilityChange, this.visibility),
                this.cleanUpSlideEvents(),
                !0 === this.options.accessibility &&
                    this.$list.off("keydown.slick", this.keyHandler),
                !0 === this.options.focusOnSelect &&
                    $(this.$slideTrack)
                        .children()
                        .off("click.slick", this.selectHandler),
                $(window).off(
                    "orientationchange.slick.slick-" + this.instanceUid,
                    this.orientationChange
                ),
                $(window).off(
                    "resize.slick.slick-" + this.instanceUid,
                    this.resize
                ),
                $("[draggable!=true]", this.$slideTrack).off(
                    "dragstart",
                    this.preventDefault
                ),
                $(window).off(
                    "load.slick.slick-" + this.instanceUid,
                    this.setPosition
                );
        }),
        (a.prototype.cleanUpSlideEvents = function () {
            this.$list.off(
                "mouseenter.slick",
                $.proxy(this.interrupt, this, !0)
            ),
                this.$list.off(
                    "mouseleave.slick",
                    $.proxy(this.interrupt, this, !1)
                );
        }),
        (a.prototype.cleanUpRows = function () {
            var a;
            this.options.rows > 0 &&
                ((a = this.$slides.children().children()).removeAttr("style"),
                this.$slider.empty().append(a));
        }),
        (a.prototype.clickHandler = function (a) {
            !1 === this.shouldClick &&
                (a.stopImmediatePropagation(),
                a.stopPropagation(),
                a.preventDefault());
        }),
        (a.prototype.destroy = function (a) {
            var _ = this;
            _.autoPlayClear(),
                (_.touchObject = {}),
                _.cleanUpEvents(),
                $(".slick-cloned", _.$slider).detach(),
                _.$dots && _.$dots.remove(),
                _.$prevArrow &&
                    _.$prevArrow.length &&
                    (_.$prevArrow
                        .removeClass("slick-disabled slick-arrow slick-hidden")
                        .removeAttr("aria-hidden aria-disabled tabindex")
                        .css("display", ""),
                    _.htmlExpr.test(_.options.prevArrow) &&
                        _.$prevArrow.remove()),
                _.$nextArrow &&
                    _.$nextArrow.length &&
                    (_.$nextArrow
                        .removeClass("slick-disabled slick-arrow slick-hidden")
                        .removeAttr("aria-hidden aria-disabled tabindex")
                        .css("display", ""),
                    _.htmlExpr.test(_.options.nextArrow) &&
                        _.$nextArrow.remove()),
                _.$slides &&
                    (_.$slides
                        .removeClass(
                            "slick-slide slick-active slick-center slick-visible slick-current"
                        )
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            $(this).attr(
                                "style",
                                $(this).data("originalStyling")
                            );
                        }),
                    _.$slideTrack.children(this.options.slide).detach(),
                    _.$slideTrack.detach(),
                    _.$list.detach(),
                    _.$slider.append(_.$slides)),
                _.cleanUpRows(),
                _.$slider.removeClass("slick-slider"),
                _.$slider.removeClass("slick-initialized"),
                _.$slider.removeClass("slick-dotted"),
                (_.unslicked = !0),
                a || _.$slider.trigger("destroy", [_]);
        }),
        (a.prototype.disableTransition = function (b) {
            var _ = this,
                a = {};
            (a[_.transitionType] = ""),
                !1 === _.options.fade
                    ? _.$slideTrack.css(a)
                    : _.$slides.eq(b).css(a);
        }),
        (a.prototype.fadeSlide = function (a, b) {
            var _ = this;
            !1 === _.cssTransitions
                ? (_.$slides.eq(a).css({ zIndex: _.options.zIndex }),
                  _.$slides
                      .eq(a)
                      .animate(
                          { opacity: 1 },
                          _.options.speed,
                          _.options.easing,
                          b
                      ))
                : (_.applyTransition(a),
                  _.$slides.eq(a).css({ opacity: 1, zIndex: _.options.zIndex }),
                  b &&
                      setTimeout(function () {
                          _.disableTransition(a), b.call();
                      }, _.options.speed));
        }),
        (a.prototype.fadeSlideOut = function (a) {
            !1 === this.cssTransitions
                ? this.$slides
                      .eq(a)
                      .animate(
                          { opacity: 0, zIndex: this.options.zIndex - 2 },
                          this.options.speed,
                          this.options.easing
                      )
                : (this.applyTransition(a),
                  this.$slides
                      .eq(a)
                      .css({ opacity: 0, zIndex: this.options.zIndex - 2 }));
        }),
        (a.prototype.filterSlides = a.prototype.slickFilter =
            function (a) {
                var _ = this;
                null !== a &&
                    ((_.$slidesCache = _.$slides),
                    _.unload(),
                    _.$slideTrack.children(this.options.slide).detach(),
                    _.$slidesCache.filter(a).appendTo(_.$slideTrack),
                    _.reinit());
            }),
        (a.prototype.focusHandler = function () {
            var _ = this;
            _.$slider
                .off("focus.slick blur.slick")
                .on("focus.slick", "*", function (a) {
                    var b = $(this);
                    setTimeout(function () {
                        _.options.pauseOnFocus &&
                            b.is(":focus") &&
                            ((_.focussed = !0), _.autoPlay());
                    }, 0);
                })
                .on("blur.slick", "*", function (a) {
                    $(this),
                        _.options.pauseOnFocus &&
                            ((_.focussed = !1), _.autoPlay());
                });
        }),
        (a.prototype.getCurrent = a.prototype.slickCurrentSlide =
            function () {
                return this.currentSlide;
            }),
        (a.prototype.getDotCount = function () {
            var b = 0,
                c = 0,
                a = 0;
            if (!0 === this.options.infinite) {
                if (this.slideCount <= this.options.slidesToShow) ++a;
                else
                    for (; b < this.slideCount; )
                        ++a,
                            (b = c + this.options.slidesToScroll),
                            (c +=
                                this.options.slidesToScroll <=
                                this.options.slidesToShow
                                    ? this.options.slidesToScroll
                                    : this.options.slidesToShow);
            } else if (!0 === this.options.centerMode) a = this.slideCount;
            else if (this.options.asNavFor)
                for (; b < this.slideCount; )
                    ++a,
                        (b = c + this.options.slidesToScroll),
                        (c +=
                            this.options.slidesToScroll <=
                            this.options.slidesToShow
                                ? this.options.slidesToScroll
                                : this.options.slidesToShow);
            else
                a =
                    1 +
                    Math.ceil(
                        (this.slideCount - this.options.slidesToShow) /
                            this.options.slidesToScroll
                    );
            return a - 1;
        }),
        (a.prototype.getLeft = function (a) {
            var e,
                c,
                b,
                f,
                _ = this,
                d = 0;
            return (
                (_.slideOffset = 0),
                (c = _.$slides.first().outerHeight(!0)),
                !0 === _.options.infinite
                    ? (_.slideCount > _.options.slidesToShow &&
                          ((_.slideOffset = -(
                              _.slideWidth *
                              _.options.slidesToShow *
                              1
                          )),
                          (f = -1),
                          !0 === _.options.vertical &&
                              !0 === _.options.centerMode &&
                              (2 === _.options.slidesToShow
                                  ? (f = -1.5)
                                  : 1 === _.options.slidesToShow && (f = -2)),
                          (d = c * _.options.slidesToShow * f)),
                      _.slideCount % _.options.slidesToScroll != 0 &&
                          a + _.options.slidesToScroll > _.slideCount &&
                          _.slideCount > _.options.slidesToShow &&
                          (a > _.slideCount
                              ? ((_.slideOffset = -(
                                    (_.options.slidesToShow -
                                        (a - _.slideCount)) *
                                    _.slideWidth *
                                    1
                                )),
                                (d = -(
                                    (_.options.slidesToShow -
                                        (a - _.slideCount)) *
                                    c *
                                    1
                                )))
                              : ((_.slideOffset = -(
                                    (_.slideCount % _.options.slidesToScroll) *
                                    _.slideWidth *
                                    1
                                )),
                                (d = -(
                                    (_.slideCount % _.options.slidesToScroll) *
                                    c *
                                    1
                                )))))
                    : a + _.options.slidesToShow > _.slideCount &&
                      ((_.slideOffset =
                          (a + _.options.slidesToShow - _.slideCount) *
                          _.slideWidth),
                      (d = (a + _.options.slidesToShow - _.slideCount) * c)),
                _.slideCount <= _.options.slidesToShow &&
                    ((_.slideOffset = 0), (d = 0)),
                !0 === _.options.centerMode &&
                _.slideCount <= _.options.slidesToShow
                    ? (_.slideOffset =
                          (_.slideWidth * Math.floor(_.options.slidesToShow)) /
                              2 -
                          (_.slideWidth * _.slideCount) / 2)
                    : !0 === _.options.centerMode && !0 === _.options.infinite
                    ? (_.slideOffset +=
                          _.slideWidth *
                              Math.floor(_.options.slidesToShow / 2) -
                          _.slideWidth)
                    : !0 === _.options.centerMode &&
                      ((_.slideOffset = 0),
                      (_.slideOffset +=
                          _.slideWidth *
                          Math.floor(_.options.slidesToShow / 2))),
                (e =
                    !1 === _.options.vertical
                        ? -(a * _.slideWidth * 1) + _.slideOffset
                        : -(a * c * 1) + d),
                !0 === _.options.variableWidth &&
                    ((b =
                        _.slideCount <= _.options.slidesToShow ||
                        !1 === _.options.infinite
                            ? _.$slideTrack.children(".slick-slide").eq(a)
                            : _.$slideTrack
                                  .children(".slick-slide")
                                  .eq(a + _.options.slidesToShow)),
                    (e =
                        !0 === _.options.rtl
                            ? b[0]
                                ? -(
                                      (_.$slideTrack.width() -
                                          b[0].offsetLeft -
                                          b.width()) *
                                      1
                                  )
                                : 0
                            : b[0]
                            ? -1 * b[0].offsetLeft
                            : 0),
                    !0 === _.options.centerMode &&
                        ((b =
                            _.slideCount <= _.options.slidesToShow ||
                            !1 === _.options.infinite
                                ? _.$slideTrack.children(".slick-slide").eq(a)
                                : _.$slideTrack
                                      .children(".slick-slide")
                                      .eq(a + _.options.slidesToShow + 1)),
                        (e =
                            !0 === _.options.rtl
                                ? b[0]
                                    ? -(
                                          (_.$slideTrack.width() -
                                              b[0].offsetLeft -
                                              b.width()) *
                                          1
                                      )
                                    : 0
                                : b[0]
                                ? -1 * b[0].offsetLeft
                                : 0),
                        (e += (_.$list.width() - b.outerWidth()) / 2))),
                e
            );
        }),
        (a.prototype.getOption = a.prototype.slickGetOption =
            function (a) {
                return this.options[a];
            }),
        (a.prototype.getNavigableIndexes = function () {
            var b,
                a = 0,
                c = 0,
                d = [];
            for (
                !1 === this.options.infinite
                    ? (b = this.slideCount)
                    : ((a = -1 * this.options.slidesToScroll),
                      (c = -1 * this.options.slidesToScroll),
                      (b = 2 * this.slideCount));
                a < b;

            )
                d.push(a),
                    (a = c + this.options.slidesToScroll),
                    (c +=
                        this.options.slidesToScroll <= this.options.slidesToShow
                            ? this.options.slidesToScroll
                            : this.options.slidesToShow);
            return d;
        }),
        (a.prototype.getSlick = function () {
            return this;
        }),
        (a.prototype.getSlideCount = function () {
            var b,
                c,
                a,
                _ = this;
            return ((a =
                !0 === _.options.centerMode
                    ? Math.floor(_.$list.width() / 2)
                    : 0),
            (c = -1 * _.swipeLeft + a),
            !0 === _.options.swipeToSlide)
                ? (_.$slideTrack.find(".slick-slide").each(function (g, a) {
                      var d, e, f;
                      if (
                          ((d = $(a).outerWidth()),
                          (e = a.offsetLeft),
                          !0 !== _.options.centerMode && (e += d / 2),
                          (f = e + d),
                          c < f)
                      )
                          return (b = a), !1;
                  }),
                  Math.abs($(b).attr("data-slick-index") - _.currentSlide) || 1)
                : _.options.slidesToScroll;
        }),
        (a.prototype.goTo = a.prototype.slickGoTo =
            function (a, b) {
                this.changeSlide(
                    { data: { message: "index", index: parseInt(a) } },
                    b
                );
            }),
        (a.prototype.init = function (a) {
            var _ = this;
            $(_.$slider).hasClass("slick-initialized") ||
                ($(_.$slider).addClass("slick-initialized"),
                _.buildRows(),
                _.buildOut(),
                _.setProps(),
                _.startLoad(),
                _.loadSlider(),
                _.initializeEvents(),
                _.updateArrows(),
                _.updateDots(),
                _.checkResponsive(!0),
                _.focusHandler()),
                a && _.$slider.trigger("init", [_]),
                !0 === _.options.accessibility && _.initADA(),
                _.options.autoplay && ((_.paused = !1), _.autoPlay());
        }),
        (a.prototype.initADA = function () {
            var _ = this,
                c = Math.ceil(_.slideCount / _.options.slidesToShow),
                d = _.getNavigableIndexes().filter(function (a) {
                    return a >= 0 && a < _.slideCount;
                });
            _.$slides
                .add(_.$slideTrack.find(".slick-cloned"))
                .attr({ "aria-hidden": "true", tabindex: "-1" })
                .find("a, input, button, select")
                .attr({ tabindex: "-1" }),
                null !== _.$dots &&
                    (_.$slides
                        .not(_.$slideTrack.find(".slick-cloned"))
                        .each(function (a) {
                            var b = d.indexOf(a);
                            if (
                                ($(this).attr({
                                    role: "tabpanel",
                                    id: "slick-slide" + _.instanceUid + a,
                                    tabindex: -1,
                                }),
                                -1 !== b)
                            ) {
                                var c =
                                    "slick-slide-control" + _.instanceUid + b;
                                $("#" + c).length &&
                                    $(this).attr({ "aria-describedby": c });
                            }
                        }),
                    _.$dots
                        .attr("role", "tablist")
                        .find("li")
                        .each(function (a) {
                            var b = d[a];
                            $(this).attr({ role: "presentation" }),
                                $(this)
                                    .find("button")
                                    .first()
                                    .attr({
                                        role: "tab",
                                        id:
                                            "slick-slide-control" +
                                            _.instanceUid +
                                            a,
                                        "aria-controls":
                                            "slick-slide" + _.instanceUid + b,
                                        "aria-label": a + 1 + " of " + c,
                                        "aria-selected": null,
                                        tabindex: "-1",
                                    });
                        })
                        .eq(_.currentSlide)
                        .find("button")
                        .attr({ "aria-selected": "true", tabindex: "0" })
                        .end());
            for (
                var a = _.currentSlide, b = a + _.options.slidesToShow;
                a < b;
                a++
            )
                _.options.focusOnChange
                    ? _.$slides.eq(a).attr({ tabindex: "0" })
                    : _.$slides.eq(a).removeAttr("tabindex");
            _.activateADA();
        }),
        (a.prototype.initArrowEvents = function () {
            !0 === this.options.arrows &&
                this.slideCount > this.options.slidesToShow &&
                (this.$prevArrow
                    .off("click.slick")
                    .on(
                        "click.slick",
                        { message: "previous" },
                        this.changeSlide
                    ),
                this.$nextArrow
                    .off("click.slick")
                    .on("click.slick", { message: "next" }, this.changeSlide),
                !0 === this.options.accessibility &&
                    (this.$prevArrow.on("keydown.slick", this.keyHandler),
                    this.$nextArrow.on("keydown.slick", this.keyHandler)));
        }),
        (a.prototype.initDotEvents = function () {
            !0 === this.options.dots &&
                this.slideCount > this.options.slidesToShow &&
                ($("li", this.$dots).on(
                    "click.slick",
                    { message: "index" },
                    this.changeSlide
                ),
                !0 === this.options.accessibility &&
                    this.$dots.on("keydown.slick", this.keyHandler)),
                !0 === this.options.dots &&
                    !0 === this.options.pauseOnDotsHover &&
                    this.slideCount > this.options.slidesToShow &&
                    $("li", this.$dots)
                        .on(
                            "mouseenter.slick",
                            $.proxy(this.interrupt, this, !0)
                        )
                        .on(
                            "mouseleave.slick",
                            $.proxy(this.interrupt, this, !1)
                        );
        }),
        (a.prototype.initSlideEvents = function () {
            this.options.pauseOnHover &&
                (this.$list.on(
                    "mouseenter.slick",
                    $.proxy(this.interrupt, this, !0)
                ),
                this.$list.on(
                    "mouseleave.slick",
                    $.proxy(this.interrupt, this, !1)
                ));
        }),
        (a.prototype.initializeEvents = function () {
            this.initArrowEvents(),
                this.initDotEvents(),
                this.initSlideEvents(),
                this.$list.on(
                    "touchstart.slick mousedown.slick",
                    { action: "start" },
                    this.swipeHandler
                ),
                this.$list.on(
                    "touchmove.slick mousemove.slick",
                    { action: "move" },
                    this.swipeHandler
                ),
                this.$list.on(
                    "touchend.slick mouseup.slick",
                    { action: "end" },
                    this.swipeHandler
                ),
                this.$list.on(
                    "touchcancel.slick mouseleave.slick",
                    { action: "end" },
                    this.swipeHandler
                ),
                this.$list.on("click.slick", this.clickHandler),
                $(document).on(
                    this.visibilityChange,
                    $.proxy(this.visibility, this)
                ),
                !0 === this.options.accessibility &&
                    this.$list.on("keydown.slick", this.keyHandler),
                !0 === this.options.focusOnSelect &&
                    $(this.$slideTrack)
                        .children()
                        .on("click.slick", this.selectHandler),
                $(window).on(
                    "orientationchange.slick.slick-" + this.instanceUid,
                    $.proxy(this.orientationChange, this)
                ),
                $(window).on(
                    "resize.slick.slick-" + this.instanceUid,
                    $.proxy(this.resize, this)
                ),
                $("[draggable!=true]", this.$slideTrack).on(
                    "dragstart",
                    this.preventDefault
                ),
                $(window).on(
                    "load.slick.slick-" + this.instanceUid,
                    this.setPosition
                ),
                $(this.setPosition);
        }),
        (a.prototype.initUI = function () {
            !0 === this.options.arrows &&
                this.slideCount > this.options.slidesToShow &&
                (this.$prevArrow.show(), this.$nextArrow.show()),
                !0 === this.options.dots &&
                    this.slideCount > this.options.slidesToShow &&
                    this.$dots.show();
        }),
        (a.prototype.keyHandler = function (a) {
            a.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                (37 === a.keyCode && !0 === this.options.accessibility
                    ? this.changeSlide({
                          data: {
                              message:
                                  !0 === this.options.rtl ? "next" : "previous",
                          },
                      })
                    : 39 === a.keyCode &&
                      !0 === this.options.accessibility &&
                      this.changeSlide({
                          data: {
                              message:
                                  !0 === this.options.rtl ? "previous" : "next",
                          },
                      }));
        }),
        (a.prototype.lazyLoad = function () {
            var c,
                a,
                b,
                _ = this;
            function d(a) {
                $("img[data-lazy]", a).each(function () {
                    var c = $(this),
                        b = $(this).attr("data-lazy"),
                        d = $(this).attr("data-srcset"),
                        e =
                            $(this).attr("data-sizes") ||
                            _.$slider.attr("data-sizes"),
                        a = document.createElement("img");
                    (a.onload = function () {
                        c.animate({ opacity: 0 }, 100, function () {
                            d && (c.attr("srcset", d), e && c.attr("sizes", e)),
                                c
                                    .attr("src", b)
                                    .animate({ opacity: 1 }, 200, function () {
                                        c.removeAttr(
                                            "data-lazy data-srcset data-sizes"
                                        ).removeClass("slick-loading");
                                    }),
                                _.$slider.trigger("lazyLoaded", [_, c, b]);
                        });
                    }),
                        (a.onerror = function () {
                            c
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                                _.$slider.trigger("lazyLoadError", [_, c, b]);
                        }),
                        (a.src = b);
                });
            }
            if (
                (!0 === _.options.centerMode
                    ? !0 === _.options.infinite
                        ? (b =
                              (a =
                                  _.currentSlide +
                                  (_.options.slidesToShow / 2 + 1)) +
                              _.options.slidesToShow +
                              2)
                        : ((a = Math.max(
                              0,
                              _.currentSlide - (_.options.slidesToShow / 2 + 1)
                          )),
                          (b =
                              2 +
                              (_.options.slidesToShow / 2 + 1) +
                              _.currentSlide))
                    : ((b = Math.ceil(
                          (a = _.options.infinite
                              ? _.options.slidesToShow + _.currentSlide
                              : _.currentSlide) + _.options.slidesToShow
                      )),
                      !0 === _.options.fade &&
                          (a > 0 && a--, b <= _.slideCount && b++)),
                (c = _.$slider.find(".slick-slide").slice(a, b)),
                "anticipated" === _.options.lazyLoad)
            )
                for (
                    var e = a - 1,
                        f = b,
                        g = _.$slider.find(".slick-slide"),
                        h = 0;
                    h < _.options.slidesToScroll;
                    h++
                )
                    e < 0 && (e = _.slideCount - 1),
                        (c = (c = c.add(g.eq(e))).add(g.eq(f))),
                        e--,
                        f++;
            d(c),
                _.slideCount <= _.options.slidesToShow
                    ? d(_.$slider.find(".slick-slide"))
                    : _.currentSlide >= _.slideCount - _.options.slidesToShow
                    ? d(
                          _.$slider
                              .find(".slick-cloned")
                              .slice(0, _.options.slidesToShow)
                      )
                    : 0 === _.currentSlide &&
                      d(
                          _.$slider
                              .find(".slick-cloned")
                              .slice(-1 * _.options.slidesToShow)
                      );
        }),
        (a.prototype.loadSlider = function () {
            this.setPosition(),
                this.$slideTrack.css({ opacity: 1 }),
                this.$slider.removeClass("slick-loading"),
                this.initUI(),
                "progressive" === this.options.lazyLoad &&
                    this.progressiveLazyLoad();
        }),
        (a.prototype.next = a.prototype.slickNext =
            function () {
                this.changeSlide({ data: { message: "next" } });
            }),
        (a.prototype.orientationChange = function () {
            this.checkResponsive(), this.setPosition();
        }),
        (a.prototype.pause = a.prototype.slickPause =
            function () {
                var _ = this;
                _.autoPlayClear(), (_.paused = !0);
            }),
        (a.prototype.play = a.prototype.slickPlay =
            function () {
                var _ = this;
                _.autoPlay(),
                    (_.options.autoplay = !0),
                    (_.paused = !1),
                    (_.focussed = !1),
                    (_.interrupted = !1);
            }),
        (a.prototype.postSlide = function (a) {
            var _ = this;
            !_.unslicked &&
                (_.$slider.trigger("afterChange", [_, a]),
                (_.animating = !1),
                _.slideCount > _.options.slidesToShow && _.setPosition(),
                (_.swipeLeft = null),
                _.options.autoplay && _.autoPlay(),
                !0 === _.options.accessibility &&
                    (_.initADA(), _.options.focusOnChange)) &&
                $(_.$slides.get(_.currentSlide)).attr("tabindex", 0).focus();
        }),
        (a.prototype.prev = a.prototype.slickPrev =
            function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
        (a.prototype.preventDefault = function (a) {
            a.preventDefault();
        }),
        (a.prototype.progressiveLazyLoad = function (c) {
            c = c || 1;
            var b,
                d,
                f,
                g,
                a,
                _ = this,
                e = $("img[data-lazy]", _.$slider);
            e.length
                ? ((d = (b = e.first()).attr("data-lazy")),
                  (f = b.attr("data-srcset")),
                  (g = b.attr("data-sizes") || _.$slider.attr("data-sizes")),
                  (a = document.createElement("img")),
                  (a.onload = function () {
                      f && (b.attr("srcset", f), g && b.attr("sizes", g)),
                          b
                              .attr("src", d)
                              .removeAttr("data-lazy data-srcset data-sizes")
                              .removeClass("slick-loading"),
                          !0 === _.options.adaptiveHeight && _.setPosition(),
                          _.$slider.trigger("lazyLoaded", [_, b, d]),
                          _.progressiveLazyLoad();
                  }),
                  (a.onerror = function () {
                      c < 3
                          ? setTimeout(function () {
                                _.progressiveLazyLoad(c + 1);
                            }, 500)
                          : (b
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                            _.$slider.trigger("lazyLoadError", [_, b, d]),
                            _.progressiveLazyLoad());
                  }),
                  (a.src = d))
                : _.$slider.trigger("allImagesLoaded", [_]);
        }),
        (a.prototype.refresh = function (c) {
            var a,
                b,
                _ = this;
            (b = _.slideCount - _.options.slidesToShow),
                !_.options.infinite &&
                    _.currentSlide > b &&
                    (_.currentSlide = b),
                _.slideCount <= _.options.slidesToShow && (_.currentSlide = 0),
                (a = _.currentSlide),
                _.destroy(!0),
                $.extend(_, _.initials, { currentSlide: a }),
                _.init(),
                c ||
                    _.changeSlide({ data: { message: "index", index: a } }, !1);
        }),
        (a.prototype.registerBreakpoints = function () {
            var c,
                d,
                a,
                _ = this,
                b = _.options.responsive || null;
            if ("array" === $.type(b) && b.length) {
                for (c in ((_.respondTo = _.options.respondTo || "window"), b))
                    if (((a = _.breakpoints.length - 1), b.hasOwnProperty(c))) {
                        for (d = b[c].breakpoint; a >= 0; )
                            _.breakpoints[a] &&
                                _.breakpoints[a] === d &&
                                _.breakpoints.splice(a, 1),
                                a--;
                        _.breakpoints.push(d),
                            (_.breakpointSettings[d] = b[c].settings);
                    }
                _.breakpoints.sort(function (a, b) {
                    return _.options.mobileFirst ? a - b : b - a;
                });
            }
        }),
        (a.prototype.reinit = function () {
            var _ = this;
            (_.$slides = _.$slideTrack
                .children(_.options.slide)
                .addClass("slick-slide")),
                (_.slideCount = _.$slides.length),
                _.currentSlide >= _.slideCount &&
                    0 !== _.currentSlide &&
                    (_.currentSlide =
                        _.currentSlide - _.options.slidesToScroll),
                _.slideCount <= _.options.slidesToShow && (_.currentSlide = 0),
                _.registerBreakpoints(),
                _.setProps(),
                _.setupInfinite(),
                _.buildArrows(),
                _.updateArrows(),
                _.initArrowEvents(),
                _.buildDots(),
                _.updateDots(),
                _.initDotEvents(),
                _.cleanUpSlideEvents(),
                _.initSlideEvents(),
                _.checkResponsive(!1, !0),
                !0 === _.options.focusOnSelect &&
                    $(_.$slideTrack)
                        .children()
                        .on("click.slick", _.selectHandler),
                _.setSlideClasses(
                    "number" == typeof _.currentSlide ? _.currentSlide : 0
                ),
                _.setPosition(),
                _.focusHandler(),
                (_.paused = !_.options.autoplay),
                _.autoPlay(),
                _.$slider.trigger("reInit", [_]);
        }),
        (a.prototype.resize = function () {
            var _ = this;
            $(window).width() !== _.windowWidth &&
                (clearTimeout(_.windowDelay),
                (_.windowDelay = window.setTimeout(function () {
                    (_.windowWidth = $(window).width()),
                        _.checkResponsive(),
                        _.unslicked || _.setPosition();
                }, 50)));
        }),
        (a.prototype.removeSlide = a.prototype.slickRemove =
            function (a, b, c) {
                var _ = this;
                if (
                    ((a =
                        "boolean" == typeof a
                            ? !0 === (b = a)
                                ? 0
                                : _.slideCount - 1
                            : !0 === b
                            ? --a
                            : a),
                    _.slideCount < 1 || a < 0 || a > _.slideCount - 1)
                )
                    return !1;
                _.unload(),
                    !0 === c
                        ? _.$slideTrack.children().remove()
                        : _.$slideTrack
                              .children(this.options.slide)
                              .eq(a)
                              .remove(),
                    (_.$slides = _.$slideTrack.children(this.options.slide)),
                    _.$slideTrack.children(this.options.slide).detach(),
                    _.$slideTrack.append(_.$slides),
                    (_.$slidesCache = _.$slides),
                    _.reinit();
            }),
        (a.prototype.setCSS = function (b) {
            var c,
                d,
                _ = this,
                a = {};
            !0 === _.options.rtl && (b = -b),
                (c = "left" == _.positionProp ? Math.ceil(b) + "px" : "0px"),
                (d = "top" == _.positionProp ? Math.ceil(b) + "px" : "0px"),
                (a[_.positionProp] = b),
                !1 === _.transformsEnabled
                    ? _.$slideTrack.css(a)
                    : ((a = {}),
                      !1 === _.cssTransitions
                          ? ((a[_.animType] =
                                "translate(" + c + ", " + d + ")"),
                            _.$slideTrack.css(a))
                          : ((a[_.animType] =
                                "translate3d(" + c + ", " + d + ", 0px)"),
                            _.$slideTrack.css(a)));
        }),
        (a.prototype.setDimensions = function () {
            var _ = this;
            !1 === _.options.vertical
                ? !0 === _.options.centerMode &&
                  _.$list.css({ padding: "0px " + _.options.centerPadding })
                : (_.$list.height(
                      _.$slides.first().outerHeight(!0) * _.options.slidesToShow
                  ),
                  !0 === _.options.centerMode &&
                      _.$list.css({
                          padding: _.options.centerPadding + " 0px",
                      })),
                (_.listWidth = _.$list.width()),
                (_.listHeight = _.$list.height()),
                !1 === _.options.vertical && !1 === _.options.variableWidth
                    ? ((_.slideWidth = Math.ceil(
                          _.listWidth / _.options.slidesToShow
                      )),
                      _.$slideTrack.width(
                          Math.ceil(
                              _.slideWidth *
                                  _.$slideTrack.children(".slick-slide").length
                          )
                      ))
                    : !0 === _.options.variableWidth
                    ? _.$slideTrack.width(5e3 * _.slideCount)
                    : ((_.slideWidth = Math.ceil(_.listWidth)),
                      _.$slideTrack.height(
                          Math.ceil(
                              _.$slides.first().outerHeight(!0) *
                                  _.$slideTrack.children(".slick-slide").length
                          )
                      ));
            var a =
                _.$slides.first().outerWidth(!0) - _.$slides.first().width();
            !1 === _.options.variableWidth &&
                _.$slideTrack.children(".slick-slide").width(_.slideWidth - a);
        }),
        (a.prototype.setFade = function () {
            var a,
                _ = this;
            _.$slides.each(function (c, b) {
                (a = -(_.slideWidth * c * 1)),
                    !0 === _.options.rtl
                        ? $(b).css({
                              position: "relative",
                              right: a,
                              top: 0,
                              zIndex: _.options.zIndex - 2,
                              opacity: 0,
                          })
                        : $(b).css({
                              position: "relative",
                              left: a,
                              top: 0,
                              zIndex: _.options.zIndex - 2,
                              opacity: 0,
                          });
            }),
                _.$slides
                    .eq(_.currentSlide)
                    .css({ zIndex: _.options.zIndex - 1, opacity: 1 });
        }),
        (a.prototype.setHeight = function () {
            if (
                1 === this.options.slidesToShow &&
                !0 === this.options.adaptiveHeight &&
                !1 === this.options.vertical
            ) {
                var a = this.$slides.eq(this.currentSlide).outerHeight(!0);
                this.$list.css("height", a);
            }
        }),
        (a.prototype.setOption = a.prototype.slickSetOption =
            function () {
                var c,
                    d,
                    e,
                    a,
                    b,
                    _ = this,
                    f = !1;
                if (
                    ("object" === $.type(arguments[0])
                        ? ((e = arguments[0]),
                          (f = arguments[1]),
                          (b = "multiple"))
                        : "string" === $.type(arguments[0]) &&
                          ((e = arguments[0]),
                          (a = arguments[1]),
                          (f = arguments[2]),
                          "responsive" === arguments[0] &&
                          "array" === $.type(arguments[1])
                              ? (b = "responsive")
                              : void 0 !== arguments[1] && (b = "single")),
                    "single" === b)
                )
                    _.options[e] = a;
                else if ("multiple" === b)
                    $.each(e, function (a, b) {
                        _.options[a] = b;
                    });
                else if ("responsive" === b)
                    for (d in a)
                        if ("array" !== $.type(_.options.responsive))
                            _.options.responsive = [a[d]];
                        else {
                            for (c = _.options.responsive.length - 1; c >= 0; )
                                _.options.responsive[c].breakpoint ===
                                    a[d].breakpoint &&
                                    _.options.responsive.splice(c, 1),
                                    c--;
                            _.options.responsive.push(a[d]);
                        }
                f && (_.unload(), _.reinit());
            }),
        (a.prototype.setPosition = function () {
            this.setDimensions(),
                this.setHeight(),
                !1 === this.options.fade
                    ? this.setCSS(this.getLeft(this.currentSlide))
                    : this.setFade(),
                this.$slider.trigger("setPosition", [this]);
        }),
        (a.prototype.setProps = function () {
            var _ = this,
                a = document.body.style;
            (_.positionProp = !0 === _.options.vertical ? "top" : "left"),
                "top" === _.positionProp
                    ? _.$slider.addClass("slick-vertical")
                    : _.$slider.removeClass("slick-vertical"),
                (void 0 !== a.WebkitTransition ||
                    void 0 !== a.MozTransition ||
                    void 0 !== a.msTransition) &&
                    !0 === _.options.useCSS &&
                    (_.cssTransitions = !0),
                _.options.fade &&
                    ("number" == typeof _.options.zIndex
                        ? _.options.zIndex < 3 && (_.options.zIndex = 3)
                        : (_.options.zIndex = _.defaults.zIndex)),
                void 0 !== a.OTransform &&
                    ((_.animType = "OTransform"),
                    (_.transformType = "-o-transform"),
                    (_.transitionType = "OTransition"),
                    void 0 === a.perspectiveProperty &&
                        void 0 === a.webkitPerspective &&
                        (_.animType = !1)),
                void 0 !== a.MozTransform &&
                    ((_.animType = "MozTransform"),
                    (_.transformType = "-moz-transform"),
                    (_.transitionType = "MozTransition"),
                    void 0 === a.perspectiveProperty &&
                        void 0 === a.MozPerspective &&
                        (_.animType = !1)),
                void 0 !== a.webkitTransform &&
                    ((_.animType = "webkitTransform"),
                    (_.transformType = "-webkit-transform"),
                    (_.transitionType = "webkitTransition"),
                    void 0 === a.perspectiveProperty &&
                        void 0 === a.webkitPerspective &&
                        (_.animType = !1)),
                void 0 !== a.msTransform &&
                    ((_.animType = "msTransform"),
                    (_.transformType = "-ms-transform"),
                    (_.transitionType = "msTransition"),
                    void 0 === a.msTransform && (_.animType = !1)),
                void 0 !== a.transform &&
                    !1 !== _.animType &&
                    ((_.animType = "transform"),
                    (_.transformType = "transform"),
                    (_.transitionType = "transition")),
                (_.transformsEnabled =
                    _.options.useTransform &&
                    null !== _.animType &&
                    !1 !== _.animType);
        }),
        (a.prototype.setSlideClasses = function (a) {
            var d, b, c, e;
            if (
                ((b = this.$slider
                    .find(".slick-slide")
                    .removeClass("slick-active slick-center slick-current")
                    .attr("aria-hidden", "true")),
                this.$slides.eq(a).addClass("slick-current"),
                !0 === this.options.centerMode)
            ) {
                var f = this.options.slidesToShow % 2 == 0 ? 1 : 0;
                (d = Math.floor(this.options.slidesToShow / 2)),
                    !0 === this.options.infinite &&
                        (a >= d && a <= this.slideCount - 1 - d
                            ? this.$slides
                                  .slice(a - d + f, a + d + 1)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")
                            : ((c = this.options.slidesToShow + a),
                              b
                                  .slice(c - d + 1 + f, c + d + 2)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")),
                        0 === a
                            ? b
                                  .eq(
                                      this.options.slidesToShow +
                                          this.slideCount +
                                          1
                                  )
                                  .addClass("slick-center")
                            : a === this.slideCount - 1 &&
                              b
                                  .eq(this.options.slidesToShow)
                                  .addClass("slick-center")),
                    this.$slides.eq(a).addClass("slick-center");
            } else
                a >= 0 && a <= this.slideCount - this.options.slidesToShow
                    ? this.$slides
                          .slice(a, a + this.options.slidesToShow)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                    : b.length <= this.options.slidesToShow
                    ? b.addClass("slick-active").attr("aria-hidden", "false")
                    : ((e = this.slideCount % this.options.slidesToShow),
                      (c =
                          !0 === this.options.infinite
                              ? this.options.slidesToShow + a
                              : a),
                      this.options.slidesToShow ==
                          this.options.slidesToScroll &&
                      this.slideCount - a < this.options.slidesToShow
                          ? b
                                .slice(
                                    c - (this.options.slidesToShow - e),
                                    c + e
                                )
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                          : b
                                .slice(c, c + this.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false"));
            ("ondemand" === this.options.lazyLoad ||
                "anticipated" === this.options.lazyLoad) &&
                this.lazyLoad();
        }),
        (a.prototype.setupInfinite = function () {
            var a,
                b,
                c,
                _ = this;
            if (
                (!0 === _.options.fade && (_.options.centerMode = !1),
                !0 === _.options.infinite &&
                    !1 === _.options.fade &&
                    ((b = null), _.slideCount > _.options.slidesToShow))
            ) {
                for (
                    c =
                        !0 === _.options.centerMode
                            ? _.options.slidesToShow + 1
                            : _.options.slidesToShow,
                        a = _.slideCount;
                    a > _.slideCount - c;
                    a -= 1
                )
                    (b = a - 1),
                        $(_.$slides[b])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", b - _.slideCount)
                            .prependTo(_.$slideTrack)
                            .addClass("slick-cloned");
                for (a = 0; a < c + _.slideCount; a += 1)
                    (b = a),
                        $(_.$slides[b])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", b + _.slideCount)
                            .appendTo(_.$slideTrack)
                            .addClass("slick-cloned");
                _.$slideTrack
                    .find(".slick-cloned")
                    .find("[id]")
                    .each(function () {
                        $(this).attr("id", "");
                    });
            }
        }),
        (a.prototype.interrupt = function (a) {
            var _ = this;
            a || _.autoPlay(), (_.interrupted = a);
        }),
        (a.prototype.selectHandler = function (b) {
            var c = $(b.target).is(".slick-slide")
                    ? $(b.target)
                    : $(b.target).parents(".slick-slide"),
                a = parseInt(c.attr("data-slick-index"));
            if ((a || (a = 0), this.slideCount <= this.options.slidesToShow)) {
                this.slideHandler(a, !1, !0);
                return;
            }
            this.slideHandler(a);
        }),
        (a.prototype.slideHandler = function (b, e, f) {
            var a,
                c,
                h,
                g,
                d,
                i = null,
                _ = this;
            if (
                ((e = e || !1),
                (!0 !== _.animating || !0 !== _.options.waitForAnimate) &&
                    (!0 !== _.options.fade || _.currentSlide !== b))
            ) {
                if (
                    (!1 === e && _.asNavFor(b),
                    (a = b),
                    (i = _.getLeft(a)),
                    (g = _.getLeft(_.currentSlide)),
                    (_.currentLeft = null === _.swipeLeft ? g : _.swipeLeft),
                    (!1 === _.options.infinite &&
                        !1 === _.options.centerMode &&
                        (b < 0 ||
                            b > _.getDotCount() * _.options.slidesToScroll)) ||
                        (!1 === _.options.infinite &&
                            !0 === _.options.centerMode &&
                            (b < 0 ||
                                b > _.slideCount - _.options.slidesToScroll)))
                ) {
                    !1 === _.options.fade &&
                        ((a = _.currentSlide),
                        !0 !== f && _.slideCount > _.options.slidesToShow
                            ? _.animateSlide(g, function () {
                                  _.postSlide(a);
                              })
                            : _.postSlide(a));
                    return;
                }
                if (
                    (_.options.autoplay && clearInterval(_.autoPlayTimer),
                    (c =
                        a < 0
                            ? _.slideCount % _.options.slidesToScroll != 0
                                ? _.slideCount -
                                  (_.slideCount % _.options.slidesToScroll)
                                : _.slideCount + a
                            : a >= _.slideCount
                            ? _.slideCount % _.options.slidesToScroll != 0
                                ? 0
                                : a - _.slideCount
                            : a),
                    (_.animating = !0),
                    _.$slider.trigger("beforeChange", [_, _.currentSlide, c]),
                    (h = _.currentSlide),
                    (_.currentSlide = c),
                    _.setSlideClasses(_.currentSlide),
                    _.options.asNavFor &&
                        (d = (d = _.getNavTarget()).slick("getSlick"))
                            .slideCount <= d.options.slidesToShow &&
                        d.setSlideClasses(_.currentSlide),
                    _.updateDots(),
                    _.updateArrows(),
                    !0 === _.options.fade)
                ) {
                    !0 !== f
                        ? (_.fadeSlideOut(h),
                          _.fadeSlide(c, function () {
                              _.postSlide(c);
                          }))
                        : _.postSlide(c),
                        _.animateHeight();
                    return;
                }
                !0 !== f && _.slideCount > _.options.slidesToShow
                    ? _.animateSlide(i, function () {
                          _.postSlide(c);
                      })
                    : _.postSlide(c);
            }
        }),
        (a.prototype.startLoad = function () {
            !0 === this.options.arrows &&
                this.slideCount > this.options.slidesToShow &&
                (this.$prevArrow.hide(), this.$nextArrow.hide()),
                !0 === this.options.dots &&
                    this.slideCount > this.options.slidesToShow &&
                    this.$dots.hide(),
                this.$slider.addClass("slick-loading");
        }),
        (a.prototype.swipeDirection = function () {
            var b, c, a;
            return ((b = this.touchObject.startX - this.touchObject.curX),
            (c = Math.atan2(
                this.touchObject.startY - this.touchObject.curY,
                b
            )),
            (a = Math.round((180 * c) / Math.PI)),
            a < 0 && (a = 360 - Math.abs(a)),
            (a <= 45 && a >= 0) || (a <= 360 && a >= 315))
                ? !1 === this.options.rtl
                    ? "left"
                    : "right"
                : a >= 135 && a <= 225
                ? !1 === this.options.rtl
                    ? "right"
                    : "left"
                : !0 === this.options.verticalSwiping
                ? a >= 35 && a <= 135
                    ? "down"
                    : "up"
                : "vertical";
        }),
        (a.prototype.swipeEnd = function (c) {
            var a,
                b,
                _ = this;
            if (((_.dragging = !1), (_.swiping = !1), _.scrolling))
                return (_.scrolling = !1), !1;
            if (
                ((_.interrupted = !1),
                (_.shouldClick = !(_.touchObject.swipeLength > 10)),
                void 0 === _.touchObject.curX)
            )
                return !1;
            if (
                (!0 === _.touchObject.edgeHit &&
                    _.$slider.trigger("edge", [_, _.swipeDirection()]),
                _.touchObject.swipeLength >= _.touchObject.minSwipe)
            ) {
                switch ((b = _.swipeDirection())) {
                    case "left":
                    case "down":
                        (a = _.options.swipeToSlide
                            ? _.checkNavigable(
                                  _.currentSlide + _.getSlideCount()
                              )
                            : _.currentSlide + _.getSlideCount()),
                            (_.currentDirection = 0);
                        break;
                    case "right":
                    case "up":
                        (a = _.options.swipeToSlide
                            ? _.checkNavigable(
                                  _.currentSlide - _.getSlideCount()
                              )
                            : _.currentSlide - _.getSlideCount()),
                            (_.currentDirection = 1);
                }
                "vertical" != b &&
                    (_.slideHandler(a),
                    (_.touchObject = {}),
                    _.$slider.trigger("swipe", [_, b]));
            } else
                _.touchObject.startX !== _.touchObject.curX &&
                    (_.slideHandler(_.currentSlide), (_.touchObject = {}));
        }),
        (a.prototype.swipeHandler = function (a) {
            var _ = this;
            if (
                !1 !== _.options.swipe &&
                (!("ontouchend" in document) || !1 !== _.options.swipe) &&
                (!1 !== _.options.draggable || -1 === a.type.indexOf("mouse"))
            )
                switch (
                    ((_.touchObject.fingerCount =
                        a.originalEvent && void 0 !== a.originalEvent.touches
                            ? a.originalEvent.touches.length
                            : 1),
                    (_.touchObject.minSwipe =
                        _.listWidth / _.options.touchThreshold),
                    !0 === _.options.verticalSwiping &&
                        (_.touchObject.minSwipe =
                            _.listHeight / _.options.touchThreshold),
                    a.data.action)
                ) {
                    case "start":
                        _.swipeStart(a);
                        break;
                    case "move":
                        _.swipeMove(a);
                        break;
                    case "end":
                        _.swipeEnd(a);
                }
        }),
        (a.prototype.swipeMove = function (b) {
            var e,
                f,
                c,
                d,
                a,
                g,
                _ = this;
            return (
                (a =
                    void 0 !== b.originalEvent
                        ? b.originalEvent.touches
                        : null),
                !!_.dragging &&
                    !_.scrolling &&
                    (!a || 1 === a.length) &&
                    (((e = _.getLeft(_.currentSlide)),
                    (_.touchObject.curX =
                        void 0 !== a ? a[0].pageX : b.clientX),
                    (_.touchObject.curY =
                        void 0 !== a ? a[0].pageY : b.clientY),
                    (_.touchObject.swipeLength = Math.round(
                        Math.sqrt(
                            Math.pow(
                                _.touchObject.curX - _.touchObject.startX,
                                2
                            )
                        )
                    )),
                    (g = Math.round(
                        Math.sqrt(
                            Math.pow(
                                _.touchObject.curY - _.touchObject.startY,
                                2
                            )
                        )
                    )),
                    _.options.verticalSwiping || _.swiping || !(g > 4))
                        ? (!0 === _.options.verticalSwiping &&
                              (_.touchObject.swipeLength = g),
                          (f = _.swipeDirection()),
                          void 0 !== b.originalEvent &&
                              _.touchObject.swipeLength > 4 &&
                              ((_.swiping = !0), b.preventDefault()),
                          (d =
                              (!1 === _.options.rtl ? 1 : -1) *
                              (_.touchObject.curX > _.touchObject.startX
                                  ? 1
                                  : -1)),
                          !0 === _.options.verticalSwiping &&
                              (d =
                                  _.touchObject.curY > _.touchObject.startY
                                      ? 1
                                      : -1),
                          (c = _.touchObject.swipeLength),
                          (_.touchObject.edgeHit = !1),
                          !1 === _.options.infinite &&
                              ((0 === _.currentSlide && "right" === f) ||
                                  (_.currentSlide >= _.getDotCount() &&
                                      "left" === f)) &&
                              ((c =
                                  _.touchObject.swipeLength *
                                  _.options.edgeFriction),
                              (_.touchObject.edgeHit = !0)),
                          !1 === _.options.vertical
                              ? (_.swipeLeft = e + c * d)
                              : (_.swipeLeft =
                                    e +
                                    c * (_.$list.height() / _.listWidth) * d),
                          !0 === _.options.verticalSwiping &&
                              (_.swipeLeft = e + c * d),
                          !0 !== _.options.fade &&
                              !1 !== _.options.touchMove &&
                              (!0 === _.animating
                                  ? ((_.swipeLeft = null), !1)
                                  : void _.setCSS(_.swipeLeft)))
                        : ((_.scrolling = !0), !1))
            );
        }),
        (a.prototype.swipeStart = function (a) {
            var b,
                _ = this;
            if (
                ((_.interrupted = !0),
                1 !== _.touchObject.fingerCount ||
                    _.slideCount <= _.options.slidesToShow)
            )
                return (_.touchObject = {}), !1;
            void 0 !== a.originalEvent &&
                void 0 !== a.originalEvent.touches &&
                (b = a.originalEvent.touches[0]),
                (_.touchObject.startX = _.touchObject.curX =
                    void 0 !== b ? b.pageX : a.clientX),
                (_.touchObject.startY = _.touchObject.curY =
                    void 0 !== b ? b.pageY : a.clientY),
                (_.dragging = !0);
        }),
        (a.prototype.unfilterSlides = a.prototype.slickUnfilter =
            function () {
                null !== this.$slidesCache &&
                    (this.unload(),
                    this.$slideTrack.children(this.options.slide).detach(),
                    this.$slidesCache.appendTo(this.$slideTrack),
                    this.reinit());
            }),
        (a.prototype.unload = function () {
            $(".slick-cloned", this.$slider).remove(),
                this.$dots && this.$dots.remove(),
                this.$prevArrow &&
                    this.htmlExpr.test(this.options.prevArrow) &&
                    this.$prevArrow.remove(),
                this.$nextArrow &&
                    this.htmlExpr.test(this.options.nextArrow) &&
                    this.$nextArrow.remove(),
                this.$slides
                    .removeClass(
                        "slick-slide slick-active slick-visible slick-current"
                    )
                    .attr("aria-hidden", "true")
                    .css("width", "");
        }),
        (a.prototype.unslick = function (a) {
            this.$slider.trigger("unslick", [this, a]), this.destroy();
        }),
        (a.prototype.updateArrows = function () {
            this.options.slidesToShow,
                !0 === this.options.arrows &&
                    this.slideCount > this.options.slidesToShow &&
                    !this.options.infinite &&
                    (this.$prevArrow
                        .removeClass("slick-disabled")
                        .attr("aria-disabled", "false"),
                    this.$nextArrow
                        .removeClass("slick-disabled")
                        .attr("aria-disabled", "false"),
                    0 === this.currentSlide
                        ? (this.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          this.$nextArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false"))
                        : this.currentSlide >=
                              this.slideCount - this.options.slidesToShow &&
                          !1 === this.options.centerMode
                        ? (this.$nextArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          this.$prevArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false"))
                        : this.currentSlide >= this.slideCount - 1 &&
                          !0 === this.options.centerMode &&
                          (this.$nextArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          this.$prevArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false")));
        }),
        (a.prototype.updateDots = function () {
            null !== this.$dots &&
                (this.$dots.find("li").removeClass("slick-active").end(),
                this.$dots
                    .find("li")
                    .eq(
                        Math.floor(
                            this.currentSlide / this.options.slidesToScroll
                        )
                    )
                    .addClass("slick-active"));
        }),
        (a.prototype.visibility = function () {
            var _ = this;
            _.options.autoplay &&
                (document[_.hidden]
                    ? (_.interrupted = !0)
                    : (_.interrupted = !1));
        }),
        ($.fn.slick = function () {
            var b,
                d,
                _ = this,
                c = arguments[0],
                e = Array.prototype.slice.call(arguments, 1),
                f = _.length;
            for (b = 0; b < f; b++)
                if (
                    ("object" == typeof c || void 0 === c
                        ? (_[b].slick = new a(_[b], c))
                        : (d = _[b].slick[c].apply(_[b].slick, e)),
                    void 0 !== d)
                )
                    return d;
            return _;
        });
});
