const calculation = (time) => {
    const year = parseInt(time / (365 * 86400));
    time = time % (365 * 86400);

    const month = parseInt(time / (30 * 86400));
    time = time % (30 * 86400);

    const week = parseInt(time / (7 * 86400));
    time = time % (7 * 86400);

    const day = parseInt(time / 86400);
    time = time % 86400;

    const hour = parseInt(time / 3600);
    time = time % 3600;

    const minute = parseInt(time / 60);
    const second = time % 60;

    return [
        year ? `${year} year` : '',
        month ? `${month} month` : '',
        week ? `${week} week` : '',
        day ? `${day} day` : '',
        hour ? `${hour} hour` : '',
        minute ? `${minute} minute` : '',
        second ? `${second} second` : ''
    ].filter(Boolean).join(' ') + ' ago';
}
