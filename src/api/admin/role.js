import request from '@/utils/request'

export function list(queryParams) {
  return request({
    url: '/api.admin/v1/roles',
    method: 'get',
    params: queryParams
  })
}

export function detail(id) {
  return request({
    url: '/api.admin/v1/roles/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/api.admin/v1/roles',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/api.admin/v1/roles/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/api.admin/v1/roles/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/api.admin/v1/roles/' + id,
    method: 'patch',
    data: data
  })
}


export function roleMenuIds(id) {
  return request({
    url: '/api.admin/v1/roles/' + id + '/menu_ids',
    method: 'get'
  })
}


export function rolePermissionIds(id, params) {
  return request({
    url: '/api.admin/v1/roles/' + id + '/permission_ids',
    method: 'get',
    params: params
  })
}

export function updateRoleMenuIds(id, menuIds) {
  return request({
    url: '/api.admin/v1/roles/' + id + '/menu_ids',
    method: 'put',
    data: {menuIds: menuIds}
  })
}

export function updateRolePermissionIds(id, type, permissionIds) {
  return request({
    url: '/api.admin/v1/roles/' + id + '/permission_ids',
    method: 'put',
    data: {type: type, permissionIds: permissionIds}
  })
}
