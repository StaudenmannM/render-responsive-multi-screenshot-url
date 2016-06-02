// Viewports used to take the screenshots
var viewports = [
    { width : 1200, height : 800 },
    { width : 1024, height : 768 },
    { width : 768, height : 1024 },
    { width : 480, height : 640 },
    { width : 320, height : 480 }
];

// All the domains to crawl
domains = [
  "localhost"
];

// Al the URLs (will be concate with domains)
base = [
  "/", // root of the website
  "/test-1.html",
  "/folder/test-2.html",
  "unknown page"
];

module.exports = {
    domains:domains,
    base:base,
    viewports:viewports
};
