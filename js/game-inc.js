jQuery(function ($) {

    var r = 1.34;

    var iframe = '';

    var g = $(".game:first");

    if (iframe && iframe.length) {
        var g2 = document.createElement('iframe');
        g2.setAttribute('frameborder', '0');
        g2.setAttribute('class', 'game');
        g2.setAttribute('allowfullscreen', 'allowfullscreen');
        g2.setAttribute('allowtransparency', 'allowtransparency');
        g2.setAttribute('src', iframe);
        $(g).parent().append(g2);
        $(g).remove();
        document.body.style.backgroundColor = '#000000';
        return;
    }

    var render = function (normal) {
        var swf = "bloons_tower_defense_5.swf",
            gap = 100,
            width = g.width(),
            current = $(window).height(),
            height = Math.round(width / (normal ? r : 3)),
            need_height = height;

        if (current < need_height && window.screen && window.screen.availHeight &&
            window.screen.availHeight >= current) {
            need_height = Math.min(need_height + gap, window.screen.availHeight - gap);
            chrome.windows.getCurrent(null, function (w) {
                if (w.height < need_height)
                    chrome.windows.update(w.id, {height: need_height})
            })
        }

        g.html('<object type="application/x-shockwave-flash"' + ' height="' +
            height + '" width="' + width + '" data="' + swf + '" title="Bloons Tower Defense 5">' +
            '<param name="wmode" value="direct"><param name="scale" value="exactfit">' +
            '<param name="quality" value="high"><embed src="' + swf + '"' +
            ' quality="high" bgcolor="#ffffff" height="' + height + '" width="' +
            width + '"' + ' name="Bloons Tower Defense 5" align="middle"' +
            ' type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" />' +
            '</object>');

    }, shockwave_flash_enabled = function () {
        return typeof navigator.mimeTypes['application/x-shockwave-flash'] !== 'undefined'
    };

    if (shockwave_flash_enabled()) {
        render(true);

        $(window).resize(function () {
            var width = g.width(),
                height = Math.round(width / r),
                emb = g.find(':first');
            emb.css({
                width: width + 'px',
                height: height + 'px'
            });
            emb.attr('width', width);
            emb.attr('height', height);
        });

    } else {
        $("#adobe-help").show();
        render(false);
    }


});