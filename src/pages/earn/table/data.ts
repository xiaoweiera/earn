export const headerList = [
    {
        "title": "SmartMoney",
        "titleCn": "SmartMoney",
        "titleEn": "SmartMoney",
        "sort": false,
        "center": false,
        "width": 290,
        "active": false,
        "fields": [["headPic", "addressName"], "tagList"],
        "type": [["logo", "text"], "tags"]
    },
    {
        "title": "NFT Value / NFTs",
        "titleCn": "NFT Value / NFTs",
        "titleEn": "NFT Value / NFTs",
        "sort": true,
        "sortField":"nftValue",
        "center": true,
        "active": false,
        "width": 120,
        "fields": [["chain", "nftValue"], "nftNum"],
        "type": [["chain", "number"], "num"]
    },
    {
        "title": "chart",
        "titleCn": "chart",
        "titleEn": "chart",
        "sort": false,
        "center": true,
        "active": false,
        "width": 130,
        "fields": ["roiTrending"],
        "type": ["chartLine"]
    },

    {
        "title": "Return%",
        "titleCn": "Return%",
        "titleEn": "Return%",
        "sort": true,
        "sortField":"returnRate",
        "center": true,
        "active": true,
        "width": 110,
        "fields": ["returnRate"],
        "type": ["percent"]
    },
    {
        "title": "30d Return%",
        "titleCn": "30d Return%",
        "titleEn": "30d Return%",
        "sort": true,
        "sortField":"returnRateBy30D",
        "center": true,
        "active": false,
        "width": 110,
        "fields": ["returnRateBy30D"],
        "type": ["percent"]
    },
    {
        "title": "FlipRate",
        "titleCn": "FlipRate",
        "titleEn": "FlipRate",
        "sort": true,
        "sortField":"flipRate",
        "center": true,
        "active": false,
        "width": 110,
        "fields": ["flipRate"],
        "type": ["percent"]
    },

    {
        "title": "30d FlipRate",
        "titleCn": "30d FlipRate",
        "titleEn": "30d FlipRate",
        "sortField":"flipRateBy30D",
        "sort": true,
        "center": true,
        "active": false,
        "width": 110,
        "fields": ["flipRateBy30D"],
        "type": ["percent"]
    },
    {
        "title": "Last Activity",
        "titleCn": "Last Activity",
        "titleEn": "Last Activity",
        "sort": true,
        "center": true,
        "active": false,
        "width": 110,
        "fields": ["lastActivityTime"],
        "type": ["time"]
    }
]
export const dataList = [
    {
        headPic: './public/image/earn/logo.png',
        addressName: 'namefoijfe',
        tagList: [
            {imgUrl: './public/image/earn/logo.png', text: 'aaa'},
            {imgUrl: './public/image/earn/logo.png', text: 'bbb'}
        ],
        nftValue: 90,
        nftNum: 10,
        returnRate: 12,
        returnRateBy30D: 200,
        flipRate: 30,
        flipRateBy30D: 25,
        lastActivityTime: '3 moth ago',
        klineData: [
            [
                1661417886404,
                1
            ],
            [
                1661414286404,
                2
            ],
            [
                1661410686404,
                3
            ],
            [
                1661407086404,
                4
            ],
            [
                1661403486404,
                5
            ],
            [
                1661399886404,
                6
            ],
            [
                1661396286404,
                7
            ],
            [
                1661392686404,
                8
            ]]
    },
    {
        headPic: './public/image/earn/logo.png',
        addressName: 'vvvvvv',
        tagList: [
            {imgUrl: './public/image/earn/logo.png', text: 'aa3'},
            {imgUrl: './public/image/earn/logo.png', text: 'aa2'}
        ],
        nftValue: 90,
        nftNum: 10,
        returnRate: 32,
        returnRateBy30D: 500,
        flipRate: 10,
        flipRateBy30D: 35,
        lastActivityTime: '4 moth ago',
        klineData: [
            [
                1661417886404,
                1
            ],
            [
                1661414286404,
                2
            ],
            [
                1661410686404,
                3
            ],
            [
                1661407086404,
                4
            ],
            [
                1661403486404,
                5
            ],
            [
                1661399886404,
                6
            ],
            [
                1661396286404,
                7
            ],
            [
                1661392686404,
                8
            ]]
    }
]