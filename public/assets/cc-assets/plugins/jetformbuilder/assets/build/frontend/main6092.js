(() => {
    "use strict";
    function t() {
        (this.attrName = ""),
            (this.initial = null),
            (this.isFromData = !1),
            (this.value = null);
    }
    t.prototype = {
        attrName: "",
        input: null,
        initial: null,
        value: null,
        observe() {
            (this.value = new I(this.initial)),
                this.value.make(),
                this.addWatcherAttr();
        },
        nodeSignal() {
            const [t] = this.input.nodes;
            t[this.attrName] = this.value.current;
        },
        addWatcherAttr() {
            this.value.watch(() => this.nodeSignal());
        },
        isSupported(t) {
            var e;
            const [n] = t.nodes,
                i =
                    null !== (e = -1 !== n[this.attrName]) && void 0 !== e
                        ? e
                        : -1;
            return (
                !(!n.dataset.hasOwnProperty(this.attrName) && !i) &&
                ((this.initial = this.getInitial(t)), Boolean(this.initial))
            );
        },
        getInitial(t) {
            const [e] = t.nodes;
            return e.dataset[this.attrName] || e[this.attrName] || !1;
        },
        setInput(t) {
            this.input = t;
        },
    };
    const e = t;
    function n() {
        e.call(this),
            (this.attrName = "max_files"),
            (this.isSupported = function (t) {
                const [e] = t.nodes;
                return "file" === e.type;
            }),
            (this.setInput = function (t) {
                e.prototype.setInput.call(this, t);
                const { max_files: n = 1 } = JSON.parse(
                    t.previewsContainer.dataset.args
                );
                this.initial = +n;
            }),
            (this.addWatcherAttr = () => {});
    }
    n.prototype = Object.create(e.prototype);
    const i = n;
    function r() {
        i.call(this),
            (this.attrName = "max_size"),
            (this.setInput = function (t) {
                i.prototype.setInput.call(this, t);
                const { max_size: e = 1 } = JSON.parse(
                    t.previewsContainer.dataset.args
                );
                this.initial = +e;
            });
    }
    r.prototype = Object.create(i.prototype);
    const o = r;
    function s() {
        e.call(this),
            (this.attrName = "remaining"),
            (this.isSupported = function (t) {
                return t.attrs.hasOwnProperty("maxLength");
            }),
            (this.setInput = function (t) {
                var n;
                e.prototype.setInput.call(this, t);
                const { maxLength: i } = t.attrs,
                    r =
                        null !== (n = t.value.current?.length) && void 0 !== n
                            ? n
                            : 0;
                this.initial = i.value.current - r;
            }),
            (this.addWatcherAttr = () => {}),
            (this.observe = function () {
                e.prototype.observe.call(this),
                    this.input.value.watch(() => this.updateAttr()),
                    this.input.attrs.maxLength.value.watch(() =>
                        this.updateAttr()
                    );
            }),
            (this.updateAttr = function () {
                var t;
                const { maxLength: e } = this.input.attrs,
                    n =
                        null !== (t = this.input.value.current?.length) &&
                        void 0 !== t
                            ? t
                            : 0;
                this.value.current = e.value.current - n;
            });
    }
    s.prototype = Object.create(e.prototype);
    const u = s;
    function a() {
        i.call(this),
            (this.attrName = "file_ext"),
            (this.isSupported = function (t) {
                const [e] = t.nodes;
                return "file" === e.type && Boolean(e.accept);
            }),
            (this.setInput = function (t) {
                i.prototype.setInput.call(this, t);
                const [e] = t.nodes;
                this.initial = e.accept.split(",");
            }),
            (this.addWatcherAttr = function () {
                const [t] = this.input.nodes;
                this.value.watch(() => {
                    t.accept = this.value.current.join(",");
                });
            });
    }
    a.prototype = Object.create(i.prototype);
    const c = a,
        l = navigator.userAgent,
        h = {
            safari:
                /^((?!chrome|android).)*safari/i.test(l) ||
                /constructor/i.test(window.HTMLElement) ||
                "[object SafariRemoteNotification]" ===
                    (
                        !window.safari ||
                        ("undefined" != typeof safari &&
                            window.safari.pushNotification)
                    ).toString(),
        },
        { applyFilters: p } = JetPlugins.hooks;
    async function f(t) {
        const e = await Promise.allSettled(t.map((t) => new Promise(t)));
        return (
            window?.JetFormBuilderSettings?.devmode &&
                (console.group("allRejected"),
                console.info(...e),
                console.groupEnd()),
            e
                .filter((t) => "rejected" === t.status)
                .map(({ reason: t, value: e }) =>
                    t?.length ? t[0] : null != t ? t : e
                )
        );
    }
    const d = () =>
        p("jet.fb.input.html.attrs", [
            "min",
            "max",
            "minLength",
            "maxLength",
            i,
            o,
            u,
            c,
        ]);
    let g = [];
    function m(t) {
        const n = new e();
        return (n.attrName = t), n;
    }
    function y(t) {
        g.length || (g = d());
        for (const e of g) {
            let n;
            (n = "string" == typeof e ? m(e) : new e()),
                n.isSupported(t) &&
                    ((t.attrs[n.attrName] = n), n.setInput(t), n.observe());
        }
    }
    function b(t) {
        return "boolean" == typeof t
            ? !t
            : null == t ||
                  ("object" != typeof t || Array.isArray(t)
                      ? "number" == typeof t
                          ? 0 === t
                          : !t?.length
                      : !Object.keys(t)?.length);
    }
    function v(t) {
        return t?.isConnected && null !== t?.offsetParent;
    }
    function w(t) {
        var e;
        const n = t.getBoundingClientRect(),
            i = j(t);
        return n?.top + (null !== (e = i?.scrollY) && void 0 !== e ? e : 0);
    }
    const S = (t) => t.scrollHeight > t.clientHeight && t;
    function j(t) {
        let e = t.closest(".jet-popup__container-inner");
        return e
            ? S(e)
            : ((e = t.closest(".elementor-popup-modal .dialog-message")),
              e ? S(e) : window);
    }
    function N(t) {
        for (const e of t)
            if (!e.reporting.validityState.current) {
                !e.reporting.hasAutoScroll() && e.onFocus();
                break;
            }
    }
    function _(t = null) {
        (this.current = t),
            (this.signals = []),
            (this.sanitizers = []),
            (this.isDebug = !1),
            (this.isSilence = !1),
            (this.isMaked = !1);
    }
    _.prototype = {
        watchOnce(t) {
            if ("function" != typeof t) return;
            const e = this.watch(() => {
                e(), t();
            });
        },
        watch(t) {
            if ("function" != typeof t) return !1;
            if (this.signals.some(({ signal: e }) => e === t)) return !0;
            this.signals.push({ signal: t, trace: new Error().stack });
            const e = this.signals.length - 1;
            return () => this.signals.splice(e, 1);
        },
        sanitize(t) {
            if ("function" != typeof t) return !1;
            if (-1 !== this.sanitizers.indexOf(t)) return !0;
            this.sanitizers.push(t);
            const e = this.sanitizers.length - 1;
            return () => this.sanitizers.splice(e, 1);
        },
        make() {
            if (this.isMaked) return;
            this.isMaked = !0;
            let t = this.current,
                e = null;
            const n = this;
            Object.defineProperty(this, "current", {
                get: () => t,
                set(i) {
                    t !== i &&
                        ((e = t),
                        n.isDebug &&
                            (console.group("ReactiveVar has changed"),
                            console.log("current:", t),
                            console.log("newVal:", i),
                            console.groupEnd()),
                        (t = n.applySanitizers(i)),
                        n.isSilence || n.notify(e));
                },
            });
        },
        notify(t = null) {
            this.signals.forEach(({ signal: e }) => e.call(this, t));
        },
        applySanitizers(t) {
            for (const e of this.sanitizers) t = e.call(this, t);
            return t;
        },
        setIfEmpty(t) {
            b(this.current) && (this.current = t);
        },
        debug() {
            this.isDebug = !this.isDebug;
        },
        silence() {
            this.isSilence = !this.isSilence;
        },
    };
    const I = _;
    function F() {
        I.call(this, !1),
            (this.start = function () {
                this.current = !0;
            }),
            (this.end = function () {
                this.current = !1;
            }),
            (this.toggle = function () {
                this.current = !this.current;
            });
    }
    F.prototype = Object.create(I.prototype);
    const O = F;
    function R() {
        this.handlers = [];
    }
    R.prototype = {
        addFilter(t) {
            this.handlers.push(t);
            const e = this.handlers.length - 1;
            return () => this.handlers.splice(e, 1);
        },
        applyFilters(...t) {
            let e = t[0];
            const n = t.slice(1);
            for (const t of this.handlers) e = t(e, ...n);
            return e;
        },
    };
    const P = R,
        { strict_mode: k = !1 } = window?.JetFormBuilderSettings,
        E = Boolean(k);
    function C() {
        (this.input = null),
            (this.lock = new I()),
            this.lock.make(),
            (this.triggerjQuery = !E);
    }
    C.prototype = {
        input: null,
        lock: null,
        isSupported: (t, e) => !1,
        setInput(t) {
            this.input = t;
        },
        run(t) {
            if (!this.lock.current)
                return this.runSignal(t), void this.unlockTrigger();
            this.lock.signals.length ||
                this.lock.watchOnce(() => this.runSignal(t));
        },
        triggerJQuery(t) {
            this.triggerjQuery && jQuery(t).trigger("change");
        },
        runSignal(t) {},
        lockTrigger() {
            this.triggerjQuery = !1;
        },
        unlockTrigger() {
            E || (this.triggerjQuery = !0);
        },
    };
    const T = C;
    function D(t) {
        return "hidden" === t.type;
    }
    function M(t) {
        return "range" === t.type;
    }
    function B() {
        T.call(this);
    }
    (B.prototype = Object.create(T.prototype)),
        (B.prototype.isSupported = function (t, e) {
            return D(t) && e.isArray();
        }),
        (B.prototype.runSignal = function () {
            const { current: t } = this.input.value;
            if (!t?.length) {
                for (const t of this.input.nodes) t.remove();
                return void this.input.nodes.splice(0, this.input.nodes.length);
            }
            const e = [];
            for (const n of t) {
                if (
                    this.input.nodes.some(
                        (t, i) => t.value === n && (e.push(i), !0)
                    )
                )
                    continue;
                const t = document.createElement("input");
                (t.type = "hidden"),
                    (t.value = n),
                    (t.name = this.input.rawName),
                    this.input.nodes.push(t),
                    e.push(this.input.nodes.length - 1),
                    this.input.comment.parentElement.insertBefore(
                        t,
                        this.input.comment.nextElementSibling
                    );
            }
            this.input.nodes = this.input.nodes.filter(
                (t, n) => !!e.includes(n) || (t.remove(), !1)
            );
        });
    const A = B;
    function V() {
        T.call(this),
            (this.isSupported = function (t) {
                return M(t);
            }),
            (this.runSignal = function () {
                const [t] = this.input.nodes;
                (t.value = this.input.value.current),
                    (this.input.numberNode.textContent = t.value),
                    this.triggerJQuery(t);
            });
    }
    V.prototype = Object.create(T.prototype);
    const x = V;
    function J() {
        A.call(this),
            (this.isSupported = function (t) {
                return "_jfb_current_render_states[]" === t.name;
            }),
            (this.runSignal = function (t) {
                A.prototype.runSignal.call(this, t);
                const e = new URL(window.location),
                    n = this.input.getSubmit().getFormId(),
                    i = this.input.value.current || [],
                    r = `jfb[${n}][state]`,
                    o = [];
                for (const t of i) this.input.isCustom(t) && o.push(t);
                if (!o.length) {
                    if (!e.searchParams.has(r)) return;
                    return (
                        e.searchParams.delete(r),
                        void window.history.pushState({}, "", e.toString())
                    );
                }
                const s = o.join(",");
                e.searchParams.get(r) !== s &&
                    (e.searchParams.set(r, s),
                    window.history.pushState({}, "", e.toString()));
            });
    }
    J.prototype = Object.create(A.prototype);
    const L = J,
        { applyFilters: H } = JetPlugins.hooks;
    let Q = [];
    function Y(t) {
        Error.call(this, t),
            Error.captureStackTrace
                ? Error.captureStackTrace(this, Y)
                : (this.stack = new Error().stack);
    }
    Y.prototype = Object.create(Error.prototype);
    const q = Y;
    function W() {
        (this.input = null),
            (this.isRequired = !1),
            (this.errors = null),
            (this.restrictions = []),
            (this.valuePrev = null),
            (this.validityState = null),
            (this.promisesCount = 0);
    }
    W.prototype = {
        restrictions: [],
        valuePrev: null,
        validityState: null,
        promisesCount: 0,
        validateOnChange() {},
        validateOnBlur() {},
        async validate(t = null) {
            const e = await this.getErrors(t);
            if (((this.validityState.current = !Boolean(e.length)), !e.length))
                return this.clearReport(), !0;
            throw (
                (!this.input.root.getContext().silence && this.report(e),
                new q(e[0].name))
            );
        },
        async getErrorsRaw(t) {
            throw new Error("getError must return a Promise");
        },
        async getErrors(t = null) {
            if (
                this.input.loading.current ||
                this.input?.callable?.lock?.current ||
                !this.input.isVisible()
            )
                return [];
            const e = this.getPromises(t);
            var n;
            return this.hasChangedValue() ||
                this.promisesCount !== e.length ||
                this.input.stopValidation
                ? ((this.promisesCount = e.length),
                  (this.errors = []),
                  e.length
                      ? ((this.errors = await this.getErrorsRaw(e, t)),
                        this.errors)
                      : this.errors)
                : null !== (n = this.errors) && void 0 !== n
                ? n
                : [];
        },
        report(t) {
            this.input.getContext().reportedFirst
                ? this.reportRaw(t)
                : (this.input.getContext().reportFirst(), this.reportFirst(t));
        },
        reportRaw(t) {
            throw new Error("report is empty");
        },
        reportFirst(t) {
            this.report(t);
        },
        clearReport() {
            throw new Error("clearReport is empty");
        },
        getPromises(t = null) {
            const e = [];
            for (const n of this.restrictions)
                this.canProcessRestriction(n) &&
                    (this.beforeProcessRestriction(n),
                    e.push((e, i) => {
                        n.validatePromise(t)
                            .then(() => e(n))
                            .catch((t) => i([n, t]));
                    }));
            return e;
        },
        canProcessRestriction: (t) => !0,
        beforeProcessRestriction(t) {},
        isSupported(t, e) {
            throw new Error("isSupported is empty");
        },
        setInput(t) {
            (this.validityState = new I()),
                this.validityState.make(),
                (this.input = t),
                this.setRestrictions(),
                this.filterRestrictions();
        },
        setRestrictions() {},
        getNode() {
            return this.input.nodes[0];
        },
        hasChangedValue() {
            return this.valuePrev !== this.input.getValue();
        },
        checkValidity() {
            const t = this.input.getContext().silence;
            return null === this.validityState.current
                ? this.validateOnChangeState()
                : this.validityState.current
                ? Promise.resolve()
                : (t || (!t && this.report(this.errors || [])),
                  Promise.reject());
        },
        hasAutoScroll: () => !1,
        filterRestrictions() {
            const t = {};
            for (let [e, n] of Object.entries(this.restrictions))
                (e = n.getType() ? n.getType() : e), (t[e] = n);
            this.restrictions = Object.values(t);
        },
    };
    const z = W;
    function K() {
        z.call(this),
            (this.isSupported = function () {
                return !0;
            }),
            (this.reportRaw = function () {}),
            (this.reportFirst = function () {
                this.getNode().reportValidity();
            }),
            (this.setRestrictions = function () {
                const [t] = this.input.nodes;
                !(function (t, e) {
                    ot.length || (ot = rt());
                    for (const n of ot) {
                        const i = new n();
                        i.isSupported(e, t) && t.restrictions.push(i);
                    }
                    t.restrictions.forEach((e) => e.setReporting(t));
                })(this, t);
            }),
            (this.clearReport = function () {}),
            (this.validateOnChange = function () {
                this.validate()
                    .then(() => {})
                    .catch(() => {});
            }),
            (this.getErrorsRaw = async function (t) {
                const e = await f(t);
                return (this.valuePrev = this.input.getValue()), e;
            }),
            (this.validateOnChangeState = function () {
                return this.validate();
            }),
            (this.hasAutoScroll = function () {
                return this.input.hasAutoScroll();
            }),
            (this.getNode = function () {
                return this.input.getReportingNode();
            });
    }
    K.prototype = Object.create(z.prototype);
    const U = K;
    function $() {
        (this.reporting = null), (this.type = "");
    }
    $.prototype = {
        isSupported: (t, e) => !0,
        getType() {
            return this.type;
        },
        setReporting(t) {
            this.reporting = t;
        },
        getValue() {
            return this.reporting.input.value.current;
        },
        validate() {
            throw new Error("validate is wrong");
        },
        async validatePromise() {
            let t;
            try {
                t = await this.validate();
            } catch (t) {
                var e;
                return Promise.reject(
                    null !== (e = t?.message) && void 0 !== e ? e : t
                );
            }
            return t ? Promise.resolve() : Promise.reject("validate is wrong");
        },
        onReady() {},
    };
    const G = $;
    function X() {
        G.call(this),
            (this.isSupported = function (t) {
                return !!t.checkValidity;
            }),
            (this.validate = function () {
                const { nodes: t } = this.reporting.input;
                for (const e of t) if (e.checkValidity()) return !0;
                return !1;
            });
    }
    X.prototype = Object.create(G.prototype);
    const Z = X;
    function tt() {
        G.call(this), (this.type = "required");
    }
    (tt.prototype = Object.create(G.prototype)),
        (tt.prototype.isSupported = function (t, e) {
            return e.input.isRequired;
        }),
        (tt.prototype.validate = function () {
            const { current: t } = this.reporting.input.value;
            return !b(t);
        });
    const et = tt,
        { applyFilters: nt } = JetPlugins.hooks;
    let it = [];
    const rt = () => nt("jet.fb.restrictions.default", [Z, et]);
    let ot = [];
    function st(t, e = !1) {
        const n = [];
        t?.[0]?.getContext()?.reset({ silence: e });
        for (const e of t) {
            if (!(e instanceof lt))
                throw new Error("Input is not instance of InputData");
            n.push((t, n) => {
                e.reporting.validateOnChangeState().then(t).catch(n);
            });
        }
        return n;
    }
    function ut(t, e = !1) {
        return f(st(t, e));
    }
    const { doAction: at } = JetPlugins.hooks;
    function ct() {
        (this.rawName = ""),
            (this.name = ""),
            (this.comment = !1),
            (this.nodes = []),
            (this.attrs = {}),
            (this.enterKey = null),
            (this.inputType = null),
            (this.offsetOnFocus = 75),
            (this.path = []),
            (this.value = this.getReactive()),
            this.value.watch(this.onChange.bind(this)),
            (this.isRequired = !1),
            (this.calcValue = null),
            (this.reporting = null),
            (this.checker = null),
            (this.root = null),
            (this.loading = new O(!1)),
            this.loading.make(),
            (this.isResetCalcValue = !0),
            (this.validateTimer = !1),
            (this.stopValidation = !1),
            (this.abortController = null);
    }
    (ct.prototype.attrs = {}),
        (ct.prototype.isSupported = function (t) {
            return !1;
        }),
        (ct.prototype.addListeners = function () {
            const [t] = this.nodes;
            t.addEventListener("input", (t) => {
                this.value.current = t.target.value;
            }),
                t.addEventListener("blur", () => {}),
                t.addEventListener("input", () => {
                    this.reporting &&
                        "function" ==
                            typeof this.reporting.switchButtonsState &&
                        this.reporting.switchButtonsState(!0),
                        this.debouncedReport();
                }),
                !E &&
                    jQuery(t).on("change", (t) => {
                        this.value.current != t.target.value &&
                            (this.callable.lockTrigger(),
                            (this.value.current = t.target.value),
                            this.callable.unlockTrigger());
                    }),
                "input" === this.inputType &&
                    ((this.enterKey = new P()),
                    t.addEventListener(
                        "keydown",
                        this.handleEnterKey.bind(this)
                    ));
        }),
        (ct.prototype.makeReactive = function () {
            this.onObserve(),
                this.addListeners(),
                this.setValue(),
                this.initNotifyValue(),
                this.value.make(),
                at("jet.fb.input.makeReactive", this);
        }),
        (ct.prototype.onChange = function (t) {
            this.isResetCalcValue && (this.calcValue = this.value.current),
                this?.callable?.run(t),
                this.report();
        }),
        (ct.prototype.report = function () {
            this.reporting.validateOnChange();
        }),
        (ct.prototype.reportOnBlur = function (t = null) {
            this.reporting.validateOnBlur(t);
        }),
        (ct.prototype.debouncedReport = function () {
            this.validateTimer &&
                ((this.stopValidation = !0),
                clearTimeout(this.validateTimer),
                this.abortController && this.abortController.abort()),
                (this.abortController = new AbortController());
            let t = this.abortController.signal;
            this.validateTimer = setTimeout(() => {
                this.reportOnBlur(t);
            }, 450);
        }),
        (ct.prototype.watch = function (t) {
            return this.value.watch(t);
        }),
        (ct.prototype.watchValidity = function (t) {
            return this.reporting.validityState.watch(t);
        }),
        (ct.prototype.sanitize = function (t) {
            return this.value.sanitize(t);
        }),
        (ct.prototype.merge = function (t) {
            this.nodes = [...t.getNode()];
        }),
        (ct.prototype.setValue = function () {
            let t;
            (t = this.isArray()
                ? Array.from(this.nodes).map(({ value: t }) => t)
                : this.nodes[0]?.value),
                (this.calcValue = t),
                (this.value.current = t);
        }),
        (ct.prototype.setNode = function (t) {
            var e;
            (this.nodes = [t]),
                (this.rawName = null !== (e = t.name) && void 0 !== e ? e : ""),
                (this.name = It(this.rawName)),
                (this.inputType = t.nodeName.toLowerCase());
        }),
        (ct.prototype.onObserve = function () {
            const [t] = this.nodes;
            (t.jfbSync = this),
                (this.isRequired = this.checkIsRequired()),
                (this.callable = (function (t, e) {
                    Q.length || (Q = H("jet.fb.signals", [x, L, A]));
                    for (const n of Q) {
                        const i = new n();
                        if (i.isSupported(t, e)) return i;
                    }
                    return null;
                })(t, this)),
                this.callable.setInput(this),
                (this.reporting = (function (t) {
                    it.length || (it = nt("jet.fb.reporting", [U]));
                    for (const e of it) {
                        const n = new e();
                        if (n.isSupported(t.nodes[0], t))
                            return n.setInput(t), n;
                    }
                    throw new Error("Something went wrong");
                })(this)),
                this.loading.watch(() => this.onChangeLoading()),
                (this.path = [...this.getParentPath(), this.name]),
                this.getSubmit().submitter.hasOwnProperty("status") &&
                    !this.hasParent() &&
                    this.getSubmit().submitter.watchReset(() => this.onClear());
        }),
        (ct.prototype.onChangeLoading = function () {
            this.getSubmit().lockState.current = this.loading.current;
            const [t] = this.nodes;
            t.closest(".jet-form-builder-row").classList.toggle(
                "is-loading",
                this.loading.current
            );
        }),
        (ct.prototype.setRoot = function (t) {
            this.root = t;
        }),
        (ct.prototype.onRemove = function () {}),
        (ct.prototype.getName = function () {
            return this.name;
        }),
        (ct.prototype.getValue = function () {
            return this.value.current;
        }),
        (ct.prototype.getNode = function () {
            return this.nodes;
        }),
        (ct.prototype.isArray = function () {
            return this.rawName.includes("[]");
        }),
        (ct.prototype.beforeSubmit = function (t, e = !1) {
            this.getSubmit().submitter.promise(t, e);
        }),
        (ct.prototype.getSubmit = function () {
            return this.getRoot().form;
        }),
        (ct.prototype.getRoot = function () {
            return this.root?.parent ? this.root.parent.getRoot() : this.root;
        }),
        (ct.prototype.isVisible = function () {
            return v(this.getWrapperNode());
        }),
        (ct.prototype.onClear = function () {
            this.silenceSet(null);
        }),
        (ct.prototype.getReactive = function () {
            return new I();
        }),
        (ct.prototype.checkIsRequired = function () {
            var t;
            const [e] = this.nodes;
            return null !== (t = e.required) && void 0 !== t
                ? t
                : !!e.dataset.required?.length;
        }),
        (ct.prototype.silenceSet = function (t) {
            const e = this.report.bind(this);
            (this.report = () => {}),
                (this.value.current = t),
                (this.report = e);
        }),
        (ct.prototype.silenceNotify = function () {
            const t = this.report.bind(this);
            (this.report = () => {}), this.value.notify(), (this.report = t);
        }),
        (ct.prototype.hasParent = function () {
            return !!this.root?.parent;
        }),
        (ct.prototype.getWrapperNode = function () {
            return this.nodes[0].closest(".jet-form-builder-row");
        }),
        (ct.prototype.handleEnterKey = function (t) {
            "Enter" !== t.key ||
                !this.enterKey ||
                t.shiftKey ||
                t.isComposing ||
                (t.preventDefault(), this.onEnterKey());
        }),
        (ct.prototype.onEnterKey = function () {
            this.enterKey.applyFilters(!0) &&
                !0 === this.getSubmit().canTriggerEnterSubmit &&
                this.getSubmit().submit();
        }),
        (ct.prototype.initNotifyValue = function () {
            this.silenceNotify();
        }),
        (ct.prototype.onFocus = function () {
            this.scrollTo(), this.focusRaw();
        }),
        (ct.prototype.focusRaw = function () {
            const [t] = this.nodes;
            ["date", "time", "datetime-local"].includes(t.type) ||
                t?.focus({ preventScroll: !0 });
        }),
        (ct.prototype.scrollTo = function () {
            const t = this.getWrapperNode();
            window.scrollTo({
                top: w(t) - this.offsetOnFocus,
                behavior: "smooth",
            });
        }),
        (ct.prototype.getContext = function () {
            return this.root.getContext();
        }),
        (ct.prototype.populateInner = function () {
            return !1;
        }),
        (ct.prototype.hasAutoScroll = function () {
            return !0;
        }),
        (ct.prototype.getReportingNode = function () {
            return this.nodes[0];
        }),
        (ct.prototype.getParentPath = function () {
            if (!this.root?.parent) return [];
            const t = this.root.parent.value.current;
            if ("object" != typeof t) return [];
            for (const [e, n] of Object.entries(t))
                if (n === this.root)
                    return [
                        ...this.root.parent.getParentPath(),
                        this.root.parent.name,
                        e,
                    ];
            return [];
        }),
        (ct.prototype.reQueryValue = function () {
            this.setValue(), this.initNotifyValue();
        }),
        (ct.prototype.revertValue = function (t) {
            this.value.current = t;
        });
    const lt = ct;
    function ht() {
        lt.call(this),
            (this.isSupported = function (t) {
                return (function (t) {
                    return ["select-one", "range"].includes(t.type);
                })(t);
            }),
            (this.addListeners = function () {
                const [t] = this.nodes;
                t.addEventListener("change", (t) => {
                    this.value.current = t.target.value;
                }),
                    !E &&
                        jQuery(t).on("change", (t) => {
                            this.value.current != t.target.value &&
                                (this.callable.lockTrigger(),
                                (this.value.current = t.target.value),
                                this.callable.unlockTrigger());
                        }),
                    (this.enterKey = new P()),
                    t.addEventListener(
                        "keydown",
                        this.handleEnterKey.bind(this)
                    );
            }),
            (this.onClear = function () {
                this.silenceSet("");
            });
    }
    ht.prototype = Object.create(lt.prototype);
    const pt = ht;
    function ft() {
        lt.call(this),
            (this.numberNode = null),
            (this.isSupported = function (t) {
                return M(t);
            }),
            (this.setNode = function (t) {
                lt.prototype.setNode.call(this, t),
                    (this.numberNode = t.parentElement.querySelector(
                        ".jet-form-builder__field-value-number"
                    ));
            });
    }
    ft.prototype = Object.create(lt.prototype);
    const dt = ft;
    function gt() {
        lt.call(this),
            (this.comment = null),
            (this.isSupported = function (t) {
                return D(t);
            }),
            (this.addListeners = function () {}),
            (this.onObserve = function () {
                lt.prototype.onObserve.call(this),
                    this.isArray() && this.setComment();
            }),
            (this.setComment = function () {
                this.comment = document.createComment(this.name);
                const [t] = this.nodes;
                t.parentElement.insertBefore(this.comment, t);
            }),
            (this.isVisible = function () {
                return !1;
            }),
            (this.merge = function (t) {
                this.nodes.push(...t.getNode());
            });
    }
    gt.prototype = Object.create(lt.prototype);
    const mt = gt;
    function yt(t) {
        I.call(this, t);
    }
    (yt.prototype = Object.create(I.prototype)),
        (yt.prototype.add = function (t) {
            var e;
            this.current = [
                ...new Set([
                    ...(null !== (e = this.current) && void 0 !== e ? e : []),
                    t,
                ]),
            ];
        }),
        (yt.prototype.remove = function (t) {
            this.current = this.current.filter((e) => e !== t);
        }),
        (yt.prototype.toggle = function (t, e = null) {
            null === e
                ? this.current.includes(t)
                    ? this.remove(t)
                    : this.add(t)
                : e
                ? this.add(t)
                : this.remove(t);
        });
    const bt = yt,
        { builtInStates: vt } = window.JetFormBuilderSettings;
    function wt() {
        mt.call(this),
            (this.isSupported = function (t) {
                return (
                    "hidden" === t?.type &&
                    "_jfb_current_render_states[]" === t.name
                );
            }),
            (this.add = function (t) {
                this.value.add(t);
            }),
            (this.remove = function (t) {
                this.value.remove(t);
            }),
            (this.toggle = function (t, e = null) {
                this.value.toggle(t, e);
            }),
            (this.isCustom = function (t) {
                return !vt.includes(t);
            });
    }
    (wt.prototype = Object.create(mt.prototype)),
        (wt.prototype.getReactive = function () {
            return new bt();
        });
    const St = wt,
        { applyFilters: jt, doAction: Nt } = JetPlugins.hooks;
    let _t = [];
    function It(t) {
        const e = [/^([\w\-]+)\[\]$/, /^[\w\-]+\[\d+\]\[([\w\-]+)\]\[?\]?$/];
        for (const n of e) if (n.test(t)) return t.match(n)[1];
        return t;
    }
    function Ft(t) {
        const e = [];
        for (const n of t) {
            const t = n.populateInner();
            t?.length && e.push(...t), e.push(n);
        }
        return e;
    }
    function Ot(t) {
        (this.form = t), (this.lastResponse = {}), (this.promises = []);
    }
    (Ot.prototype.submit = function () {
        throw new Error("You need to replace this callback");
    }),
        (Ot.prototype.getPromises = function () {
            return this.promises.map(({ callable: t }) => new Promise(t));
        }),
        (Ot.prototype.promise = function (t, e = !1) {
            const n = e ? e.path.join(".") : "";
            (this.promises = this.promises.filter(
                ({ idPath: t }) => !t || t !== n
            )),
                this.promises.push({
                    callable: t,
                    idPath: e ? e.path.join(".") : "",
                });
        });
    const Rt = Ot;
    function Pt(t) {
        return "success" === t || t?.includes("dsuccess|");
    }
    function kt(t) {
        Rt.call(this, t),
            (this.status = new I()),
            this.status.make(),
            (this.submit = function () {
                const t = jQuery(this.form.observable.rootNode),
                    { applyFilters: e } = JetPlugins.hooks;
                Promise.all(
                    e("jet.fb.submit.ajax.promises", this.getPromises(), t)
                )
                    .then((t) => this.runSubmit(t))
                    .catch(() => this.form.toggle());
            }),
            (this.runSubmit = function (t) {
                const { rootNode: e } = this.form.observable,
                    n = new FormData(e);
                n.append("_jet_engine_booking_form_id", this.form.getFormId()),
                    this.status.silence(),
                    (this.status.current = null),
                    this.status.silence(),
                    jQuery
                        .ajax({
                            url: JetFormBuilderSettings.ajaxurl,
                            type: "POST",
                            dataType: "json",
                            data: n,
                            cache: !1,
                            contentType: !1,
                            processData: !1,
                        })
                        .done((n) => {
                            this.onSuccess(n);
                            const i = jQuery(e);
                            t.forEach((t) => {
                                "function" == typeof t && t.call(i, n);
                            });
                        })
                        .fail(this.onFail.bind(this));
            }),
            (this.onSuccess = function (t) {
                this.form.toggle();
                const { rootNode: e } = this.form.observable;
                this.lastResponse = t;
                const n = jQuery(e);
                "success" === t.status &&
                    jQuery(document).trigger(
                        "jet-form-builder/ajax/on-success",
                        [t, n]
                    ),
                    (this.status.current = t.status),
                    t.redirect
                        ? (window.location = t.redirect)
                        : t.reload && window.location.reload(),
                    this.insertMessage(t.message);
            }),
            (this.onFail = function (t, e, n) {
                this.form.toggle(),
                    (this.status.current = !1),
                    console.error(t.responseText, n);
            }),
            (this.insertMessage = function (t) {
                const { rootNode: e } = this.form.observable,
                    n = document.createElement("div");
                n.classList.add("jet-form-builder-messages-wrap"),
                    (n.innerHTML = t),
                    e.appendChild(n);
            });
    }
    (kt.prototype = Object.create(Rt.prototype)),
        (kt.prototype.status = null),
        (kt.prototype.watchReset = function (t) {
            const { rootNode: e } = this.form.observable;
            e.dataset?.clear && this.watchSuccess(t);
        }),
        (kt.prototype.watchSuccess = function (t) {
            const e = this.status;
            e.watch(() => {
                Pt(e.current) && t();
            });
        }),
        (kt.prototype.watchFail = function (t) {
            const e = this.status;
            e.watch(() => {
                Pt(e.current) || t();
            });
        });
    const Et = kt;
    function Ct(t) {
        Rt.call(this, t),
            (this.failPromises = []),
            (this.submit = function () {
                const { rootNode: t } = this.form.observable,
                    { applyFilters: e } = JetPlugins.hooks;
                Promise.all(
                    e("jet.fb.submit.reload.promises", this.getPromises(), {
                        target: t,
                    })
                )
                    .then(() => t.submit())
                    .catch(() => {
                        this.failPromises.forEach((t) => t()),
                            this.form.toggle();
                    });
            }),
            (this.onFailSubmit = function (t) {
                "function" == typeof t && this.failPromises.push(t);
            });
    }
    Ct.prototype = Object.create(Rt.prototype);
    const Tt = Ct,
        Dt = function (t) {
            (this.observable = t),
                (this.lockState = new O(!1)),
                this.lockState.make(),
                (this.autoFocus = window.JetFormBuilderSettings?.auto_focus),
                (this.canSubmitForm = !0),
                (this.canTriggerEnterSubmit = !0),
                (this.onSubmit = function (t) {
                    t.preventDefault(), this.submit();
                }),
                (this.submit = function () {
                    !0 === this.canSubmitForm &&
                        ((this.canSubmitForm = !1),
                        (this.canTriggerEnterSubmit = !1),
                        this.observable
                            .inputsAreValid()
                            .then(() => {
                                this.clearErrors(),
                                    this.toggle(),
                                    this.submitter.submit();
                            })
                            .catch(() => {
                                this.autoFocus &&
                                    N(Ft(this.observable.getInputs()));
                            })
                            .finally(() => {
                                (this.canTriggerEnterSubmit = !0),
                                    (this.canSubmitForm = !0);
                            }));
                }),
                (this.clearErrors = function () {
                    const t = this.observable.rootNode.querySelectorAll(
                        ".jet-form-builder-messages-wrap"
                    );
                    for (const e of t) e.remove();
                }),
                (this.toggle = function () {
                    this.lockState.toggle(), this.toggleLoading();
                }),
                (this.handleButtons = function () {
                    const t = this.observable.rootNode.querySelectorAll(
                        ".jet-form-builder__submit"
                    );
                    this.lockState.watch(() => {
                        for (const e of t) e.disabled = this.lockState.current;
                        !1 === this.lockState.current &&
                            (this.canSubmitForm = !0);
                    });
                }),
                (this.toggleLoading = function () {
                    this.observable.rootNode.classList.toggle("is-loading");
                }),
                (this.createSubmitter = function () {
                    const { classList: t } = this.observable.rootNode;
                    return t.contains("submit-type-ajax")
                        ? new Et(this)
                        : new Tt(this);
                }),
                (this.getFormId = function () {
                    const { rootNode: t } = this.observable;
                    return +t.dataset.formId;
                }),
                (this.onEndSubmit = function (t) {
                    this.submitter.hasOwnProperty("status")
                        ? this.submitter.status.watch(t)
                        : this.submitter.onFailSubmit(t);
                }),
                this.observable.rootNode.addEventListener("submit", (t) =>
                    this.onSubmit(t)
                ),
                (this.submitter = this.createSubmitter()),
                this.handleButtons();
        },
        Mt = function (t, e) {
            const { replaceAttrs: n = [] } = window.JetFormBuilderSettings,
                i = [];
            for (let t = 0; t < n.length; t++) i.push(`[${n[t]}*="${e}"]`);
            return t.querySelectorAll(i.join(", "));
        },
        Bt = function* (t, e = () => NodeFilter.FILTER_ACCEPT) {
            const n = document.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
                acceptNode: e,
            });
            let i;
            for (; (i = n.nextNode()); )
                (i.nodeValue = i.nodeValue.trim()), yield i;
        },
        At = function* (t) {
            yield* Bt(t, (t) => t.textContent.includes("JFB_FIELD::"));
        },
        Vt = function (t, e) {
            if (null === e || !e?.length) return t;
            for (const n of e) t = n.applyWithProps(t);
            return t;
        };
    function xt() {
        this.props = [];
    }
    (xt.prototype.getSlug = function () {
        throw new Error("getSlug is empty");
    }),
        (xt.prototype.setProps = function (t) {
            this.props.push(...t);
        }),
        (xt.prototype.applyWithProps = function (t) {
            return this.apply(t, ...this.props);
        }),
        (xt.prototype.apply = function (t, ...e) {
            return t;
        });
    const Jt = xt;
    function Lt() {
        Jt.call(this),
            (this.getSlug = function () {
                return "length";
            }),
            (this.apply = function (t) {
                var e;
                return null !== (e = t?.length) && void 0 !== e ? e : 0;
            });
    }
    Lt.prototype = Object.create(Jt.prototype);
    const Ht = Lt;
    function Qt() {
        Jt.call(this),
            (this.getSlug = function () {
                return "ifEmpty";
            }),
            (this.apply = function (t, e) {
                return b(t) ? t : e;
            });
    }
    Qt.prototype = Object.create(Jt.prototype);
    const Yt = Qt;
    function qt(t, e) {
        return (t = "" + t).length >= e
            ? t
            : new Array(e - t.length).fill(0) + t;
    }
    function Wt(t, e = !0) {
        const n = e ? t.getUTCMonth() : t.getMonth(),
            i = e ? t.getUTCDate() : t.getDate();
        return [
            e ? t.getUTCFullYear() : t.getFullYear(),
            qt(n + 1, 2),
            qt(i, 2),
        ].join("-");
    }
    function zt(t, e = !0) {
        const n = e ? t.getUTCHours() : t.getHours(),
            i = e ? t.getUTCMinutes() : t.getMinutes();
        return [qt(n, 2), qt(i, 2)].join(":");
    }
    function Kt(t) {
        return Wt(t, !1) + "T" + zt(t, !1);
    }
    function Ut(t) {
        if (!Number.isNaN(+t)) return { time: +t, type: "number" };
        if ((t = t.toString()).split("-").length > 1)
            return { time: new Date(t).getTime(), type: "date" };
        const e = t.split(":"),
            n = [
                Date.prototype.setHours,
                Date.prototype.setMinutes,
                Date.prototype.setSeconds,
            ],
            i = new Date();
        for (const t in e)
            e.hasOwnProperty(t) && n.hasOwnProperty(t) && n[t].call(i, e[t]);
        return { time: i.getTime(), type: "time" };
    }
    function $t() {
        Jt.call(this),
            (this.getSlug = function () {
                return "toDate";
            }),
            (this.apply = function (t) {
                return Wt(new Date(t));
            });
    }
    $t.prototype = Object.create(Jt.prototype);
    const Gt = $t;
    function Xt() {
        Jt.call(this),
            (this.getSlug = function () {
                return "toTime";
            }),
            (this.apply = function (t) {
                return zt(new Date(t));
            });
    }
    Xt.prototype = Object.create(Jt.prototype);
    const Zt = Xt;
    function te() {
        Jt.call(this),
            (this.getSlug = function () {
                return "toDateTime";
            }),
            (this.apply = function (t) {
                return Kt(new Date(t));
            });
    }
    te.prototype = Object.create(Jt.prototype);
    const ee = te;
    function ne() {
        Jt.call(this),
            (this.getSlug = function () {
                return "addYear";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1),
                      i.setFullYear(i.getFullYear() + e));
            });
    }
    ne.prototype = Object.create(Jt.prototype);
    const ie = ne;
    function re() {
        Jt.call(this),
            (this.getSlug = function () {
                return "addMonth";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1), i.setMonth(i.getMonth() + e));
            });
    }
    re.prototype = Object.create(Jt.prototype);
    const oe = re;
    function se() {
        Jt.call(this),
            (this.getSlug = function () {
                return "addDay";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1), i.setDate(i.getDate() + e));
            });
    }
    se.prototype = Object.create(Jt.prototype);
    const ue = se;
    function ae() {
        Jt.call(this),
            (this.getSlug = function () {
                return "addHour";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1), i.setHours(i.getHours() + e));
            });
    }
    ae.prototype = Object.create(Jt.prototype);
    const ce = ae;
    function le() {
        Jt.call(this),
            (this.getSlug = function () {
                return "addMin";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1),
                      i.setMinutes(i.getMinutes() + e));
            });
    }
    le.prototype = Object.create(Jt.prototype);
    const he = le;
    function pe() {
        Jt.call(this),
            (this.getSlug = function () {
                return "T";
            }),
            (this.apply = function (t) {
                if (!t) return 0;
                const { time: e } = Ut(t);
                return e;
            });
    }
    pe.prototype = Object.create(Jt.prototype);
    const fe = pe;
    function de() {
        Jt.call(this),
            (this.getSlug = function () {
                return "setHour";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? t
                    : ((e = e ? +e.trim() : 0), i.setHours(e));
            });
    }
    de.prototype = Object.create(Jt.prototype);
    const ge = de;
    function me() {
        Jt.call(this),
            (this.getSlug = function () {
                return "setMin";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? t
                    : ((e = e ? +e.trim() : 0), i.setMinutes(e));
            });
    }
    me.prototype = Object.create(Jt.prototype);
    const ye = me;
    function be() {
        Jt.call(this),
            (this.getSlug = function () {
                return "setDay";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1), i.setDate(e));
            });
    }
    be.prototype = Object.create(Jt.prototype);
    const ve = be;
    function we() {
        Jt.call(this),
            (this.getSlug = function () {
                return "setYear";
            }),
            (this.apply = function (t, e) {
                if (!(e = !!e && +e.trim())) return t;
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime()) ? 0 : i.setFullYear(e);
            });
    }
    we.prototype = Object.create(Jt.prototype);
    const Se = we;
    function je() {
        Jt.call(this),
            (this.getSlug = function () {
                return "setMonth";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1), i.setMonth(e));
            });
    }
    je.prototype = Object.create(Jt.prototype);
    const Ne = je;
    function _e() {
        Jt.call(this),
            (this.getSlug = function () {
                return "subHour";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1), i.setHours(i.getHours() - e));
            });
    }
    _e.prototype = Object.create(Jt.prototype);
    const Ie = _e;
    function Fe() {
        Jt.call(this),
            (this.getSlug = function () {
                return "subDay";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1), i.setDate(i.getDate() - e));
            });
    }
    Fe.prototype = Object.create(Jt.prototype);
    const Oe = Fe;
    function Re() {
        Jt.call(this),
            (this.getSlug = function () {
                return "subMin";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1),
                      i.setMinutes(i.getMinutes() - e));
            });
    }
    Re.prototype = Object.create(Jt.prototype);
    const Pe = Re;
    function ke() {
        Jt.call(this),
            (this.getSlug = function () {
                return "subMonth";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1), i.setMonth(i.getMonth() - e));
            });
    }
    ke.prototype = Object.create(Jt.prototype);
    const Ee = ke;
    function Ce() {
        Jt.call(this),
            (this.getSlug = function () {
                return "subYear";
            }),
            (this.apply = function (t, e) {
                const { time: n } = Ut(t),
                    i = new Date(n);
                return Number.isNaN(i.getTime())
                    ? 0
                    : ((e = e ? +e.trim() : 1),
                      i.setFullYear(i.getFullYear() - e));
            });
    }
    Ce.prototype = Object.create(Jt.prototype);
    const Te = Ce,
        { applyFilters: De } = JetPlugins.hooks;
    let Me = [];
    let Be = [];
    function Ae(t, e = "") {
        let n;
        Me.length ||
            (Me = De("jet.fb.filters", [
                Se,
                Ne,
                ve,
                ge,
                ye,
                Te,
                Ee,
                Oe,
                Ie,
                Pe,
                ie,
                oe,
                ue,
                ce,
                he,
                Ht,
                Yt,
                Gt,
                Zt,
                ee,
                fe,
            ]));
        for (let e of Me)
            if (((e = new e()), t === e.getSlug())) {
                n = e;
                break;
            }
        n &&
            ((e = e.split(",").map((t) => t.trim())),
            n.setProps(e),
            Be.push(n));
    }
    const Ve = function (t) {
        if (null === t || !t?.length) return null;
        for (const e of t) {
            const t = e.match(/^(\w+)\(([^()]+)\)/);
            null !== t ? Ae(t[1], t[2]) : Ae(e);
        }
        const e = [...Be];
        return (Be = []), e;
    };
    function xe() {}
    xe.prototype = {
        getId() {
            throw new Error("You need to rewrite this method");
        },
        getResult() {
            throw new Error("You need to rewrite this method");
        },
    };
    const Je = xe;
    function Le() {
        Je.call(this),
            (this.getId = () => "CurrentDate"),
            (this.getResult = () => new Date().getTime());
    }
    Le.prototype = Object.create(Je.prototype);
    const He = Le,
        Qe = {
            Milli_In_Sec: 1e3,
            Sec_In_Min: 60,
            Min_In_Hour: 60,
            Hour_In_Day: 24,
            Day_In_Month: 30,
            Year_In_Day: 365,
            Kb_In_Bytes: 1024,
        };
    (Qe.Min_In_Sec = Qe.Sec_In_Min * Qe.Milli_In_Sec),
        (Qe.Hour_In_Sec = Qe.Min_In_Hour * Qe.Min_In_Sec),
        (Qe.Day_In_Sec = Qe.Hour_In_Day * Qe.Hour_In_Sec),
        (Qe.Month_In_Sec = Qe.Day_In_Month * Qe.Day_In_Sec),
        (Qe.Year_In_Sec = Qe.Year_In_Day * Qe.Day_In_Sec),
        (Qe.Mb_In_Bytes = 1024 * Qe.Kb_In_Bytes),
        (Qe.Gb_In_Bytes = 1024 * Qe.Mb_In_Bytes),
        (Qe.Tb_In_Bytes = 1024 * Qe.Gb_In_Bytes);
    const Ye = Qe;
    function qe() {
        Je.call(this),
            (this.getId = () => "Min_In_Sec"),
            (this.getResult = () => Ye.Min_In_Sec);
    }
    qe.prototype = Object.create(Je.prototype);
    const We = qe;
    function ze() {
        Je.call(this),
            (this.getId = () => "Month_In_Sec"),
            (this.getResult = () => Ye.Month_In_Sec);
    }
    ze.prototype = Object.create(Je.prototype);
    const Ke = ze;
    function Ue() {
        Je.call(this),
            (this.getId = () => "Hour_In_Sec"),
            (this.getResult = () => Ye.Hour_In_Sec);
    }
    Ue.prototype = Object.create(Je.prototype);
    const $e = Ue;
    function Ge() {
        Je.call(this),
            (this.getId = () => "Day_In_Sec"),
            (this.getResult = () => Ye.Day_In_Sec);
    }
    Ge.prototype = Object.create(Je.prototype);
    const Xe = Ge;
    function Ze() {
        Je.call(this),
            (this.getId = () => "Year_In_Sec"),
            (this.getResult = () => Ye.Year_In_Sec);
    }
    Ze.prototype = Object.create(Je.prototype);
    const tn = Ze,
        { applyFilters: en } = JetPlugins.hooks;
    let nn = [];
    const rn = window.wp.i18n,
        { applyFilters: on, addFilter: sn } = JetPlugins.hooks;
    function un(t, e = {}) {
        var n;
        (this.parts = []),
            (this.related = []),
            (this.relatedAttrs = []),
            (this.regexp = /%([\w\-].*?\S?)%/g),
            (this.watchers = []);
        const { forceFunction: i = !1 } = e;
        (this.forceFunction = i),
            t instanceof lt && (this.input = t),
            (this.root =
                null !== (n = this.input?.root) && void 0 !== n ? n : t);
    }
    sn("jet.fb.custom.formula.macro", "jet-form-builder", function (t, e) {
        if (!e.includes("CT::")) return t;
        const n = (function (t) {
            nn.length ||
                (nn = en("jet.fb.static.functions", [He, We, Ke, $e, Xe, tn]));
            for (const e of nn) {
                const n = new e();
                if (n.getId() === t) return n;
            }
            return !1;
        })((e = e.replace("CT::", "")));
        return !1 === n ? t : n.getResult();
    }),
        (un.prototype = {
            formula: null,
            parts: [],
            related: [],
            relatedAttrs: [],
            input: null,
            root: null,
            regexp: null,
            forceFunction: !1,
            setResult: () => {
                throw new Error("CalculatedFormula.setResult is not set!");
            },
            relatedCallback: (t) => t.value.current,
            observe(t) {
                (this.formula = t),
                    Array.isArray(t)
                        ? t.forEach((t) => {
                              this.observeItem(t);
                          })
                        : this.observeItem(t);
            },
            observeItem(t) {
                let e,
                    n = 0;
                for (t += ""; null !== (e = this.regexp.exec(t)); ) {
                    const i = this.observeMacro(e[1]);
                    0 !== e.index && this.parts.push(t.slice(n, e.index)),
                        (n = e.index + e[0].length),
                        !1 === i
                            ? this.onMissingPart(e[0])
                            : this.parts.push(i);
                }
                n !== t.length &&
                    (this.parts.push(t.slice(n)),
                    1 === this.parts.length && (this.parts = []));
            },
            onMissingPart(t) {
                this.parts.push(t);
            },
            observeMacro(t) {
                null === this.formula && (this.formula = t);
                const [e, ...n] = t.split("|"),
                    i = e.match(/[\w\-:]+/g);
                if (!i) return !1;
                const [r, ...o] = i,
                    s = "this" !== r ? this.root.getInput(r) : this.input;
                if (!s && !r.includes("::")) return !1;
                const u = Ve(n);
                if (r.includes("::")) {
                    const t = on("jet.fb.custom.formula.macro", !1, r, o, this);
                    return (
                        !1 !== t &&
                        ("function" == typeof t ? () => Vt(t(), u) : Vt(t, u))
                    );
                }
                if (
                    (this.related.includes(s.name) ||
                        (this.related.push(s.name),
                        this.watchers.push(s.watch(() => this.setResult()))),
                    !o?.length)
                )
                    return () => Vt(this.relatedCallback(s), u);
                const [a] = o;
                if (!s.attrs.hasOwnProperty(a)) return !1;
                const c = s.attrs[a];
                return (
                    this.relatedAttrs.includes(s.name + a) ||
                        (this.relatedAttrs.push(s.name + a),
                        this.watchers.push(
                            c.value.watch(() => this.setResult())
                        )),
                    () => Vt(c.value.current, u)
                );
            },
            calculateString() {
                var t;
                if (!this.parts.length) return this.formula;
                const { applyFilters: e = !1 } =
                    null !== (t = window?.JetFormBuilderMain?.filters) &&
                    void 0 !== t
                        ? t
                        : {};
                return this.parts
                    .map((t) => {
                        if ("function" != typeof t)
                            return this.input?.nodes && !1 !== e
                                ? ((t = on("jet.fb.onCalculate.part", t, this)),
                                  e(
                                      "forms/calculated-formula-before-value",
                                      t,
                                      jQuery(this.input.nodes[0])
                                  ))
                                : t;
                        const n = t();
                        return null === n || "" === n || Number.isNaN(n)
                            ? this.emptyValue()
                            : n;
                    })
                    .join("");
            },
            emptyValue: () => "",
            calculate() {
                if (!this.parts.length && !this.forceFunction)
                    return this.formula;
                const t = this.calculateString();
                try {
                    return new Function("return " + t)();
                } catch (e) {
                    this.showError(t);
                }
            },
            clearWatchers() {
                this.watchers.forEach((t) => "function" == typeof t && t()),
                    (this.watchers = []),
                    (this.relatedAttrs = []),
                    (this.related = []);
            },
            showError(t) {
                console.group(
                    (0, rn.__)(
                        "JetFormBuilder: You have invalid calculated formula",
                        "jet-form-builder"
                    )
                ),
                    this.showErrorDetails(t),
                    console.groupEnd();
            },
            showErrorDetails(t) {
                if (
                    (console.error(
                        (0, rn.sprintf)(
                            (0, rn.__)("Initial: %s", "jet-form-builder"),
                            this.formula
                        )
                    ),
                    console.error(
                        (0, rn.sprintf)(
                            (0, rn.__)("Computed: %s", "jet-form-builder"),
                            t
                        )
                    ),
                    !this.input && !this.root?.parent)
                )
                    return;
                if (this.input)
                    return void console.error(
                        (0, rn.sprintf)(
                            (0, rn.__)("Field: %s", "jet-form-builder"),
                            this.input.path.join(".")
                        )
                    );
                const e = this.root.parent.findIndex(this.root);
                console.error(
                    (0, rn.sprintf)(
                        (0, rn.__)("Scope: %s", "jet-form-builder"),
                        [...this.root.parent.path, -1 === e ? "" : e]
                            .filter(Boolean)
                            .join(".")
                    )
                );
            },
        });
    const an = un,
        { applyFilters: cn } = JetPlugins.hooks;
    function ln(t, { withPrefix: e = !0, ...n } = {}) {
        an.call(this, t, n),
            e && (this.regexp = /JFB_FIELD::(.+)/gi),
            (this.relatedCallback = function (t) {
                let e = cn("jet.fb.macro.field.value", !1, jQuery(t.nodes[0]));
                return (
                    (e = wp?.hooks?.applyFilters
                        ? wp.hooks.applyFilters(
                              "jet.fb.macro.field.value",
                              e,
                              jQuery(t.nodes[0])
                          )
                        : e),
                    !1 === e ? t.value.current : e
                );
            }),
            (this.onMissingPart = function () {});
    }
    (ln.prototype = Object.create(an.prototype)),
        (ln.prototype.calculateString = function () {
            return this.parts.length
                ? this.parts
                      .map((t) => {
                          if ("function" != typeof t) return t;
                          const e = t();
                          return null === e || "" === e ? "" : e;
                      })
                      .join("")
                : this.formula;
        });
    const hn = ln,
        { __: pn, sprintf: fn } = wp.i18n,
        dn = function (t, e) {
            const n = new hn(e);
            if ((n.observe(t.textContent), !n.parts?.length))
                return (
                    console.group(
                        pn(
                            "JetFormBuilder: You have invalid html macro",
                            "jet-form-builder"
                        )
                    ),
                    console.error(
                        fn(pn("Content: %s", "jet-form-builder"), t.textContent)
                    ),
                    console.groupEnd(),
                    void n.clearWatchers()
                );
            const i = document.createElement("span"),
                r = t.parentNode.insertBefore(i, t);
            (n.setResult = () => {
                r.innerHTML = n.calculateString();
            }),
                n.setResult(),
                (t.jfbObserved = !0);
        },
        gn = function (t, e, n) {
            var i;
            const r = null !== (i = t[e]) && void 0 !== i ? i : "";
            if ("string" != typeof r) return null;
            const o = new hn(n);
            o.observe(r),
                (o.setResult = () => {
                    t[e] = o.calculateString();
                }),
                o.setResult();
        },
        mn = function (t, e) {
            const n = new hn(e, { withPrefix: !1 });
            if ((n.observe(`%${t.dataset.jfbMacro}%`), !n.parts?.length))
                return (
                    console.group(
                        (0, rn.__)(
                            "JetFormBuilder: You have invalid html macro",
                            "jet-form-builder"
                        )
                    ),
                    console.error(
                        (0, rn.sprintf)(
                            (0, rn.__)("Content: %s", "jet-form-builder"),
                            t.dataset.jfbMacro
                        )
                    ),
                    console.groupEnd(),
                    void n.clearWatchers()
                );
            (t.dataset.jfbObserved = 1),
                (n.setResult = () => {
                    t.innerHTML = n.calculateString();
                }),
                n.setResult();
        };
    function yn(t) {
        (this.root = t), (this.reportedFirst = !1), (this.silence = !0);
    }
    yn.prototype = {
        reset(t = {}) {
            var e;
            (this.reportedFirst = !1),
                this.setSilence(null === (e = t?.silence) || void 0 === e || e);
        },
        reportFirst() {
            this.reportedFirst = !0;
        },
        setSilence(t) {
            this.silence = !!t;
        },
    };
    const bn = yn,
        { doAction: vn } = JetPlugins.hooks;
    function wn(t = null) {
        (this.parent = t),
            (this.dataInputs = {}),
            (this.form = null),
            (this.multistep = null),
            (this.rootNode = null),
            (this.isObserved = !1),
            (this.context = this.parent ? null : new bn(this));
    }
    wn.prototype = {
        parent: null,
        dataInputs: {},
        form: null,
        multistep: null,
        rootNode: null,
        isObserved: !1,
        value: null,
        observe(t = null) {
            this.isObserved ||
                (null !== t && (this.rootNode = t),
                (this.isObserved = !0),
                vn("jet.fb.observe.before", this),
                this.initSubmitHandler(),
                this.initFields(),
                this.makeReactiveProxy(),
                this.initMacros(),
                this.initActionButtons(),
                this.initValue(),
                vn("jet.fb.observe.after", this));
        },
        initFields() {
            for (const t of this.rootNode.querySelectorAll("[data-jfb-sync]"))
                this.pushInput(t);
        },
        initMacros() {
            for (const t of At(this.rootNode)) dn(t, this);
            const t = Mt(this.rootNode, "JFB_FIELD::"),
                { replaceAttrs: e = [] } = window.JetFormBuilderSettings;
            for (const n of t) for (const t of e) gn(n, t, this);
            const n = this.rootNode.querySelectorAll(
                "[data-jfb-macro]:not([data-jfb-observed])"
            );
            for (const t of n) mn(t, this);
        },
        initSubmitHandler() {
            this.parent || (this.form = new Dt(this));
        },
        initActionButtons() {
            if (!this.parent)
                for (const t of this.rootNode.querySelectorAll(
                    ".jet-form-builder__button-switch-state"
                )) {
                    let e;
                    try {
                        e = JSON.parse(t.dataset.switchOn);
                    } catch (t) {
                        continue;
                    }
                    t.addEventListener("click", () => {
                        this.getState().value.current = e;
                    });
                }
        },
        async inputsAreValid() {
            const t = await ut(Ft(this.getInputs()));
            return Boolean(t.length) ? Promise.reject(t) : Promise.resolve();
        },
        watch(t, e) {
            const n = this.getInput(t);
            if (n) return n.watch(e);
            throw new Error(`dataInputs in Observable don't have ${t} field`);
        },
        observeInput(t, e = !1) {
            const n = this.pushInput(t, e);
            n.makeReactive(), vn("jet.fb.observe.input.manual", n);
        },
        makeReactiveProxy() {
            for (const t of this.getInputs()) t.makeReactive();
        },
        pushInput(t, e = !1) {
            var n;
            if (
                !this.parent &&
                t.parentElement.closest(".jet-form-builder-repeater")
            )
                return;
            const i = (function (t, e) {
                    _t.length || (_t = jt("jet.fb.inputs", [St, dt, pt, mt]));
                    for (const n of _t) {
                        const i = new n();
                        if (i.isSupported(t))
                            return (
                                i.setRoot(e),
                                i.setNode(t),
                                y(i),
                                Nt("jet.fb.input.created", i),
                                i
                            );
                    }
                    throw new Error("Something went wrong");
                })(t, this),
                r =
                    null !== (n = this.dataInputs[i.getName()]) &&
                    void 0 !== n &&
                    n;
            return !1 === r || e
                ? ((this.dataInputs[i.getName()] = i), i)
                : (r.merge(i), r);
        },
        getInputs() {
            return Object.values(this.dataInputs);
        },
        getState() {
            return this.getInput("_jfb_current_render_states");
        },
        getInput(t) {
            var e;
            if (this.dataInputs.hasOwnProperty(t)) return this.dataInputs[t];
            const n =
                null !== (e = this.parent?.root) && void 0 !== e ? e : null;
            return n && n.dataInputs.hasOwnProperty(t) ? n.dataInputs[t] : null;
        },
        getSubmit() {
            return this.form ? this.form : this.parent.root.form;
        },
        getContext() {
            var t;
            return null !== (t = this.context) && void 0 !== t
                ? t
                : this.parent.root.context;
        },
        remove() {
            for (const t of this.getInputs()) t.onRemove();
        },
        reQueryValues() {
            for (const t of this.getInputs()) t.reQueryValue();
        },
        initValue() {
            (this.value = new I({})),
                this.value.watch(() => {
                    const t = Object.entries(this.value.current);
                    for (const [e, n] of t) this.getInput(e).revertValue(n);
                });
            for (const t of this.getInputs())
                t.watch(() => {
                    this.value.current[t.getName()] = t.getValue();
                });
            this.value.make();
        },
    };
    const Sn = wn;
    var jn;
    window.JetFormBuilder =
        null !== (jn = window.JetFormBuilder) && void 0 !== jn ? jn : {};
    const Nn = function (t) {
        const e = t[0].querySelector("form.jet-form-builder");
        if (!e) return;
        const n = new Sn();
        (window.JetFormBuilder[e.dataset.formId] = n),
            jQuery(document).trigger("jet-form-builder/init", [t, n]),
            n.observe(e),
            jQuery(document).trigger("jet-form-builder/after-init", [t, n]);
    };
    var _n, In, Fn, On, Rn;
    (window.JetFormBuilderAbstract = {
        ...(null !== (_n = window.JetFormBuilderAbstract) && void 0 !== _n
            ? _n
            : {}),
        Filter: Jt,
        CalculatedFormula: an,
        BaseInternalMacro: Je,
    }),
        (window.JetFormBuilderFunctions = {
            ...(null !== (In = window.JetFormBuilderFunctions) && void 0 !== In
                ? In
                : {}),
            getFilters: Ve,
            applyFilters: Vt,
            toDate: Wt,
            toDateTime: Kt,
            toTime: zt,
            getTimestamp: Ut,
        }),
        (window.JetFormBuilderConst = {
            ...(null !== (Fn = window.JetFormBuilderConst) && void 0 !== Fn
                ? Fn
                : {}),
            ...Ye,
        }),
        (window.JetFormBuilderAbstract = {
            ...(null !== (On = window.JetFormBuilderAbstract) && void 0 !== On
                ? On
                : {}),
            InputData: lt,
            BaseSignal: T,
            ReactiveVar: I,
            ReactiveHook: P,
            LoadingReactiveVar: O,
            Observable: Sn,
            ReportingInterface: z,
            Restriction: G,
            RestrictionError: q,
            BaseHtmlAttr: e,
            ReactiveSet: bt,
            RequiredRestriction: et,
        }),
        (window.JetFormBuilderFunctions = {
            ...(null !== (Rn = window.JetFormBuilderFunctions) && void 0 !== Rn
                ? Rn
                : {}),
            allRejected: f,
            getLanguage: function () {
                const t = window?.navigator?.languages?.length
                    ? window.navigator.languages[0]
                    : window?.navigator?.language;
                return null != t ? t : "en-US";
            },
            toHTML: function (t) {
                const e = document.createElement("template");
                return (e.innerHTML = t.trim()), e.content;
            },
            validateInputs: function (t, e = !1) {
                return Promise.all(st(t, e).map((t) => new Promise(t)));
            },
            validateInputsAll: ut,
            getParsedName: It,
            isEmpty: b,
            getValidateCallbacks: st,
            getOffsetTop: w,
            focusOnInvalidInput: N,
            populateInputs: Ft,
            isVisible: v,
            queryByAttrValue: Mt,
            iterateComments: Bt,
            observeMacroAttr: gn,
            observeComment: dn,
            iterateJfbComments: At,
            getScrollParent: j,
            isUA: function (t) {
                return h?.[t];
            },
        }),
        document.addEventListener("DOMContentLoaded", function () {
            for (const [t, e] of Object.entries(h))
                e && document.body.classList.add(`jet--ua-${t}`);
        }),
        jQuery(() => JetPlugins.init()),
        JetPlugins.bulkBlocksInit([
            {
                block: "jet-forms.form-block",
                callback: Nn,
                condition: () => "loading" !== document.readyState,
            },
        ]),
        jQuery(window).on("elementor/frontend/init", function () {
            if (!window.elementorFrontend) return;
            const t = {
                "jet-engine-booking-form.default": Nn,
                "jet-form-builder-form.default": Nn,
            };
            jQuery.each(t, function (t, e) {
                window.elementorFrontend.hooks.addAction(
                    "frontend/element_ready/" + t,
                    e
                );
            });
        }),
        addEventListener("load", () => {
            const t = Object.values(window.JetFormBuilder);
            for (const e of t) e instanceof Sn && e.reQueryValues();
        });
})();
