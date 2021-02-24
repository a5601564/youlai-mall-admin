import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/youlai-admin/oauth/token',
    method: 'post',
    params: data
  })
}

export function getInfo() {
  return request({
    // url: '/vue-element-admin/user/info',
    url: '/youlai-admin/api.admin/v1/users/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/youlai-admin/oauth/logout',
    method: 'delete'
  })
}

