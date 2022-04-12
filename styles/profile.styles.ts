import {makeStyles} from "@material-ui/core/styles";

export const profileStyles = makeStyles(theme => ({
    profilePage: {
        display: 'grid',
        gridTemplateColumns: '88px 1fr',
        maxHeight: '100vh',
        backgroundColor: '#EAEAEA',
        [theme.breakpoints.down(1000)]: {
            display: 'flex',
            flexDirection: 'column-reverse'
        },
        [theme.breakpoints.down(550)]: {
            maxHeight: '100%'
        },
    },
    profile: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 56px)',
    },
    userProfileBox: {
        margin: '50px 0 0',
        display: 'grid',
        gridTemplateColumns: '250px 400px',
        gap: '200px',
    },
    avatarWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .avatarProfile': {
            marginLeft: '6px',
            width: '100px',
            height: '100px',
        }
    },
    avatarProfile: {
        marginLeft: '6px',
        width: '100px',
        height: '100px',
    },
    username: {
        margin: '20px 0 0 0'
    },
    buttonsGroup: {
        width: '100%',
        display: 'grid!important',
        gridTemplateColumns: 'repeat(4, 1fr)',
        marginBottom: '5px',
    },
    button: {
        fontSize: '10px!important',
    },
    userPaper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '5px',
        height: 50,
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '33px',
            transform: 'translateX(10%)',
            width: '80%',
            height: '20px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.25)'
        },
        '&:last-child': {
            '&::after': {
                content: '',
                width: '0',
                height: '0',
                borderBottom: '0px solid black'
            },
        }
    },
    userPaperNoCursor: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '5px',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '33px',
            transform: 'translateX(26px)',
            width: '200px',
            height: '20px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.25)'
        },
        '&:last-child': {
            '&::after': {
                content: '',
                width: '0',
                height: '0',
                borderBottom: '0px solid black'
            },
        }
    },
}));