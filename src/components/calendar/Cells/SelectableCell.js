import React from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const SelectableCell = ({children,selected,item,...others}) => {
    const handleDragStart = (e, direction) => {
        const crt = document.createElement('div');
        crt.style.visibility = "hidden"; /* or visibility: hidden, or any of the above */
        e.dataTransfer.clearData();
        e.dataTransfer.setDragImage(crt, 0, 0);
        e.dataTransfer.setData(direction, direction);
        // ev.dataTransfer.setDragImage(img, -50, -50);
    }
    return (
        <div 
            {...others} 
            className='SelectableCell' 
            style={{ background: selected.includes(item) ? "#b2d5f8" : "none", }}
        >
            {children}
            {
                selected.length > 0 &&
                selected[0] === item && (


                    <span
                        style={{
                            cursor: 'ew-resize',
                            position: 'absolute',
                            left: '-10px',
                            zIndex: 16777271,
                        }}
                        onDragStart={(e) => handleDragStart(e, 'left')}
                        draggable
                    >
                        <ArrowCircleLeftIcon sx={{ color: '#2476d2' }} />
                    </span>

                )

            }
            {
                selected.length > 0 &&
                selected[selected.length - 1] === item && (


                    <span
                        style={{
                            cursor: 'ew-resize',
                            position: 'absolute',
                            right: '-10px',
                            zIndex: 16777271,
                        }}
                        onDragStart={(e) => handleDragStart(e, 'right')}
                        draggable
                    >
                        <ArrowCircleRightIcon sx={{ color: '#2476d2' }} />
                    </span>

                )

            }
        </div>
    );
};

export default SelectableCell;