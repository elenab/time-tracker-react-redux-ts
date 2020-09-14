import React, { useState, useEffect, useRef } from 'react';
import { UserEvent, deleteUserEvent, updateUserEvent } from '../../redux/user-events';
import { useDispatch } from 'react-redux';
import { addZero } from '../../lib/utils';

interface Props {
    event: UserEvent;
};

const EventItem: React.FC<Props> = ({ event }) => {
    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id));
    };

    const [editable, setEditable] = useState(false);
    const handleTitleClick = () => {
        setEditable(true);

    };
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editable) {
            inputRef.current?.focus();
        }
    }, [editable]);

    const [title, setTitle] = useState(event.title);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleOnBlur = () => {
        if (title !== event.title) {
            dispatch(updateUserEvent(
                {...event,
                title
            }
            ));
        }
        setEditable(false);
    };
    const eventStartHour = addZero(new Date(event.dateStart).getUTCHours()) + ':' + addZero(new Date(event.dateStart).getUTCMinutes()) ;
    const eventStopHour = addZero(new Date(event.dateEnd).getUTCHours()) + ':' + addZero(new Date(event.dateEnd).getUTCMinutes());

    return (
        <div key={event.id} className="calendar-event">
            <div className="calendar-event-info">
                <div className="calendar-event-time">
                    {eventStartHour}-{eventStopHour}
                    </div>
                <div className="calendar-event-title">
                    {editable ? (
                        <input type="text" 
                            ref={inputRef} 
                            value={title}
                            onChange = {handleInputChange}
                            onBlur={handleOnBlur}
                        />
                    ) : (
                            <span onClick={handleTitleClick}>
                                {event.title}
                            </span>
                        )
                    }
                </div>
            </div>
            <button className="calendar-event-delete-button" onClick={handleDeleteClick}> &times;</button>
        </div>
    )
}

export default EventItem;