import AdminJS from 'adminjs';

import Project from '../models/project';

import { hasAdminPermission } from '../services/auth'

export default {
  resource: Project,
  options: {
    parent: {
      icon: 'Roadmap',
    },
    actions:{
      new: {
        isAccessible: ({currentAdmin}) => hasAdminPermission(currentAdmin),
      },
      edit: {
        isAccessible: ({currentAdmin}) => hasAdminPermission(currentAdmin),
      },
      delete: {
        isAccessible: ({currentAdmin}) => hasAdminPermission(currentAdmin),
      }
    },
    properties: {
      id:{
        position: 1,
      },
      name: {
        position: 2,
        isRequired: true,
      },
      description: {
        position: 3,
        type: 'textarea',
      },
      userId:{
        position: 4,
      },
      user_id:{
        isVisible: false,
      },
      status:{
        position: 5,
        isRequired: true,
        availableValues: [
          {value : 'active', label: 'Ativo'},
          {value : 'archived', label: 'Arquivado'},
        ]
      },
      createdAt:{
        position: 7,
        isVisible: {list: true, filter: true, show: true, edit: false},
      },
      updatedAt:{
        position: 8,
        isVisible: {list: true, filter: true, show: true, edit: false},
      },
    },
  },
  
}