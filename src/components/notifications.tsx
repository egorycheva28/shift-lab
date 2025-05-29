import React, { useEffect, useState } from 'react';
import "./notifications.css";

interface NotificationProps {
    message: string;
    type: string;
    show: boolean;
    click: number;
}

const Notification: React.FC<NotificationProps> = ({ message, type, show, click }) => {

    const [notifications, setNotifications] = useState<{ id: number }[]>([]);
    const [header, setHeader] = useState<string>('');
    const [style, setStyle] = useState<string>('');
    const [icon, setIcon] = useState<string>('');
    const [closeIcon, setCloseIcon] = useState<string>('');

    const showNotification = () => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        }, 5000);
    };

    const chooseType = () => {
        switch (type) {
            case 'Error':
                setHeader('Ошибка');
                setStyle('errorStatus');
                setIcon('/errorIcon.png');
                setCloseIcon('/errorCloseIcon.png');
                break;
            case 'Success':
                setHeader('Успех');
                setStyle('successStatus');
                setIcon('/successIcon.png');
                setCloseIcon('/successCloseIcon.png');
                break;
            default:
                break;
        }
    }

    const close = (id: number) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (show) {
                await chooseType();
                await showNotification();
            }
        };

        fetchData();
    }, [message, type, show, click]);

    return (
        <div className='notification' >
            {
                notifications.map(({ id }) => (
                    <div key={id} className='notificationItem'>
                        <div className={style}>
                            <div className='textIcon'>
                                <img src={icon} className='icon' />
                                <span >{header}</span>
                            </div>
                            <div>
                                <img src={closeIcon} className='closeIcon' onClick={() => close(id)} />
                            </div>
                        </div>
                        <div className='messageBlock'>
                            {message}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Notification;
