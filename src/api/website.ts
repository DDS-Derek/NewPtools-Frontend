import numberFormat from '@/hooks/numberFormat'
import renderSize from '@/hooks/renderSize'
import type { Downloader } from '~/api/download'
import { getList } from '~/hooks/getList'

export interface WebSite {
  id: number
  name: string
  nickname: string
  logo: string
  tracker: string
  tags: '电影' | '电视剧' | 'MV' | 'MUSIC' | '纪录片'
  sp_full: number
  page_message: string
  url: string
  sign_in: boolean
  get_info: boolean
  brush_free: boolean
  hr_discern: boolean
  brush_rss: boolean
  search_torrents: boolean
  repeat_torrents: boolean
}

// eslint-disable-next-line import/export
export interface UserLevelRule {
  id: number
  site: number
  level_id: number
  level: string
  days: number
  uploaded: number
  downloaded: number
  bonus: number
  score: number
  ratio: number
  torrents: number
  leeches: number
  seeding_delta: number
  keep_account: boolean
  graduation: boolean
  rights: string
}

export interface MySite {
  id: number
  sort_id: number
  site?: number
  nickname: string
  passkey: string
  api_key?: string
  rss?: string
  torrents?: string
  downloader?: number
  downloader_id?: number
  sign_in: boolean
  get_info: boolean
  brush_free: boolean
  hr_discern: boolean
  brush_rss: boolean
  search_torrents: boolean
  repeat_torrents: boolean
  package_file: boolean
  mirror_switch: boolean
  user_id: string
  joined: number
  mirror?: string
  user_agent: string
  cookie: string
  custom_server: string
  remove_torrent_rules?: string
  time_join?: string
}

export interface SiteStatus {
  id: number
  updated_at?: string
  site: number
  uploaded: number
  downloaded: number
  ratio: number
  my_bonus: number
  my_score: number
  seed_volume: number
  seed_days: number
  leech: number
  seed: number
  bonus_hour: number
  publish: number
  invitation: number
  my_level: string
  my_hr: string
  mail: number
  updated?: string
}

export interface SignInfo {
  id: number
  updated_at: string
  site: number
  sign_in_today: boolean
  sign_in_info: string
  updated: string
}

export interface PaginateParams {
  site_id?: number
  page: number
  limit: number
}

export interface SiteInfoPage {
  per_page: number
  total: number
  items: SignInfo[]
}

export interface NewestStatus {
  my_site: MySite
  site: WebSite
  sign: SignInfo
  status: SiteStatus
  level: UserLevelRule
  next_level: UserLevelRule
}

export interface SiteHistoryList {
  uploaded_list: number[]
  downloaded_list: number[]
  diff_uploaded_list: number[]
  diff_downloaded_list: number[]
  bonus_list: number[]
  score_list: number[]
  ratio_list: number[]
  seeding_size_list: number[]
  seeding_list: number[]
  leeching_list: number[]
  invitation_list: number[]
  bonus_hour_list: number[]
  date_list: number[]
}

// eslint-disable-next-line import/export
export interface MySitePerDayData {
  name: string
  diff_uploaded_list: number[]
  diff_downloaded_list: number[]
}

export interface PerDayData {
  date_list: string[]
  diff: MySitePerDayData[]
}

export interface TodayIncreaseData {
  name: string
  uploaded: number
  downloaded: number
}

export interface TodayData {
  total_upload: number
  total_download: number
  data: TodayIncreaseData[]
}

export interface PieData {
  name: string
  value: number
}

export interface BarData {
  name: string
  type: string
  emphasis: {
    focus: string
  }
  stack?: string
  data: number[]
}

export interface Torrent {
  'id': number
  'site': number
  'tid': number
  'title': string
  'subtitle': string
  'category': string
  'area': string
  'magnet_url': string
  'size': number
  'hr': true
  'sale_status': string
  'sale_expire': Date
  'published': Date
  'seeders': number
  'leechers': number
  'completers': number
  'hash_string': string
  'filelist': string
  'douban_url': string
  'year_publish': string
  'files_count': number
  'completed': number
  'uploaded': number
  'pieces_qb': string
  'pieces_tr': string
  'state': number
  'downloader'?: Downloader | null
}

export interface SearchTorrent {
  site: number
  tid: number
  category: string
  magnet_url: string
  detail_url: string
  poster_url: string
  title: string
  subtitle: string
  sale_status: string
  sale_expire: string
  hr: boolean
  published: string
  size: number
  seeders: number
  leechers: number
  completers: number
  siteName?: string
  siteLogo?: string
}

export interface SearchResult {
  results: SearchTorrent[]
  warning: string[]
  success: string[]
}

/**
 * 获取我的站点列表
 */
export const $mySiteList: () => Promise<any> = async () => {
  return await getList<null, MySite[]>('mysite/mysite')
}

/**
 * 获取全部种子列表
 */
export const $torrentList: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, Torrent>('mysite/torrents', params)
}
/**
 * 获取未添加站点列表
 */
export const $siteInfoNewList: () => Promise<any> = async () => {
  return await getList<null, WebSite>('website/website/new')
}

/**
 * 获取已添加站点最新状态列表
 */
export const $siteStatusNewestList: () => Promise<any> = async () => {
  return await getList<null, NewestStatus>('mysite/status/newest')
}

/**
 * 获取已添加站点网站列表
 */
export const $siteList: () => Promise<any> = async () => {
  return await getList<null, WebSite>('website/website')
}

/**
 * 获取单个站点信息
 * @param params
 */
export const $getMySite: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, MySite>('mysite/mysite/get', params)
}
/**
 * 删除单个站点信息
 * @param params
 */
export const $removeMySite = async (params: object) => {
  const { message } = useGlobalConfig()

  const {
    msg,
    code,
  } = await useDelete('mysite/mysite', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

/**
 * 编辑我的站点
 * @param params
 */
export const $editMySite = async (params: MySite) => {
  const { message } = useGlobalConfig()
  const {
    msg,
    code,
  } = await usePut('mysite/mysite', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
/**
 * 新增我的站点
 * @param params
 */
export const $saveMySite = async (params: MySite) => {
  const { message } = useGlobalConfig()
  const {
    msg,
    code,
  } = await usePost('mysite/mysite', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

/**
 * 签到
 * @param site_id
 */
export const $signSite = async (site_id: number) => {
  const { message } = useGlobalConfig()
  const response = await usePost('mysite/signin', { site_id })
  const {
    code,
    msg,
  } = response
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $signAllSite = async () => {
  const { message } = useGlobalConfig()
  const response = await usePost('mysite/sign/do')
  const {
    code,
    msg,
  } = response
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
export const $getNewestStatus: (site_id: number) => Promise<any> = async (site_id: number) => {
  const { message } = useGlobalConfig()
  const response = await usePost('mysite/status/get', { site_id })
  const {
    code,
    msg,
    data,
  } = response
  switch (code) {
    case 0:
      if (msg.length > 0) message?.success(msg)
      return data
    default:
      message?.error(msg)
      return false
  }
}
/**
 * 刷新
 * @param site_id
 */
export const $refreshSite = async (site_id: number) => {
  const { message } = useGlobalConfig()
  let response = await usePost('mysite/status', { site_id })
  if (typeof response === 'string') {
    // 正则表达式查找替换所有无穷大字符
    const reg = /Infinity/g
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const res_info = response.replace(reg, '"∞"')
    response = JSON.parse(res_info)
  }
  const {
    code,
    msg,
  } = response
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $refreshAllSite = async () => {
  const { message } = useGlobalConfig()
  const {
    msg,
    code,
    data,
  } = await usePost('mysite/status/do')
  switch (code) {
    case 0:
      message?.success(msg)
      return data
    default:
      message?.error(msg)
      return false
  }
}

export const $sortSite = async (site_id: number, sort_id: number) => {
  const { message } = useGlobalConfig()
  const {
    msg,
    code,
  } = await usePost('mysite/sort', {
    site_id,
    sort_id,
  })
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

/**
 * 获取站点签到信息列表
 * @param params
 */
export const $getSignList: (params: PaginateParams) => Promise<any> = async (params: PaginateParams) => {
  return await getList<PaginateParams, SiteInfoPage>('mysite/signin', params)
}

/**
 * 获取站点种子信息列表
 * @param params
 */
export const $getTorrentList: (params: PaginateParams) => Promise<any> = async (params: PaginateParams) => {
  return await getList<PaginateParams, SiteInfoPage>('mysite/torrents', params)
}

/**
 * 获取站点历史数据
 * @param params
 */
export const $getHistoryList: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, SiteHistoryList>('mysite/status/chart', params)
}

/**
 * 站点历史数据生成图表配置
 */

export const $parseSiteHistory = async (siteHistoryList: SiteHistoryList) => {
  const {
    uploaded_list,
    downloaded_list,
    diff_uploaded_list,
    diff_downloaded_list,
    bonus_list,
    score_list,
    ratio_list,
    seeding_size_list,
    seeding_list,
    leeching_list,
    invitation_list,
    bonus_hour_list,
    date_list,
  } = siteHistoryList
  const option = {
    // title: {
    //    text: site.name,
    //    textStyle: {
    //        color: 'orangered',
    //    },
    //    left: 'center',
    //    top: '3%',
    // },
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: {
        align: 'left',
      },
      // formatter: function (params) {
      //    return params.name + '\t' + renderSize(params.data.value)
      // },
      valueFormatter(value: string | number | null) {
        return renderSize(Number(value))
      },
    },
    legend: {
      show: true,
      top: '3%',
      left: 'center',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '25%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: date_list,
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        formatter(value: string | number | null) {
          return renderSize(Number(value))
        },
      },

    }, {
      type: 'value',
      axisLabel: {
        formatter(v: string, i: number) {
          if (i === 0)
            v = '0'

          if (i === 1)
            v = '1'

          if (i === 2)
            v = '3'

          if (i === 3)
            v = '5'

          if (i === 4)
            v = '30'

          if (i === 5)
            v = '1000'

          if (i === 6)
            v = '5000'

          if (i === 7)
            v = '12000'

          return v
        },
      },
    }],
    series: [
      {
        name: '邀请',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: invitation_list,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },
      },
      {
        name: '正在做种',
        type: 'line',
        yAxisIndex: 1,
        data: seeding_list,
        smooth: true,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },
      },
      {
        name: '正在下载',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: leeching_list,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },
      },
      {
        name: '保种量',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: seeding_size_list,
      },
      {
        name: '下载量',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        data: downloaded_list,
      },
      {
        name: '上传量',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        data: uploaded_list,
      },
      {
        name: '上传增量',
        type: 'bar',
        yAxisIndex: 0,
        barMaxWidth: '60%',
        data: diff_uploaded_list,
      },
      {
        name: '下载增量',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        barMaxWidth: '60%',
        data: diff_downloaded_list,
        // tooltip: {
        //     show: false,
        // }
      },
      {
        name: '分享率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },
        data: ratio_list,
      },
      {
        name: '时魔',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: bonus_hour_list,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },

      },
      {
        name: '魔力值',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: number | 'infinity' | 'Infinity') {
            return numberFormat(value)
          },
        },
        data: bonus_list,
      },
    ],
  }
  // eslint-disable-next-line no-eval
  if (eval(score_list.join('+')) > 0) {
    option.series.push({
      name: '积分',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      tooltip: {
        show: true,
        trigger: 'axis',
        // formatter: function (params) {
        //    return params.name + '\t' + renderSize(params.data.value)
        // },
        valueFormatter(value: number | 'infinity' | 'Infinity') {
          return numberFormat(value)
        },
      },
      data: score_list,
    })
  }
  return option
}

export const $todayDataList: () => Promise<any> = async () => {
  return await getList<null, TodayData[]>('mysite/status/today')
}

/**
 * 新增我的站点
 * @param params
 */
export const $searchTorrent = async (params: { key: string; site_list: number[] }) => {
  const { message } = useGlobalConfig()
  const {
    msg,
    code,
    data,
  } = await usePost('mysite/search', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return data
    default:
      message?.error(msg)
      return false
  }
}
export const $pushTorrent = async (params: string) => {
  const { message } = useGlobalConfig()
  const {
    msg,
    code,
  } = await useGet(`mysite/push_torrent?${params}`)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
