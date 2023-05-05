import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { LoginFormValues } from "../../models/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React,{useState} from "react";
import { Checkbox } from "@mui/material";

const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { username: "", password: "" },
  });
  const { t } = useTranslation();
  let navigate = useNavigate();


  const onSubmit = async (data: LoginFormValues) => {
    try {
     
      const response = await fetch(
        "http://api.training.div3.pgtest.co/api/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.username,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.code === 200) {
        
        toast.success("Đăng nhập thành công");
          document.cookie =
            "token=" +
            result.data.token +
            "; expires=" +
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString() +
            "; path=/";
        setTimeout(() => navigate("/home"), 1000);
      } else {
      
        toast.error("Đăng nhập không thành công");
      }
    } catch (error) {
      // console.log(error);
    }
  };


  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Vui lòng nhập email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Email không hợp lệ";
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = "Vui lòng nhập mật khẩu";
    } else if (value.trim().length < 6) {
      error = "Mật khẩu phải có ít nhất 6 kí tự";
    }
    return error;
  };

  return (
    <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginTop: "32px" }}>
        <label>{t("email")} </label>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            validate: { emailValue: (value) => validateEmail(value) },
          }}
          render={({ field }) => <input className="input-login" {...field}{...register("username")} />}
        />
        {errors.username && <small>{errors.username.message}</small>}
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>{t("password")}</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            validate: {
              minLength: (value) => validatePassword(value),
            },
          }}
          render={({ field }) => (
            <input className="input-login" type="password" {...field} {...register("password")} />
          )}
        />
        {errors.password && <small>{errors.password.message}</small>}
      </div>
    
      <div className="submit">
        <button className="button-login" type="submit">
          Đăng nhập
        </button>
        <NavLink to="/signup" className="button-login">
          Đăng kí
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
