import React from 'react';
import { ImageList , ImageListItem} from '@mui/material';

const ListPicturePreview = (props) => {
    const {itemData} = props;
    console.log(itemData);
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
            {itemData.map((item) => (
                <ImageListItem key={item}>
                    <img
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt='imge'
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default ListPicturePreview;