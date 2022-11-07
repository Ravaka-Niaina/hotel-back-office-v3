import React from 'react';
import { PropTypes } from 'prop-types'; 
import debounce from 'lodash.debounce';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const SelectableRoomCell = ({children,item,chambre,selected,setSelected,setAnchorEl,setOpen,cleanOthers,...others}) => {
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
    const openEditor = (target) => {
        cleanOthers('rate_plan');
        setOpen(false);
            setTimeout(
                () => {
                    setAnchorEl(target);
                    setOpen(true);
                }, 420
        );
    };
    const handleSelect = debounce((e, item, target, direction) => {

        e.currentTarget = target;

        const newItemIndex = chambre.statusDays.findIndex((elem) => elem.date === item);
        const firstItemSelectedIndex = chambre.statusDays.findIndex((elem) => elem.date === selected[0]);
        const lastItemSelectedIndex = chambre.statusDays.findIndex((elem) => elem.date === selected[selected.length - 1]);
        // console.log(selected);
        // console.log(`item=${item}`);
        // console.log(`$first element:${selected[0]}`);
        // console.log(`direction=${direction} , newItemIndex=${newItemIndex} et firstItemSelectedIndex=${firstItemSelectedIndex}`)
        if (direction === 'right' && !(newItemIndex < firstItemSelectedIndex)) {
            // console.log(`newItemIndex=${newItemIndex} > firstItemSelectedIndex=${firstItemSelectedIndex}`)
            openEditor(e.currentTarget);
            const isItemSelected = selected.includes(item);
            if (!isItemSelected) {
                console.log('manova');
                setSelected(
                    () =>
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
                // console.log('MIEMBOTRA°°°°°°°°°°°°°°°°°');
                // console.log(selected.indexOf(item));
                setSelected(oldSelected => (oldSelected.slice(0, oldSelected.indexOf(item) + 1)));
                // console.log(selected);
                // console.log('TAPITRA');
            }
        }
        else if (direction === 'left' && !(newItemIndex > lastItemSelectedIndex)) {
            openEditor(e.currentTarget);
            if (!selected.includes(item)) {

                setSelected(
                    () =>
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
    }, 0)
    return (
        <div 
            {...others} 
            className='SelectableCell' 
            style={{ background: selected.includes(item) ? "#b2d5f8" : "none", }}
            onDragOver={allowDraggingArea}
            onDrop={(e) => {
                handleSelect(e, item, e.currentTarget, e.dataTransfer.types[0]);
            }}
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

SelectableRoomCell.propTypes = {
    children: PropTypes.any,
    item: PropTypes.any,
    chambre: PropTypes.any,
    selected: PropTypes.any,
    setSelected : PropTypes.any,
    setAnchorEl: PropTypes.any,
    setOpen: PropTypes.any,
    cleanOthers: PropTypes.any
};
export default SelectableRoomCell;