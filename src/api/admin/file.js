import request from '@/utils/request'

export function del(path) {
  return request({
    url: '/intasect-service/api.admin/v1/files',
    method: 'delete',
    params: { path: path}
  })
}
