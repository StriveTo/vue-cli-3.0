import {inBrowser} from './env'

class Dom {
  appendChild() {}
  removeChild() {}
  querySelector() {}
  addEventListener() {}
  removeEventListener() {}
}

const dom = new Dom()
let qbDocument = dom
let qbBody = dom

qbDocument.body = qbBody

if (inBrowser) {
  qbDocument = window.document
  qbBody = document.body
}

export {qbDocument, qbBody, dom}
