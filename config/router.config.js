export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      /*   {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },*/
      // list
      /*  {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/basic/:id',
            name: 'basic',
            hideInMenu: true,
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },*/
      //  editor
      /*  {
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        routes: [
          {
            path: '/editor/flow',
            name: 'flow',
            component: './Editor/GGEditor/Flow',
          },
          {
            path: '/editor/mind',
            name: 'mind',
            component: './Editor/GGEditor/Mind',
          },
          {
            path: '/editor/koni',
            name: 'koni',
            component: './Editor/GGEditor/Koni',
          },
        ],
      },*/
      {
        name: 'gameUser',
        icon: 'folder',
        path: '/gameUser',
        routes: [
          {
            path: '/gameUser/userManage',
            name: 'userManage',
            component: './gameUser/userManage',
          },
          {
            path: '/gameUser/onlineManage',
            name: 'onlineManage',
            component: './gameUser/onlineManage',
          },
          {
            path: '/gameUser/holdLineManage',
            name: 'holdLineManage',
            component: './gameUser/holdLineManage',
          },
          {
            path: '/gameUser/winTotal',
            name: 'winTotal',
            component: './gameUser/winTotal',
          },
          {
            path: '/gameUser/onlineNumber',
            name: 'onlineNumber',
            component: './gameUser/onlineNumber',
          },
          {
            path: '/gameUser/gameCoinLog',
            name: 'gameCoinLog',
            component: './gameUser/gameCoinLog',
          },
          {
            path: '/gameUser/goldCoinLog',
            name: 'goldCoinLog',
            component: './gameUser/goldCoinLog',
          },
          {
            path: '/gameUser/givingLog',
            name: 'givingLog',
            component: './gameUser/givingLog',
          },
          {
            path: '/gameUser/restrictedCharacter',
            name: 'restrictedCharacter',
            component: './gameUser/restrictedCharacter',
          },
          {
            path: '/gameUser/restrictedIP',
            name: 'restrictedIP',
            component: './gameUser/restrictedIP',
          },
          {
            path: '/gameUser/restrictedMachineCode',
            name: 'restrictedMachineCode',
            component: './gameUser/restrictedMachineCode',
          },
          {
            path: '/gameUser/unbindAgent',
            name: 'unbindAgent',
            component: './gameUser/unbindAgent',
          },
          {
            path: '/gameUser/gameLog',
            name: 'gameLog',
            component: './gameUser/gameLog',
          },
        ],
      },
      {
        path: '/userDetail',
        component: './userDetail',
        routes: [
          { path: '/userDetail', redirect: '/userDetail/basicInfo' },
          {
            path: '/userDetail/basicInfo',
            component: './userDetail/basicInfo',
          },
          {
            path: '/userDetail/detailInfo',
            component: './userDetail/detailInfo',
          },
          {
            path: '/userDetail/assetInfo',
            component: './userDetail/assetInfo',
          },
          {
            path: '/userDetail/logInfo',
            component: './userDetail/logInfo',
          },
        ],
      },
      {
        path: '/controlSystem',
        name: 'controlSystem',
        icon: 'unlock',
        routes: [
          { path: '/controlSystem', redirect: '/controlSystem/userControl' },
          {
            path: '/controlSystem/userControl',
            name: 'userControl',
            component: './controlSystem/userControl',
          },
          {
            path: '/controlSystem/gameControl',
            name: 'gameControl',
            component: './controlSystem/gameControl',
          },
          {
            path: '/controlSystem/moreControl',
            name: 'moreControl',
            component: './controlSystem/moreControl',
          },
          {
            path: '/controlSystem/superControl',
            name: 'superControl',
            component: './controlSystem/superControl',
          },
        ],
      },
      {
        path: '/robotSetting',
        name: 'robotSetting',
        icon: 'smile',
        routes: [
          { path: '/robotSetting', redirect: '/robotSetting/robotConfig' },
          {
            path: '/robotSetting/robotConfig',
            name: 'robotConfig',
            component: './robotSetting/robotConfig',
          },
        ],
      },
      {
        path: '/rechargeSystem',
        name: 'rechargeSystem',
        icon: 'bell',
        routes: [
          {
            path: '/rechargeSystem/rechargeLog',
            name: 'rechargeLog',
            component: './rechargeSystem/rechargeLog',
          },
          {
            path: '/rechargeSystem/orderManage',
            name: 'orderManage',
            component: './rechargeSystem/orderManage',
          },
          {
            path: '/rechargeSystem/rechargeAmount',
            name: 'rechargeAmount',
            component: './rechargeSystem/rechargeAmount',
          },
          {
            path: '/rechargeSystem/agentRechargeOrder',
            name: 'agentRechargeOrder',
            component: './rechargeSystem/agentRechargeOrder',
          },
          {
            path: '/rechargeSystem/rechargeInterface',
            name: 'rechargeInterface',
            component: './rechargeSystem/rechargeInterface',
          },
          {
            path: '/rechargeSystem/rechargeChannel',
            name: 'rechargeChannel',
            component: './rechargeSystem/rechargeChannel',
          },
        ],
      },
      {
        path: '/systemMaintenance',
        name: 'systemMaintenance',
        icon: 'desktop',
        routes: [
          {
            path: '/systemMaintenance/systemMachineManage',
            name: 'systemMachineManage',
            component: './systemMaintenance/systemMachineManage',
          },
          {
            path: '/systemMaintenance/systemGameManage',
            name: 'systemGameManage',
            component: './systemMaintenance/systemGameManage',
            routes: [
              {
                path: '/systemMaintenance/systemGameManage',
                redirect: '/systemMaintenance/systemGameManage/module',
              },
              {
                path: '/systemMaintenance/systemGameManage/module',
                component: './systemMaintenance/systemGameManage/module',
              },
              {
                path: '/systemMaintenance/systemGameManage/game',
                component: './systemMaintenance/systemGameManage/game',
              },
              {
                path: '/systemMaintenance/systemGameManage/type',
                component: './systemMaintenance/systemGameManage/type',
              },
              {
                path: '/systemMaintenance/systemGameManage/mobile',
                component: './systemMaintenance/systemGameManage/mobile',
              },
            ],
          },
          {
            path: '/systemMaintenance/systemSetting',
            name: 'systemSetting',
            component: './systemMaintenance/systemSetting',
          },
          {
            path: '/systemMaintenance/systemCheckInSetting',
            name: 'systemCheckInSetting',
            component: './systemMaintenance/systemCheckInSetting',
          },
          {
            path: '/systemMaintenance/systemInfoPush',
            name: 'systemInfoPush',
            component: './systemMaintenance/systemInfoPush',
          },
          {
            path: '/systemMaintenance/systemFullServiceNotice',
            name: 'systemFullServiceNotice',
            component: './systemMaintenance/systemFullServiceNotice',
          },
        ],
      },
      {
        path: '/taskSystem',
        name: 'taskSystem',
        icon: 'inbox',
        routes: [
          {
            path: '/taskSystem/taskManage',
            name: 'taskManage',
            component: './taskSystem/taskManage',
          },
          {
            path: '/taskSystem/taskLog',
            name: 'taskLog',
            component: './taskSystem/taskLog',
          },
        ],
      },
      {
        path: '/websiteSystem',
        name: 'websiteSystem',
        icon: 'fund',
        routes: [
          {
            path: '/websiteSystem/newsManage',
            name: 'newsManage',
            component: './websiteSystem/newsManage',
            routes: [
              { path: '/websiteSystem/newsManage', redirect: '/websiteSystem/newsManage/news' },
              {
                path: '/websiteSystem/newsManage/news',
                component: './websiteSystem/newsManage/newsAnnouncement',
              },
              {
                path: '/websiteSystem/newsManage/mobile',
                component: './websiteSystem/newsManage/mobileAnnouncement',
              },
            ],
          },
          {
            path: '/websiteSystem/ruleManage',
            name: 'ruleManage',
            component: './websiteSystem/ruleManage',
          },
          {
            path: '/websiteSystem/websiteConfig',
            name: 'websiteConfig',
            component: './websiteSystem/websiteConfig',
            routes: [
              {
                path: '/websiteSystem/websiteConfig',
                redirect: '/websiteSystem/websiteConfig/contact',
              },
              {
                path: '/websiteSystem/websiteConfig/contact',
                component: './websiteSystem/websiteConfig/contactConfig',
              },
              {
                path: '/websiteSystem/websiteConfig/site',
                component: './websiteSystem/websiteConfig/siteSetting',
              },
              {
                path: '/websiteSystem/websiteConfig/mobile',
                component: './websiteSystem/websiteConfig/mobileConfig',
              },
              {
                path: '/websiteSystem/websiteConfig/server',
                component: './websiteSystem/websiteConfig/serviceConfig',
              },
              {
                path: '/websiteSystem/websiteConfig/share',
                component: './websiteSystem/websiteConfig/shareConfig',
              },
              {
                path: '/websiteSystem/websiteConfig/ios',
                component: './websiteSystem/websiteConfig/iosConfig',
              },
            ],
          },
          {
            path: '/websiteSystem/activityManage',
            name: 'activityManage',
            component: './websiteSystem/activityManage',
          },
          {
            path: '/websiteSystem/activityManage/add',
            component: './websiteSystem/add',
          },
          {
            path: '/websiteSystem/activityManage/modify',
            component: './websiteSystem/modify',
          },
        ],
      },
      {
        path: '/managerSystem',
        name: 'managerSystem',
        icon: 'team',
        routes: [
          {
            path: '/managerSystem/managerSetting',
            name: 'managerSetting',
            component: './managerSystem/managerSetting',
            routes: [
              {
                path: '/managerSystem/managerSetting',
                redirect: '/managerSystem/managerSetting/role',
              },
              {
                path: '/managerSystem/managerSetting/role',
                component: './managerSystem/managerSetting/roleManage',
              },
              {
                path: '/managerSystem/managerSetting/manager',
                component: './managerSystem/managerSetting/managerSetting',
              },
              {
                path: '/managerSystem/managerSetting/role/setting',
                component: './managerSystem/managerSetting/setting',
              },
            ],
          },
          {
            path: '/managerSystem/operationLog',
            name: 'operationLog',
            component: './managerSystem/operationLog',
          },
        ],
      },
      {
        path: '/financeSystem',
        name: 'financeSystem',
        icon: 'dollar',
        routes: [
          {
            path: '/financeSystem/goldCoinTradeSetting',
            name: 'goldCoinTradeSetting',
            component: './financeSystem/goldCoinTradeSetting',
          },
          {
            path: '/financeSystem/goldCoinTradeManage',
            name: 'goldCoinTradeManage',
            component: './financeSystem/goldCoinTradeManage',
          },
          {
            path: '/financeSystem/agentSetting',
            name: 'agentSetting',
            component: './financeSystem/agentSetting',
          },
          {
            path: '/financeSystem/settlementManage',
            name: 'settlementManage',
            component: './financeSystem/settlementManage',
          },
          {
            path: '/financeSystem/playerPumping',
            name: 'playerPumping',
            component: './financeSystem/playerPumping',
          },
          {
            path: '/financeSystem/roomPumping',
            name: 'roomPumping',
            component: './financeSystem/roomPumping',
          },
          {
            path: '/financeSystem/withdrawManage',
            name: 'withdrawManage',
            component: './financeSystem/withdrawManage',
          },
          {
            path: '/financeSystem/lotteryLog',
            name: 'lotteryLog',
            component: './financeSystem/lotteryLog',
          },
        ],
      },
      {
        path: '/agentSystem',
        name: 'agentSystem',
        icon: 'apartment',
        routes: [
          { path: '/agentSystem', redirect: '/agentSystem/agentManage' },
          {
            path: '/agentSystem/agentManage',
            name: 'agentManage',
            component: './agentSystem/agentManage',
          },
          {
            path: '/agentSystem/agentDomainSetting',
            name: 'agentDomainSetting',
            component: './agentSystem/agentDomainSetting',
          },
          {
            path: '/agentSystem/rechargeRate',
            name: 'rechargeRate',
            component: './agentSystem/rechargeRate',
          },
          {
            path: '/agentSystem/rechargeReport',
            name: 'rechargeReport',
            component: './agentSystem/rechargeReport',
          },
          {
            path: '/agentSystem/newUserStat',
            name: 'newUserStat',
            component: './agentSystem/newUserStat',
          },
          {
            path: '/agentSystem/agentCheckManage',
            name: 'agentCheckManage',
            component: './agentSystem/agentCheckManage',
          },
        ],
      },
      {
        path: '/agentDetail',
        component: './agentDetail',
        routes: [
          { path: '/agentDetail', redirect: '/agentDetail/detail' },
          {
            path: '/agentDetail/detail',
            component: './agentDetail/detail',
          },
          {
            path: '/agentDetail/subordinateAgent',
            component: './agentDetail/subordinateAgent',
          },
          {
            path: '/agentDetail/subordinatePlayer',
            component: './agentDetail/subordinatePlayer',
          },
          {
            path: '/agentDetail/goldChange',
            component: './agentDetail/goldChange',
          },
          {
            path: '/agentDetail/subordinateRecharge',
            component: './agentDetail/subordinateRecharge',
          },
          {
            path: '/agentDetail/subordinateGame',
            component: './agentDetail/subordinateGame',
          },
          {
            path: '/agentDetail/subordinateWithdrawal',
            component: './agentDetail/subordinateWithdrawal',
          },
          {
            path: '/agentDetail/offlineRecharge',
            component: './agentDetail/offlineRecharge',
          },
          {
            path: '/agentDetail/playerWin',
            component: './agentDetail/playerWin',
          },
          {
            path: '/agentDetail/rechargeCommission',
            component: './agentDetail/rechargeCommission',
          },
          {
            path: '/agentDetail/rechargeConfig',
            component: './agentDetail/rechargeConfig',
          },
        ],
      },
      {
        path: '/pushSystem',
        name: 'pushSystem',
        icon: 'share-alt',
        routes: [
          {
            path: '/pushSystem/pushManage',
            name: 'pushManage1',
            component: './pushSystem/pushManage1',
            routes: [
              { path: '/pushSystem/pushManage', redirect: '/pushSystem/pushManage/push' },
              {
                path: '/pushSystem/pushManage/push',
                component: './pushSystem/pushManage1/pushManage',
              },
              {
                path: '/pushSystem/pushManage/commission',
                component: './pushSystem/pushManage1/commissionManage',
              },
            ],
          },
          {
            path: '/pushSystem/pushWithdrawal',
            name: 'pushWithdrawal',
            component: './pushSystem/pushWithdrawal',
          },
          {
            path: '/pushSystem/pushWithdrawalConfig',
            name: 'pushWithdrawalConfig',
            component: './pushSystem/pushWithdrawalConfig',
          },
        ],
      },
      {
        path: '/userDetail/index',
        component: './userDetail/index',
      },
      {
        component: '404',
      },
    ],
  },
];
