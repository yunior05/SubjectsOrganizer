import React from 'react';

import './styles.scss';


class Timetable extends React.Component {
    constructor(props) {
        super(props);
    }   

    render() {
        return (<table>
            <thead>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>)
    }
}

export default Timetable