import { faker } from '@faker-js/faker';
import {
    Box,
    Button,
    Chip,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Plus } from 'phosphor-react';
import { useRef, useState } from 'react';
import ControlPreviewMusic from './ControlPreviewMusic';
import PropTypes from 'prop-types';
import { Timestamp } from 'firebase/firestore';
import { createMusic } from '~/service/publisher/musicService';
import { useSnackbar } from 'notistack';
import { formatDurationMusic } from '~/util/formatTime';

AddContentMusic.prototype = {
    files: PropTypes.array,
    handleOpen: PropTypes.func,
};
function AddContentMusic({ files = [], handleOpen }) {
    const inputRef = useRef(null);
    const theme = useTheme();
    const audioRef = useRef(files[0] !== null ? new Audio(URL.createObjectURL(files[0])) : null);
    const { enqueueSnackbar } = useSnackbar();

    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [single, setSingle] = useState([]);
    const [status, setStatus] = useState('private');
    const [idAlbums, setIdAlbums] = useState([]);
    const [idSingles, setIdSingles] = useState([]);
    // upload thumbnail

    const handleUploadImages = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file?.type?.includes('image')) setThumbnail(file);
            else enqueueSnackbar('thumbnail blank', { variant: 'warning' });
        }
    };
    // handle update api upload music
    const handleUploadMusic = async () => {
        if (title === '') {
            enqueueSnackbar('title blank', { variant: 'warning' });
            return;
        }
        if (description === '') {
            enqueueSnackbar('description blank', { variant: 'warning' });
            return;
        }

        const data = {
            name: title,
            description: description,
            source: files[0],
            thumbnail: thumbnail,
            single: 'den vau',
            type: '1',
            numberListen: 0,
            numberComment: 0,
            numberLike: 0,
            idPublisher: '',
            status: status,
            album: idAlbums,
            singles: idSingles,
            time: formatDurationMusic(audioRef.current.duration),
            createAt: Date.now(),
            updateAt: Date.now(),
        };
        try {
            await createMusic(data);
        } catch (error) {
            enqueueSnackbar('error', 'warning');
        }
    };
    return (
        <Box width={'100%'} height={'100%'} padding={'20px 30px'}>
            <Stack direction={'column'} height={'100%'}>
                <Stack direction={'row'}>
                    <Typography variant="h6">Details</Typography>
                </Stack>
                <Grid2 container p={1} spacing={1} overflow={'auto'} height={'500px'}>
                    <Grid2 item xs={8} height={'100%'} maxHeight={'calc(100vh - 300px)'} overflow={'auto'}>
                        <Stack direction={'column'} spacing={3} width={'100%'}>
                            {/* form control title */}
                            <TextField
                                label="Title"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {/* thumbnail */}
                            <Stack direction={'column'} spacing={1}>
                                <Typography variant="h6">Thumbnail</Typography>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        overflow: 'hidden',
                                        borderRadius: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid',
                                        borderColor: theme.palette.grey[700],
                                    }}
                                    onClick={() => inputRef.current.click()}
                                >
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        name="file"
                                        hidden
                                        onChange={handleUploadImages}
                                    />
                                    {thumbnail !== null ? (
                                        <img
                                            src={URL.createObjectURL(thumbnail)}
                                            alt={'thumnai music'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <Plus size={25} weight="fill" />
                                    )}
                                </Box>
                            </Stack>
                            {/* album */}
                            <MultipleSelect title={'Album'} setId={setIdAlbums} data={names} />
                            <MultipleSelect title={'Single'} setId={setIdSingles} data={names} />
                            {/* visibility */}
                            <FormControl>
                                <FormLabel id="upload-music-group-label">Visibility</FormLabel>
                                <RadioGroup
                                    aria-labelledby="upload-music-group-label"
                                    name="radio-upload-music-group"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <FormControlLabel value="private" control={<Radio />} label="private" />
                                    <FormControlLabel value="public" control={<Radio />} label="public" />
                                    <FormControlLabel value="unlisted" control={<Radio />} label="unlisted" />
                                </RadioGroup>
                            </FormControl>

                            {/* <Stack direction={'column'} spacing={1}>
                                <Typography variant="h6">Playlists</Typography>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Movie" />}
                                />
                            </Stack>
                            <Stack direction={'column'} spacing={1}>
                                <Typography variant="h6">Single</Typography>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Movie" />}
                                />
                            </Stack> */}
                        </Stack>
                    </Grid2>
                    <Grid2 item xs={4} height={'100%'}>
                        <ControlPreviewMusic thumbnail={thumbnail} files={files[0]} title={title} single={single} />
                    </Grid2>
                </Grid2>
                <Stack direction={'row'} padding={'10px'} justifyContent={'space-between'}>
                    <div></div>
                    <Button variant="contained" onClick={handleUploadMusic}>
                        Upload Music
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default AddContentMusic;

//

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    { id: 1, name: 'Oliver Hansen' },
    { id: 2, name: 'Van Henry' },
    { id: 3, name: 'April Tucker' },
    { id: 4, name: 'Ralph Hubbard' },
    { id: 5, name: 'Omar Alexander' },
    { id: 6, name: 'Carlos Abbott' },
    { id: 7, name: 'Miriam Wagner' },
    { id: 8, name: 'Bradley Wilkerson' },
    { id: 9, name: 'Virginia Andrews' },
    { id: 10, name: 'Kelly Snyder' },
];

function getStyles(name, itemNames, theme) {
    return {
        fontWeight:
            itemNames.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}
function MultipleSelect({ title, setId, data = [] }) {
    const theme = useTheme();
    const [itemNames, setItemNames] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        //
        setItemNames(value);
        setId(value.map((item) => item.id));
    };

    return (
        <div>
            <FormControl sx={{ width: '100%', gap: 1 }}>
                <FormLabel id="type-music-multiple-chip-label">{title}</FormLabel>
                <Select
                    labelId="type-music-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={itemNames}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value.id} label={value.name} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {data.map((item) => (
                        <MenuItem key={item.id} value={item} style={getStyles(item.name, itemNames, theme)}>
                            {item.name}
                        </MenuItem>
                    ))}
                    <Box
                        sx={{
                            width: '100%',
                            padding: '5px',
                            borderTop: '1px solid',
                            borderColor: theme.palette.grey[300],
                        }}
                    >
                        <Button variant="text" size="small">
                            Create Album
                        </Button>
                    </Box>
                </Select>
            </FormControl>
        </div>
    );
}
