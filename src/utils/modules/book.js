import request from '../request'

export function saveBook(data) {
  return request({
    url: '/v1/books',
    method: 'post',
    data: data
  })
}

export function getBookList() {
  return request({
    url: '/v1/books',
    method: 'get',
  })
}

export function getBookListByUserId(userId) {
  return request({
    url: '/v1/books/'+userId,
    method: 'get',
  })
}
