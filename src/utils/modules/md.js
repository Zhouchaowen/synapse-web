import request from '../request'

export function getMdById(Id) {
  return request({
    url: '/v1/md/'+Id,
    method: 'get',
  })
}

export function saveMd(data) {
  return request({
    url: '/v1/md',
    method: 'post',
    data: data,
  })
}
