/**
 * @file
 * @author zhangkun@163.com
 */
export interface OptionItem {
  id: string | number;
  name: string;
  [key: string]: any;
}

export interface OptionResult {
  chains: OptionItem[];
  categories: OptionItem[];
}

export interface Audit {
  audit: string; // 公司名称
  report: string; // 公司链接
}

export interface FormData {
  name: string; // 项目名称
  logo: string;
  website: string; // 官方网站
  categories: Array<string | number>; // 项目类型
  chains: Array<string | number>; // 公链
  description: string; // 项目介绍
  comment: string; // 推荐理由
  online_time: string; // 上线时间
  online_timezone: string; // 时区
  telegram: string; // telegram 加入链接
  personal_telegram: string; // 个人 telegram
  discord: string; // discord 加入链接
  twitter: string; // twitter 链接
  username: string; // 联系人名称
  contact: string; // 联系人方式
  audit_reports: Audit[];
}

export interface TimeZoneItem {
  name: string;
}

export const defaultTimeZoon = "(GMT+8) Beijing, Chongqing, Hong Kong, Urumqi";
export const timeZone: TimeZoneItem[] = [
  {
    name: "(GMT+0) Dublin, Lisbon, London",
  },
  {
    name: "(GMT+1) Amsterdam, Berlin, Bern",
  },
  {
    name: "(GMT+2) Beirut, Cairo, Gaza",
  },
  {
    name: "(GMT+3) Moscow, St. Petersburg, Volgograd",
  },
  {
    name: "(GMT+4) Abu Dhabi, Muscat",
  },
  {
    name: "(GMT+5) Ekaterinburg, Tashkent",
  },
  {
    name: "(GMT+6) Astana, Dhaka, Novosibirsk",
  },
  {
    name: "(GMT+7) Krasnoyarsk",
  },
  {
    name: "(GMT+8) Beijing, Chongqing, Hong Kong, Urumqi",
  },
  {
    name: "(GMT+9) Osaka, Sapporo, Tokyo",
  },
  {
    name: "(GMT+10) Brisbane, Hobart, Vladivostok",
  },
  {
    name: "(GMT+11) Solomon Is., New Caledonia",
  },
  {
    name: "(GMT+12) Anadyr, Kamchatka, Fiji",
  },
  {
    name: "(GMT-1) Azores, Cape Verde Is",
  },
  {
    name: "(GMT-2) Mid-Atlantic",
  },
  {
    name: "(GMT-3) Greenland, Montevideo, Salvador",
  },
  {
    name: "(GMT-4) Asuncion, Atlantic Time (Canada), Cuiaba",
  },
  {
    name: "(GMT-5) Bogota, Lima, Quito",
  },
  {
    name: "(GMT-6) Central America",
  },
  {
    name: "(GMT-7) Pacific Time (US &amp; Canada), Arizona",
  },
  {
    name: "(GMT-8) Baja California, Pacific Time (US &amp; Canada)",
  },
  {
    name: "(GMT-9) Alaska",
  },
  {
    name: "(GMT-10) Hawaii",
  },
  {
    name: "(GMT-11) Midway, Niue",
  },
  {
    name: "(GMT-12) Midway Island, Samoa",
  },
];
