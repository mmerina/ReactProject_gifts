import React from 'react';

export default class saleNum extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var myChart = echarts.init(this.refs.main);

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['巧克力','鲜花','蛋糕','德芙','费列罗','歌蒂娅','其他品牌','芝士蛋糕','奶油蛋糕','冰淇淋蛋糕','其他蛋糕','红玫瑰','白玫瑰','香槟玫瑰','粉玫瑰','香水百合','其他鲜花']
            },
            series: [
                {
                    name:'销售情况',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'巧克力', selected:true},
                        {value:679, name:'蛋糕'},
                        {value:1548, name:'鲜花'}
                    ]
                },
                {
                    name:'销售情况',
                    type:'pie',
                    radius: ['40%', '55%'],
                    label: {
                        normal: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            // shadowBlur:3,
                            // shadowOffsetX: 2,
                            // shadowOffsetY: 2,
                            // shadowColor: '#999',
                            // padding: [0, 7],
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data:[
                        {value:127, name:'德芙'},
                        {value:102, name:'费列罗'},
                        {value:47, name:'歌蒂娅'},
                        {value:59, name:'其他品牌'},
                        
                        {value:310, name:'奶油蛋糕'},
                        {value:74, name:'芝士蛋糕'},
                        {value:129, name:'冰淇淋蛋糕'},
                        {value:166, name:'其他蛋糕'},
                        
                        {value:870, name:'红玫瑰'},
                        {value:70, name:'白玫瑰'},
                        {value:178, name:'香槟玫瑰'},
                        {value:191, name:'粉玫瑰'},
                        {value:137, name:'香水百合'},
                        {value:102, name:'其他鲜花'}
                    ]
                }
            ]
        };

        myChart.setOption(option);
    }

    render() {
        return (
            <div ref="main" style={{ "width": "100%", "height": "100%" }}></div>
        );
    }
}
