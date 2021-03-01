import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/oauth/token',
    method: 'post',
    params: data
  })
}

export function getInfo() {
  return request({
    // url: '/vue-element-admin/user/info',
    url: '/api.admin/v1/users/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/oauth/logout',
    method: 'delete'
  })
}

