import React from 'react';
import './Calendar.css'

const Calendar: React.FC = () => {
    return (
        <div className="calendar">
            <div className="calendar-day">
                <span>1 September</span>
            </div>
            <div className="calendar-events">

                <div className="calendar-event">
                    <div className="calendar-event-info">
                        <div className="calendar-event-time">10:00 - 12:00</div>
                        <div className="calendar-event-title">Learnig TypeScript</div>
                    </div>
                    <button className="calendar-event-delete-button"> &times;</button>
                </div>
            </div>
            <div className="calendar-day">
                <span>2 September</span>
            </div>
            <div className="calendar-events">

                <div className="calendar-event">
                    <div className="calendar-event-info">
                        <div className="calendar-event-time">10:00 - 12:00</div>
                        <div className="calendar-event-title">Learnig TypeScript</div>
                    </div>
                    <button className="calendar-event-delete-button"> &times;</button>
                </div>
            </div>
        </div>
    )
}

export default Calendar;