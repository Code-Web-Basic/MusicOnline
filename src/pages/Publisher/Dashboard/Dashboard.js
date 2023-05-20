import { Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ListMusicNew from '~/layout/Publisher/ListMusicNew/ListMusicNew';
import { faker } from '@faker-js/faker';

function Dashboard() {
    return (
        <Stack direction={'column'}>
            <Stack direction={'row'} margin={'0px 20px'}>
                <Typography variant="h5">Channel dashboard</Typography>
            </Stack>
            <Grid2 container spacing={2} p={2}>
                <Grid2 item xs={6} md={6} lg={6}>
                    <ListMusicNew
                        title="News Update"
                        list={[...Array(5)].map((_, index) => ({
                            id: faker.datatype.uuid(),
                            title: faker.name.jobTitle(),
                            description: faker.name.jobTitle(),
                            image: faker.image.avatar(),
                            postedAt: faker.date.recent(),
                            numberListen: 3,
                            numberLike: 0,
                            numberComment: 1,
                        }))}
                    />
                </Grid2>
                <Grid2 item xs={3}></Grid2>
                <Grid2 item xs={3}></Grid2>
            </Grid2>
        </Stack>
    );
}

export default Dashboard;
