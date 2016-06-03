# render-responsive-multi-screenshot-url
Create multiple screenshots in several viewport resolutions

This script allows to create screenshots for multiple urls of multiple websites in multiple screen resolutions. This script is based on the 2 examples provided by phantomjs : [render_multi_url](https://github.com/ariya/phantomjs/blob/master/examples/render_multi_url.js) and  [responsive_screenshot](https://github.com/ariya/phantomjs/blob/master/examples/responsive-screenshot.js).

## How to use this script
By default, the script will create only one screenshot for google.com website.

To create screenshots for your own websites, update the domains array and add you websites in the list:

domains = [
  "google.com"
];

You can update the base array to create screeenshot for other pages
base = [
  "/", // root of the website
];
