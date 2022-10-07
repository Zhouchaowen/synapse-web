import request from '../request'

export function login() {
  // request.head('Authorization','Basic YWRtaW5AZXhhbXBsZS5jb206Z29waGVycw==')
  return request({
    url: '/v1/users/token',
    method: 'get',
  })
}

