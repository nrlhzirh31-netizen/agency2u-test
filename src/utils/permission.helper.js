import { sharedHelper, localizationHelper } from '@/utils'
import { SESSION, ROUTE_NAME, pPermission } from '@/constants'

const MODULE_ID = getAllModules()

export function getAuthorizedMenuList() {
  let permissionsGranted = localStorage.getItem(SESSION.ROLE_PERMISSIONS)

  permissionsGranted = permissionsGranted.length > 0 ? JSON.parse(permissionsGranted) : []
  let sideMenu = getMenuItem()
  let sideMenuChild = getChildMenuItem()

  // if (permissionsGranted.length === 0) return

  const permissionList = new Set(
    permissionsGranted.map((item) => {
      return item.domain.code
    })
  )

  // filter parent menu by permitted list
  sideMenu = sideMenu.filter((item) => {
    if (!item.moduleId) return item
    const permitted = item.moduleId?.find((moduleId) => {
      return permissionList.has(moduleId) ?? moduleId
    })
    if (permitted) return item
  })

  // filter child menu by permitted list
  sideMenuChild = sideMenuChild.filter((item) => {
    return permissionList.has(item.moduleId) ?? item
  })

  // combine parent and child
  const menuList = sideMenu.map((parent) => {
    if (!parent.moduleId) return parent
    sideMenuChild.find((child) => {
      if (parent.moduleId.includes(child.moduleId)) {
        parent.child.push(child)
      }
    })
    return parent
  })
  return menuList
}

export function isAuthenticated() {
  let result = false

  if (sharedHelper.hasAuthToken() && sharedHelper.isActiveUser()) {
    //user have token info
    //AND user has not leave the page idle for x minutes
    result = true
  }

  return result
}

function getMenuItem() {
  return Object.freeze([
    {
      title: localizationHelper.getMessage('label.home'),
      href: {
        name: ROUTE_NAME.HOME
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'house' }
      }
    },
    {
      title: localizationHelper.getMessage('label.dashboard'),
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'gauge' }
      },
      child: [],
      moduleId: [MODULE_ID.DASHBOARD, MODULE_ID.ANSURAN_DASHBOARD]
    },
    {
      title: localizationHelper.getMessage('label.administrative'),
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'users' }
      },
      child: [],
      moduleId: [MODULE_ID.USER, MODULE_ID.ACCESS_MATRIX, MODULE_ID.COMMISSION_RATE, MODULE_ID.ANSURAN_COMMISSION_RATE]
    },
    {
      title: localizationHelper.getMessage('label.commonParameters'),
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'indent' }
      },
      child: [],
      moduleId: [MODULE_ID.COMMON_PARAMS]
    },
    {
      title: localizationHelper.getMessage('label.products'),
      href: {
        name: ROUTE_NAME.PRODUCT_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'tags' }
      },
      child: [],
      moduleId: [MODULE_ID.PRODUCT]
    },
    {
      title: localizationHelper.getMessage('label.orderManagement'),
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'box-archive' }
      },
      child: [],
      moduleId: [MODULE_ID.APPLICATION]
    },
    {
      title: localizationHelper.getMessage('label.ansuranOrderManagement'),
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'box-archive' }
      },
      child: [],
      moduleId: [MODULE_ID.ANSURAN_APPLICATION]
    },
    {
      title: localizationHelper.getMessage('label.claimManagement'),
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'list-check' }
      },
      child: [],
      moduleId: [MODULE_ID.CLAIM_SUBMISSION, MODULE_ID.CLAIM_PAYOUT, MODULE_ID.CLAIM_HISTORY, MODULE_ID.CLAIM_RECONCILE]
    },
    {
      title: `${localizationHelper.getMessage('label.ai')} ${localizationHelper.getMessage('label.claimManagement')}`,
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'list-check' }
      },
      child: [],
      moduleId: [MODULE_ID.ANSURAN_CLAIM_SUBMISSION, MODULE_ID.ANSURAN_CLAIM_PAYOUT, MODULE_ID.ANSURAN_CLAIM_HISTORY, MODULE_ID.ANSURAN_CLAIM_RECONCILE]
    },
    {
      title: localizationHelper.getMessage('label.report'),
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'boxes-stacked' }
      },
      child: [],
      moduleId: [MODULE_ID.REPORT]
    },
    {
      title: localizationHelper.getMessage('label.ansuranReport'),
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'boxes-stacked' }
      },
      child: [],
      moduleId: [MODULE_ID.ANSURAN_REPORT]
    }
  ])
}

function getChildMenuItem() {
  return Object.freeze([
    {
      title: localizationHelper.getMessage('label.dashboard'),
      href: {
        name: ROUTE_NAME.DASHBOARD
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'gauge' }
      },
      moduleId: MODULE_ID.DASHBOARD,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.ansuranDashboard'),
      href: {
        name: ROUTE_NAME.ANSURAN_DASHBOARD
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'gauge' }
      },
      moduleId: MODULE_ID.DASHBOARD,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.users'),
      href: {
        name: ROUTE_NAME.USER_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'user' }
      },
      moduleId: MODULE_ID.USER,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.rolesPermissions'),
      href: {
        name: ROUTE_NAME.ROLE_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'users' }
      },
      moduleId: MODULE_ID.ACCESS_MATRIX,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.company'),
      href: {
        name: ROUTE_NAME.COMPANY_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'building' }
      },
      moduleId: MODULE_ID.USER,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.commissionRate'),
      href: {
        name: ROUTE_NAME.COMMISSION_RATE_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'percent' }
      },
      moduleId: MODULE_ID.COMMISSION_RATE,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: `${localizationHelper.getMessage('label.ai')} ${localizationHelper.getMessage('label.commissionRate')}`,
      href: {
        name: ROUTE_NAME.ANSURAN_COMMISSION_RATE_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'percent' }
      },
      moduleId: MODULE_ID.ANSURAN_COMMISSION_RATE,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.bank'),
      href: {
        name: ROUTE_NAME.BANK_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'wallet' }
      },
      moduleId: MODULE_ID.COMMON_PARAMS,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.applicationTypes'),
      href: {
        name: ROUTE_NAME.APPLICATION_TYPE_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'file-circle-check' }
      },
      moduleId: MODULE_ID.COMMON_PARAMS,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.customerApplication'),
      href: {
        name: ROUTE_NAME.CUSTOMER_APPLICATION_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'file' }
      },
      moduleId: MODULE_ID.APPLICATION,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.customerApplicationHistory'),
      href: {
        name: ROUTE_NAME.APPLICATION_HISTORY
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: MODULE_ID.APPLICATION,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    // {
    //   title: localizationHelper.getMessage('label.uploadOrder'),
    //   href: {
    //     name: ROUTE_NAME.CUSTOMER_APPLICATION_LIST
    //   },
    //   icon: {
    //     element: 'font-awesome-icon',
    //     attributes: { icon: 'paperclip' }
    //   },
    //   moduleId: MODULE_ID.APPLICATION,
    //   permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    // },
    {
      title: localizationHelper.getMessage('label.claimSubmission'),
      href: {
        name: ROUTE_NAME.CLAIM_SUBMISSION_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: 'CLAIM_SUBMISSION',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.claimPayout'),
      href: {
        name: ROUTE_NAME.CLAIM_PAYOUT_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: 'CLAIM_PAYOUT',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.claimHistory'),
      href: {
        name: ROUTE_NAME.CLAIM_HISTORY_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: 'CLAIM_HISTORY',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.claimReconcile'),
      href: {
        name: ROUTE_NAME.CLAIM_RECONCILE_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: 'CLAIM_RECONCILE',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.reportClaimSubmission'),
      href: {
        name: ROUTE_NAME.REPORT_CLAIM_SUBMISSION
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'box' }
      },
      moduleId: 'REPORT',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.reportClaimPayout'),
      href: {
        name: ROUTE_NAME.REPORT_CLAIM_PAYOUT
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'box' }
      },
      moduleId: 'REPORT',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.reportSalesTransaction'),
      href: {
        name: ROUTE_NAME.REPORT_SALES_TRANSACTION
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'box' }
      },
      moduleId: 'REPORT',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.ansuranApplication'),
      href: {
        name: ROUTE_NAME.ANSURAN_APPLICATION_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'file' }
      },
      moduleId: MODULE_ID.ANSURAN_APPLICATION,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.ansuranApplicationHistory'),
      href: {
        name: ROUTE_NAME.ANSURAN_APPLICATION_HISTORY
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: MODULE_ID.ANSURAN_APPLICATION,
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: `${localizationHelper.getMessage('label.ai')} ${localizationHelper.getMessage('label.claimSubmission')}`,
      href: {
        name: ROUTE_NAME.ANSURAN_CLAIM_SUBMISSION_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: 'ANSURAN_CLAIM_SUBMISSION',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: `${localizationHelper.getMessage('label.ai')} ${localizationHelper.getMessage('label.claimPayout')}`,
      href: {
        name: ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: 'ANSURAN_CLAIM_PAYOUT',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: `${localizationHelper.getMessage('label.ai')} ${localizationHelper.getMessage('label.claimHistory')}`,
      href: {
        name: ROUTE_NAME.ANSURAN_CLAIM_HISTORY_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: 'ANSURAN_CLAIM_HISTORY',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: `${localizationHelper.getMessage('label.ai')} ${localizationHelper.getMessage('label.claimReconcile')}`,
      href: {
        name: ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_LIST
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'paperclip' }
      },
      moduleId: 'ANSURAN_CLAIM_RECONCILE',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    },
    {
      title: localizationHelper.getMessage('label.ansuranReportSalesTransaction'),
      href: {
        name: ROUTE_NAME.ANSURAN_REPORT_SALES_TRANSACTION
      },
      icon: {
        element: 'font-awesome-icon',
        attributes: { icon: 'box' }
      },
      moduleId: 'ANSURAN_REPORT',
      permissions: [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
    }
  ])
}

export function getAllModules() {
  return Object.freeze({
    USER: 'USER',
    ACCESS_MATRIX: 'ACCESS_MATRIX',
    COMMON_PARAMS: 'COMMON_PARAMS',
    COMMISSION_RATE: 'COMMISSION_RATE',
    ANSURAN_COMMISSION_RATE: 'ANSURAN_COMMISSION_RATE',
    PRODUCT: 'PRODUCT',
    APPLICATION: 'APPLICATION',
    ANSURAN_APPLICATION: 'ANSURAN_APPLICATION',
    CLAIM_SUBMISSION: 'CLAIM_SUBMISSION',
    CLAIM_PAYOUT: 'CLAIM_PAYOUT',
    CLAIM_HISTORY: 'CLAIM_HISTORY',
    CLAIM_RECONCILE: 'CLAIM_RECONCILE',
    REPORT: 'REPORT',
    DASHBOARD: 'DASHBOARD',
    ANSURAN_DASHBOARD: 'ANSURAN_DASHBOARD',
    ANSURAN_CLAIM_SUBMISSION: 'ANSURAN_CLAIM_SUBMISSION',
    ANSURAN_CLAIM_PAYOUT: 'ANSURAN_CLAIM_PAYOUT',
    ANSURAN_CLAIM_HISTORY: 'ANSURAN_CLAIM_HISTORY',
    ANSURAN_CLAIM_RECONCILE: 'ANSURAN_CLAIM_RECONCILE',
    ANSURAN_REPORT: 'ANSURAN_REPORT'
  })
}

export function getAllActions() {
  return Object.freeze({
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    MANAGE: 'MANAGE',
    READ_DASHBOARD_BEST_SELLER: 'READ_DASHBOARD_BEST_SELLER',
    READ_DASHBOARD_AGENT_MONITOR: 'READ_DASHBOARD_AGENT_MONITOR',
    READ_DASHBOARD_COMMISSION: 'READ_DASHBOARD_COMMISSION',
    READ_DASHBOARD_SALES_CHART: 'READ_DASHBOARD_SALES_CHART',
    READ_ANSURAN_DASHBOARD_SALES_CHART: 'READ_ANSURAN_DASHBOARD_SALES_CHART'
  })
}

export function isAuthorizedAction(moduleId, action) {
  //return requiredPermission
  return checkIsAuthorizedAction(moduleId, pPermission[action])
}

function checkIsAuthorizedAction(moduleId, requiredPermission) {
  let permissionsGranted = localStorage.getItem(SESSION.ROLE_PERMISSIONS)

  permissionsGranted = permissionsGranted
    ? JSON.parse(permissionsGranted)
        .filter((item) => {
          if (item.domain.code === moduleId) return item
        })
        .map((item) => {
          return item.action
        })
        .flat()
    : []
  return permissionsGranted.includes(requiredPermission) ? true : false
}

export function isAuthorizedPage(targetPage) {
  let result = false
  let permissionsGranted = localStorage.getItem(SESSION.ROLE_PERMISSIONS)

  if (permissionsGranted != '' && permissionsGranted != 'undefined' && permissionsGranted != null) {
    const sideMenu = getMenuItem()
    permissionsGranted = JSON.parse(permissionsGranted)

    if (permissionsGranted && permissionsGranted.length > 0) {
      const permissionList = permissionsGranted
      const pagePermission = getPagePermission(targetPage)

      for (let sIndex = 0; sIndex < sideMenu.length; sIndex++) {
        for (let pindex = 0; pindex < permissionList.length; pindex++) {
          if (sideMenu[sIndex].moduleId.indexOf(permissionList[pindex].domain.code) > -1) {
            let hasAccess = pagePermission.indexOf(permissionList[pindex].action) > -1

            if (hasAccess) {
              result = true
              break
            }
          }
        }
      }
    }
  }

  return result
}

function getPagePermission(page) {
  //user with any permission stated in the permission array, is allow to access to the page
  let permission = []

  switch (page) {
    //User
    case ROUTE_NAME.USER_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.USER_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.USER_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Role
    case ROUTE_NAME.ROLE_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.ROLE_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.ROLE_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Product
    case ROUTE_NAME.PRODUCT_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.PRODUCT_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.PRODUCT_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Application Types
    case ROUTE_NAME.APPLICATION_TYPE_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.APPLICATION_TYPE_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.APPLICATION_TYPE_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Company
    case ROUTE_NAME.COMPANY_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.COMPANY_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.COMPANY_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Bank
    case ROUTE_NAME.BANK_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.BANK_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.BANK_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Commission Rate
    case ROUTE_NAME.COMMISSION_RATE_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.COMMISSION_RATE_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.COMMISSION_RATE_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Customer Application
    case ROUTE_NAME.CUSTOMER_APPLICATION_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.CUSTOMER_APPLICATION_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.CUSTOMER_APPLICATION_DETAILS_REJECTED:
    case ROUTE_NAME.CUSTOMER_APPLICATION_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Claim Payout
    case ROUTE_NAME.CLAIM_PAYOUT_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.CLAIM_PAYOUT_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.CLAIM_PAYOUT_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    //Ansuran Application
    case ROUTE_NAME.ANSURAN_APPLICATION_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.ANSURAN_APPLICATION_CREATE:
      permission = [pPermission.CREATE]
      break
    case ROUTE_NAME.ANSURAN_APPLICATION_DETAILS_REJECTED:
    case ROUTE_NAME.ANSURAN_APPLICATION_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    // Ansuran Claim Payout
    case ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_LIST:
      permission = [pPermission.CREATE, pPermission.READ, pPermission.UPDATE, pPermission.DELETE]
      break
    case ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_DETAILS:
      permission = [pPermission.READ, pPermission.UPDATE]
      break
    case ROUTE_NAME.ANSURAN_REPORT_SALES_TRANSACTION:
      permission = [pPermission.READ]
      break
    default:
      permission = []
  }

  return permission
}
