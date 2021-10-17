import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, TextField, Typography} from "@material-ui/core";
import {dateToString} from "../../../utils/dateToString";
import AdminStore from "../../../bll/admin-store";
import {runInAction} from "mobx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 750px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    content: {
        flexGrow: 1,
        maxWidth: 600,
        width: 600,
        padding: 20
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 15
    },
    avatar: {
        padding: '20px 0'
    },
    addFile: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& > div': {
            marginTop: 15,
            color: '#ff0000',
            fontSize: 13,
            fontWeight: 'bold'
        },
        '& > label > span': {
            padding: '5px 15px',
            fontSize: '0.875rem'
        }
    },
    avatarControl: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& img': {
            display: 'block',
            marginBottom: 20
        }
    },
    avatarError: {
        color: '#ff0000',
    },
    fieldsDates: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: '20px 0',
        '@media (max-width: 430px)' : {
            padding: "20px 0 0 0",
        },
    },
    fieldDate: {
        '@media (max-width: 430px)' : {
            marginBottom: 20,
        },
    },
    fieldsText: {
        display: "flex",
        flexDirection: "column",
        '& > div': {
            marginBottom: 20
        }
    },
    control: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        margin: '20px 0',
        '@media (max-width: 430px)' : {
            margin: '20px 0 0 0',
        },
    },
    controlButton: {
        width: 190,
        '@media (max-width: 430px)' : {
            marginBottom: 20,
        },
    }
}));


const AdminNewsCreate = () => {

    const matches = useMediaQuery('(min-width:750px)');

    useEffect(()=>{
        const inputClear = document.getElementById('avatarHeader')
        inputClear.value = ''
        runInAction(() => {AdminStore.news_tmp_avatar_errors = null})
    },[])

    const classes = useStyles();
    const [avatar,setAvatar] = useState()
    const [dateStart,setDateStart] = useState(dateToString(new Date(Date.parse(Date()))))
    const [dateEnd,setDateEnd] = useState('')
    const [headerFirst,setHeaderFirst] = useState('')
    const [headerSecond,setHeaderSecond] = useState('')
    const [textMain,setTextMain] = useState('')

    const UploadAvatarHeader = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction(() => {AdminStore.newsAvatarCreate(data)})
    };

    useEffect(()=>{
        setAvatar(AdminStore.news_tmp_avatar)
    },[AdminStore.news_tmp_avatar])

    const DeleteAvatarHeader = () => {
        runInAction(() => {AdminStore.news_tmp_avatar=''})
    }

    const ClearAvatarError = () => {
        const inputClear = document.getElementById('avatarHeader')
        inputClear.value = ''
        runInAction(() => {AdminStore.news_tmp_avatar_errors = null})
    }

    const ClearForm = () => {
        setAvatar('')
        setDateStart(dateToString(new Date(Date.parse(Date()))));
        setDateEnd('');
        setHeaderFirst('');
        setHeaderSecond('');
        setTextMain('');
    }

    const CreateArr = () => {
        const Arr = {
            dateStart,
            dateEnd,
            headerFirst,
            headerSecond,
            textMain
        }
        AdminStore.newsCreate(Arr)
    }


    return (
        <div className={classes.root}>
            <AdminMenu/>
            <div className={classes.content}>
                <div className={classes.header}>
                    <Typography>Создание новости</Typography>
                </div>
                <Divider/>
                <div className={classes.avatar} id={'avatar'}>
                    {avatar
                        ?
                        <div className={classes.avatarControl}>
                            <img src={`http://localhost:5000/tmp/${avatar}`} alt=""/>
                            <Button
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=> {DeleteAvatarHeader()}}
                            >
                                удалить аватар
                            </Button>
                        </div>
                        :
                        <div className={classes.addFile}>
                            <label htmlFor="avatarHeader">
                                <input
                                    style={{ display: 'none' }}
                                    id="avatarHeader"
                                    name="avatarImage"
                                    type="file"
                                    onChange={UploadAvatarHeader}
                                />
                                <Button
                                    color="primary"
                                    size="small"
                                    variant={"outlined"}
                                    component={'span'}
                                    onClick={()=>{ClearAvatarError()}}
                                >
                                    выбрать аватар новости
                                </Button>
                            </label>
                            {AdminStore.news_tmp_avatar_errors &&
                                AdminStore.news_tmp_avatar_errors
                            }
                        </div>
                    }
                </div>
                <Divider/>
                <div className={classes.fieldsDates}>
                    <TextField
                        id="dateStart"
                        required={true}
                        label="Опубликовать с даты"
                        type="date"
                        value={dateStart}
                        onChange={(e)=>{setDateStart(e.target.value)}}
                        className={classes.fieldDate}
                        variant={"outlined"}
                        InputLabelProps={{shrink: true,}}
                    />
                    <TextField
                        id="dateEnd"
                        label="Окончить публикацию"
                        type="date"
                        value={dateEnd}
                        onChange={(e)=>{setDateEnd(e.target.value)}}
                        className={classes.fieldDate}
                        variant={"outlined"}
                        InputLabelProps={{shrink: true,}}
                    />
                </div>
                <div className={classes.fieldsText} >
                    <TextField
                        id="headerFirst"
                        required={true}
                        className={classes.fieldHeader}
                        label="Заголовок"
                        value={headerFirst}
                        onChange={(e)=>{setHeaderFirst(e.target.value)}}
                        variant="outlined"
                        multiline
                        rows={1}
                        rowsMax={4}
                    />
                    <TextField
                        id="headerSecond"
                        className={classes.fieldHeader}
                        label="Дополнительный заголовок"
                        value={headerSecond}
                        onChange={(e)=>{setHeaderSecond(e.target.value)}}
                        variant="outlined"
                        multiline
                        rows={1}
                        rowsMax={4}
                    />
                    <TextField
                        id="textMain"
                        required={true}
                        className={classes.fieldText}
                        label="Текст новости"
                        value={textMain}
                        onChange={(e)=>{setTextMain(e.target.value)}}
                        variant="outlined"
                        multiline
                        rows={10}
                        rowsMax={10}
                    />
                </div>
                <Divider/>
                <div className={classes.images}>

                </div>
                <Divider/>
                <div className={classes.control}>
                    <Button
                        className={classes.controlButton}
                        variant={"outlined"}
                        color={"primary"}
                        onClick={()=>{ClearForm()}}
                    >
                        Очистить форму
                    </Button>
                    <Button
                        className={classes.controlButton}
                        variant="contained"
                        color={"primary"}
                        onClick={()=>{CreateArr()}}
                    >
                        Сохранить новость
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default observer(AdminNewsCreate);