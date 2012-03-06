/*
parent = element.parentNode
clone = element.cloneNode(true)
next = element.nextSibling
html = element.innerHTML
addClass = element.classList.add("foo")
removeClass = element.classList.remove("foo")
toggleClass = element.classList.toggle("foo")
attr = element.getAttribute("foo") 
*/function formatCurrency(a){console.log(a)}var nilla=function(){var a={};a.attrs=function(a,b){for(var c in b)c=="html"?a.innerHTML=b[c]:a.setAttribute(c,b[c]);return a};a.bind=function(b,c,d){typeof b=="string"&&(b=a.find(b));a.each(b,function(a){a.addEventListener(c,d)});return b};a.create=function(b,c){c||(c={});var d=document.createElement(b);a.attrs(d,c);return d};a.each=function(b,c){typeof b=="string"&&(b=a.find(b));[].forEach.call(b,c);return b};a.empty=function(a){while(a.firstChild)a.removeChild(a.firstChild);return a};a.find=function(a){var b=[];a.substring(0,1)=="#"?b=[document.getElementById(a.replace("#",""))]:b=document.querySelectorAll(a);return b};a.lastOfType=function(b,c){var d=[];a.each(b,function(a){var b=a.querySelectorAll(c);if(b.length>0){var e=b.length-1;d.push(b[e])}});return d};a.load=function(a){var b=document.createElement("script");b.src=a;document.body.appendChild(b)};return a}();document.addEventListener("DOMContentLoaded",function(){var a=nilla.create("a",{href:"#",html:"click me"}),b=nilla.create("p",{id:"test","class":"red",html:"<strong>here we go!</strong> <em>woot</em>."});b.appendChild(a);document.body.appendChild(b);nilla.each("ul li",function(a){console.log(a)});nilla.bind("ul li","click",function(a){console.log(a.srcElement.textContent)});lis=nilla.lastOfType("ul","li");nilla.each(lis,function(a){nilla.attrs(a,{style:"color:red"})});nilla.load("http://openexchangerates.org/latest.json?callback=formatCurrency")});