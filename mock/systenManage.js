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
  'GET /api/systemManage': getTable,
  'GET /api/websiteRuleManage': getTable,
  'GET /api/websiteIosConfig': getTable,
  'GET /api/websiteActivityList': getTable,
  'GET /api/websiteActivity': {
    activity: '活动名称1',
    sort: 1,
    isTop: 1,
    content: '<p>1111111</p><span style="color：red">机组哦</span>',
  },
  'GET /api/websiteRuleInfo': {
    id: 1,
    game: '炸金花',
    pcImg: '',
    gameDesc: '这是炸金花游戏',
    ruleDesc: '相信大家都会玩',
    levelDesc: '没有等级',
    status: 0,
  },
  'GET /api/websiteRuleInfo1': {
    id: 1,
    keyName: 'config',
    keyText: '参数配置',
    content: '参数说明：这一对东西没有用',
    field1: '123456',
    field2: '没啥意思',
    field3: '这里是游戏',
    field4: 'http：//323.223.2.3',
    field5: '你好',
    field6: '亲爱的玩家，你说啥都不好使',
    field7: '充钱，赶紧充钱',
    field8: '哈哈哈哈哈哈哈',
  },
  'GET /api/websiteNewsManage': {
    list: [
      {
        title: '游戏公告',
        type: '新闻',
        status: 1,
        operator: 'admin',
        time: '2018-09-09',
        ip: '192.168.1.112',
        isTop: 0,
        content: '欢迎各位大大光临本平台',
      },
      {
        title: '充值大优惠',
        type: '公告',
        status: 0,
        operator: 'admin',
        time: '2018-11-09',
        ip: '10.168.1.112',
        isTop: 0,
        content: '充值100送一个亿！！！',
      },
    ],
    pagination: {
      total: 2,
      pageSize: 10,
      current: 1,
    },
  },
  'GET /api/systemInfoPush': {
    list: [
      {
        pushUser: 'baby',
        pushDevice: 'ios',
        pushContent: '别瞎比比，没啥用',
        operator: 'admin',
        time: '2018-09-09',
        ip: '192.168.1.112',
      },
      {
        pushUser: 'huzi',
        pushDevice: 'ios',
        pushContent: '你一点也不帅',
        operator: 'admin',
        time: '2019-09-09',
        ip: '144.68.1.112',
      },
    ],
    pagination: {
      total: 2,
      pageSize: 10,
      current: 1,
    },
  },
};
