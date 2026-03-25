const CONFIG = {
    get PROXY() { return window.location.origin + "/api-proxy?url="; },
    BASE_URL: "https://api.sansekai.my.id/api/dramabox",
    ENDPOINTS: {
        FOR_YOU: "/foryou",
        VIP: "/vip",
        DUB_INDO: "/dubindo",
        LATEST: "/latest",
        TRENDING: "/trending",
        SEARCH: "/search",
        DETAIL: "/detail",
        ALL_EPISODE: "/allepisode",
        DECRYPT: "/decrypt"
    }
};

function getFinalUrl(key, params = {}) {
    let endpoint = CONFIG.ENDPOINTS[key];
    let query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (key === 'DUB_INDO') query.append('classify', 'terpopuler');
    if (key === 'SEARCH' && params.query) query.append('query', params.query);
    if (params.bookId) {
        query.append('bookId', params.bookId);
    }
    if (key === 'DECRYPT' && params.url) {
        return CONFIG.PROXY + encodeURIComponent(params.url);
    }

    let fullUrl = query.toString() ? `${CONFIG.BASE_URL}${endpoint}?${query.toString()}` : `${CONFIG.BASE_URL}${endpoint}`;
    return CONFIG.PROXY + encodeURIComponent(fullUrl);
}
