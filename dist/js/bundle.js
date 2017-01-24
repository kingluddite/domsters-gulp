function addLoadEvent( func ) {
  console.log('o');
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


function moveElement( elementID, finalX, finalY, interval ) {
  'use strict';
  console.log('yo');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyIsImFib3V0LmpzIiwiY29udGFjdC5qcyIsImluZGV4LmpzIiwibGl2ZS5qcyIsInBob3Rvcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakdBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYWRkTG9hZEV2ZW50KCBmdW5jICkge1xuICBjb25zb2xlLmxvZygnbycpO1xuICB2YXIgb2xkb25sb2FkID0gd2luZG93Lm9ubG9hZDtcbiAgaWYgKCB0eXBlb2Ygd2luZG93Lm9ubG9hZCAhPSAnZnVuY3Rpb24nICkge1xuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIG9sZG9ubG9hZCgpO1xuICAgICAgZnVuYygpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlciggbmV3RWxlbWVudCwgdGFyZ2V0RWxlbWVudCApIHtcbiAgdmFyIHBhcmVudCA9IHRhcmdldEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgaWYgKCBwYXJlbnQubGFzdENoaWxkID09IHRhcmdldEVsZW1lbnQgKSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKCBuZXdFbGVtZW50ICk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSggbmV3RWxlbWVudCwgdGFyZ2V0RWxlbWVudC5uZXh0U2libGluZyApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKCBlbGVtZW50LCB2YWx1ZSApIHtcbiAgaWYgKCAhZWxlbWVudC5jbGFzc05hbWUgKSB7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBuZXdDbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICBuZXdDbGFzc05hbWUgKz0gXCIgXCI7XG4gICAgbmV3Q2xhc3NOYW1lICs9IHZhbHVlO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gbmV3Q2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFBhZ2UoKSB7XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lICkgcmV0dXJuIGZhbHNlO1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCApIHJldHVybiBmYWxzZTtcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwibmF2aWdhdGlvblwiICkgKSByZXR1cm4gZmFsc2U7XG4gIHZhciBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJuYXZpZ2F0aW9uXCIgKTtcbiAgdmFyIGxpbmtzID0gbmF2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImFcIiApO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbGlua3VybCA9IGxpbmtzWyBpIF0uZ2V0QXR0cmlidXRlKCBcImhyZWZcIiApO1xuICAgIHZhciBjdXJyZW50dXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgaWYgKCBjdXJyZW50dXJsLmluZGV4T2YoIGxpbmt1cmwgKSAhPSAtMSApIHtcbiAgICAgIGxpbmtzWyBpIF0uY2xhc3NOYW1lID0gXCJoZXJlXCI7XG4gICAgICB2YXIgbGlua3RleHQgPSBsaW5rc1sgaSBdLmxhc3RDaGlsZC5ub2RlVmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCBcImlkXCIsIGxpbmt0ZXh0ICk7XG4gICAgfVxuICB9XG59XG5cbmFkZExvYWRFdmVudCggaGlnaGxpZ2h0UGFnZSApO1xuIiwiZnVuY3Rpb24gc2hvd1NlY3Rpb24oIGlkICkge1xuICAndXNlIHN0cmljdCc7XG4gIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XG4gIHZhciBkaXZzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdkaXYnICk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGRpdnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYgKCBkaXZzWyBpIF0uY2xhc3NOYW1lLmluZGV4T2YoICdzZWN0aW9uJyApID09PSAtMSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoIGRpdnNbIGkgXS5nZXRBdHRyaWJ1dGUoICdpZCcgKSAhPT0gaWQgKSB7XG4gICAgICBkaXZzWyBpIF0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgZGl2c1sgaSBdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlSW50ZXJuYWxOYXYoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ludGVybmFsLW5hdicgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaW50ZXJuYWwtbmF2JyApO1xuICB2YXIgbGlua3MgPSBuYXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdhJyApO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgc2VjdGlvbklkID0gbGlua3NbIGkgXS5nZXRBdHRyaWJ1dGUoICdocmVmJyApLnNwbGl0KCAnIycgKVsgMSBdO1xuICAgIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBzZWN0aW9uSWQgKSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggc2VjdGlvbklkICkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBsaW5rc1sgaSBdLmRlc3RpbmF0aW9uID0gc2VjdGlvbklkO1xuICAgIGxpbmtzWyBpIF0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2hvd1NlY3Rpb24oIHRoaXMuZGVzdGluYXRpb24gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG59XG5cbmFkZExvYWRFdmVudCggcHJlcGFyZUludGVybmFsTmF2ICk7XG4iLCIiLCJmdW5jdGlvbiBtb3ZlRWxlbWVudCggZWxlbWVudElELCBmaW5hbFgsIGZpbmFsWSwgaW50ZXJ2YWwgKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgY29uc29sZS5sb2coJ3lvJyk7XG4gIHZhciBlbGVtLCB4UG9zLCB5UG9zLCBkaXN0LCByZXBlYXQ7XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggZWxlbWVudElEICkgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggZWxlbWVudElEICk7XG4gIGlmICggZWxlbS5tb3ZlbWVudCApIHtcbiAgICBjbGVhclRpbWVvdXQoIGVsZW0ubW92ZW1lbnQgKTtcbiAgfVxuICBpZiAoICFlbGVtLnN0eWxlLmxlZnQgKSB7XG4gICAgZWxlbS5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gIH1cbiAgaWYgKCAhZWxlbS5zdHlsZS50b3AgKSB7XG4gICAgZWxlbS5zdHlsZS50b3AgPSAnMHB4JztcbiAgfVxuICB4UG9zID0gcGFyc2VJbnQoIGVsZW0uc3R5bGUubGVmdCApO1xuICB5UG9zID0gcGFyc2VJbnQoIGVsZW0uc3R5bGUudG9wICk7XG4gIGlmICggeFBvcyA9PT0gZmluYWxYICYmIHlQb3MgPT09IGZpbmFsWSApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoIHhQb3MgPCBmaW5hbFggKSB7XG4gICAgZGlzdCA9IE1hdGguY2VpbCggKCBmaW5hbFggLSB4UG9zICkgLyAxMCApO1xuICAgIHhQb3MgPSB4UG9zICsgZGlzdDtcbiAgfVxuICBpZiAoIHhQb3MgPiBmaW5hbFggKSB7XG4gICAgZGlzdCA9IE1hdGguY2VpbCggKCB4UG9zIC0gZmluYWxYICkgLyAxMCApO1xuICAgIHhQb3MgPSB4UG9zIC0gZGlzdDtcbiAgfVxuICBpZiAoIHlQb3MgPCBmaW5hbFkgKSB7XG4gICAgZGlzdCA9IE1hdGguY2VpbCggKCBmaW5hbFkgLSB5UG9zICkgLyAxMCApO1xuICAgIHlQb3MgPSB5UG9zICsgZGlzdDtcbiAgfVxuICBpZiAoIHlQb3MgPiBmaW5hbFkgKSB7XG4gICAgZGlzdCA9IE1hdGguY2VpbCggKCB5UG9zIC0gZmluYWxZICkgLyAxMCApO1xuICAgIHlQb3MgPSB5UG9zIC0gZGlzdDtcbiAgfVxuICBlbGVtLnN0eWxlLmxlZnQgPSB4UG9zICsgJ3B4JztcbiAgZWxlbS5zdHlsZS50b3AgPSB5UG9zICsgJ3B4JztcbiAgcmVwZWF0ID0gXCJtb3ZlRWxlbWVudCgnXCIgKyBlbGVtZW50SUQgKyBcIicsXCIgKyBmaW5hbFggKyBcIixcIiArIGZpbmFsWSArIFwiLFwiICsgaW50ZXJ2YWwgKyBcIilcIjtcbiAgZWxlbS5tb3ZlbWVudCA9IHNldFRpbWVvdXQoIHJlcGVhdCwgaW50ZXJ2YWwgKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVNsaWRlc2hvdygpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgaW50cm8sIHNsaWRlc2hvdywgZnJhbWUsIHByZXZpZXcsIGxpbmtzO1xuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImludHJvXCIgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaW50cm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ludHJvJyApO1xuICBzbGlkZXNob3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICBzbGlkZXNob3cuc2V0QXR0cmlidXRlKCAnaWQnLCAnc2xpZGVzaG93JyApO1xuICBmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdpbWcnICk7XG4gIGZyYW1lLnNldEF0dHJpYnV0ZSggJ3NyYycsICdpbWcvZnJhbWUuZ2lmJyApO1xuICBmcmFtZS5zZXRBdHRyaWJ1dGUoICdhbHQnLCAnJyApO1xuICBmcmFtZS5zZXRBdHRyaWJ1dGUoICdpZCcsICdmcmFtZScgKTtcbiAgc2xpZGVzaG93LmFwcGVuZENoaWxkKCBmcmFtZSApO1xuICBwcmV2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2ltZycgKTtcbiAgcHJldmlldy5zZXRBdHRyaWJ1dGUoICdzcmMnLCAnaW1nL3NsaWRlc2hvdy5naWYnICk7XG4gIHByZXZpZXcuc2V0QXR0cmlidXRlKCAnYWx0JywgJ2EgZ2xpbXBzZSBvZiB3aGF0IGF3YWl0cyB5b3UnICk7XG4gIHByZXZpZXcuc2V0QXR0cmlidXRlKCAnaWQnLCAncHJldmlldycgKTtcbiAgc2xpZGVzaG93LmFwcGVuZENoaWxkKCBwcmV2aWV3ICk7XG4gIGluc2VydEFmdGVyKCBzbGlkZXNob3csIGludHJvICk7XG4gIGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdhJyApO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKyApIHtcbiAgICBsaW5rc1sgaSBdLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmdldEF0dHJpYnV0ZSggJ2hyZWYnICk7XG4gICAgICBpZiAoIGRlc3RpbmF0aW9uLmluZGV4T2YoICdpbmRleC5odG1sJyApICE9PSAtMSApIHtcbiAgICAgICAgbW92ZUVsZW1lbnQoICdwcmV2aWV3JywgMCwgMCwgNSApO1xuICAgICAgfVxuICAgICAgaWYgKCBkZXN0aW5hdGlvbi5pbmRleE9mKCAnYWJvdXQuaHRtbCcgKSAhPT0gLTEgKSB7XG4gICAgICAgIG1vdmVFbGVtZW50KCAncHJldmlldycsIC0xNTAsIDAsIDUgKTtcbiAgICAgIH1cbiAgICAgIGlmICggZGVzdGluYXRpb24uaW5kZXhPZiggJ3Bob3Rvcy5odG1sJyApICE9PSAtMSApIHtcbiAgICAgICAgbW92ZUVsZW1lbnQoICdwcmV2aWV3JywgLTMwMCwgMCwgNSApO1xuICAgICAgfVxuICAgICAgaWYgKCBkZXN0aW5hdGlvbi5pbmRleE9mKCAnbGl2ZS5odG1sJyApICE9PSAtMSApIHtcbiAgICAgICAgbW92ZUVsZW1lbnQoICdwcmV2aWV3JywgLTQ1MCwgMCwgNSApO1xuICAgICAgfVxuICAgICAgaWYgKCBkZXN0aW5hdGlvbi5pbmRleE9mKCAnY29udGFjdC5odG1sJyApICE9PSAtMSApIHtcbiAgICAgICAgbW92ZUVsZW1lbnQoICdwcmV2aWV3JywgLTYwMCwgMCwgNSApO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuYWRkTG9hZEV2ZW50KCBwcmVwYXJlU2xpZGVzaG93ICk7XG4iLCIiLCJmdW5jdGlvbiBzaG93UGljKCB3aGljaHBpYyApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgc291cmNlLCBwbGFjZWhvbGRlciwgdGV4dCwgZGVzY3JpcHRpb247XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGxhY2Vob2xkZXInICkgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc291cmNlID0gd2hpY2hwaWMuZ2V0QXR0cmlidXRlKCAnaHJlZicgKTtcbiAgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BsYWNlaG9sZGVyJyApO1xuICBwbGFjZWhvbGRlci5zZXRBdHRyaWJ1dGUoICdzcmMnLCBzb3VyY2UgKTtcbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXNjcmlwdGlvbicgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCB3aGljaHBpYy5nZXRBdHRyaWJ1dGUoICd0aXRsZScgKSApIHtcbiAgICB0ZXh0ID0gd2hpY2hwaWMuZ2V0QXR0cmlidXRlKCAndGl0bGUnICk7XG4gIH0gZWxzZSB7XG4gICAgdGV4dCA9ICcnO1xuICB9XG4gIGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXNjcmlwdGlvbicgKTtcbiAgaWYgKCBkZXNjcmlwdGlvbi5maXJzdENoaWxkLm5vZGVUeXBlID09PSAzICkge1xuICAgIGRlc2NyaXB0aW9uLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gdGV4dDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVQbGFjZWhvbGRlcigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGxhY2Vob2xkZXIsIGRlc2NyaXB0aW9uLCBkZXNjVGV4dCwgZ2FsbGVyeTtcbiAgaWYgKCAhZG9jdW1lbnQuY3JlYXRlRWxlbWVudCApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ltYWdlLWdhbGxlcnknICkgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2ltZycgKTtcbiAgcGxhY2Vob2xkZXIuc2V0QXR0cmlidXRlKCAnaWQnLCAncGxhY2Vob2xkZXInICk7XG4gIHBsYWNlaG9sZGVyLnNldEF0dHJpYnV0ZSggJ3NyYycsICdpbWcvcGxhY2Vob2xkZXIuZ2lmJyApO1xuICBwbGFjZWhvbGRlci5zZXRBdHRyaWJ1dGUoICdhbHQnLCAnbXkgaW1hZ2UgZ2FsbGVyeScgKTtcbiAgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAncCcgKTtcbiAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCAnaWQnLCAnZGVzY3JpcHRpb24nICk7XG4gIGRlc2NUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoICdDaG9vc2UgYW4gaW1hZ2UnICk7XG4gIGRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKCBkZXNjVGV4dCApO1xuICBnYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdpbWFnZS1nYWxsZXJ5JyApO1xuICBpbnNlcnRBZnRlciggZGVzY3JpcHRpb24sIGdhbGxlcnkgKTtcbiAgaW5zZXJ0QWZ0ZXIoIHBsYWNlaG9sZGVyLCBkZXNjcmlwdGlvbiApO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlR2FsbGVyeSgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgZ2FsbGVyeSwgbGlua3M7XG4gIGlmICggIWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdpbWFnZS1nYWxsZXJ5JyApICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBnYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdpbWFnZS1nYWxsZXJ5JyApO1xuICBsaW5rcyA9IGdhbGxlcnkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdhJyApO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKyApIHtcbiAgICBsaW5rc1sgaSBdLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzaG93UGljKCB0aGlzICk7XG4gICAgfTtcbiAgfVxufVxuXG5hZGRMb2FkRXZlbnQoIHByZXBhcmVQbGFjZWhvbGRlciApO1xuYWRkTG9hZEV2ZW50KCBwcmVwYXJlR2FsbGVyeSApO1xuIl19
