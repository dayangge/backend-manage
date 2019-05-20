import { parse } from 'url';
import { stringify } from 'qs';

// mock tableListDataSource
const tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    userSign: i + 1000,
    gameID: i + 3012,
    userAccount: `1234451+ ${i}`,
    actualName: `TradeCode ${i}`,
    gold: (Math.floor(Math.random() * 1000) / 13).toFixed(2),
    bankGold: (Math.floor(Math.random() * 100) / 13).toFixed(2),
    rechargeAmount: (Math.floor(Math.random() * 10) / 13).toFixed(2),
    withdrawAmount: (Math.floor(Math.random() * 100) / 23).toFixed(2),
    title: `一个任务名称 ${i}`,
    agent: '曲丽丽',
    Promoter: `推广员${i}`,
    gameTime: '1小时',
    registerTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    registerAddress: '171.14.15.14',
    loginTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    loginAddress: '184.114.5.4',
    status: i % 2,
  });
}

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

// mock tableListDataSource
const onlineListDataSource = [];
for (let i = 0; i < 86; i += 1) {
  onlineListDataSource.push({
    key: i,
    userID: i + 3012,
    userAccount: `1234451+${i}`,
    userNickname: `昵称${i}`,
    gold: (Math.floor(Math.random() * 1000) / 13).toFixed(2),
    bankGold: (Math.floor(Math.random() * 100) / 13).toFixed(2),
    winTotal: (Math.floor(Math.random() * 10000) / 13).toFixed(2),
    rechargeTotal: (Math.floor(Math.random() * 100) / 13).toFixed(2),
    withdrawTotal: (Math.floor(Math.random() * 100) / 13).toFixed(2),
    rewards: (Math.floor(Math.random() * 1000) / 13).toFixed(2),
    agent: '曲丽丽',
    inGame: gameList[i % 15],
    inRoom: `第${i}间`,
    lastLoginAddress: '184.114.5.4',
    loginTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    address: '美国',
    gameTime: '1小时',
    game: gameList[i % 7],
    gameName: gameList[i % 13],
    roomName: roomList[i % 13],
    realNumber: Math.floor(Math.random() * 100),
    virtualNumber: Math.floor(Math.random() * 100),
    robotNumber: Math.floor(Math.random() * 100),
    edit: i % 2,
    status: i % 2,
    startTime: new Date(`2019-07-${Math.floor(i / 2) + 1}`),
    endTime: new Date(`2019-07-${Math.floor(i / 2) + 1}`),
    leastVirtualNumber: 0,
    mostVirtualNumber: 100,
  });
}

const gameCoinLog = [];
for (let i = 0; i < 55; i += 1) {
  gameCoinLog.push({
    key: i,
    userID: i + 3012,
    gameID: i + 112,
    account: `TT${i}`,
    name: `代理人${i}`,
    userAccount: `1234451+${i}`,
    userNickname: `昵称${i}`,
    qq: `1234${i}`,
    rate: `${i}%`,
    weixin: `微信${i}`,
    gold: Math.floor(Math.random() * 10000) / 13,
    tax: (Math.floor(Math.random() * 100) / 13).toFixed(2),
    totalRound: 0,
    winRound: 0,
    lossRound: 0,
    tie: 0,
    runRound: 0,
    status: i % 2,
    loginTimes: 1,
    game: gameList[i % 7],
    roomName: roomList[i % 13],
    gameTime: '1小时',
    onlineTime: '1小时',
    lastLoginTime: new Date(`2019-07-${Math.floor(i / 2) + 1}`),
    lastLoginAddress: '122.22.22.22',
    takeGoldCoin: 0,
    bankGoldCoin: 0,
    goldCoinAmount: 0,
    changeType: i % 3,
    logTime: new Date(`2019-07-${Math.floor(i / 2) + 1}`),
    logIP: '123.244.2423.22',
    character: '哈哈哈',
    oldTime: new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    newTime: new Date(`2019-11-${Math.floor(i / 2) + 1}`),
    ip: '113.131.33.33',
    mark: '备注',
    registerNumber: i + 10,
  });
}

function getUserManage(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
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

function getOnlineManage(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = onlineListDataSource;
  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
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

function getWinTotal(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = onlineListDataSource;
  if (params.query) {
    switch (params.query) {
      case 'today':
        dataSource = onlineListDataSource.slice(0, 15);
        break;
      case 'yesterday':
        dataSource = onlineListDataSource.slice(0, 31);
        break;
      case 'week':
        dataSource = onlineListDataSource.slice(0, 70);
        break;
      case 'lastWeek':
        dataSource = onlineListDataSource.slice(0, 55);
        break;
      default:
        dataSource = onlineListDataSource;
    }
  }
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
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

function getGameCoin(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const dataSource = gameCoinLog;
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
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

function getGoldCoin(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = gameCoinLog;
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
  'GET /api/userManage': getUserManage,
  'GET /api/onlineManage': getOnlineManage,
  'GET /api/holdLineManage': getOnlineManage,
  'GET /api/winData': getWinTotal,
  'GET /api/memberWinDetail': getWinTotal,
  'GET /api/onlineNumber': getWinTotal,
  'GET /api/gameEditList': getWinTotal,
  'GET /api/gameCoinLog': getGameCoin,
  'GET /api/goldCoinLog': getGoldCoin,
  'GET /api/givingLog': getGoldCoin,
  'GET /api/restrictedCharacter': getGoldCoin,
  'POST /api/addRestrictedCharacter': getGoldCoin,
  'DELETE /api/removeRestrictedCharacter': getGoldCoin,
  'GET /api/restrictedIP': getGoldCoin,
  'POST /api/addRestrictedIP': getGoldCoin,
  'DELETE /api/removeRestrictedIP': getGoldCoin,
  'GET /api/IPList': getGoldCoin,
  'POST /api/postRestrictIP': getGoldCoin,
  'GET /api/gameLog': getGoldCoin,
};
