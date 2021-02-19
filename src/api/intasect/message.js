import request from '@/utils/request'

export function list(queryParams) {
  return request({
    url: '/intasect-service/messageInfoTbl/list',
    method: 'get',
    params: queryParams
  })
}

export function page(queryParams) {
  return request({
    url: '/intasect-service/messageInfoTbl/page',
    method: 'get',
    params: queryParams
  })
}

export function detail(id) {
  return request({
    url: '/intasect-service/messageInfoTbl/get/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/intasect-service/messageInfoTbl/save',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/intasect-service/messageInfoTbl/update/',
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: '/intasect-service/messageInfoTbl/delete/'+id,
    method: 'delete',
  })
}

export function dels(ids) {
    return request({
      url: '/intasect-service/messageInfoTbl/delete/'+ids,
      method: 'delete',
    })
  }

export function patch(id, data) {
  return request({
    url: '/intasect-service/messageInfoTbl/depts/' + id,
    method: 'patch',
    data: data
  })
}
