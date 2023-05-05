import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  ISignUpParams,
} from "../../../models/auth";
import "../login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { TextField,MenuItem } from "@material-ui/core";
import Logo from "../../../asset/logo.png"
const SignUp = () => {
  const {
    control,register,handleSubmit,formState: { errors },} = useForm<ISignUpParams>(
      {
        defaultValues: {
          name: "",
          password: "",
          email: "",
          repeatPassword: "",
          gender: "",
          state: "",
          region: "",
        },
      }
    )

  let navigate = useNavigate();
  const { t } = useTranslation();
  const [cityId, setCityId] = React.useState<string>("");
  const [cityData, setCityData] = React.useState<Array<any>>([]);
  const [countryData, setCountryData] = React.useState<Array<any>>([]);

  useEffect(() => {
    fetch("http://api.training.div3.pgtest.co/api/v1/location")
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data.data);
      });
  }, []);

  useEffect(() => {
    if (cityId)
      fetch(`http://api.training.div3.pgtest.co/api/v1/location?pid=${cityId}`)
        .then((res) => res.json())
        .then((data) => {
          setCityData(data.data);
        });
  }, [cityId]);

  const SelectGender = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
  ];
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
  // const region = Object.values(locations);
//   const options = countryData.map((option, id) => ({
//     label: option.name,
//     value: option.id,
//   }));

// console.log(options)

  const onSubmit= (data: ISignUpParams) => {
    fetch("http://api.training.div3.pgtest.co/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword,
        name: data.name,
        gender: data.gender,
        region: data.region,
        state: data.state,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
       
        if (data.code === 200) { 
            
           toast.success("Sign Up success");
          setTimeout(() => navigate("/home"), 1000);
        } 
      });
  };
  // const onSubmit: SubmitHandler<ISignUpParams> = data => console.log(data);

  return (
    <div className="login">
       <ToastContainer />
       <img className='logo' src={Logo} alt=''/>
      <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: "32px" }}>
          <label>{t("email")}</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              validate: { emailValue: (value) => validateEmail(value) },
            }}
            render={({ field }) => <input className="input-login" {...field} {...register("email")}/>}
          />
          {errors.email && <small>{errors.email.message}</small>}
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
              <input className="input-login" type="password" {...field}  {...register("password")}/>
            )}
          />
          {errors.password && <small>{errors.password.message}</small>}
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>{t("repeatPassword")}</label>
          <Controller
            name="repeatPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              validate: {
                minLength: (value) => validatePassword(value),
              },
            }}
            render={({ field }) => (
              <input className="input-login" type="password" {...field}  {...register("repeatPassword")}/>
            )}
          />
          {errors.repeatPassword && (
            <small>{errors.repeatPassword.message}</small>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>{t("name")}</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true, validate: {} }}
            render={({ field }) => (
              <input className="input-login" {...field}{...register("name")}/>
            )}
          />
          {errors.name && <small>{errors.name.message}</small>}
        </div>

        <div style={{ marginTop: "20px" }}>
          {/* <label>{t("gender")}</label> */}
          <Controller
            name="gender"
            rules={{ required: true, validate: {} }}
            control={control}
            render={({ field }) => (
              <TextField
                select
                error={!!errors?.gender}
                style={{ height: "55px", width: "300px" }}
                label={t('gender')}
                {...register("gender")}
                {...field}
              >
                {SelectGender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          {/* <label>{t("region")}</label> */}
          <Controller
            name="region"
            control={control}
            rules={{ required: true, validate: {} }}
            render={({ field }) => (
              <TextField
                select
                error={!!errors?.region}
                style={{ height: "55px", width: "300px" }}
                {...field}
                label={t('region')}
                {...register("region")}
                value={cityId}
                onChange={(e) => {
                  setCityId(e.target.value as string);
                }}
              >
                {countryData?.map((option, id) => (
                  <MenuItem key={id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            
            )}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          {/* <label>{t("state")} </label> */}
          <Controller
            name="state"
            control={control}
            defaultValue=""
            rules={{ required: true, validate: {} }}
            render={({ field }) => (
              <TextField
                select
                error={!!errors?.state}
                style={{ height: "55px", width: "300px" }}
                {...register("state")}
                {...field}
                label={t('state')}
              >
                {cityData?.map((option, id) => (
                  <MenuItem key={id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors.state && <small>{errors.state.message}</small>}
        </div>
           
        <div className="submit">
          <NavLink className="button-login" to="/login">
            {t("login")}
          </NavLink>
          <button className="button-login" type="submit">
             {t("register")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
