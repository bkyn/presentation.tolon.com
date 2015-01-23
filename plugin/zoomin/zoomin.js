(function () {
	var isEnabled = true;

	Reveal.addEventListener('fragmentshown', function (event) {
		if (isEnabled) {
            var waitForZoomOut = 0;
			event.preventDefault();
            zoomTo(event.fragment);
		}

        //hide first screenshot
        if (event.fragment.classList.contains("screenshot") &&
            event.fragment.previousElementSibling.classList.contains("screenshot")) {
            event.fragment.previousElementSibling.classList.add("visible");
        }
	} );
    
    Reveal.addEventListener('slidechanged', function (event) {
        if(event.currentSlide.dataset.flow==null) { 
            zoomTo(false);
        } else {
            var firstFragment = event.currentSlide.querySelector("div:first-of-type");
            zoomTo(firstFragment);
        }
    } );
    
	Reveal.addEventListener( 'overviewshown', function() { isEnabled = false; } );
	Reveal.addEventListener( 'overviewhidden', function() { isEnabled = true; } );
    
    function zoomTo(element) {
        var tr = {}
        var zoom = (element && element.dataset.zoom) || 2;
        var factor = parseFloat(
            document.querySelector(".reveal .slides").style.zoom
            || document.querySelector(".reveal .slides").style.transform.match(/scale\((\d+\.?\d*)\)/)[1]
            || "1" ) * (zoom-1);
        if (element) {
            tr = { 
                    x: -(element.offsetLeft + element.offsetWidth/2) * factor ,
                    y: -(element.offsetTop + element.offsetHeight/2) * factor ,
                    scale: zoom
            };
        } else {
            tr = { x: 0, y: 0, scale: 1 };
        }
        //document.body.style.webkitTransformOrigin = tr.x + 'px ' + tr.y + 'px';
        document.body.style.webkitTransform = 'translate(' + tr.x + 'px, ' + tr.y + 'px) scale(' + tr.scale + ')';
    }
    
})();
