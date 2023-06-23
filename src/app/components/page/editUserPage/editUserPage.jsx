import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";

const UserChangeForm = ({ userId }) => {
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    // создадим loader
    const [loading, setLoading] = useState(true);

    // создаем стейт для хранения качеств
    const [qualities, setQualities] = useState([]);
    // создаем стейт для хранения ошибок, которые вводит пользователь
    const [errors, setErrors] = useState({});
    // создаем хук юзстейт для хранения профессий, там сейчас ничего нет
    const [professions, setProfession] = useState();

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const transformData = (data) =>
        data.map((item) => ({
            label: item.name,
            value: item._id,
            color: item.color
        }));

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            console.log("user", user);
            setData((prev) => ({
                ...prev,
                ...user,
                profession: user.profession._id,
                qualities: transformData(user.qualities)
            }));
        });

        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });

        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (professions && qualities && data._id) {
            console.log("users-update");
            setLoading(false);
        }
    }, [data, professions, qualities]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена не корректно!"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data._id, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidate = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(() => history.goBack());
    };

    return (
        <>
            {!loading ? (
                <div className="container mt-5">
                    <BackHistoryButton />
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4 ">
                            <div className="row">
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Имя"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <TextField
                                        label="Электронная почта"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                    <SelectField
                                        defaultOption="Выберите профессию"
                                        options={professions}
                                        name="profession"
                                        onChange={handleChange}
                                        value={data.profession}
                                        label="Выберите вашу профессию"
                                        error={errors.profession}
                                    />
                                    <RadioField
                                        options={[
                                            { name: "Male", value: "male" },
                                            { name: "Female", value: "female" }
                                        ]}
                                        label="Выберите Ваш пол"
                                        value={data.sex}
                                        name="sex"
                                        onChange={handleChange}
                                    />
                                    <MultiSelectField
                                        options={qualities}
                                        onChange={handleChange}
                                        defaultValue={data.qualities}
                                        name="qualities"
                                        label="Выберите Ваши качества"
                                    />
                                    <button
                                        className="btn btn-primary w-100 mx-auto"
                                        disabled={!isValidate}
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

UserChangeForm.propTypes = {
    userId: PropTypes.string
};

export default UserChangeForm;
