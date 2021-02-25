import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/intasect-service/oauth/token',
    method: 'post',
    params: data
  })
}

export function getInfo() {
  return request({
    // url: '/vue-element-admin/user/info',
    url: '/intasect-service/api.admin/v1/users/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/intasect-service/oauth/logout',
    method: 'delete'
  })
}

