import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Users component
const AddUser  = React.lazy(() => import('./views/pages/Users/addUser'));
const ListUser  = React.lazy(() => import('./views/pages/Users/listUser'));
const UpdateUser  = React.lazy(() => import('./views/pages/Users/updateUser'));

// Livre component
const AddLivre  = React.lazy(() => import('./views/pages/Livres/addLivre'));
const ListLivre  = React.lazy(() => import('./views/pages/Livres/listLivre'));
const updateLivre  = React.lazy(() => import('./views/pages/Livres/updateLivre'));


// Categorie component
const AddCategorie  = React.lazy(() => import('./views/pages/categories/addCategories'));
const ListCategorie  = React.lazy(() => import('./views/pages/categories/listCategories'));
const UpdateCategorie = React.lazy(() => import('./views/pages/categories/updateCategories'));







const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  
  { path: '/addUser', name: 'Users', element: AddUser },
  { path: '/listUsers', name: 'Users', element: ListUser },
  { path: '/UpdateUser/:id', name: 'Users', element: UpdateUser },


  { path: '/addLivre', name: 'livre', element: AddLivre },
  { path: '/listLivre', name: 'livre', element: ListLivre },
  { path: '/UpdateLivre/:id', name: 'livre', element: updateLivre },


  { path: '/AddCategories', name: 'Categorie', element: AddCategorie },
  { path: '/listCategorie', name: 'Categorie', element: ListCategorie },
  { path: '/UpdateCategorie/:id', name: 'Categorie', element: UpdateCategorie },

 
]

export default routes