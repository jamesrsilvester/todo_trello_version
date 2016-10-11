(function($){
  $.fn.dragDropSort = function(options){
    var $doc = $(document),
        doNothing = function(){},
        settings = $.extend( true, {
          down: doNothing,
          move: doNothing,
          up: doNothing,
          axis: "y",
          target: "li",
          cloneStyle: {
            "background-color": "#c3c9cc"
          },
          floatStyle: {
            "position": "fixed",
            "box-shadow": "-2px 2px 8px 0 rgba(0,0,0,.25)",
            "webkitTransform": "rotate(4deg)",
            "mozTransform": "rotate(4deg)",
            "msTransform": "rotate(4deg)",
            "transform": "rotate(4deg)"
          }
        }, options);

    return this.each(function(){
      var $container = $(this),
          height = "height",
          width = "width";

      if ($container.css("box-sizing") == "border-box") {
        height = "outerHeight";
        width = "outerWidth";
      }

      $container.on("mousedown.dragDropSort", settings.target, function(e){
        if(e.which != 1) { return; }

        var tagName = e.target.tagName.toLowerCase();
        if(tagName == "input" || tagName == "textarea" || tagName == "select") { return; }

        var item = this,
            $item = $(item),
            offset = $item.offset(),
            disX = e.pageX - offset.left,
            disY = e.pageY - offset.top,
            clone = $item.clone()
                         .css(settings.cloneStyle)
                         .css("height", $item[height]())
                         .empty(),
            hasClone = 1,

            itemOuterHeight = $item.outerHeight(),
            itemOuterWidth = $item.outerWidth(),
            containerOuterHeight = $container.outerHeight(),

            upSpeed = itemOuterHeight,
            downSpeed = itemOuterHeight,
            maxSpeed = itemOuterHeight * 3;

        settings.down.call(item);

        $doc.on("mousemove.dragDropSort", function(e){
          if (hasClone){
            $item.before(clone)
                 .css("width", $item[width]())
                 .css(settings.floatStyle)
                 .appendTo($item.parent());

            hasClone = 0;
          }

          var left = e.pageX - disX,
              top = e.pageY - disY,
              prev = clone.prev(),
              next = clone.next().not($item),
              r_side = $container.next().find(settings.target),
              l_side = $container.prev().find(settings.target);

          $item.css({
            left: left,
            top: top
          });

          if (settings.axis === "x") {
            if (prev.length && left < prev.offset().left + prev.outerWidth() / 2) {
              clone.after(prev);
            } else if (next.length && left + itemOuterWidth > next.offset().left + next.outerHeight() / 2){
              clone.before(next);
            }

          } else if (settings.axis === "y") {
            if (r_side.length && left + itemOuterWidth > r_side.offset().left + r_side.outerWidth() / 2) {
              r_side.filter(function(idx, el) { return $(el).offset().top < top; }).last().after(clone);
              $container = $container.next();

            } else if (l_side.length && left < l_side.offset().left + l_side.outerWidth() / 2){
              l_side.filter(function(idx, el) { return $(el).offset().top < top; }).last().after(clone);
              $container = $container.prev();

            } else if (prev.length && top < prev.offset().top + prev.outerHeight() / 2) {
              clone.after(prev);
            } else if (next.length && top + itemOuterHeight > next.offset().top + next.outerHeight() / 2){
              clone.before(next);
            }
          }

          settings.move.call(item);
        })
        .on("mouseup.dragDropSort", function(e) {
          $doc.off("mousemove.dragDropSort mouseup.dragDropSort");

          if (!hasClone) {
            clone.before($item.removeAttr("style")).remove();
            settings.up.call(item);
          }

        });

        return false;
      });
    });
  };
})(jQuery);