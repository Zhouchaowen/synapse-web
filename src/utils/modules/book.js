import request from '../request'
export function saveBook(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data: data
  })
}

export function getBookList(userId) {
  return request({
    url: '/v1/books/'+userId,
    method: 'get',
  })
}
