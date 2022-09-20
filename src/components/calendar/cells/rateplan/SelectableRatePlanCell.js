import React from 'react';
import debounce from 'lodash.debounce';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const getItemData = (item) => {
    if(typeof item !== 'string')
    {
        return null;
    };
    const dataSplited = item.split('@');
    return {
            "date":dataSplited[0],
            "rate_plan_index":parseInt(dataSplited[1],10),
            "version_index":parseInt(dataSplited[2],10),
};
};
const SelectableRatePlanCell = ({children, item, chambre, selected, setSelected, setAnchorEl, setOpen , setRoomSelected,cleanOthers, ...others}) => {
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
        cleanOthers('room');
        setOpen(false);
        setTimeout(
            () => {
                setAnchorEl(target);
                setOpen(true);
            }, 420
        );
    }
    const handleSelect = debounce((e, item, target, direction) => {
        e.currentTarget = target;
        
        const newItemData = getItemData(item);
        const firstItemData = getItemData(selected[0]) || newItemData;
        const lastItemData = getItemData(selected[selected.length - 1]) || newItemData;

        const newItemIndex = chambre.planTarifaire[newItemData.rate_plan_index].prixTarif.findIndex((elem) => elem.date ===  newItemData.date);
        const firstItemSelectedIndex = chambre.planTarifaire[firstItemData.rate_plan_index].prixTarif.findIndex((elem) => elem.date === firstItemData.date);
        const lastItemSelectedIndex = chambre.planTarifaire[lastItemData.rate_plan_index].prixTarif.findIndex((elem) => elem.date === lastItemData.date);
        if (direction === 'right' && !(newItemIndex < firstItemSelectedIndex)) {
            openEditor(e.currentTarget);
            const isItemSelected = selected.includes(item);
            if (!isItemSelected) {
    
                setSelected(
                    oldSelected =>
                    (
                        chambre.planTarifaire[newItemData.rate_plan_index].prixTarif.reduce((stack, elem, i) => {
                            if (i <= newItemIndex && i >= firstItemSelectedIndex) {
                                stack.push(`${elem.date}@${newItemData.rate_plan_index}@${newItemData.version_index}`);
                            }
                            return stack;
                        }, [])
                    )
                );
            }
            else {

                setSelected(oldSelected => oldSelected.slice(0, oldSelected.indexOf(item) + 1));

            }
        }
        else if (direction === 'left' && !(newItemIndex > lastItemSelectedIndex)) {
            openEditor(e.currentTarget);
            if (!selected.includes(item)) {

                setSelected(
                    oldSelected =>
                    (
                        chambre.planTarifaire[newItemData.rate_plan_index].prixTarif.reduce((stack, elem, i) => {
                            if (i >= newItemIndex && i <= lastItemSelectedIndex) {
                                stack.push(`${elem.date}@${newItemData.rate_plan_index}@${newItemData.version_index}`);
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

export default SelectableRatePlanCell;