/*!
 * Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal),
 * ,Licensed Under MIT (http://opensource.org/licenses/MIT),
 * ,
 * ,Vue 2 Autocomplete @ Version 0.2.76,
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vue2Autocomplete"] = factory();
	else
		root["Vue2Autocomplete"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
* Forked from Vue2-autocomplete by http://github.com/BosNaufal
*/

/* harmony default export */ __webpack_exports__["a"] = ({
    'inject': ['$validator'],
    'props': {
        'id': String,
        'name': String,
        'className': String,
        'classes': {
            'type': Object,
            'default': function _default() {
                return {
                    'wrapper': false,
                    'input': false,
                    'list': false,
                    'item': false
                };
            }
        },
        'placeholder': String,
        'required': Boolean,

        // Intial Value
        'initValue': {
            'type': String,
            'default': ''
        },

        // Manual List
        'options': Array,

        // Filter After Get the data
        'filterByAnchor': {
            'type': Boolean,
            'default': true
        },

        // Anchor of list
        'anchor': {
            'type': String,
            'required': true
        },

        // Label of list
        'label': String,

        // Debounce time
        'debounce': Number,

        // ajax URL will be fetched
        'url': {
            'type': String,
            'required': true
        },

        // query param
        'param': {
            'type': String,
            'default': 'q'
        },

        'encodeParams': {
            'type': Boolean,
            'default': true
        },

        // Custom Params
        'customParams': Object,

        // Custom Headers
        'customHeaders': Object,

        // minimum length
        'min': {
            'type': Number,
            'default': 0
        },

        // Create a custom template from data.
        'onShouldRenderChild': Function,

        // Process the result before retrieveng the result array.
        'process': Function,

        // Callback
        'onInput': Function,
        'onShow': Function,
        'onBlur': Function,
        'onHide': Function,
        'onFocus': Function,
        'onSelect': Function,
        'onBeforeAjax': Function,
        'onAjaxProgress': Function,
        'onAjaxLoaded': Function,
        'onShouldGetData': Function
    },

    data: function data() {
        return {
            'showList': false,
            'type': '',
            'json': [],
            'focusList': '',
            'debounceTask': undefined
        };
    },


    'watch': {
        options: function options(newVal, oldVal) {
            if (this.filterByAnchor) {
                var type = this.type,
                    anchor = this.anchor;

                var regex = new RegExp('' + type, 'i');
                var filtered = newVal.filter(function (item) {
                    var found = item[anchor].search(regex) !== -1;
                    return found;
                });
                this.json = filtered;
            } else {
                this.json = newVal;
            }
        }
    },

    'methods': {
        getClassName: function getClassName(part) {
            var classes = this.classes,
                className = this.className;

            if (classes[part]) return '' + classes[part];
            return className ? className + '-' + part : '';
        },


        // Netralize Autocomplete
        clearInput: function clearInput() {
            this.showList = false;
            this.type = '';
            this.json = [];
            this.focusList = '';
        },


        // Get the original data
        cleanUp: function cleanUp(data) {
            return JSON.parse(JSON.stringify(data));
        },


        /* ==============================
          INPUT EVENTS
        ============================= */
        handleInput: function handleInput(event) {
            var _this = this;

            var value = event.target.value;

            this.showList = true;
            // Callback Event
            if (this.onInput) this.onInput(value);
            // If Debounce
            if (this.debounce) {
                if (this.debounceTask !== undefined) clearTimeout(this.debounceTask);
                this.debounceTask = setTimeout(function () {
                    return _this.getData(value);
                }, this.debounce);
            } else {
                return this.getData(value);
            }
        },
        handleKeyDown: function handleKeyDown(event) {
            var key = event.keyCode;

            // Disable when list isn't showing up
            if (!this.showList) return;

            // Key List
            var DOWN = 40;
            var UP = 38;
            var ENTER = 13;
            var ESC = 27;

            // Prevent Default for Prevent Cursor Move & Form Submit
            switch (key) {
                case DOWN:
                    event.preventDefault();
                    this.focusList++;
                    break;
                case UP:
                    event.preventDefault();
                    this.focusList--;
                    break;
                case ENTER:
                    event.preventDefault();
                    this.selectList(this.json[this.focusList]);
                    this.showList = false;
                    break;
                case ESC:
                    this.showList = false;
                    break;
            }

            var listLength = this.json.length - 1;
            var outOfRangeBottom = this.focusList > listLength;
            var outOfRangeTop = this.focusList < 0;
            var topItemIndex = 0;
            var bottomItemIndex = listLength;

            var nextFocusList = this.focusList;
            if (outOfRangeBottom) nextFocusList = topItemIndex;
            if (outOfRangeTop) nextFocusList = bottomItemIndex;
            this.focusList = nextFocusList;
        },
        setValue: function setValue(val) {
            this.type = val;
        },


        /* ==============================
          LIST EVENTS
        ============================= */

        handleDoubleClick: function handleDoubleClick() {
            this.json = [];
            this.getData('');
            // Callback Event
            this.onShow ? this.onShow() : null;
            this.showList = true;
        },
        handleBlur: function handleBlur(event) {
            var _this2 = this;

            // Callback Event
            this.onBlur ? this.onBlur(event) : null;
            setTimeout(function () {
                // Callback Event
                _this2.onHide ? _this2.onHide() : null;
                _this2.showList = false;
            }, 250);
            if (this.$refs.input.value) {
                this.errors.clear();
            }
        },
        handleFocus: function handleFocus(event) {
            this.focusList = 0;
            // Callback Event
            this.onFocus ? this.onFocus(event) : null;
        },
        mousemove: function mousemove(i) {
            this.focusList = i;
        },
        activeClass: function activeClass(i) {
            var focusClass = i === this.focusList ? 'focus-list' : '';
            return '' + focusClass;
        },
        selectList: function selectList(data) {
            // Deep clone of the original object
            var clean = this.cleanUp(data);
            // Put the selected data to type (model)
            this.type = this.deepValue(clean);
            // Hide List
            this.showList = false;
            // Callback Event
            this.onSelect ? this.onSelect(clean) : null;
        },
        deepValue: function deepValue(place) {
            var airportTitle = place.name;

            if (place.iata) {
                airportTitle += ' (' + place.iata + ') ';
            }
            if (place.city) {
                airportTitle += place.city;
            }
            if (place.stateCode) {
                airportTitle += ', ' + place.stateCode;
            }

            if (place.countryCode !== 'US') {
                airportTitle += ', ' + place.countryName;
            }

            return airportTitle;
        },


        /* ==============================
          AJAX EVENTS
        ============================= */

        composeParams: function composeParams(val) {
            var _this3 = this;

            var encode = function encode(val) {
                return _this3.encodeParams ? encodeURIComponent(val) : val;
            };
            var params = this.param + '=' + encode(val);
            if (this.customParams) {
                Object.keys(this.customParams).forEach(function (key) {
                    params += '&' + key + '=' + encode(_this3.customParams[key]);
                });
            }
            return params;
        },
        composeHeader: function composeHeader(ajax) {
            var _this4 = this;

            if (this.customHeaders) {
                Object.keys(this.customHeaders).forEach(function (key) {
                    ajax.setRequestHeader(key, _this4.customHeaders[key]);
                });
            }
        },
        doAjax: function doAjax(val) {
            var _this5 = this;

            // Callback Event
            this.onBeforeAjax ? this.onBeforeAjax(val) : null;
            // Compose Params
            var params = this.composeParams(val);
            // Init Ajax
            var ajax = new XMLHttpRequest();
            ajax.open('GET', this.url + '?' + params, true);
            this.composeHeader(ajax);
            // Callback Event
            ajax.addEventListener('progress', function (data) {
                if (data.lengthComputable && _this5.onAjaxProgress) _this5.onAjaxProgress(data);
            });
            // On Done
            ajax.addEventListener('loadend', function (event) {
                var responseText = event.target.responseText;

                var json = JSON.parse(responseText);
                // Callback Event
                _this5.onAjaxLoaded ? _this5.onAjaxLoaded(json) : null;
                _this5.json = _this5.process ? _this5.process(json) : json;
            });
            // Send Ajax
            ajax.send();
        },
        getData: function getData(value) {
            if (value.length < this.min || !this.url) return;
            if (this.onShouldGetData) this.manualGetData(value);else this.doAjax(value);
        },


        // Do Ajax Manually, so user can do whatever he want
        manualGetData: function manualGetData(val) {
            var _this6 = this;

            var task = this.onShouldGetData(val);
            if (task && task.then) {
                return task.then(function (options) {
                    _this6.json = options;
                });
            }
        }
    },

    created: function created() {
        // Sync parent model with initValue Props
        this.type = this.initValue ? this.initValue : null;
    },
    mounted: function mounted() {
        if (this.required) this.$refs.input.setAttribute('required', this.required);
    }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_autocomplete_vue__ = __webpack_require__(0);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1bd173fb_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_autocomplete_vue__ = __webpack_require__(6);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(7)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_autocomplete_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1bd173fb_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_autocomplete_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/components/vue-autocomplete.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1bd173fb", Component.options)
  } else {
    hotAPI.reload("data-v-1bd173fb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_vue_autocomplete_vue__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_vue_autocomplete_vue__["a" /* default */]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.autocomplete-list {\n    position: relative;\n    z-index: 4;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: _vm.getClassName("wrapper") + " autocomplete-wrapper" },
    [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.type,
            expression: "type"
          },
          {
            name: "validate",
            rawName: "v-validate",
            value: "required",
            expression: "'required'"
          }
        ],
        ref: "input",
        class: _vm.getClassName("input") + " autocomplete-input",
        attrs: {
          type: "text",
          id: _vm.id,
          placeholder: _vm.placeholder,
          name: _vm.name,
          autocomplete: "off",
          novalidate: "true"
        },
        domProps: { value: _vm.type },
        on: {
          input: [
            function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.type = $event.target.value
            },
            _vm.handleInput
          ],
          dblclick: _vm.handleDoubleClick,
          blur: _vm.handleBlur,
          keydown: _vm.handleKeyDown,
          focus: _vm.handleFocus
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.showList && _vm.json.length,
              expression: "showList && json.length"
            }
          ],
          class: _vm.getClassName("list") + " autocomplete autocomplete-list"
        },
        [
          _c(
            "ul",
            _vm._l(_vm.json, function(data, i) {
              return _c("li", { key: i, class: _vm.activeClass(i) }, [
                _c(
                  "a",
                  {
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.selectList(data)
                      },
                      mousemove: function($event) {
                        _vm.mousemove(i)
                      }
                    }
                  },
                  [
                    _vm.onShouldRenderChild
                      ? _c("div", {
                          domProps: {
                            innerHTML: _vm._s(_vm.onShouldRenderChild(data))
                          }
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    !_vm.onShouldRenderChild
                      ? _c("div", [
                          _c("b", { staticClass: "autocomplete-anchor-text" }, [
                            _vm._v(_vm._s(_vm.deepValue(data)))
                          ])
                        ])
                      : _vm._e()
                  ]
                )
              ])
            })
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1bd173fb", esExports)
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("0beb4b8a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1bd173fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vue-autocomplete.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1bd173fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vue-autocomplete.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(9)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});