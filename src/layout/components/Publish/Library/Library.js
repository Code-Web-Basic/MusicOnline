import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ItemMusic from "../ItemMusic/ItemMusic";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { getAllMusicMyLikes } from "~/service/publish/userService";
import { useEffect, useState } from "react";
import { getMusicByMusicId } from "~/service/publisher/musicService";

function ListMusicMyLike() {
    const currentUser = useSelector(state => state.auth.currentUser)
    const [music, setMusic] = useState([])
    useEffect(() => {
        const getAllMusicMyLike = async () => {
            try {
                const listMusic = await getAllMusicMyLikes(currentUser?.user?.uid)
                listMusic.map(async (item) => {
                    const data = await getMusicByMusicId(item?.data?.musicId)
                    setMusic([...music, data])
                })
            }
            catch (err) {
                console.error(err)
            }
        }
        getAllMusicMyLike()
    }, [])
    return (
        <Stack direction="row" width="100%">
            <Grid2 container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} width="100%">
                {music.map((musicItem, index) => (
                    <Grid2 item xs={2} sm={4} md={4} key={index}>
                        <ItemMusic music={musicItem} />
                    </Grid2>
                ))}
            </Grid2>
        </Stack>
    );
}

export default ListMusicMyLike;