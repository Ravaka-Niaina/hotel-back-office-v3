import React from 'react';
import debounce from 'lodash.debounce';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const SelectableRatePlanCell = ({children, chambre, selected, setSelected, setAnchorEl, item, ...others}) => {
    const handleDragStart = (e, direction) => {
        const crt = document.createElement('div');
        crt.style.visibility = "hidden"; /* or visibility: hidden, or any of the above */
        e.dataTransfer.clearData();
        e.dataTransfer.setDragImage(crt, 0, 0);
        e.dataTransfer.setData(direction, direction);
        // ev.dataTransfer.setDragImage(img, -50, -50);
    }
    const allowDraggingArea = (e) => {
        e.preventDefault();
    };
    const handleSelect = debounce((e, item, target, direction) => {
        e.currentTarget = target;
        const newItemIndex = chambre.statusDays.findIndex((elem) => elem.date === item);
        const firstItemSelectedIndex = chambre.statusDays.findIndex((elem) => elem.date === selected[0]);
        const lastItemSelectedIndex = chambre.statusDays.findIndex((elem) => elem.date === selected[selected.length - 1]);
        if (direction === 'right' && !(newItemIndex < firstItemSelectedIndex)) {
            setAnchorEl(e.currentTarget);
            const isItemSelected = selected.includes(item);
            if (!isItemSelected) {
    
                setSelected(
                    oldSelected =>
                    (
                        chambre.statusDays.reduce((stack, elem, i) => {
                            if (i <= newItemIndex && i >= firstItemSelectedIndex) {
                                stack.push(elem.date);
                            }
                            return stack;
                        }, [])
                    )
                );
            }
            else {

                setSelected(oldSelected => (oldSelected.slice(0, oldSelected.indexOf(item) + 1)));

            }
        }
        else if (direction === 'left' && !(newItemIndex > lastItemSelectedIndex)) {
            setAnchorEl(e.currentTarget);
            if (!selected.includes(item)) {

                setSelected(
                    oldSelected =>
                    (
                        chambre.statusDays.reduce((stack, elem, i) => {
                            if (i >= newItemIndex && i <= lastItemSelectedIndex) {
                                stack.push(elem.date);
                            }
                            return stack;
                        }, [])
                    )
                );
            }
            else {

                setSelected(oldSelected => (oldSelected.slice(oldSelected.indexOf(item), oldSelected.length)));
            }
        }
    }, 500)
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

export default SelectableRatePlanCell;