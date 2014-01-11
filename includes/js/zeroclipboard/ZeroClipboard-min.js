/*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
* Copyright (c) 2013 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v1.3.0-beta.1
*/
!function(){"use strict";function a(a){return parseFloat(a.replace(/,/g,".").replace(/[^0-9\.]/g,""))>=10}var b,c=[],d={global:{noflash:null,wrongflash:null,version:"0.0.0"},clients:{}},e=function(){var a=/\-([a-z])/g,b=function(a,b){return b.toUpperCase()};return function(c){return c.replace(a,b)}}(),f=function(a,b){var c,d,f;return window.getComputedStyle?c=window.getComputedStyle(a,null).getPropertyValue(b):(d=e(b),c=a.currentStyle?a.currentStyle[d]:a.style[d]),"cursor"!==b||c&&"auto"!==c||(f=a.tagName.toLowerCase(),"a"!==f)?c:"pointer"},g=function(a){if(x.prototype._singleton){a||(a=window.event);var b;this!==window?b=this:a.target?b=a.target:a.srcElement&&(b=a.srcElement),x.prototype._singleton.setCurrent(b)}},h=function(a,b,c){a&&1===a.nodeType&&(a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c))},i=function(a,b,c){a&&1===a.nodeType&&(a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c))},j=function(a,b){if(!a||1!==a.nodeType)return a;if(a.classList)return a.classList.contains(b)||a.classList.add(b),a;if(b&&"string"==typeof b){var c=(b||"").split(/\s+/);if(1===a.nodeType)if(a.className){for(var d=" "+a.className+" ",e=a.className,f=0,g=c.length;g>f;f++)d.indexOf(" "+c[f]+" ")<0&&(e+=" "+c[f]);a.className=e.replace(/^\s+|\s+$/g,"")}else a.className=b}return a},k=function(a,b){if(!a||1!==a.nodeType)return a;if(a.classList)return a.classList.contains(b)&&a.classList.remove(b),a;if(b&&"string"==typeof b||void 0===b){var c=(b||"").split(/\s+/);if(1===a.nodeType&&a.className)if(b){for(var d=(" "+a.className+" ").replace(/[\n\t]/g," "),e=0,f=c.length;f>e;e++)d=d.replace(" "+c[e]+" "," ");a.className=d.replace(/^\s+|\s+$/g,"")}else a.className=""}return a},l=function(){var a,b,c,d=1;return"function"==typeof document.body.getBoundingClientRect&&(a=document.body.getBoundingClientRect(),b=a.right-a.left,c=document.body.offsetWidth,d=Math.round(b/c*100)/100),d},m=function(a,b){var c={left:0,top:0,width:0,height:0,zIndex:s(b)-1};if(a.getBoundingClientRect){var d,e,f,g=a.getBoundingClientRect();"pageXOffset"in window&&"pageYOffset"in window?(d=window.pageXOffset,e=window.pageYOffset):(f=l(),d=Math.round(document.documentElement.scrollLeft/f),e=Math.round(document.documentElement.scrollTop/f));var h=document.documentElement.clientLeft||0,i=document.documentElement.clientTop||0;c.left=g.left+d-h,c.top=g.top+e-i,c.width="width"in g?g.width:g.right-g.left,c.height="height"in g?g.height:g.bottom-g.top}return c},n=function(a,b){var c=!(b&&b.useNoCache===!1);return c?(-1===a.indexOf("?")?"?":"&")+"nocache="+(new Date).getTime():""},o=function(a){var b,c,d,e=[],f=[],g=[];if(a.trustedOrigins&&("string"==typeof a.trustedOrigins?f.push(a.trustedOrigins):"object"==typeof a.trustedOrigins&&"length"in a.trustedOrigins&&(f=f.concat(a.trustedOrigins))),a.trustedDomains&&("string"==typeof a.trustedDomains?f.push(a.trustedDomains):"object"==typeof a.trustedDomains&&"length"in a.trustedDomains&&(f=f.concat(a.trustedDomains))),f.length)for(b=0,c=f.length;c>b;b++)if(f.hasOwnProperty(b)&&f[b]&&"string"==typeof f[b]){if(d=v(f[b]),!d)continue;if("*"===d){g=[d];break}g.push.apply(g,[d,"//"+d,window.location.protocol+"//"+d])}return g.length&&e.push("trustedOrigins="+encodeURIComponent(g.join(","))),"string"==typeof a.amdModuleId&&a.amdModuleId&&e.push("amdModuleId="+encodeURIComponent(a.amdModuleId)),"string"==typeof a.cjsModuleId&&a.cjsModuleId&&e.push("cjsModuleId="+encodeURIComponent(a.cjsModuleId)),e.join("&")},p=function(a,b,c){if("function"==typeof b.indexOf)return b.indexOf(a,c);var d,e=b.length;for("undefined"==typeof c?c=0:0>c&&(c=e+c),d=c;e>d;d++)if(b.hasOwnProperty(d)&&b[d]===a)return d;return-1},q=function(a){if("string"==typeof a)throw new TypeError("ZeroClipboard doesn't accept query strings.");return a.length?a:[a]},r=function(a,b,c,d,e){e?window.setTimeout(function(){a.call(b,c,d)},0):a.call(b,c,d)},s=function(a){var b,c;return a&&("number"==typeof a&&a>0?b=a:"string"==typeof a&&(c=parseInt(a,10))&&!isNaN(c)&&c>0&&(b=c)),b||("number"==typeof A.zIndex&&A.zIndex>0?b=A.zIndex:"string"==typeof A.zIndex&&(c=parseInt(A.zIndex,10))&&!isNaN(c)&&c>0&&(b=c)),b||0},t=function(a,b){if(a&&b!==!1&&"undefined"!=typeof console&&console&&(console.warn||console.log)){var c="`"+a+"` is deprecated. See docs for more info:\n    https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#deprecations";console.warn?console.warn(c):console.log(c)}},u=function(){var a,b,c,d,e,f,g=arguments[0]||{};for(a=1,b=arguments.length;b>a;a++)if(null!=(c=arguments[a]))for(d in c)if(c.hasOwnProperty(d)){if(e=g[d],f=c[d],g===f)continue;void 0!==f&&(g[d]=f)}return g},v=function(a){if(null==a)return null;if(a=a.replace(/^\s+|\s+$/g,""),""===a)return null;var b=a.indexOf("//");a=-1===b?a:a.slice(b+2);var c=a.indexOf("/");return a=-1===c?a:-1===b||0===c?null:a.slice(0,c),a&&".swf"===a.slice(-4).toLowerCase()?null:a||null},w=function(){var a=function(a,b){var c,d,e;if(null!=a&&"*"!==b[0]&&("string"==typeof a&&(a=[a]),"object"==typeof a&&"length"in a))for(c=0,d=a.length;d>c;c++)if(a.hasOwnProperty(c)&&(e=v(a[c]))){if("*"===e){b.length=0,b.push("*");break}-1===p(e,b)&&b.push(e)}},b={always:"always",samedomain:"sameDomain",never:"never"};return function(c,d){var e,f=d.allowScriptAccess;if("string"==typeof f&&(e=f.toLowerCase())&&/^always|samedomain|never$/.test(e))return b[e];var g=v(d.moviePath);null===g&&(g=c);var h=[];a(d.trustedOrigins,h),a(d.trustedDomains,h);var i=h.length;if(i>0){if(1===i&&"*"===h[0])return"always";if(-1!==p(c,h))return 1===i&&c===g?"sameDomain":"always"}return"never"}}(),x=function(a,b){return a&&(x.prototype._singleton||this).glue(a),x.prototype._singleton?x.prototype._singleton:(x.prototype._singleton=this,b&&t("new ZeroClipboard(elements, options)",this.options.debug),this.options=u({},A,b),this.handlers={},"boolean"!=typeof d.global.noflash&&(d.global.noflash=!z()),d.clients.hasOwnProperty(this.options.moviePath)||(d.clients[this.options.moviePath]={ready:!1}),d.global.noflash===!1&&D(),void 0)};x.prototype.setCurrent=function(a){b=a,E.call(this);var c=a.getAttribute("title");c&&this.setTitle(c);var d=this.options.forceHandCursor===!0||"pointer"===f(a,"cursor");return y.call(this,d),this},x.prototype.setText=function(a){return a&&""!==a&&(this.options.text=a,this.ready()&&this.flashBridge.setText(a)),this},x.prototype.setTitle=function(a){return a&&""!==a&&this.htmlBridge.setAttribute("title",a),this},x.prototype.setSize=function(a,b){return this.ready()&&this.flashBridge.setSize(a,b),this};var y=function(a){this.ready()&&this.flashBridge.setHandCursor(a)},z=function(){var a=!1;if("boolean"==typeof d.global.noflash)a=d.global.noflash===!1;else{if("function"==typeof ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(a=!0)}catch(b){}!a&&navigator.mimeTypes["application/x-shockwave-flash"]&&(a=!0)}return a};x.version="1.3.0-beta.1";var A={moviePath:"ZeroClipboard.swf",trustedDomains:[window.location.host],text:null,useNoCache:!0,forceHandCursor:!1,zIndex:999999999,debug:!0};x.setDefaults=function(a){u(A,a)},x.destroy=function(){if(x.prototype._singleton){x.prototype._singleton.unglue(c);var a=x.prototype._singleton.htmlBridge;a&&a.parentNode&&a.parentNode.removeChild(a),delete x.prototype._singleton}};var B=null,C=null,D=function(){var a,b,c=x.prototype._singleton,d=document.getElementById("global-zeroclipboard-html-bridge");if(!d){var e=u({},c.options);e.amdModuleId=B,e.cjsModuleId=C;var f=w(window.location.host,c.options),g=o(e),h='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+c.options.moviePath+n(c.options.moviePath,c.options)+'"/>         <param name="allowScriptAccess" value="'+f+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+g+'"/>         <embed src="'+c.options.moviePath+n(c.options.moviePath,c.options)+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="'+f+'"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+g+'"           scale="exactfit">         </embed>       </object>';d=document.createElement("div"),d.id="global-zeroclipboard-html-bridge",d.setAttribute("class","global-zeroclipboard-container"),d.style.position="absolute",d.style.left="0px",d.style.top="-9999px",d.style.width="15px",d.style.height="15px",d.style.zIndex=""+s(c.options.zIndex),document.body.appendChild(d),d.innerHTML=h}c.htmlBridge=d,a=document["global-zeroclipboard-flash-bridge"],a&&(b=a.length)&&(a=a[b-1]),c.flashBridge=a||d.children[0].lastElementChild};x.prototype.resetBridge=function(){return this.htmlBridge&&(this.htmlBridge.style.left="0px",this.htmlBridge.style.top="-9999px",this.htmlBridge.removeAttribute("title")),b&&(k(b,this.options.activeClass),b=null),this.options.text=null,this},x.prototype.ready=function(){return d.clients[this.options.moviePath].ready===!0};var E=function(){if(b){var a=m(b,this.options.zIndex);this.htmlBridge.style.top=a.top+"px",this.htmlBridge.style.left=a.left+"px",this.htmlBridge.style.width=a.width+"px",this.htmlBridge.style.height=a.height+"px",this.htmlBridge.style.zIndex=a.zIndex+1,this.setSize(a.width,a.height)}return this};x.dispatch=function(a,b){if("string"==typeof a&&a){var c=x.prototype._singleton,d=a.toLowerCase().replace(/^on/,"");d&&F.call(c,d,b)}},x.prototype.on=function(a,b){for(var c=a.toString().split(/\s+/),e={},f=0,g=c.length;g>f;f++)a=c[f].toLowerCase().replace(/^on/,""),e[a]=!0,this.handlers[a]||(this.handlers[a]=[]),this.handlers[a].push(b);return e.noflash&&d.global.noflash&&F.call(this,"onNoFlash",{}),e.wrongflash&&d.global.wrongflash&&F.call(this,"onWrongFlash",{flashVersion:d.global.version}),e.load&&d.clients[this.options.moviePath].ready&&F.call(this,"onLoad",{flashVersion:d.global.version}),this},x.prototype.addEventListener=x.prototype.on,x.prototype.off=function(a,b){var c,d,e,f,g=a.toString().split(/\s+/);for(c=0,d=g.length;d>c;c++)if(a=g[c].toLowerCase().replace(/^on/,""),e=this.handlers[a],e&&e.length)if(b)for(f=p(b,e);-1!==f;)e.splice(f,1),f=p(b,e,f);else this.handlers[a].length=0;return this},x.prototype.removeEventListener=x.prototype.off;var F=function(c,e){c=c.toString().toLowerCase().replace(/^on/,"");var f=b,g=!0;switch(c){case"load":if(e&&e.flashVersion){if(!a(e.flashVersion))return F.call(this,"onWrongFlash",{flashVersion:e.flashVersion}),void 0;d.clients[this.options.moviePath].ready=!0,d.global.version=e.flashVersion}break;case"wrongflash":e&&e.flashVersion&&!a(e.flashVersion)&&(d.global.wrongflash=!0,d.global.version=e.flashVersion);break;case"mouseover":j(f,this.options.hoverClass);break;case"mouseout":k(f,this.options.hoverClass),this.resetBridge();break;case"mousedown":j(f,this.options.activeClass);break;case"mouseup":k(f,this.options.activeClass);break;case"datarequested":var h=f.getAttribute("data-clipboard-target"),i=h?document.getElementById(h):null;if(i){var l=i.value||i.textContent||i.innerText;l&&this.setText(l)}else{var m=f.getAttribute("data-clipboard-text");m&&this.setText(m)}g=!1;break;case"complete":this.options.text=null}var n=this.handlers[c];if(n&&n.length){var o,p,q;for(o=0,p=n.length;p>o;o++)q=n[o],"string"==typeof q&&"function"==typeof window[q]&&(q=window[q]),"function"==typeof q&&r(q,f,this,e,g)}};x.prototype.glue=function(a){a=q(a);for(var b=0;b<a.length;b++)a.hasOwnProperty(b)&&a[b]&&1===a[b].nodeType&&-1===p(a[b],c)&&(c.push(a[b]),h(a[b],"mouseover",g));return this},x.prototype.unglue=function(a){a=q(a);for(var b=0;b<a.length;b++)if(a.hasOwnProperty(b)&&a[b]&&1===a[b].nodeType){i(a[b],"mouseover",g);var d=p(a[b],c);-1!==d&&c.splice(d,1)}return this},A.hoverClass="zeroclipboard-is-hover",A.activeClass="zeroclipboard-is-active",A.trustedOrigins=null,A.allowScriptAccess=null,x.detectFlashSupport=function(){var a=x.prototype._singleton&&x.prototype._singleton.options.debug||A.debug;return t("ZeroClipboard.detectFlashSupport",a),z()},x.prototype.setHandCursor=function(a){return t("ZeroClipboard.prototype.setHandCursor",this.options.debug),a="boolean"==typeof a?a:!!a,y.call(this,a),this.options.forceHandCursor=a,this},x.prototype.reposition=function(){return t("ZeroClipboard.prototype.reposition",this.options.debug),E.call(this)},x.prototype.receiveEvent=function(a,b){if(t("ZeroClipboard.prototype.receiveEvent",this.options.debug),"string"==typeof a&&a){var c=a.toLowerCase().replace(/^on/,"");c&&F.call(this,c,b)}},"function"==typeof define&&define.amd?define(["require","exports","module"],function(a,b,c){return B=c&&c.id||null,x}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?(C=module.id||null,module.exports=x):window.ZeroClipboard=x}();