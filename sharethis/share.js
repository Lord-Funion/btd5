(function () {

    function _e(elements, callback) {
        $.each(elements, function () {
            callback(this)
        })
    }

    _e(document.getElementsByClassName('share-btns'), function (btns) {
        _e(['blogger', 'delicious', 'diaspora', 'email', 'pinterest', 'reddit', 'refind',
            'skype', 'telegram', 'tumblr', 'twitter', 'whatsapp', 'evernote', 'facebook', 'flipboard',
            'getpocket', 'gmail', 'instapaper', 'line', 'messenger', 'yahoomail'], function (cls) {

            var social = document.createElement('div');
            var span = document.createElement('span');
            span.innerText = cls;
            social.setAttribute('data-network', cls);
            social.className = 'share-btn';
            var img = document.createElement('img');
            img.setAttribute('src', 'sharethis/img/' + cls + '.svg');
            img.setAttribute('alt', cls);
            social.appendChild(img);
            social.appendChild(span);
            btns.appendChild(social);
        });
    });

    var services = {
        facebook: 'https://www.facebook.com/sharer.php?t=&u=%SITE',
        twitter: 'https://twitter.com/intent/tweet?text=&url=%SITE',
        pinterest: 'https://pinterest.com/pin/create/link/?url=%SITE',
        email: 'mailto:?subject=%TITLE&body=%SITE',
        blogger: 'https://www.blogger.com/blog-this.g?n=&t=&u=%SITE',
        delicious: 'https://del.icio.us/save?provider=sharethis&title=%TITLE&url=%SITE&v=5',
        diaspora: 'https://share.diasporafoundation.org/?title=%TITLE&url=%SITE',
        evernote: 'https://www.evernote.com/clip.action?title=%TITLE&url=%SITE',
        flipboard: 'https://share.flipboard.com/bookmarklet/popout?ext=sharethis&title=%TITLE&url=%SITE&utm_campaign=widgets&utm_content=&utm_source=sharethis&v=2',
        getpocket: 'https://getpocket.com/edit?url=%SITE',
        gmail: 'https://mail.google.com/mail/?view=cm&to=&su=%TITLE&body=%SITE&bcc=&cc=',
        instapaper: 'https://www.instapaper.com/edit?url=%SITE&title=%TITLE&description=',
        line: 'https://lineit.line.me/share/ui?url=%SITE&text=',
        messenger: 'https://www.facebook.com/dialog/send?link=%SITE&app_id=521270401588372&redirect_uri=%SITE',
        reddit: 'https://www.reddit.com/submit?title=&url=%SITE',
        refind: 'https://refind.com/?url=%SITE',
        skype: 'https://web.skype.com/share?url=%SITE&text=',
        telegram: 'https://t.me/share/url?url=%SITE&text=&to=',
        tumblr: 'https://www.tumblr.com/share?t=&u=%SITE&v=3',
        whatsapp: 'https://web.whatsapp.com/send?text=%SITE',
        yahoomail: 'https://compose.mail.yahoo.com/?to=&subject=%TITLE&body=%SITE'
    };

    var appName = chrome.runtime.getManifest().name;
    var shareUrl = 'https://chrome.google.com/webstore/detail/' + chrome.runtime.id;

    function open_share_window(url_mask) {
        var app_name_encoded = encodeURIComponent(appName);
        var url_encoded = encodeURIComponent(shareUrl);
        var url = url_mask.replace('%SITE', url_encoded).replace('%TITLE', app_name_encoded);
        if (url_mask.indexOf("mailto:") > -1) {
            return document.location = url
        } else {
            var height = Math.min(700, innerHeight);
            var width = Math.min(900, 0.9 * innerWidth);
            return window.open(url, "", [
                "height=" + height,
                "left=" + (innerWidth - width) / 2,
                "top=" + (innerHeight - height) / 2,
                "width=" + width,
                "status=1",
                "toolbar=0"
            ].join(","))
        }
    }

    _e(document.getElementsByClassName('share-toggle'), function (st) {
        st.addEventListener('click', function () {
            if (this.parentElement && this.parentElement.classList.contains('share-toggleable')) {
                if (this.parentElement.classList.contains('share-hidden')) {
                    this.parentElement.classList.remove('share-hidden')
                } else {
                    this.parentElement.classList.add('share-hidden')
                }
            }
        }, false)
    });

    _e(['share-btns', 'share-close'], function (cls) {
        _e(document.getElementsByClassName(cls), function (st) {
            st.addEventListener('click', function () {
                if (this.parentElement && !this.parentElement.classList.contains('share-hidden')) {
                    this.parentElement.classList.add('share-hidden')
                }
            }, false)
        })
    });

    _e(document.getElementsByClassName('share-btn'), function (btn) {
        btn.addEventListener('click', function () {
            var network = this.getAttribute('data-network');
            if (network) {
                if (typeof services[network] === 'string')
                    open_share_window(services[network]);
                else
                    document.getElementById('share-this-backdrop').classList.remove('share-hidden');

            }
        }, false)
    });


})();
