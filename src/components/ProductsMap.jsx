import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Contex';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductsMap.css';
import { Alert, Button, Checkbox, FormControlLabel, Snackbar } from '@mui/material';

export default function ProductsMap({ category, popular }) {
    const [arrayProduct, setArrayProduct] = useState([]);
    const [arrayProductOrigin, setArrayProductOrigin] = useState([]);
    const { mainData, cartItems2, setCartItems2 } = useContext(Context);

    const categoryFilter = ['халати робочі'];
    const [categoryFilterGender, setCategoryFilterGender] = useState(false);

    useEffect(() => {
        if (mainData) {
            let filteredProducts = mainData[0].product.filter(
                (item) => item.category === category
            );
            if (popular === true) {
                filteredProducts = filteredProducts.filter(
                    (item) => item.popular
                );
            }
            setArrayProductOrigin(filteredProducts);
            setArrayProduct(filteredProducts);
        }

    }, [mainData, category, popular]);

    useEffect(() => {
        categoryFilter.forEach(element => {
            if (element === category) {
                setCategoryFilterGender(true)
            }
        });
    }, []);


    const [productWindow, setProductWindow] = useState(false);
    const [product, setProduct] = useState([]);

    const touchProduct = (item) => {
        setProduct(item)
        setProductWindow(true)
    };
    const touchProductClose = () => {
        setProductWindow(false)
    };

    const [open, setOpen] = useState(false);

    const handleClick = async (item) => {
        setOpen(true);
        const cartItems = await localStorage.getItem("cartItems");
        if (cartItems) {
            const cartItemsPars = JSON.parse(cartItems);
            localStorage.setItem('cartItems', JSON.stringify([...cartItemsPars, item]));
        } else {
            localStorage.setItem('cartItems', JSON.stringify([item]));
        }
        setCartItems2([...cartItems2, item]);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // Фильтр
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [gender, setGender] = useState(false);
    const [selectedValue, setSelectedValue] = useState('sorting');

    const handleMinChange = (event) => {
        const value = parseInt(event.target.value);
        // isNaN(value) ? setMin(0) : setMin(value);
        setMin(value);

    };

    const handleMaxChange = (event) => {
        const value = parseInt(event.target.value);
        setMax(value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value)
        console.log(gender);
    };

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value === "less") {
            const sorted = [...arrayProduct].sort((a, b) => a.price - b.price);
            setArrayProduct(sorted);
        }
        if (event.target.value === "more") {
            const sorted = [...arrayProduct].sort((a, b) => b.price - a.price);
            setArrayProduct(sorted);
        }
    };

    const handleFilterPriceClick = () => {
        let filteredProducts = arrayProductOrigin;

        if (min > 0 && max > 0) {
            filteredProducts = filteredProducts.filter((product) => {
                return product.price >= min && product.price <= max;
            });
        }

        if (gender) {
            filteredProducts = filteredProducts.filter((product) => {
                return product.gender === gender;
            });
        }

        setArrayProduct(filteredProducts);
        setSelectedValue('sorting');
    };

    const handleFilterPriceNull = () => {
        setSelectedValue('sorting');
        setArrayProduct(arrayProductOrigin);
        setMin('');
        setMax('');
        setGender(false);
    };


    return (

        <div className='productsMap'>


            {!popular && <div className='filter'>

                <select onChange={handleSelectChange} value={selectedValue} name="select" className='filter-select'>
                    <option value="sorting" disabled>Сортування</option>
                    <option value="less">від меншої ціни</option>
                    <option value="more">від більшої ціни</option>
                </select>

                <label className='filter-price__label'>
                    Ціна:
                    <div className='filter-price'>
                        <input className='filter-price__input' value={min} placeholder='Від' type="number" onChange={handleMinChange} />
                        <div>-</div>
                        <input className='filter-price__input' value={max} placeholder='До' type="number" onChange={handleMaxChange} />
                    </div>
                </label>
                {categoryFilterGender && <FormControlLabel
                    value="Чоловічий"
                    control={<Checkbox />}
                    label="Чоловічі"
                    labelPlacement="end"
                    sx={{ display: 'flex', marginTop: '20px' }}
                    onChange={handleGenderChange}
                    checked={gender === 'Чоловічий'}
                />}
                {categoryFilterGender && <FormControlLabel
                    value="Жіночий"
                    control={<Checkbox />}
                    label="Жіночі"
                    labelPlacement="end"
                    sx={{ display: 'flex' }}
                    onChange={handleGenderChange}
                    checked={gender === 'Жіночий'}
                />}

                <Button onClick={handleFilterPriceClick} sx={{ marginBottom: '20px', marginTop: '20px', backgroundColor: '#F07C00', '&:hover': { backgroundColor: '#F07C00', color: 'white !important' }, maxHeight: '35px !important', minWidth: '25px !important' }} variant="contained">OK</Button>
                <Button onClick={handleFilterPriceNull} sx={{ backgroundColor: '#F07C00', '&:hover': { backgroundColor: '#F07C00', color: 'white !important' }, maxHeight: '35px !important' }} variant="contained">Анулювати фільтр</Button>
            </div>}


            <div className='productsMap-box'>
                {arrayProduct.map((item, index) => (
                    <div onClick={() => touchProduct(item)} className='productsMap-box-item' key={index}>
                        <div className='productsMap-box__picture'>
                            <img className='productsMap-box__image' src={item.img[0]} alt='' />
                        </div>
                        <div className='productsMap-text'>
                            <div className='productsMap-title'>{item.title}</div>
                            <div className='productsMap-box__price'>{item.price} <span className='productsMap-box__price-span'>UAH</span></div>
                        </div>

                    </div>
                ))}
            </div>

            {productWindow && <div className='product-window__blur' onClick={touchProductClose}></div>}
            {productWindow && <div className='product-window'>
                <img onClick={touchProductClose} className='product-window__close' src="./img/close.png" alt="" />
                <div className='product-window__gallary'>
                    <div className='product-carousel__bootstrap'>
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                            <div className="carousel-inner">
                                {product.img.map((item, index) => (
                                    (index === 0) ?
                                        <div key={index} className="carousel-item active product-window__gallary__picture">
                                            <img src={item} className="d-block product-window__gallary__img" alt="..." />
                                        </div> :
                                        <div key={index} className={`carousel-item product-window__gallary__picture`}
                                        >
                                            <img src={item} className="d-block product-window__gallary__img" alt="..." />
                                        </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon carousel-control-prev-icon-color" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon-color carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div className='product-window__gallary-box'>
                        {product.img.map((item, index) => (
                            (index > 4) ? '' : <div key={index} className='product-window__gallary-box-picture'>
                                <img className='product-window__gallary-box-img' src={item} alt='' />
                            </div>
                        ))}
                    </div>

                </div>
                <div className='product-window__info'>
                    <h2 className='product-window__info-title'>{product.title}</h2>
                    <h2 className='product-window__info-article'>Артикул: {product.article}</h2>
                    <div className='product-window__info-line'></div>
                    <div className='product-window__info-price'>{product.price} <span className='product-window__info-price-span'>UAH</span></div>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Опис товару
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className='product-window__info-description'>{product.description}</div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Характеристика товару
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className='product-window__info-description'>{product.characteristic}</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {!open && <Button onClick={() => handleClick(product)} sx={{ backgroundColor: '#F07C00', '&:hover': { backgroundColor: '#F07C00', color: 'white !important' }, marginTop: '20px', fontSize: '11px', right: '-400px' }} variant="contained">Додати до кошику</Button>}
                    <Snackbar style={{ bottom: '15px', right: '20px' }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', fontSize: '13px', height: '50px' }}>
                            Товар додано до кошику
                        </Alert>
                    </Snackbar>
                </div>
            </div>}

        </div>

    );
}
