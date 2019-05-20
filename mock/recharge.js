import { parse } from 'url';

const gameList = [
  '游戏',
  '大厅',
  '炸金花',
  '看牌牛牛',
  '通比牛牛',
  '百人牛牛',
  '中发白',
  '百人牌九',
  '百家乐',
  '龙凤斗',
  '不洗牌斗地主',
  '红黑大战',
  '水果拉霸',
  '李逵',
  '蛟龙出海',
  '时时彩',
];
const roomList = [
  '游戏-初级场',
  '大厅-初级场',
  '炸金花-初级场',
  '看牌牛牛-初级场',
  '通比牛牛-初级场',
  '百人牛牛-初级场',
  '中发白-初级场',
  '百人牌九-初级场',
  '百家乐-初级场',
  '龙凤斗-初级场',
  '不洗牌斗地主-初级场',
  '红黑大战-初级场',
  '水果拉霸-初级场',
  '李逵-初级场',
  '蛟龙出海-初级场',
  '时时彩-初级场',
];
const payList = ['支付宝内部', '即付宝外部', '天下付背部', 'QQ', '平台'];
const payPlat = ['支付宝', '即付宝', '天下付', '45', '易付宝'];

const tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    userSign: i + 1000,
    account: `T${i}124`,
    nickname: `妮可妮可${i}`,
    gameID: i + 3012,
    payList: payList[i % 5],
    payPlat: payPlat[i % 5],
    time: new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    time1: new Date(`2019-01-${Math.floor(i / 2) + 2}`),
    time2: new Date(`2019-03-${Math.floor(i / 2) + 2}`),
    time3: new Date(`2018-11-${Math.floor(i / 2) + 2}`),
    type: 1 % 3,
    proxy: 'agent1',
    agent: '代理人1',
    Promoter: '推广人1',
    code: 112,
    cost: Math.floor(Math.random() * 100),
    cost1: Math.floor(Math.random() * 100),
    cost2: Math.floor(Math.random() * 1000),
    gold: Math.floor(Math.random() * 40),
    gold1: Math.floor(Math.random() * 40),
    ip: '192.168.1.111',
    operator: 'admin',
    safeBox: 'xxxxxxx',
    password: '123456',
    machineCode: 'SFERRDFS143DJK2DSD',
    gameCoin: '4322.05',
    tax: (Math.floor(Math.random() * 100) / 13).toFixed(2),
    totalRound: 0,
    winRound: 0,
    lossRound: 0,
    tie: 0,
    runRound: 0,
    gameChange: 0,
    outReason: '正常离开',
    gameTime: '1小时',
    onlineTime: '1小时',
    sale: 1234,
    total: 4532,
    withdraw: 100,
    task: 0,
    status: i % 2,
  });
}

function getTable(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = tableListDataSource;
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }
  if (params.query) {
    switch (params.query) {
      case 'today':
        dataSource = dataSource.slice(0, 7);
        break;
      case 'yesterday':
        dataSource = dataSource.slice(0, 8);
        break;
      case 'week':
        dataSource = dataSource.slice(0, 23);
        break;
      case 'lastWeek':
        dataSource = dataSource.slice(0, 33);
        break;
      case 'mouth':
        dataSource = dataSource.slice(0, 49);
        break;
      case 'lastMouth':
        dataSource = dataSource.slice(0, 55);
        break;
      default:
        break;
    }
  }
  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  return res.json(result);
}

export default {
  'GET /api/userInfo': {
    id: 33356,
  },
  'GET /api/agentRecharge': getTable,
  'GET /api/systemRechargeAmount': {
    list: [{ cost: 6 }, { cost: 30 }, { cost: 68 }, { cost: 128 }, { cost: 328 }, { cost: 518 }],
    pagination: {},
  },
  'GET /api/rechargeService': [
    { id: 0, type: '全部服务' },
    { id: 1, type: '网银充值' },
    { id: 2, type: '支付宝wap' },
    { id: 3, type: '微信wap' },
    { id: 4, type: '支付宝扫码' },
    { id: 5, type: '微信扫码' },
    { id: 6, type: 'QQ钱包' },
    { id: 7, type: '快捷支付' },
    { id: 8, type: 'QQ扫码' },
    { id: 9, type: '京东' },
    { id: 10, type: '百度' },
    { id: 11, type: '京东扫码' },
    { id: 12, type: '苹果内购' },
    { id: 13, type: '网猫充值' },
    { id: 14, type: '乐支付' },
    { id: 15, type: '有益支付' },
    { id: 16, type: '后台测试银行金币' },
    { id: 17, type: '后台测试金币' },
    { id: 18, type: '后台充值金币' },
    { id: 19, type: '线下充值' },
  ],
  'GET /api/userRechargeLog': getTable,
};
