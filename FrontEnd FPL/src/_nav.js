import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'

//  CNavGroup, 
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavGroup,
    name: 'User',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'add New User',
        to: '/admin/adduser',
      },
      {
        component: CNavItem,
        name: 'List Of user',
        to: '/admin/listUsers',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Livre',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'add New Livre',
        to: '/admin/addLivre',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'List de Livre',
        to: '/admin/listLivre',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Categorie',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'add New Categorie',
        to: '/admin/addCategories',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'List de Categorie',
        to: '/admin/listCategorie', 
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav