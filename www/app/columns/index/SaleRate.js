import React from 'react';

export default class SaleRate extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var myChart = echarts.init(this.refs.main);

        var option = {
            xAxis: {
                type: 'category',
                data: ['Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.', 'Jan.', 'Feb.']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [1045, 966, 1217, 1098, 1490, 1275, 1548],
                type: 'line',
                smooth: true
            }, {
                    data: [655, 784, 653, 790, 687, 865, 679],
                    type: 'line',
                    smooth: true
                }, {
                    data: [326, 364, 295, 302, 298, 327, 335],
                    type: 'line',
                    smooth: true
                }]
        };

        myChart.setOption(option);
    }

    render() {
        return (
            <div ref="main" style={{ "width": "100%", "height": "100%" }}></div>
        );
    }
}
