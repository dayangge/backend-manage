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
    userID: i + 1000,
    account: `T${i}124`,
    userAccount: `T${i}124`,
    room: roomList[i % 13],
    nickname: `妮可妮可${i}`,
    win: 100,
    rate: `${i}%`,
    controlTimes: '10次',
    totalWin: 100.0,
    operator: 'admin',
    gameID: i + 3012,
    tableID: 0,
    isMachine: '否',
    game: gameList[i % 13],
    loginIP: '135.55.76.44',
    time: new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    date: new Date(`2019-11-${Math.floor(i / 2) + 2}`),
    addTime: new Date(`2018-08-${Math.floor(i / 2) + 15}`),
    ip: '192.168.1.111',
    safeBox: 'xxxxxxx',
    password: '123456',
    machineCode: 'SFERRDFS143DJK2DSD',
    gameCoin: '4322.05',
    tax: (Math.floor(Math.random() * 100) / 13).toFixed(2),
    outReason: '正常离开',
    gameTime: '1小时',
    onlineTime: '1小时',
    sale: 1234,
    total: 4532,
    withdraw: 100,
    task: 0,
    n1: 1,
    n2: 3,
    n3: 44,
    n4: 43,
    n5: 11,
    n6: 10,
    n7: 10,
    status: i % 2,
    number: Math.floor(Math.random() * 100),
  });
}

function getData(req, res, u) {
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

const bankName = [
  { id: 'ICBC', name: '工商银行' },
  { id: 'ABC', name: '农业银行' },
  { id: 'BOC', name: '中国银行' },
  { id: 'CCB', name: '建设银行' },
  { id: 'BOCOM', name: '交通银行' },
  { id: 'CMBCHINA', name: '招商银行' },
  { id: 'CGB', name: '广东发展银行' },
  { id: 'ECITIC', name: '中信银行' },
  { id: 'CMBC', name: '民生银行' },
  { id: 'CEB', name: '光大银行' },
  { id: 'PINGAN', name: '平安银行' },
  { id: 'SPDB', name: '上海浦东发展银行' },
  { id: 'PSBC', name: '中国邮政储蓄银行' },
  { id: 'HXB', name: '华夏银行' },
  { id: 'CIB', name: '兴业银行' },
];

export default {
  'GET /api/userControl': getData,
  'GET /api/goldCoinTrade': {
    isOpen: 0,
    isLock: 0,
    limitRound: 8,
    openTime: '12:00:00',
    closeTime: '23:59:00',
    times: 2,
    cost: 300,
  },
  'GET /api/getBankName': bankName,
};
