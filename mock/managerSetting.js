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
for (let i = 0; i < 23; i += 1) {
  tableListDataSource.push({
    id: i,
    key: i,
    userID: i + 1000,
    account: `T${i}124`,
    nickname: `妮可妮可${i}`,
    gameID: i + 3012,
    client: `版本${i}`,
    game: gameList[i % 13],
    room: roomList[i % 13],
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
    service: `服务器${i}`,
    port: 3001,
    cost: Math.floor(Math.random() * 100),
    cost1: Math.floor(Math.random() * 100),
    cost2: Math.floor(Math.random() * 1000),
    gold: Math.floor(Math.random() * 40),
    gold1: Math.floor(Math.random() * 40),
    ip: '192.168.1.111',
    operator: 'admin',
    password: '123456',
    machineCode: 'SFERRDFS143DJK2DSD',
    gameCoin: '4322.05',
    tax: (Math.floor(Math.random() * 100) / 13).toFixed(2),
    gameTime: '1小时',
    onlineTime: '1小时',
    status: i % 2,
    title: '啦啦啦',
    sort: i,
  });
}

const data = [];
const role = ['超级管理员', '用户管理员', '网站管理员', 'wangmaoyz'];
for (let i = 0; i < 4; i += 1) {
  data.push({
    id: i,
    key: i,
    role: role[i % 4],
    account: 'admin',
    status: i % 2,
    ip: '103.12.124.36',
    time: '2019-03-14',
    time1: '2018-11-14',
    mark: '管理员',
    operator: 'admin',
    info: '操作信息',
  });
}

function getData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = data;
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
        dataSource = dataSource.slice(0, 13);
        break;
      case 'lastWeek':
        dataSource = dataSource.slice(0, 22);
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
  'GET /api/roleManageList': getData,
  'GET /api/manageSettingList': getData,
};
