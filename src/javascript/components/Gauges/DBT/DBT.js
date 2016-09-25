require("./styles/DBT.scss");

import React, { Component, PropTypes } from "react";
import { AreaChart, Area } from "Recharts";
import _ from "lodash";

let maxDepth = 30;
let warningDepth = 2;

let reduxData = [
    {"depth": 24},
    {"depth": 26},
    {"depth": 28},
    {"depth": 30},
    {"depth": 34},
    {"depth": 36},
    {"depth": 26},
    {"depth": 17},
    {"depth": 7},
    {"depth": 10},
    {"depth": 7},
    {"depth": 3},
    {"depth": 2},
];

let currentDepth = 1.8;

export default class GaugeDBT extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };

        return  (
            <div className="DBT">
                <div className="DBT__value">
                    <h2 className="DBT__number">{currentDepth}</h2>
                    <h2 className="DBT__units">m</h2>
                </div>
                <div className="DBT__graph">
                    <AreaChart
                        width={300}
                        height={150}
                        data={this.invertPoints(reduxData)}
                        margin={margin}>
                        <Area
                            type='monotone'
                            dataKey='depth'
                            stroke='#8884d8'
                            fill='#000000'
                            strokeWidth={2}
                            dot={false} />
                    </AreaChart>
                </div>
            </div>
        )
    }

    invertPoints(points) {
        return _.map(points, p => {
            let val = p.depth > maxDepth ? 0 : maxDepth - p.depth;
            return {"depth": val};
        });
    }
}
