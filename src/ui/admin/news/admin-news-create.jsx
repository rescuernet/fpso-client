import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, Fab, TextField} from "@material-ui/core";
import {dateToString} from "../../../utils/dateToString";
import AdminStore from "../../../services/admin-service";
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import AddOneFile from "../../../components/addOneFile";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 750px)' : {
            justifyContent: 'center'
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        maxWidth: 600
    },
    header: {
        marginBottom: 10,
        fontSize: 20,
    },
    fieldsGroup: {
        padding: '20px 10px',
    },
    fieldsDates: {
        '@media (max-width: 450px)' : {
            display: "flex",
            flexDirection: "column"
        }
    },
    fieldDate: {
        width: 175,
        margin: '0 10px 10px 0',
        '@media (max-width: 450px)' : {
            margin: '10px 0'
        }
    },
    fieldsHeaders: {
        display: "flex",
        flexDirection: "column",
    },
    fieldHeader: {
        margin: '10px 0'
    },
    fieldsTexts: {
        display: "flex",
        flexDirection: "column",
    },
    fieldText: {
        margin: '10px 0'
    },
    addFile: {
        marginBottom: 10
    },
    control: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    controlButton: {
        margin: '0 10px'
    }
}));


const AdminNewsCreate = () => {
    const classes = useStyles();

    const [dateStart,setDateStart] = useState(dateToString(new Date(Date.parse(Date()))))
    const [dateEnd,setDateEnd] = useState('')
    const [headerFirst,setHeaderFirst] = useState('')
    const [headerSecond,setHeaderSecond] = useState('')
    const [textMain,setTextMain] = useState('')

    const ClearForm = () => {
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
                <div className={classes.header}>Создание новости</div>
                <Divider/>
                <div className={classes.fieldsGroup} >
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
                    <div className={classes.fieldsHeaders}>
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
                    </div>
                    <div className={classes.fieldsTexts}>
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
                    <div className={classes.addFile}>
                        <AddOneFile/>
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
        </div>
    );
};

export default observer(AdminNewsCreate);