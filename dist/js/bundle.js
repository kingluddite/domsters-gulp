function addLoadEvent( func ) {
  console.log('owew');
  var oldonload = window.onload;
  if ( typeof window.onload != 'function' ) {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function insertAfter( newElement, targetElement ) {
  var parent = targetElement.parentNode;
  if ( parent.lastChild == targetElement ) {
    parent.appendChild( newElement );
  } else {
    parent.insertBefore( newElement, targetElement.nextSibling );
  }
}

function addClass( element, value ) {
  if ( !element.className ) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

function highlightPage() {
  if ( !document.getElementsByTagName ) return false;
  if ( !document.getElementById ) return false;
  if ( !document.getElementById( "navigation" ) ) return false;
  var nav = document.getElementById( "navigation" );
  var links = nav.getElementsByTagName( "a" );
  for ( var i = 0; i < links.length; i++ ) {
    var linkurl = links[ i ].getAttribute( "href" );
    var currenturl = window.location.href;
    if ( currenturl.indexOf( linkurl ) != -1 ) {
      links[ i ].className = "here";
      var linktext = links[ i ].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute( "id", linktext );
    }
  }
}

addLoadEvent( highlightPage );

function showSection( id ) {
  'use strict';
  console.log('test');
  var divs = document.getElementsByTagName( 'div' );
  for ( var i = 0; i < divs.length; i++ ) {
    if ( divs[ i ].className.indexOf( 'section' ) === -1 ) {
      continue;
    }
    if ( divs[ i ].getAttribute( 'id' ) !== id ) {
      divs[ i ].style.display = 'none';
    } else {
      divs[ i ].style.display = 'block';
    }
  }
}

function prepareInternalNav() {
  'use strict';
  if ( !document.getElementsByTagName ) {
    return false;
  }
  if ( !document.getElementById ) {
    return false;
  }
  if ( !document.getElementById( 'internal-nav' ) ) {
    return false;
  }
  var nav = document.getElementById( 'internal-nav' );
  var links = nav.getElementsByTagName( 'a' );
  for ( var i = 0; i < links.length; i++ ) {
    var sectionId = links[ i ].getAttribute( 'href' ).split( '#' )[ 1 ];
    if ( !document.getElementById( sectionId ) ) {
      continue;
    }
    document.getElementById( sectionId ).style.display = 'none';
    links[ i ].destination = sectionId;
    links[ i ].onclick = function() {
      showSection( this.destination );
      return false;
    };
  }
}

addLoadEvent( prepareInternalNav );

function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i=0; i<labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function() {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}

function resetFields(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (!element.defaultValue) continue;
    element.onfocus = function() {
    if (this.value == this.defaultValue) {
      this.value = "";
     }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.value = this.defaultValue;
      }
    }
  }
}

function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.className.indexOf("required") != -1) {
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.className.indexOf("email") != -1) {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

function isFilled(field) {
  if (field.value.length < 1 || field.value == field.defaultValue) {
    return false;
  } else {
    return true;
  }
}

function isEmail(field) {
  if (field.value.indexOf("@") == -1 || field.value.indexOf(".") == -1) {
    return false;
  } else {
    return true;
  }
}

function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      return validateForm(this);
    }
  }
}

addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
function moveElement( elementID, finalX, finalY, interval ) {
  'use strict';
  var elem, xPos, yPos, dist, repeat;
  if ( !document.getElementById ) {
    return false;
  }
  if ( !document.getElementById( elementID ) ) {
    return false;
  }
  elem = document.getElementById( elementID );
  if ( elem.movement ) {
    clearTimeout( elem.movement );
  }
  if ( !elem.style.left ) {
    elem.style.left = '0px';
  }
  if ( !elem.style.top ) {
    elem.style.top = '0px';
  }
  xPos = parseInt( elem.style.left );
  yPos = parseInt( elem.style.top );
  if ( xPos === finalX && yPos === finalY ) {
    return true;
  }
  if ( xPos < finalX ) {
    dist = Math.ceil( ( finalX - xPos ) / 10 );
    xPos = xPos + dist;
  }
  if ( xPos > finalX ) {
    dist = Math.ceil( ( xPos - finalX ) / 10 );
    xPos = xPos - dist;
  }
  if ( yPos < finalY ) {
    dist = Math.ceil( ( finalY - yPos ) / 10 );
    yPos = yPos + dist;
  }
  if ( yPos > finalY ) {
    dist = Math.ceil( ( yPos - finalY ) / 10 );
    yPos = yPos - dist;
  }
  elem.style.left = xPos + 'px';
  elem.style.top = yPos + 'px';
  repeat = "moveElement('" + elementID + "'," + finalX + "," + finalY + "," + interval + ")";
  elem.movement = setTimeout( repeat, interval );
}

function prepareSlideshow() {
  'use strict';
  var intro, slideshow, frame, preview, links;
  if ( !document.getElementsByTagName ) {
    return false;
  }
  if ( !document.getElementById ) {
    return false;
  }
  if ( !document.getElementById( "intro" ) ) {
    return false;
  }
  intro = document.getElementById( 'intro' );
  slideshow = document.createElement( 'div' );
  slideshow.setAttribute( 'id', 'slideshow' );
  frame = document.createElement( 'img' );
  frame.setAttribute( 'src', 'img/frame.gif' );
  frame.setAttribute( 'alt', '' );
  frame.setAttribute( 'id', 'frame' );
  slideshow.appendChild( frame );
  preview = document.createElement( 'img' );
  preview.setAttribute( 'src', 'img/slideshow.gif' );
  preview.setAttribute( 'alt', 'a glimpse of what awaits you' );
  preview.setAttribute( 'id', 'preview' );
  slideshow.appendChild( preview );
  insertAfter( slideshow, intro );
  links = document.getElementsByTagName( 'a' );
  for ( var i = 0; i < links.length; i++ ) {
    links[ i ].onmouseover = function() {
      var destination = this.getAttribute( 'href' );
      if ( destination.indexOf( 'index.html' ) !== -1 ) {
        moveElement( 'preview', 0, 0, 5 );
      }
      if ( destination.indexOf( 'about.html' ) !== -1 ) {
        moveElement( 'preview', -150, 0, 5 );
      }
      if ( destination.indexOf( 'photos.html' ) !== -1 ) {
        moveElement( 'preview', -300, 0, 5 );
      }
      if ( destination.indexOf( 'live.html' ) !== -1 ) {
        moveElement( 'preview', -450, 0, 5 );
      }
      if ( destination.indexOf( 'contact.html' ) !== -1 ) {
        moveElement( 'preview', -600, 0, 5 );
      }
    };
  }
}

addLoadEvent( prepareSlideshow );

function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this,"highlight");
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName
    }
  }
}

function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var container = document.getElementById("content");
  container.appendChild(header);
  container.appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
function showPic( whichpic ) {
  'use strict';
  var source, placeholder, text, description;
  if ( !document.getElementById( 'placeholder' ) ) {
    return true;
  }
  source = whichpic.getAttribute( 'href' );
  placeholder = document.getElementById( 'placeholder' );
  placeholder.setAttribute( 'src', source );
  if ( !document.getElementById( 'description' ) ) {
    return false;
  }
  if ( whichpic.getAttribute( 'title' ) ) {
    text = whichpic.getAttribute( 'title' );
  } else {
    text = '';
  }
  description = document.getElementById( 'description' );
  if ( description.firstChild.nodeType === 3 ) {
    description.firstChild.nodeValue = text;
  }
  return false;
}

function preparePlaceholder() {
  'use strict';
  var placeholder, description, descText, gallery;
  if ( !document.createElement ) {
    return false;
  }
  if ( !document.createTextNode ) {
    return false;
  }
  if ( !document.getElementById ) {
    return false;
  }
  if ( !document.getElementById( 'image-gallery' ) ) {
    return false;
  }
  placeholder = document.createElement( 'img' );
  placeholder.setAttribute( 'id', 'placeholder' );
  placeholder.setAttribute( 'src', 'img/placeholder.gif' );
  placeholder.setAttribute( 'alt', 'my image gallery' );
  description = document.createElement( 'p' );
  description.setAttribute( 'id', 'description' );
  descText = document.createTextNode( 'Choose an image' );
  description.appendChild( descText );
  gallery = document.getElementById( 'image-gallery' );
  insertAfter( description, gallery );
  insertAfter( placeholder, description );
}

function prepareGallery() {
  'use strict';
  var gallery, links;
  if ( !document.getElementsByTagName ) {
    return false;
  }
  if ( !document.getElementById ) {
    return false;
  }
  if ( !document.getElementById( 'image-gallery' ) ) {
    return false;
  }
  gallery = document.getElementById( 'image-gallery' );
  links = gallery.getElementsByTagName( 'a' );
  for ( var i = 0; i < links.length; i++ ) {
    links[ i ].onclick = function() {
      return showPic( this );
    };
  }
}

addLoadEvent( preparePlaceholder );
addLoadEvent( prepareGallery );

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyIsImFib3V0LmpzIiwiY29udGFjdC5qcyIsImluZGV4LmpzIiwibGl2ZS5qcyIsInBob3Rvcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYWRkTG9hZEV2ZW50KCBmdW5jICkge1xuICBjb25zb2xlLmxvZygnb3dldycpO1xuICB2YXIgb2xkb25sb2FkID0gd2luZG93Lm9ubG9hZDtcbiAgaWYgKCB0eXBlb2Ygd2luZG93Lm9ubG9hZCAhPSAnZnVuY3Rpb24nICkge1xuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIG9sZG9ubG9hZCgpO1xuICAgICAgZnVuYygpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlciggbmV3RWxlbWVudCwgdGFyZ2V0RWxlbWVudCApIHtcbiAgdmFyIHBhcmVudCA9IHRhcmdldEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgaWYgKCBwYXJlbnQubGFzdENoaWxkID09IHRhcmdldEVsZW1lbnQgKSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKCBuZXdFbGVtZW50ICk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSggbmV3RWxlbWVudCwgdGFyZ2V0RWxlbWVudC5uZXh0U2libGluZyApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKCBlbGVtZW50LCB2YWx1ZSApIHtcbiAgaWYgKCAhZWxlbWVudC5jbGFzc05hbWUgKSB7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBuZXdDbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICBuZXdDbGFzc05hbWUgKz0gXCIgXCI7XG4gICAgbmV3Q2xhc3NOYW1lICs9IHZhbHVlO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gbmV3Q2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFBhZ2UoKSB7XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lICkgcmV0dXJuIGZhbHNlO1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCApIHJldHVybiBmYWxzZTtcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwibmF2aWdhdGlvblwiICkgKSByZXR1cm4gZmFsc2U7XG4gIHZhciBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJuYXZpZ2F0aW9uXCIgKTtcbiAgdmFyIGxpbmtzID0gbmF2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImFcIiApO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbGlua3VybCA9IGxpbmtzWyBpIF0uZ2V0QXR0cmlidXRlKCBcImhyZWZcIiApO1xuICAgIHZhciBjdXJyZW50dXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgaWYgKCBjdXJyZW50dXJsLmluZGV4T2YoIGxpbmt1cmwgKSAhPSAtMSApIHtcbiAgICAgIGxpbmtzWyBpIF0uY2xhc3NOYW1lID0gXCJoZXJlXCI7XG4gICAgICB2YXIgbGlua3RleHQgPSBsaW5rc1sgaSBdLmxhc3RDaGlsZC5ub2RlVmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCBcImlkXCIsIGxpbmt0ZXh0ICk7XG4gICAgfVxuICB9XG59XG5cbmFkZExvYWRFdmVudCggaGlnaGxpZ2h0UGFnZSApO1xuIiwiZnVuY3Rpb24gc2hvd1NlY3Rpb24oIGlkICkge1xuICAndXNlIHN0cmljdCc7XG4gIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XG4gIHZhciBkaXZzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdkaXYnICk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGRpdnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYgKCBkaXZzWyBpIF0uY2xhc3NOYW1lLmluZGV4T2YoICdzZWN0aW9uJyApID09PSAtMSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoIGRpdnNbIGkgXS5nZXRBdHRyaWJ1dGUoICdpZCcgKSAhPT0gaWQgKSB7XG4gICAgICBkaXZzWyBpIF0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgZGl2c1sgaSBdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlSW50ZXJuYWxOYXYoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ludGVybmFsLW5hdicgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaW50ZXJuYWwtbmF2JyApO1xuICB2YXIgbGlua3MgPSBuYXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdhJyApO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgc2VjdGlvbklkID0gbGlua3NbIGkgXS5nZXRBdHRyaWJ1dGUoICdocmVmJyApLnNwbGl0KCAnIycgKVsgMSBdO1xuICAgIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBzZWN0aW9uSWQgKSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggc2VjdGlvbklkICkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBsaW5rc1sgaSBdLmRlc3RpbmF0aW9uID0gc2VjdGlvbklkO1xuICAgIGxpbmtzWyBpIF0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2hvd1NlY3Rpb24oIHRoaXMuZGVzdGluYXRpb24gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG59XG5cbmFkZExvYWRFdmVudCggcHJlcGFyZUludGVybmFsTmF2ICk7XG4iLCJmdW5jdGlvbiBmb2N1c0xhYmVscygpIHtcbiAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgbGFiZWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsYWJlbFwiKTtcbiAgZm9yICh2YXIgaT0wOyBpPGxhYmVscy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghbGFiZWxzW2ldLmdldEF0dHJpYnV0ZShcImZvclwiKSkgY29udGludWU7XG4gICAgbGFiZWxzW2ldLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpZCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZm9yXCIpO1xuICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldEZpZWxkcyh3aGljaGZvcm0pIHtcbiAgZm9yICh2YXIgaT0wOyBpPHdoaWNoZm9ybS5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlbGVtZW50ID0gd2hpY2hmb3JtLmVsZW1lbnRzW2ldO1xuICAgIGlmIChlbGVtZW50LnR5cGUgPT0gXCJzdWJtaXRcIikgY29udGludWU7XG4gICAgaWYgKCFlbGVtZW50LmRlZmF1bHRWYWx1ZSkgY29udGludWU7XG4gICAgZWxlbWVudC5vbmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgPT0gdGhpcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnQub25ibHVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVGb3JtKHdoaWNoZm9ybSkge1xuICBmb3IgKHZhciBpPTA7IGk8d2hpY2hmb3JtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB3aGljaGZvcm0uZWxlbWVudHNbaV07XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoXCJyZXF1aXJlZFwiKSAhPSAtMSkge1xuICAgICAgaWYgKCFpc0ZpbGxlZChlbGVtZW50KSkge1xuICAgICAgICBhbGVydChcIlBsZWFzZSBmaWxsIGluIHRoZSBcIitlbGVtZW50Lm5hbWUrXCIgZmllbGQuXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKFwiZW1haWxcIikgIT0gLTEpIHtcbiAgICAgIGlmICghaXNFbWFpbChlbGVtZW50KSkge1xuICAgICAgICBhbGVydChcIlRoZSBcIitlbGVtZW50Lm5hbWUrXCIgZmllbGQgbXVzdCBiZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0ZpbGxlZChmaWVsZCkge1xuICBpZiAoZmllbGQudmFsdWUubGVuZ3RoIDwgMSB8fCBmaWVsZC52YWx1ZSA9PSBmaWVsZC5kZWZhdWx0VmFsdWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFbWFpbChmaWVsZCkge1xuICBpZiAoZmllbGQudmFsdWUuaW5kZXhPZihcIkBcIikgPT0gLTEgfHwgZmllbGQudmFsdWUuaW5kZXhPZihcIi5cIikgPT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJlcGFyZUZvcm1zKCkge1xuICBmb3IgKHZhciBpPTA7IGk8ZG9jdW1lbnQuZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGhpc2Zvcm0gPSBkb2N1bWVudC5mb3Jtc1tpXTtcbiAgICByZXNldEZpZWxkcyh0aGlzZm9ybSk7XG4gICAgdGhpc2Zvcm0ub25zdWJtaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZUZvcm0odGhpcyk7XG4gICAgfVxuICB9XG59XG5cbmFkZExvYWRFdmVudChmb2N1c0xhYmVscyk7XG5hZGRMb2FkRXZlbnQocHJlcGFyZUZvcm1zKTsiLCJmdW5jdGlvbiBtb3ZlRWxlbWVudCggZWxlbWVudElELCBmaW5hbFgsIGZpbmFsWSwgaW50ZXJ2YWwgKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGVsZW0sIHhQb3MsIHlQb3MsIGRpc3QsIHJlcGVhdDtcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBlbGVtZW50SUQgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBlbGVtZW50SUQgKTtcbiAgaWYgKCBlbGVtLm1vdmVtZW50ICkge1xuICAgIGNsZWFyVGltZW91dCggZWxlbS5tb3ZlbWVudCApO1xuICB9XG4gIGlmICggIWVsZW0uc3R5bGUubGVmdCApIHtcbiAgICBlbGVtLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgfVxuICBpZiAoICFlbGVtLnN0eWxlLnRvcCApIHtcbiAgICBlbGVtLnN0eWxlLnRvcCA9ICcwcHgnO1xuICB9XG4gIHhQb3MgPSBwYXJzZUludCggZWxlbS5zdHlsZS5sZWZ0ICk7XG4gIHlQb3MgPSBwYXJzZUludCggZWxlbS5zdHlsZS50b3AgKTtcbiAgaWYgKCB4UG9zID09PSBmaW5hbFggJiYgeVBvcyA9PT0gZmluYWxZICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICggeFBvcyA8IGZpbmFsWCApIHtcbiAgICBkaXN0ID0gTWF0aC5jZWlsKCAoIGZpbmFsWCAtIHhQb3MgKSAvIDEwICk7XG4gICAgeFBvcyA9IHhQb3MgKyBkaXN0O1xuICB9XG4gIGlmICggeFBvcyA+IGZpbmFsWCApIHtcbiAgICBkaXN0ID0gTWF0aC5jZWlsKCAoIHhQb3MgLSBmaW5hbFggKSAvIDEwICk7XG4gICAgeFBvcyA9IHhQb3MgLSBkaXN0O1xuICB9XG4gIGlmICggeVBvcyA8IGZpbmFsWSApIHtcbiAgICBkaXN0ID0gTWF0aC5jZWlsKCAoIGZpbmFsWSAtIHlQb3MgKSAvIDEwICk7XG4gICAgeVBvcyA9IHlQb3MgKyBkaXN0O1xuICB9XG4gIGlmICggeVBvcyA+IGZpbmFsWSApIHtcbiAgICBkaXN0ID0gTWF0aC5jZWlsKCAoIHlQb3MgLSBmaW5hbFkgKSAvIDEwICk7XG4gICAgeVBvcyA9IHlQb3MgLSBkaXN0O1xuICB9XG4gIGVsZW0uc3R5bGUubGVmdCA9IHhQb3MgKyAncHgnO1xuICBlbGVtLnN0eWxlLnRvcCA9IHlQb3MgKyAncHgnO1xuICByZXBlYXQgPSBcIm1vdmVFbGVtZW50KCdcIiArIGVsZW1lbnRJRCArIFwiJyxcIiArIGZpbmFsWCArIFwiLFwiICsgZmluYWxZICsgXCIsXCIgKyBpbnRlcnZhbCArIFwiKVwiO1xuICBlbGVtLm1vdmVtZW50ID0gc2V0VGltZW91dCggcmVwZWF0LCBpbnRlcnZhbCApO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlU2xpZGVzaG93KCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBpbnRybywgc2xpZGVzaG93LCBmcmFtZSwgcHJldmlldywgbGlua3M7XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiaW50cm9cIiApICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpbnRybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaW50cm8nICk7XG4gIHNsaWRlc2hvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG4gIHNsaWRlc2hvdy5zZXRBdHRyaWJ1dGUoICdpZCcsICdzbGlkZXNob3cnICk7XG4gIGZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2ltZycgKTtcbiAgZnJhbWUuc2V0QXR0cmlidXRlKCAnc3JjJywgJ2ltZy9mcmFtZS5naWYnICk7XG4gIGZyYW1lLnNldEF0dHJpYnV0ZSggJ2FsdCcsICcnICk7XG4gIGZyYW1lLnNldEF0dHJpYnV0ZSggJ2lkJywgJ2ZyYW1lJyApO1xuICBzbGlkZXNob3cuYXBwZW5kQ2hpbGQoIGZyYW1lICk7XG4gIHByZXZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnaW1nJyApO1xuICBwcmV2aWV3LnNldEF0dHJpYnV0ZSggJ3NyYycsICdpbWcvc2xpZGVzaG93LmdpZicgKTtcbiAgcHJldmlldy5zZXRBdHRyaWJ1dGUoICdhbHQnLCAnYSBnbGltcHNlIG9mIHdoYXQgYXdhaXRzIHlvdScgKTtcbiAgcHJldmlldy5zZXRBdHRyaWJ1dGUoICdpZCcsICdwcmV2aWV3JyApO1xuICBzbGlkZXNob3cuYXBwZW5kQ2hpbGQoIHByZXZpZXcgKTtcbiAgaW5zZXJ0QWZ0ZXIoIHNsaWRlc2hvdywgaW50cm8gKTtcbiAgbGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2EnICk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrICkge1xuICAgIGxpbmtzWyBpIF0ub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZ2V0QXR0cmlidXRlKCAnaHJlZicgKTtcbiAgICAgIGlmICggZGVzdGluYXRpb24uaW5kZXhPZiggJ2luZGV4Lmh0bWwnICkgIT09IC0xICkge1xuICAgICAgICBtb3ZlRWxlbWVudCggJ3ByZXZpZXcnLCAwLCAwLCA1ICk7XG4gICAgICB9XG4gICAgICBpZiAoIGRlc3RpbmF0aW9uLmluZGV4T2YoICdhYm91dC5odG1sJyApICE9PSAtMSApIHtcbiAgICAgICAgbW92ZUVsZW1lbnQoICdwcmV2aWV3JywgLTE1MCwgMCwgNSApO1xuICAgICAgfVxuICAgICAgaWYgKCBkZXN0aW5hdGlvbi5pbmRleE9mKCAncGhvdG9zLmh0bWwnICkgIT09IC0xICkge1xuICAgICAgICBtb3ZlRWxlbWVudCggJ3ByZXZpZXcnLCAtMzAwLCAwLCA1ICk7XG4gICAgICB9XG4gICAgICBpZiAoIGRlc3RpbmF0aW9uLmluZGV4T2YoICdsaXZlLmh0bWwnICkgIT09IC0xICkge1xuICAgICAgICBtb3ZlRWxlbWVudCggJ3ByZXZpZXcnLCAtNDUwLCAwLCA1ICk7XG4gICAgICB9XG4gICAgICBpZiAoIGRlc3RpbmF0aW9uLmluZGV4T2YoICdjb250YWN0Lmh0bWwnICkgIT09IC0xICkge1xuICAgICAgICBtb3ZlRWxlbWVudCggJ3ByZXZpZXcnLCAtNjAwLCAwLCA1ICk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5hZGRMb2FkRXZlbnQoIHByZXBhcmVTbGlkZXNob3cgKTtcbiIsImZ1bmN0aW9uIHN0cmlwZVRhYmxlcygpIHtcbiAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgdGFibGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0YWJsZVwiKTtcbiAgZm9yICh2YXIgaT0wOyBpPHRhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBvZGQgPSBmYWxzZTtcbiAgICB2YXIgcm93cyA9IHRhYmxlc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRyXCIpO1xuICAgIGZvciAodmFyIGo9MDsgajxyb3dzLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAob2RkID09IHRydWUpIHtcbiAgICAgICAgYWRkQ2xhc3Mocm93c1tqXSxcIm9kZFwiKTtcbiAgICAgICAgb2RkID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZGQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRSb3dzKCkge1xuICBpZighZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUpIHJldHVybiBmYWxzZTtcbiAgdmFyIHJvd3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRyXCIpO1xuICBmb3IgKHZhciBpPTA7IGk8cm93cy5sZW5ndGg7IGkrKykge1xuICAgIHJvd3NbaV0ub2xkQ2xhc3NOYW1lID0gcm93c1tpXS5jbGFzc05hbWVcbiAgICByb3dzW2ldLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBhZGRDbGFzcyh0aGlzLFwiaGlnaGxpZ2h0XCIpO1xuICAgIH1cbiAgICByb3dzW2ldLm9ubW91c2VvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gdGhpcy5vbGRDbGFzc05hbWVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheUFiYnJldmlhdGlvbnMoKSB7XG4gIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgfHwgIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgfHwgIWRvY3VtZW50LmNyZWF0ZVRleHROb2RlKSByZXR1cm4gZmFsc2U7XG4gIHZhciBhYmJyZXZpYXRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhYmJyXCIpO1xuICBpZiAoYWJicmV2aWF0aW9ucy5sZW5ndGggPCAxKSByZXR1cm4gZmFsc2U7XG4gIHZhciBkZWZzID0gbmV3IEFycmF5KCk7XG4gIGZvciAodmFyIGk9MDsgaTxhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGN1cnJlbnRfYWJiciA9IGFiYnJldmlhdGlvbnNbaV07XG4gICAgaWYgKGN1cnJlbnRfYWJici5jaGlsZE5vZGVzLmxlbmd0aCA8IDEpIGNvbnRpbnVlO1xuICAgIHZhciBkZWZpbml0aW9uID0gY3VycmVudF9hYmJyLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgIHZhciBrZXkgPSBjdXJyZW50X2FiYnIubGFzdENoaWxkLm5vZGVWYWx1ZTtcbiAgICBkZWZzW2tleV0gPSBkZWZpbml0aW9uO1xuICB9XG4gIHZhciBkbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkbFwiKTtcbiAgZm9yIChrZXkgaW4gZGVmcykge1xuICAgIHZhciBkZWZpbml0aW9uID0gZGVmc1trZXldO1xuICAgIHZhciBkdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZHRcIik7XG4gICAgdmFyIGR0aXRsZV90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoa2V5KTtcbiAgICBkdGl0bGUuYXBwZW5kQ2hpbGQoZHRpdGxlX3RleHQpO1xuICAgIHZhciBkZGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkZFwiKTtcbiAgICB2YXIgZGRlc2NfdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRlZmluaXRpb24pO1xuICAgIGRkZXNjLmFwcGVuZENoaWxkKGRkZXNjX3RleHQpO1xuICAgIGRsaXN0LmFwcGVuZENoaWxkKGR0aXRsZSk7XG4gICAgZGxpc3QuYXBwZW5kQ2hpbGQoZGRlc2MpO1xuICB9XG4gIGlmIChkbGlzdC5jaGlsZE5vZGVzLmxlbmd0aCA8IDEpIHJldHVybiBmYWxzZTtcbiAgdmFyIGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgdmFyIGhlYWRlcl90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJBYmJyZXZpYXRpb25zXCIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyX3RleHQpO1xuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRsaXN0KTtcbn1cblxuYWRkTG9hZEV2ZW50KHN0cmlwZVRhYmxlcyk7XG5hZGRMb2FkRXZlbnQoaGlnaGxpZ2h0Um93cyk7XG5hZGRMb2FkRXZlbnQoZGlzcGxheUFiYnJldmlhdGlvbnMpOyIsImZ1bmN0aW9uIHNob3dQaWMoIHdoaWNocGljICkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBzb3VyY2UsIHBsYWNlaG9sZGVyLCB0ZXh0LCBkZXNjcmlwdGlvbjtcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwbGFjZWhvbGRlcicgKSApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzb3VyY2UgPSB3aGljaHBpYy5nZXRBdHRyaWJ1dGUoICdocmVmJyApO1xuICBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGxhY2Vob2xkZXInICk7XG4gIHBsYWNlaG9sZGVyLnNldEF0dHJpYnV0ZSggJ3NyYycsIHNvdXJjZSApO1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2Rlc2NyaXB0aW9uJyApICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoIHdoaWNocGljLmdldEF0dHJpYnV0ZSggJ3RpdGxlJyApICkge1xuICAgIHRleHQgPSB3aGljaHBpYy5nZXRBdHRyaWJ1dGUoICd0aXRsZScgKTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0ID0gJyc7XG4gIH1cbiAgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2Rlc2NyaXB0aW9uJyApO1xuICBpZiAoIGRlc2NyaXB0aW9uLmZpcnN0Q2hpbGQubm9kZVR5cGUgPT09IDMgKSB7XG4gICAgZGVzY3JpcHRpb24uZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSB0ZXh0O1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVBsYWNlaG9sZGVyKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBwbGFjZWhvbGRlciwgZGVzY3JpcHRpb24sIGRlc2NUZXh0LCBnYWxsZXJ5O1xuICBpZiAoICFkb2N1bWVudC5jcmVhdGVFbGVtZW50ICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaW1hZ2UtZ2FsbGVyeScgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnaW1nJyApO1xuICBwbGFjZWhvbGRlci5zZXRBdHRyaWJ1dGUoICdpZCcsICdwbGFjZWhvbGRlcicgKTtcbiAgcGxhY2Vob2xkZXIuc2V0QXR0cmlidXRlKCAnc3JjJywgJ2ltZy9wbGFjZWhvbGRlci5naWYnICk7XG4gIHBsYWNlaG9sZGVyLnNldEF0dHJpYnV0ZSggJ2FsdCcsICdteSBpbWFnZSBnYWxsZXJ5JyApO1xuICBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdwJyApO1xuICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoICdpZCcsICdkZXNjcmlwdGlvbicgKTtcbiAgZGVzY1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSggJ0Nob29zZSBhbiBpbWFnZScgKTtcbiAgZGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoIGRlc2NUZXh0ICk7XG4gIGdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ltYWdlLWdhbGxlcnknICk7XG4gIGluc2VydEFmdGVyKCBkZXNjcmlwdGlvbiwgZ2FsbGVyeSApO1xuICBpbnNlcnRBZnRlciggcGxhY2Vob2xkZXIsIGRlc2NyaXB0aW9uICk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVHYWxsZXJ5KCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBnYWxsZXJ5LCBsaW5rcztcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ltYWdlLWdhbGxlcnknICkgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ltYWdlLWdhbGxlcnknICk7XG4gIGxpbmtzID0gZ2FsbGVyeS5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2EnICk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrICkge1xuICAgIGxpbmtzWyBpIF0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNob3dQaWMoIHRoaXMgKTtcbiAgICB9O1xuICB9XG59XG5cbmFkZExvYWRFdmVudCggcHJlcGFyZVBsYWNlaG9sZGVyICk7XG5hZGRMb2FkRXZlbnQoIHByZXBhcmVHYWxsZXJ5ICk7XG4iXX0=
