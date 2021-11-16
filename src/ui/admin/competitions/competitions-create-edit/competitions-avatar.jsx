import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import AdminCompetitionsStore from "../../../../bll/admin/admin-competitions-store";
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

const CompetitionsAvatar = ({id}) => {
    const classes = useStyles();

    // загрузка аватар
    const UploadAvatar = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction(async () => {
            await AdminCompetitionsStore.compAvatarCreate(data)
        })
        event.target.value = ''
    };
    //удаление аватара
    const DeleteAvatar = () => {
        runInAction(() => {
            AdminCompetitionsStore.competitions_tmp_avatar_new = null
            AdminCompetitionsStore.competitions_tmp_avatar_old = null
        })
    };

    return (
        <div className={classes.avatar} id={'avatar'}>
            <div className={classes.avatarControl}>
                {!AdminCompetitionsStore.competitions_tmp_avatar_new && AdminCompetitionsStore.competitions_tmp_avatar_old &&
                <>
                    <img src={`${API_URL}/${id}/avatar/${AdminCompetitionsStore.competitions_tmp_avatar_old}`} alt=""/>
                    <Button
                        variant={"outlined"}
                        color={"primary"}
                        onClick={()=> {DeleteAvatar()}}
                    >
                        удалить аватар
                    </Button>
                </>
                }
                {AdminCompetitionsStore.competitions_tmp_avatar_new &&
                <>
                    <img src={`${API_URL}/${AdminCompetitionsStore.competitions_tmp_avatar_new}`} alt=""/>
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
            {!AdminCompetitionsStore.competitions_tmp_avatar_new && !AdminCompetitionsStore.competitions_tmp_avatar_old &&
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
                        выбрать аватар соревнования
                    </Button>
                </label>
            </div>
            }
        </div>
    );
};

export default observer(CompetitionsAvatar);