/*
  render-responsive-multi-screenshot-url.js
*/
var system = require("system");
var settings = require('./settings');

var RenderUrlsToFile;
var urls = new Array();

// Render Multiple URLs in several screen resolution to file
RenderUrlsToFile = function(urls, callbackPerUrl, callbackFinal) {
  var folder, getFilename, next, page, retrieve, timestamp, webpage;

  webpage = require("webpage");
  page = null;

  getTimestamp = function() {
    var d = new Date();
    var date = [
    d.getUTCFullYear(),
    d.getUTCMonth() + 1,
    d.getUTCDate()
    ];
    var time = [
    d.getHours() <= 9 ? '0' + d.getHours() : d.getHours(),
    d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes(),
    d.getSeconds() <= 9 ? '0' + d.getSeconds() : d.getSeconds(),
    d.getMilliseconds()
    ];

    return date.join('-') + '_' + time.join('-');
  };

  urlToDir = function(url) {
    var dir = 'homepage';
    var split = url.split('/');
    if(split.length > 1  && split[1] != '') {
      dir = url
      .replace(/^(http|https):\/\//, '')
      .replace(/\/$/, '');
    }
    return dir;
  };

  getFilename = function(folder, url, viewport) {
    return folder + "/" + urlToDir(url) + '-' + viewport.width +".png";
  };

  next = function(status, url, file) {
    page.close();
    callbackPerUrl(status, url, file);
    return retrieve();
  };

  retrieve = function() {
    var url;
    if (urls.length > 0) {
      url = urls.shift();
      page = webpage.create();
      page.settings.userAgent = "Phantom.js bot";
      return page.open("http://" + url, function(status) {
        var file;
        domain = url.split('/')[0];
        if (status === "success") {
          return window.setTimeout((function() {
            //var folder = 'Results/' + timestamp;
            function render(n) {
              if ( !!n ) {
                key = n - 1;
                page.viewportSize = settings.viewports[key];
                file = getFilename(folder, url, settings.viewports[key]);
                page.render(file);
                render(key);
              }
            }
            render(settings.viewports.length);
            return next(status, url, file);
          }), 200);
        } else {
          return next(status, url, file);
        }
      });
    } else {
      return callbackFinal();
    }
  };

  timestamp = getTimestamp();
  folder = 'tests/results/' + timestamp;
  return retrieve();
};

// create the urls with domains and base of urls
for (var i = 0; i < settings.domains.length; i++) {
  for (var j = 0; j < settings.base.length; j++) {
    urls.push(settings.domains[i] + settings.base[j]);
  }
}

RenderUrlsToFile(urls, (function(status, url, file) {
  if (status !== "success") {
    return console.log("Unable to render '" + url + "'");
  } else {
    return console.log("Successfully created the screenshots for the url [" + url + "]");
  }
}), function() {
  return phantom.exit();
});
