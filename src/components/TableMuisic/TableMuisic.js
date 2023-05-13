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
import React from 'react';

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

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

const headCells = [
    {
        id: 'Name',
        numeric: true,
        right: false,
        disablePadding: true,
        label: 'Bài hát',
    },
    {
        id: 'Album',
        numeric: true,
        right: false,
        disablePadding: false,
        label: 'Album',
    },
    {
        id: 'Time',
        numeric: true,
        right: true,
        disablePadding: false,
        label: 'Thời gian',
    },
];

function EnhancedTableHead(props) {
    const theme = useTheme();
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {numSelected > 0 ? (
                    <TableCell padding="checkbox" sx={{ width: 60 }}>
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
                    <TableCell sx={{ width: 60 }}>
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
                            {/* <Box component="span">{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box> */}
                        </TableSortLabel>
                    </TableCell>
                )}

                <TableCell
                    align={'left'}
                    padding={'normal'}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ color: theme.palette.grey[500] }}
                >
                    Bài hát
                </TableCell>
                <TableCell
                    align={'left'}
                    padding={'normal'}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ color: theme.palette.grey[500] }}
                >
                    Album
                </TableCell>
                <TableCell
                    align={'right'}
                    padding={'normal'}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ color: theme.palette.grey[500], width: 150 }}
                >
                    Bài hát
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

function TableMusic({ data }) {
    const theme = useTheme();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%' }}>
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

function RowTableMusic({ row, isItemSelected, handleClick, labelId, selectedArr = [] }) {
    const theme = useTheme();
    const [hover, setHover] = React.useState(false);

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
            {selectedArr.length > 0 || hover ? (
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
            )}

            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                align="left"
                sx={{ color: theme.palette.grey[500] }}
            >
                <Stack direction={'row'} gap={1} alignItems={'center'}>
                    <Box sx={{ height: 40, width: 40, overflow: 'hidden', borderRadius: 1, position: 'relative' }}>
                        <img
                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                            src={
                                'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/covers/f/a/facbb6acec54dacd342c04b533f56b9d_1396931968.jpg'
                            }
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
                                <Play size={15} color={theme.palette.common.white} weight="fill" />
                            </Box>
                        )}
                    </Box>
                    <Stack direction={'column'}>
                        <Typography
                            variant="h5"
                            fontSize="1rem"
                            color={theme.palette.common.white}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                        >
                            {row.name}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography variant="body2" color={theme.palette.grey[500]}>
                                Earl Klugh
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell align="left" sx={{ color: theme.palette.grey[500] }}>
                <Typography variant="body2" color={theme.palette.grey[500]}>
                    Heimweh (Single)
                </Typography>
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
                    '03:09'
                )}
            </TableCell>
        </TableRow>
    );
}
