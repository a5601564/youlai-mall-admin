import request from '@/utils/request'

export function del(path) {
  return request({
    url: '/api.admin/v1/files',
    method: 'delete',
    params: { path: path}
  })
}
