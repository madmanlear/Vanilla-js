/*
This is a small class for replicating the most often-used (by me, at least) jQuery functionality in 2kb. Examples follow.
Includes:
  * Find elements
  * Create element
  * Update attributes for element
  * Iterate through elements with callback
  * Bind events with callback
  * Empty children from element
  * Load script

Other useful shortcuts build into js:
parent = element.parentNode
clone = element.cloneNode(true)
next = element.nextSibling
html = element.innerHTML
addClass = element.classList.add("foo")
removeClass = element.classList.remove("foo")
toggleClass = element.classList.toggle("foo")
attr = element.getAttribute("foo") 
*/

var nilla = (function() {
	var v = {};
	//Add attrs and text to element
	v.attrs = function(element, attrs) {
		for(var i in attrs) {
			if(i == 'html') {
				element.innerHTML = attrs[i];
			} else {
			  element.setAttribute(i, attrs[i]);	
			}
		}
		return element;
	};
	//Bind an event to elements
	v.bind = function(els, e_type, callback) {
		if(typeof els == 'string') {
			els = v.find(els);
		}
		v.each(els, function(el) {
		  el.addEventListener(e_type, callback);
		});
		return els;
	};
	//Make new element and all attributes and html
	v.create = function(selector, attrs) {
		if(!attrs) attrs = {};
		var res = document.createElement(selector);
		v.attrs(res, attrs);
		return res;
	};
	//Iterate through elements and apply a callback function to each
	v.each = function(els, callback) {
		if(typeof els == 'string') {
			els = v.find(els);
		}
		[].forEach.call(els, callback);
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
		if(selector.substring(0,1) == '#') {
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
	}
	//Load script
	v.load = function(script) {
		var scr = document.createElement('script');
		scr.src = script;
		document.body.appendChild(scr);
	}
	return v;
})();


//JSONP Test callback
function formatCurrency(data) {
	console.log(data);
}

//Doc Ready
document.addEventListener("DOMContentLoaded", function() {
	var a = nilla.create('a', {
		href: '#',
		html: 'click me'
	});
	var p = nilla.create('p', {
		id: 'test',
		class: 'red',
		html: '<strong>here we go!</strong> <em>woot</em>.'
	});
	p.appendChild(a);
	document.body.appendChild(p);
	nilla.each('ul li', function(el) {
		console.log(el);
	});
	nilla.bind('ul li', 'click', function(e) {
		console.log(e.srcElement.textContent);
	});
	lis = nilla.lastOfType('ul', 'li');
	nilla.each(lis, function(li) {
		nilla.attrs(li, {style: 'color:red'});
	});
	nilla.load('http://openexchangerates.org/latest.json?callback=formatCurrency');
});