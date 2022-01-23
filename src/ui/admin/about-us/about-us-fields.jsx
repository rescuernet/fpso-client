import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {TextField} from "@material-ui/core";
import {runInAction, toJS} from "mobx";
import AdminAboutUsStore from "../../../bll/admin/admin-about-us-store";


const useStyles = makeStyles((theme) => ({
    textFields: {
        '& > *': {
            marginBottom: 20
        }
    },
}))

const AdminAboutUsFields = () => {
    const classes = useStyles();

    const data = AdminAboutUsStore.aboutUs

    return (
        <div className={classes.textFields} >
            <div>Общая информация</div>
            <TextField
                id="header"
                label="Заголовок"
                value={data?.header || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        data.header = e.target.value
                    })
                }}
                variant="outlined"
                fullWidth
                multiline
                minRows={1}
                maxRows={2}
                error={data?.header && data?.header.length > 100}
                helperText={data?.header && data?.header.length > 100 && 'максимум 100 символов'}
            />
            <TextField
                id="text"
                label="Описание"
                value={data?.text || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        data.text = e.target.value
                    })
                }}
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                maxRows={10}
            />
            <div>Контактная информация</div>
            <TextField
                id="address"
                label="Адрес"
                value={data?.address || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        data.address = e.target.value
                    })
                }}
                variant="outlined"
                fullWidth
                multiline
                minRows={1}
                maxRows={2}
            />
            <TextField
                id="phone"
                label="Телефон"
                value={data?.telephone || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        data.telephone = e.target.value
                    })
                }}
                variant="outlined"
                fullWidth
                multiline
                minRows={1}
                maxRows={2}
            />
            <TextField
                id="email"
                label="E-mail"
                value={data?.email || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        data.email = e.target.value
                    })
                }}
                variant="outlined"
                fullWidth
                multiline
                minRows={1}
                maxRows={2}
            />
        </div>
    );
};

export default observer(AdminAboutUsFields);