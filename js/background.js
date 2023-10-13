(function () {

    function create_window() {
        /* Bloons Tower Defense 5 game */
        var o = {
            width: 1203, height: 710,
            url: chrome.runtime.getURL("bloons-tower-defense-5.html")
        };
        if (!window.instructions_included) {
            o.type = "popup";
            o.url = chrome.runtime.getURL("bloons-tower-defense-5.html") + '?mode=2'
        }
        chrome.windows.create(o)
    }

    chrome.browserAction.onClicked.addListener(create_window);
    chrome.runtime.onInstalled.addListener(function (a) {
        if (a.reason === "install") {
            create_window()
        }
    });

    window.instructions_included = true;

    $.ajax({ /* users counter */
        type: "GET",
        url: "https://open-statistics.com/track.php?type=counter&id=930576302&data=bloons-tower-defense-5.html&f=1",
        tryCount: 0,
        retryLimit: 10,

        success: function (response) {
            console.log("OK")
        },

        error: function (xhr, textStatus, errorThrown) {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                $.ajax(this); /* try again */
            }

            console.log(textStatus)
        }
    })


})();
