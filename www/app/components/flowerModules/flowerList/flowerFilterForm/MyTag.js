import React from "react";
import moment from "moment";

import { Tag } from "antd";

export default (props) => {
    return <div>
        {props.nowfilters.map(item => {
            if (item.k == "type") {
                return <Tag
                    closable
                    key={item.k}
                    onClose={() => { props.onClose(item.k) }}
                >
                    类型 ： {item.v.join(" 或 ")}
                </Tag>
            } else if (item.k == "mainflower") {
                return <Tag
                    closable
                    key={item.k}
                    onClose={() => { props.onClose(item.k) }}
                >
                    主材料 ： {item.v.join(" 或 ")}
                </Tag>
            } else if (item.k == "color") {
                return <Tag
                    closable
                    key={item.k}
                    onClose={() => { props.onClose(item.k) }}
                >
                    颜色 ： {item.v.join(" 或 ")}
                </Tag>
            } else if (item.k == "sendObject") {
                return <Tag
                    closable
                    key={item.k}
                    onClose={() => { props.onClose(item.k) }}
                >
                    送花对象 ： {item.v.join(" 或 ")}
                </Tag>
            } else if (item.k == "purpose") {
                return <Tag
                    closable
                    key={item.k}
                    onClose={() => { props.onClose(item.k) }}
                >
                    鲜花用途 ： {item.v.join(" 或 ")}
                </Tag>
            }  else if (item.k == "price") {
                return <Tag
                    closable
                    key={item.k}
                    onClose={() => { props.onClose(item.k) }}
                >
                    价格: {item.v[0]}元 至 {item.v[1]}元
				</Tag>
            }
        })}
    </div>
}