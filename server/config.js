module.exports = {
    // Port to run on. Can be overriden with '--port' launch parameter.  Not used if launched with '--sessionID'.
    port: 3000,

    // Logging settings.
    logging: {
        logLevel: 'info',
        // If set to true, all developer run log files are stored in a logs folder.
        persist: false,
        // Things to not log.  Applies to client requests/responses (<== and ==>)
        // E.g. { "login.submit": ["password"] } will filter out password from login.submit requests.
        filters: {
        },
        // Things to not log.  Applies to API requests/responses (<-- and -->)
        // E.g. { "ldap.login": ["args[0].password"] } will filter out password from ldap API connector login call.
        apiFilters: {
        },
        logEntrySize: {
            client: {
                request: -1,
                response: 80
            },
            api: {
                request: 80,
                response: 0
            }
        }
    },
    // WebSocket Server settings.
    websocket: {
        // # of seconds to send keep-alive pings.
        keepAlive: 30,
        // The maximum allowed message size in bytes.
        maxPayload: 10000000,
        // Enable/disable permessage-deflate compression of websocket frames.
        perMessageDeflate: true
    },
    // Allow handling of POST requests as well as WebSocket requests.
    // allowPOSTRequests: true,
    //
    // Custom HTTP Handler
    // customHTTPHandler: (request, response) => {
    //    return true; // Return true exit early - takes precedence over POST requests.
    // },
    // Settings for the appServer
    appServer: {
        port: 9080,
        protocol: "http",
        host: "localhost",
        rejectUnauthorized: false
    },
    // Configure how long the session lives without client connections.
    connectionWaitTimes: {
        // # of seconds that a disconnected session stays.
        disconnected: 5 * 60,
        // # of seconds to wait for the first initial connection.  If not set, defaults to 'disconnected' time.
        firstconnect: 3 * 60
    },
    // How long a file download token is valid for once it's first accessed. (Default is 10 minutes)
    fileDownloadTokenValidTime: 10 * 60 * 1000,
    chrome: {
        // Configuration for various Chrome allowed proxy settings.
        // See: https://www.chromium.org/developers/design-documents/network-settings/#TOC-Command-line-options-for-proxy-settings
        proxy: {
            // If true, uses "--proxy-auto-detect" (https://en.wikipedia.org/wiki/Web_Proxy_Auto-Discovery_Protocol)
            autoDetect: false,
            // If enabled, used Proxy Auto Config script to determine proxy server: https://en.wikipedia.org/wiki/Proxy_auto-config
            autoConfigScript: {
                enabled: false,
                // Uses --proxy-pac-url=<url>
                url: ""
            },
            // If enabled, uses the manual proxy server setting.
            proxyServer: {
                enabled: false,
                // Uses --proxy-server=<url>
                url: "",
                // If specified, adds in --proxy-bypass-list=<bypassRules>
                // See https://cs.chromium.org/chromium/src/net/proxy_resolution/proxy_bypass_rules.h?sq=package:chromium&type=cs&l=96-139
                bypassRules: ""
            }
        },
        // See: https://www.chromium.org/developers/design-documents/http-authentication
        authServerWhiteList: ""
    }
    // ****************** HTTP Proxy for allowing re-writing of content ********************
    // This session can be used to make HTTP requests for HTTP content if this area is configured.
    //
    // To request data, pass in a URL parameter corresponding to the 'urlParameter' config.  E.g if it's
    // set to "originalSiteUrl", make a request to http://localhost:3000/?originalSiteUrl=<original_url>,
    // and that content will be fetched.
    //
    // The advantage over going to the original site is in the "addCookies" which will use the
    // same cookies for validating against the original site, so we can bypass authentication, and
    // in the "replaceStream" option, which allows re-writing the original content.
    //
    // httpProxy: {
    //     urlParameter: 'url',
    //     addCookies: false,
    //     replaceStream: function (request, config, launchparams) {
    //         var baseURL = launchparams.httpServerUrl ? launchparams.httpServerUrl : 'https://' + request.headers.host + '/';
    //         return [
    //             {  // Remove target="_blank" in HTML page.
    //                 contentType: 'text/html',
    //                 search: /target\=\"_blank\"/gi,
    //                 replace: '',
    //                 options: { maxMatchLen: 10000 }
    //             },
    //             { // Rewrite URLS within HTML page to be proxied that don't start with a # or don't point to youtube.com
    //                 contentType: 'text/html',
    //                 search: /href\=\".*?\"/gi,
    //                 replace: function (match) {
    //                     var m = match.slice(6);
    //                     if (m[0] == '#' || m.indexOf('https://youtube.com') == 0) {
    //                         return match;
    //                     }
    //                     return 'href="' + baseURL + '?url=' + m;
    //                 },
    //                 options: { maxMatchLen: 10000 }
    //             }
    //         ];
    //     }
    // }
};
