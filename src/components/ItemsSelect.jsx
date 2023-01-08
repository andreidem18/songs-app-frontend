import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ItemsSelect = ({ items, itemsSelected, setItemsSelected, isMultiple=true, itemStructure }) => {

    const selectMultiple = (id) => {
        if(!itemsSelected.includes(id)){
            console.log([...itemsSelected, id])
            setItemsSelected([...itemsSelected, id]);}
        else {
            const itemsFiltered = itemsSelected.filter(artist => artist !== id);
            setItemsSelected(itemsFiltered);
        }
    }

    const selectOne = (id) => setItemsSelected(id);

    const isSelectedMultiple = (id) => itemsSelected.includes(id);

    const isSelectedOne = id => itemsSelected === id;


    const selectItem = isMultiple ? selectMultiple : selectOne;

    const isSelected = isMultiple ? isSelectedMultiple : isSelectedOne;

    return (
        <div className="items-select">

            <ListGroup horizontal className='mb-3' style={{width: "fit-content"}}>
                {items.map(item => (
                    <Card
                        className={`
                            form-card ${isSelected(item.id) && 'selected'}
                        `}
                        onClick={() => selectItem(item.id)}
                        key={item.id} 
                    >
                        {itemStructure ? itemStructure(item) : (
                            <>
                                <Card.Img src={item.image} style={{objectFit: "cover"}} />
                                <Card.Body>{item.name}</Card.Body>
                            </>
                        )}
                    </Card>
                ))}
            </ListGroup>
        </div>
    );
};

export default ItemsSelect;