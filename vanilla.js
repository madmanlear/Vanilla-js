var nilla = (function() {
	var v = {};
	//Add attrs and text to element
	v.attrs = function(element, attrs) {
		for(var i in attrs) {
			if(i === 'html') {
				element.innerHTML = attrs[i];
			} else {
				element.setAttribute(i, attrs[i]);
			}
		}
		return element;
	};
	//Bind an event to elements
	v.bind = function(els, e_type, callback) {
		if(typeof els === 'string') {
			els = v.find(els);
		}
		v.each(els, function(el) {
			if (!el.addEventListener) {
				el.attachEvent('on'+e_type, callback);
			} else {
				el.addEventListener(e_type, callback, false);
			}
		});
		return els;
	};
	//Make new element and all attributes and html
	v.create = function(selector, attrs) {
		if(!attrs) { attrs = {}; }
		var res = document.createElement(selector);
		v.attrs(res, attrs);
		return res;
	};
	//Iterate through elements and apply a callback function to each
	v.each = function(els, callback) {
		if(typeof els === 'string') {
			els = v.find(els);
		}
		for(var i=0; i<els.length; i++){
			callback(els[i]);
		}
		//[].forEach.call(els, callback);
		return els;
	};
	//Remove all children from element
	v.empty = function(element) {
		while(element.firstChild) {
			element.removeChild(element.firstChild);
		}
		return element;
	};
	//DOM selector
	v.find = function(selector) {
		var res = [];
		if(selector.substring(0,1) === '#') {
			//Find by id
			res = [document.getElementById(selector.replace('#', ''))];
		} else {
			//Find by all
			res = document.querySelectorAll(selector);
		}
		return res;
	};
	//Return each last child of type from each parent element found
	//NOT the same as jQuery's last-child support
	v.lastOfType = function(parent, selector) {
		var res = [];
		v.each(parent, function(p) {
			var kids = p.querySelectorAll(selector);
			if(kids.length > 0) {
				var index = kids.length - 1;
				res.push(kids[index]);
			}
		});
		return res;
	};
	//Load script
	v.load = function(script) {
		var scr = document.createElement('script');
		scr.src = script;
		document.body.appendChild(scr);
	};
	//Get and set text
	v.text = function(element, text) {
		if(text) {
			if(element.textContent) {
				element.textContent = text;
			} else {
				element.innerText = text;
			}
		} else {
			return element.textContent || element.innerText;
		}
	};
	//Document Ready
	v.docReady = function(callback) {
		if(document.addEventListener) {
			document.addEventListener('DOMContentLoaded', function() {
				document.removeEventListener("DOMContentLoaded", callback, false);
				callback();
			}, false);
		} else if(document.attachEvent) {
			document.attachEvent('onreadystatechange', function(){
				if (document.readyState === "complete") {
					document.detachEvent("onreadystatechange", callback);
					callback();
				}
			});
		}
	};
	return v;
})();