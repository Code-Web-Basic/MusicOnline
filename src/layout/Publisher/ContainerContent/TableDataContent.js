import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';

import {
    Box,
    Checkbox,
    Chip,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { DotsThree, Funnel, Play, Trash } from 'phosphor-react';

function createData(name, single, album, time, type, listen, status) {
    return {
        name,
        single,
        album,
        time,
        type,
        listen,
        status,
    };
}

const rows = [
    createData('Cupcake', 'black pink', 'mtm', '02:53', 'rock', 67, 'publish'),
    createData('Donut', 'black pink', 'rock (single)', '02:53', 'rock', 70, 'private'),
    createData('Eclair', 'black pink', 'rock (single)', '02:53', 'rock', 69, 'publish'),
    createData('Frozen yoghurt', 'black pink', 'rock (single)', '02:53', 'rock', 80, 'block'),
    createData('Gingerbread', 'black pink', 'rock (single)', '02:53', 'rock', 80, 'publish'),
    createData('Honeycomb', 'black pink', 'rock (single)', '02:53', 'rock', 47, 'publish'),
    createData('Ice cream sandwich', 'black pink', 'rock (single)', '02:53', 35, 'rock', 'publish'),
    createData('Jelly Bean', 'black pink', 'rock (single)', '02:53', 'rock', 65, 'publish'),
    createData('KitKat', 'black pink', 'rock (single)', '02:53', 'rock', 89, 'publish'),
    createData('Lollipop', 'black pink', 'rock (single)', '02:53', 'rock', 35, 'publish'),
    createData('Marshmallow', 'black pink', 'rock (single)', '02:53', 'rock', 78, 'publish'),
    createData('Nougat', 'black pink', 'rock (single)', '02:53', 'rock', 89, 'publish'),
    createData('Oreo', 'black pink', 'rock (single)', '02:53', 'rock', 45, 'private'),
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
        id: 'name',
        width: 300,
        numeric: false,
        disablePadding: true,
        label: 'bài hát',
    },

    {
        id: 'album',
        width: 200,
        numeric: false,
        disablePadding: false,
        label: 'Album',
    },
    {
        id: 'time',
        numeric: false,
        disablePadding: false,
        label: 'Thời gian',
    },
    {
        id: 'type',
        width: 200,
        numeric: false,
        disablePadding: false,
        label: 'Loại',
    },

    {
        id: 'listen',
        numeric: false,
        disablePadding: false,
        label: 'lượt nghe',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Trạng thái',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
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
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        width={headCell.width ? headCell.width : 'none'}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
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

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Music
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <Trash size={20} weight="fill" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <Funnel size={20} weight="fill" />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function TableDataContent() {
    const theme = useTheme();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        console.log(property);
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
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
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
                                    <RowTableContent
                                        key={row.name}
                                        row={row}
                                        isItemSelected={isItemSelected}
                                        handleClick={handleClick}
                                        labelId={labelId}
                                    />
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 70 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export function RowTableContent({ row, isItemSelected, handleClick, labelId }) {
    const [hover, setHover] = React.useState();
    const theme = useTheme();

    const renderChip = (label) => {
        if (label === 'publish') {
            return <Chip sx={{ width: 70 }} label="publish" color="success" />;
        } else if (label === 'private') {
            return <Chip sx={{ width: 70 }} label="private" color="warning" />;
        } else if (label === 'block') {
            return <Chip sx={{ width: 70 }} label="block" color="error" />;
        }
    };
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.name}
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
        >
            <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.name)}>
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
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
                            color={theme.palette.common.black}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                        >
                            {row.name}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography variant="body2" color={theme.palette.grey[500]}>
                                {row.single}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell align="left">{row.album}</TableCell>
            <TableCell align="left">{row.time}</TableCell>
            <TableCell align="left">{row.type}</TableCell>
            <TableCell align="left">{row.listen}</TableCell>
            <TableCell align="left">{renderChip(row.status)}</TableCell>
            <TableCell align="left">
                <Tooltip title="khác">
                    <IconButton>
                        <DotsThree size={25} color={theme.palette.grey[700]} />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}
