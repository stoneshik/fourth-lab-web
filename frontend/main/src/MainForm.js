import React from "react";
import {useForm} from "react-hook-form";
import {MultiSelect} from "primereact/multiselect";


class MainForm extends React.Component {

    render() {
        return (
            <form onSubmit={handleSubmit(onSubmit)} id="dot_form" className="ui-form">
                <h3>Проверка попадания точки</h3>
                <div className="form-row">
                    <MultiSelect options={[-5, -4, -3, -2, -1, 0, 1, 2, 3]}
                                 onChange={(e) => setSelectedCities1(e.value)}/>
                </div>
                <div className="form-row">
                    <input
                        {...register("y", {
                            required: true,
                            maxLength: 9,
                            pattern: /^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$/,
                            min: -5,
                            max: 3
                        })}
                    />
                    <label className="text-input-label">Y:</label>
                </div>
                <div className="form-row">
                    <input
                        {...register("r", {
                            required: true,
                            maxLength: 9,
                            pattern: /^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$/,
                            min: 1,
                            max: 4
                        })}
                    />
                    <label className="text-input-label">R:</label>
                </div>
                <input type="submit"/>
            </form>
        )
    }
}