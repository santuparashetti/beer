var slimselect = `! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.SlimSelect = t() : e.SlimSelect = t()
}(window, function() {
    return function(i) {
        var n = {};

        function s(e) {
            if (n[e]) return n[e].exports;
            var t = n[e] = {
                i: e,
                l: !1,
                exports: {}
            };
            return i[e].call(t.exports, t, t.exports, s), t.l = !0, t.exports
        }
        return s.m = i, s.c = n, s.d = function(e, t, i) {
            s.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }, s.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, s.t = function(t, e) {
            if (1 & e && (t = s(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (s.r(i), Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var n in t) s.d(i, n, function(e) {
                    return t[e]
                }.bind(null, n));
            return i
        }, s.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return s.d(t, "a", t), t
        }, s.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, s.p = "", s(s.s = 2)
    }([function(e, t, i) {
        "use strict";
        t.__esModule = !0, t.hasClassInTree = function(e, t) {
                function n(e, t) {
                    return t && e && e.classList && e.classList.contains(t) ? e : null
                }
                return n(e, t) || function e(t, i) {
                    return t && t !== document ? n(t, i) ? t : e(t.parentNode, i) : null
                }(e, t)
            }, t.ensureElementInView = function(e, t) {
                var i = e.scrollTop + e.offsetTop,
                    n = i + e.clientHeight,
                    s = t.offsetTop,
                    a = s + t.clientHeight;
                s < i ? e.scrollTop -= i - s : n < a && (e.scrollTop += a - n)
            }, t.putContent = function(e, t, i) {
                var n = e.offsetHeight,
                    s = e.getBoundingClientRect(),
                    a = i ? s.top : s.top - n,
                    l = i ? s.bottom : s.bottom + n;
                return a <= 0 ? "below" : l >= window.innerHeight ? "above" : i ? t : "below"
            }, t.debounce = function(s, a, l) {
                var o;
                return void 0 === a && (a = 100), void 0 === l && (l = !1),
                    function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        var i = self,
                            n = l && !o;
                        clearTimeout(o), o = setTimeout(function() {
                            o = null, l || s.apply(i, e)
                        }, a), n && s.apply(i, e)
                    }
            }, t.isValueInArrayOfObjects = function(e, t, i) {
                if (!Array.isArray(e)) return e[t] === i;
                for (var n = 0, s = e; n < s.length; n++) {
                    var a = s[n];
                    if (a && a[t] && a[t] === i) return !0
                }
                return !1
            }, t.highlight = function(e, t, i) {
                var n = e,
                    s = new RegExp("(" + t.trim() + ")(?![^<]*>[^<>]*</)", "i");
                if (!e.match(s)) return e;
                var a = e.match(s).index,
                    l = a + e.match(s)[0].toString().length,
                    o = e.substring(a, l);
                return n = n.replace(s, '<mark class="' + i + '">' + o + "</mark>")
            },
            function() {
                var e = window;

                function t(e, t) {
                    t = t || {
                        bubbles: !1,
                        cancelable: !1,
                        detail: void 0
                    };
                    var i = document.createEvent("CustomEvent");
                    return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
                }
                "function" != typeof e.CustomEvent && (t.prototype = e.Event.prototype, e.CustomEvent = t)
            }()
    }, function(e, t, i) {
        "use strict";
        t.__esModule = !0;
        var n = function() {
            function e(e) {
                this.contentOpen = !1, this.contentPosition = "below", this.isOnChangeEnabled = !0, this.main = e.main, this.searchValue = "", this.data = [], this.filtered = null, this.parseSelectData(), this.setSelectedFromSelect()
            }
            return e.prototype.newOption = function(e) {
                return {
                    id: e.id ? e.id : String(Math.floor(1e8 * Math.random())),
                    value: e.value ? e.value : "",
                    text: e.text ? e.text : "",
                    innerHTML: e.innerHTML ? e.innerHTML : "",
                    selected: !!e.selected && e.selected,
                    display: void 0 === e.display || e.display,
                    disabled: !!e.disabled && e.disabled,
                    placeholder: !!e.placeholder && e.placeholder,
                    class: e.class ? e.class : void 0,
                    data: e.data ? e.data : {}
                }
            }, e.prototype.add = function(e) {
                this.data.push({
                    id: String(Math.floor(1e8 * Math.random())),
                    value: e.value,
                    text: e.text,
                    innerHTML: "",
                    selected: !1,
                    display: !0,
                    disabled: !1,
                    placeholder: !1,
                    class: void 0,
                    data: {}
                })
            }, e.prototype.parseSelectData = function() {
                this.data = [];
                for (var e = 0, t = this.main.select.element.childNodes; e < t.length; e++) {
                    var i = t[e];
                    if ("OPTGROUP" === i.nodeName) {
                        for (var n = {
                                label: i.label,
                                options: []
                            }, s = 0, a = i.childNodes; s < a.length; s++) {
                            var l = a[s];
                            if ("OPTION" === l.nodeName) {
                                var o = this.pullOptionData(l);
                                n.options.push(o), o.placeholder && "" !== o.text.trim() && (this.main.config.placeholderText = o.text)
                            }
                        }
                        this.data.push(n)
                    } else if ("OPTION" === i.nodeName) {
                        o = this.pullOptionData(i);
                        this.data.push(o), o.placeholder && "" !== o.text.trim() && (this.main.config.placeholderText = o.text)
                    }
                }
            }, e.prototype.pullOptionData = function(e) {
                return {
                    id: !!e.dataset && e.dataset.id || String(Math.floor(1e8 * Math.random())),
                    value: e.value,
                    text: e.text,
                    innerHTML: e.innerHTML,
                    selected: e.selected,
                    disabled: e.disabled,
                    placeholder: "true" === e.dataset.placeholder,
                    class: e.className,
                    data: e.dataset
                }
            }, e.prototype.setSelectedFromSelect = function() {
                if (this.main.config.isMultiple) {
                    for (var e = [], t = 0, i = a = this.main.select.element.options; t < i.length; t++) {
                        var n = i[t];
                        if (n.selected) {
                            var s = this.getObjectFromData(n.value, "value");
                            s && s.id && e.push(s.id)
                        }
                    }
                    this.setSelected(e, "id")
                } else {
                    var a;
                    if (-1 !== (a = this.main.select.element.options).selectedIndex) {
                        var l = a[a.selectedIndex].value;
                        this.setSelected(l, "value")
                    }
                }
            }, e.prototype.setSelected = function(e, t) {
                void 0 === t && (t = "id");
                for (var i = 0, n = this.data; i < n.length; i++) {
                    var s = n[i];
                    if (s.hasOwnProperty("label")) {
                        if (s.hasOwnProperty("options")) {
                            var a = s.options;
                            if (a)
                                for (var l = 0, o = a; l < o.length; l++) {
                                    var r = o[l];
                                    r.placeholder || (r.selected = this.shouldBeSelected(r, e, t))
                                }
                        }
                    } else s.selected = this.shouldBeSelected(s, e, t)
                }
            }, e.prototype.shouldBeSelected = function(e, t, i) {
                if (void 0 === i && (i = "id"), Array.isArray(t))
                    for (var n = 0, s = t; n < s.length; n++) {
                        var a = s[n];
                        if (i in e && String(e[i]) === String(a)) return !0
                    } else if (i in e && String(e[i]) === String(t)) return !0;
                return !1
            }, e.prototype.getSelected = function() {
                for (var e = {
                        text: ""
                    }, t = [], i = 0, n = this.data; i < n.length; i++) {
                    var s = n[i];
                    if (s.hasOwnProperty("label")) {
                        if (s.hasOwnProperty("options")) {
                            var a = s.options;
                            if (a)
                                for (var l = 0, o = a; l < o.length; l++) {
                                    var r = o[l];
                                    r.selected && (this.main.config.isMultiple ? t.push(r) : e = r)
                                }
                        }
                    } else s.selected && (this.main.config.isMultiple ? t.push(s) : e = s)
                }
                return this.main.config.isMultiple ? t : e
            }, e.prototype.addToSelected = function(e, t) {
                if (void 0 === t && (t = "id"), this.main.config.isMultiple) {
                    var i = [],
                        n = this.getSelected();
                    if (Array.isArray(n))
                        for (var s = 0, a = n; s < a.length; s++) {
                            var l = a[s];
                            i.push(l[t])
                        }
                    i.push(e), this.setSelected(i, t)
                }
            }, e.prototype.removeFromSelected = function(e, t) {
                if (void 0 === t && (t = "id"), this.main.config.isMultiple) {
                    for (var i = [], n = 0, s = this.getSelected(); n < s.length; n++) {
                        var a = s[n];
                        String(a[t]) !== String(e) && i.push(a[t])
                    }
                    this.setSelected(i, t)
                }
            }, e.prototype.onDataChange = function() {
                this.main.onChange && this.isOnChangeEnabled && this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))
            }, e.prototype.getObjectFromData = function(e, t) {
                void 0 === t && (t = "id");
                for (var i = 0, n = this.data; i < n.length; i++) {
                    var s = n[i];
                    if (t in s && String(s[t]) === String(e)) return s;
                    if (s.hasOwnProperty("options")) {
                        var a = s;
                        if (a.options)
                            for (var l = 0, o = a.options; l < o.length; l++) {
                                var r = o[l];
                                if (String(r[t]) === String(e)) return r
                            }
                    }
                }
                return null
            }, e.prototype.search = function(s) {
                if ("" !== (this.searchValue = s).trim()) {
                    var a = this.main.config.searchFilter,
                        e = this.data.slice(0);
                    s = s.trim();
                    var t = e.map(function(e) {
                        if (e.hasOwnProperty("options")) {
                            var t = e,
                                i = [];
                            if (t.options && (i = t.options.filter(function(e) {
                                    return a(e, s)
                                })), 0 !== i.length) {
                                var n = Object.assign({}, t);
                                return n.options = i, n
                            }
                        }
                        if (e.hasOwnProperty("text") && a(e, s)) return e;
                        return null
                    });
                    this.filtered = t.filter(function(e) {
                        return e
                    })
                } else this.filtered = null
            }, e
        }();

        function r(e) {
            return void 0 !== e.text || (console.error("Data object option must have at least have a text value. Check object: " + JSON.stringify(e)), !1)
        }
        t.Data = n, t.validateData = function(e) {
            if (!e) return console.error("Data must be an array of objects"), !1;
            for (var t = 0, i = 0, n = e; i < n.length; i++) {
                var s = n[i];
                if (s.hasOwnProperty("label")) {
                    if (s.hasOwnProperty("options")) {
                        var a = s.options;
                        if (a)
                            for (var l = 0, o = a; l < o.length; l++) r(o[l]) || t++
                    }
                } else r(s) || t++
            }
            return 0 === t
        }, t.validateOption = r
    }, function(e, t, i) {
        "use strict";
        t.__esModule = !0;
        var n = i(3),
            s = i(4),
            a = i(5),
            l = i(1),
            o = i(0),
            r = function() {
                function e(e) {
                    var t = this;
                    this.ajax = null, this.addable = null, this.beforeOnChange = null, this.onChange = null, this.beforeOpen = null, this.afterOpen = null, this.beforeClose = null, this.afterClose = null;
                    var i = this.validate(e);
                    i.dataset.ssid && this.destroy(i.dataset.ssid), e.ajax && (this.ajax = e.ajax), e.addable && (this.addable = e.addable), this.config = new n.Config({
                        select: i,
                        isAjax: !!e.ajax,
                        showSearch: e.showSearch,
                        searchPlaceholder: e.searchPlaceholder,
                        searchText: e.searchText,
                        searchingText: e.searchingText,
                        searchHighlight: e.searchHighlight,
                        searchFilter: e.searchFilter,
                        closeOnSelect: e.closeOnSelect,
                        showContent: e.showContent,
                        placeholderText: e.placeholder,
                        allowDeselect: e.allowDeselect,
                        deselectLabel: e.deselectLabel,
                        isEnabled: e.isEnabled,
                        valuesUseText: e.valuesUseText,
                        showOptionTooltips: e.showOptionTooltips,
                        selectByGroup: e.selectByGroup,
                        limit: e.limit
                    }), this.select = new s.Select({
                        select: i,
                        main: this
                    }), this.data = new l.Data({
                        main: this
                    }), this.slim = new a.Slim({
                        main: this
                    }), this.select.element.parentNode && this.select.element.parentNode.insertBefore(this.slim.container, this.select.element.nextSibling), e.data ? this.setData(e.data) : this.render(), document.addEventListener("click", function(e) {
                        e.target && !o.hasClassInTree(e.target, t.config.id) && t.close()
                    }), window.addEventListener("scroll", o.debounce(function(e) {
                        t.data.contentOpen && "auto" === t.config.showContent && ("above" === o.putContent(t.slim.content, t.data.contentPosition, t.data.contentOpen) ? t.moveContentAbove() : t.moveContentBelow())
                    }), !1), e.beforeOnChange && (this.beforeOnChange = e.beforeOnChange), e.onChange && (this.onChange = e.onChange), e.beforeOpen && (this.beforeOpen = e.beforeOpen), e.afterOpen && (this.afterOpen = e.afterOpen), e.beforeClose && (this.beforeClose = e.beforeClose), e.afterClose && (this.afterClose = e.afterClose), this.config.isEnabled || this.disable()
                }
                return e.prototype.validate = function(e) {
                    var t = "string" == typeof e.select ? document.querySelector(e.select) : e.select;
                    if (!t) throw new Error("Could not find select element");
                    if ("SELECT" !== t.tagName) throw new Error("Element isnt of type select");
                    return t
                }, e.prototype.selected = function() {
                    if (this.config.isMultiple) {
                        for (var e = [], t = 0, i = s = this.data.getSelected(); t < i.length; t++) {
                            var n = i[t];
                            e.push(n.value)
                        }
                        return e
                    }
                    var s;
                    return (s = this.data.getSelected()) ? s.value : ""
                }, e.prototype.set = function(e, t, i, n) {
                    void 0 === t && (t = "value"), void 0 === i && (i = !0), void 0 === n && (n = !0), this.config.isMultiple && !Array.isArray(e) ? this.data.addToSelected(e, t) : this.data.setSelected(e, t), this.select.setValue(), this.data.onDataChange(), this.render(), i && this.close()
                }, e.prototype.setSelected = function(e, t, i, n) {
                    void 0 === t && (t = "value"), void 0 === i && (i = !0), void 0 === n && (n = !0), this.set(e, t, i, n)
                }, e.prototype.setData = function(e) {
                    if (l.validateData(e)) {
                        var t = JSON.parse(JSON.stringify(e)),
                            i = this.data.getSelected();
                        if (this.config.isAjax && i)
                            if (this.config.isMultiple)
                                for (var n = 0, s = i.reverse(); n < s.length; n++) {
                                    var a = s[n];
                                    t.unshift(a)
                                } else t.unshift(this.data.getSelected()), t.unshift({
                                    text: "",
                                    placeholder: !0
                                });
                        this.select.create(t), this.data.parseSelectData(), this.data.setSelectedFromSelect()
                    } else console.error("Validation problem on: #" + this.select.element.id)
                }, e.prototype.addData = function(e) {
                    l.validateData([e]) ? (this.data.add(this.data.newOption(e)), this.select.create(this.data.data), this.data.parseSelectData(), this.data.setSelectedFromSelect(), this.render()) : console.error("Validation problem on: #" + this.select.element.id)
                }, e.prototype.open = function() {
                    var e = this;
                    if (this.config.isEnabled && !this.data.contentOpen) {
                        if (this.slim.search.input.focus(), this.beforeOpen && this.beforeOpen(), this.config.isMultiple && this.slim.multiSelected ? this.slim.multiSelected.plus.classList.add("ss-cross") : this.slim.singleSelected && (this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-down"), this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-up")), this.slim[this.config.isMultiple ? "multiSelected" : "singleSelected"].container.classList.add("above" === this.data.contentPosition ? this.config.openAbove : this.config.openBelow), this.slim.content.classList.add(this.config.open), "up" === this.config.showContent.toLowerCase() ? this.moveContentAbove() : "down" === this.config.showContent.toLowerCase() ? this.moveContentBelow() : "above" === o.putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) ? this.moveContentAbove() : this.moveContentBelow(), !this.config.isMultiple) {
                            var t = this.data.getSelected();
                            if (t) {
                                var i = t.id,
                                    n = this.slim.list.querySelector('[data-id="' + i + '"]');
                                n && o.ensureElementInView(this.slim.list, n)
                            }
                        }
                        setTimeout(function() {
                            e.data.contentOpen = !0, e.afterOpen && e.afterOpen()
                        }, 300)
                    }
                }, e.prototype.close = function() {
                    var e = this;
                    this.data.contentOpen && (this.beforeClose && this.beforeClose(), this.config.isMultiple && this.slim.multiSelected ? (this.slim.multiSelected.container.classList.remove(this.config.openAbove), this.slim.multiSelected.container.classList.remove(this.config.openBelow), this.slim.multiSelected.plus.classList.remove("ss-cross")) : this.slim.singleSelected && (this.slim.singleSelected.container.classList.remove(this.config.openAbove), this.slim.singleSelected.container.classList.remove(this.config.openBelow), this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-down"), this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-up")), this.slim.content.classList.remove(this.config.open), this.data.contentOpen = !1, this.search(""), setTimeout(function() {
                        e.slim.content.removeAttribute("style"), e.data.contentPosition = "below", e.config.isMultiple && e.slim.multiSelected ? (e.slim.multiSelected.container.classList.remove(e.config.openAbove), e.slim.multiSelected.container.classList.remove(e.config.openBelow)) : e.slim.singleSelected && (e.slim.singleSelected.container.classList.remove(e.config.openAbove), e.slim.singleSelected.container.classList.remove(e.config.openBelow)), e.slim.search.input.blur(), e.afterClose && e.afterClose()
                    }, 300))
                }, e.prototype.moveContentAbove = function() {
                    var e = 0;
                    this.config.isMultiple && this.slim.multiSelected ? e = this.slim.multiSelected.container.offsetHeight : this.slim.singleSelected && (e = this.slim.singleSelected.container.offsetHeight);
                    var t = e + this.slim.content.offsetHeight - 1;
                    this.slim.content.style.margin = "-" + t + "px 0 0 0", this.slim.content.style.height = t - e + 1 + "px", this.slim.content.style.transformOrigin = "center bottom", this.data.contentPosition = "above", this.config.isMultiple && this.slim.multiSelected ? (this.slim.multiSelected.container.classList.remove(this.config.openBelow), this.slim.multiSelected.container.classList.add(this.config.openAbove)) : this.slim.singleSelected && (this.slim.singleSelected.container.classList.remove(this.config.openBelow), this.slim.singleSelected.container.classList.add(this.config.openAbove))
                }, e.prototype.moveContentBelow = function() {
                    this.slim.content.removeAttribute("style"), this.data.contentPosition = "below", this.config.isMultiple && this.slim.multiSelected ? (this.slim.multiSelected.container.classList.remove(this.config.openAbove), this.slim.multiSelected.container.classList.add(this.config.openBelow)) : this.slim.singleSelected && (this.slim.singleSelected.container.classList.remove(this.config.openAbove), this.slim.singleSelected.container.classList.add(this.config.openBelow))
                }, e.prototype.enable = function() {
                    this.config.isEnabled = !0, this.config.isMultiple && this.slim.multiSelected ? this.slim.multiSelected.container.classList.remove(this.config.disabled) : this.slim.singleSelected && this.slim.singleSelected.container.classList.remove(this.config.disabled), this.select.triggerMutationObserver = !1, this.select.element.disabled = !1, this.slim.search.input.disabled = !1, this.select.triggerMutationObserver = !0
                }, e.prototype.disable = function() {
                    this.config.isEnabled = !1, this.config.isMultiple && this.slim.multiSelected ? this.slim.multiSelected.container.classList.add(this.config.disabled) : this.slim.singleSelected && this.slim.singleSelected.container.classList.add(this.config.disabled), this.select.triggerMutationObserver = !1, this.select.element.disabled = !0, this.slim.search.input.disabled = !0, this.select.triggerMutationObserver = !0
                }, e.prototype.search = function(t) {
                    if (this.data.searchValue !== t)
                        if (this.slim.search.input.value = t, this.config.isAjax) {
                            var i = this;
                            this.config.isSearching = !0, this.render(), this.ajax && this.ajax(t, function(e) {
                                i.config.isSearching = !1, Array.isArray(e) ? (e.unshift({
                                    text: "",
                                    placeholder: !0
                                }), i.setData(e), i.data.search(t), i.render()) : "string" == typeof e ? i.slim.options(e) : i.render()
                            })
                        } else this.data.search(t), this.render()
                }, e.prototype.setSearchText = function(e) {
                    this.config.searchText = e
                }, e.prototype.render = function() {
                    this.config.isMultiple ? this.slim.values() : (this.slim.placeholder(), this.slim.deselect()), this.slim.options()
                }, e.prototype.destroy = function(e) {
                    void 0 === e && (e = null);
                    var t = e ? document.querySelector("." + e) : this.slim.container,
                        i = e ? document.querySelector("[data-ssid=" + e + "]") : this.select.element;
                    t && i && (i.style.display = null, delete i.dataset.ssid, i.slim = null, t.parentElement && t.parentElement.removeChild(t))
                }, e
            }();
        t.default = r
    }, function(e, t, i) {
        "use strict";
        t.__esModule = !0;
        var n = function() {
            function e(e) {
                this.id = "", this.isMultiple = !1, this.isAjax = !1, this.isSearching = !1, this.showSearch = !0, this.searchHighlight = !1, this.closeOnSelect = !0, this.showContent = "auto", this.searchPlaceholder = "Search", this.searchText = "No Results", this.searchingText = "Searching...", this.placeholderText = "Select Value", this.allowDeselect = !1, this.deselectLabel = "x", this.isEnabled = !0, this.valuesUseText = !1, this.showOptionTooltips = !1, this.selectByGroup = !1, this.limit = 0, this.main = "ss-main", this.singleSelected = "ss-single-selected", this.arrow = "ss-arrow", this.multiSelected = "ss-multi-selected", this.add = "ss-add", this.plus = "ss-plus", this.values = "ss-values", this.value = "ss-value", this.valueText = "ss-value-text", this.valueDelete = "ss-value-delete", this.content = "ss-content", this.open = "ss-open", this.openAbove = "ss-open-above", this.openBelow = "ss-open-below", this.search = "ss-search", this.searchHighlighter = "ss-search-highlight", this.addable = "ss-addable", this.list = "ss-list", this.optgroup = "ss-optgroup", this.optgroupLabel = "ss-optgroup-label", this.optgroupLabelSelectable = "ss-optgroup-label-selectable", this.option = "ss-option", this.highlighted = "ss-highlighted", this.disabled = "ss-disabled", this.hide = "ss-hide", this.id = "ss-" + Math.floor(1e5 * Math.random()), this.style = e.select.style.cssText, this.class = e.select.className.split(" "), this.isMultiple = e.select.multiple, this.isAjax = e.isAjax, this.showSearch = !1 !== e.showSearch, this.searchHighlight = !0 === e.searchHighlight, this.closeOnSelect = !1 !== e.closeOnSelect, e.showContent && (this.showContent = e.showContent), this.isEnabled = !1 !== e.isEnabled, e.searchPlaceholder && (this.searchPlaceholder = e.searchPlaceholder), e.searchText && (this.searchText = e.searchText), e.searchingText && (this.searchingText = e.searchingText), e.placeholderText && (this.placeholderText = e.placeholderText), this.allowDeselect = !0 === e.allowDeselect, e.deselectLabel && (this.deselectLabel = e.deselectLabel), e.valuesUseText && (this.valuesUseText = e.valuesUseText), e.showOptionTooltips && (this.showOptionTooltips = e.showOptionTooltips), e.selectByGroup && (this.selectByGroup = e.selectByGroup), e.limit && (this.limit = e.limit), e.searchFilter && (this.searchFilter = e.searchFilter)
            }
            return e.prototype.searchFilter = function(e, t) {
                return -1 !== e.text.toLowerCase().indexOf(t.toLowerCase())
            }, e
        }();
        t.Config = n
    }, function(e, t, i) {
        "use strict";
        t.__esModule = !0;
        var n = function() {
            function e(e) {
                this.triggerMutationObserver = !0, this.element = e.select, this.main = e.main, this.element.disabled && (this.main.config.isEnabled = !1), this.addAttributes(), this.addEventListeners(), this.mutationObserver = null, this.addMutationObserver(), this.element.slim = e.main
            }
            return e.prototype.setValue = function() {
                if (this.main.data.getSelected()) {
                    if (this.main.config.isMultiple)
                        for (var e = this.main.data.getSelected(), t = 0, i = this.element.options; t < i.length; t++) {
                            var n = i[t];
                            n.selected = !1;
                            for (var s = 0, a = e; s < a.length; s++) {
                                a[s].value === n.value && (n.selected = !0)
                            }
                        } else {
                            e = this.main.data.getSelected();
                            this.element.value = e ? e.value : ""
                        }
                    this.main.data.isOnChangeEnabled = !1, this.element.dispatchEvent(new CustomEvent("change", {
                        bubbles: !0
                    })), this.main.data.isOnChangeEnabled = !0
                }
            }, e.prototype.addAttributes = function() {
                this.element.tabIndex = -1, this.element.style.display = "none", this.element.dataset.ssid = this.main.config.id
            }, e.prototype.addEventListeners = function() {
                var t = this;
                this.element.addEventListener("change", function(e) {
                    t.main.data.setSelectedFromSelect(), t.main.render()
                })
            }, e.prototype.addMutationObserver = function() {
                var t = this;
                this.main.config.isAjax || (this.mutationObserver = new MutationObserver(function(e) {
                    t.triggerMutationObserver && (t.main.data.parseSelectData(), t.main.data.setSelectedFromSelect(), t.main.render(), e.forEach(function(e) {
                        "class" === e.attributeName && t.main.slim.updateContainerDivClass(t.main.slim.container)
                    }))
                }), this.observeMutationObserver())
            }, e.prototype.observeMutationObserver = function() {
                this.mutationObserver && this.mutationObserver.observe(this.element, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0
                })
            }, e.prototype.disconnectMutationObserver = function() {
                this.mutationObserver && this.mutationObserver.disconnect()
            }, e.prototype.create = function(e) {
                this.element.innerHTML = "";
                for (var t = 0, i = e; t < i.length; t++) {
                    var n = i[t];
                    if (n.hasOwnProperty("options")) {
                        var s = n,
                            a = document.createElement("optgroup");
                        if (a.label = s.label, s.options)
                            for (var l = 0, o = s.options; l < o.length; l++) {
                                var r = o[l];
                                a.appendChild(this.createOption(r))
                            }
                        this.element.appendChild(a)
                    } else this.element.appendChild(this.createOption(n))
                }
            }, e.prototype.createOption = function(t) {
                var i = document.createElement("option");
                return i.value = t.value || t.text, i.innerHTML = t.innerHTML || t.text, t.selected && (i.selected = t.selected), t.disabled && (i.disabled = !0), t.placeholder && i.setAttribute("data-placeholder", "true"), t.class && t.class.split(" ").forEach(function(e) {
                    i.classList.add(e)
                }), t.data && "object" == typeof t.data && Object.keys(t.data).forEach(function(e) {
                    i.setAttribute("data-" + e, t.data[e])
                }), i
            }, e
        }();
        t.Select = n
    }, function(e, t, i) {
        "use strict";
        t.__esModule = !0;
        var l = i(0),
            o = i(1),
            n = function() {
                function e(e) {
                    this.main = e.main, this.container = this.containerDiv(), this.content = this.contentDiv(), this.search = this.searchDiv(), this.list = this.listDiv(), this.options(), this.singleSelected = null, this.multiSelected = null, this.main.config.isMultiple ? (this.multiSelected = this.multiSelectedDiv(), this.multiSelected && this.container.appendChild(this.multiSelected.container)) : (this.singleSelected = this.singleSelectedDiv(), this.container.appendChild(this.singleSelected.container)), this.container.appendChild(this.content), this.content.appendChild(this.search.container), this.content.appendChild(this.list)
                }
                return e.prototype.containerDiv = function() {
                    var e = document.createElement("div");
                    return e.style.cssText = this.main.config.style, this.updateContainerDivClass(e), e
                }, e.prototype.updateContainerDivClass = function(e) {
                    this.main.config.class = this.main.select.element.className.split(" "), e.className = "", e.classList.add(this.main.config.id), e.classList.add(this.main.config.main);
                    for (var t = 0, i = this.main.config.class; t < i.length; t++) {
                        var n = i[t];
                        "" !== n.trim() && e.classList.add(n)
                    }
                }, e.prototype.singleSelectedDiv = function() {
                    var t = this,
                        e = document.createElement("div");
                    e.classList.add(this.main.config.singleSelected);
                    var i = document.createElement("span");
                    i.classList.add("placeholder"), e.appendChild(i);
                    var n = document.createElement("span");
                    n.innerHTML = this.main.config.deselectLabel, n.classList.add("ss-deselect"), n.onclick = function(e) {
                        e.stopPropagation(), t.main.config.isEnabled && t.main.set("")
                    }, e.appendChild(n);
                    var s = document.createElement("span");
                    s.classList.add(this.main.config.arrow);
                    var a = document.createElement("span");
                    return a.classList.add("arrow-down"), s.appendChild(a), e.appendChild(s), e.onclick = function() {
                        t.main.config.isEnabled && (t.main.data.contentOpen ? t.main.close() : t.main.open())
                    }, {
                        container: e,
                        placeholder: i,
                        deselect: n,
                        arrowIcon: {
                            container: s,
                            arrow: a
                        }
                    }
                }, e.prototype.placeholder = function() {
                    var e = this.main.data.getSelected();
                    if (null === e || e && e.placeholder) {
                        var t = document.createElement("span");
                        t.classList.add(this.main.config.disabled), t.innerHTML = this.main.config.placeholderText, this.singleSelected && (this.singleSelected.placeholder.innerHTML = t.outerHTML)
                    } else {
                        var i = "";
                        e && (i = e.innerHTML && !0 !== this.main.config.valuesUseText ? e.innerHTML : e.text), this.singleSelected && (this.singleSelected.placeholder.innerHTML = e ? i : "")
                    }
                }, e.prototype.deselect = function() {
                    if (this.singleSelected) {
                        if (!this.main.config.allowDeselect) return void this.singleSelected.deselect.classList.add("ss-hide");
                        "" === this.main.selected() ? this.singleSelected.deselect.classList.add("ss-hide") : this.singleSelected.deselect.classList.remove("ss-hide")
                    }
                }, e.prototype.multiSelectedDiv = function() {
                    var t = this,
                        e = document.createElement("div");
                    e.classList.add(this.main.config.multiSelected);
                    var i = document.createElement("div");
                    i.classList.add(this.main.config.values), e.appendChild(i);
                    var n = document.createElement("div");
                    n.classList.add(this.main.config.add);
                    var s = document.createElement("span");
                    return s.classList.add(this.main.config.plus), s.onclick = function(e) {
                        t.main.data.contentOpen && (t.main.close(), e.stopPropagation())
                    }, n.appendChild(s), e.appendChild(n), e.onclick = function(e) {
                        t.main.config.isEnabled && (e.target.classList.contains(t.main.config.valueDelete) || t.main.open())
                    }, {
                        container: e,
                        values: i,
                        add: n,
                        plus: s
                    }
                }, e.prototype.values = function() {
                    if (this.multiSelected) {
                        for (var e, t = this.multiSelected.values.childNodes, i = this.main.data.getSelected(), n = [], s = 0, a = t; s < a.length; s++) {
                            var l = a[s];
                            e = !0;
                            for (var o = 0, r = i; o < r.length; o++) {
                                var c = r[o];
                                String(c.id) === String(l.dataset.id) && (e = !1)
                            }
                            e && n.push(l)
                        }
                        for (var h = 0, d = n; h < d.length; h++) {
                            var u = d[h];
                            u.classList.add("ss-out"), this.multiSelected.values.removeChild(u)
                        }
                        t = this.multiSelected.values.childNodes;
                        for (c = 0; c < i.length; c++) {
                            e = !1;
                            for (var p = 0, f = t; p < f.length; p++) {
                                l = f[p];
                                String(i[c].id) === String(l.dataset.id) && (e = !0)
                            }
                            e || (0 !== t.length && HTMLElement.prototype.insertAdjacentElement ? 0 === c ? this.multiSelected.values.insertBefore(this.valueDiv(i[c]), t[c]) : t[c - 1].insertAdjacentElement("afterend", this.valueDiv(i[c])) : this.multiSelected.values.appendChild(this.valueDiv(i[c])))
                        }
                        if (0 === i.length) {
                            var m = document.createElement("span");
                            m.classList.add(this.main.config.disabled), m.innerHTML = this.main.config.placeholderText, this.multiSelected.values.innerHTML = m.outerHTML
                        }
                    }
                }, e.prototype.valueDiv = function(a) {
                    var l = this,
                        e = document.createElement("div");
                    e.classList.add(this.main.config.value), e.dataset.id = a.id;
                    var t = document.createElement("span");
                    t.classList.add(this.main.config.valueText), t.innerHTML = a.innerHTML && !0 !== this.main.config.valuesUseText ? a.innerHTML : a.text, e.appendChild(t);
                    var i = document.createElement("span");
                    return i.classList.add(this.main.config.valueDelete), i.innerHTML = this.main.config.deselectLabel, i.onclick = function(e) {
                        e.preventDefault(), e.stopPropagation();
                        var t = !1;
                        if (l.main.config.isEnabled) {
                            if (l.main.beforeOnChange || (t = !0), l.main.beforeOnChange) {
                                for (var i = l.main.data.getSelected(), n = JSON.parse(JSON.stringify(i)), s = 0; s < n.length; s++) n[s].id === a.id && n.splice(s, 1);
                                !1 !== l.main.beforeOnChange(n) && (t = !0)
                            }
                            t && (l.main.data.removeFromSelected(a.id, "id"), l.main.render(), l.main.select.setValue(), l.main.data.onDataChange())
                        }
                    }, e.appendChild(i), e
                }, e.prototype.contentDiv = function() {
                    var e = document.createElement("div");
                    return e.classList.add(this.main.config.content), e
                }, e.prototype.searchDiv = function() {
                    var s = this,
                        e = document.createElement("div"),
                        n = document.createElement("input"),
                        a = document.createElement("div");
                    e.classList.add(this.main.config.search);
                    var t = {
                        container: e,
                        input: n
                    };
                    return this.main.config.showSearch || (e.classList.add(this.main.config.hide), n.readOnly = !0), n.type = "search", n.placeholder = this.main.config.searchPlaceholder, n.tabIndex = 0, n.setAttribute("aria-label", this.main.config.searchPlaceholder), n.onclick = function(e) {
                        setTimeout(function() {
                            "" === e.target.value && s.main.search("")
                        }, 10)
                    }, n.onkeydown = function(e) {
                        "ArrowUp" === e.key ? (s.main.open(), s.highlightUp(), e.preventDefault()) : "ArrowDown" === e.key ? (s.main.open(), s.highlightDown(), e.preventDefault()) : "Tab" === e.key ? s.main.close() : "Enter" === e.key && e.preventDefault()
                    }, n.onkeyup = function(e) {
                        var t = e.target;
                        if ("Enter" === e.key) {
                            if (s.main.addable && e.ctrlKey) return a.click(), e.preventDefault(), void e.stopPropagation();
                            var i = s.list.querySelector("." + s.main.config.highlighted);
                            i && i.click()
                        } else "ArrowUp" === e.key || "ArrowDown" === e.key || ("Escape" === e.key ? s.main.close() : s.main.config.showSearch && s.main.data.contentOpen ? s.main.search(t.value) : n.value = "");
                        e.preventDefault(), e.stopPropagation()
                    }, n.onfocus = function() {
                        s.main.open()
                    }, e.appendChild(n), this.main.addable && (a.classList.add(this.main.config.addable), a.innerHTML = "+", a.onclick = function(e) {
                        if (s.main.addable) {
                            e.preventDefault(), e.stopPropagation();
                            var t = s.search.input.value;
                            if ("" === t.trim()) return void s.search.input.focus();
                            var i = s.main.addable(t),
                                n = "";
                            if (!i) return;
                            if ("object" == typeof i) o.validateOption(i) && (s.main.addData(i), n = i.value ? i.value : i.text);
                            else s.main.addData(s.main.data.newOption({
                                text: i,
                                value: i
                            })), n = i;
                            s.main.search(""), setTimeout(function() {
                                s.main.set(n, "value", !1, !1)
                            }, 100), s.main.config.closeOnSelect && setTimeout(function() {
                                s.main.close()
                            }, 100)
                        }
                    }, e.appendChild(a), t.addable = a), t
                }, e.prototype.highlightUp = function() {
                    var e = this.list.querySelector("." + this.main.config.highlighted),
                        t = null;
                    if (e)
                        for (t = e.previousSibling; null !== t && t.classList.contains(this.main.config.disabled);) t = t.previousSibling;
                    else {
                        var i = this.list.querySelectorAll("." + this.main.config.option + ":not(." + this.main.config.disabled + ")");
                        t = i[i.length - 1]
                    }
                    if (t && t.classList.contains(this.main.config.optgroupLabel) && (t = null), null === t) {
                        var n = e.parentNode;
                        if (n.classList.contains(this.main.config.optgroup) && n.previousSibling) {
                            var s = n.previousSibling.querySelectorAll("." + this.main.config.option + ":not(." + this.main.config.disabled + ")");
                            s.length && (t = s[s.length - 1])
                        }
                    }
                    t && (e && e.classList.remove(this.main.config.highlighted), t.classList.add(this.main.config.highlighted), l.ensureElementInView(this.list, t))
                }, e.prototype.highlightDown = function() {
                    var e = this.list.querySelector("." + this.main.config.highlighted),
                        t = null;
                    if (e)
                        for (t = e.nextSibling; null !== t && t.classList.contains(this.main.config.disabled);) t = t.nextSibling;
                    else t = this.list.querySelector("." + this.main.config.option + ":not(." + this.main.config.disabled + ")");
                    if (null === t && null !== e) {
                        var i = e.parentNode;
                        if (i.classList.contains(this.main.config.optgroup))
                            if (i.nextSibling) t = i.nextSibling.querySelector("." + this.main.config.option + ":not(." + this.main.config.disabled + ")")
                    }
                    t && (e && e.classList.remove(this.main.config.highlighted), t.classList.add(this.main.config.highlighted), l.ensureElementInView(this.list, t))
                }, e.prototype.listDiv = function() {
                    var o = document.createElement("div");
                    return o.classList.add(this.main.config.list), o.addEventListener("wheel", function(e) {
                        var t = o.scrollTop,
                            i = o.scrollHeight,
                            n = o.offsetHeight,
                            s = Math.round(-e.deltaY),
                            a = 0 < s,
                            l = function() {
                                return e.stopPropagation(), e.preventDefault(), e.returnValue = !1
                            };
                        return !a && i - n - t < -s ? (o.scrollTop = i, l()) : a && t < s ? (o.scrollTop = 0, l()) : void 0
                    }), o
                }, e.prototype.options = function(e) {
                    void 0 === e && (e = "");
                    var t, i = this.main.data.filtered || this.main.data.data;
                    if ((this.list.innerHTML = "") !== e) return (t = document.createElement("div")).classList.add(this.main.config.option), t.classList.add(this.main.config.disabled), t.innerHTML = e, void this.list.appendChild(t);
                    if (this.main.config.isAjax && this.main.config.isSearching) return (t = document.createElement("div")).classList.add(this.main.config.option), t.classList.add(this.main.config.disabled), t.innerHTML = this.main.config.searchingText, void this.list.appendChild(t);
                    if (0 === i.length) {
                        var n = document.createElement("div");
                        return n.classList.add(this.main.config.option), n.classList.add(this.main.config.disabled), n.innerHTML = this.main.config.searchText, void this.list.appendChild(n)
                    }
                    for (var s = function(e) {
                            if (e.hasOwnProperty("label")) {
                                var t = e,
                                    s = document.createElement("div");
                                s.classList.add(c.main.config.optgroup);
                                var i = document.createElement("div");
                                i.classList.add(c.main.config.optgroupLabel), c.main.config.selectByGroup && c.main.config.isMultiple && i.classList.add(c.main.config.optgroupLabelSelectable), i.innerHTML = t.label, s.appendChild(i);
                                var n = t.options;
                                if (n) {
                                    for (var a = 0, l = n; a < l.length; a++) {
                                        var o = l[a];
                                        s.appendChild(c.option(o))
                                    }
                                    if (c.main.config.selectByGroup && c.main.config.isMultiple) {
                                        var r = c;
                                        i.addEventListener("click", function(e) {
                                            e.preventDefault(), e.stopPropagation();
                                            for (var t = 0, i = s.children; t < i.length; t++) {
                                                var n = i[t]; - 1 !== n.className.indexOf(r.main.config.option) && n.click()
                                            }
                                        })
                                    }
                                }
                                c.list.appendChild(s)
                            } else c.list.appendChild(c.option(e))
                        }, c = this, a = 0, l = i; a < l.length; a++) {
                        s(l[a])
                    }
                }, e.prototype.option = function(e) {
                    if (e.placeholder) {
                        var t = document.createElement("div");
                        return t.classList.add(this.main.config.option), t.classList.add(this.main.config.hide), t
                    }
                    var i = document.createElement("div");
                    i.classList.add(this.main.config.option), e.class && e.class.split(" ").forEach(function(e) {
                        i.classList.add(e)
                    });
                    var s = this.main.data.getSelected();
                    i.dataset.id = e.id, this.main.config.searchHighlight && this.main.slim && e.innerHTML && "" !== this.main.slim.search.input.value.trim() ? i.innerHTML = l.highlight(e.innerHTML, this.main.slim.search.input.value, this.main.config.searchHighlighter) : e.innerHTML && (i.innerHTML = e.innerHTML), this.main.config.showOptionTooltips && i.textContent && i.setAttribute("title", i.textContent);
                    var a = this;
                    return i.addEventListener("click", function(e) {
                        if (e.preventDefault(), e.stopPropagation(), !(a.main.config.limit && Array.isArray(s) && a.main.config.limit <= s.length)) {
                            var t = this.dataset.id;
                            if (a.main.beforeOnChange) {
                                var i = void 0,
                                    n = JSON.parse(JSON.stringify(a.main.data.getObjectFromData(t)));
                                n.selected = !0, a.main.config.isMultiple ? (i = JSON.parse(JSON.stringify(s))).push(n) : i = JSON.parse(JSON.stringify(n)), !1 !== a.main.beforeOnChange(i) && a.main.set(t, "id", a.main.config.closeOnSelect)
                            } else a.main.set(t, "id", a.main.config.closeOnSelect)
                        }
                    }), (e.disabled || s && l.isValueInArrayOfObjects(s, "id", e.id)) && (i.onclick = null, i.classList.add(this.main.config.disabled)), i
                }, e
            }();
        t.Slim = n
    }]).default
});`

exports.slimselect = slimselect