/**
 * @file 浏览器对象
 * @author svon.me@gmail.com
 */
import UrlPattern from "url-pattern";
let root: any = {}
let doc: any = {}
if (typeof window === 'undefined') {
  doc = {
    documentElement: {
      clientHeight: 600,
      clientWidth: 1200,
      scrollTop: 0
    },
    scrollingElement: {
      scrollTop: 0
    },
    body: {
      scrollTop: 0,
      appendChild: function() {},
      removeChild: function() {}
    },
    execCommand: function() {},
    querySelector: function() {
      return void 0
    },
    createElement: function() {
      return void 0
    }
  }
  root = {
    open: function() {
      return void 0
    },
    screen: {
      width: 1200
    },
    innerHeight: 600,
    location: {
      href: 'https://kingdata.com/',
      pathname: '/',
      hostname: 'kingdata.com',
      origin: 'https://kingdata.com',
      replace: () => null,
      reload: () => null
    },
    navigator: {
      userAgent: ""
    },
    btoa: function(value: any) {
      return value
    },
    performance: {
      now: function() {
        return Date.now()
      }
    },
    scrollTo: () => null
  }
} else {
  try {
    // @ts-ignore
    root = window
    // @ts-ignore
    doc = document
  } catch (e) {
    // todo
    console.log(e)
  }
}

let __domain: string

const getDomain = function(): string {
  if (__domain) {
    return __domain;
  }
  const hostname = root.location.hostname
  if (hostname === 'localhost') {
    __domain = hostname;
    return hostname
  }
  const value = hostname.replace(/[^0-9]/g, '')
  if (/^[0-9]+$/.test(value)) {
    __domain = hostname;
    return hostname
  }
  try {
    const pattern = new UrlPattern(
      '(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)',
    )
    // @ts-ignore
    const data = pattern.match(hostname);
    __domain = `${data.domain}.${data.tld}`;
    return __domain;
  } catch (e) {
    console.log('UrlPattern', e)
  }
  return hostname
}

export { getDomain, root as window, doc as document }
