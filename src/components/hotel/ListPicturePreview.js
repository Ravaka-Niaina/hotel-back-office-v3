import React from 'react';
import { ImageList , ImageListItem} from '@mui/material';

const ListPicturePreview = (props) => {
    const {itemData} = props;
    console.log(itemData);
    return (
        <ImageList sx={{ width: 1, height: 450 }}  rowHeight={164} gap={8} variant="masonry">
            {itemData.map((item) => (
                <ImageListItem key={item}  style={{border:'1px white solid'}}>
                    <img
                        src={`${item}`}
                        alt='imge'
                        loading="lazy"
                        
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default ListPicturePreview;