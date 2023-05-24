import { useState } from "react";

const { Box, Stack, Typography, Input, TextField, InputLabel, Select, MenuItem, FormControl, Avatar, Button } = require("@mui/material");


const months = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12']
function ProfileDetail() {
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleChangeAge = (event) => {
        console.log(event.target.value)
        setAge(event.target.value);
    };

    const handleChangeAvatar = async (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    }

    return (<Box sx={{ margin: '0px 20%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <Stack sx={{ padding: '15px' }}>
            <Typography variant="h3">
                Tổng quan về tài khoản
            </Typography>
        </Stack>
        <Stack sx={{ padding: '15px' }}>
            <Typography variant="h5">
                Hồ sơ
            </Typography>
            <Stack display='flex' flexDirection='row' alignItems='center'>
                <Stack>
                    <Stack sx={{ margin: '5px 0' }}>
                        <Typography variant="p" fontSize='15px'>
                            Email
                        </Typography>
                        <TextField
                            disabled
                            id="outlined-read-only-input"
                            defaultValue="testing@gmail.com"
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ margin: '5px 0' }}
                        />
                    </Stack>
                    <Stack sx={{ margin: '5px 0' }}>
                        <Typography variant="p" fontSize='15px'>
                            Họ và tên
                        </Typography>
                        <TextField id="outlined-search" type="search" defaultValue='testing' sx={{ margin: '5px 0' }} />
                    </Stack>
                    <Stack sx={{ margin: '5px 0' }}>
                        <Typography variant="p" fontSize='15px'>
                            Ngày sinh
                        </Typography>
                        <Stack direction='row'>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue="07"
                                sx={{ margin: '5px 5px' }}
                            />
                            <FormControl sx={{ margin: '5px 5px', width: '200px' }}>
                                <Select
                                    value={age}
                                    onChange={handleChangeAge}
                                >
                                    {months.map((month, index) => (
                                        <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                disabled
                                id="outlined-read-only-input"
                                defaultValue="2002"
                                sx={{ margin: '5px 5px' }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{ margin: '5px 10px' }}>
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            handleChangeAvatar(e)
                        }}
                    />
                    <label htmlFor="file" >
                        <div style={{ width: '30%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}>
                            <Avatar sx={{ width: '250px', height: '250px' }} alt="Avatar" src={avatar} />
                        </div>
                    </label>
                </Stack>
            </Stack>
            <Stack display='flex' flexDirection='row'>
                <Button disabled>
                    Hủy
                </Button>
                <Button disabled variant="contained" color="success">
                    Cập nhập
                </Button>
            </Stack>
        </Stack>
        <Stack sx={{ padding: '15px' }}>
            <Typography variant="h5">
                Gói của bạn
            </Typography>
            <Stack>
                <Stack sx={{ width: '100%', backgroundColor: '#ccc', borderRadius: '10px', padding: '20px 20px' }}>
                    FreeMusic
                </Stack>
                <Stack sx={{ width: '100%', padding: '20px 0' }}>
                    Sử dụng dịch vụ ở chế độ miễn phí
                </Stack>
                <Stack>
                    <Button variant="contained" color="success" sx={{ width: '150px', padding: '10px ' }}>
                        Đăng ký VIP
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    </Box>);
}

export default ProfileDetail;