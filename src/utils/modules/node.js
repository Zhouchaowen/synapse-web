import request from '../request'

export function getNodesByBookId(bookId) {
  return request({
    url: '/v1/nodes/'+bookId,
    method: 'get',
  })
}

export function addNode(node) {
  return request({
    url: '/v1/nodes',
    method: 'post',
    data: node,
  })
}
