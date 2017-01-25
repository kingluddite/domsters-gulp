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
  console.log('tes');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyIsImFib3V0LmpzIiwiY29udGFjdC5qcyIsImluZGV4LmpzIiwibGl2ZS5qcyIsInBob3Rvcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYWRkTG9hZEV2ZW50KCBmdW5jICkge1xuICBjb25zb2xlLmxvZygnb3dldycpO1xuICB2YXIgb2xkb25sb2FkID0gd2luZG93Lm9ubG9hZDtcbiAgaWYgKCB0eXBlb2Ygd2luZG93Lm9ubG9hZCAhPSAnZnVuY3Rpb24nICkge1xuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIG9sZG9ubG9hZCgpO1xuICAgICAgZnVuYygpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlciggbmV3RWxlbWVudCwgdGFyZ2V0RWxlbWVudCApIHtcbiAgdmFyIHBhcmVudCA9IHRhcmdldEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgaWYgKCBwYXJlbnQubGFzdENoaWxkID09IHRhcmdldEVsZW1lbnQgKSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKCBuZXdFbGVtZW50ICk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSggbmV3RWxlbWVudCwgdGFyZ2V0RWxlbWVudC5uZXh0U2libGluZyApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKCBlbGVtZW50LCB2YWx1ZSApIHtcbiAgaWYgKCAhZWxlbWVudC5jbGFzc05hbWUgKSB7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBuZXdDbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICBuZXdDbGFzc05hbWUgKz0gXCIgXCI7XG4gICAgbmV3Q2xhc3NOYW1lICs9IHZhbHVlO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gbmV3Q2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFBhZ2UoKSB7XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lICkgcmV0dXJuIGZhbHNlO1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCApIHJldHVybiBmYWxzZTtcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwibmF2aWdhdGlvblwiICkgKSByZXR1cm4gZmFsc2U7XG4gIHZhciBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJuYXZpZ2F0aW9uXCIgKTtcbiAgdmFyIGxpbmtzID0gbmF2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImFcIiApO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbGlua3VybCA9IGxpbmtzWyBpIF0uZ2V0QXR0cmlidXRlKCBcImhyZWZcIiApO1xuICAgIHZhciBjdXJyZW50dXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgaWYgKCBjdXJyZW50dXJsLmluZGV4T2YoIGxpbmt1cmwgKSAhPSAtMSApIHtcbiAgICAgIGxpbmtzWyBpIF0uY2xhc3NOYW1lID0gXCJoZXJlXCI7XG4gICAgICB2YXIgbGlua3RleHQgPSBsaW5rc1sgaSBdLmxhc3RDaGlsZC5ub2RlVmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCBcImlkXCIsIGxpbmt0ZXh0ICk7XG4gICAgfVxuICB9XG59XG5cbmFkZExvYWRFdmVudCggaGlnaGxpZ2h0UGFnZSApO1xuIiwiZnVuY3Rpb24gc2hvd1NlY3Rpb24oIGlkICkge1xuICAndXNlIHN0cmljdCc7XG4gIGNvbnNvbGUubG9nKCd0ZXMnKTtcbiAgdmFyIGRpdnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2RpdicgKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZGl2cy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiAoIGRpdnNbIGkgXS5jbGFzc05hbWUuaW5kZXhPZiggJ3NlY3Rpb24nICkgPT09IC0xICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICggZGl2c1sgaSBdLmdldEF0dHJpYnV0ZSggJ2lkJyApICE9PSBpZCApIHtcbiAgICAgIGRpdnNbIGkgXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXZzWyBpIF0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVJbnRlcm5hbE5hdigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaW50ZXJuYWwtbmF2JyApICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdpbnRlcm5hbC1uYXYnICk7XG4gIHZhciBsaW5rcyA9IG5hdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2EnICk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBzZWN0aW9uSWQgPSBsaW5rc1sgaSBdLmdldEF0dHJpYnV0ZSggJ2hyZWYnICkuc3BsaXQoICcjJyApWyAxIF07XG4gICAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIHNlY3Rpb25JZCApICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBzZWN0aW9uSWQgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGxpbmtzWyBpIF0uZGVzdGluYXRpb24gPSBzZWN0aW9uSWQ7XG4gICAgbGlua3NbIGkgXS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICBzaG93U2VjdGlvbiggdGhpcy5kZXN0aW5hdGlvbiApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbn1cblxuYWRkTG9hZEV2ZW50KCBwcmVwYXJlSW50ZXJuYWxOYXYgKTtcbiIsImZ1bmN0aW9uIGZvY3VzTGFiZWxzKCkge1xuICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKSByZXR1cm4gZmFsc2U7XG4gIHZhciBsYWJlbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxhYmVsXCIpO1xuICBmb3IgKHZhciBpPTA7IGk8bGFiZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFsYWJlbHNbaV0uZ2V0QXR0cmlidXRlKFwiZm9yXCIpKSBjb250aW51ZTtcbiAgICBsYWJlbHNbaV0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJmb3JcIik7XG4gICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0RmllbGRzKHdoaWNoZm9ybSkge1xuICBmb3IgKHZhciBpPTA7IGk8d2hpY2hmb3JtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB3aGljaGZvcm0uZWxlbWVudHNbaV07XG4gICAgaWYgKGVsZW1lbnQudHlwZSA9PSBcInN1Ym1pdFwiKSBjb250aW51ZTtcbiAgICBpZiAoIWVsZW1lbnQuZGVmYXVsdFZhbHVlKSBjb250aW51ZTtcbiAgICBlbGVtZW50Lm9uZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy52YWx1ZSA9PSB0aGlzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IFwiXCI7XG4gICAgIH1cbiAgICB9XG4gICAgZWxlbWVudC5vbmJsdXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID09IFwiXCIpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUZvcm0od2hpY2hmb3JtKSB7XG4gIGZvciAodmFyIGk9MDsgaTx3aGljaGZvcm0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZWxlbWVudCA9IHdoaWNoZm9ybS5lbGVtZW50c1tpXTtcbiAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihcInJlcXVpcmVkXCIpICE9IC0xKSB7XG4gICAgICBpZiAoIWlzRmlsbGVkKGVsZW1lbnQpKSB7XG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgaW4gdGhlIFwiK2VsZW1lbnQubmFtZStcIiBmaWVsZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoXCJlbWFpbFwiKSAhPSAtMSkge1xuICAgICAgaWYgKCFpc0VtYWlsKGVsZW1lbnQpKSB7XG4gICAgICAgIGFsZXJ0KFwiVGhlIFwiK2VsZW1lbnQubmFtZStcIiBmaWVsZCBtdXN0IGJlIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRmlsbGVkKGZpZWxkKSB7XG4gIGlmIChmaWVsZC52YWx1ZS5sZW5ndGggPCAxIHx8IGZpZWxkLnZhbHVlID09IGZpZWxkLmRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0VtYWlsKGZpZWxkKSB7XG4gIGlmIChmaWVsZC52YWx1ZS5pbmRleE9mKFwiQFwiKSA9PSAtMSB8fCBmaWVsZC52YWx1ZS5pbmRleE9mKFwiLlwiKSA9PSAtMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlRm9ybXMoKSB7XG4gIGZvciAodmFyIGk9MDsgaTxkb2N1bWVudC5mb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0aGlzZm9ybSA9IGRvY3VtZW50LmZvcm1zW2ldO1xuICAgIHJlc2V0RmllbGRzKHRoaXNmb3JtKTtcbiAgICB0aGlzZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlRm9ybSh0aGlzKTtcbiAgICB9XG4gIH1cbn1cblxuYWRkTG9hZEV2ZW50KGZvY3VzTGFiZWxzKTtcbmFkZExvYWRFdmVudChwcmVwYXJlRm9ybXMpOyIsImZ1bmN0aW9uIG1vdmVFbGVtZW50KCBlbGVtZW50SUQsIGZpbmFsWCwgZmluYWxZLCBpbnRlcnZhbCApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgZWxlbSwgeFBvcywgeVBvcywgZGlzdCwgcmVwZWF0O1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIGVsZW1lbnRJRCApICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIGVsZW1lbnRJRCApO1xuICBpZiAoIGVsZW0ubW92ZW1lbnQgKSB7XG4gICAgY2xlYXJUaW1lb3V0KCBlbGVtLm1vdmVtZW50ICk7XG4gIH1cbiAgaWYgKCAhZWxlbS5zdHlsZS5sZWZ0ICkge1xuICAgIGVsZW0uc3R5bGUubGVmdCA9ICcwcHgnO1xuICB9XG4gIGlmICggIWVsZW0uc3R5bGUudG9wICkge1xuICAgIGVsZW0uc3R5bGUudG9wID0gJzBweCc7XG4gIH1cbiAgeFBvcyA9IHBhcnNlSW50KCBlbGVtLnN0eWxlLmxlZnQgKTtcbiAgeVBvcyA9IHBhcnNlSW50KCBlbGVtLnN0eWxlLnRvcCApO1xuICBpZiAoIHhQb3MgPT09IGZpbmFsWCAmJiB5UG9zID09PSBmaW5hbFkgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCB4UG9zIDwgZmluYWxYICkge1xuICAgIGRpc3QgPSBNYXRoLmNlaWwoICggZmluYWxYIC0geFBvcyApIC8gMTAgKTtcbiAgICB4UG9zID0geFBvcyArIGRpc3Q7XG4gIH1cbiAgaWYgKCB4UG9zID4gZmluYWxYICkge1xuICAgIGRpc3QgPSBNYXRoLmNlaWwoICggeFBvcyAtIGZpbmFsWCApIC8gMTAgKTtcbiAgICB4UG9zID0geFBvcyAtIGRpc3Q7XG4gIH1cbiAgaWYgKCB5UG9zIDwgZmluYWxZICkge1xuICAgIGRpc3QgPSBNYXRoLmNlaWwoICggZmluYWxZIC0geVBvcyApIC8gMTAgKTtcbiAgICB5UG9zID0geVBvcyArIGRpc3Q7XG4gIH1cbiAgaWYgKCB5UG9zID4gZmluYWxZICkge1xuICAgIGRpc3QgPSBNYXRoLmNlaWwoICggeVBvcyAtIGZpbmFsWSApIC8gMTAgKTtcbiAgICB5UG9zID0geVBvcyAtIGRpc3Q7XG4gIH1cbiAgZWxlbS5zdHlsZS5sZWZ0ID0geFBvcyArICdweCc7XG4gIGVsZW0uc3R5bGUudG9wID0geVBvcyArICdweCc7XG4gIHJlcGVhdCA9IFwibW92ZUVsZW1lbnQoJ1wiICsgZWxlbWVudElEICsgXCInLFwiICsgZmluYWxYICsgXCIsXCIgKyBmaW5hbFkgKyBcIixcIiArIGludGVydmFsICsgXCIpXCI7XG4gIGVsZW0ubW92ZW1lbnQgPSBzZXRUaW1lb3V0KCByZXBlYXQsIGludGVydmFsICk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTbGlkZXNob3coKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGludHJvLCBzbGlkZXNob3csIGZyYW1lLCBwcmV2aWV3LCBsaW5rcztcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJpbnRyb1wiICkgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGludHJvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdpbnRybycgKTtcbiAgc2xpZGVzaG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcbiAgc2xpZGVzaG93LnNldEF0dHJpYnV0ZSggJ2lkJywgJ3NsaWRlc2hvdycgKTtcbiAgZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnaW1nJyApO1xuICBmcmFtZS5zZXRBdHRyaWJ1dGUoICdzcmMnLCAnaW1nL2ZyYW1lLmdpZicgKTtcbiAgZnJhbWUuc2V0QXR0cmlidXRlKCAnYWx0JywgJycgKTtcbiAgZnJhbWUuc2V0QXR0cmlidXRlKCAnaWQnLCAnZnJhbWUnICk7XG4gIHNsaWRlc2hvdy5hcHBlbmRDaGlsZCggZnJhbWUgKTtcbiAgcHJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdpbWcnICk7XG4gIHByZXZpZXcuc2V0QXR0cmlidXRlKCAnc3JjJywgJ2ltZy9zbGlkZXNob3cuZ2lmJyApO1xuICBwcmV2aWV3LnNldEF0dHJpYnV0ZSggJ2FsdCcsICdhIGdsaW1wc2Ugb2Ygd2hhdCBhd2FpdHMgeW91JyApO1xuICBwcmV2aWV3LnNldEF0dHJpYnV0ZSggJ2lkJywgJ3ByZXZpZXcnICk7XG4gIHNsaWRlc2hvdy5hcHBlbmRDaGlsZCggcHJldmlldyApO1xuICBpbnNlcnRBZnRlciggc2xpZGVzaG93LCBpbnRybyApO1xuICBsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnYScgKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKysgKSB7XG4gICAgbGlua3NbIGkgXS5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlc3RpbmF0aW9uID0gdGhpcy5nZXRBdHRyaWJ1dGUoICdocmVmJyApO1xuICAgICAgaWYgKCBkZXN0aW5hdGlvbi5pbmRleE9mKCAnaW5kZXguaHRtbCcgKSAhPT0gLTEgKSB7XG4gICAgICAgIG1vdmVFbGVtZW50KCAncHJldmlldycsIDAsIDAsIDUgKTtcbiAgICAgIH1cbiAgICAgIGlmICggZGVzdGluYXRpb24uaW5kZXhPZiggJ2Fib3V0Lmh0bWwnICkgIT09IC0xICkge1xuICAgICAgICBtb3ZlRWxlbWVudCggJ3ByZXZpZXcnLCAtMTUwLCAwLCA1ICk7XG4gICAgICB9XG4gICAgICBpZiAoIGRlc3RpbmF0aW9uLmluZGV4T2YoICdwaG90b3MuaHRtbCcgKSAhPT0gLTEgKSB7XG4gICAgICAgIG1vdmVFbGVtZW50KCAncHJldmlldycsIC0zMDAsIDAsIDUgKTtcbiAgICAgIH1cbiAgICAgIGlmICggZGVzdGluYXRpb24uaW5kZXhPZiggJ2xpdmUuaHRtbCcgKSAhPT0gLTEgKSB7XG4gICAgICAgIG1vdmVFbGVtZW50KCAncHJldmlldycsIC00NTAsIDAsIDUgKTtcbiAgICAgIH1cbiAgICAgIGlmICggZGVzdGluYXRpb24uaW5kZXhPZiggJ2NvbnRhY3QuaHRtbCcgKSAhPT0gLTEgKSB7XG4gICAgICAgIG1vdmVFbGVtZW50KCAncHJldmlldycsIC02MDAsIDAsIDUgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmFkZExvYWRFdmVudCggcHJlcGFyZVNsaWRlc2hvdyApO1xuIiwiZnVuY3Rpb24gc3RyaXBlVGFibGVzKCkge1xuICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKSByZXR1cm4gZmFsc2U7XG4gIHZhciB0YWJsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRhYmxlXCIpO1xuICBmb3IgKHZhciBpPTA7IGk8dGFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG9kZCA9IGZhbHNlO1xuICAgIHZhciByb3dzID0gdGFibGVzW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidHJcIik7XG4gICAgZm9yICh2YXIgaj0wOyBqPHJvd3MubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChvZGQgPT0gdHJ1ZSkge1xuICAgICAgICBhZGRDbGFzcyhyb3dzW2pdLFwib2RkXCIpO1xuICAgICAgICBvZGQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9kZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFJvd3MoKSB7XG4gIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgcm93cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidHJcIik7XG4gIGZvciAodmFyIGk9MDsgaTxyb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgcm93c1tpXS5vbGRDbGFzc05hbWUgPSByb3dzW2ldLmNsYXNzTmFtZVxuICAgIHJvd3NbaV0ub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGFkZENsYXNzKHRoaXMsXCJoaWdobGlnaHRcIik7XG4gICAgfVxuICAgIHJvd3NbaV0ub25tb3VzZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLm9sZENsYXNzTmFtZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5QWJicmV2aWF0aW9ucygpIHtcbiAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSB8fCAhZG9jdW1lbnQuY3JlYXRlRWxlbWVudCB8fCAhZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUpIHJldHVybiBmYWxzZTtcbiAgdmFyIGFiYnJldmlhdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFiYnJcIik7XG4gIGlmIChhYmJyZXZpYXRpb25zLmxlbmd0aCA8IDEpIHJldHVybiBmYWxzZTtcbiAgdmFyIGRlZnMgPSBuZXcgQXJyYXkoKTtcbiAgZm9yICh2YXIgaT0wOyBpPGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY3VycmVudF9hYmJyID0gYWJicmV2aWF0aW9uc1tpXTtcbiAgICBpZiAoY3VycmVudF9hYmJyLmNoaWxkTm9kZXMubGVuZ3RoIDwgMSkgY29udGludWU7XG4gICAgdmFyIGRlZmluaXRpb24gPSBjdXJyZW50X2FiYnIuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgdmFyIGtleSA9IGN1cnJlbnRfYWJici5sYXN0Q2hpbGQubm9kZVZhbHVlO1xuICAgIGRlZnNba2V5XSA9IGRlZmluaXRpb247XG4gIH1cbiAgdmFyIGRsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRsXCIpO1xuICBmb3IgKGtleSBpbiBkZWZzKSB7XG4gICAgdmFyIGRlZmluaXRpb24gPSBkZWZzW2tleV07XG4gICAgdmFyIGR0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkdFwiKTtcbiAgICB2YXIgZHRpdGxlX3RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShrZXkpO1xuICAgIGR0aXRsZS5hcHBlbmRDaGlsZChkdGl0bGVfdGV4dCk7XG4gICAgdmFyIGRkZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRkXCIpO1xuICAgIHZhciBkZGVzY190ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGVmaW5pdGlvbik7XG4gICAgZGRlc2MuYXBwZW5kQ2hpbGQoZGRlc2NfdGV4dCk7XG4gICAgZGxpc3QuYXBwZW5kQ2hpbGQoZHRpdGxlKTtcbiAgICBkbGlzdC5hcHBlbmRDaGlsZChkZGVzYyk7XG4gIH1cbiAgaWYgKGRsaXN0LmNoaWxkTm9kZXMubGVuZ3RoIDwgMSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICB2YXIgaGVhZGVyX3RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkFiYnJldmlhdGlvbnNcIik7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJfdGV4dCk7XG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGxpc3QpO1xufVxuXG5hZGRMb2FkRXZlbnQoc3RyaXBlVGFibGVzKTtcbmFkZExvYWRFdmVudChoaWdobGlnaHRSb3dzKTtcbmFkZExvYWRFdmVudChkaXNwbGF5QWJicmV2aWF0aW9ucyk7IiwiZnVuY3Rpb24gc2hvd1BpYyggd2hpY2hwaWMgKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHNvdXJjZSwgcGxhY2Vob2xkZXIsIHRleHQsIGRlc2NyaXB0aW9uO1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BsYWNlaG9sZGVyJyApICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHNvdXJjZSA9IHdoaWNocGljLmdldEF0dHJpYnV0ZSggJ2hyZWYnICk7XG4gIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwbGFjZWhvbGRlcicgKTtcbiAgcGxhY2Vob2xkZXIuc2V0QXR0cmlidXRlKCAnc3JjJywgc291cmNlICk7XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGVzY3JpcHRpb24nICkgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggd2hpY2hwaWMuZ2V0QXR0cmlidXRlKCAndGl0bGUnICkgKSB7XG4gICAgdGV4dCA9IHdoaWNocGljLmdldEF0dHJpYnV0ZSggJ3RpdGxlJyApO1xuICB9IGVsc2Uge1xuICAgIHRleHQgPSAnJztcbiAgfVxuICBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGVzY3JpcHRpb24nICk7XG4gIGlmICggZGVzY3JpcHRpb24uZmlyc3RDaGlsZC5ub2RlVHlwZSA9PT0gMyApIHtcbiAgICBkZXNjcmlwdGlvbi5maXJzdENoaWxkLm5vZGVWYWx1ZSA9IHRleHQ7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlUGxhY2Vob2xkZXIoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHBsYWNlaG9sZGVyLCBkZXNjcmlwdGlvbiwgZGVzY1RleHQsIGdhbGxlcnk7XG4gIGlmICggIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmNyZWF0ZVRleHROb2RlICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdpbWFnZS1nYWxsZXJ5JyApICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdpbWcnICk7XG4gIHBsYWNlaG9sZGVyLnNldEF0dHJpYnV0ZSggJ2lkJywgJ3BsYWNlaG9sZGVyJyApO1xuICBwbGFjZWhvbGRlci5zZXRBdHRyaWJ1dGUoICdzcmMnLCAnaW1nL3BsYWNlaG9sZGVyLmdpZicgKTtcbiAgcGxhY2Vob2xkZXIuc2V0QXR0cmlidXRlKCAnYWx0JywgJ215IGltYWdlIGdhbGxlcnknICk7XG4gIGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3AnICk7XG4gIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSggJ2lkJywgJ2Rlc2NyaXB0aW9uJyApO1xuICBkZXNjVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCAnQ2hvb3NlIGFuIGltYWdlJyApO1xuICBkZXNjcmlwdGlvbi5hcHBlbmRDaGlsZCggZGVzY1RleHQgKTtcbiAgZ2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaW1hZ2UtZ2FsbGVyeScgKTtcbiAgaW5zZXJ0QWZ0ZXIoIGRlc2NyaXB0aW9uLCBnYWxsZXJ5ICk7XG4gIGluc2VydEFmdGVyKCBwbGFjZWhvbGRlciwgZGVzY3JpcHRpb24gKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUdhbGxlcnkoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGdhbGxlcnksIGxpbmtzO1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaW1hZ2UtZ2FsbGVyeScgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZ2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaW1hZ2UtZ2FsbGVyeScgKTtcbiAgbGlua3MgPSBnYWxsZXJ5LmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnYScgKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKysgKSB7XG4gICAgbGlua3NbIGkgXS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gc2hvd1BpYyggdGhpcyApO1xuICAgIH07XG4gIH1cbn1cblxuYWRkTG9hZEV2ZW50KCBwcmVwYXJlUGxhY2Vob2xkZXIgKTtcbmFkZExvYWRFdmVudCggcHJlcGFyZUdhbGxlcnkgKTtcbiJdfQ==
