import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
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
}))

const CompetitionsFields = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.fieldsDates}>
                <TextField
                    id="dateStart"
                    required={true}
                    label="Опубликовать с даты"
                    type="date"
                    value={AdminNewsStore.news_tmp.dateStart}
                    onChange={(e)=>{
                        runInAction(()=>{
                        AdminNewsStore.news_tmp.dateStart = e.target.value
                        })
                    }}
                    className={classes.fieldDate}
                    variant={"outlined"}
                    InputLabelProps={{shrink: true,}}
                />
                <TextField
                    id="dateEnd"
                    label="Окончить публикацию"
                    type="date"
                    value={AdminNewsStore.news_tmp.dateEnd}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminNewsStore.news_tmp.dateEnd = e.target.value
                        })
                    }}
                    className={classes.fieldDate}
                    variant={"outlined"}
                    InputLabelProps={{shrink: true,}}
                />
            </div>
            <div className={classes.fieldsText} >
                <TextField
                    id="headerFirst"
                    required={true}
                    label="Заголовок"
                    value={AdminNewsStore.news_tmp.headerFirst}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminNewsStore.news_tmp.headerFirst = e.target.value
                        })
                    }}
                    variant="outlined"
                    multiline
                    rows={1}
                    rowsMax={2}
                    error={AdminNewsStore.news_tmp.headerFirst && AdminNewsStore.news_tmp.headerFirst.length > 100}
                    helperText={AdminNewsStore.news_tmp.headerFirst && AdminNewsStore.news_tmp.headerFirst.length > 100 && 'максимум 100 символов'}
                />
                <TextField
                    id="headerSecond"
                    label="Дополнительный заголовок"
                    value={AdminNewsStore.news_tmp.headerSecond}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminNewsStore.news_tmp.headerSecond = e.target.value
                        })
                    }}
                    variant="outlined"
                    multiline
                    rows={1}
                    rowsMax={2}
                    error={AdminNewsStore.news_tmp.headerSecond && AdminNewsStore.news_tmp.headerSecond.length > 100}
                    helperText={AdminNewsStore.news_tmp.headerSecond && AdminNewsStore.news_tmp.headerSecond.length > 100 && 'максимум 100 символов'}
                />
                <TextField
                    id="textMain"
                    required={true}
                    label="Текст новости"
                    value={AdminNewsStore.news_tmp.textMain}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminNewsStore.news_tmp.textMain = e.target.value
                        })
                    }}
                    variant="outlined"
                    multiline
                    rows={3}
                    rowsMax={10}
                />
            </div>
        </>
    );
};

export default observer(CompetitionsFields);