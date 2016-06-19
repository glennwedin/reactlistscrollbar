/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactListScroll = function (_React$Component) {
	  _inherits(ReactListScroll, _React$Component);

	  function ReactListScroll(props) {
	    _classCallCheck(this, ReactListScroll);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactListScroll).call(this, props));

	    _this.state = {
	      draggerPos: 0,
	      startpos: 0, //Used to define the draggerposition on mouse down
	      pct: 0,
	      action: null,
	      height: parseInt(props.height) || '200',
	      contentHeight: 0, //Placeholder for internal use
	      scrollerHeight: 40,
	      mouseoffset: 0,
	      touchoffset: 0,
	      speed: props.speed || 6
	    };

	    _this.scroll = _this.scroll.bind(_this);
	    _this.releaseDragger = _this.releaseDragger.bind(_this);
	    return _this;
	  }

	  _createClass(ReactListScroll, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('mouseup', this.releaseDragger);
	      window.addEventListener('touchend', this.releaseDragger);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      //let el = ReactDOM.findDOMNode(this),
	      var contentHeight = ReactDOM.findDOMNode(this).querySelector('.ReactListScroll-content').clientHeight;
	      if (prevState.contentHeight !== contentHeight) {
	        //let speed = (contentHeight / this.state.height);

	        this.setState({
	          contentHeight: contentHeight
	          //speed: speed
	        });
	      }
	    }
	  }, {
	    key: 'over',
	    value: function over() {
	      ReactDOM.findDOMNode(this).classList.add('hover');
	    }
	  }, {
	    key: 'out',
	    value: function out() {
	      ReactDOM.findDOMNode(this).classList.remove('hover');
	    }
	  }, {
	    key: 'toggleMoveListener',
	    value: function toggleMoveListener() {
	      if (this.state.action === 'down') {
	        window.addEventListener('mousemove', this.scroll);
	        //window.addEventListener('touchmove', this.scroll);
	      } else if (this.state.action === 'up') {
	          window.removeEventListener('mousemove', this.scroll);
	          //window.removeEventListener('touchmove', this.scroll)
	        }
	    }
	  }, {
	    key: 'setTouchOffset',
	    value: function setTouchOffset(e) {
	      var offset = e.touches[0].clientY;
	      this.setState({
	        touchoffset: offset
	      });
	    }
	  }, {
	    key: 'clickDragger',
	    value: function clickDragger(e) {
	      var _this2 = this;

	      this.setState({
	        action: 'down',
	        mouseoffset: e.clientY - ReactDOM.findDOMNode(this).offsetTop - this.state.draggerPos
	      }, function () {
	        _this2.toggleMoveListener();
	      });
	    }
	  }, {
	    key: 'releaseDragger',
	    value: function releaseDragger(e) {
	      var _this3 = this;

	      this.setState({
	        action: 'up',
	        mouseoffset: 0
	      }, function () {
	        _this3.toggleMoveListener();
	      });
	    }
	  }, {
	    key: 'scroll',
	    value: function scroll(e) {
	      var y = void 0;
	      e.preventDefault();
	      if (e.deltaY) {
	        //Mousewheel-SCROLL
	        //Stolen from https://www.sitepoint.com/html5-javascript-mouse-wheel/
	        var delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
	        y = this.state.draggerPos + delta * this.state.speed;
	      } else if (e.touches) {
	        //TOUCHSCROLL
	        //MÅ ha delta for å vite retning
	        var _delta = this.state.touchoffset - e.touches[0].clientY;
	        console.log(_delta);
	        y = this.state.draggerPos + _delta;
	      } else if (e.clientY) {
	        //DRAG scrolldragger
	        //calculate delta with positive or negative
	        var fromtop = ReactDOM.findDOMNode(this).getBoundingClientRect().top,
	            //Y er undefined i chrome
	        _delta2 = e.clientY - this.state.draggerPos;
	        y = this.state.draggerPos + _delta2 - fromtop - this.state.mouseoffset;
	      }

	      if (y <= 0) {
	        y = 0;
	      } else if (y >= this.state.height - this.state.scrollerHeight) {
	        y = this.state.height - this.state.scrollerHeight;
	      }

	      this.setState({
	        pct: y / this.state.height * 100,
	        draggerPos: y,
	        touchoffset: e.touches ? e.touches[0].clientY : 0
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'ReactListScroll',
	          style: listStyles(this.state.height),
	          onMouseOut: this.out.bind(this),
	          onMouseOver: this.over.bind(this),
	          onTouchStart: this.setTouchOffset.bind(this),
	          onTouchMove: this.scroll.bind(this),
	          onWheel: this.scroll.bind(this) },
	        React.createElement(
	          'div',
	          { className: 'ReactListScroll-scrollerwrap', style: scrollerwrapStyles() },
	          React.createElement('div', { className: 'ReactListScroll-scroller', style: scrollerStyles({ y: this.state.draggerPos, height: this.state.scrollerHeight }), onMouseDown: this.clickDragger.bind(this) })
	        ),
	        React.createElement(
	          'div',
	          { className: 'ReactListScroll-content', style: contentStyles(this.state.pct) },
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return ReactListScroll;
	}(React.Component);

	var listStyles = function listStyles(height) {
	  return {
	    height: height + 'px',
	    overflow: 'hidden',
	    position: 'relative',
	    maxWidth: '300px',
	    margin: '1em'
	  };
	};
	var scrollerwrapStyles = function scrollerwrapStyles() {
	  return {
	    width: '12px',
	    height: '100%',
	    position: 'absolute',
	    backgroundColor: '#aaa',
	    right: '0px'
	  };
	};
	var scrollerStyles = function scrollerStyles(data) {
	  var _ref;

	  return _ref = {
	    position: 'absolute',
	    width: '7px',
	    height: data.height + 'px',
	    right: '0px',
	    left: '0px'
	  }, _defineProperty(_ref, 'right', '0px'), _defineProperty(_ref, 'margin', 'auto'), _defineProperty(_ref, 'backgroundColor', '#000'), _defineProperty(_ref, 'transform', 'translate3D(0,' + data.y + 'px, 0)'), _defineProperty(_ref, 'borderRadius', '10px'), _defineProperty(_ref, 'cursor', 'pointer'), _ref;
	};
	var contentStyles = function contentStyles(pct) {
	  return {
	    position: 'absolute',
	    zIndex: -1,
	    transform: 'translate3d(0, -' + pct + '%, 0)'
	  };
	};

	//export default ReactListScroll;

	var content = React.createElement(
	  ReactListScroll,
	  null,
	  React.createElement(
	    'p',
	    null,
	    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non eleifend urna. Sed euismod felis ut augue maximus mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam ullamcorper nisi vitae nibh faucibus, sed vestibulum lacus ornare. Phasellus vel interdum odio. Nunc commodo laoreet libero, in suscipit nisi rhoncus vel. Donec varius ornare magna, sit amet feugiat lacus molestie ut. Cras at tempus augue.'
	  ),
	  React.createElement(
	    'p',
	    null,
	    'Donec fermentum ac mauris in gravida. Nullam fringilla risus id mauris mollis posuere. Etiam blandit ligula nibh, non aliquam quam vestibulum sit amet. Sed aliquet posuere finibus. Vivamus sodales massa velit, nec semper justo pulvinar ac. Fusce porttitor viverra maximus. Vestibulum condimentum luctus venenatis. Morbi vel quam condimentum, pellentesque enim in, posuere ante. Ut in nulla sit amet ligula maximus bibendum sed a tellus. Cras aliquet id leo in sollicitudin.'
	  )
	);

	ReactDOM.render(content, document.getElementById('app'));

/***/ }
/******/ ]);