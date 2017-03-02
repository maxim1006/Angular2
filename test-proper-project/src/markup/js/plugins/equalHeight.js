(function($, undefined) {

    jQuery.fn.equalHeight = function(options) {
        var defaults = {
            class: 'js-equal-height'
        };

        var $this = $(this);

        options = $.extend({}, defaults, options);

        return $this.each(function() {
            var lines = $(this);

            if (lines.data('equalHeightsInited')) {
                return;
            }

            lines.data('equalHeightsInited', true);

            function init() {
                updateVars();
                bindEvents();
            }

            function updateVars() {
            }

            function bindEvents() {

                $(window).resize(resize);
                resize();

                function resize() {
                    setHeights(lines.find('.' + options.class));
                }
                
            }

            init();

            function setHeights(obj) {
                var maxHeight = 0;

                obj.css('height', 'auto');

                obj.each(function() {
                    var objHeight = $(this).innerHeight();

                    if (objHeight > maxHeight) {
                        maxHeight = objHeight;
                    }
                });

                if (maxHeight > 0) {
                    obj.css('height', maxHeight);
                }
            }
        });

    };

})(jQuery);