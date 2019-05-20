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
const tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    userSign: i + 1000,
    account: `T${i}124`,
    nickname: `妮可妮可${i}`,
    name: '文孙涛',
    rate: `${i}%`,
    status: i % 2,
    gameID: i + 3012,
    tableID: 0,
    isMachine: '否',
    game: gameList[i % 13],
    room: roomList[i % 13],
    loginIP: '135.55.76.44',
    time: new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    time1: new Date(`2018-04-${Math.floor(i / 2) + 1}`),
    time2: new Date(`2018-05-${Math.floor(i / 2) + 1}`),
    date: new Date(`2019-11-${Math.floor(i / 2) + 2}`),
    level: Math.floor(Math.random() * 10),
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
    gold: 1000,
    qq: 11345315,
    online: 100,
    singleFee: (Math.floor(Math.random() * 100) / 8).toFixed(2),
    withdrawal: (Math.floor(Math.random() * 100) / 8).toFixed(2),
    withdrawalTimes: 0,
    actual: 1,
    actualIncome: 10000,
    newUser: 111,
    rechargeNum: 100,
    firstRecharge: Math.floor(Math.random() * 100),
    rechargeTotal: Math.floor(Math.random() * 10000),
    withdrawalTotal: Math.floor(Math.random() * 1000),
    offline: 0,
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
  'GET /api/userAssetInfo': {
    id: 33356,
    des: '有钱',
  },
  'GET /api/table': getTable,
  'GET /api/detailInfo': {
    id: 33356,
    account: 'du35865',
    realName: '莫非',
    bankCard: '6007 4586 2456 4565 225',
    bankName: '渣打银行',
    bankAddress: '伦敦',
    QQ: 254335113,
    email: '23544314@qq.com',
    alipay: 1242244,
    mobile: 114224542,
    local: '英国',
    mark: '打死不也不说',
    domain: 'ovdo6.cn',
  },
  'GET /api/agentDetail': {
    account: 'mako130',
    password: 'sf23345',
    realName: '木村拓哉',
    qq: '11474646',
    name: '木林得',
    weixin: 'mm111',
    agentType: '抽水提成',
    bankName: '渣打银行',
    bankAccount: '2123 2356 5422 112',
    bankAddress: '世纪大厦',
    asset: '30000',
    pumping: 31,
    status: 1,
    bindDomain: 'www.aserft.com',
    permission: [1, 3, 4, 5, 7, 8],
    mark: '好好说',
    sort: 1,
    domain: 'ovdo6.cn',
  },
  'GET /api/allList': getTable,
};
