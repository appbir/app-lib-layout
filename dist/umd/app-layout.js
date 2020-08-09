(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["app-layout"] = factory(require("react"));
	else
		root["app-layout"] = factory(root["react"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.arrayToTree = exports.POSITION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   *  该布局适合整站布局
                                                                                                                                                                                                                                                                   *  ---------------------
                                                                                                                                                                                                                                                                   *  如果想局部布局，则可以使用auto 或者diy模式 (TODO 该两种模式还未完全成熟)
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   *  局部布局需要使用style传递对应的miniheight 最小高度  或者使用样式覆盖
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   *  有必要场景可扩展排序规则
                                                                                                                                                                                                                                                                   */

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * FULL: full layout include priority
 * AUTO: 100%  按照外层百分比进行
 * DIY : define you width or height
 */
var POSITION = exports.POSITION = { FULL: 'FULL', AUTO: 'AUTO', 'DIY': 'DIY' };

var PARTS = {
    // 最外层容器 最大容器
    MAIN_CONTAINER: 'main_container',
    // 辅助左右布局容器
    LEFT_RIGHT_CONTAINER: 'left_right_container',
    // 过度容器 
    LEFT_CONTAINER: 'left_container',
    RIGHT_CONTAINER: 'right_container',
    BOTTOM_CONTAINER: 'bottom_container',
    // 内容区域容器
    CONTENT_CONTAINER: 'content-container',
    // 组成部分
    HEADER: 'header',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    CONTENT: 'content',
    CONTENT_HEADER: 'content_header'

    // 元素节点排序 
};var ORDER = [PARTS.CONTENT, PARTS.HEADER, PARTS.LEFT, PARTS.RIGHT, PARTS.BOTTOM, PARTS.CONTENT_HEADER];

var getChildren = function getChildren(current, opt, array) {
    var id = current[opt.keyFiled];
    var childEle = [];
    array.map(function (item) {
        if (item[opt.parentFiled] === id) {
            childEle.push(item);
        }
    });
    childEle.length && childEle.map(function (ele) {
        ele[opt.childFiled] = getChildren(ele, opt, array);
    });
    return childEle;
};

var arrayToTree = exports.arrayToTree = function arrayToTree(array, option) {
    if (!array || !array.length) return option && option.returnType === 'object' ? {} : [];
    var opt = { parentFiled: 'parent', keyFiled: 'id', childFiled: 'children', returnType: 'tree' };
    typeof option === 'string' ? opt.parentFiled = option : opt = _extends({}, opt, option);
    var temp = {},
        first = [];
    array.map(function (obj) {
        return temp[obj[opt.keyFiled]] = obj;
    });
    array.map(function (current) {
        var parent = current[opt.parentFiled];
        if (!parent || !temp[parent]) {
            first.push(current);
        }
    });
    first && first.map(function (firstChild) {
        firstChild[opt.childFiled] = getChildren(firstChild, opt, array);
    });
    return opt.returnType === 'object' ? temp : first;
};

// 是否合法的参数
var isLegal = function isLegal(size) {
    return size && !POSITION[size] && /px/.test(size);
};

// 像素计算
var add = function add(first, second) {
    return isLegal(second) ? parseInt((first || '0').split('px')[0]) + parseInt((second || '0').split('px')[0]) + 'px' : first;
};

// 是否整合
var isIntegrate = function isIntegrate(size, isWidth) {
    return isWidth ? [PARTS.LEFT, PARTS.RIGHT].indexOf(size) != -1 : [PARTS.HEADER, PARTS.BOTTOM].indexOf(size) != -1;
};

// 计算宽度或高度
var integrate = function integrate(integration, part, name) {
    isIntegrate(name) && (integration.height = add(integration.height, part.height));
    isIntegrate(name, true) && (integration.width = add(integration.width, part.width));
};

// 是否满屏
var isFull = function isFull(name, config, isHeight) {
    return (config[name] || false) && (isHeight ? config[name].height === POSITION.FULL : config[name].width === POSITION.FULL);
};

var Layout = function Layout(_ref) {
    var _ref$classNamePrefix = _ref.classNamePrefix,
        classNamePrefix = _ref$classNamePrefix === undefined ? 'appbir-layout-' : _ref$classNamePrefix,
        _ref$targetName = _ref.targetName,
        targetName = _ref$targetName === undefined ? 'targetName' : _ref$targetName,
        _ref$config = _ref.config,
        config = _ref$config === undefined ? {} : _ref$config,
        children = _ref.children,
        _ref$style = _ref.style,
        style = _ref$style === undefined ? {} : _ref$style,
        _ref$model = _ref.model,
        model = _ref$model === undefined ? POSITION.FULL : _ref$model;

    // 是否为全屏模式
    var isFullModel = model === POSITION.FULL;
    var cfg = {};
    for (var name in config) {
        var partCfg = config[name];
        partCfg.visiabled && (cfg[name] = partCfg);
    }

    /**
     * 根据模型 返回固定位置类型
     */
    var getFixedPosition = function getFixedPosition() {
        return model !== POSITION.FULL ? 'absolute' : 'fixed';
    };

    // 计算样式
    var calcStyle = function calcStyle(config) {
        var styles = [];
        // 记录宽度和高度
        var integration = {
            width: '',
            height: ''
            // 是否为纵向布局
        };var mainIsRow = !isFull(PARTS.HEADER, cfg) ? isFull(PARTS.LEFT, cfg, true) + isFull(PARTS.RIGHT, cfg, true) ? true : false : false;
        // ------------------------------main conrainer--------------------------------------
        var mainStyle = _extends({
            // 1: tips 如果指定宽度  则flex 在overflow后会出现横向的滚动条
            // 2: tips 如果指定高度  则超出宽度不会被布局
            minHeight: '100vh',
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: mainIsRow ? 'row' : 'column',
            position: model == POSITION.FULL ? 'static' : 'relative'
        }, style);
        styles.push({ name: PARTS.MAIN_CONTAINER, style: mainStyle, parent: null });

        // 指针节点
        var parentNode = PARTS.MAIN_CONTAINER;

        // ------------------------------left_right conrainer--------------------------------------
        var mainNode = PARTS.MAIN_CONTAINER;
        var rightNode = '';
        var leftNode = '';
        var isLeft = false;
        var isTop = false;
        var isRight = cfg[PARTS.RIGHT] && cfg[PARTS.RIGHT].fixed && cfg[PARTS.RIGHT].width;

        var headerConfig = cfg[PARTS.HEADER];
        var rightConfig = cfg[PARTS.RIGHT];
        var leftConfig = cfg[PARTS.LEFT];

        if (mainIsRow) {
            parentNode = PARTS.LEFT_RIGHT_CONTAINER;
            var leftRightContainerStyle = {
                flex: 1,
                display: 'flex',
                position: 'relative',
                flexDirection: 'column'
            };

            if (leftConfig && leftConfig.fixed && leftConfig.width) {
                if (leftConfig.height != POSITION.FULL && rightConfig && rightConfig.height === POSITION.FULL) {} else {
                    leftRightContainerStyle.marginLeft = leftConfig.width;
                    isLeft = true;
                }
            }

            styles.push({ name: PARTS.LEFT_RIGHT_CONTAINER, parent: PARTS.MAIN_CONTAINER, style: leftRightContainerStyle });
        }

        var bottomNode = parentNode;

        // ------------------------------header--------------------------------------
        if (headerConfig) {
            var headerStyle = {
                flex: '0 0 ' + headerConfig.height,
                order: -1
            };

            if (headerConfig.fixed) {
                headerStyle = {
                    position: getFixedPosition(),
                    width: '100%',
                    zIndex: headerConfig.zIndex,
                    height: headerConfig.height
                };
                integrate(integration, headerConfig, PARTS.HEADER);
            }
            styles.push({ name: PARTS.HEADER, parent: parentNode, style: headerStyle });
        }

        // ------------------------------left or right conrainer--------------------------------------
        if (cfg[PARTS.LEFT] || cfg[PARTS.RIGHT]) {
            if (mainIsRow && isFull(PARTS.LEFT, cfg, true) && isFull(PARTS.RIGHT, cfg, true)) {
                rightNode = mainNode;
                leftNode = mainNode;
            } else {
                var containerStyle = {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative'
                };

                if (integration.height) {
                    containerStyle.marginTop = integration.height;
                    isTop = true;
                }
                styles.push({ name: PARTS.LEFT_CONTAINER, parent: parentNode, style: containerStyle });
                rightNode = mainIsRow && isFull(PARTS.RIGHT, cfg, true) ? mainNode : PARTS.LEFT_CONTAINER;
                leftNode = mainIsRow && isFull(PARTS.LEFT, cfg, true) ? mainNode : PARTS.LEFT_CONTAINER;
                parentNode = PARTS.LEFT_CONTAINER;
            }
        }

        // ------------------------------left--------------------------------------

        if (leftConfig) {
            var leftStyle = {
                flex: ' 0 0 ' + leftConfig.width,
                order: -1
            };
            if (leftConfig.fixed) {
                leftStyle = {
                    position: getFixedPosition(),
                    width: leftConfig.width,
                    height: '100%',
                    zIndex: leftConfig.zIndex
                };
                integrate(integration, leftConfig, PARTS.LEFT);
            }

            if (isFull(PARTS.LEFT, cfg, true) + isFull(PARTS.RIGHT, cfg, true) === 1 && cfg[PARTS.BOTTOM] && cfg[PARTS.RIGHT] && cfg[PARTS.LEFT]) {
                if (!isFull(PARTS.LEFT, cfg, true)) {
                    if (isFull(PARTS.HEADER, cfg)) {
                        leftNode = PARTS.BOTTOM_CONTAINER;
                    }
                }
            }

            var lNode = leftNode || (mainIsRow && isFull(PARTS.LEFT, cfg, true) ? PARTS.MAIN_CONTAINER : parentNode);
            styles.push({ name: PARTS.LEFT, parent: lNode, style: leftStyle });
        }

        //   ------------------------------right conrainer--------------------------------------
        if (isFull(PARTS.LEFT, cfg, true) + isFull(PARTS.RIGHT, cfg, true) === 1 && cfg[PARTS.BOTTOM] && cfg[PARTS.RIGHT] && cfg[PARTS.LEFT]) {
            var rightContainerStyle = {
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            };
            if (!mainIsRow && integration.width) {
                rightContainerStyle.marginLeft = integration.width;
                isLeft = true;
            }
            styles.push({ name: PARTS.RIGHT_CONTAINER, parent: parentNode, style: rightContainerStyle });
            parentNode = PARTS.RIGHT_CONTAINER;
        }

        // ------------------------------bottom conrainer--------------------------------------
        if (isFull(PARTS.HEADER, cfg) && isFull(PARTS.LEFT, cfg, true) + isFull(PARTS.RIGHT, cfg, true) === 1 && cfg[PARTS.BOTTOM] && cfg[PARTS.RIGHT]) {
            var bContainerStyle = {
                display: 'flex',
                flexDirection: 'row',
                flex: '1'
            };
            styles.push({ name: PARTS.BOTTOM_CONTAINER, parent: parentNode, style: bContainerStyle });
            if (!isFull(PARTS.RIGHT, cfg, true)) {
                rightNode = PARTS.BOTTOM_CONTAINER;
            }
            bottomNode = parentNode;
            parentNode = PARTS.BOTTOM_CONTAINER;
        }

        var contentNode = parentNode;

        // ------------------------------content and content container--------------------------------------
        var isContentHeader = false;
        var content_headerConfig = cfg[PARTS.CONTENT_HEADER];
        if (content_headerConfig) {
            contentNode = PARTS.CONTENT_CONTAINER;
            var cContainerStyle = {
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1',
                position: 'relative'
            };
            if (!isLeft && integration.width) {
                cContainerStyle.marginLeft = integration.width;
                isLeft = true;
            }
            if (!isTop && integration.height) {
                cContainerStyle.marginTop = integration.height;
                isTop = true;
            }

            if (isFull(PARTS.LEFT, cfg, true)) {
                if (isFull(PARTS.RIGHT, cfg, true) || !cfg[PARTS.RIGHT]) {
                    bottomNode = contentNode;
                }
            }

            if (isRight) {
                cContainerStyle.marginRight = isRight;
                isRight = false;
            }

            styles.push({ name: PARTS.CONTENT_CONTAINER, parent: parentNode, style: cContainerStyle });

            var content_headerStyle = {
                flex: '0 0 ' + content_headerConfig.height
            };
            if (content_headerConfig.fixed) {
                // let calcWidth = add(leftConfig && leftConfig.width,rightConfig && rightConfig.width) || '0px';
                content_headerStyle = {
                    // width:'calc(100vw - '+ calcWidth +')',
                    width: '100%',
                    height: content_headerConfig.height,
                    position: getFixedPosition(),
                    zIndex: content_headerConfig.zIndex
                };
                isContentHeader = content_headerConfig.height;
            }
            styles.push({ name: PARTS.CONTENT_HEADER, parent: contentNode, style: content_headerStyle });
        }

        // ------------------------------content--------------------------------------
        var contentConfig = cfg[PARTS.CONTENT];
        if (contentConfig) {
            var contentStyle = { flex: 1 };
            if (!isLeft && integration.width) {
                contentStyle.marginLeft = integration.width;
            }
            if (isContentHeader) {
                contentStyle.marginTop = isContentHeader;
            }
            if (!isTop && integration.height) {
                contentStyle.marginTop = integration.height;
            }
            if (isRight) {
                contentStyle.marginRight = isRight;
                isRight = false;
            }
            styles.push({ name: PARTS.CONTENT, parent: contentNode, style: contentStyle });
        }

        // ------------------------------right--------------------------------------
        if (rightConfig) {
            var rightStyle = {
                flex: ' 0 0 ' + rightConfig.width,
                order: 1
            };
            if (rightConfig.fixed) {
                rightStyle = {
                    position: getFixedPosition(),
                    width: rightConfig.width,
                    zIndex: rightConfig.zIndex,
                    height: '100%',
                    right: 0
                };

                if (content_headerConfig && content_headerConfig.fixed) {
                    if (content_headerConfig.width === POSITION.FULL && rightConfig.height != POSITION.FULL) {
                        rightStyle.marginTop = content_headerConfig.height;
                    }
                }
            }

            var rNode = rightNode || parentNode;
            styles.push({ name: PARTS.RIGHT, parent: rNode, style: rightStyle });
        }

        // ------------------------------bottom--------------------------------------
        var bottomConfig = cfg[PARTS.BOTTOM];
        if (bottomConfig) {
            var bottomStyle = {
                flex: ' 0 0 ' + bottomConfig.height,
                order: 1
            };
            if (bottomConfig.fixed) {
                bottomStyle = {
                    position: getFixedPosition(),
                    width: '100%',
                    zIndex: bottomConfig.zIndex,
                    height: bottomConfig.height,
                    bottom: 0
                };
            }
            if (bottomNode === mainNode && integration.width) {
                if (!isFull(PARTS.BOTTOM, cfg) && isFullModel) {
                    // 非全屏情况
                    bottomStyle.marginLeft = integration.width;
                }
            }
            styles.push({ name: PARTS.BOTTOM, parent: bottomNode, style: bottomStyle });
        }
        return arrayToTree(styles, { keyFiled: 'name' });
    };

    // 转换子节点到树
    var childrenToTree = function childrenToTree(children, name) {
        var tree = {};
        if (!children) return tree;
        if (!Array.isArray(children)) {
            // 兼容react单个子元素是对象
            children = [children];
        }
        children.map(function (child, index) {
            var tName = child.props[name] || ORDER[index];
            tree[tName] = child;
        });
        return tree;
    };

    var createPart = function createPart(config, child, childrenMap) {
        return _react2.default.createElement(
            'div',
            { key: config.name,
                style: config.style,
                className: classNamePrefix + config.name },
            child || childrenMap[config.name]
        );
    };

    var createDom = function createDom(styleTree, childrenMap, cfg) {
        if (!styleTree || !styleTree.length) return null;
        var dom = [];
        styleTree.map(function (config) {
            var child = config.children && config.children.length && createDom(config.children, childrenMap, cfg);
            var partDom = createPart(config, child, childrenMap);
            dom.push(partDom);
        });
        return dom;
    };

    var childrenMap = childrenToTree(children, targetName);
    var styleTree = calcStyle(cfg);
    return createDom(styleTree, childrenMap, cfg);
};

Layout.PropTypes = {
    classNamePrefix: _propTypes2.default.string,
    targetName: _propTypes2.default.string,
    config: _propTypes2.default.object
};

exports.default = Layout;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(3)();
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(4);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=app-layout.js.map