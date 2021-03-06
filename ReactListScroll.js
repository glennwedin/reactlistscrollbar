import React from 'react';
import ReactDOM from 'react-dom';

class ReactListScroll extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			draggerPos: 0,
		  	startpos: 0,      //Used to define the draggerposition on mouse down
		  	pct: 0,
		  	action: null,
		  	height: parseInt(props.height) || '200',
		  	contentHeight: 0, //Placeholder for internal use
		  	scrollerHeight: 40,
		  	mouseoffset: 0,
		  	touchoffset: 0,
		  	speed: props.speed || 6
		}
  }

	componentDidMount() {
		this.scroll = this.scroll.bind(this);
		this.releaseDragger = this.releaseDragger.bind(this);

		window.addEventListener('mouseup', this.releaseDragger);
		window.addEventListener('touchend', this.releaseDragger);
  }
	
	componentWillUnmount() {
    window.removeEventListener('mouseup', this.releaseDragger);
		window.removeEventListener('touchend', this.releaseDragger);
  }

  componentDidUpdate(prevProps, prevState) {
		//let el = ReactDOM.findDOMNode(this),
		let contentHeight = ReactDOM.findDOMNode(this).querySelector('.ReactListScroll-content').clientHeight;
		if(prevState.contentHeight !== contentHeight) {
	  	//let speed = (contentHeight / this.state.height);
			this.setState({
				contentHeight: contentHeight
				//speed: speed
	  	});
		}
 	}

	over() {
		ReactDOM.findDOMNode(this).classList.add('hover');
	}

  out() {
		ReactDOM.findDOMNode(this).classList.remove('hover');
  }

	toggleMoveListener () {
		if(this.state.action === 'down') {
			window.addEventListener('mousemove', this.scroll);
		} else if(this.state.action === 'up'){
			window.removeEventListener('mousemove', this.scroll)
		}
	}

	setTouchOffset(e) {
		let offset = e.touches[0].clientY;
		this.setState({
	  		touchoffset: offset
		});
	}

  clickDragger(e) {
		this.setState({
			action: 'down',
			mouseoffset: e.clientY - ReactDOM.findDOMNode(this).offsetTop - this.state.draggerPos
		}, () => {
			this.toggleMoveListener();
		})
	}

	releaseDragger(e) {
		this.setState({
			action: 'up',
			mouseoffset: 0
		}, () => {
			this.toggleMoveListener();
		});
	}

	scroll(e) {
		let y;
		e.preventDefault();
		if(e.deltaY) {
			//Mousewheel-SCROLL
			//Stolen from https://www.sitepoint.com/html5-javascript-mouse-wheel/
			let delta = Math.max(-1, Math.min(1, (e.deltaY || -e.detail)));
			y = this.state.draggerPos + (delta*this.state.speed);
		} else if(e.touches) {
			//TOUCHSCROLL
			let delta = this.state.touchoffset - e.touches[0].clientY;
			y = this.state.draggerPos + (delta);
		} else if(e.clientY) {
			//DRAG scrolldragger
			//calculate delta with positive or negative
			let fromtop = ReactDOM.findDOMNode(this).getBoundingClientRect().top, //Y er undefined i chrome
			delta = e.clientY - this.state.draggerPos;
			y = this.state.draggerPos + delta - fromtop - this.state.mouseoffset;
		}

		if(y <= 0) {
			y = 0;
		} else if (y >= this.state.height - this.state.scrollerHeight) {
			y = this.state.height - this.state.scrollerHeight;
		}

		this.setState({
			pct: (y/this.state.height)*100,
			draggerPos: y,
			touchoffset: (e.touches) ? e.touches[0].clientY : 0
		});
	}

	render() {
		return(
			<div className="ReactListScroll"
				style={listStyles(this.state.height)}
				onMouseOut={this.out.bind(this)}
				onMouseOver={this.over.bind(this)}
				onTouchStart={this.setTouchOffset.bind(this)}
				onTouchMove={this.scroll.bind(this)}
				onWheel={this.scroll.bind(this)}>
				<div className="ReactListScroll-scrollerwrap" style={scrollerwrapStyles()}>
					<div className="ReactListScroll-scroller" style={scrollerStyles({y:this.state.draggerPos, height:this.state.scrollerHeight})} onMouseDown={this.clickDragger.bind(this)}></div>
				</div>
				<div className="ReactListScroll-content" style={contentStyles(this.state.pct)}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

let listStyles = (height) => {
	return{
		height: height+'px',
		overflow: 'hidden',
		position: 'relative',
		maxWidth: '300px',
		margin: '1em'
	}
}
let scrollerwrapStyles = () => {
	return{
		width: '12px',
		height: '100%',
		position: 'absolute',
		backgroundColor: '#aaa',
		right: '0px'
  	}
}
let scrollerStyles = (data) => {
	return{
		position: 'absolute',
		width: '7px',
		height: data.height+'px',
		right: '0px',
		left: '0px',
		right: '0px',
		margin: 'auto',
		backgroundColor: '#000',
		transform: 'translate3D(0,'+data.y+'px, 0)',
		borderRadius: '10px',
		cursor: 'pointer'
	}
}
let contentStyles = (pct) => {
	return {
		position: 'absolute',
		zIndex: -1,
		padding: '0 1em 0 0',
		transform: 'translate3d(0, -'+pct+'%, 0)'
	}
}

module.exports = ReactListScroll;
