import { Box, Stack, useTheme } from '@mui/material';
import { MagnifyingGlass, X } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import SuggestSearch from './SuggestSearch';
import SearchValue from './SearchValue';
import useDebounce from '~/hooks/useDebounce';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchMusic as searchMusicApi } from '~/service/public/searchService';

function SearchResult() {
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [inputFocus, setInputFocus] = useState(false);
    const [valueInput, setValueInput] = useState(searchParams.get('query') || '');
    const [searchValue, setSearchValue] = useState({ dataMusic: [], dataPlaylist: [] });
    const [isSearching, setIsSearching] = useState(false);

    const valueDebounce = useDebounce(valueInput, 500);

    useEffect(() => {
        if (valueDebounce) {
            setIsSearching(true);
            const callApi = async () => {
                const res = await searchMusicApi({ keyword: valueDebounce });
                setSearchValue({ dataMusic: res, dataPlaylist: [] });
                setIsSearching(false);
            };
            callApi();
        } else {
            setSearchValue([]);
            setIsSearching(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueDebounce]);

    const clickClear = () => {
        setValueInput('');
        setSearchValue([]);
        if (isSearching) {
        }
        return;
    };
    const handleEnter = (e) => {
        e.preventDefault();
        if (!valueInput.trim()) return;
        navigate(`/search?query=${encodeURIComponent(valueInput.trim())}`);
        inputRef.current.blur();
    };

    return (
        <form onSubmit={handleEnter}>
            <Box
                sx={{
                    position: 'relative',
                    height: '40px',
                    width: 440,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '5px 10px',
                    borderRadius: !inputFocus ? '20px' : '20px 20px 0 0',
                    background: !inputFocus ? 'hsla(0,0%,100%,0.1)' : '#34224f',
                }}
            >
                <Stack direction={'row'} width={'100%'} height={'40px'} gap={'10px'} alignItems={'center'}>
                    <MagnifyingGlass size={20} color={theme.palette.grey[500]} />
                    <input
                        ref={inputRef}
                        style={{
                            background: 'none',
                            outline: 'none',
                            border: 'none',
                            color: theme.palette.grey[500],
                            width: '90%',
                            fontSize: '0.8rem',
                        }}
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => setInputFocus(false)}
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát"
                    />
                    {valueInput !== '' && <X size={20} onClick={clickClear} color={theme.palette.grey[500]} />}
                </Stack>

                {inputFocus && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            height: 'auto',
                            maxHeight: 500,
                            minHeight: '20px',
                            left: 0,
                            width: '100%',
                            background: '#34224f',
                            borderBottomLeftRadius: '20px',
                            borderBottomRightRadius: '20px',
                        }}
                    >
                        {searchValue?.dataMusic?.length > 0 || searchValue?.dataPlaylist?.length > 0 ? (
                            <SearchValue dataMusic={searchValue.dataMusic} dataKeyword={searchValue.dataPlaylist} />
                        ) : (
                            <SuggestSearch />
                        )}
                    </Box>
                )}
            </Box>
        </form>
    );
}

export default SearchResult;
