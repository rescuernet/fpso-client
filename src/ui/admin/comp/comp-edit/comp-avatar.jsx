import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {API_URL} from "../../../../const/const";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    avatar: {
        padding: '20px 0'
    },
    avatarAdd: {
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
}))

const CompAvatar = ({compId}) => {
    const classes = useStyles();

    // загрузка аватар
    const UploadAvatar = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        data.append('compId',compId);
        runInAction(async () => {
            await AdminCompStore.compAvatarCreate(data)
        })
        event.target.value = ''
    };
    //удаление аватара
    const DeleteAvatar = () => {
        runInAction(() => {
            AdminCompStore.compOne.avatar = ''
        })
    };


    return (
        <div className={classes.avatar} id={'avatar'}>
            <div className={classes.avatarControl}>
                {AdminCompStore.compOne.avatar &&
                <>
                    <img src={`${API_URL}/competitions/${compId}/avatar/${AdminCompStore.compOne.avatar}`} alt=""/>
                    <Button
                        variant={"outlined"}
                        color={"primary"}
                        onClick={()=> {DeleteAvatar()}}
                    >
                        удалить аватар
                    </Button>
                </>
                }
            </div>
            {!AdminCompStore.compOne.avatar &&
            <div className={classes.avatarAdd}>
                <label htmlFor="avatarImage">
                    <input
                        style={{ display: 'none' }}
                        id="avatarImage"
                        name="avatarImage"
                        type="file"
                        onChange={UploadAvatar}
                    />
                    <Button
                        color="primary"
                        size="small"
                        variant={"outlined"}
                        component={'span'}
                    >
                        выбрать аватар
                    </Button>
                </label>
            </div>
            }
        </div>
    );
};

export default observer(CompAvatar);