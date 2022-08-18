import React from 'react';
import { ImageList , ImageListItem} from '@mui/material';

const ListPicturePreview = (props) => {
    const {itemData} = props;
    console.log(itemData);
    return (
        <ImageList sx={{ width: 1, height: 450 }} cols={2} rowHeight={164}>
            {itemData.map((item) => (
                <ImageListItem key={item} sx={{border:'2px black solid'}}>
                    <img
                        src={`${item}`}
                        alt='imge'
                        loading="lazy"
                        style={{ maxWidth: '300px', maxHeight: '200px', width: 'auto', height: 'auto', margin: '2px 2px', padding: '0 0' }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default ListPicturePreview;