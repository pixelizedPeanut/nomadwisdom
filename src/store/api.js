const BASE = 'http://77.68.96.104/utilities/curlProxyNature.php?url='
// const BASE = 'http://77.68.96.104/utilities/curlProxy.php?url='

export default {
  /**
   * Request data
   */
  getFeeds (url) {
    return window.fetch(BASE + encodeURIComponent(url), {
      method: 'GET'
    }).then(res => res.json())
  }
}
