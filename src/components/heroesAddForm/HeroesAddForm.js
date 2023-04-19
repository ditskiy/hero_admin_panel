import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addItem } from '../../actions';
import {useHttp} from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

// console.log(JSON.stringify(values, null, 2)
const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();

    const addHeroes = (values) => {
        const id = {id: uuidv4()}
        const obj = {...id, ...values}
        console.log(obj)
        const body = JSON.stringify(obj); // преобразуем объект с данными в JSON-строку
        request("http://localhost:3001/heroes", "POST", body)
        dispatch(addItem(obj))
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            element: ""
        },
        onSubmit: values => addHeroes(values)
    })

    return (
            <form className="border p-4 shadow-lg rounded" onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <input 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"
                        value={formik.values.name}
                        onChange={formik.handleChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <input
                        required
                        name="description" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}
                        value={formik.values.text}
                        onChange={formik.handleChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <select 
                        required
                        className="form-select" 
                        id="element" 
                        name="element"
                        value={formik.values.element}
                        onChange={formik.handleChange}>
                        <option value="">Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </form>
    )
}

export default HeroesAddForm;