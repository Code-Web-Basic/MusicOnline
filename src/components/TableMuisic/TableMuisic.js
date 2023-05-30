import {
    Box,
    Checkbox,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
    alpha,
    useTheme,
} from '@mui/material';
import { DotsThree, Heart, MusicNote, Play } from 'phosphor-react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import images from '~/asset/images';
import { addOneMusic } from '~/features/playlistCurrentSlice';
import { formatDurationMusic } from '~/util/formatTime';

function createData(id, name, thumbnail, description, Album, time, singer, type, source, ownerId) {
    return {
        id,
        name,
        thumbnail,
        description,
        Album,
        time,
        singer,
        type,
        source,
        ownerId,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const theme = useTheme();
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow sx={{ background: 'transparent' }}>
                {/* {numSelected > 0 ? (
                    <TableCell padding="checkbox" sx={{ width: 60, background: 'transparent' }}>
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                ) : (
                    <TableCell sx={{ width: 60, background: 'transparent' }}>
                        <TableSortLabel
                            // active={orderBy === headCell.id}
                            direction={orderBy === 'Name' ? order : 'asc'}
                            onClick={createSortHandler('Name')}
                            sx={{
                                color: theme.palette.grey[500],
                                '&:hover': {
                                    color: theme.palette.grey[500],
                                },
                            }}
                        >
                           
                        </TableSortLabel>
                    </TableCell>
                )} */}

                <TableCell
                    align={'left'}
                    padding={'normal'}
                    width={300}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ color: theme.palette.grey[500], background: 'transparent' }}
                >
                    Bài hát
                </TableCell>
                <TableCell
                    align={'left'}
                    padding={'normal'}
                    width={200}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ color: theme.palette.grey[500], background: 'transparent' }}
                >
                    Album
                </TableCell>
                <TableCell
                    align={'right'}
                    padding={'normal'}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ color: theme.palette.grey[500], background: 'transparent', width: 150 }}
                >
                    {/* Bài hát */}
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function TableMusic({ data = [] }) {
    const theme = useTheme();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Bài hát');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let rows = null;
    if (!rows) {
        rows = data.map((i) => {
            return createData(
                i?.id,
                i?.name,
                i?.thumbnail,
                i?.description,
                '',
                '',
                i?.singer,
                i?.type,
                i?.source,
                i?.ownerId,
            );
        });
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(() => stableSort(rows, getComparator(order, orderBy)), [order, orderBy, rows]);
    return (
        <Box sx={{ width: '100%', overflow: 'auto', maxHeight: '100%' }}>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 750,
                        overflowX: 'hidden',
                        borderColor: theme.palette.grey[500],
                    }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <RowTableMusic
                                    key={row.name}
                                    row={row}
                                    isItemSelected={isItemSelected}
                                    handleClick={handleClick}
                                    labelId={labelId}
                                    selectedArr={selected}
                                />
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} 
            />*/}
        </Box>
    );
}

export default TableMusic;

function RowTableMusic({ row = {}, isItemSelected, handleClick, labelId, selectedArr = [] }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [hover, setHover] = React.useState(false);
    console.log(row);
    const handleClickAddMusicPlaylist = () => {
        console.log(row);
        dispatch(addOneMusic({ ...row }));
    };
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            sx={{
                height: 70,
                cursor: 'pointer',
                '&.MuiTableRow-root': {
                    borderRadius: 2,
                    overflow: 'hidden',
                },
                '&.MuiTableRow-root.Mui-selected': {
                    backgroundColor: alpha(theme.palette.grey[500], theme.palette.action.selectedOpacity),
                },
                '&.MuiTableRow-root.Mui-selected:hover': {
                    backgroundColor: alpha(theme.palette.grey[600], theme.palette.action.selectedOpacity),
                },
                '&.MuiTableRow-root:hover': {
                    backgroundColor: alpha(theme.palette.grey[600], theme.palette.action.selectedOpacity),
                },
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            // classes={{
            //     root: useStyles.tableRowRoot,
            //     selected: useStyles.tableRowSelected,
            // }}
        >
            {/* {selectedArr.length > 0 || hover ? (
                <TableCell sx={{ color: theme.palette.grey[500], width: 50 }} padding="checkbox">
                    <Checkbox
                        onClick={(event) => handleClick(event, row.name)}
                        sx={{ color: theme.palette.grey[500] }}
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                    />
                </TableCell>
            ) : (
                <TableCell sx={{ color: theme.palette.grey[500], width: 50 }}>
                    <MusicNote size={20} color={theme.palette.grey[500]} />
                </TableCell>
            )} */}

            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                align="left"
                sx={{ color: theme.palette.grey[500] }}
                width={'400'}
            >
                <Stack direction={'row'} gap={1} alignItems={'center'}>
                    <Box sx={{ height: 40, width: 40, overflow: 'hidden', borderRadius: 1, position: 'relative' }}>
                        <img
                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                            src={row?.thumbnail ? row?.thumbnail : images.noImageMusic}
                            alt="music"
                        />
                        {hover && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <Play
                                    size={15}
                                    color={theme.palette.common.white}
                                    weight="fill"
                                    onClick={() => handleClickAddMusicPlaylist()}
                                />
                            </Box>
                        )}
                    </Box>
                    <Stack direction={'column'} width={400} overflow={'hidden'}>
                        <Typography
                            variant="h5"
                            fontSize="1rem"
                            color={theme.palette.common.white}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            noWrap
                            width={'100%'}
                        >
                            {row.name}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'} width={'100%'}>
                            <Typography variant="body2" color={theme.palette.grey[500]}>
                                {/* Earl Klugh */}
                                {row?.singer?.map((i, index) => (index + 1 === row?.singer?.length ? `${i}` : `${i},`))}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell align="left" sx={{ color: theme.palette.grey[500] }}>
                <Stack direction={'column'} width={200} overflow={'hidden'}>
                    <Typography
                        variant="body2"
                        color={theme.palette.grey[500]}
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}
                        noWrap
                        width={'100%'}
                    >
                        {row?.name + '(single)'}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell align="right" sx={{ color: theme.palette.grey[500] }}>
                {hover ? (
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                        <Tooltip title="Thêm vào thư viện">
                            <Checkbox
                                sx={{ marginRight: '10px' }}
                                icon={<Heart size={15} color={theme.palette.common.white} />}
                                checkedIcon={<Heart size={15} weight="fill" color="#9b4de0" />}
                                // sx={{ color: '#9b4de0' }}
                            />
                        </Tooltip>
                        <Tooltip title="khác">
                            <IconButton
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[800],
                                    },
                                }}
                            >
                                <DotsThree size={20} weight="bold" color={theme.palette.common.white} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                ) : (
                    row?.time
                )}
            </TableCell>
        </TableRow>
    );
}
