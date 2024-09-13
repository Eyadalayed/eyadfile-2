export const USER_ROLES = {
    MANAGER: 'manager',
    PRODUCTION_LEADER: 'production_leader',
    MACHINE_OPERATOR: 'machine_operator',
    QUALITY_INSPECTOR: 'quality_inspector',
    FORKLIFT_DRIVER: 'forklift_driver'
  };
  
  export const ROLE_PERMISSIONS = {
    [USER_ROLES.MANAGER]: [
      'create_job_order',
      'view_job_orders',
      'update_job_order',
      'delete_job_order',
      'create_pallet',
      'view_pallets',
      'update_pallet_status',
      'view_users',
      'create_user',
      'update_user',
      'delete_user'
    ],
    [USER_ROLES.PRODUCTION_LEADER]: [
      'create_job_order',
      'view_job_orders',
      'update_job_order',
      'create_pallet',
      'view_pallets'
    ],
    [USER_ROLES.MACHINE_OPERATOR]: [
      'view_job_orders',
      'view_pallets',
      'scan_pallet'
    ],
    [USER_ROLES.QUALITY_INSPECTOR]: [
      'view_job_orders',
      'view_pallets',
      'update_pallet_status',
      'scan_pallet'
    ],
    [USER_ROLES.FORKLIFT_DRIVER]: [
      'view_job_orders',
      'view_pallets',
      'update_pallet_status',
      'scan_pallet'
    ]
  };