import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import HistoryIcon from '@material-ui/icons/History';

export const formatLayoutOption = (layoutOption) => {
    return {
        layoutOption,
    };
};

export const menuList = [
    { Icon: PermContactCalendarIcon, text: '주소록', name: 'contacts' },
    { Icon: PhoneIphoneIcon, text: '문자 보내기', name: 'sendMessage' },
    { Icon: HistoryIcon, text: '문자 전속 기록', name: 'messageHistory' },
];

export const defaultMenu = menuList[0].name;
