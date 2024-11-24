!(function (e, t) {
    "use strict";
    var i = {
        init: function () {
            var o = {
                "jet-carousel.default": i.widgetCarousel,
                "jet-circle-progress.default": i.widgetProgress,
                "jet-map.default": i.widgetMap,
                "jet-countdown-timer.default": i.widgetCountdown,
                "jet-posts.default": i.widgetPosts,
                "jet-animated-text.default": i.widgetAnimatedText,
                "jet-animated-box.default": i.widgetAnimatedBox,
                "jet-images-layout.default": i.widgetImagesLayout,
                "jet-slider.default": i.widgetSlider,
                "jet-testimonials.default": i.widgetTestimonials,
                "jet-image-comparison.default": i.widgetImageComparison,
                "jet-instagram-gallery.default": i.widgetInstagramGallery,
                "jet-scroll-navigation.default": i.widgetScrollNavigation,
                "jet-subscribe-form.default": i.widgetSubscribeForm,
                "jet-progress-bar.default": i.widgetProgressBar,
                "jet-portfolio.default": i.widgetPortfolio,
                "jet-timeline.default": i.widgetTimeLine,
                "jet-table.default": i.widgetTable,
                "jet-dropbar.default": i.widgetDropbar,
                "jet-video.default": i.widgetVideo,
                "jet-audio.default": i.widgetAudio,
                "jet-horizontal-timeline.default": i.widgetHorizontalTimeline,
                "mp-timetable.default": i.widgetTimeTable,
                "jet-pie-chart.default": i.widgetPieChart,
                "jet-bar-chart.default": i.widgetBarChart,
                "jet-line-chart.default": i.widgetLineChart,
                "jet-lottie.default": i.widgetLottie,
                "jet-pricing-table.default": i.widgetPricingTable,
            };
            e.each(o, function (e, i) {
                t.hooks.addAction("frontend/element_ready/" + e, i);
            }),
                t.hooks.addAction(
                    "frontend/element_ready/section",
                    i.elementorSection
                ),
                t.hooks.addAction(
                    "frontend/element_ready/container",
                    i.elementorSection
                ),
                window.elementorFrontend.elements.$window.on(
                    "elementor/nested-tabs/activate",
                    (t, o) => {
                        const a = e(o);
                        i.reinitSlickSlider(a), i.initWidgetsHandlers(a);
                    }
                );
        },
        reinitSlickSlider: function (t) {
            var i = t.find(".slick-initialized");
            i.length &&
                i.each(function () {
                    e(this).slick("unslick");
                });
        },
        initWidgetsHandlers: function (t) {
            t.find(
                ".elementor-widget-jet-slider, .elementor-widget-jet-testimonials, .elementor-widget-jet-carousel, .elementor-widget-jet-portfolio, .elementor-widget-jet-horizontal-timeline, .elementor-widget-jet-image-comparison, .elementor-widget-jet-posts, .jet-parallax-section"
            ).each(function () {
                var t = e(this),
                    i = t.data("element_type");
                i &&
                    ("widget" === i &&
                        ((i = t.data("widget_type")),
                        window.elementorFrontend.hooks.doAction(
                            "frontend/element_ready/widget",
                            t,
                            e
                        )),
                    window.elementorFrontend.hooks.doAction(
                        "frontend/element_ready/global",
                        t,
                        e
                    ),
                    window.elementorFrontend.hooks.doAction(
                        "frontend/element_ready/" + i,
                        t,
                        e
                    ));
            });
        },
        initElementsHandlers: function (t) {
            t.find("[data-element_type]").each(function () {
                var t = e(this),
                    i = t.data("element_type");
                i &&
                    ("widget" === i &&
                        ((i = t.data("widget_type")),
                        window.elementorFrontend.hooks.doAction(
                            "frontend/element_ready/widget",
                            t,
                            e
                        )),
                    window.elementorFrontend.hooks.doAction(
                        "frontend/element_ready/global",
                        t,
                        e
                    ),
                    window.elementorFrontend.hooks.doAction(
                        "frontend/element_ready/" + i,
                        t,
                        e
                    ));
            });
        },
        widgetCountdown: function (t) {
            var i,
                o = t.find(".jet-countdown-timer"),
                a = o.data("type"),
                n = null,
                s = o.data("due-date"),
                r = o.data("start-date"),
                l = o.data("expire-actions"),
                d = o.data("evergreen-interval"),
                c = o.data("restart-interval"),
                u = {
                    days: o.find('[data-value="days"]'),
                    hours: o.find('[data-value="hours"]'),
                    minutes: o.find('[data-value="minutes"]'),
                    seconds: o.find('[data-value="seconds"]'),
                },
                f = function () {
                    if (n) {
                        var t = h(n, {
                            days: u.days.length,
                            hours: u.hours.length,
                            minutes: u.minutes.length,
                        });
                        e.each(t.parts, function (e) {
                            var t = u[e];
                            t.length && t.html(this);
                        }),
                            t.total <= 0 && (clearInterval(i), m());
                    }
                },
                p = function (t) {
                    t = t.toString();
                    var i,
                        o = "";
                    return (
                        1 === t.length && (t = 0 + t),
                        (i = t.match(/\d{1}/g)),
                        e.each(i, function (e, t) {
                            o +=
                                '<span class="jet-countdown-timer__digit">' +
                                t +
                                "</span>";
                        }),
                        o
                    );
                },
                h = function (e, t) {
                    var i = e - new Date(),
                        o = Math.floor((i / 1e3) % 60),
                        a = Math.floor((i / 1e3 / 60) % 60),
                        n = Math.floor((i / 36e5) % 24),
                        s = Math.floor(i / 864e5);
                    return (
                        (s < 0 || n < 0 || a < 0) && (o = a = n = s = 0),
                        t.days || ((n += 24 * s), (s = 0)),
                        t.hours || ((a += 60 * n), (n = 0)),
                        t.minutes || ((o += 60 * a), (a = 0)),
                        {
                            total: i,
                            parts: {
                                days: p(s),
                                hours: p(n),
                                minutes: p(a),
                                seconds: p(o),
                            },
                        }
                    );
                },
                m = function () {
                    t.trigger("jetCountdownTimerExpire", t),
                        l &&
                            e.each(l, function (e, a) {
                                switch (a) {
                                    case "redirect":
                                        var s = o.data("expire-redirect-url");
                                        s && (window.location.href = s);
                                        break;
                                    case "message":
                                        t.find(
                                            ".jet-countdown-timer-message"
                                        ).show();
                                        break;
                                    case "hide":
                                        o.hide();
                                        break;
                                    case "restart":
                                        (n = (n = new Date()).setSeconds(
                                            n.getSeconds() + c
                                        )),
                                            f(),
                                            (i = setInterval(f, 1e3));
                                }
                            });
                },
                g = function () {
                    var e = t.data("id"),
                        i = "jet_evergreen_countdown_due_date_" + e,
                        o = "jet_evergreen_countdown_interval_" + e,
                        a = localStorage.getItem(i),
                        n = localStorage.getItem(o),
                        s = function () {
                            var e = new Date(),
                                t = e.setSeconds(e.getSeconds() + d);
                            return (
                                localStorage.setItem(i, t),
                                localStorage.setItem(o, d),
                                t
                            );
                        };
                    return null === a && null === n
                        ? s()
                        : null !== a && d !== parseInt(n, 10)
                        ? s()
                        : a > 0 && parseInt(n, 10) === d
                        ? a
                        : void 0;
                };
            !(function () {
                switch (a) {
                    case "due_date":
                        n = new Date(1e3 * s);
                        break;
                    case "evergreen":
                        d > 0 && (n = g());
                        break;
                    case "endless":
                        var e = new Date(),
                            t = Math.abs(e.getTimezoneOffset()),
                            o = new Date(1e3 * r),
                            l = Math.abs(o.getTimezoneOffset()) - t;
                        e > o && (n = new Date(1e3 * (r + c))),
                            n &&
                                e > n &&
                                (n = n.setSeconds(
                                    n.getSeconds() +
                                        (Math.floor((e - n) / (1e3 * c)) + 1) *
                                            c
                                )),
                            0 != l && (n -= 60 * l * 1e3);
                }
                f(), (i = setInterval(f, 1e3));
            })();
        },
        widgetMap: function (t) {
            var i,
                o,
                a,
                n,
                s = t.find(".jet-map"),
                r = 0,
                l = [];
            function d(e, t = ",") {
                return e.split(t).reduce(function (e, t) {
                    var i = t.split("|"),
                        o = i[0].toLowerCase();
                    if (
                        new RegExp(/[-_a-z0-9]+/).test(o) &&
                        "href" !== o &&
                        "on" !== o.substring(0, 2)
                    )
                        return (
                            e +
                            o +
                            '="' +
                            (void 0 !== i[1] ? i[1].trim() : "") +
                            '" '
                        );
                }, "");
            }
            window.google &&
                s.length &&
                ((o = s.data("init")),
                (a = s.data("pins")),
                !0 === (n = o.pinsAutoClose) && (r = 1),
                (i = new google.maps.Map(s[0], o)),
                a &&
                    e.each(a, function (t, o) {
                        var a,
                            s,
                            c = {
                                position: o.position,
                                map: i,
                                title: o.address,
                            };
                        if ("" !== o.image)
                            if (
                                void 0 !== o.image_width &&
                                void 0 !== o.image_height
                            ) {
                                var u = {
                                    url: o.image,
                                    scaledSize: new google.maps.Size(
                                        o.image_width,
                                        o.image_height
                                    ),
                                    origin: new google.maps.Point(0, 0),
                                    anchor: new google.maps.Point(
                                        o.image_width / 2,
                                        o.image_height / 2
                                    ),
                                };
                                c.icon = u;
                            } else c.icon = o.image;
                        if (
                            ((a = new google.maps.Marker(c)),
                            "" !== o.desc || void 0 !== o.link_title)
                        ) {
                            var f;
                            if (void 0 !== o.link_title)
                                (f =
                                    '<div class="jet-map-pin__wrapper"><a class="jet-map-pin__link" href="' +
                                    o.link.url +
                                    '" ' +
                                    ("on" === o.link.is_external
                                        ? 'target="_blank"'
                                        : "") +
                                    ("on" === o.link.nofollow
                                        ? 'rel="nofollow"'
                                        : "") +
                                    (void 0 !== d(o.link.custom_attributes)
                                        ? d(o.link.custom_attributes)
                                        : "") +
                                    ">" +
                                    o.link_title +
                                    "</a></div>"),
                                    (o.desc += f);
                            (s = new google.maps.InfoWindow({
                                content: o.desc,
                                disableAutoPan: !0,
                            })),
                                (l[t] = s);
                        }
                        a.addListener("click", function () {
                            s.setOptions({ disableAutoPan: !1 }),
                                !0 === n &&
                                    e.each(l, function (e, t) {
                                        t.close();
                                    }),
                                s.open(i, a);
                        }),
                            1 === r
                                ? "visible" === o.state &&
                                  "" !== o.desc &&
                                  (s.open(i, a), r++)
                                : 0 === r &&
                                  "visible" === o.state &&
                                  "" !== o.desc &&
                                  s.open(i, a);
                    }));
        },
        waypoint: function (e, t, i) {
            i = jQuery.extend({ offset: "100%", triggerOnce: !0 }, i);
            return e.elementorWaypoint(function () {
                const e = this.element || this,
                    o = t.apply(e, arguments);
                return i.triggerOnce && this.destroy && this.destroy(), o;
            }, i);
        },
        prepareWaypointOptions: function (e, t) {
            var i = t || {},
                o = e.closest(
                    ".jet-popup__container-inner, .elementor-popup-modal .dialog-message"
                );
            return o[0] && (i.context = o[0]), i;
        },
        widgetProgress: function (a) {
            var n = a.find(".circle-progress");
            if (n.length) {
                var s = n.find(".circle-progress__value"),
                    r = n.find(".circle-progress__meter"),
                    l = parseInt(s.data("value")) / 100,
                    d = a.find(".circle-progress-wrap").data("duration"),
                    c = elementorFrontend.getCurrentDeviceMode(),
                    u = !1,
                    f = o.getElementorElementSettings(a),
                    p = [],
                    h = t.config.responsive.activeBreakpoints;
                (p.desktop = []),
                    m(
                        "desktop",
                        f.circle_size.size
                            ? f.circle_size.size
                            : n[0].getAttribute("width"),
                        f.value_stroke.size
                            ? f.value_stroke.size
                            : n[0]
                                  .getElementsByClassName(
                                      "circle-progress__value"
                                  )[0]
                                  .getAttribute("stroke-width"),
                        f.bg_stroke.size
                            ? f.bg_stroke.size
                            : n[0]
                                  .getElementsByClassName(
                                      "circle-progress__meter"
                                  )[0]
                                  .getAttribute("stroke-width")
                    ),
                    Object.keys(h)
                        .reverse()
                        .forEach(function (e, t) {
                            if ("widescreen" === e) {
                                var i = f["circle_size_" + e].size
                                        ? f["circle_size_" + e].size
                                        : f.circle_size.size,
                                    o = f["value_stroke_" + e].size
                                        ? f["value_stroke_" + e].size
                                        : f.value_stroke.size,
                                    a = f["bg_stroke_" + e].size
                                        ? f["bg_stroke_" + e].size
                                        : f.bg_stroke.size;
                                (p[e] = []), m(e, i, o, a);
                            } else {
                                (i = f["circle_size_" + e].size
                                    ? f["circle_size_" + e].size
                                    : n[0].getAttribute("width")),
                                    (o = f["value_stroke_" + e].size
                                        ? f["value_stroke_" + e].size
                                        : n[0]
                                              .getElementsByClassName(
                                                  "circle-progress__value"
                                              )[0]
                                              .getAttribute("stroke-width")),
                                    (a = f["bg_stroke_" + e].size
                                        ? f["bg_stroke_" + e].size
                                        : n[0]
                                              .getElementsByClassName(
                                                  "circle-progress__meter"
                                              )[0]
                                              .getAttribute("stroke-width"));
                                (p[e] = []), m(e, i, o, a);
                            }
                        }),
                    g(
                        p[c].size,
                        p[c].viewBox,
                        p[c].center,
                        p[c].radius,
                        p[c].valStroke,
                        p[c].bgStroke,
                        p[c].circumference
                    ),
                    i.waypoint(
                        a,
                        function () {
                            var e = a.find(".circle-counter__number"),
                                t = e.data(),
                                i = t.toValue.toString().match(/\.(.*)/);
                            i && (t.rounding = i[1].length),
                                (t.duration = d),
                                e.numerator(t);
                            var o = parseInt(n.data("circumference")) * (1 - l);
                            s.css({
                                transitionDuration: d + "ms",
                                strokeDashoffset: o,
                            }),
                                (u = !0);
                        },
                        i.prepareWaypointOptions(a, {
                            offset: "bottom-in-view",
                        })
                    ),
                    e(window).on(
                        "resize.jetCircleProgress orientationchange.jetCircleProgress",
                        o.debounce(50, function () {
                            (c = elementorFrontend.getCurrentDeviceMode()),
                                p[c] &&
                                    g(
                                        p[c].size,
                                        p[c].viewBox,
                                        p[c].center,
                                        p[c].radius,
                                        p[c].valStroke,
                                        p[c].bgStroke,
                                        p[c].circumference
                                    );
                        })
                    );
            }
            function m(e, t, i, o) {
                var a, n;
                (p[e].size = t),
                    (p[e].viewBox = `0 0 ${t} ${t}`),
                    (p[e].center = t / 2),
                    (n = t / 2),
                    (a = i >= o ? i : o),
                    (p[e].radius = n - a / 2),
                    (p[e].circumference = 2 * Math.PI * p[e].radius),
                    (p[e].valStroke = i),
                    (p[e].bgStroke = o);
            }
            function g(e, t, i, o, a, d, c) {
                var f = c * (1 - l);
                n.attr({
                    width: e,
                    height: e,
                    "data-radius": o,
                    "data-circumference": c,
                }),
                    n[0].setAttribute("viewBox", t),
                    r.attr({ cx: i, cy: i, r: o, "stroke-width": d }),
                    u && s.css({ transitionDuration: "" }),
                    s.attr({ cx: i, cy: i, r: o, "stroke-width": a }),
                    s.css({ strokeDasharray: c, strokeDashoffset: u ? f : c });
            }
        },
        widgetCarousel: function (e) {
            var t = e.find(".jet-carousel"),
                o = t.find(".jet-carousel__fraction-navigation");
            t.length &&
                (!0 === t.data("slider_options").fractionNav &&
                    t
                        .find(".elementor-slick-slider")
                        .on("init reInit afterChange", function (e, t, i, a) {
                            var n = (i || 0) + 1;
                            o.html(
                                '<span class="current">' +
                                    n +
                                    '</span><span class="separator">/</span><span class="total">' +
                                    t.slideCount +
                                    "</span>"
                            );
                        }),
                i.initCarousel(
                    t.find(".elementor-slick-slider"),
                    t.data("slider_options")
                ));
        },
        widgetPosts: function (e) {
            var t = e.find(".jet-carousel"),
                o = t.data("slider_options");
            t.length &&
                ((o.slide = ".jet-posts__item"),
                i.initCarousel(t.find(".jet-posts"), o));
        },
        widgetAnimatedText: function (e) {
            var t,
                i = e.find(".jet-animated-text");
            i.length &&
                ((t = i.data("settings")), new jetAnimatedText(i, t).init());
        },
        widgetAnimatedBox: function (o) {
            i.onAnimatedBoxSectionActivated(o);
            var a,
                n,
                s = o.find(".jet-animated-box"),
                r = s.data("settings"),
                l =
                    ((r = e.extend(
                        {},
                        {
                            widgetId: null,
                            switchEventType: "hover",
                            paperFoldDirection: "left",
                            slideOutDirection: "left",
                            peelCornerPosition: "right",
                        },
                        r
                    )),
                    e(window).scrollTop()),
                d = !0,
                c = Boolean(t.isEditMode()),
                u = e(".jet-animated-box__button--back", o);
            if (s.length)
                switch (r.switchEventType) {
                    case "hover":
                        c
                            ? f()
                            : "ontouchend" in window || "ontouchstart" in window
                            ? (s.on("touchstart", function (t) {
                                  l = e(window).scrollTop();
                              }),
                              s.on("touchend", function (t) {
                                  if (l !== e(window).scrollTop()) return !1;
                                  var i = e(this);
                                  i.hasClass("flipped-stop") ||
                                      (setTimeout(function () {
                                          i.toggleClass("flipped");
                                      }, 10),
                                      i.find(u).on("focus", function () {
                                          s.hasClass("flipped-stop") ||
                                              s.addClass("flipped");
                                      }),
                                      i.find(u).on("focusout", function () {
                                          s.removeClass("flipped");
                                      }));
                              }),
                              e(document).on("touchend", function (t) {
                                  e(t.target).closest(s).length ||
                                      s.hasClass("flipped-stop") ||
                                      (s.hasClass("flipped") &&
                                          s.removeClass("flipped"));
                              }))
                            : (s.on("mouseenter mouseleave", function (t) {
                                  d && "mouseleave" === t.type
                                      ? e(this).hasClass("flipped-stop") ||
                                        e(this).removeClass("flipped")
                                      : d &&
                                        "mouseenter" === t.type &&
                                        (e(this).hasClass("flipped-stop") ||
                                            e(this).addClass("flipped"));
                              }),
                              u.on("focus", function () {
                                  s.hasClass("flipped-stop") ||
                                      s.addClass("flipped");
                              }),
                              u.on("focusout", function () {
                                  s.removeClass("flipped");
                              }));
                        break;
                    case "click":
                        f();
                        break;
                    case "toggle":
                        !(function () {
                            "ontouchend" in window || "ontouchstart" in window
                                ? s.on(
                                      "touchstart",
                                      ".jet-animated-box__toggle",
                                      function (e) {
                                          s.hasClass("flipped-stop") ||
                                              s.toggleClass("flipped");
                                      }
                                  )
                                : s.on(
                                      "click",
                                      ".jet-animated-box__toggle",
                                      function (e) {
                                          s.hasClass("flipped-stop") ||
                                              s.toggleClass("flipped");
                                      }
                                  );
                            u.on("focus", function () {
                                s.hasClass("flipped-stop") ||
                                    s.addClass("flipped");
                            }),
                                u.on("focusout", function () {
                                    s.removeClass("flipped");
                                });
                        })();
                        break;
                    case "scratch":
                        !(function () {
                            var t = document
                                .querySelector(
                                    "#jet-animated-box-" + r.widgetId
                                )
                                .getBoundingClientRect().top;
                            if (c) return !1;
                            var i = e(window).width();
                            e("html, body").scrollTop(0),
                                html2canvas(
                                    document.querySelector(
                                        "#jet-animated-box__front-" + r.widgetId
                                    ),
                                    {
                                        allowTaint: !0,
                                        backgroundColor: null,
                                        windowWidth: e(window).width(),
                                        windowHeight: e(window).height(),
                                        scrollX: 0,
                                        scrollY: -window.scrollY,
                                    }
                                ).then(function (o) {
                                    o.setAttribute(
                                        "id",
                                        "jet-animated-box-canvas-" + r.widgetId
                                    ),
                                        s.prepend(o),
                                        e(
                                            ".jet-animated-box__front",
                                            s
                                        ).fadeOut(300, function () {
                                            e(this).remove();
                                        }),
                                        e(window).one(
                                            "resize.jetScratch",
                                            function (t) {
                                                e(window).width() !== i &&
                                                    ((i = e(window).width()),
                                                    e(o).fadeOut(
                                                        250,
                                                        function () {
                                                            e(this).remove();
                                                        }
                                                    ));
                                            }
                                        );
                                    new jetScratchEffect(
                                        "#jet-animated-box-" + r.widgetId,
                                        "#jet-animated-box-canvas-" +
                                            r.widgetId,
                                        function () {
                                            e(o).fadeOut(300, function () {
                                                e(this).remove(),
                                                    s.removeClass(
                                                        "back-events-inactive"
                                                    );
                                            });
                                        },
                                        r.scratchFillPercent,
                                        t
                                    );
                                });
                        })();
                        break;
                    case "fold":
                        !(function () {
                            if (c) return s.addClass("fold-init"), !1;
                            var t = null,
                                i = "#jet-animated-box__front-" + r.widgetId;
                            (t = new OriDomi(document.querySelector(i), {
                                vPanels: 5,
                                hPanels: 5,
                                speed: 500,
                                ripple: !0,
                                shadingIntensity: 0.9,
                                perspective: 1e3,
                                shading: !1,
                                gapNudge: 0,
                                touchSensitivity: 0.25,
                                touchMoveCallback: function (t, o) {
                                    89.5 < t && e(i).remove();
                                },
                            }).accordion(0, r.paperFoldDirection)),
                                s.addClass("fold-init"),
                                u.on("focus", function () {
                                    t.foldUp();
                                }),
                                u.on("focusout", function () {
                                    t.accordion(0, r.paperFoldDirection);
                                });
                        })();
                        break;
                    case "peel":
                        !(function (t) {
                            if (c) return s.addClass("peel-ready"), !1;
                            var i = e(".jet-animated-box__front", s).clone();
                            e(".jet-animated-box__front", s).addClass(
                                "peel-top"
                            ),
                                i.removeAttr("id"),
                                i.addClass("peel-back"),
                                i.insertAfter(
                                    "#jet-animated-box__front-" + r.widgetId
                                ),
                                e(".jet-animated-box__back", s).addClass(
                                    "peel-bottom"
                                );
                            var o = s.width();
                            s.height();
                            if ("left" === t) {
                                var a = new Peel(
                                    "#jet-animated-box-" + r.widgetId,
                                    { corner: Peel.Corners.TOP_LEFT }
                                );
                                a.setPeelPosition(30, 40);
                            } else {
                                var a = new Peel(
                                    "#jet-animated-box-" + r.widgetId,
                                    { corner: Peel.Corners.TOP_RIGHT }
                                );
                                a.setPeelPosition(o - 30, 40);
                            }
                            a.setFadeThreshold(0.8),
                                u.on("focus", function () {
                                    a.removeEvents(),
                                        e(
                                            ".peel-top, .peel-back, .peel-bottom-shadow",
                                            s
                                        ).remove();
                                }),
                                a.handleDrag(function (t, i, o) {
                                    var n = s.offset(),
                                        r = n.left,
                                        l = n.top,
                                        d = i - r,
                                        c = o - l;
                                    (d = d < 0 ? (d *= 3) : d),
                                        (c = c < 0 ? (c *= 3) : c),
                                        0.98 < this.getAmountClipped() &&
                                            (this.removeEvents(),
                                            e(
                                                ".peel-top, .peel-back, .peel-bottom-shadow",
                                                s
                                            ).remove()),
                                        a.setPeelPosition(
                                            Math.round(d),
                                            Math.round(c)
                                        );
                                });
                        })(r.peelCornerPosition);
                        break;
                    case "slide-out":
                        (a = e(".jet-animated-box__front", s)),
                            e(".jet-animated-box__back", s),
                            s.width(),
                            s.height(),
                            (n =
                                "left" === r.slideOutDirection ||
                                "right" === r.slideOutDirection
                                    ? "x"
                                    : "y"),
                            a.draggable({
                                axis: n,
                                drag: function (e, t) {
                                    var i = t.position;
                                    switch (r.slideOutDirection) {
                                        case "left":
                                            i.left >= 0 &&
                                                (t.position.left = 0);
                                            break;
                                        case "right":
                                            i.left <= 0 &&
                                                (t.position.left = 0);
                                            break;
                                        case "top":
                                            i.top >= 0 && (t.position.top = 0);
                                            break;
                                        case "bottom":
                                            i.top <= 0 && (t.position.top = 0);
                                    }
                                },
                            }),
                            u.on("focus", function () {
                                a.draggable("disable"), a.hide();
                            });
                }
            function f() {
                "ontouchend" in window || "ontouchstart" in window
                    ? (s.on("touchstart", function (t) {
                          l = e(window).scrollTop();
                      }),
                      s.on("touchend", function (t) {
                          if (l !== e(window).scrollTop()) return !1;
                          var i = e(this);
                          i.hasClass("flipped-stop") ||
                              setTimeout(function () {
                                  i.toggleClass("flipped");
                              }, 10);
                      }),
                      e(document).on("touchend", function (t) {
                          e(t.target).closest(s).length ||
                              s.hasClass("flipped-stop") ||
                              (s.hasClass("flipped") &&
                                  s.removeClass("flipped"));
                      }))
                    : (s.on("click", function (e) {
                          s.hasClass("flipped-stop") ||
                              s.toggleClass("flipped");
                      }),
                      u.on("focus", function () {
                          s.hasClass("flipped-stop") || s.addClass("flipped");
                      }),
                      u.on("focusout", function () {
                          s.removeClass("flipped");
                      }));
            }
        },
        onAnimatedBoxSectionActivated: function (e) {
            if (
                window.elementor &&
                window.JetElementsEditor &&
                window.JetElementsEditor.activeSection
            ) {
                var t = window.JetElementsEditor.activeSection;
                -1 !==
                ["section_back_content", "section_action_button_style"].indexOf(
                    t
                )
                    ? (e.find(".jet-animated-box").addClass("flipped"),
                      e.find(".jet-animated-box").addClass("flipped-stop"))
                    : (e.find(".jet-animated-box").removeClass("flipped"),
                      e.find(".jet-animated-box").removeClass("flipped-stop"));
            }
        },
        widgetImagesLayout: function (e) {
            var t,
                i = e.find(".jet-images-layout");
            i.length &&
                ((t = i.data("settings")), new jetImagesLayout(i, t).init());
        },
        widgetPortfolio: function (t) {
            var i = t.find(".jet-portfolio"),
                a = o.getElementorElementSettings(t),
                n = { id: t.data("id") };
            i.length &&
                ((n = e.extend({}, n, i.data("settings"), a)),
                new jetPortfolio(i, n).init());
        },
        widgetInstagramGallery: function (t) {
            var i,
                o,
                a = t.find(".jet-instagram-gallery__instance");
            a.length &&
                ((o = a.data("settings")),
                (i = { layoutType: "masonry" }),
                e.extend(i, o),
                "masonry" === o.layoutType &&
                    (salvattore.init(),
                    e(window).on("resize orientationchange", function () {
                        salvattore.rescanMediaQueries();
                    })));
        },
        widgetScrollNavigation: function (e) {
            var t = e.find(".jet-scroll-navigation"),
                i = t.data("settings");
            new jetScrollNavigation(e, t, i).init();
        },
        widgetSubscribeForm: function (t) {
            var i = t.find(".jet-subscribe-form"),
                a = t.data("id"),
                n = i.data("settings"),
                s = null,
                r = "jet_subscribe_form_ajax",
                l = !1,
                d = e(".jet-subscribe-form__form", i),
                c =
                    (e(".jet-subscribe-form__fields", i),
                    e(".jet-subscribe-form__mail-field", i)),
                u = c.data("instance-data"),
                f = e(".jet-subscribe-form__submit", i),
                p = e(".jet-subscribe-form__message", i),
                h =
                    window.jetElements.messages.invalidMail ||
                    "Please specify a valid email";
            function m() {
                var t = c.val(),
                    m = {
                        email: t,
                        use_target_list_id: n.use_target_list_id || !1,
                        target_list_id: n.target_list_id || "",
                        data: u,
                    },
                    g = d.serializeArray(),
                    v = {};
                o.validateEmail(t)
                    ? (e.each(g, function (e, t) {
                          "email" === t.name
                              ? (m[t.name] = t.value)
                              : (v[t.name] = t.value);
                      }),
                      (m.additional = v),
                      !l && s && s.abort(),
                      (s = e.ajax({
                          type: "POST",
                          url: window.jetElements.ajaxUrl,
                          data: { action: r, data: m },
                          cache: !1,
                          beforeSend: function () {
                              f.addClass("loading"), (l = !1);
                          },
                          success: function (t) {
                              var o = t.type,
                                  s = t.message || "",
                                  r = "jet-subscribe-form--response-" + o;
                              f.removeClass("loading"),
                                  (l = !0),
                                  i.removeClass(
                                      "jet-subscribe-form--response-error"
                                  ),
                                  i.addClass(r),
                                  e("span", p).html(s),
                                  p.css({ visibility: "visible" }),
                                  setTimeout(function () {
                                      p.css({ visibility: "hidden" }),
                                          i.removeClass(r);
                                  }, 2e4),
                                  n.redirect &&
                                      (window.location.href = n.redirect_url),
                                  e(window).trigger({
                                      type: "jet-elements/subscribe",
                                      elementId: a,
                                      successType: o,
                                      inputData: u,
                                  });
                          },
                      })))
                    : (c.addClass("mail-invalid"),
                      i.addClass("jet-subscribe-form--response-error"),
                      e("span", p).html(h),
                      p.css({ visibility: "visible" }),
                      setTimeout(function () {
                          i.removeClass("jet-subscribe-form--response-error"),
                              p.css({ visibility: "hidden" }),
                              c.removeClass("mail-invalid");
                      }, 2e4));
            }
            c.on("focus", function () {
                c.removeClass("mail-invalid");
            }),
                e(document).keydown(function (e) {
                    if (13 === e.keyCode && c.is(":focus")) return m(), !1;
                }),
                f.on("click", function () {
                    return m(), !1;
                });
        },
        widgetProgressBar: function (t) {
            var o = t.find(".jet-progress-bar"),
                a = o.data("percent"),
                n = o.data("type");
            i.waypoint(
                o,
                function (t) {
                    var i = e(this),
                        s = { charged: 0 },
                        r = e(".jet-progress-bar__status-bar", i),
                        l = e(".jet-progress-bar__percent-value", i),
                        d = o.data("current-value"),
                        c = o.data("max-value");
                    if (d && c) {
                        if (d > c) return;
                        s = { Counter: 0 };
                    }
                    "type-7" == n
                        ? r.css({ height: a + "%" })
                        : r.css({ width: a + "%" }),
                        anime({
                            targets: s,
                            charged: a,
                            round: 1,
                            duration: 1e3,
                            easing: "easeInOutQuad",
                            begin: function () {
                                d &&
                                    c &&
                                    e({ Counter: 0 }).animate(
                                        { Counter: d },
                                        {
                                            duration: 1e3,
                                            easing: "swing",
                                            step: function (e) {
                                                l.text(Math.round(e) + "/" + c);
                                            },
                                        }
                                    );
                            },
                            update: function () {
                                l.html(s.charged);
                            },
                        });
                },
                i.prepareWaypointOptions(t)
            );
        },
        widgetSlider: function (i) {
            var a,
                n,
                s,
                r = i.find(".jet-slider"),
                l = (e(".sp-image", r), e(".jet-slider__item", r)),
                d = "",
                c = "",
                u = r.data("settings") || {},
                f = o.getElementorElementSettings(i),
                p = {},
                h = t.config.responsive.activeBreakpoints,
                m = e.extend(
                    {},
                    {
                        imageScaleMode: "cover",
                        slideDistance: { size: 10, unit: "px" },
                        slideDuration: 500,
                        sliderAutoplay: !0,
                        sliderAutoplayDelay: 2e3,
                        sliderAutoplayOnHover: "pause",
                        sliderFadeMode: !1,
                        sliderFullScreen: !0,
                        sliderFullscreenIcon: "",
                        sliderHeight: { size: 600, unit: "px" },
                        sliderLoop: !0,
                        sliderNaviOnHover: !1,
                        sliderNavigation: !0,
                        sliderNavigationIcon: "",
                        sliderPagination: !1,
                        sliderShuffle: !1,
                        sliderWidth: { size: 100, unit: "%" },
                        thumbnailWidth: 120,
                        thumbnailHeight: 80,
                        thumbnails: !0,
                        rightToLeft: !1,
                    },
                    u
                ),
                g = r.find(".jet-slider__fraction-pagination"),
                v = Boolean(t.isEditMode());
            if (r.length) {
                l.each(function () {
                    var i = e(this).find(".jet-slider__content");
                    if (i.data("slide-url") && !t.isEditMode()) {
                        let e, t;
                        i.on("mousedown touchstart", function (e) {
                            (window.XPos =
                                e.pageX ||
                                e.originalEvent.changedTouches[0].pageX),
                                (window.YPos =
                                    e.pageY ||
                                    e.originalEvent.changedTouches[0].pageY);
                        }),
                            i.on("mouseup touchend", function (o) {
                                if (
                                    ((d = i.data("slide-url")),
                                    (c = i.data("slide-url-target")),
                                    (e =
                                        o.pageX ||
                                        o.originalEvent.changedTouches[0]
                                            .pageX),
                                    (t =
                                        o.pageY ||
                                        o.originalEvent.changedTouches[0]
                                            .pageY),
                                    window.XPos === e && window.YPos === t)
                                ) {
                                    if ("_blank" === c)
                                        return void window.open(d);
                                    window.location = d;
                                }
                            });
                    }
                }),
                    (a =
                        f.slider_height && "custom" === f.slider_height.unit
                            ? f.slider_height.size
                            : "" != f.slider_height.size
                            ? f.slider_height.size + f.slider_height.unit
                            : "600px"),
                    (n =
                        "thumbnail_height" in f && "" != f.thumbnail_height
                            ? f.thumbnail_height
                            : 80),
                    (s =
                        "thumbnail_width" in f && "" != f.thumbnail_width
                            ? f.thumbnail_width
                            : 120);
                var w = e(window).height(),
                    _ = e(document).height(),
                    b = v && w < _ ? 18 : 1;
                Object.keys(h).forEach(function (e) {
                    if ("widescreen" === e) {
                        var t = h[e].value - b,
                            i =
                                f["slider_height_" + e] &&
                                "custom" === f["slider_height_" + e].unit
                                    ? f.slider_height.size
                                    : "" != f["slider_height_" + e].size
                                    ? f["slider_height_" + e].size +
                                      f["slider_height_" + e].unit
                                    : a,
                            o =
                                "" != f["thumbnail_height_" + e]
                                    ? f["thumbnail_height_" + e]
                                    : n,
                            r =
                                "" != f["thumbnail_width_" + e]
                                    ? f["thumbnail_width_" + e]
                                    : s,
                            l =
                                "" != f.slider_height.size
                                    ? f.slider_height.size +
                                      f.slider_height.unit
                                    : m.sliderHeight.size + m.sliderHeight.unit,
                            d =
                                "" != f.thumbnail_height
                                    ? f.thumbnail_height
                                    : m.thumbnailHeight,
                            c =
                                "" != f.thumbnail_width
                                    ? f.thumbnail_width
                                    : m.thumbnailWidth;
                        if (!(i || o || r)) return;
                        (p[t] = {}),
                            i && ((a = i), (p[t].height = l)),
                            o && ((n = o), (p[t].thumbnailHeight = d)),
                            r && ((s = r), (p[t].thumbnailWidth = c));
                    } else {
                        (t = h[e].value - b),
                            (o =
                                !!f["thumbnail_height_" + e] &&
                                f["thumbnail_height_" + e]),
                            (r =
                                !!f["thumbnail_width_" + e] &&
                                f["thumbnail_width_" + e]);
                        if (
                            !(
                                (i =
                                    "custom" === f["slider_height_" + e].unit
                                        ? f["slider_height_" + e].size
                                        : "" != f["slider_height_" + e].size &&
                                          f["slider_height_" + e].size +
                                              f["slider_height_" + e].unit) ||
                                o ||
                                r
                            )
                        )
                            return;
                        (p[t] = {}),
                            i && (p[t].height = i),
                            o && (p[t].thumbnailHeight = o),
                            r && (p[t].thumbnailWidth = r);
                    }
                }),
                    e(".slider-pro", r).sliderPro({
                        width: m.sliderWidth.size + m.sliderWidth.unit,
                        height: a,
                        arrows: m.sliderNavigation,
                        fadeArrows: m.sliderNaviOnHover,
                        buttons: m.sliderPagination,
                        autoplay: m.sliderAutoplay,
                        autoplayDelay: m.sliderAutoplayDelay,
                        autoplayOnHover: m.sliderAutoplayOnHover,
                        fullScreen: m.sliderFullScreen,
                        shuffle: m.sliderShuffle,
                        loop: m.sliderLoop,
                        fade: m.sliderFadeMode,
                        slideDistance:
                            "string" != typeof m.slideDistance.size
                                ? m.slideDistance.size
                                : 0,
                        slideAnimationDuration: +m.slideDuration,
                        imageScaleMode: "exact",
                        waitForLayers: !1,
                        grabCursor: !1,
                        thumbnailWidth: s,
                        thumbnailHeight: n,
                        rightToLeft: m.rightToLeft,
                        touchSwipe: m.touchswipe,
                        init: function () {
                            var t = e("." + m.sliderFullscreenIcon).html(),
                                i = e("." + m.sliderNavigationIcon).html();
                            e(".sp-full-screen-button", r).html(t),
                                e(".sp-previous-arrow", r).html(i),
                                e(".sp-next-arrow", r).html(i),
                                e(".slider-pro", r).addClass("slider-loaded"),
                                this.resize();
                        },
                        gotoSlideComplete: function () {
                            if (!0 === m.fractionPag) {
                                var e =
                                    (this.getSelectedSlide()
                                        ? this.getSelectedSlide()
                                        : 0) + 1;
                                g.html(
                                    '<span class="current">' +
                                        e +
                                        '</span><span class="separator">/</span><span class="total">' +
                                        this.getTotalSlides() +
                                        "</span>"
                                );
                            }
                            elementorFrontend.elements.$window.trigger(
                                "elementor/bg-video/recalc"
                            );
                        },
                        update: function () {
                            if (!0 === m.fractionPag) {
                                var e =
                                    (this.getSelectedSlide()
                                        ? this.getSelectedSlide()
                                        : 0) + 1;
                                g.html(
                                    '<span class="current">' +
                                        e +
                                        '</span><span class="separator">/</span><span class="total">' +
                                        this.getTotalSlides() +
                                        "</span>"
                                );
                            }
                        },
                        breakpoints: p,
                    }),
                    e(".slider-pro", r).on("gotoSlide", function () {
                        r.find("[data-element_type]").each(function () {
                            window.elementorFrontend.hooks.doAction(
                                "frontend/element_ready/global",
                                e(this),
                                e
                            );
                        });
                    });
            }
        },
        widgetTestimonials: function (t) {
            var o = t.find(".jet-testimonials__instance"),
                a =
                    (e(".jet-testimonials__figure", o),
                    e(".jet-testimonials__content", o)),
                n = o.data("settings");
            o.data("rating-settings");
            o.length &&
                (a.each(function () {
                    var t = e(".jet-testimonials__rating", this);
                    if (t) {
                        var i = t.data("rating");
                        t.each(function () {
                            e("i", this).each(function (t) {
                                if (t <= i - 1) {
                                    var o = e(this).data("active-star");
                                    e(this).addClass(o);
                                } else {
                                    o = e(this).data("star");
                                    e(this).addClass(o);
                                }
                            });
                        });
                    }
                }),
                (n.adaptiveHeight = n.adaptiveHeight),
                (n.slide = ".jet-testimonials__item"),
                i.initCarousel(o, n));
        },
        widgetImageComparison: function (t) {
            var o = t.find(".jet-image-comparison__instance"),
                a =
                    (e(".jet-image-comparison__container", o),
                    o.data("settings"));
            t.data("id");
            o.length &&
                (window.juxtapose.scanPage(".jet-juxtapose"),
                (a.draggable = !1),
                (a.infinite = !1),
                i.initCarousel(o, a));
        },
        widgetTimeTable: function (t) {
            var i = t.find(".mptt-shortcode-wrapper");
            if ("undefined" != typeof typenow && pagenow === typenow)
                switch (typenow) {
                    case "mp-event":
                        Registry._get("Event").init();
                        break;
                    case "mp-column":
                        Registry._get("Event").initDatePicker(),
                            Registry._get("Event").columnRadioBox();
                }
            i.length &&
                (Registry._get("Event").initTableData(),
                Registry._get("Event").filterShortcodeEvents(),
                Registry._get("Event").getFilterByHash(),
                i.show()),
                (e(".upcoming-events-widget").length || i.length) &&
                    Registry._get("Event").setColorSettings();
        },
        elementorSection: function (e) {
            var i = e;
            Boolean(t.isEditMode());
            new jetSectionParallax(i).init();
        },
        initCarousel: function (a, n) {
            var s,
                r,
                l,
                d,
                c,
                u = [],
                f = a.closest(".elementor-widget"),
                p = o.getElementorElementSettings(f),
                h = t.config.responsive.activeBreakpoints,
                m = n.dots,
                g = !0,
                v = f.closest(".jet-listing-grid").hasClass("jet-listing"),
                w = f.closest(".jet-listing-grid__item"),
                _ = f.find(".prev-arrow"),
                b = f.find(".next-arrow");
            if (
                (v &&
                    w &&
                    ((n.nextArrow = !1),
                    (n.prevArrow = !1),
                    w.find(_).on("click", function () {
                        a.slick("slickPrev");
                    }),
                    w.find(b).on("click", function () {
                        a.slick("slickNext");
                    })),
                a.hasClass("jet-image-comparison__instance") &&
                    ((g = !1),
                    setTimeout(function () {
                        a.on("beforeChange", function () {
                            e(this)
                                .find(".slick-slide")
                                .each(function () {
                                    e(this)
                                        .find(".jx-controller")
                                        .attr("tabindex", ""),
                                        e(this)
                                            .find(".jx-label")
                                            .attr("tabindex", "");
                                });
                        }),
                            a.on("afterChange", function () {
                                e(this)
                                    .find(".slick-slide.slick-active")
                                    .each(function () {
                                        e(this)
                                            .find(".jx-controller")
                                            .attr("tabindex", "0"),
                                            e(this)
                                                .find(".jx-label")
                                                .attr("tabindex", 0);
                                    });
                            });
                    }, 100)),
                a.hasClass("jet-posts") && a.parent().hasClass("jet-carousel"))
            ) {
                (p = (function (e, t) {
                    const i = Object.keys(e).map((i) => ({
                        [t[i] || i]: e[i],
                    }));
                    return Object.assign({}, ...i);
                })(p, {
                    columns: "slides_to_show",
                    columns_widescreen: "slides_to_show_widescreen",
                    columns_laptop: "slides_to_show_laptop",
                    columns_tablet_extra: "slides_to_show_tablet_extra",
                    columns_tablet: "slides_to_show_tablet",
                    columns_mobile_extra: "slides_to_show_mobile_extra",
                    columns_mobile: "slides_to_show_mobile",
                })),
                    (c = e("> div.jet-posts__item", a).length);
            } else c = e("> div", a).length;
            if (
                ((n.slidesToShow = +p.slides_to_show),
                (n.slidesToScroll = p.slides_to_scroll
                    ? +p.slides_to_scroll
                    : 1),
                Object.keys(h).forEach(function (e) {
                    "widescreen" === e &&
                        ((n.slidesToShow =
                            "slides_to_show_widescreen" in p &&
                            "" != p.slides_to_show_widescreen
                                ? +p.slides_to_show_widescreen
                                : +p.slides_to_show),
                        "slides_to_scroll_widescreen" in p &&
                        "" != p.slides_to_scroll_widescreen
                            ? (n.slidesToScroll =
                                  +p.slides_to_scroll_widescreen)
                            : n.slidesToShow > +p.slides_to_scroll
                            ? (n.slidesToScroll = +p.slides_to_scroll)
                            : (n.slidesToScroll = n.slidesToShow));
                }),
                n.slidesToShow >= c && (n.dots = !1),
                (l = n.slidesToShow),
                (d = n.slidesToScroll),
                setTimeout(function () {
                    e(".slick-slide", a).each(function () {
                        null != e(this).attr("aria-describedby") &&
                            e(this).attr(
                                "id",
                                e(this).attr("aria-describedby")
                            );
                    }),
                        e(".jet-slick-dots", a).removeAttr("role"),
                        e(".jet-slick-dots li", a).each(function () {
                            e(this).removeAttr("role"),
                                e(this).attr("tabindex", "0");
                        });
                }, 100),
                a.on("init reInit", function () {
                    if (
                        (e(".jet-slick-dots", a).removeAttr("role"),
                        e(".jet-slick-dots li", e(this)).each(function () {
                            e(this).removeAttr("role"),
                                e(this).attr("tabindex", "0");
                        }),
                        e(".jet-slick-dots li", e(this)).keydown(function (t) {
                            var i = e(this),
                                o = t.which || t.keyCode;
                            (13 != o && 32 != o) || i.click(),
                                37 == o &&
                                    0 != i.prev().length &&
                                    (i.prev().focus(), i.prev().click()),
                                39 == o &&
                                    0 != i.next().length &&
                                    (i.next().focus(), i.next().click());
                        }),
                        e(".jet-arrow", f).attr("tabindex", 0),
                        e(".jet-arrow", f).keydown(function (t) {
                            var i = e(this),
                                o = t.which || t.keyCode;
                            (13 != o && 32 != o) || i.click(),
                                37 == o &&
                                    0 != i.prev().length &&
                                    i.prev().hasClass("slick-arrow") &&
                                    i.prev().focus(),
                                39 == o &&
                                    i.next().hasClass("slick-arrow") &&
                                    0 != i.next().length &&
                                    i.next().focus();
                        }),
                        a.hasClass("jet-image-comparison__instance") &&
                            setTimeout(function () {
                                a.find(".slick-slide.slick-active").each(
                                    function () {
                                        e(this)
                                            .find(".jx-controller")
                                            .attr("tabindex", "0"),
                                            e(this)
                                                .find(".jx-label")
                                                .attr("tabindex", "0");
                                    }
                                );
                            }, 100),
                        e(".slick-track", a)
                            .find(".slick-slide")
                            .each(function () {
                                var t = e(this),
                                    i = e(".jet-carousel__item-img", t),
                                    o = new IntersectionObserver(
                                        function (t) {
                                            !0 === t[0].isIntersecting &&
                                                (i.each(function () {
                                                    var t =
                                                        e(this).attr("loading");
                                                    void 0 !== t &&
                                                        !1 !== t &&
                                                        0 === e(this).width() &&
                                                        e(this).attr(
                                                            "loading",
                                                            ""
                                                        );
                                                }),
                                                o.unobserve(t[0].target));
                                        },
                                        { threshold: [0] }
                                    );
                                o.observe(t[0]);
                            }),
                        n.infinite)
                    ) {
                        var t = e(this),
                            o = e(
                                "> .slick-list > .slick-track > .slick-cloned.jet-carousel__item",
                                t
                            );
                        if (!o.length) return;
                        i.initElementsHandlers(o);
                    }
                }),
                a.hasClass("slick-initialized"))
            )
                a.not(".slick-initialized").slick("refresh", !0);
            else if (
                (Object.keys(h)
                    .reverse()
                    .forEach(function (e) {
                        if (
                            p["slides_to_show_" + e] ||
                            p["slides_to_scroll_" + e]
                        ) {
                            var t = { breakpoint: null, settings: {} };
                            (t.breakpoint =
                                "widescreen" != e
                                    ? h[e].value
                                    : h[e].value - 1),
                                "widescreen" === e
                                    ? ((t.settings.slidesToShow =
                                          +p.slides_to_show),
                                      (t.settings.slidesToScroll =
                                          +p.slides_to_scroll
                                              ? +p.slides_to_scroll
                                              : 1))
                                    : ((t.settings.slidesToShow = p[
                                          "slides_to_show_" + e
                                      ]
                                          ? +p["slides_to_show_" + e]
                                          : l),
                                      (t.settings.slidesToScroll = p[
                                          "slides_to_scroll_" + e
                                      ]
                                          ? +p["slides_to_scroll_" + e]
                                          : d)),
                                t.settings.slidesToShow >= c
                                    ? (t.settings.dots = !1)
                                    : m && (t.settings.dots = !0),
                                (l = t.settings.slidesToShow),
                                (d = t.settings.slidesToScroll),
                                u.push(t);
                        }
                    }),
                (n.responsive = u),
                n.slidesToShow >= c && (n.dots = !1),
                (s = {
                    customPaging: function (t, i) {
                        return e("<span />").text(i + 1);
                    },
                    dotsClass: "jet-slick-dots",
                    accessibility: g,
                }),
                (r = e.extend({}, s, n)),
                a.slick(r),
                a.hasClass("jet-image-comparison__instance"))
            ) {
                let e = window.juxtapose.sliders.length;
                for (let t = 0; t < e; t++)
                    window.juxtapose.sliders[t].setWrapperDimensions();
            }
        },
        widgetTimeLine: function (e) {
            var t = e.find(".jet-timeline");
            t.length && new jetTimeLine(t).init();
        },
        widgetTable: function (t) {
            var i = t.find(".jet-table");
            i.length &&
                (i.hasClass("jet-table--sorting") &&
                    i.tablesorter({
                        cssHeader: "jet-table-header-sort",
                        cssAsc: "jet-table-header-sort--up",
                        cssDesc: "jet-table-header-sort--down",
                        initWidgets: !1,
                    }),
                e(".jet-table__body-row", i).each(function () {
                    var t = e(this),
                        i = 0,
                        o = 0;
                    e(".jet-table__cell", t).each(function () {
                        var t = e("img", e(this)),
                            a = e("svg", e(this)),
                            n = e("i", e(this)),
                            s = 0;
                        0 === a.length &&
                            0 === n.length &&
                            (t.each(function () {
                                "" != e(this).attr("src") && s++;
                            }),
                            0 === e(this).text().length && 0 === s && o++),
                            i++;
                    }),
                        o === i && t.remove();
                }));
        },
        widgetDropbar: function (t) {
            var i,
                o,
                a = t.find(".jet-dropbar"),
                n = a.find(".jet-dropbar__inner"),
                s = a.find(".jet-dropbar__button"),
                r = a.find(".jet-dropbar__content"),
                l = a.data("settings") || {},
                d = l.mode || "hover",
                c = +l.hide_delay || 0,
                u = "jet-dropbar-open",
                f = t.parents(".e-con");
            "click" === d
                ? s.on("click.jetDropbar", function (e) {
                      a.toggleClass(u);
                  })
                : "ontouchstart" in window || "ontouchend" in window
                ? s.on("touchend.jetDropbar", function (t) {
                      e(window).scrollTop() === i && a.toggleClass(u);
                  })
                : (n.on("mouseenter.jetDropbar", function (t) {
                      clearTimeout(o),
                          e(".jet-dropbar").each(function () {
                              e(this).removeClass(u),
                                  e(this).parents(".e-con").css("z-index", "");
                          }),
                          f.css("z-index", ""),
                          "auto" === f.css("z-index") && f.css("z-index", 1),
                          a.addClass(u);
                  }),
                  n.on("mouseleave.jetDropbar", function (e) {
                      o = setTimeout(function () {
                          a.removeClass(u);
                      }, c);
                  })),
                e(document).on("touchstart.jetDropbar", function (t) {
                    i = e(window).scrollTop();
                }),
                e(document).on(
                    "click.jetDropbar touchend.jetDropbar",
                    function (t) {
                        ("touchend" === t.type &&
                            e(window).scrollTop() !== i) ||
                            e(t.target).closest(s).length ||
                            e(t.target).closest(r).length ||
                            (a.hasClass(u) && a.removeClass(u));
                    }
                );
        },
        widgetVideo: function (e) {
            var t = e.find(".jet-video"),
                i = e.find(".jet-video-iframe"),
                o = e.find(".jet-video-player"),
                a = e.find(".jet-video-mejs-player"),
                n = a.data("controls") || [
                    "playpause",
                    "current",
                    "progress",
                    "duration",
                    "volume",
                    "fullscreen",
                ],
                s = e.find(".jet-video__overlay"),
                r = e.find(".jet-video__play-button"),
                l = s.length > 0,
                d = t.data("settings") || {},
                c = (d.lightbox, d.autoplay || !1);
            function u() {
                var e = i.data("lazy-load");
                e && i.attr("src", e),
                    c ||
                        (i[0].src = i[0].src.replace(
                            "&autoplay=0",
                            "&autoplay=1"
                        )),
                    s.remove(),
                    (l = !1);
            }
            s[0] &&
                (r.keypress(function (e) {
                    if (13 == e.which) return s.click(), !1;
                }),
                s.on("click.jetVideo", function (e) {
                    if (o[0]) return o[0].play(), s.remove(), void (l = !1);
                    i[0] && u();
                })),
                c && i[0] && s[0] && u(),
                o[0] &&
                    (o.on("play.jetVideo", function (e) {
                        l && (s.remove(), (l = !1));
                    }),
                    c && s.remove()),
                a[0] &&
                    a.mediaelementplayer({
                        videoVolume: "horizontal",
                        hideVolumeOnTouchDevices: !1,
                        enableProgressTooltip: !1,
                        features: n,
                        success: function (t) {
                            t.addEventListener(
                                "timeupdate",
                                function (t) {
                                    var i = e.find(".mejs-time-current"),
                                        o = i.attr("style");
                                    if (o) {
                                        var a = o
                                            .match(/scaleX\([0-9.]*\)/gi)[0]
                                            .replace("scaleX(", "")
                                            .replace(")", "");
                                        a && i.css("width", 100 * a + "%");
                                    }
                                },
                                !1
                            );
                        },
                    });
        },
        widgetAudio: function (e) {
            var t,
                i = e.find(".jet-audio"),
                o = e.find(".jet-audio-player"),
                a = i.data("audio-settings"),
                n = 0,
                s = !1;
            o[0] &&
                ((t = a.startVolume || 0.8),
                a.controls.map(function (e) {
                    "volume" === e && (s = !0);
                }),
                o.mediaelementplayer({
                    features: a.controls || [
                        "playpause",
                        "current",
                        "progress",
                        "duration",
                        "volume",
                    ],
                    audioVolume: a.audioVolume || "horizontal",
                    startVolume: t,
                    hideVolumeOnTouchDevices: a.hideVolumeOnTouchDevices,
                    enableProgressTooltip: !1,
                    success: function (i) {
                        var o = e.find(".mejs-button button");
                        i.addEventListener(
                            "timeupdate",
                            function (t) {
                                var i = e.find(".mejs-time-current"),
                                    o = i.attr("style");
                                if (o) {
                                    var a = o
                                        .match(/scaleX\([0-9.]*\)/gi)[0]
                                        .replace("scaleX(", "")
                                        .replace(")", "");
                                    a && i.css("width", 100 * a + "%");
                                }
                            },
                            !1
                        ),
                            s &&
                            "yes" === a.hasVolumeBar &&
                            !a.hideVolumeOnTouchDevices
                                ? (i.setVolume(t),
                                  i.addEventListener(
                                      "volumechange",
                                      function () {
                                          var s =
                                                  "horizontal" === a.audioVolume
                                                      ? e.find(
                                                            ".mejs-horizontal-volume-current"
                                                        )
                                                      : e.find(
                                                            ".mejs-volume-current"
                                                        ),
                                              r =
                                                  "horizontal" === a.audioVolume
                                                      ? parseInt(
                                                            s[0].style.width,
                                                            10
                                                        ) / 100
                                                      : parseInt(
                                                            s[0].style.height,
                                                            10
                                                        ) / 100,
                                              l =
                                                  "horizontal" === a.audioVolume
                                                      ? e.find(
                                                            ".mejs-horizontal-volume-total"
                                                        )
                                                      : e.find(
                                                            ".mejs-volume-slider .mejs-volume-total"
                                                        ),
                                              d = e.find(
                                                  ".mejs-playpause-button"
                                              ),
                                              c = "";
                                          l.on("click", function () {
                                              c =
                                                  "horizontal" === a.audioVolume
                                                      ? parseInt(
                                                            e.find(
                                                                ".mejs-horizontal-volume-total .mejs-horizontal-volume-current"
                                                            )[0].style.width,
                                                            10
                                                        ) / 100
                                                      : parseInt(
                                                            e.find(
                                                                ".mejs-volume-slider .mejs-volume-total .mejs-volume-current"
                                                            )[0].style.height,
                                                            10
                                                        ) / 100;
                                          }),
                                              d.on("click", function () {
                                                  "" !== c && i.setVolume(c);
                                              }),
                                              o.on("click", function () {
                                                  i.muted ||
                                                      ("yes" === a.muted &&
                                                          0 === n &&
                                                          0 === r &&
                                                          (i.setVolume(t),
                                                          (n = 1)));
                                              });
                                      },
                                      !1
                                  ))
                                : s &&
                                  !a.hideVolumeOnTouchDevices &&
                                  o.on("click", function () {
                                      i.setVolume(t);
                                  });
                    },
                }),
                o.attr("preload", "metadata"));
        },
        widgetHorizontalTimeline: function (i) {
            var a,
                n,
                s = i.find(".jet-hor-timeline"),
                r = i.find(".jet-hor-timeline-track"),
                l = i.find(".jet-hor-timeline-item"),
                d = i.find(".jet-arrow"),
                c = i.find(".jet-next-arrow"),
                u = i.find(".jet-prev-arrow"),
                f = {},
                p = {},
                h = !0,
                m = elementorFrontend.getCurrentDeviceMode(),
                g = m,
                v = s.closest(".elementor-widget"),
                w = o.getElementorElementSettings(v),
                _ = t.config.responsive.activeBreakpoints,
                b = i.find(
                    ".jet-hor-timeline-list--middle .jet-hor-timeline-item"
                ).length,
                y = o.isRTL(),
                j = 0,
                x = 0,
                k = {},
                C = {};
            function T() {
                var e = i.find(".jet-hor-timeline__line"),
                    t = i.find(".jet-hor-timeline-item__point-content:first"),
                    o = i.find(".jet-hor-timeline-item__point-content:last"),
                    a = t.position().left + parseInt(t.css("marginLeft")),
                    n = o.position().left + parseInt(o.css("marginLeft")),
                    s = t.outerWidth();
                e.css({
                    left: y ? n + s / 2 : a + s / 2,
                    width: Math.abs(n - a),
                });
            }
            if (
                ((f.desktop = w.columns),
                (a = f.desktop),
                (k.desktop = 100 / f.desktop),
                (C.desktop = Math.max(0, b - f.desktop)),
                (p.desktop = +w.slides_to_scroll),
                (n = p.desktop),
                Object.keys(_)
                    .reverse()
                    .forEach(function (e) {
                        "widescreen" === e
                            ? ((f[e] =
                                  "columns_widescreen" in w &&
                                  "" != w.columns_widescreen
                                      ? w["columns_" + e]
                                      : f.desktop),
                              (p[e] =
                                  "slides_to_scroll_widescreen" in w &&
                                  "" != w.slides_to_scroll_widescreen
                                      ? +w["slides_to_scroll_" + e]
                                      : +p.desktop))
                            : ((f[e] =
                                  "" != w["columns_" + e] &&
                                  null != w["columns_" + e]
                                      ? w["columns_" + e]
                                      : a),
                              (a = f[e]),
                              (p[e] =
                                  "" != w["slides_to_scroll_" + e] &&
                                  null != w["slides_to_scroll_" + e]
                                      ? +w["slides_to_scroll_" + e]
                                      : +n),
                              (n = p[e])),
                            (k[e] = 100 / f[e]),
                            (C[e] = Math.max(0, b - f[e]));
                    }),
                "ontouchstart" in window || "ontouchend" in window
                    ? l.on("touchend.jetHorTimeline", function (t) {
                          var o = e(this).data("item-id");
                          i.find(".elementor-repeater-item-" + o).toggleClass(
                              "is-hover"
                          );
                      })
                    : l.on(
                          "mouseenter.jetHorTimeline mouseleave.jetHorTimeline",
                          function (t) {
                              if (!h || "mouseleave" !== t.type) {
                                  h && "mouseenter" === t.type && (h = !1);
                                  var o = e(this).data("item-id");
                                  i.find(
                                      ".elementor-repeater-item-" + o
                                  ).toggleClass("is-hover");
                              }
                          }
                      ),
                T(),
                e(window).on(
                    "resize.jetHorTimeline orientationchange.jetHorTimeline",
                    o.debounce(50, T)
                ),
                c[0] && 0 === C[m] && c.addClass("jet-arrow-disabled"),
                d[0])
            ) {
                var S,
                    E = 0,
                    O = 0;
                d.on("click.jetHorTimeline", function (t) {
                    var i = e(this),
                        a = elementorFrontend.getCurrentDeviceMode(),
                        n = p[a],
                        s = i.hasClass("jet-next-arrow") ? "next" : "prev",
                        l = y ? 1 : -1;
                    (n = n > f[a] ? f[a] : p[a]),
                        e(window).on(
                            "resize.jetHorTimeline orientationchange.jetHorTimeline",
                            o.debounce(50, function () {
                                (a = elementorFrontend.getCurrentDeviceMode()),
                                    (n = (n = p[a]) > f[a] ? f[a] : p[a]);
                            })
                        ),
                        "next" === s &&
                            x < C[a] &&
                            (x += n) > C[a] &&
                            (x = C[a]),
                        "prev" === s && x > 0 && (x -= n) < 0 && (x = 0),
                        x > 0
                            ? u.removeClass("jet-arrow-disabled")
                            : u.addClass("jet-arrow-disabled"),
                        x === C[a]
                            ? c.addClass("jet-arrow-disabled")
                            : c.removeClass("jet-arrow-disabled"),
                        (j = 0 === x ? 0 : x * k[a]),
                        r.css({ transform: "translateX(" + l * j + "%)" });
                }),
                    e(l).on("touchstart", function (e) {
                        var t =
                            e.originalEvent.touches[0] ||
                            e.originalEvent.changedTouches[0];
                        E = t.pageX;
                    }),
                    e(l).on("touchend", function (e) {
                        var t =
                                e.originalEvent.touches[0] ||
                                e.originalEvent.changedTouches[0],
                            i = elementorFrontend.getCurrentDeviceMode(),
                            o = p[i];
                        if (((O = t.pageX), (S = O - E) < -50)) {
                            var a = y ? 1 : -1;
                            o > f[i] && (o = f[i]),
                                x < C[i] && (x += o) > C[i] && (x = C[i]),
                                x > 0
                                    ? u.removeClass("jet-arrow-disabled")
                                    : u.addClass("jet-arrow-disabled"),
                                x === C[i]
                                    ? c.addClass("jet-arrow-disabled")
                                    : c.removeClass("jet-arrow-disabled"),
                                (j = 0 === x ? 0 : x * k[i]),
                                r.css({
                                    transform: "translateX(" + a * j + "%)",
                                });
                        } else if (S > 50) {
                            a = y ? 1 : -1;
                            o > f[i] && (o = f[i]),
                                x > 0 && (x -= o) < 0 && (x = 0),
                                x > 0
                                    ? u.removeClass("jet-arrow-disabled")
                                    : u.addClass("jet-arrow-disabled"),
                                x === C[i]
                                    ? c.addClass("jet-arrow-disabled")
                                    : c.removeClass("jet-arrow-disabled"),
                                (j = 0 === x ? 0 : x * k[i]),
                                r.css({
                                    transform: "translateX(" + a * j + "%)",
                                });
                        }
                    });
            }
            function z() {
                if (d[0]) {
                    var e = i.find(".jet-hor-timeline-list--middle"),
                        t = e.position().top,
                        o = e.outerHeight();
                    d.css({ top: t + o / 2 });
                }
            }
            z(),
                e(window).on(
                    "resize.jetHorTimeline orientationchange.jetHorTimeline",
                    o.debounce(150, z)
                ),
                e(window).on(
                    "resize.jetHorTimeline orientationchange.jetHorTimeline",
                    o.debounce(50, function (e) {
                        if (!s.hasClass("jet-hor-timeline--arrows-nav")) return;
                        var t = elementorFrontend.getCurrentDeviceMode();
                        t != g &&
                            (!(function () {
                                u.addClass("jet-arrow-disabled"),
                                    c.hasClass("jet-arrow-disabled") &&
                                        c.removeClass("jet-arrow-disabled");
                                0 === C[t] && c.addClass("jet-arrow-disabled");
                                (j = 0),
                                    (x = 0),
                                    r.css({ transform: "translateX(0%)" });
                            })(),
                            (g = t));
                    })
                );
        },
        widgetPieChart: function (t) {
            var o = t.find(".jet-pie-chart-container"),
                a = t.find(".jet-pie-chart")[0],
                n = o.data("chart") || {},
                s = o.data("options") || {},
                r = o.data("tooltip") || "";
            !0 ===
                (s = e.extend({}, { maintainAspectRatio: !1 }, s)).tooltips
                    .enabled &&
                (s.tooltips.callbacks = {
                    label: function (e, t) {
                        return (
                            " " +
                            t.labels[e.index] +
                            ": " +
                            t.datasets[e.datasetIndex].data[e.index] +
                            r
                        );
                    },
                }),
                i.waypoint(
                    t,
                    function () {
                        new Chart(a, { type: "pie", data: n, options: s });
                    },
                    i.prepareWaypointOptions(t, { offset: "bottom-in-view" })
                );
        },
        widgetBarChart: function (t) {
            var a = t.find(".jet-bar-chart-container"),
                n = a.find(".jet-bar-chart"),
                s = a.data("settings"),
                r = a.data("tooltip-prefix") || "",
                l = a.data("tooltip-suffix") || "",
                d = a.data("tooltip-separator") || "",
                c = s.type || "bar",
                u = a.data("axis-separator") || "",
                f = a.data("labels-length") || 50;
            !0 === s.options.tooltips.enabled &&
                (s.options.tooltips.callbacks = {
                    label: function (e, t) {
                        return (
                            " " +
                            t.datasets[e.datasetIndex].label +
                            ": " +
                            t.datasets[e.datasetIndex].data[e.index]
                        );
                    },
                }),
                a.length &&
                    (!0 === s.options.tooltips.enabled &&
                        (s.options.tooltips.callbacks = {
                            label: function (e, t) {
                                var i =
                                    "" != d
                                        ? o.addThousandCommaSeparator(
                                              t.datasets[e.datasetIndex].data[
                                                  e.index
                                              ],
                                              d
                                          )
                                        : t.datasets[e.datasetIndex].data[
                                              e.index
                                          ];
                                return (
                                    " " +
                                    t.datasets[e.datasetIndex].label +
                                    ": " +
                                    r +
                                    i +
                                    l
                                );
                            },
                        }),
                    !0 === u &&
                        ("bar" === c
                            ? (s.options.scales.yAxes[0].ticks.callback =
                                  function (e, t, i) {
                                      return e.toLocaleString("en-US");
                                  })
                            : (s.options.scales.xAxes[0].ticks.callback =
                                  function (e, t, i) {
                                      return e.toLocaleString("en-US");
                                  })),
                    i.waypoint(
                        n,
                        function () {
                            var t = e(this)[0].getContext("2d"),
                                i = [];
                            s.data.labels.forEach(function (e) {
                                i.push(
                                    ((e, t) => {
                                        let i = e.split(" "),
                                            o = [],
                                            a = [];
                                        for (let e = 0; e < i.length; e++) {
                                            a.push(i[e]);
                                            let n = a.join(" ");
                                            n.length > t &&
                                                (o.push(n), (a = []));
                                        }
                                        return (
                                            a.length &&
                                                o.push(a.join(" ").trim()),
                                            o
                                        );
                                    })(e, f)
                                );
                            }),
                                (s.data.labels = i);
                            new Chart(t, s);
                        },
                        i.prepareWaypointOptions(t, {
                            offset: "bottom-in-view",
                        })
                    ));
        },
        widgetLineChart: function (t) {
            var a = t.data("id"),
                n = t.find(".jet-line-chart-container"),
                s = n.find(".jet-line-chart"),
                r = n.data("compare"),
                l = n.data("previous-label"),
                d = n.data("current-label"),
                c = n.data("settings"),
                u = n.data("compare-labels-type"),
                f = n.data("tooltip-prefix") || "",
                p = n.data("tooltip-suffix") || "",
                h = n.data("tooltip-separator") || "";
            n.length &&
                i.waypoint(
                    s,
                    function () {
                        var t = e(this)[0].getContext("2d"),
                            i = new Chart(t, c);
                        (i.options.tooltips = {
                            enabled: !1,
                            mode: "x-axis",
                            intersect: !1,
                            callbacks: {
                                label: function (e, t) {
                                    var i =
                                        t.datasets[e.datasetIndex].borderColor;
                                    if (
                                        ((i = i.replace(/"/g, '"')), !0 === r)
                                    ) {
                                        var a =
                                                "custom" === u
                                                    ? d
                                                    : t.labels[e.index],
                                            n =
                                                t.datasets[e.datasetIndex]
                                                    .label,
                                            s =
                                                "" != h
                                                    ? o.addThousandCommaSeparator(
                                                          t.datasets[
                                                              e.datasetIndex
                                                          ].data[e.index],
                                                          h
                                                      )
                                                    : t.datasets[e.datasetIndex]
                                                          .data[e.index],
                                            c =
                                                '<div class="jet-line-chart-tooltip-compare-current">' +
                                                a +
                                                " : " +
                                                f +
                                                s +
                                                p +
                                                "</div>",
                                            m = "",
                                            g = (g =
                                                t.datasets[e.datasetIndex]
                                                    .borderColor).replace(
                                                /"/g,
                                                '"'
                                            );
                                        if (
                                            void 0 !== t.labels[e.index - 1] &&
                                            null !== t.labels[e.index - 1]
                                        ) {
                                            var v =
                                                    "custom" === u
                                                        ? l
                                                        : t.labels[e.index - 1],
                                                w =
                                                    "" != h
                                                        ? o.addThousandCommaSeparator(
                                                              t.datasets[
                                                                  e.datasetIndex
                                                              ].data[
                                                                  e.index - 1
                                                              ],
                                                              h
                                                          )
                                                        : t.datasets[
                                                              e.datasetIndex
                                                          ].data[e.index - 1];
                                            m =
                                                '<div class="jet-line-chart-tooltip-compare-previous">' +
                                                v +
                                                " : " +
                                                f +
                                                w +
                                                p +
                                                "</div>";
                                        }
                                        return (
                                            '<div class="jet-line-chart-tooltip-title"><span class="jet-line-chart-tooltip-color-box" style="background:' +
                                            g +
                                            '"></span>' +
                                            n +
                                            '</div><div class="jet-line-chart-tooltip-body">' +
                                            c +
                                            m +
                                            "</div>"
                                        );
                                    }
                                    var _ = t.datasets[e.datasetIndex].label,
                                        b =
                                            "" != h
                                                ? o.addThousandCommaSeparator(
                                                      t.datasets[e.datasetIndex]
                                                          .data[e.index],
                                                      h
                                                  )
                                                : t.datasets[e.datasetIndex]
                                                      .data[e.index];
                                    return (
                                        '<div class="jet-line-chart-tooltip-body"><span class="jet-line-chart-tooltip-color-box" style="background:' +
                                        i +
                                        '"></span>' +
                                        _ +
                                        " : " +
                                        f +
                                        b +
                                        p +
                                        "</div>"
                                    );
                                },
                            },
                            custom: function (e) {
                                var t = document.getElementById(
                                    "chartjs-tooltip_" + a
                                );
                                if (
                                    (t ||
                                        (((t =
                                            document.createElement("div")).id =
                                            "chartjs-tooltip_" + a),
                                        (t.innerHTML =
                                            '<div class="jet-line-chart-tooltip"></div>'),
                                        document.body.appendChild(t)),
                                    0 !== e.opacity)
                                ) {
                                    if (
                                        (t.classList.remove(
                                            "above",
                                            "below",
                                            "no-transform"
                                        ),
                                        e.yAlign
                                            ? t.classList.add(e.yAlign)
                                            : t.classList.add("no-transform"),
                                        e.body)
                                    ) {
                                        e.title;
                                        var i = e.body.map(function (e) {
                                                return e.lines;
                                            }),
                                            o = "";
                                        (o +=
                                            '<div class="jet-line-chart-tooltip-wrapper">'),
                                            i.forEach(function (e, t) {
                                                o += e;
                                            }),
                                            (o += "</div>"),
                                            (t.querySelector("div").innerHTML =
                                                o);
                                    }
                                    var n = this,
                                        s =
                                            this._chart.canvas.getBoundingClientRect(),
                                        r = t.offsetWidth,
                                        l = t.offsetHeight,
                                        d = 0,
                                        c = 0;
                                    setTimeout(function () {
                                        (r = t.offsetWidth),
                                            (l = t.offsetHeight),
                                            (d =
                                                n._chart.width / 2 >
                                                n._chart.tooltip._eventPosition
                                                    .x
                                                    ? 0
                                                    : -r),
                                            (c =
                                                n._chart.height / 2 >
                                                n._chart.tooltip._eventPosition
                                                    .y
                                                    ? 0
                                                    : -l),
                                            (t.style.left =
                                                s.left +
                                                window.pageXOffset +
                                                e.caretX +
                                                d +
                                                "px"),
                                            (t.style.top =
                                                s.top +
                                                window.pageYOffset +
                                                e.caretY +
                                                c +
                                                "px"),
                                            (t.style.opacity = 1);
                                    }, 10),
                                        (t.style.position = "absolute"),
                                        (t.style.fontFamily =
                                            e._bodyFontFamily),
                                        (t.style.fontSize =
                                            e.bodyFontSize + "px"),
                                        (t.style.fontStyle = e._bodyFontStyle),
                                        (t.style.padding =
                                            e.yPadding +
                                            "px " +
                                            e.xPadding +
                                            "px"),
                                        (t.style.pointerEvents = "none");
                                } else t.style.opacity = 0;
                            },
                        }),
                            i.update();
                    },
                    i.prepareWaypointOptions(t, { offset: "bottom-in-view" })
                );
        },
        widgetLottie: function (t) {
            var i,
                a,
                n = t.find(".jet-lottie"),
                s = n.find(".jet-lottie__elem"),
                r = n.data("settings");
            if (n[0]) {
                (i = {
                    container: s[0],
                    renderer: r.renderer,
                    loop: "" === r.loop_times ? r.loop : r.loop_times,
                    autoplay: !1,
                    path: r.path,
                    name: "jet-lottie",
                }),
                    (a = lottie.loadAnimation(i)),
                    r.play_speed && a.setSpeed(r.play_speed),
                    r.reversed && a.setDirection(-1);
                var l = 0,
                    d = 0;
                switch (
                    (r.viewport &&
                        ((l = -r.viewport.start || 0),
                        (d = -(100 - r.viewport.end) || 0)),
                    r.action_start)
                ) {
                    case "on_hover":
                        var c = !1,
                            u = function () {
                                if (c && "reverse" === r.on_hover_out) {
                                    var e = r.reversed ? -1 : 1;
                                    a.setDirection(e);
                                }
                                a.play(), (c = !0);
                            },
                            f = function () {
                                switch (r.on_hover_out) {
                                    case "pause":
                                        a.pause();
                                        break;
                                    case "stop":
                                        a.stop();
                                        break;
                                    case "reverse":
                                        var e = r.reversed ? 1 : -1;
                                        a.setDirection(e), a.play();
                                }
                            };
                        n
                            .off("mouseenter.JetLottie", u)
                            .on("mouseenter.JetLottie", u),
                            n
                                .off("mouseleave.JetLottie", f)
                                .on("mouseleave.JetLottie", f);
                        break;
                    case "on_click":
                        var p = n.find(".jet-lottie__link"),
                            h = +r.redirect_timeout,
                            m = function () {
                                a.play();
                            },
                            g = function (t) {
                                t.preventDefault(), a.play();
                                var i = e(this).attr("href"),
                                    o =
                                        "_blank" === e(this).attr("target")
                                            ? "_blank"
                                            : "_self";
                                setTimeout(function () {
                                    window.open(i, o);
                                }, h);
                            };
                        p[0] && h > 0
                            ? p
                                  .off("click.JetLottie", g)
                                  .on("click.JetLottie", g)
                            : n
                                  .off("click.JetLottie", m)
                                  .on("click.JetLottie", m);
                        break;
                    case "on_viewport":
                        if (void 0 !== window.IntersectionObserver)
                            new IntersectionObserver(
                                function (e, t) {
                                    e[0].isIntersecting ? a.play() : a.pause();
                                },
                                { rootMargin: d + "% 0% " + l + "%" }
                            ).observe(n[0]);
                        else a.play();
                        break;
                    case "on_scroll":
                        if (void 0 !== window.IntersectionObserver) {
                            var v,
                                w = 0;
                            new IntersectionObserver(
                                function (e, t) {
                                    e[0].isIntersecting
                                        ? (v = requestAnimationFrame(
                                              function e() {
                                                  if (window.scrollY !== w) {
                                                      var t =
                                                              o.getElementPercentageSeen(
                                                                  s,
                                                                  {
                                                                      start: l,
                                                                      end: d,
                                                                  }
                                                              ),
                                                          i =
                                                              ((a.totalFrames -
                                                                  a.firstFrame) *
                                                                  t) /
                                                              100;
                                                      a.goToAndStop(i, !0),
                                                          (w = window.scrollY);
                                                  }
                                                  v = requestAnimationFrame(e);
                                              }
                                          ))
                                        : cancelAnimationFrame(v);
                                },
                                { rootMargin: d + "% 0% " + l + "%" }
                            ).observe(n[0]);
                        }
                        break;
                    default:
                        var _ = +r.delay;
                        _ > 0
                            ? setTimeout(function () {
                                  a.play();
                              }, _)
                            : a.play();
                }
            }
        },
        widgetPricingTable: function (t) {
            var i = t.find(".pricing-table"),
                o = e(
                    ".pricing-feature .pricing-feature__inner[data-tippy-content]",
                    i
                ),
                a = i.data("tooltips-settings"),
                n = t.find(".pricing-table__fold-mask"),
                s = t.find(".pricing-table__fold-button"),
                r = n,
                l =
                    (e(".pricing-table__features", n),
                    n.data("fold-settings") || {}),
                d = l.fold_enabled || !1,
                c = 0,
                u = 0,
                f = l.unfoldDuration,
                p = l.unfoldDuration,
                h = l.unfoldEasing,
                m = l.foldEasing;
            function g() {
                (u = 0),
                    t
                        .find(".pricing-table__fold-mask .pricing-feature")
                        .each(function () {
                            u += e(this).outerHeight(!0);
                        });
            }
            o[0] &&
                o.each(function () {
                    var t = e(this)[0];
                    t._tippy && t._tippy.destroy(),
                        tippy([t], {
                            arrow: !!a.tooltipArrow,
                            duration: [
                                a.tooltipShowDuration.size,
                                a.tooltipHideDuration.size,
                            ],
                            delay: a.tooltipDelay.size,
                            placement: a.tooltipPlacement,
                            trigger: a.tooltipTrigger,
                            animation: a.tooltipAnimation,
                            appendTo: t,
                            offset: [0, a.tooltipDistance.size],
                            allowHTML: !0,
                            popperOptions: { strategy: "fixed" },
                        });
                }),
                d &&
                    (t
                        .find(".pricing-table__fold-mask .fold_visible")
                        .each(function () {
                            c += e(this).outerHeight(!0);
                        }),
                    g(),
                    n.hasClass("pricing-table-unfold-state") ||
                        r.css({ height: c }),
                    t
                        .find(".pricing-table__fold-mask")
                        .css("max-height", "none"),
                    s.keypress(function (e) {
                        if (13 == e.which) return s.click(), !1;
                    }),
                    s.on("click.jetPricingTable", function () {
                        var t = e(this),
                            i = e(".pricing-table__fold-button-text", t),
                            o = e(".pricing-table__fold-button-icon", t),
                            a = t.data("unfold-text"),
                            s = t.data("unfold-text-accessibility"),
                            l = t.data("fold-text"),
                            d = t.data("fold-text-accessibility"),
                            v = t.data("unfold-icon"),
                            w = t.data("fold-icon");
                        n.hasClass("pricing-table-unfold-state")
                            ? (n.removeClass("pricing-table-unfold-state"),
                              o.html(v),
                              i.html(a),
                              "" !== l
                                  ? t.attr("aria-label", a)
                                  : t.attr("aria-label", s),
                              anime({
                                  targets: r[0],
                                  height: c,
                                  duration: p.size || p,
                                  easing: m,
                              }))
                            : (n.addClass("pricing-table-unfold-state"),
                              g(),
                              o.html(w),
                              i.html(l),
                              "" !== l
                                  ? t.attr("aria-label", l)
                                  : t.attr("aria-label", d),
                              anime({
                                  targets: r[0],
                                  height: u,
                                  duration: f.size || f,
                                  easing: h,
                              }));
                    }));
        },
    };
    e(window).on("elementor/frontend/init", i.init);
    var o = {
        getElementPercentageSeen: function (t, i) {
            var o,
                a = i || {},
                n = a.start || 0,
                s = a.end || 0,
                r = e(window).height(),
                l = (r * n) / 100,
                d = (r * s) / 100;
            return (
                (o =
                    (e(window).scrollTop() + r + l - t.offset().top) /
                    (r + l + d + t.height())),
                (o = Math.min(100, Math.max(0, 100 * o))),
                parseFloat(o.toFixed(2))
            );
        },
        isRTL: function () {
            return e("body").hasClass("rtl");
        },
        inArray: function (e, t) {
            return -1 < t.indexOf(e);
        },
        debounce: function (e, t) {
            var i;
            return function (o) {
                i && clearTimeout(i),
                    (i = setTimeout(function () {
                        t.call(this, o), (i = null);
                    }, e));
            };
        },
        getObjectNextKey: function (e, t) {
            var i = Object.keys(e),
                o = i.indexOf(t),
                a = (o += 1);
            return !(a >= i.length) && i[a];
        },
        getObjectPrevKey: function (e, t) {
            var i = Object.keys(e),
                o = i.indexOf(t),
                a = (o -= 1);
            return !(0 > o) && i[a];
        },
        getObjectFirstKey: function (e) {
            return Object.keys(e)[0];
        },
        getObjectLastKey: function (e) {
            return Object.keys(e)[Object.keys(e).length - 1];
        },
        getObjectValues: function (e) {
            return Object.values
                ? Object.values(e)
                : Object.keys(e).map(function (t) {
                      return e[t];
                  });
        },
        validateEmail: function (e) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                e
            );
        },
        mobileAndTabletcheck: function () {
            var e,
                t = !1;
            return (
                (e = navigator.userAgent || navigator.vendor || window.opera),
                (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                    e
                ) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                        e.substr(0, 4)
                    )) &&
                    (t = !0),
                t
            );
        },
        addThousandCommaSeparator: function (e, t) {
            (e += ""), (t = t.toString().replace(/[0-9]/g, ""));
            var i = e.split("."),
                o = i[0],
                a = i.length > 1 ? "." + i[1] : "",
                n = /(\d+)(\d{3})/;
            if ("" === t) return e;
            for (; n.test(o); ) o = o.replace(n, "$1" + t + "$2");
            return o + a;
        },
        getElementorElementSettings: function (e) {
            return window.elementorFrontend &&
                window.elementorFrontend.isEditMode() &&
                e.hasClass("elementor-element-edit-mode")
                ? o.getEditorElementSettings(e)
                : e.data("settings") || {};
        },
        getEditorElementSettings: function (e) {
            var i,
                o = e.data("model-cid");
            return o &&
                t.hasOwnProperty("config") &&
                t.config.hasOwnProperty("elements") &&
                t.config.elements.hasOwnProperty("data") &&
                (i = t.config.elements.data[o])
                ? i.toJSON()
                : {};
        },
    };
    (window.jetAnimatedText = function (t, i) {
        var o = this,
            a = e(".jet-animated-text__animated-text", t),
            n = e(".jet-animated-text__animated-text-item", a),
            s = null,
            r = ((i = e.extend({ effect: "fx1", delay: 3e3 }, i || {})), 0),
            l = i.delay;
        (o.avaliableEffects = {
            fx1: {
                in: {
                    duration: 1e3,
                    delay: function (e, t) {
                        return 75 + 100 * t;
                    },
                    easing: "easeOutElastic",
                    elasticity: 650,
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    translateY: ["100%", "0%"],
                },
                out: {
                    duration: 300,
                    delay: function (e, t) {
                        return 40 * t;
                    },
                    easing: "easeInOutExpo",
                    opacity: 0,
                    translateY: "-100%",
                },
            },
            fx2: {
                in: {
                    duration: 800,
                    delay: function (e, t) {
                        return 50 * t;
                    },
                    easing: "easeOutElastic",
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    translateY: function (e, t) {
                        return t % 2 == 0 ? ["-80%", "0%"] : ["80%", "0%"];
                    },
                },
                out: {
                    duration: 300,
                    delay: function (e, t) {
                        return 20 * t;
                    },
                    easing: "easeOutExpo",
                    opacity: 0,
                    translateY: function (e, t) {
                        return t % 2 == 0 ? "80%" : "-80%";
                    },
                },
            },
            fx3: {
                in: {
                    duration: 700,
                    delay: function (e, t) {
                        return 80 * (e.parentNode.children.length - t - 1);
                    },
                    easing: "easeOutElastic",
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    translateY: function (e, t) {
                        return t % 2 == 0 ? ["-80%", "0%"] : ["80%", "0%"];
                    },
                    rotateZ: [90, 0],
                },
                out: {
                    duration: 300,
                    delay: function (e, t) {
                        return 50 * (e.parentNode.children.length - t - 1);
                    },
                    easing: "easeOutExpo",
                    opacity: 0,
                    translateY: function (e, t) {
                        return t % 2 == 0 ? "80%" : "-80%";
                    },
                    rotateZ: function (e, t) {
                        return t % 2 == 0 ? -25 : 25;
                    },
                },
            },
            fx4: {
                in: {
                    duration: 700,
                    delay: function (e, t) {
                        return 550 + 50 * t;
                    },
                    easing: "easeOutQuint",
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    translateY: ["-150%", "0%"],
                    rotateY: [180, 0],
                },
                out: {
                    duration: 200,
                    delay: function (e, t) {
                        return 30 * t;
                    },
                    easing: "easeInQuint",
                    opacity: { value: 0, easing: "linear" },
                    translateY: "100%",
                    rotateY: -180,
                },
            },
            fx5: {
                in: {
                    duration: 250,
                    delay: function (e, t) {
                        return 200 + 25 * t;
                    },
                    easing: "easeOutCubic",
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    translateY: ["-50%", "0%"],
                },
                out: {
                    duration: 250,
                    delay: function (e, t) {
                        return 25 * t;
                    },
                    easing: "easeOutCubic",
                    opacity: 0,
                    translateY: "50%",
                },
            },
            fx6: {
                in: {
                    duration: 400,
                    delay: function (e, t) {
                        return 50 * t;
                    },
                    easing: "easeOutSine",
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    rotateY: [-90, 0],
                },
                out: {
                    duration: 200,
                    delay: function (e, t) {
                        return 50 * t;
                    },
                    easing: "easeOutSine",
                    opacity: 0,
                    rotateY: 45,
                },
            },
            fx7: {
                in: {
                    duration: 1e3,
                    delay: function (e, t) {
                        return 100 + 30 * t;
                    },
                    easing: "easeOutElastic",
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    rotateZ: function (e, t) {
                        return [anime.random(20, 40), 0];
                    },
                },
                out: {
                    duration: 300,
                    opacity: { value: [1, 0], easing: "easeOutExpo" },
                },
            },
            fx8: {
                in: {
                    duration: 400,
                    delay: function (e, t) {
                        return 200 + 20 * t;
                    },
                    easing: "easeOutExpo",
                    opacity: 1,
                    rotateY: [-90, 0],
                    translateY: ["50%", "0%"],
                },
                out: {
                    duration: 250,
                    delay: function (e, t) {
                        return 20 * t;
                    },
                    easing: "easeOutExpo",
                    opacity: 0,
                    rotateY: 90,
                },
            },
            fx9: {
                in: {
                    duration: 400,
                    delay: function (e, t) {
                        return 200 + 30 * t;
                    },
                    easing: "easeOutExpo",
                    opacity: 1,
                    rotateX: [90, 0],
                },
                out: {
                    duration: 250,
                    delay: function (e, t) {
                        return 30 * t;
                    },
                    easing: "easeOutExpo",
                    opacity: 0,
                    rotateX: -90,
                },
            },
            fx10: {
                in: {
                    duration: 400,
                    delay: function (e, t) {
                        return 100 + 50 * t;
                    },
                    easing: "easeOutExpo",
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    rotateX: [110, 0],
                },
                out: {
                    duration: 250,
                    delay: function (e, t) {
                        return 50 * t;
                    },
                    easing: "easeOutExpo",
                    opacity: 0,
                    rotateX: -110,
                },
            },
            fx11: {
                in: {
                    duration: function (e, t) {
                        return anime.random(800, 1e3);
                    },
                    delay: function (e, t) {
                        return anime.random(100, 300);
                    },
                    easing: "easeOutExpo",
                    opacity: { value: [0, 1], easing: "easeOutExpo" },
                    translateY: ["-150%", "0%"],
                    rotateZ: function (e, t) {
                        return [anime.random(-50, 50), 0];
                    },
                },
                out: {
                    duration: function (e, t) {
                        return anime.random(200, 300);
                    },
                    delay: function (e, t) {
                        return anime.random(0, 80);
                    },
                    easing: "easeInQuart",
                    opacity: 0,
                    translateY: "50%",
                    rotateZ: function (e, t) {
                        return anime.random(-50, 50);
                    },
                },
            },
            fx12: {
                in: {
                    elasticity: !1,
                    duration: 1,
                    delay: function (e, t) {
                        return 100 * t + anime.random(50, 100);
                    },
                    width: [
                        0,
                        function (t, i) {
                            return e(t).width();
                        },
                    ],
                },
                out: {
                    duration: 1,
                    delay: function (e, t) {
                        return 20 * (e.parentNode.children.length - t - 1);
                    },
                    easing: "linear",
                    width: { value: 0 },
                },
            },
        }),
            (o.textChange = function () {
                var e,
                    t = n.eq(r);
                r < n.length - 1 ? r++ : (r = 0),
                    (e = n.eq(r)),
                    o.hideText(t, i.effect, null, function (a) {
                        t.toggleClass("visible");
                        var n = l;
                        s && clearTimeout(s),
                            o.showText(
                                e,
                                i.effect,
                                function () {
                                    e.toggleClass("active"),
                                        t.toggleClass("active"),
                                        e.toggleClass("visible");
                                },
                                function () {
                                    s = setTimeout(function () {
                                        o.textChange();
                                    }, n);
                                }
                            );
                    });
            }),
            (o.showText = function (t, i, a, n) {
                var s = [];
                e("span", t).each(function () {
                    e(this).css({
                        width: "auto",
                        opacity: 1,
                        WebkitTransform: "",
                        transform: "",
                    }),
                        s.push(this);
                }),
                    o.animateText(s, "in", i, a, n);
            }),
            (o.hideText = function (t, i, a, n) {
                var s = [];
                e("span", t).each(function () {
                    s.push(this);
                }),
                    o.animateText(s, "out", i, a, n);
            }),
            (o.animateText = function (e, t, i, a, n) {
                var s = (o.avaliableEffects[i] || {})[t];
                (s.targets = e), (s.begin = a), (s.complete = n), anime(s);
            }),
            (o.init = function () {
                var t = n.eq(r);
                "fx12" === i.effect &&
                    e("span", n).each(function () {
                        e(this).css("width", "0").css("opacity", "1");
                    }),
                    o.showText(t, i.effect, null, function () {
                        var e = l;
                        s && clearTimeout(s),
                            (s = setTimeout(function () {
                                o.textChange();
                            }, e));
                    });
            });
    }),
        (window.jetImagesLayout = function (i, o) {
            var a,
                n = this,
                s = i,
                r =
                    (e(".jet-images-layout__list", s),
                    e(".jet-images-layout__item", s));
            Boolean(t.isEditMode()), (o = o || {});
            (a = { layoutType: "masonry", justifyHeight: 300 }),
                e.extend(a, o),
                (n.layoutBuild = function () {
                    switch (o.layoutType) {
                        case "masonry":
                            salvattore.init();
                            break;
                        case "justify":
                            r.each(function () {
                                var t = e(this),
                                    i = e(
                                        ".jet-images-layout__image-instance",
                                        t
                                    ),
                                    a = +i.data("width") / +i.data("height"),
                                    n = 100 * a,
                                    s = +o.justifyHeight * a;
                                t.css({ "flex-grow": n, "flex-basis": s });
                            });
                    }
                    if (e.isFunction(e.fn.imagesLoaded))
                        e(".jet-images-layout__image", r)
                            .imagesLoaded()
                            .progress(function (t, i) {
                                var o = e(i.img).closest(
                                        ".jet-images-layout__item"
                                    ),
                                    a = e(
                                        ".jet-images-layout__image-loader",
                                        o
                                    );
                                o.addClass("image-loaded"),
                                    a.fadeTo(500, 0, function () {
                                        e(this).remove();
                                    });
                            });
                    else {
                        var t = e(".jet-images-layout__image-loader", r);
                        r.addClass("image-loaded"),
                            t.fadeTo(500, 0, function () {
                                e(this).remove();
                            });
                    }
                }),
                (n.init = function () {
                    n.layoutBuild();
                });
        }),
        (window.jetScrollNavigation = function (a, n, s) {
            var r = this,
                l = e(window),
                d = e(document),
                c = (e("body"), n),
                u = e("html, body"),
                f = e(".jet-scroll-navigation__item", c),
                p =
                    ((s = e.extend(
                        {},
                        {
                            speed: 500,
                            blockSpeed: 500,
                            offset: 0,
                            sectionSwitch: !1,
                            sectionSwitchOnMobile: !0,
                        },
                        s
                    )),
                    {}),
                h = null,
                m = !1,
                g = window.location.hash.slice(1),
                v = 0,
                w = navigator.platform;
            jQuery.extend(jQuery.easing, {
                easeInOutCirc: function (e, t, i, o, a) {
                    return (t /= a / 2) < 1
                        ? (-o / 2) * (Math.sqrt(1 - t * t) - 1) + i
                        : (o / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + i;
                },
            }),
                (r.init = function () {
                    r.setSectionsData(),
                        g && p.hasOwnProperty(g) && f.addClass("invert"),
                        f.on("click.jetScrollNavigation", function (t) {
                            var i = e(this).data("anchor");
                            r.onAnchorChange(i);
                        }),
                        l.on(
                            "resize.jetScrollNavigation orientationchange.jetScrollNavigation",
                            o.debounce(50, r.onResize)
                        ),
                        l.on("load", function () {
                            r.setSectionsData();
                        }),
                        d.keydown(function (e) {
                            r.isEnabled() &&
                                (38 == e.keyCode && r.directionSwitch(e, "up"),
                                40 == e.keyCode &&
                                    r.directionSwitch(e, "down"));
                        }),
                        r.waypointHandler(),
                        r.hijakingHandler(),
                        "undefined" != typeof ResizeSensor &&
                            new ResizeSensor(
                                e(".jet-scroll-navigation-section"),
                                o.debounce(50, function () {
                                    r.setSectionsData(), r.waypointHandler();
                                })
                            );
                }),
                (r.setSectionsData = function () {
                    var i = Boolean(t.isEditMode());
                    f.each(function () {
                        var t = e(this),
                            o = t.data("anchor"),
                            a = "yes" === t.data("invert"),
                            n = e("#" + o);
                        n[0]
                            ? (n.addClass("jet-scroll-navigation-section"),
                              (n[0].dataset.sectionName = o),
                              (p[o] = {
                                  selector: n,
                                  offset: Math.round(n.offset().top),
                                  height: n.outerHeight(),
                                  invert: a,
                              }))
                            : i || t.css("display", "none");
                    });
                }),
                (r.waypointHandler = function () {
                    for (var t in (e(window).on("resize scroll", function () {
                        for (var t in p) {
                            let i = p[t].selector.attr("id");
                            if (s.sectionSwitch) return !1;
                            e("#" + i).isInViewport() ||
                                e("[data-anchor=" + i + "]", c).removeClass(
                                    "active"
                                );
                        }
                    }),
                    p)) {
                        var o = p[t].selector;
                        i.waypoint(
                            o,
                            function (t) {
                                var i = e(this).attr("id");
                                "down" !== t ||
                                    m ||
                                    (!1 === s.sectionIdVisibility &&
                                        window.history.pushState(
                                            null,
                                            null,
                                            "#" + i
                                        ),
                                    (h = i),
                                    f.removeClass("active"),
                                    e("[data-anchor=" + i + "]", c).addClass(
                                        "active"
                                    ),
                                    f.removeClass("invert"),
                                    p[i].invert && f.addClass("invert"));
                            },
                            { offset: "70%", triggerOnce: !1 }
                        ),
                            i.waypoint(
                                o,
                                function (t) {
                                    var i = e(this).attr("id");
                                    "up" !== t ||
                                        m ||
                                        (!1 === s.sectionIdVisibility &&
                                            window.history.pushState(
                                                null,
                                                null,
                                                "#" + i
                                            ),
                                        (h = i),
                                        f.removeClass("active"),
                                        e(
                                            "[data-anchor=" + i + "]",
                                            c
                                        ).addClass("active"),
                                        f.removeClass("invert"),
                                        p[i].invert && f.addClass("invert"));
                                },
                                { offset: "0%", triggerOnce: !1 }
                            );
                    }
                }),
                (r.onAnchorChange = function (t) {
                    var i,
                        o = e("[data-anchor=" + t + "]", c);
                    if (!p.hasOwnProperty(t)) return !1;
                    (i = p[t].offset - s.offset),
                        m ||
                            ((m = !0),
                            !1 === s.sectionIdVisibility &&
                                window.history.pushState(null, null, "#" + t),
                            (h = t),
                            f.removeClass("active"),
                            o.addClass("active"),
                            f.removeClass("invert"),
                            p[t].invert && f.addClass("invert"),
                            u.animate(
                                { scrollTop: i },
                                s.speed,
                                "easeInOutCirc",
                                function () {
                                    m = !1;
                                }
                            ));
                }),
                (r.directionSwitch = function (t, i) {
                    i = i || "up";
                    var o = e("[data-anchor=" + h + "]", c).next(),
                        a = e("[data-anchor=" + h + "]", c).prev();
                    if (m) return !1;
                    "up" === i &&
                        a[0] &&
                        a.trigger("click.jetScrollNavigation"),
                        "down" === i &&
                            o[0] &&
                            o.trigger("click.jetScrollNavigation");
                }),
                (r.hijakingHandler = function () {
                    var t = o.mobileAndTabletcheck(),
                        i = 0;
                    s.sectionSwitch &&
                        (t ||
                            document.addEventListener("wheel", r.onWheel, {
                                passive: !1,
                            }),
                        t &&
                            s.sectionSwitchOnMobile &&
                            (document.addEventListener(
                                "touchstart",
                                function (t) {
                                    if (r.isEnabled()) {
                                        var o = e(t.target),
                                            a =
                                                (0 <
                                                o.closest(
                                                    ".elementor-top-section"
                                                ).length
                                                    ? o.closest(
                                                          ".elementor-top-section"
                                                      )
                                                    : o.closest(
                                                          ".e-con.jet-scroll-navigation-section"
                                                      )
                                                ).attr("id") || !1;
                                        (i = t.changedTouches[0].clientY),
                                            a && m && t.preventDefault();
                                    }
                                },
                                { passive: !1 }
                            ),
                            document.addEventListener(
                                "touchend",
                                function (t) {
                                    if (r.isEnabled()) {
                                        var a = e(t.target),
                                            n =
                                                a.closest(
                                                    ".jet-scroll-navigation"
                                                ) || !1,
                                            s =
                                                (
                                                    (0 <
                                                    a.closest(
                                                        ".elementor-top-section"
                                                    ).length
                                                        ? a.closest(
                                                              ".elementor-top-section"
                                                          )
                                                        : a.closest(
                                                              ".e-con.jet-scroll-navigation-section"
                                                          )) || !1
                                                ).attr("id") || !1,
                                            d = l.scrollTop(),
                                            c = t.changedTouches[0].clientY,
                                            u = c > i ? "up" : "down",
                                            f = !1,
                                            h = !1,
                                            m = !1,
                                            g = !1,
                                            v = window.screen.availHeight / 8;
                                        return (
                                            !(Math.abs(c - i) < 20) &&
                                            !n[0] &&
                                            void (
                                                s &&
                                                p.hasOwnProperty(s) &&
                                                ((m = o.getObjectPrevKey(p, s)),
                                                (g = o.getObjectNextKey(p, s)),
                                                (f = p[s].offset),
                                                "up" === u &&
                                                    (f - v < d && (m = s),
                                                    m && (h = m)),
                                                "down" === u &&
                                                    (f + v > d && (g = s),
                                                    g && (h = g)),
                                                h && r.onAnchorChange(h))
                                            )
                                        );
                                    }
                                },
                                { passive: !1 }
                            )));
                }),
                (r.onScroll = function (e) {
                    e.preventDefault();
                }),
                (r.onWheel = function (t) {
                    if (r.isEnabled()) {
                        m && t.preventDefault();
                        var i = e(t.target),
                            a =
                                (0 <
                                i.closest(".elementor-top-section[id]").length
                                    ? i.closest(".elementor-top-section[id]")
                                    : i.closest(".e-con[id]")
                                ).attr("id") || !1,
                            n = 0 > t.deltaY ? "up" : "down",
                            d = !1,
                            c = !1,
                            u = !1,
                            f = !1,
                            h = l.scrollTop();
                        if (!i.closest(".jet-map-listing").length) {
                            if (
                                a &&
                                p.hasOwnProperty(a) &&
                                ((u = o.getObjectPrevKey(p, a)),
                                (f = o.getObjectNextKey(p, a)),
                                (d = p[a].offset),
                                "up" === n &&
                                    (d < h + s.offset - 10 && (u = a),
                                    u && (c = u)),
                                "down" === n &&
                                    (d > h + s.offset + 10 && (f = a),
                                    f && (c = f)),
                                c)
                            ) {
                                if (
                                    (t.preventDefault(),
                                    t.timeStamp - v > 15 && "MacIntel" == w)
                                )
                                    return (v = t.timeStamp), !1;
                                r.onAnchorChange(c);
                            }
                            return !1;
                        }
                    }
                }),
                (r.onResize = function (e) {
                    r.setSectionsData();
                }),
                (r.scrollStop = function () {
                    u.stop(!0);
                }),
                (r.isEnabled = function () {
                    return a.is(":visible");
                }),
                (r.mobileAndTabletcheck = function () {
                    var e,
                        t = !1;
                    return (
                        (e =
                            navigator.userAgent ||
                            navigator.vendor ||
                            window.opera),
                        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                            e
                        ) ||
                            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                                e.substr(0, 4)
                            )) &&
                            (t = !0),
                        t
                    );
                }),
                (e.fn.isInViewport = function () {
                    let t = e(this).offset().top,
                        i = t + e(this).outerHeight(),
                        o = e(window).scrollTop(),
                        a = o + e(window).height();
                    return i > o && t < a;
                });
        }),
        (window.jetSectionParallax = function (i) {
            var a = this,
                n = (i.data("id"), !1),
                s = Boolean(t.isEditMode()),
                r = e(window),
                l = (e("body"), []),
                d = [],
                c = r.scrollTop(),
                u = r.height(),
                f = 0,
                p = 0,
                h =
                    (navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
                    navigator.platform);
            (a.init = function () {
                if (
                    !(n = s
                        ? a.generateEditorSettings(i)
                        : 0 != (n = i.data("settings") || !1) &&
                          n.jet_parallax_layout_list)
                )
                    return !1;
                a.generateLayouts(),
                    r.on(
                        "resize.jetSectionParallax orientationchange.jetSectionParallax",
                        o.debounce(30, a.generateLayouts)
                    ),
                    0 !== l.length &&
                        r.on(
                            "scroll.jetSectionParallax resize.jetSectionParallax",
                            a.scrollHandler
                        ),
                    0 !== d.length &&
                        (i.on(
                            "mousemove.jetSectionParallax resize.jetSectionParallax",
                            a.mouseMoveHandler
                        ),
                        i.on(
                            "mouseleave.jetSectionParallax",
                            a.mouseLeaveHandler
                        )),
                    a.scrollUpdate();
            }),
                (a.generateEditorSettings = function (t) {
                    var i,
                        a = {},
                        n = [];
                    return (
                        !!window.elementor.hasOwnProperty("elements") &&
                        !(
                            !(a =
                                o.getElementorElementSettings(
                                    t
                                )).hasOwnProperty("jet_parallax_layout_list") ||
                            0 === Object.keys(a).length
                        ) &&
                        ((i = a.jet_parallax_layout_list),
                        e.each(i, function (e, t) {
                            n.push(t);
                        }),
                        0 !== n.length && n)
                    );
                }),
                (a.generateLayouts = function () {
                    e(".jet-parallax-section__layout", i).remove(),
                        e.each(n, function (a, n) {
                            var s,
                                r,
                                c = n.jet_parallax_layout_image,
                                u = n.jet_parallax_layout_speed.size || 50,
                                f = n.jet_parallax_layout_z_index,
                                p =
                                    n.jet_parallax_layout_animation_prop ||
                                    "bgposition",
                                m = elementorFrontend.getCurrentDeviceMode(),
                                g = t.config.responsive.activeBreakpoints,
                                v = [],
                                w = n.jet_parallax_layout_bg_x,
                                _ = n.jet_parallax_layout_bg_y,
                                b = n.jet_parallax_layout_type || "none",
                                y = n.jet_parallax_layout_direction || "1",
                                j =
                                    n.jet_parallax_layout_fx_direction ||
                                    "fade-in",
                                x = n.jet_parallax_layout_on || [
                                    "desktop",
                                    "tablet",
                                ],
                                k = n._id,
                                C = "MacIntel" == h ? " is-mac" : "";
                            if (-1 === x.indexOf(m)) return !1;
                            for (var [T, S] of Object.entries(g))
                                "widescreen" === T
                                    ? (v.push("desktop"), v.push(T))
                                    : v.push(T);
                            -1 === v.indexOf("widescreen") && v.push("desktop"),
                                (v = v.reverse());
                            var E,
                                O = 0,
                                z = [];
                            [
                                "widescreen",
                                "desktop",
                                "laptop",
                                "tablet_extra",
                                "tablet",
                                "mobile_extra",
                                "mobile",
                            ].forEach(function (e) {
                                -1 != v.indexOf(e) &&
                                    ((z[O] = []),
                                    (z[O][e] =
                                        "widescreen" === e
                                            ? {
                                                  bgX:
                                                      "" !=
                                                      n[
                                                          "jet_parallax_layout_bg_x_" +
                                                              e
                                                      ]
                                                          ? n.jet_parallax_layout_bg_x
                                                          : 0,
                                                  bgY:
                                                      "" !=
                                                      n[
                                                          "jet_parallax_layout_bg_y_" +
                                                              e
                                                      ]
                                                          ? n.jet_parallax_layout_bg_y
                                                          : 0,
                                                  layoutImageData:
                                                      "" !=
                                                      n[
                                                          "jet_parallax_layout_image_" +
                                                              e
                                                      ]
                                                          ? n[
                                                                "jet_parallax_layout_image_" +
                                                                    e
                                                            ]
                                                          : "",
                                              }
                                            : "desktop" === e
                                            ? {
                                                  bgX:
                                                      "" !=
                                                      n.jet_parallax_layout_bg_x
                                                          ? n.jet_parallax_layout_bg_x
                                                          : 0,
                                                  bgY:
                                                      "" !=
                                                      n.jet_parallax_layout_bg_y
                                                          ? n.jet_parallax_layout_bg_y
                                                          : 0,
                                                  layoutImageData:
                                                      c.url ||
                                                      n
                                                          .jet_parallax_layout_image
                                                          .url,
                                              }
                                            : {
                                                  bgX:
                                                      n[
                                                          "jet_parallax_layout_bg_x_" +
                                                              e
                                                      ] &&
                                                      "" !=
                                                          n[
                                                              "jet_parallax_layout_bg_x_" +
                                                                  e
                                                          ]
                                                          ? n[
                                                                "jet_parallax_layout_bg_x_" +
                                                                    e
                                                            ]
                                                          : z[O - 1][E].bgX,
                                                  bgY:
                                                      n[
                                                          "jet_parallax_layout_bg_y_" +
                                                              e
                                                      ] &&
                                                      "" !=
                                                          n[
                                                              "jet_parallax_layout_bg_y_" +
                                                                  e
                                                          ]
                                                          ? n[
                                                                "jet_parallax_layout_bg_y_" +
                                                                    e
                                                            ]
                                                          : z[O - 1][E].bgY,
                                                  layoutImageData:
                                                      n[
                                                          "jet_parallax_layout_image_" +
                                                              e
                                                      ] &&
                                                      "" !=
                                                          n[
                                                              "jet_parallax_layout_image_" +
                                                                  e
                                                          ].url
                                                          ? n[
                                                                "jet_parallax_layout_image_" +
                                                                    e
                                                            ].url
                                                          : z[O - 1][E]
                                                                .layoutImageData,
                                              }),
                                    m === e &&
                                        ((w = z[O][e].bgX),
                                        (_ = z[O][e].bgY),
                                        (c = z[O][e].layoutImageData)),
                                    (E = e),
                                    O++);
                            }),
                                i.hasClass("jet-parallax-section") ||
                                    i.addClass("jet-parallax-section"),
                                (s = e(
                                    '<div class="jet-parallax-section__layout elementor-repeater-item-' +
                                        k +
                                        " jet-parallax-section__" +
                                        b +
                                        "-layout" +
                                        C +
                                        '"><div class="jet-parallax-section__image"></div></div>'
                                )
                                    .prependTo(i)
                                    .css({ "z-index": f }));
                            var I = {
                                "background-position-x": w + "%",
                                "background-position-y": _ + "%",
                                "background-image": "url(" + c + ")",
                            };
                            e("> .jet-parallax-section__image", s).css(I),
                                (r = {
                                    selector: s,
                                    prop: p,
                                    type: b,
                                    device: x,
                                    xPos: w,
                                    yPos: _,
                                    direction: +y,
                                    fxDirection: j,
                                    speed: (u / 100) * 2,
                                }),
                                "none" !== b &&
                                    (o.inArray(b, [
                                        "scroll",
                                        "h-scroll",
                                        "zoom",
                                        "rotate",
                                        "blur",
                                        "opacity",
                                    ]) && l.push(r),
                                    "mouse" === b && d.push(r));
                        });
                }),
                (a.scrollHandler = function (e) {
                    (c = r.scrollTop()), (u = r.height()), a.scrollUpdate();
                }),
                (a.scrollUpdate = function () {
                    e.each(l, function (t, i) {
                        var o = i.selector,
                            a = e(".jet-parallax-section__image", o),
                            n = i.speed,
                            s = o.offset().top,
                            r = o.outerHeight(),
                            l = i.prop,
                            d = i.type,
                            f = i.direction,
                            p = i.fxDirection,
                            h = ((c - s + u) / r) * 100,
                            m = elementorFrontend.getCurrentDeviceMode();
                        if (-1 === i.device.indexOf(m))
                            return (
                                a.css({
                                    transform: "translateX(0) translateY(0)",
                                    "background-position-y": i.yPos,
                                    "background-position-x": i.xPos,
                                    filter: "none",
                                    opacity: "1",
                                }),
                                !1
                            );
                        switch (
                            (c < s - u && (h = 0),
                            c > s + r && (h = 200),
                            (h = parseFloat(n * h).toFixed(1)),
                            d)
                        ) {
                            case "scroll":
                                "bgposition" === l
                                    ? a.css({
                                          "background-position-y":
                                              "calc(" +
                                              i.yPos +
                                              "% + " +
                                              h +
                                              "px)",
                                      })
                                    : a.css({
                                          transform: "translateY(" + h + "px)",
                                      });
                                break;
                            case "h-scroll":
                                "bgposition" === l
                                    ? a.css({
                                          "background-position-x":
                                              "calc(" +
                                              i.xPos +
                                              "% + " +
                                              h * f +
                                              "px)",
                                      })
                                    : a.css({
                                          transform:
                                              "translateX(" + h * f + "px)",
                                      });
                                break;
                            case "zoom":
                                var g = ((c - s + u) / u) * n;
                                (g += 1),
                                    a.css({ transform: "scale(" + g + ")" });
                                break;
                            case "rotate":
                                var v = h;
                                a.css({
                                    transform: "rotateZ(" + v * f + "deg)",
                                });
                                break;
                            case "blur":
                                var w = 0;
                                switch (p) {
                                    case "fade-in":
                                        w = h / 40;
                                        break;
                                    case "fade-out":
                                        w = 5 * n - h / 40;
                                }
                                a.css({ filter: "blur(" + w + "px)" });
                                break;
                            case "opacity":
                                var _ = 1;
                                switch (p) {
                                    case "fade-in":
                                        _ = 1 - h / 400;
                                        break;
                                    case "fade-out":
                                        _ = 1 - 0.5 * n + h / 400;
                                }
                                a.css({ opacity: _ });
                        }
                    });
                }),
                (a.mouseMoveHandler = function (e) {
                    var t = r.width(),
                        i = r.height(),
                        o = Math.ceil(t / 2),
                        n = Math.ceil(i / 2),
                        s = e.clientX - o,
                        l = e.clientY - n;
                    (f = (s / o) * -1), (p = (l / n) * -1), a.mouseMoveUpdate();
                }),
                (a.mouseLeaveHandler = function (t) {
                    e.each(d, function (t, i) {
                        var o = i.selector,
                            a = e(".jet-parallax-section__image", o);
                        switch (i.prop) {
                            case "transform3d":
                                TweenMax.to(a[0], 1.2, {
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                    rotationX: 0,
                                    rotationY: 0,
                                    ease: Power2.easeOut,
                                });
                        }
                    });
                }),
                (a.mouseMoveUpdate = function () {
                    e.each(d, function (t, i) {
                        var o = i.selector,
                            a = e(".jet-parallax-section__image", o),
                            n = i.speed,
                            s = i.prop,
                            r = parseFloat(125 * f * n).toFixed(1),
                            l = parseFloat(125 * p * n).toFixed(1),
                            d = 50 * i.zIndex,
                            c = parseFloat(25 * f * n).toFixed(1),
                            u = parseFloat(25 * p * n).toFixed(1),
                            h = elementorFrontend.getCurrentDeviceMode();
                        if (-1 == i.device.indexOf(h))
                            return (
                                a.css({
                                    transform: "translateX(0) translateY(0)",
                                    "background-position-x": i.xPos,
                                    "background-position-y": i.yPos,
                                }),
                                !1
                            );
                        switch (s) {
                            case "bgposition":
                                var m = i.xPos + (r / a[0].offsetWidth) * 100,
                                    g = i.yPos + (l / a[0].offsetHeight) * 100;
                                TweenMax.to(a[0], 1, {
                                    backgroundPositionX: m,
                                    backgroundPositionY: g,
                                    ease: Power2.easeOut,
                                });
                                break;
                            case "transform":
                                TweenMax.to(a[0], 1, {
                                    x: r,
                                    y: l,
                                    ease: Power2.easeOut,
                                });
                                break;
                            case "transform3d":
                                TweenMax.to(a[0], 2, {
                                    x: r,
                                    y: l,
                                    z: d,
                                    rotationX: u,
                                    rotationY: -c,
                                    ease: Power2.easeOut,
                                });
                        }
                    });
                });
        }),
        (window.jetPortfolio = function (i, a) {
            var n,
                s = this,
                r = i,
                l = e(".jet-portfolio__list", r),
                d = e(".jet-portfolio__item", r),
                c = e(".jet-portfolio__filter-item", r),
                u = e(".jet-portfolio__view-more", r),
                f = e(".jet-portfolio__view-more-button", r),
                p = f[0],
                h = {},
                m = {},
                g = "all",
                v = o.isRTL(),
                w = Boolean(t.isEditMode()),
                _ = {
                    itemSelector: ".jet-portfolio__item",
                    percentPosition: !0,
                    isOriginLeft: !0 !== v,
                };
            a = e.extend({ layoutType: "masonry", columns: 3, perPage: 6 }, a);
            (s.init = function () {
                s.layoutBuild(),
                    w &&
                        n.get(0) &&
                        e(window).on(
                            "resize",
                            o.debounce(50, function () {
                                n.masonry("layout");
                            })
                        );
            }),
                (s.layoutBuild = function () {
                    if (
                        (s.generateData(),
                        c.data("showItems", p ? a.perPage : "all"),
                        "justify" == a.layoutType &&
                            (_.columnWidth = ".grid-sizer"),
                        ("masonry" != a.layoutType &&
                            "justify" != a.layoutType) ||
                            (n = l.masonry(_)),
                        e.isFunction(e.fn.imagesLoaded))
                    )
                        e(".jet-portfolio__image", d)
                            .imagesLoaded()
                            .progress(function (t, i) {
                                var o = e(i.img).closest(
                                    ".jet-portfolio__item"
                                );
                                e(".jet-portfolio__image-loader", o).remove(),
                                    o.addClass("item-loaded"),
                                    n && n.masonry("layout");
                            });
                    else {
                        var t = e(".jet-portfolio__image-loader", d);
                        d.addClass("item-loaded"), t.remove();
                    }
                    c.on("click.jetPortfolio", s.filterHandler),
                        f.on("click.jetPortfolio", s.moreButtonHandler),
                        s.render(),
                        s.checkMoreButton();
                }),
                (s.generateData = function () {
                    c[0]
                        ? c.each(function (t) {
                              var i = e(this).data("slug");
                              (m[i] = !1), "all" == i && (m[i] = !0);
                          })
                        : (m.all = !0),
                        d.each(function (t) {
                            var i = e(this),
                                o = i.data("slug");
                            h[t] = {
                                selector: i,
                                slug: o,
                                visible: !!i.hasClass("visible-status"),
                                more: !!i.hasClass("hidden-status"),
                                lightboxEnabled:
                                    "yes" ===
                                    i
                                        .find(".jet-portfolio__link")
                                        .data("elementor-open-lightbox"),
                            };
                        });
                }),
                (s.filterHandler = function (t) {
                    t.preventDefault();
                    var i = e(this),
                        o = 1,
                        a = i.data("slug"),
                        n = i.data("showItems");
                    for (var r in (c.removeClass("active"),
                    i.addClass("active"),
                    m))
                        (m[r] = !1), r == a && ((m[r] = !0), (g = r));
                    e.each(h, function (e, t) {
                        var i = !1;
                        "all" === n
                            ? s.isItemVisible(t.slug) && !t.more && (i = !0)
                            : s.isItemVisible(t.slug) &&
                              (o <= n
                                  ? ((i = !0), (t.more = !1))
                                  : (t.more = !0),
                              o++),
                            (t.visible = i);
                    }),
                        s.render(),
                        s.checkMoreButton();
                }),
                (s.moreButtonHandler = function (t) {
                    e(this);
                    var i,
                        o = 1,
                        n = e(".jet-portfolio__filter-item.active", r);
                    e.each(h, function (e, t) {
                        s.isItemVisible(t.slug) &&
                            t.more &&
                            o <= a.perPage &&
                            ((t.more = !1), (t.visible = !0), o++);
                    }),
                        n[0] &&
                            ((i = n.data("showItems")),
                            n.data("showItems", i + o - 1)),
                        s.render(),
                        s.checkMoreButton();
                }),
                (s.checkMoreButton = function () {
                    var t = !1;
                    e.each(h, function (e, i) {
                        s.isItemVisible(i.slug) && i.more && (t = !0);
                    }),
                        t
                            ? u.removeClass("hidden-status")
                            : u.addClass("hidden-status");
                }),
                (s.isItemVisible = function (e) {
                    var t = o.getObjectValues(e);
                    for (var i in m) {
                        if (m[i] && -1 !== t.indexOf(i)) return !0;
                    }
                    return !1;
                }),
                (s.anyFilterEnabled = function () {
                    for (var e in m) if (m[e]) return !0;
                    return !1;
                }),
                (s.render = function () {
                    d
                        .removeClass("visible-status")
                        .removeClass("hidden-status"),
                        e.each(h, function (t, i) {
                            var o = e(".jet-portfolio__inner", i.selector),
                                n = e(".jet-portfolio__link", i.selector),
                                s = a.id + "-" + g;
                            i.visible
                                ? (i.selector.addClass("visible-status"),
                                  i.lightboxEnabled &&
                                      n[0].setAttribute(
                                          "data-elementor-lightbox-slideshow",
                                          s
                                      ),
                                  anime({
                                      targets: o[0],
                                      opacity: { value: 1, duration: 400 },
                                      scale: {
                                          value: 1,
                                          duration: 500,
                                          easing: "easeOutExpo",
                                      },
                                      delay: 50,
                                      elasticity: !1,
                                  }))
                                : (i.selector.addClass("hidden-status"),
                                  n[0].removeAttribute(
                                      "data-elementor-lightbox-slideshow"
                                  ),
                                  anime({
                                      targets: o[0],
                                      opacity: 0,
                                      scale: 0,
                                      duration: 500,
                                      elasticity: !1,
                                  }));
                        }),
                        n && n.masonry("layout");
                });
        }),
        (window.jetTimeLine = function (t) {
            var i = t.closest(
                    ".jet-popup__container-inner, .elementor-popup-modal .dialog-message"
                ),
                a = !!i[0],
                n = a ? i : e(window),
                s = a ? n.offset().top - e(window).scrollTop() : 0,
                r = this,
                l = t.find(".jet-timeline__line"),
                d = l.find(".jet-timeline__line-progress"),
                c = t.find(".jet-timeline-item"),
                u = t.find(".timeline-item__point"),
                f = n.scrollTop(),
                p = -1,
                h = n.height(),
                m = a ? n.outerHeight() : window.innerHeight,
                g = !1;
            (r.onScroll = function () {
                (f = n.scrollTop()),
                    (s = a ? n.offset().top - e(window).scrollTop() : 0),
                    r.updateFrame(),
                    r.animateCards();
            }),
                (r.onResize = function () {
                    (f = n.scrollTop()),
                        (h = n.height()),
                        (s = a ? n.offset().top - e(window).scrollTop() : 0),
                        r.updateFrame();
                }),
                (r.updateWindow = function () {
                    (g = !1),
                        l.css({
                            top:
                                c.first().find(u).offset().top -
                                c.first().offset().top,
                            bottom:
                                t.offset().top +
                                t.outerHeight() -
                                c.last().find(u).offset().top,
                        }),
                        p !== f && ((p = f), h, r.updateProgress());
                }),
                (r.updateProgress = function () {
                    var t = c.last().find(u).offset().top,
                        i = a ? t + f - s - e(window).scrollTop() : t,
                        o = a
                            ? d.offset().top + f - s - e(window).scrollTop()
                            : d.offset().top,
                        n = f - o + m / 2;
                    i <= f + m / 2 && (n = i - o),
                        d.css({ height: n + "px" }),
                        c.each(function () {
                            var t = e(this).find(u).offset().top;
                            (t = a ? t + f - s - e(window).scrollTop() : t) <
                            f + 0.5 * m
                                ? e(this).addClass("is--active")
                                : e(this).removeClass("is--active");
                        });
                }),
                (r.updateFrame = function () {
                    g || requestAnimationFrame(r.updateWindow), (g = !0);
                }),
                (r.animateCards = function () {
                    c.each(function () {
                        var t = e(this).offset().top;
                        (t = a ? t + f - s - e(window).scrollTop() : t) <=
                            f + 0.9 * m &&
                            e(this).hasClass("jet-timeline-item--animated") &&
                            e(this).addClass("is--show");
                    });
                }),
                (r.init = function () {
                    e(document).ready(r.onScroll),
                        n.on("scroll.jetTimeline", r.onScroll),
                        e(window).on(
                            "resize.jetTimeline orientationchange.jetTimeline",
                            o.debounce(50, r.onResize)
                        );
                });
        }),
        (window.jetScratchEffect = function (t, i, a, n = 75, s) {
            var r,
                l = document.querySelector(t),
                d = document.querySelector(i),
                c = d.width,
                u = d.height,
                f = d.getContext("2d"),
                p = new Image(),
                h = !1;
            function m(e, t) {
                return {
                    x: (e.pageX || e.touches[0].clientX) - 0,
                    y: (e.pageY || e.touches[0].clientY) - 0,
                };
            }
            function g(e) {
                (e = e || 0) > n && a && a.call(d);
            }
            function v(e) {
                (h = !0), (r = m(e));
            }
            function w(e) {
                var t,
                    i,
                    a =
                        ((t = d.getBoundingClientRect()),
                        (i = document.documentElement),
                        { top: t.top, scrollTop: i.scrollTop }),
                    n = 0;
                if ((s.top != a.top && (n = a.top + a.scrollTop - s), h)) {
                    e.preventDefault();
                    for (
                        var l,
                            v,
                            w = m(e),
                            _ =
                                ((l = r),
                                (v = w),
                                Math.sqrt(
                                    Math.pow(v.x - l.x, 2) +
                                        Math.pow(v.y - l.y, 2)
                                )),
                            b = (function (e, t) {
                                return Math.atan2(t.x - e.x, t.y - e.y);
                            })(r, w),
                            y = 0,
                            j = 0,
                            x =
                                navigator.userAgent ||
                                navigator.vendor ||
                                window.opera,
                            k = /iPad|iPhone|iPod/.test(x) && !window.MSStream,
                            C =
                                o.mobileAndTabletcheck() && !k
                                    ? window.scrollY
                                    : 0,
                            T = 0;
                        T < _;
                        T++
                    )
                        (y = r.x + Math.sin(b) * T - 40),
                            (j = r.y + Math.cos(b) * T - 40 + C - n),
                            (f.globalCompositeOperation = "destination-out"),
                            f.drawImage(p, y, j, 80, 80);
                    (r = w),
                        g(
                            (function (e) {
                                (!e || e < 1) && (e = 1);
                                for (
                                    var t = f.getImageData(0, 0, c, u).data,
                                        i = t.length,
                                        o = i / e,
                                        a = 0,
                                        n = (a = 0);
                                    n < i;
                                    n += e
                                )
                                    0 === parseInt(t[n]) && a++;
                                return Math.round((a / o) * 100);
                            })(32)
                        );
                }
            }
            function _(e) {
                h = !1;
            }
            e(".jet-animated-box__button--back", l).on("focus", function () {
                g(100);
            }),
                (p.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAxCAYAAABNuS5SAAAKFklEQVR42u2aCXCcdRnG997NJtlkk83VJE3apEma9CQlNAR60UqrGSqW4PQSO9iiTkE8BxWtlGMqYCtYrLRQtfVGMoJaGRFliijaViwiWgQpyCEdraI1QLXG52V+n/5nzd3ENnX/M8/sJvvt933/533e81ufL7MyK7NOzuXPUDD0FQCZlVn/+xUUQhkXHny8M2TxGsq48MBjXdAhL9/7YN26dd5nI5aVRrvEc0GFEBNKhbDjwsHh3qP/FJK1EdYIedOFlFAOgREhPlICifZDYoBjTna3LYe4xcI4oSpNcf6RvHjuAJRoVszD0qFBGmgMChipZGFxbqzQkJWVZUSOF7JRX3S4LtLTeyMtkkqljMBkPzHRs2aYY5PcZH/qLY1EIo18byQ6hBytIr3WCAXcV4tQHYvFxg3w3N6+Bh3OQolEoqCoqCinlw16JzTFJSE6PYuZKqvztbC2ex7bzGxhKu+rerjJrEEq+r9ieElJSXFDQ0Mh9zYzOzu7FBUWcO4Q9xbD6HYvhXhGLccVD5ZAPyfMqaioyOrBUgEv8FZXV8caGxtz8vLykhCWTnZIKmsKhUJnEYeKcKk2YYERH41G7UYnck1/WvAPOxsdLJm2+bEY0Ay0RNeqkytXQkoBZM4U5oOaoYSUkBGRtvnesrBZK4e4F6ypqSkuLy+v4KI99ZQxkfc6vZ4jNAl1wkbhG8LrhfNBCdkxmhYacvj/GOce+3K9MHHbDHUmicOufREELRIWch/DljzMsglutr+VIJO5KjGrVfZAnpF8mnCd8G5hrnC60Cl8T/iw8C1hKd9P9eDCMcgo5HwBx8BB/g7xeRPkrBbeJ3xTeAxjvRGVV3NcshfPG1JX4tVDQae47GuVOknCi23xHr5nyrxe2C1sFlYJ7xe+Jlwm7BRulItP0ms957RzTMK1ws41jMS8eDxehopaOCYfxc3AIHcIX+K6nxW+ImyVF1i8PQ8DTuwtdC1atCja3NwcHkq5EuXmo85G+jq+yMm28V4q/zcIPxV+K9zPxnbgTi0ocybu6wX66fx/vfAB4T1gHt8xI1wlXMF5zEXnQKC56ruEjwhvEa4WrrXvK/Yt5Pt5I1UveeVKyKmT+lpG2gQ2npMmez8ZzFT3e+HXwj7hKXNf6rFZbDpJUjESLdFsFX4mfFv4Fd/7qPBm4UPCJ4RNwncwym4UfYVUtiAcDk/T+3NRmylwWzAY7BCBCwYYogZPnrJoRNm2IDc3tw4FVKXFm95UmGLzkTTFpog524WnhQPCQeGvwiPCCuFCYmk5GbEJt3tOeF54HPVeLLyXxHOv8BPhYaFLeFU4gsI7OWeZk3g+hpJNvVMGIIqhdRvy+biVISouq2TBqWxoIL1wgBhU5AR1SzJvFR4UnhX+Bl4RfsFGP0npUkTymIQ7fh8Cf4l6F0LgXkj6o3O+buGfwj+ElzGQETaNeJqPhxiahckYq8KJ9V6mP+4pTIATjsGCA8lCQVy9VbhB2CM8itu9IBxlkx6O4nbmmpcSi0KUExa3Psfn23DZC4lhlhRuIWs/R1Y9BrpR4WHcfiOq34bLl5DJm1B7BANPGO4+2OJfDcVwX+RZkL5d+DRqeRJ360IJx1CFp4w/8/lhVGXxay1xKp8asQ31rSbgz2az1aBBWCZsgKTfEFe7uM4xYus9KHWXcBv3eolwJe67hJLIN6yubMVpW1tbbllZWVxtzjRquvQe9981IG3RZHUQttH7hB8IP0cdLwp/YnNHcdsjEP1xsEruO56i2Fy3UWXMskAgYAH/EjOiCD6NDc/XZ4v12RqSy3WQ9rJD3jPClwkZz2Aoy8JnUEjPcwYWfgfHvcIW84h308mABQP4Xp02OY44M4tSZSfx7UXIewU3NpXuxw0vJzauYDP1XM8y8Ttx67fhylYrdlAMW1x7h/BF3NWI+4PwFwjbSha26/xQuBmib6HDqeI+m4m5wzrj9A/xO+O5qbm4yizcbDOKfAjVWeC/WzAFLSeI+4hN9WzQ65EvED7D8Tt4vwE33O64rIfD1JW3k6xeQoX3UN6chyG8In4tcbHuRAyKw2ktVIIM2U5XcA7t2FKy5vWQeBexbbrTpvmZiJwN6e3EwKspW/ajqBuAKfKQk8m7KIce5bgnMNQDkLWPUmkj511DSVV5HJOd417FzrDAK7RjZLMZiURigmLVFCYs5tI2PFhpcUj/n6z6sp72LwJKiU2rUdp62rA7IX4XytpJ3Weh4XfE1/0kk/uoFX8kbCHudZLld5E8vJIs2+mbT8iznaR60DHMBt0EE1DySVlSsOBvyrL6zkZG5qI2T/QSBYTHMYAlq2tw1+0MFO4kVj5GSbSbgvkA8fQQr1uIdfdD5mZ1GhZbP0XfuwlPmOp0SNkYbkQV2JdlEsq69VJS+rTER+NtZVC+TX+NRFq1XGeiHXbGUHMg6lk2/DiZ+mHU8wTueoTXLtS3F5e9l2PNZW9lyrOB5LGSmJokzMQ6OjqCA3wsMXLLhqrWoZgKe3lyZ5YtLiwsLLfMLhJL0ibW3rKa7oMQ+Ajq6gKHcMeHeP8qZcpRMvyt1J97SRabcNP1ZGsbKhSb6lF+5GR6shUnlqTSyPM7LZxV/PUqjOfTH6cvqx+XyN3aCfBPUWh3UZIcxC2/jgu/BJ7Eve/G1R/EXS9gaLCc0dgySqIm7jV4MhEYdAaN4R4eRHkBusJp3GNp56iSOscyYN0DaUch8Ai13X6yrg0PvotCO8nme0geKymBaulc1qO+NbxOOpHZtrcHR+nT6+wePvcnk8k8qv6iNBdyH4/OoGR5gXbv75D4NIX3NoruLSjtKmLlbTwCKER1NmV+QIqfS13aai0izUHsRKksAQE5g0w4fuehj9f+xb25Ym1tbcIhuw2COmkBn2cAcQAFbsclV1BTns49JZio3EQWPkgCySJpFIu8aor0UfeLigDTlUTa/8eimhRGuUiKOZPYtYNabh9EGik3Mkk+A9I8JTWoAiik/LEpzY8tY4uwWc4AJMjxQd8oXRHU8JqbW32orNyAiubZo0WR5wX9KyHrLpLD52nrxhFHa1CVV5w3081cRu/7BYichpEqfafA7/sCzhT7tVkhLZvhTeB8Gv1r6U+ty/gqtWHQCSNTcPOl9NmXM1S4hgRjBjjL1MdUJ8cx3uhe3d3dfh5Meb8qyKWsuJRidwtN/h20XEtxvTwya7tKncU8ACqmXVwLict5fy6TnFhra2uW7xT8dWk2BHptVBOx8GLKjo3g7bhrBQq1sdVsCvEkhLZIac1y/zmUSO0oO8fX/0P2Ub3cwaWpZSITnLnOpDlBWTIfMleJqFb10jXCBJUlMyORSIP14LhqNef6v/05bpZTdHulUyXKsufDNdRxZ4vIhSKwhQFG5vfLfcwZsx2X92Jhje8/P8OI+TK/oO+zeA84WTzkvI/6RuB3y6f68qf11xnyMiuzMms4178AwArmZmkkdGcAAAAASUVORK5CYII="),
                d.addEventListener("mousedown", v, !1),
                d.addEventListener("mousemove", o.debounce(5, w), !1),
                d.addEventListener("mouseup", _, !1),
                d.addEventListener("touchstart", v, !1),
                d.addEventListener("touchmove", w, !1),
                d.addEventListener("touchend", _, !1);
        });
})(jQuery, window.elementorFrontend);
