import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import './Register.css'
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
    });
    const [data, setData] = useState([])
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFieldBlur = (fieldName) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: '',
        }));
    };
    const handleSubmit = (e) => {
        debugger
        e.preventDefault();

        if (validateForm()) {
            const registeredData = localStorage.getItem('registeredData')
                ? JSON.parse(localStorage.getItem('registeredData'))
                : [];
            registeredData.push(formData);
            localStorage.setItem('registeredData', JSON.stringify(registeredData));

            setFormData({
                username: '',
                email: '',
                password: '',
                phone: '',
            });

            setData(registeredData);
            navigate('/dashboard');


        }
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (formData.username.trim() === '') {
            newErrors.username = 'Username is required';
            valid = false;
        }

        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
            valid = false;
        }
        if (formData.phone.trim() === '') {
            newErrors.phone = 'Phone number is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center mt-3">
                <div className="row ">
                    <div className="col-md-6">
                        <Card sx={{ width: 350, boxShadow: 10, borderRadius: 4, padding: 1 }}>
                            <AccountCircleIcon sx={{ fontSize: 45 }} />
                            <Typography variant="h6" sx={{ fontWeight: 900, marginTop: 1 }}>
                            ADD USERS
                            </Typography>
                            <form className='form' onSubmit={handleSubmit} >
                                <div className="mt-2">
                                    <input
                                        className="form-control "
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        onBlur={() => handleFieldBlur('username')}
                                        placeholder="Username..."

                                    />
                                    {errors.username && (
                                        <Typography variant="caption" color="error" sx={{ marginRight: 20 }}>
                                            {errors.username}
                                        </Typography>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="form-control "
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={() => handleFieldBlur('email')}
                                        placeholder="Email..."
                                    />
                                    {errors.email && (
                                        <Typography variant="caption" color="error" sx={{ marginRight: 20 }}>
                                            {errors.email}
                                        </Typography>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="form-control "
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={() => handleFieldBlur('password')}
                                        placeholder="Password..."
                                    />
                                    {errors.password && (
                                        <Typography variant="caption" color="error" sx={{ marginRight: 20 }}>
                                            {errors.password}
                                        </Typography>
                                    )}
                                </div>
                                <div className="mt-3">
                                    <input
                                        className="form-control "
                                        type="number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onBlur={() => handleFieldBlur('phone')}
                                        placeholder="Phone..."
                                    />
                                    {errors.phone && (
                                        <Typography variant="caption" color="error" sx={{ marginRight: 17 }}>
                                            {errors.phone}
                                        </Typography>
                                    )}
                                </div>

                                <div className="mt-3">
                                    <Button
                                        className=" form-control"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        sx={{ borderRadius: 50 }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;