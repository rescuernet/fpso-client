import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import AdminCompetitionsStore from "../../../../bll/admin/admin-competitions-store";
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
                    label="Дата начала"
                    type="date"
                    value={AdminCompetitionsStore.competitions_tmp.dateStart}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminCompetitionsStore.competitions_tmp.dateStart = e.target.value
                        })
                    }}
                    className={classes.fieldDate}
                    variant={"outlined"}
                    InputLabelProps={{shrink: true,}}
                />
                <TextField
                    id="dateEnd"
                    label="Дата окончания"
                    type="date"
                    value={AdminCompetitionsStore.competitions_tmp.dateEnd}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminCompetitionsStore.competitions_tmp.dateEnd = e.target.value
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
                    value={AdminCompetitionsStore.competitions_tmp.headerFirst}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminCompetitionsStore.competitions_tmp.headerFirst = e.target.value
                        })
                    }}
                    variant="outlined"
                    multiline
                    rows={1}
                    rowsMax={2}
                    error={AdminCompetitionsStore.competitions_tmp.headerFirst && AdminCompetitionsStore.competitions_tmp.headerFirst.length > 100}
                    helperText={AdminCompetitionsStore.competitions_tmp.headerFirst && AdminCompetitionsStore.competitions_tmp.headerFirst.length > 100 && 'максимум 100 символов'}
                />
                <TextField
                    id="headerSecond"
                    label="Дополнительный заголовок"
                    value={AdminCompetitionsStore.competitions_tmp.headerSecond}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminCompetitionsStore.competitions_tmp.headerSecond = e.target.value
                        })
                    }}
                    variant="outlined"
                    multiline
                    rows={1}
                    rowsMax={2}
                    error={AdminCompetitionsStore.competitions_tmp.headerSecond && AdminCompetitionsStore.competitions_tmp.headerSecond.length > 100}
                    helperText={AdminCompetitionsStore.competitions_tmp.headerSecond && AdminCompetitionsStore.competitions_tmp.headerSecond.length > 100 && 'максимум 100 символов'}
                />
                <TextField
                    id="textMain"
                    required={true}
                    label="Описание соревнований"
                    value={AdminCompetitionsStore.competitions_tmp.textMain}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminCompetitionsStore.competitions_tmp.textMain = e.target.value
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