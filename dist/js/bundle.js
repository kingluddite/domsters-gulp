function addLoadEvent( func ) {
  console.log('yes');
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
