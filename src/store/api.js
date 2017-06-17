const BASE = 'http://nomadwisdom.tk/utilities/curlProxy.php?url='

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
