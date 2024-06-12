import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { ISelectProps } from '../../interface/interface';

const Selector = (props: ISelectProps) => {
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    { props.label }
                </InputLabel>
                <Select
                    className={`my-3 ${props.className}`}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.value}
                    label={props.label}
                    onChange={props.handleChange}
                >
                    {
                        props.items.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                                {item.title}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </>
    )
}

export default Selector;