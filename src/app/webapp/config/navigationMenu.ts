export const navigationMenu: any = {
  Administrador: [
    {
      type: 'simple',
      icon: 'fa fa-home',
      link: 'home',
      label: 'Inicio'
    },
    {
      type: 'multiple',
      icon: 'fa-solid fa-gears',
      link: 'home',
      label: 'Configuración',
      childs: [
        { link: 'fragances', label: 'Fragancias' },
        { link: 'product-types', label: 'Tipos de producto' },
        { link: 'units', label: 'Unidades' },
        { link: 'categories', label: 'Categorias' },
      ]
    },
    {
      type: 'multiple',
      icon: 'fa-solid fa-wine-bottle',
      link: 'home',
      label: 'Productos',
      childs: [
        { link: 'products-update-by-file', label: 'Actualizar valores' },
        { link: 'products', label: 'Ver productos' },
      ]
    },
    {
      type: 'simple',
      icon: 'fa-solid fa-file-invoice',
      link: 'orders',
      label: 'Pedidos'
    },
    {
      type: 'simple',
      icon: 'fa-solid fa-dollar-sign',
      link: 'sales',
      label: 'Ventas'
    },
    {
      type: 'simple',
      icon: 'fa-solid fa-users',
      link: 'users',
      label: 'Usuarios'
    },
  ],
  Vendedor: [

  ],
  Cliente: [

  ],
  Operativo: [

  ],
  Default: []
};
