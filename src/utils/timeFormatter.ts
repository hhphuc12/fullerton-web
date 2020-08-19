import moment from 'moment';

export const formartDateTime = (dateTime: string) => moment(dateTime).format('YYYY/MM/DD HH:mm:ss Z');
